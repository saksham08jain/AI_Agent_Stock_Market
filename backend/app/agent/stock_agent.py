import os
from langchain.agents import initialize_agent, AgentType
from langchain.memory import ConversationBufferMemory
from langchain_community.llms.huggingface_endpoint import HuggingFaceEndpoint
from .tools.stock_tools import StockPriceTool, StockAnalysisTool
from dotenv import load_dotenv

class StockMarketAgent:
    def __init__(self, huggingface_api_key=None):
        # Set API key from environment or parameter
        self.api_key = huggingface_api_key or os.getenv("HUGGINGFACEHUB_API_TOKEN")
        if not self.api_key:
            raise ValueError("Hugging Face API key is required. Set HUGGINGFACEHUB_API_TOKEN environment variable or pass it as a parameter.")
        
        # Initialize tools
        self.tools = [
            StockPriceTool(),
            StockAnalysisTool()
        ]
        
        # Initialize LLM using the endpoint approach with fixed parameters
        self.llm = HuggingFaceEndpoint(
            endpoint_url="https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
            huggingfacehub_api_token=self.api_key,
            task="text-generation",
            temperature=0.2,       # Now a direct parameter
           
           
        )
        
        # Initialize memory
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        
        # Initialize agent
        self.agent = initialize_agent(
            tools=self.tools,
            llm=self.llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            memory=self.memory,
            verbose=True,
            handle_parsing_errors=True,
            max_iterations=5
        )
    
    async def process_query(self, query: str) -> str:
        """
        Process a user query and return the agent's response
        
        Args:
            query: User's question about stocks
            
        Returns:
            Agent's response string
        """
        try:
            response = await self.agent.ainvoke({"input": query})
            return response["output"]
        except Exception as e:
            return f"Error processing query: {str(e)}"

if __name__ == '__main__':
    import asyncio
    from dotenv import load_dotenv

    load_dotenv()  # Load your .env with the HF token

    agent = StockMarketAgent()  # It'll pick up the token from env

    # query = "What's the current price of Apple stock?"  # Example prompt

    # response = asyncio.run(agent.process_query(query))

    # print("\nAgent Response:\n", response)

    query = "should i buy apple stock?"  # Example prompt

    response = asyncio.run(agent.process_query(query))

    print("\nAgent Response:\n", response)