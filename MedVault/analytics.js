import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5JLvPzsgav5U5dv3eLy511WodcTwCxk8",
    authDomain: "medvault-3ab45.firebaseapp.com",
    projectId: "medvault-3ab45",
    storageBucket: "medvault-3ab45.appspot.com",
    messagingSenderId: "769455123364",
    appId: "1:769455123364:web:640ec301531a298779af31",
    measurementId: "G-PKGMVHJ95Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Declare global variables for charts
let genderChart, diabeticChart, alcoholChart;

// Fetch data from Firestore
async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "trial2"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Function to render the charts
function renderCharts(data) {
    // Gender Distribution
    const genderCounts = data.reduce((acc, record) => {
        acc[record.gender] = (acc[record.gender] || 0) + 1;
        return acc;
    }, {});

    if (genderChart) genderChart.destroy();
    genderChart = new Chart(document.getElementById("gender-chart"), {
        type: "pie",
        data: {
            labels: Object.keys(genderCounts),
            datasets: [{
                data: Object.values(genderCounts),
                backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"]
            }]
        }
    });

    // Diabetic Percentage
    const diabeticCount = data.filter(record => record.generalSurvey?.diabetic === "Yes").length;
    const diabeticPercentage = ((diabeticCount / data.length) * 100).toFixed(2);

    if (diabeticChart) diabeticChart.destroy();
    diabeticChart = new Chart(document.getElementById("diabetic-chart"), {
        type: "doughnut",
        data: {
            labels: ["Diabetic", "Non-Diabetic"],
            datasets: [{
                data: [diabeticPercentage, 100 - diabeticPercentage],
                backgroundColor: ["#FF5722", "#03A9F4"]
            }]
        }
    });

    // Alcohol Consumption Distribution
    const alcoholCounts = data.reduce((acc, record) => {
        const alcoholStatus = record.generalSurvey?.alcohol || "Unknown";
        acc[alcoholStatus] = (acc[alcoholStatus] || 0) + 1;
        return acc;
    }, {});

    if (alcoholChart) alcoholChart.destroy();
    alcoholChart = new Chart(document.getElementById("alcohol-chart"), {
        type: "bar",
        data: {
            labels: Object.keys(alcoholCounts),
            datasets: [{
                data: Object.values(alcoholCounts),
                backgroundColor: "#673AB7"
            }]
        },
        options: {
            indexAxis: "y"
        }
    });
}

// Function to dynamically change the chart type
function changeChartType(chartInstance, newType) {
    const chartCanvas = chartInstance.canvas; // Store the chart canvas element
    const data = chartInstance.data; // Preserve the chart's data
    const options = chartInstance.options; // Preserve the chart's options

    chartInstance.destroy(); // Destroy the existing chart instance

    // Create a new chart instance with the new type
    return new Chart(chartCanvas, {
        type: newType,
        data: data,
        options: options,
    });
}

// Fetch data and display charts
async function fetchAndDisplayAnalytics() {
    try {
        const data = await fetchData();
        renderCharts(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch and render charts on page load
fetchAndDisplayAnalytics();
