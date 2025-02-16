# Yojana Sarthi - AI-Powered Scheme Finder

## 🚀 About the Project
Yojana Sarthi is an AI-powered platform that helps users find relevant **government schemes** based on their details. The system automatically categorizes schemes into **eligible** and **ineligible** groups, providing a seamless experience for users to discover benefits they qualify for.

## ✨ Key Features
- **AI-Based Scheme Matching** - Uses AI to recommend schemes based on user inputs.
- **User Eligibility Filtering** - Takes user details like gender, state, income, etc., and filters schemes accordingly.
- **Scheme Auto-Updates** - Retrieves updated schemes from official sources dynamically.
- **Voice & Text Search** - Allows users to search schemes using **text** or **voice commands**.
- **Filtering & Sorting** - Categorization of schemes into **State, Central, and All Schemes** with sorting options.

## 🛠 Technology Stack
### Frontend
- **Next.js 15** (React Framework)
- **Tailwind CSS** (Styling)
- **ShadCN** (UI Components)

### Backend
- **FastAPI** (Python-based API)
- **MongoDB** (Database for storing schemes)

### AI & Search
- **Elasticsearch** (Search & indexing)
- **SBERT & Random Forest** (ML-based recommendation)

## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18+)
- **Python** (3.9+)
- **MongoDB** (running locally or cloud instance)

### 1️⃣ Setup Frontend
```sh
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

### 2️⃣ Setup Backend
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at: `http://localhost:8000`

## 📌 Features in Progress
- [ ] **Gemini API Fine-Tuning** for better scheme recommendations
- [ ] **User Authentication** for saving preferences
- [ ] **Mobile App (Expo React Native)**

## 🤝 Contributing
Feel free to submit issues, feature requests, or contribute via pull requests! 🚀

## 📜 License
This project is **open-source** under the MIT License.