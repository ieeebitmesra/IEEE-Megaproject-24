// JavaScript for MedVault Webpage

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Sample patient data (can be replaced with dynamic data from a database)
    const patients = [
        { name: "Patient A", diagnosis: "X", lastVisit: "01/01/2025" },
        { name: "Patient B", diagnosis: "Y", lastVisit: "12/15/2024" },
        { name: "Patient C", diagnosis: "Z", lastVisit: "11/10/2024" }
    ];

    let currentIndex = 0;

    // Elements
    const patientName = document.querySelector(".patient-details h3");
    const patientDiagnosis = document.querySelector(".patient-details p:nth-of-type(1)");
    const patientLastVisit = document.querySelector(".patient-details p:nth-of-type(2)");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Functions to update patient details
    const updatePatientDetails = (index) => {
        const patient = patients[index];
        patientName.textContent = patient.name;
        patientDiagnosis.innerHTML = `<strong>Diagnosis:</strong> ${patient.diagnosis}`;
        patientLastVisit.innerHTML = `<strong>Last Visit:</strong> ${patient.lastVisit}`;
    };

    // Event Listeners for navigation buttons
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = patients.length - 1; // Loop back to the last patient
        }
        updatePatientDetails(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < patients.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the first patient
        }
        updatePatientDetails(currentIndex);
    });

    // Initialize with the first patient's details
    updatePatientDetails(currentIndex);

    // Button Click Animations
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.95)";
        });
        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
        });
    });

    // Add Patient Button Actions (you can customize these for your needs)
    document.querySelector(".new-patient").addEventListener("click", () => {
        // alert("Redirecting to 'Add New Patient' page...");
        window.location.href = "add-patient.html"; 
        // Add functionality to redirect to the "Add New Patient" page
    });

    document.querySelector(".existing-patient").addEventListener("click", () => {
        // alert("Redirecting to 'Existing Patient Details' page...");
        window.location.href = "add-patient.html";  
        // Add functionality to redirect to the "Existing Patient" page
    });
   // Select the element with the class 'view-patient'
const viewPatientButton = document.querySelector(".view-patient");

if (viewPatientButton) {
    viewPatientButton.addEventListener("click", () => {
       
        window.location.href = "./details.html";
    });
} else {
    console.error("Element with class 'view-patient' not found.");
}



    
});
