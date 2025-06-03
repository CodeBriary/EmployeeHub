# Vintage Clothing Inventory System

A simple command-line inventory management system for tracking vintage clothing items.

## Features

- Add new items to inventory
- View current inventory
- Update existing items
- Delete items
- Search items by name, category, or size
- Color-coded interface for better readability
- Data persistence using JSON storage

## Setup

1. Make sure you have Python 3.6 or higher installed
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

Run the program:
```
python vintage_inventory.py
```

### Menu Options

1. **Add new item**: Add a new vintage clothing item to the inventory
   - Enter item details including name, category, size, condition, price, and quantity
   
2. **View inventory**: Display all items in the current inventory
   
3. **Update item**: Modify details of an existing item
   - Enter the item ID and update the desired fields
   
4. **Delete item**: Remove an item from the inventory
   - Enter the item ID to delete
   
5. **Search items**: Find items by name, category, or size
   
6. **Exit**: Close the program

## Data Storage

All inventory data is stored in `inventory.json` in the same directory as the program. The data persists between program runs. 