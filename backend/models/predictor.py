import os
import warnings
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from mpl_toolkits.mplot3d import Axes3D

# Sklearn
from sklearn import svm
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
from sklearn.ensemble import BaggingClassifier
from sklearn.svm import LinearSVC

warnings.warn = lambda *args, **kwargs: None

# Read the disease-specialty mappings from CSV
df = pd.read_csv("models/specialities.csv")

# Read training and testing data
train_data = pd.read_csv("data/Training.csv")
test_data = pd.read_csv("data/Testing.csv")

data_train_x = train_data.drop(columns=["prognosis", "Unnamed: 133"], axis=1)
data_train_y = train_data["prognosis"]

data_test_x = train_data.drop(columns=["prognosis", "Unnamed: 133"], axis=1)
data_test_y = train_data["prognosis"]

column_names = data_train_x.columns
column_names_array = column_names.to_list()

patient_disease = []
for i in range(0, len(column_names_array)):
    patient_disease.append(0)

svm = LinearSVC(random_state=42)
model = BaggingClassifier(base_estimator=svm, n_estimators=31, random_state=314)
model.fit(data_train_x, data_train_y)

y_pred = model.predict(data_test_x)
accsc = accuracy_score(data_test_y, y_pred)

# Function to get specialties for a given disease
def get_specialties_for_disease(disease_name):
    # Convert the disease name to lowercase for case-insensitive matching
    disease_name = disease_name.lower()
    
    # Convert all disease names in the DataFrame to lowercase for matching
    df_lower = df.apply(lambda x: x.str.lower() if x.dtype == "object" else x)
    
    specialties = df_lower[df_lower["Disease"] == disease_name]["Type_of_Doctor"]
    return specialties.tolist()


# Function to predict disease based on symptoms
def predict_disease(symptoms: list[str]):
    symptoms_indices = [column_names_array.index(x) for x in symptoms]

    for index in symptoms_indices:
        if 0 <= index < len(patient_disease):
            patient_disease[index] = 1

    reshaped_arr = np.array(patient_disease).reshape(1, -1)
    reshaped_df = pd.DataFrame(reshaped_arr)

    disease = model.predict(reshaped_df)
    if len(disease) < 1:
        raise ValueError("no predictions")

    disease_name = disease[0]
    specialties = get_specialties_for_disease(disease_name)
    
    return disease_name, specialties
