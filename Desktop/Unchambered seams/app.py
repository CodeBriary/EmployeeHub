from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['UPLOAD_FOLDER'] = 'uploads'

# Create uploads folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    condition = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text)
    image_url = db.Column(db.String(200))
    image_file = db.Column(db.String(200))  # For uploaded images

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return redirect(url_for('catalog'))

@app.route('/catalog')
def catalog():
    # Get filter parameters
    category = request.args.get('category', '')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort_by = request.args.get('sort_by', 'date_added')
    sort_order = request.args.get('sort_order', 'desc')
    search_query = request.args.get('q', '').strip()
    
    # Base query
    query = Item.query
    
    # Apply search
    if search_query:
        search_terms = search_query.split()
        for term in search_terms:
            query = query.filter(
                (Item.name.ilike(f'%{term}%')) |
                (Item.category.ilike(f'%{term}%')) |
                (Item.size.ilike(f'%{term}%')) |
                (Item.condition.ilike(f'%{term}%')) |
                (Item.notes.ilike(f'%{term}%'))
            )
    
    # Apply filters
    if category:
        query = query.filter(Item.category == category)
    if min_price is not None:
        query = query.filter(Item.price >= min_price)
    if max_price is not None:
        query = query.filter(Item.price <= max_price)
    
    # Apply sorting
    if sort_by == 'price':
        query = query.order_by(Item.price.desc() if sort_order == 'desc' else Item.price.asc())
    elif sort_by == 'name':
        query = query.order_by(Item.name.asc() if sort_order == 'asc' else Item.name.desc())
    else:  # date_added
        query = query.order_by(Item.date_added.desc() if sort_order == 'desc' else Item.date_added.asc())
    
    items = query.all()
    
    # Get unique categories for filter dropdown
    categories = db.session.query(Item.category.distinct()).all()
    categories = [cat[0] for cat in categories]
    
    return render_template('shop.html', 
                         items=items, 
                         categories=categories,
                         selected_category=category,
                         min_price=min_price,
                         max_price=max_price,
                         sort_by=sort_by,
                         sort_order=sort_order,
                         search_query=search_query)

@app.route('/product/<int:id>')
def product_detail(id):
    item = Item.query.get_or_404(id)
    return render_template('product.html', item=item)

if __name__ == '__main__':
    app.run(debug=True) 