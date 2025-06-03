import json
import os
from datetime import datetime
from tabulate import tabulate
from colorama import init, Fore, Style

# Initialize colorama
init()

class VintageInventory:
    def __init__(self):
        self.inventory_file = "inventory.json"
        self.inventory = self.load_inventory()

    def load_inventory(self):
        if os.path.exists(self.inventory_file):
            with open(self.inventory_file, 'r') as f:
                return json.load(f)
        return []

    def save_inventory(self):
        with open(self.inventory_file, 'w') as f:
            json.dump(self.inventory, f, indent=4)

    def add_item(self):
        print(f"\n{Fore.CYAN}=== Add New Item ==={Style.RESET_ALL}")
        item = {
            'id': len(self.inventory) + 1,
            'name': input("Item name: "),
            'category': input("Category (e.g., Shirts, Pants, Dresses): "),
            'size': input("Size: "),
            'condition': input("Condition (New, Like New, Good, Fair): "),
            'price': float(input("Price: $")),
            'quantity': int(input("Quantity: ")),
            'date_added': datetime.now().strftime("%Y-%m-%d"),
            'notes': input("Additional notes: ")
        }
        self.inventory.append(item)
        self.save_inventory()
        print(f"{Fore.GREEN}Item added successfully!{Style.RESET_ALL}")

    def view_inventory(self):
        if not self.inventory:
            print(f"{Fore.YELLOW}No items in inventory.{Style.RESET_ALL}")
            return

        headers = ['ID', 'Name', 'Category', 'Size', 'Condition', 'Price', 'Quantity', 'Date Added']
        table_data = [[item['id'], item['name'], item['category'], item['size'],
                      item['condition'], f"${item['price']:.2f}", item['quantity'],
                      item['date_added']] for item in self.inventory]
        
        print(f"\n{Fore.CYAN}=== Current Inventory ==={Style.RESET_ALL}")
        print(tabulate(table_data, headers=headers, tablefmt="grid"))

    def update_item(self):
        self.view_inventory()
        if not self.inventory:
            return

        item_id = int(input("\nEnter the ID of the item to update: "))
        for item in self.inventory:
            if item['id'] == item_id:
                print(f"\n{Fore.CYAN}=== Update Item ==={Style.RESET_ALL}")
                item['name'] = input(f"Name [{item['name']}]: ") or item['name']
                item['category'] = input(f"Category [{item['category']}]: ") or item['category']
                item['size'] = input(f"Size [{item['size']}]: ") or item['size']
                item['condition'] = input(f"Condition [{item['condition']}]: ") or item['condition']
                price_input = input(f"Price [${item['price']}]: ")
                item['price'] = float(price_input) if price_input else item['price']
                quantity_input = input(f"Quantity [{item['quantity']}]: ")
                item['quantity'] = int(quantity_input) if quantity_input else item['quantity']
                item['notes'] = input(f"Notes [{item['notes']}]: ") or item['notes']
                
                self.save_inventory()
                print(f"{Fore.GREEN}Item updated successfully!{Style.RESET_ALL}")
                return
        
        print(f"{Fore.RED}Item not found!{Style.RESET_ALL}")

    def delete_item(self):
        self.view_inventory()
        if not self.inventory:
            return

        item_id = int(input("\nEnter the ID of the item to delete: "))
        for i, item in enumerate(self.inventory):
            if item['id'] == item_id:
                del self.inventory[i]
                self.save_inventory()
                print(f"{Fore.GREEN}Item deleted successfully!{Style.RESET_ALL}")
                return
        
        print(f"{Fore.RED}Item not found!{Style.RESET_ALL}")

    def search_items(self):
        if not self.inventory:
            print(f"{Fore.YELLOW}No items in inventory.{Style.RESET_ALL}")
            return

        search_term = input("\nEnter search term (name, category, or size): ").lower()
        results = [item for item in self.inventory if 
                  search_term in item['name'].lower() or 
                  search_term in item['category'].lower() or 
                  search_term in item['size'].lower()]

        if results:
            headers = ['ID', 'Name', 'Category', 'Size', 'Condition', 'Price', 'Quantity', 'Date Added']
            table_data = [[item['id'], item['name'], item['category'], item['size'],
                          item['condition'], f"${item['price']:.2f}", item['quantity'],
                          item['date_added']] for item in results]
            
            print(f"\n{Fore.CYAN}=== Search Results ==={Style.RESET_ALL}")
            print(tabulate(table_data, headers=headers, tablefmt="grid"))
        else:
            print(f"{Fore.YELLOW}No items found matching your search.{Style.RESET_ALL}")

def main():
    inventory = VintageInventory()
    
    while True:
        print(f"\n{Fore.CYAN}=== Vintage Clothing Inventory System ==={Style.RESET_ALL}")
        print("1. Add new item")
        print("2. View inventory")
        print("3. Update item")
        print("4. Delete item")
        print("5. Search items")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ")
        
        if choice == '1':
            inventory.add_item()
        elif choice == '2':
            inventory.view_inventory()
        elif choice == '3':
            inventory.update_item()
        elif choice == '4':
            inventory.delete_item()
        elif choice == '5':
            inventory.search_items()
        elif choice == '6':
            print(f"{Fore.GREEN}Thank you for using the Vintage Clothing Inventory System!{Style.RESET_ALL}")
            break
        else:
            print(f"{Fore.RED}Invalid choice. Please try again.{Style.RESET_ALL}")

if __name__ == "__main__":
    main() 