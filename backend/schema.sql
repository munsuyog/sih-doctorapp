-- Create the "doctors" table
CREATE TABLE doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    doctor_id INTEGER UNIQUE NOT NULL,
    is_available BOOLEAN DEFAULT 0,
    speciality TEXT NOT NULL
);

-- Create the "patients" table
CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    patient_id INTEGER UNIQUE NOT NULL
);

-- Create the "appointments" table
CREATE TABLE appointments (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    symptoms TEXT,
    FOREIGN KEY (doctor_id) REFERENCES doctors (id),
    FOREIGN KEY (patient_id) REFERENCES patients (id)
);
