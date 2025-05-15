import pytest
from agent.paycheck_splitter import PaycheckSplitter, Bucket

def test_default_buckets():
    """Test default bucket configuration"""
    splitter = PaycheckSplitter()
    assert len(splitter.default_buckets) == 5
    
    # Verify percentages
    total_percentage = sum(bucket.percentage for bucket in splitter.default_buckets)
    assert abs(total_percentage - 100.0) < 0.01
    
    # Verify bucket names
    bucket_names = [bucket.name for bucket in splitter.default_buckets]
    assert "savings" in bucket_names
    assert "spending" in bucket_names
    assert "brand" in bucket_names
    assert "investments" in bucket_names
    assert "crypto" in bucket_names

def test_calculate_splits():
    """Test paycheck splitting calculations"""
    splitter = PaycheckSplitter()
    paycheck_amount = 5000.0
    
    splits = splitter.calculate_splits(paycheck_amount)
    
    # Verify total
    assert sum(splits.values()) == paycheck_amount
    
    # Verify individual splits
    assert splits["savings"] == 1250.0  # 25%
    assert splits["spending"] == 1000.0  # 20%
    assert splits["brand"] == 1250.0  # 25%
    assert splits["investments"] == 750.0  # 15%
    assert splits["crypto"] == 750.0  # 15%

def test_custom_buckets():
    """Test custom bucket configuration"""
    splitter = PaycheckSplitter()
    custom_buckets = [
        Bucket(
            name="savings",
            percentage=50.0,
            account_id="savings_account",
            description="Emergency fund"
        ),
        Bucket(
            name="investments",
            percentage=50.0,
            account_id="investment_account",
            description="Long-term investments"
        )
    ]
    
    paycheck_amount = 5000.0
    splits = splitter.calculate_splits(paycheck_amount, custom_buckets)
    
    assert splits["savings"] == 2500.0
    assert splits["investments"] == 2500.0

def test_invalid_buckets():
    """Test invalid bucket configurations"""
    splitter = PaycheckSplitter()
    
    # Test total percentage not 100%
    invalid_buckets = [
        Bucket(
            name="savings",
            percentage=60.0,
            account_id="savings_account",
            description="Emergency fund"
        ),
        Bucket(
            name="investments",
            percentage=60.0,
            account_id="investment_account",
            description="Long-term investments"
        )
    ]
    
    with pytest.raises(ValueError):
        splitter.calculate_splits(5000.0, invalid_buckets)

def test_generate_transfer_instructions():
    """Test transfer instruction generation"""
    splitter = PaycheckSplitter()
    paycheck_amount = 5000.0
    
    instructions = splitter.generate_transfer_instructions(paycheck_amount)
    
    assert len(instructions) == 5
    
    # Verify first instruction
    first_instruction = instructions[0]
    assert first_instruction["from_account"] == "paycheck_account"
    assert first_instruction["amount"] in [1250.0, 1000.0, 750.0]  # One of the split amounts
    assert "Automatic transfer to" in first_instruction["description"]

def test_bucket_validation():
    """Test bucket validation"""
    splitter = PaycheckSplitter()
    
    # Valid buckets
    valid_buckets = [
        Bucket(
            name="savings",
            percentage=50.0,
            account_id="savings_account",
            description="Emergency fund"
        ),
        Bucket(
            name="investments",
            percentage=50.0,
            account_id="investment_account",
            description="Long-term investments"
        )
    ]
    assert splitter.validate_buckets(valid_buckets) is True
    
    # Invalid buckets (duplicate names)
    invalid_buckets = [
        Bucket(
            name="savings",
            percentage=50.0,
            account_id="savings_account",
            description="Emergency fund"
        ),
        Bucket(
            name="savings",  # Duplicate name
            percentage=50.0,
            account_id="investment_account",
            description="Long-term investments"
        )
    ]
    assert splitter.validate_buckets(invalid_buckets) is False

def test_bucket_summary():
    """Test bucket summary generation"""
    splitter = PaycheckSplitter()
    paycheck_amount = 5000.0
    
    summary = splitter.get_bucket_summary(paycheck_amount)
    
    assert summary["total_amount"] == paycheck_amount
    assert len(summary["buckets"]) == 5
    
    # Verify first bucket in summary
    first_bucket = summary["buckets"][0]
    assert "name" in first_bucket
    assert "percentage" in first_bucket
    assert "amount" in first_bucket
    assert "account_id" in first_bucket
    assert "description" in first_bucket 