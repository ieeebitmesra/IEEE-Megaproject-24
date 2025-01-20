# Team Panchayat
# Members:
> ## Deep Samanta
> ## Aniket Kumar Gupta
# National Institute of Technology Durgapur


## Domain of the Project:
GeoQuery is a sophisticated Natural Language Processing (NLP) and Geographic Information System (GIS) project that focuses on intelligent place name recognition and mapping. It operates in the domain of geospatial data processing and natural language understanding, specifically targeting the challenges of location entity recognition and normalization.

## Idea:
The core idea is to create a smart system that can:
- Automatically identify and map place names from natural language input to canonical names
- Handle spelling variations and errors through fuzzy matching
- Distinguish between place names and other terms using contextual analysis
- Process both declarative and imperative geographical queries
- Provide visualization of geospatial data
- Offer a user-friendly interface with features like search history and authentication

## Achievements Thus Far:
1. Successfully implemented a three-tier architecture:
   - React.js frontend with TailwindCSS for modern UI
   - Node.js/Express backend for business logic
   - Flask-based ML service for geographical entity processing

2. Developed key functionalities:
   - Place name identification system
   - Fuzzy matching algorithm for spelling variations
   - Context-aware geographical reference processing
   - User authentication system
   - Search history tracking
   - Geospatial data visualization
   - Video preview capability

## Code Execution Instructions:
1. System Requirements:
   - Node.js v14+
   - Python 3.8+
   - npm/yarn
   - Git

2. Setup Process:
   ```bash
   # Clone repository
   git clone https://github.com/The-Watcher-1895/GeoQuery.git
   cd GeoQuery

   # Download and place ML models
   # Place final-model.pt and lstm.pt in root directory

   # Frontend setup
   cd GeoQuery-frontend
   npm install
   npm run dev

   # Backend setup
   cd GeoQuery-backend
   npm install
   npm run start

   # Flask setup
   cd GeoQuery-flask
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```

3. Access Points:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - Flask Service: http://localhost:5000

The system is now operational and ready to process geographical queries and provide intelligent place name recognition services.

# Description
## GeoQuery

A smart system that automatically identifies and maps place names (such as countries, cities, and states) from natural language input to a set of canonical names provided in tables. The system will handle spelling variations and errors, performing fuzzy matching to correctly identify and match place names. The system would distinguish between place names and other terms, such as personal names, based on context. For example, in the query "Sagar lives in Mumbai," only "Mumbai" should be identified as a place. The system will include features like search history, login, and a user-friendly UI, with a Node.js and Flask backend, and a React.js frontend. It will work with both declarative and imperative sentences, and accurately process geospatial references, e.g., "Show me a graph of rainfall for Chennai for the month of October."

## Project Demo
> <video src="https://private-user-images.githubusercontent.com/194898697/404524973-bd4d607b-568b-4d5e-bff3-65061a735e67.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzcxOTI5NDgsIm5iZiI6MTczNzE5MjY0OCwicGF0aCI6Ii8xOTQ4OTg2OTcvNDA0NTI0OTczLWJkNGQ2MDdiLTU2OGItNGQ1ZS1iZmYzLTY1MDYxYTczNWU2Ny5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMTE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDExOFQwOTMwNDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01NmEwMDZiOThmN2QyMDJhNTNkYTRiNzQwM2U2NTVmNGRmOWE3MWNjMzIxOGFiZTdkNWRlOGY4MDYxNzUyMjBjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.-s10I-8vLEqdWX5mfKRz3B-827JcB_TPgeEtvkG0mVo" controls="controls" style="max-width: 730px;">
> </video>

## Project Structure
The project consists of three main components:
> - Frontend (React.js)
> - Backend (Node.js)
> - Flask Application (Python)

## Prerequisites
> - Node.js (v14 or higher)
> - Python 3.8+
> - npm or yarn
> - Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/The-Watcher-1895/GeoQuery.git
cd GeoQuery
```

### 2. Download and Place Models
> 1. Download the models from [Google Drive](https://drive.google.com/drive/folders/1EvgDO6aA1YpB9ekQVjFNaarKFIv3IuRa?usp=drive_link)
> 2. Place the downloaded models in their respective folders:
  >> - Place `final-model.pt` in the root directory
  >> - Place `lstm.pt` in the root directory

### 3. Frontend Setup (GeoQuery-frontend)
```bash
cd GeoQuery-frontend
npm install
npm run dev
```

### 4. Backend Setup (GeoQuery-backend)
```bash
cd GeoQuery-backend
npm install
# Create .env file and add necessary environment variables
npm run start
```

### 5. Flask Application Setup (GeoQuery-flask)
```bash
cd GeoQuery-flask
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Environment Variables

### Backend (.env)
```
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Flask App (.env)
```
FLASK_APP=app.py
FLASK_ENV=development
```

## Running the Application

> 1. Start the Frontend:
```bash
cd GeoQuery-frontend
npm run dev
```

> 2. Start the Backend:
```bash
cd GeoQuery-backend
npm run start
```

> 3. Start the Flask Application:
```bash
cd GeoQuery-flask
python app.py
```

The application should now be running at:
> - Frontend: http://localhost:5173
> - Backend: http://localhost:3000
> - Flask App: http://localhost:5000


## Features
> - Automatic identification of place names
> - Fuzzy matching for spelling variations
> - Context-aware geographical reference processing
> - Search history
> - User authentication
> - Interactive UI
> - Support for both declarative and imperative sentences
> - Geospatial data visualization
> - Video preview functionality

## Tech Stack
> - Frontend: React.js, Vite, TailwindCSS
> - Backend: Node.js, Express
> - ML Service: Flask, Python
> - Models: PyTorch
