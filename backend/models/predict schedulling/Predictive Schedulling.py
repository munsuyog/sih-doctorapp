import pandas as pd
import numpy as np
import sqlite3
from sklearn.preprocessing import LabelEncoder
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM
from sklearn.model_selection import train_test_split

labels = np.array(
    [
        [
            "patient_name",
            "Appointment_Date",
            "Doctor",
            "Disease",
            "Case_Severity",
            "Location",
            "Sub-location",
        ]
    ]
)
column_labels = labels[0, :]
df = pd.DataFrame(labels[1:, :], columns=column_labels)

##Form SQL Database
##conn = sqlite3.connect("patient1")
##query = "SELECT * FROM your_table;"
##df = pd.read_sql_query(query, conn)
##conn.close()

df["Appointment_Date"] = pd.to_datetime(df["Appointment_Date"])
first_app = df["Appointment_Date"].iloc[0]
first_date = pd.Timestamp(first_app)
df["Appointment_Date"] = (first_date - df["Appointment_Date"]).dt.days

df["patient_name"] == label_encoder.fit_transform(df["patient_name"])
df["Doctor"] = label_encoder.fit_transform(df["Doctor"])
df["Disease"] = label_encoder.fit_transform(df["Disease"])
df["Location"] = label_encoder.fit_transform(df["Location"])
df["Sub-location"] = label_encoder.fit_transform(df["Sub-location"])

x = df.drop("Appointment_Date", axis=1)
y = df["Appointment_Date"]
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)

model = Sequential()
model.add(
    LSTM(64, input_shape=(x_train.shape[1], x_train.shape[2]), return_sequences=True)
)
model.add(Dropout(0.2))
model.add(LSTM(64, return_sequences=False))
model.add(Dense(1))

model.compile(optimizer="adam", loss="mean_squared_error")

model.fit(X_train, y_train, epochs=100, batch_size=32)

loss = model.evaluate(X_test, y_test)
print(loss)
