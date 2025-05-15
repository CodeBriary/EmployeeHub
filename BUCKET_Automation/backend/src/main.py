from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, List, Optional
import os
from dotenv import load_dotenv
from datetime import datetime

from agent.core import DecisionEngine
from agent.state_tracker import StateTracker
from agent.paycheck_splitter import PaycheckSplitter, Bucket

# Load environment variables
load_dotenv()

app = FastAPI(title="Finance Agent API")

# Initialize components
state_tracker = StateTracker(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
decision_engine = DecisionEngine()
splitter = PaycheckSplitter()

class UserState(BaseModel):
    goal: str
    balance: float
    preferences: Dict[str, str]

class Action(BaseModel):
    type: str
    amount: Optional[float]
    complexity: Optional[int]
    details: Optional[Dict]

class Feedback(BaseModel):
    action_id: str
    positive: bool
    comments: Optional[str]

class PaycheckSplitRequest(BaseModel):
    amount: float
    custom_buckets: Optional[List[Bucket]] = None

class PaycheckSplitResponse(BaseModel):
    splits: dict
    transfer_instructions: List[dict]
    summary: dict

@app.post("/agent/recommendation")
async def get_recommendation(user_id: str, state: UserState):
    """Get a recommendation from the agent"""
    try:
        # Get current state from database
        current_state = state_tracker.get_user_state(user_id)
        
        # Define possible actions (this would be more dynamic in production)
        possible_actions = [
            {
                "type": "transfer_to_savings",
                "amount": state.balance * 0.2,
                "complexity": 1,
                "details": {"target_account": "savings"}
            },
            {
                "type": "budget_alert",
                "complexity": 2,
                "details": {"threshold": state.balance * 0.1}
            }
        ]

        # Get best action from decision engine
        recommendation = decision_engine.get_best_action(
            state=state.dict(),
            possible_actions=possible_actions
        )

        # Record the action
        state_tracker.record_action(
            user_id=user_id,
            action=recommendation['action'],
            state=state.dict()
        )

        return recommendation

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/agent/feedback")
async def submit_feedback(user_id: str, feedback: Feedback):
    """Submit feedback for an action"""
    try:
        # Record the outcome
        state_tracker.record_outcome(
            user_id=user_id,
            action_id=feedback.action_id,
            outcome={
                "positive": feedback.positive,
                "comments": feedback.comments,
                "timestamp": datetime.now()
            }
        )

        # Update the utility function weights
        decision_engine.utility_function.update_weights(feedback.dict())

        return {"status": "success", "message": "Feedback recorded"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/agent/history/{user_id}")
async def get_history(user_id: str, limit: int = 10):
    """Get action and outcome history for a user"""
    try:
        actions = state_tracker.get_action_history(user_id, limit)
        outcomes = state_tracker.get_outcome_history(user_id, limit)
        
        return {
            "actions": actions,
            "outcomes": outcomes
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/paycheck/split", response_model=PaycheckSplitResponse)
async def split_paycheck(request: PaycheckSplitRequest):
    """
    Split a paycheck amount according to predefined or custom bucket configuration
    """
    try:
        # Calculate splits
        splits = splitter.calculate_splits(
            request.amount,
            request.custom_buckets
        )
        
        # Generate transfer instructions
        instructions = splitter.generate_transfer_instructions(
            request.amount,
            request.custom_buckets
        )
        
        # Get summary
        summary = splitter.get_bucket_summary(
            request.amount,
            request.custom_buckets
        )
        
        return PaycheckSplitResponse(
            splits=splits,
            transfer_instructions=instructions,
            summary=summary
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/paycheck/default-buckets")
async def get_default_buckets():
    """
    Get the default bucket configuration
    """
    return {"buckets": splitter.default_buckets}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 