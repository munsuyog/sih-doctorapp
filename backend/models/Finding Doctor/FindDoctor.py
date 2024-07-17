import pandas as pd
import numpy as np

dis_data = pd.read_csv("doctor.csv")
doc_dataxl = "doctorsdata.xlsx"
doc_data = pd.read_excel(doc_dataxl)


def finddoctor():
    disease_input = str(input("Disease: "))
    location_input = str(input("Location: "))
    
    # Check if disease exists in the DataFrame
    if disease_input not in dis_data["Disease"].values:
        print("Disease not found in the dataset.")
        return None
    
    result = dis_data.loc[
        dis_data["Disease"] == disease_input, "Type_of_Doctor"
    ].values[0]
    
    result_index = doc_data[
        (doc_data["Specialization"] == result)
        & (doc_data["Location"] == location_input)
    ].index
    
    result_dataframe = doc_data.iloc[result_index]
    
    return result_dataframe

result = finddoctor()

if result is not None:
    print("Doctors found:")
    print(result)

