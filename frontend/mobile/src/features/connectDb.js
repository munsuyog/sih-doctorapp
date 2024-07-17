import React from "react"; 
const apiURL = 'https://df3f-106-213-82-155.ngrok-free.app';

const registerDoctor = async (doctorData) => {
  try {
    const response = await fetch(`${apiURL}/doctor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    // Handle successful registration
    console.log('Registration successful');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

const loginDoctor = async (loginDoctorData, setLoginSuccess) => {
  try {
    const response = await fetch(`${apiURL}/doctor/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDoctorData),
    });

    if (!response.ok) {
        setLoginSuccess(false);
      throw new Error('Login failed');
    }
    setLoginSuccess(true);

    // Handle successful login
    const data = await response.json();
    console.log('Login successful. Token:', data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const updateDoctorAvailability = (doctorId, isAvailable) => {
    // Define the request body data as a JavaScript object
    const requestBody = {
      is_available: isAvailable,
    };
  
    // Send the POST request
    fetch(`/doctor/update-availability/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update doctor availability');
        }
        // Doctor availability updated successfully
        return response.text();
      })
      .then((data) => {
        console.log(data); // Print the response message ("Updated")
        // You can handle the success response here
      })
      .catch((error) => {
        console.error('Error updating doctor availability:', error);
        // Handle the error here, e.g., display an error message to the user
      });
  }  

const fetchAllDoctors = async (setDoctorData) => {
    try {
      const response = await fetch(`${apiURL}/doctors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
  
      // Handle successful response
      const data = await response.json();
      setDoctorData(data);
      return data; // Return the list of doctors
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      throw error;
    }
  }; 
//   Patients - Login, Register, Fetch
const registerPatient = async (patientData) => {
    try {
      const response = await fetch(`${apiURL}/patient/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      // Handle successful registration
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  const loginPatient = async (loginPatientData, setLoginSuccess) => {
    try {
      const response = await fetch(`${apiURL}/patient/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPatientData),
      });
  
      if (!response.ok) {
          setLoginSuccess(false);
        throw new Error('Login failed');
      }
      setLoginSuccess(true);
  
      // Handle successful login
      const data = await response.json();
      console.log('Login successful. Token:', data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const fetchPatientByEmail = async (email, setPatientData) => {
    try {
      const response = await fetch(`${apiURL}/patient/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
  
      const patientData = await response.json();
      setPatientData(patientData)
      return patientData;
    } catch (error) {
      console.error('Failed to fetch patient data:', error);
      throw error;
    }
  };

// Book Appointment
const bookAppointmentFunction = async (appointmentData) => {
    try {
      const response = await fetch(`${apiURL}/book-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
  
      // Handle successful appointment booking
      console.log('Appointment booked successfully');
    } catch (error) {
      console.error('Failed to book appointment:', error);
      // Handle the error here, e.g., display an error message to the user
    }
  };

  const predictDisease = async (symptoms, setPredictedDisease, setRequiredSpeciality) => {
    try {
      const response = await fetch(`${apiURL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(symptoms),
      });
  
      if (!response.ok) {
        throw new Error('Failed to predict disease');
      }
  
      // Handle successful prediction
      const data = await response.json();
      setPredictedDisease(data.predicted_disease);
      setRequiredSpeciality(data.associated_specialties[0]);
    } catch (error) {
      console.error('Failed to predict disease:', error);
      throw error;
    }
  };

  const fetchDoctorBySpeciality = async (requiredSpeciality, setDoctorData) => {
    try {
      const response = await fetch(`${apiURL}/doctors/${requiredSpeciality}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
  
      const doctorData = await response.json();
      setDoctorData(doctorData)
    } catch (error) {
      console.error('Failed to fetch patient data:', error);
      throw error;
    }
}

export { registerDoctor, loginDoctor, fetchAllDoctors, registerPatient, loginPatient, updateDoctorAvailability, bookAppointmentFunction, fetchPatientByEmail, predictDisease, fetchDoctorBySpeciality };
