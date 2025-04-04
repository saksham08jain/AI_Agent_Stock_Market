from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from typing import Dict, Any, Optional
from ..agent.stock_agent import StockMarketAgent

router = APIRouter()
agent_instance = None

class StockQuery(BaseModel):
    query: str
    
    class Config:
        schema_extra = {
            "example": {
                "query": "What is the current price of AAPL?"
            }
        }

async def get_agent() -> StockMarketAgent:
    global agent_instance
    if agent_instance is None:
        agent_instance = StockMarketAgent()
    return agent_instance

@router.post("/query", response_model=Dict[str, Any])
async def process_stock_query(
    query_data: StockQuery = Body(...),
    agent: StockMarketAgent = Depends(get_agent)
):
    """
    Process a natural language query about stocks
    
    Example queries:
    - "What is the current price of AAPL?"
    - "Should I buy or sell MSFT based on recent performance?"
    - "Get me the latest price for Tesla stock"
    """
    try:
        response = await agent.process_query(query_data.query)
        return {"response": response, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")
    
