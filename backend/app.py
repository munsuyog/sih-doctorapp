import sqlite3
import bcrypt
import jwt
import datetime
import json

from flask import Flask, request, abort, g, jsonify
from models.predictor import predict_disease
from functools import wraps

app = Flask(__name__)

# python -c 'import secrets; print(secrets.token_hex())'
app.config.from_file("config.json", json.load)


def proc(fn):
    @wraps(fn)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return "missing token", 400

        try:
            jwt.decode(token, app.config["SECRET_KEY"])
        except:
            return "invalid token", 400

    return decorated


def get_db() -> sqlite3.Connection:
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(app.config["DB_URI"])
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


@app.route("/doctor/register", methods=["POST"])
def register_doctor():
    body = request.get_json()

    hospital_id = body.get("hospital_id")
    email = body.get("email")
    password = body.get("password")
    name = body.get("name")
    doctor_id = body.get("doctor_id")
    is_available = body.get("is_available")
    speciality = body.get("speciality")

    conn = get_db()
    row = (
        conn.cursor()
        .execute("SELECT rowid FROM doctors WHERE email = ?", [email])
        .fetchone()
    )
    if row is not None:
        abort(400, "Doctor already registered")

    hashed = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt(app.config["ROUNDS"])
    )

    conn.cursor().execute(
        "INSERT INTO doctors (hospital_id, email, password, name, doctor_id, is_available, speciality) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [hospital_id, email, hashed, name, doctor_id, is_available, speciality],
    )
    conn.commit()

    return "Ho gaya", 200

@app.route("/doctor/login", methods=["POST"])
def doctor_login():
    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    if not (email and password):
        abort(400, description="Missing email or password")

    conn = get_db()
    row = (
        conn.cursor()
        .execute("SELECT doctor_id, password FROM doctors WHERE email = ?", [email])
        .fetchone()
    )
    if row is None:
        abort(400, "Doctor not found")

    doctor_id, hashed_password = row

    if not bcrypt.checkpw(password.encode("utf-8"), hashed_password):
        abort(400, "Incorrect credentials")

    token = jwt.encode(
        {
            "user_id": doctor_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        },
        app.config["SECRET_KEY"],
    )

    return {"token": token}


# Appointments - Book, Fetch
@app.route("/book-appointment", methods=["POST"])
def book_appointment():
    body = request.get_json()
    doctor_id = body.get("doctor_id")
    patient_id = body.get("patient_id")
    date = body.get("date")
    symptoms = body.get("symptoms")
    time_slot = body.get("time_slot")

    if not (doctor_id and patient_id and date and time_slot):
        abort(400, "Missing appointment details")

    conn = get_db()
    conn.cursor().execute(
        "INSERT INTO appointments (doctor_id, patient_id, date, symptoms, time_slot) VALUES (?, ?, ?, ?, ?)",
        [doctor_id, patient_id, date, symptoms, time_slot],
    )
    conn.commit()

    return "Appointment booked successfully", 200

@app.route("/doctor/<int:doctor_id>", methods=["GET"])
def get_doctor_info(doctor_id):
    conn = get_db()
    cursor = conn.cursor()

    # Query the database to retrieve the doctor's information by ID
    cursor.execute("SELECT * FROM doctors WHERE doctor_id = ?", [doctor_id])
    doctor_data = cursor.fetchone()

    if doctor_data is None:
        abort(404, "Doctor not found")

    # Create a dictionary to store the doctor's information
    doctor_info = {
        "doctor_id": doctor_data[0],
        "hospital_id": doctor_data[1],
        "email": doctor_data[2],
        "name": doctor_data[4],  # Assuming name is in the 5th column
        # Add more fields as needed
    }

    return json.dumps(doctor_info), 200

@app.route("/doctors", methods=["GET"])
def get_all_doctors():
    conn = get_db()
    cursor = conn.cursor()

    # Query the database to retrieve all doctors' information
    cursor.execute("SELECT * FROM doctors")
    doctors_data = cursor.fetchall()

    # Create a list to store the information of all doctors
    doctors_info = []

    for doctor_data in doctors_data:
        doctor_info = {
            "hospital_id": doctor_data[1],
            "email": doctor_data[2],
            "name": doctor_data[4],
            "doctor_id": doctor_data[5],
            "is_available": doctor_data[6],
            "speciality": doctor_data[7]
            # Add more fields as needed
        }
        doctors_info.append(doctor_info)

    return json.dumps(doctors_info), 200

