// Cart Page JavaScript

// Load cart and display items
function loadCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItems || !cartContent || !emptyCart) return;
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        updateSummary(0);
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';
    
    cartItems.innerHTML = '';
    
    cart.forEach(dress => {
        const item = createCartItem(dress);
        cartItems.appendChild(item);
    });
    
    calculateTotal();
}

// Create cart item
function createCartItem(dress) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    
    item.innerHTML = `
        <img src="${dress.image}" alt="${dress.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/120x160?text=Dress'">
        <div class="cart-item-content">
            <h3 class="cart-item-name">${dress.name}</h3>
            <p class="cart-item-price">₹${dress.price.toFixed(2)}</p>
            <button class="btn btn-secondary" onclick="removeItem('${dress.id}')">Remove</button>
        </div>
    `;
    
    return item;
}

// Remove item from cart
function removeItem(dressId) {
    const dress = getDressById(dressId);
    if (dress && confirm(`Remove "${dress.name}" from cart?`)) {
        removeFromCart(dressId);
        loadCart();
    }
}

// Calculate total
function calculateTotal() {
    const cart = getCart();
    let subtotal = 0;
    
    cart.forEach(dress => {
        subtotal += dress.price;
    });
    
    updateSummary(subtotal);
}

// Update summary
function updateSummary(subtotal) {
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) {
        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    }
    
    if (totalEl) {
        totalEl.textContent = `₹${subtotal.toFixed(2)}`;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

// Make removeItem available globally
window.removeItem = removeItem;

