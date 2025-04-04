import yfinance as yf
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Optional, Type 
import re

class StockPriceInput(BaseModel):
    ticker: str = Field(..., description="Stock ticker symbol (e.g., AAPL, MSFT)") 

class StockPriceTool(BaseTool):
    name:str= "get_stock_price"
    description:str = "Get the latest stock price information for a given ticker symbol"
    args_schema: Type[BaseModel] = StockPriceInput
    
    def _run(self, ticker: str) -> str:
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(period="1d")
            if data.empty:
                return f"Could not find data for ticker {ticker}"
            
            latest_price = data['Close'].iloc[-1]
            open_price = data['Open'].iloc[0]
            high = data['High'].iloc[-1]
            low = data['Low'].iloc[-1]
            volume = data['Volume'].iloc[-1]
            
            # Calculate daily change and percentage
            change = latest_price - open_price
            change_percent = (change / open_price) * 100
            
            return f"""
Stock: {ticker}
Latest Price: ${latest_price:.2f}
Open: ${open_price:.2f}
High: ${high:.2f}
Low: ${low:.2f}
Volume: {volume:,}
Change: ${change:.2f} ({change_percent:.2f}%)
Timestamp: {data.index[-1].strftime('%Y-%m-%d %H:%M:%S')}
"""
        except Exception as e:
            return f"Error fetching stock price for {ticker}: {str(e)}"

    async def _arun(self, ticker: str) -> str:
        # For async implementation
        return self._run(ticker)

# class StockAnalysisInput(BaseModel):
#     ticker: str = Field(..., description="Stock ticker symbol to analyze")
#     period: str = Field(default="6mo", description="Time period for analysis (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)")

class StockAnalysisTool(BaseTool):
    name:str  = "analyze_stock"
    description:str= (
        "Analyze a stock and provide buy/sell/hold recommendation. "
        "Input must be a string in the format: 'ticker=AAPL, period=6mo'"
    )
    
    
    def _run(self, query: str) -> str:
        match = re.search(r"ticker=(\w+),?\s*period=([\w\d]+)", query)
        if not match:
            return "Invalid input format. Use: 'ticker=AAPL, period=6mo'"

        ticker = match.group(1).upper()
        period = match.group(2)
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(period=period)
            
            if hist.empty:
                return f"Could not find historical data for ticker {ticker}"
            
            # Get latest price and calculate various metrics
            current_price = hist['Close'].iloc[-1]
            avg_50day = hist['Close'].tail(50).mean()
            avg_200day = hist['Close'].tail(200).mean() if len(hist) >= 200 else None
            
            # Calculate RSI (Relative Strength Index)
            delta = hist['Close'].diff()
            gain = delta.where(delta > 0, 0).rolling(window=14).mean()
            loss = -delta.where(delta < 0, 0).rolling(window=14).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs.iloc[-1]))
            
            # Simple analysis logic
            recommendation = "HOLD"
            reasons = []
            
            # Price vs moving averages
            if current_price > avg_50day * 1.1:
                reasons.append(f"Price is significantly above 50-day average (${avg_50day:.2f})")
                recommendation = "SELL" if recommendation != "BUY" else recommendation
            elif current_price < avg_50day * 0.9:
                reasons.append(f"Price is significantly below 50-day average (${avg_50day:.2f})")
                recommendation = "BUY" if recommendation != "SELL" else recommendation
                
            if avg_200day is not None:
                if current_price > avg_200day * 1.2:
                    reasons.append(f"Price is significantly above 200-day average (${avg_200day:.2f})")
                    recommendation = "SELL" if recommendation != "BUY" else recommendation
                elif current_price < avg_200day * 0.8:
                    reasons.append(f"Price is significantly below 200-day average (${avg_200day:.2f})")
                    recommendation = "BUY" if recommendation != "SELL" else recommendation
            
            # RSI analysis
            if rsi > 70:
                reasons.append(f"RSI is high at {rsi:.2f}, indicating potential overbought conditions")
                recommendation = "SELL" if recommendation != "BUY" else "HOLD"
            elif rsi < 30:
                reasons.append(f"RSI is low at {rsi:.2f}, indicating potential oversold conditions")
                recommendation = "BUY" if recommendation != "SELL" else "HOLD"
            else:
                reasons.append(f"RSI is moderate at {rsi:.2f}")
                
            # Recent performance
            month_change = ((hist['Close'].iloc[-1] / hist['Close'].iloc[-30 if len(hist) >= 30 else 0]) - 1) * 100
            reasons.append(f"Stock has {'increased' if month_change > 0 else 'decreased'} by {abs(month_change):.2f}% in the last month")
            
            # Build the analysis response
            analysis = f"""
Analysis for {ticker}:
Current Price: ${current_price:.2f}
50-Day Average: ${avg_50day:.2f}
"""
            if avg_200day is not None:
                analysis += f"200-Day Average: ${avg_200day:.2f}\n"
                
            analysis += f"""
RSI (14-day): {rsi:.2f}
1-Month Change: {month_change:.2f}%

Recommendation: {recommendation}

Reasoning:
"""
            for i, reason in enumerate(reasons, 1):
                analysis += f"{i}. {reason}\n"
                
            analysis += f"\nNote: This is a simplified analysis and should not be considered financial advice."
            
            return analysis
            
        except Exception as e:
            return f"Error analyzing stock {ticker}: {str(e)}"

    async def _arun(self, ticker: str, period: str = "6mo") -> str:
        # For async implementation
        return self._run(ticker, period)
if __name__ == "__main__":
    # Test StockPriceTool
    stock_price_tool = StockPriceTool()
    ticker = "AAPL"  # Change this to any valid stock symbol
    print(stock_price_tool._run(ticker))

    # Test StockAnalysisTool
    stock_analysis_tool = StockAnalysisTool()
    print(stock_analysis_tool._run('ticker=AAPL, period=6mo'))
