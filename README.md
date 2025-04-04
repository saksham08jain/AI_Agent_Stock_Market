# Stock Market AI Agent

A simple AI agent for stock market analysis using Mistral 7B.

## Local Setup

### Prerequisites
- Python 3
- Hugging Face API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/stock-market-ai-agent.git
cd stock-market-ai-agent
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Create `.env` file with your Hugging Face API key
```
HUGGINGFACE_API_KEY=your_key_here
```

4. Run the application
```
python -m app.main
```

5. The local API will be available at `http://localhost:8000`

## Using the Deployed API

The service is deployed at: https://ai-agent-stock-market.onrender.com/api/v1/query

### Example request:

Use this configuration in Postman to test the deployed API:

- **Method**: `POST`  
- **URL**: `https://ai-agent-stock-market.onrender.com/api/v1/query`  
- **Headers**:  
  - `Content-Type`: `application/json`  
- **Body** → `raw` → `JSON`:
  
```json
{
  "query": "What is the current price of Apple?"
}
```
### Note:
- The service is on Render's free tier, so the first request may take 30-60 seconds if the server has been inactive
- Use company names (e.g., "Apple") rather than ticker symbols (e.g., "AAPL") for more reliable results