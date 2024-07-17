import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Button from '../Button';
import { predictDisease } from '../../features/connectDb';
import { fetchDoctorBySpeciality } from '../../features/connectDb';
import Header from '../Header';

const SymptomDropdown = ({navigation}) => {
    const [doctorData, setDoctorData] = useState("");
    console.log(doctorData);

    const findDoctorHandler = () => {
        try {
          fetchDoctorBySpeciality(requiredSpeciality, setDoctorData);
          if(doctorData) {
            navigation.navigate("ListDoctors", {
                doctorData: doctorData,
            });
          }

        } catch (error) {
          // Handle any errors that occurred during the fetchDoctorBySpeciality function
          console.error("Error fetching doctors:", error);
        }
      };
      
  const [inputText, setInputText] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState("");
  const [requiredSpeciality, setRequiredSpeciality] = useState("");
  const symptoms = [
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic _patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze"
  ];
  
  const handlePredictDisease = async () => {
    try {
      predictDisease({symptoms: selectedSymptoms}, setPredictedDisease,setRequiredSpeciality);
    } catch (error) {
      console.error('Failed to predict disease:', error);
    }
  };
  

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleSymptomSelection = (symptom) => {
    if (selectedSymptoms.length < 5 && !selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setInputText('');
  };
  console.log(selectedSymptoms);
  
  return (
    <View>
    <Header title="Find Doctors"/>
    <Text style={{fontSize: 25, margin: 20}}>Select Symptoms:</Text>
    <TextInput
        style={{height: 50, borderColor: "green", borderWidth: 1, borderRadius: 10, padding: 10, marginHorizontal: 20}}
        value={inputText}
        onChangeText={handleInputChange}
        placeholder="Start typing a symptom..."
      />
    <ScrollView style={{padding: 20}}>


      {symptoms
        .filter((symptom) =>
          symptom.toLowerCase().includes(inputText.toLowerCase())
        )
        .map((symptom) => (
          <View key={symptom}>
            <Text
              style={{ color: 'blue', textAlign:'center', fontSize: 18, alignItems:'center', height: 30, borderWidth:1, margin: 10, borderRadius: 10, }}
              onPress={() => handleSymptomSelection(symptom)}
            >
              {symptom}
            </Text>
          </View>
        ))}
      
    </ScrollView>
    <Text style={{margin: 20}}>Selected Symptoms: {selectedSymptoms.join(', ')}</Text>
    {predictedDisease?<Button title="Find Doctors" onPress={findDoctorHandler} />: <Button title="Submit" onPress={handlePredictDisease} />}
    <View style={{marginBottom: 10}}>
        <Text>You might have: {predictedDisease}</Text>
        <Text>You will require: {requiredSpeciality}</Text>
    </View>
    </View>
  );
};

export default SymptomDropdown;

