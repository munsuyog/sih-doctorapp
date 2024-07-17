import pandas as pd
import numpy as np
import sqlite3
from datetime import datetime
from sklearn.preprocessing import LabelEncoder
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM
from sklearn.model_selection import train_test_split

labels = np.array([['patient_id','Appointment_Date', 'Doctor','doctor_id', 'Disease', 'Case_Severity', 'Location', 'Sub-location']])
column_labels = labels[0, :]
df = pd.DataFrame(labels[1:, :], columns=column_labels)
df.head()

##conn = sqlite3.connect("patient_appointment_data")
##query = "SELECT * FROM your_table;" ---> bhai dekhiyo ko table mein labels[] wale saare column name ho
##df = pd.read_sql_query(query, conn)
##conn.close()

df['Appointment_Date'] = pd.to_datetime(df['Appointment_Date'])
first_app =df['Appointment_Date'].iloc[0]
first_date = pd.Timestamp(first_app)
df['Appointment_Date'] = (reference_date - df['Appointment_Date']).dt.days

df['Doctor'] = label_encoder.fit_transform(df['Doctor'])
df['Disease']= label_encoder.fit_transform(df['Disease'])
df['Location'] =label_encoder.fit_transform(df['Location'])
df['Sub-location'] =label_encoder.fit_transform(df['Sub-location'])

x = df.drop('Appointment_Date', axis= 1)
y = df['Appointment_Date']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

model = Sequential()
model.add(LSTM(64, input_shape=(x_train.shape[1], x_train.shape[2]), return_sequences=True))
model.add(Dropout(0.2))
model.add(LSTM(64, return_sequences=False))
model.add(Dense(1))

model.compile(optimizer='adam', loss='mean_squared_error')

model.fit(X_train, y_train, epochs=100, batch_size=32)

def finding_appointment():
    conn = sqlite3.connect('patient_appointment_data.db')
    cursor = conn.cursor()
    patient_id_to_find = #id of patient that is calling this function
    query = f"SELECT MAX(rowid) FROM your_table WHERE patient_id = ?"  # Replace your_table with your table name
    cursor = conn.execute(query, (patient_id_to_find,))
    highest_index = cursor.fetchone()[0]
    query = f"SELECT * FROM your_table WHERE rowid = ?"
    cursor = conn.execute(query, (highest_index,))
    row_data = cursor.fetchone()
    column_names = [description[0] for description in cursor.description]
    df = pd.DataFrame([row_data], columns=column_names)

    x_patient_find = df.drop('Appointment_Date', axis = 1)
    y_suggested = model.predict(x_patient_find)
    data_pred = {
        'Appointment_date': [y_suggested]
    }
    df = pd.DataFrame(data)
    df['Decoded_Appointment_Date'] = first_date - pd.to_timedelta(df['Appointment_Date'], unit='D')
    date_suggested = df['Decoded_Appointment_Date'].iloc[0]
    return date_suggested

finding_appointment()