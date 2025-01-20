document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id;
                const navLink = document.querySelector(`.navbar a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    navLinks.forEach((link) => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            });
        },
        { threshold: 0.7 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});


document.getElementById('ss_button').addEventListener('click', async () => {
    const problemText = document.getElementById('problem').value.trim();

    if (!problemText) {
        alert('Please describe your main medical problem.');
        return;
    }

    const categoryField = document.getElementById('category');

    try {
        // Replace 'YOUR_API_KEY' with your actual OpenAI API key
        const apiKey = 'YOUR_API_KEY';
        const apiEndpoint = 'https://api.openai.com/v1/completions';

        // Fetch response from OpenAI API
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // GPT-4 or appropriate model if available
                prompt: `Given the following medical symptoms: "${problemText}", identify the most likely disease or illness in one word or a short phrase.`,
                max_tokens: 10, // Keep the response concise
                temperature: 0.5,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const diagnosis = data.choices[0].text.trim();

        // Update the category field with the diagnosis
        categoryField.value = diagnosis;

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to retrieve the diagnosis. Please try again.');
    }
});


//FIREBASE PART
// Import Firebase libraries (for modular code)
/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    // Firebase configuration (Replace with your Firebase config)
    const firebaseConfig = {
        apiKey: "AIzaSyC5JLvPzsgav5U5dv3eLy511WodcTwCxk8",
        authDomain: "medvault-3ab45.firebaseapp.com",
        projectId: "medvault-3ab45",
        storageBucket: "medvault-3ab45.firebasestorage.app",
        messagingSenderId: "769455123364",
        appId: "1:769455123364:web:640ec301531a298779af31",
        measurementId: "G-PKGMVHJ95Y"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Select the submit button
    const submitButton = document.querySelector('input[type="submit"]');

    // Handle form submission
    // submitButton.addEventListener("click", async (event) => {
    //     event.preventDefault(); // Prevent form from refreshing the page
    
    document.getElementById("patient-form").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form refresh

        // Fetch data from the form
        const formData = {
            caseNumber: document.getElementById("case_no").value,
            date: document.getElementById("date").value,
            basicDetails: {
                name: document.getElementById("name").value,
                age: document.getElementById("age").value,
                gender: document.querySelector('input[name="ans"]:checked')?.nextSibling.textContent.trim(),
                bloodGroup: document.getElementById("blood-group").value,
                contact: document.getElementById("contact").value,
                email: document.getElementById("email").value,
                state: document.getElementById("inputState").value,
                address: document.getElementById("address").value,
            },
            medicalProblem: {
                description: document.getElementById("problem").value,
                category: document.getElementById("category").value,
                duration: document.getElementById("tspan").value,
                priorMedication: document.getElementById("prm").value,
                feedback: document.getElementById("fdbk").value,
            },
            homoeopathicGeneralities: {
                temperaturePreference: document.getElementById("temp").value,
                coldTendency: document.getElementById("sucp").value,
            },
            generalSurvey: {
                height: document.getElementById("height").value,
                weight: document.getElementById("weight").value,
                bloodPressure: document.querySelector('input[name="bp"]').value,
                spO2: document.getElementById("sp").value,
                sugarLevel: document.getElementById("sugar").value,
                diabetic: document.querySelector('input[name="db_ans"]:checked')?.nextSibling.textContent.trim(),
                insulin: document.querySelector('input[name="ins_ans"]:checked')?.nextSibling.textContent.trim(),
                anemia: document.querySelector('input[name="ane_ans"]:checked')?.nextSibling.textContent.trim(),
                heartDisease: document.querySelector('input[name="cpain_ans"]:checked')?.nextSibling.textContent.trim(),
                smoke: document.querySelector('input[name="cpain_ans"]:checked')?.nextSibling.textContent.trim(),
                alcohol: document.querySelector('input[name="cpain_ans"]:checked')?.nextSibling.textContent.trim(),
                mentalIssues: document.querySelector('input[name="cpain_ans"]:checked')?.nextSibling.textContent.trim(),
            },
        };

        // Add the data to Firebase Firestore
        try {
            const caseId = formData.caseNumber || `case-${Date.now()}`; // Use caseNumber or auto-generate
            await setDoc(doc(db, "cases", caseId), formData);
            alert("Form data successfully submitted!");
        } catch (error) {
            console.error("Error submitting form data:", error);
            alert("Error submitting form data. Check the console for details.");
        }
    });
});

*/