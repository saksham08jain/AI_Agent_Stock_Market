# Stock Market AI Agent

A minimal AI agent for real-time stock analysis using Mistral 7B and the ReAct pattern via LangChain.

---

## 🚀 Local Setup

### 🔧 Prerequisites
- Python 3.10+
- Hugging Face API key

### ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stock-market-ai-agent.git
cd stock-market-ai-agent
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Create a `.env` file** with your Hugging Face API key:
```
HUGGINGFACE_API_KEY=your_key_here
```

4. **Run the application**
```bash
python -m app.main
```

Your local FastAPI server will be running at:  
 `http://localhost:8000`

---

## 🌐 Using the Deployed API

🔗 Live Demo: [ai-agent-stock-market.onrender.com](https://ai-agent-stock-market.onrender.com/api/v1/query)

###  Example Request (via Postman or `curl`)

- **Method**: `POST`  
- **URL**: `https://ai-agent-stock-market.onrender.com/api/v1/query`  
- **Headers**:  
  - `Content-Type`: `application/json`  
- **Body** (JSON):
```json
{
  "query": "What is the current price of Apple?"
}
```

---

### ⚠️ Notes:
- This project is hosted on **Render’s free tier**, so the first request may take **30–60 seconds** if the server has been inactive (cold start)
- Please use **company names** (e.g., `"Apple"`) instead of ticker symbols (e.g., `"AAPL"`) for more accurate results
- The deployed version uses my **personal Hugging Face API token** — you may encounter a token limit error if usage exceeds quota

---

## 🛠️ Tech Stack

- Mistral 7B via Hugging Face Inference API  
- LangChain + ReAct pattern  
- FastAPI + async route handlers  
- Yahoo Finance API for real-time stock data  
- Deployed on Render

---

##  Future Improvements

- Add support for ticker symbol resolution  
- Replace Hugging Face token with a secure backend proxy  
- Integrate Redis for memory persistence across sessions
- Minimal frontend

---

##  Author

**Saksham Jain**  
-  AI + Full Stack Developer  
- 🌐 [technicalsaksham.netlify.app](https://technicalsaksham.netlify.app)