@app.route("/doctor/update-availability/<int:doctor_id>", methods=["POST"])
def update_doctor_availability(doctor_id):
    data = request.get_json()
    is_available = data.get("is_available")

    if is_available is None:
        abort(400, "Missing 'is_available' field in the request")

    # Connect to the database
    conn = get_db()
    cursor = conn.cursor()

    try:
        # Update the doctor's availability in the database
        cursor.execute(
            "UPDATE doctors SET is_available = ? WHERE doctor_id = ?",
            (is_available, doctor_id),
        )
        conn.commit()
    except sqlite3.Error as e:
        conn.rollback()
        abort(500, f"Database error: {str(e)}")
    finally:
        conn.close()

    return "Updated"

# Patient - Login, Register, FetchData
@app.route("/patient/register", methods=["POST"])
def register_patient():
    body = request.get_json()

    age = body.get("age")
    email = body.get("email")
    password = body.get("password")
    name = body.get("name")
    patient_id = body.get("patient_id")

    conn = get_db()
    row = (
        conn.cursor()
        .execute("SELECT rowid FROM patients WHERE email = ?", [email])
        .fetchone()
    )
    if row is not None:
        abort(400, "Patient already registered")

    hashed = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt(app.config["ROUNDS"])
    )

    conn.cursor().execute(
        "INSERT INTO patients (age, email, password, name, patient_id) VALUES (?, ?, ?, ?, ?)",
        [age, email, hashed, name, patient_id],
    )
    conn.commit()

    return "Patient registered successfully", 200

@app.route("/patient/login", methods=["POST"])
def patient_login():
    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    if not (email and password):
        abort(400, description="Missing email or password")

    conn = get_db()
    row = (
        conn.cursor()
        .execute("SELECT patient_id, password FROM patients WHERE email = ?", [email])
        .fetchone()
    )
    if row is None:
        abort(400, "Patient not found")

    patient_id, hashed_password = row

    if not bcrypt.checkpw(password.encode("utf-8"), hashed_password):
        abort(400, "Incorrect credentials")

    token = jwt.encode(
        {
            "user_id": patient_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        },
        app.config["SECRET_KEY"],
    )

    return {"token": token}

@app.route('/patient/<string:email>', methods=['GET'])
def get_patient_by_email(email):
    try:
        conn = get_db()
        cursor = conn.cursor()

        # Query the database to retrieve patient data by email
        cursor.execute("SELECT * FROM patients WHERE email = ?", [email])
        patient_data = cursor.fetchone()

        if patient_data is None:
            return jsonify({'error': 'Patient not found'}), 404

        # Format the patient data as a dictionary and return it as JSON
        patient_info = {
            'id': patient_data[5],
            'email': patient_data[1],
            'name': patient_data[3],
            'age': patient_data[4],
        }

        return jsonify(patient_info), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get the list of symptoms from the request JSON
        symptom_data = request.get_json()
        symptoms = symptom_data.get("symptoms")  # Corrected this line
        
        if symptoms is None:
            return jsonify({"error": "Missing symptoms"}), 400

        if len(symptoms) != 5:
            return jsonify({"error": "Must pass five symptoms"}), 400

        # Call your predict_disease function with the symptoms
        predicted_disease, associated_specialties = predict_disease(symptoms)

        # Return the result as a JSON response
        response_data = {
            'predicted_disease': predicted_disease,
            'associated_specialties': associated_specialties
        }
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/doctors/<string:speciality>", methods=["GET"])
def get_doctors_by_speciality(speciality):
        # Connect to the database
        conn = get_db()
        cursor = conn.cursor()

        # Query the database to retrieve doctors by specialty
        cursor.execute("SELECT * FROM doctors WHERE speciality = ?", [speciality])
        doctors_data = cursor.fetchall()

        # Close the database connection
        conn.close()

        if not doctors_data:
            return jsonify({"message": "No doctors found for the specified specialty"}), 404

        # Convert the list of doctor data to a list of dictionaries
        doctors_list = [
            {
                "doctor_id": doctor[5],
                "hospital_id": doctor[1],
                "email": doctor[2],
                "name": doctor[4],
                "is_available": doctor[6],
                "speciality": doctor[7]  # Assuming name is in the 5th column
                # Add more fields as needed
            }
            for doctor in doctors_data
        ]
        return jsonify(doctors_list), 200