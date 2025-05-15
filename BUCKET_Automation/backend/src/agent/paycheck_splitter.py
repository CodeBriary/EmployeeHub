from typing import Dict, List
from decimal import Decimal
from pydantic import BaseModel

class Bucket(BaseModel):
    name: str
    percentage: float
    account_id: str
    description: str

class PaycheckSplitter:
    def __init__(self):
        self.default_buckets = [
            Bucket(
                name="savings",
                percentage=25.0,
                account_id="savings_account",
                description="Emergency fund and long-term savings"
            ),
            Bucket(
                name="spending",
                percentage=20.0,
                account_id="checking_account",
                description="Monthly spending money"
            ),
            Bucket(
                name="brand",
                percentage=25.0,
                account_id="brand_account",
                description="Personal brand development and growth"
            ),
            Bucket(
                name="investments",
                percentage=15.0,
                account_id="investment_account",
                description="Traditional investments"
            ),
            Bucket(
                name="crypto",
                percentage=15.0,
                account_id="crypto_account",
                description="Cryptocurrency investments"
            )
        ]

    def calculate_splits(self, paycheck_amount: float, custom_buckets: List[Bucket] = None) -> Dict[str, float]:
        """
        Calculate the amount to be transferred to each bucket based on percentages
        """
        buckets = custom_buckets if custom_buckets else self.default_buckets
        
        # Validate total percentage equals 100%
        total_percentage = sum(bucket.percentage for bucket in buckets)
        if not abs(total_percentage - 100.0) < 0.01:  # Allow for small floating point differences
            raise ValueError(f"Total percentage must equal 100%, got {total_percentage}%")

        splits = {}
        for bucket in buckets:
            amount = (paycheck_amount * bucket.percentage) / 100.0
            # Round to 2 decimal places
            splits[bucket.name] = round(amount, 2)

        return splits

    def generate_transfer_instructions(self, paycheck_amount: float, custom_buckets: List[Bucket] = None) -> List[Dict]:
        """
        Generate transfer instructions for each bucket
        """
        splits = self.calculate_splits(paycheck_amount, custom_buckets)
        buckets = custom_buckets if custom_buckets else self.default_buckets
        
        transfer_instructions = []
        for bucket in buckets:
            transfer_instructions.append({
                "from_account": "paycheck_account",
                "to_account": bucket.account_id,
                "amount": splits[bucket.name],
                "description": f"Automatic transfer to {bucket.name} ({bucket.percentage}%)",
                "bucket": bucket.name
            })
        
        return transfer_instructions

    def validate_buckets(self, buckets: List[Bucket]) -> bool:
        """
        Validate bucket configuration
        """
        if not buckets:
            return False
            
        # Check total percentage
        total_percentage = sum(bucket.percentage for bucket in buckets)
        if not abs(total_percentage - 100.0) < 0.01:
            return False
            
        # Check for duplicate bucket names
        bucket_names = [bucket.name for bucket in buckets]
        if len(bucket_names) != len(set(bucket_names)):
            return False
            
        return True

    def get_bucket_summary(self, paycheck_amount: float, custom_buckets: List[Bucket] = None) -> Dict:
        """
        Generate a summary of bucket allocations
        """
        splits = self.calculate_splits(paycheck_amount, custom_buckets)
        buckets = custom_buckets if custom_buckets else self.default_buckets
        
        summary = {
            "total_amount": paycheck_amount,
            "buckets": []
        }
        
        for bucket in buckets:
            summary["buckets"].append({
                "name": bucket.name,
                "percentage": bucket.percentage,
                "amount": splits[bucket.name],
                "account_id": bucket.account_id,
                "description": bucket.description
            })
            
        return summary 