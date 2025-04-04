import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .api.routes import router as api_router

# Load environment variables
load_dotenv()

# Check if OpenAI API key is set
if not os.getenv("HUGGINGFACEHUB_API_TOKEN"):
    print("WARNING: HUGGINGFACEHUB_API_TOKEN environment variable is not set")

# Initialize FastAPI app
app = FastAPI(
    title="Stock Market AI Agent API",
    description="An API for querying stock information and getting investment advice using LangChain and Mistral via Hugging Face",
    version="0.0.1"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix="/api/v1")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "stock-market-agent"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)
