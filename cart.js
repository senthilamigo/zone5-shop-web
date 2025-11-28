// Cart Page JavaScript

// EmailJS configuration - replace the placeholder strings with your EmailJS credentials
const EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || 'REPLACE_WITH_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || 'REPLACE_WITH_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || 'REPLACE_WITH_TEMPLATE_ID';

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

// Show checkout form
function showCheckoutForm() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutForm) {
        checkoutForm.style.display = 'block';
    }
    if (checkoutBtn) {
        checkoutBtn.style.display = 'none';
    }
    
    // Scroll to form
    checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide checkout form
function hideCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutForm) {
        checkoutForm.style.display = 'none';
    }
    if (checkoutBtn) {
        checkoutBtn.style.display = 'block';
    }
}

// Handle checkout
async function handleCheckout(event) {
    event.preventDefault();
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    
    if (!customerName || !customerEmail) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Get admin email
    const adminEmail = getAdminEmail();
    
    if (!adminEmail) {
        alert('Admin email is not configured. Please contact the administrator.');
        return;
    }
    
    // Prepare order details
    let total = 0;
    let orderItemsHTML = '';
    let orderItemsText = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        orderItemsHTML += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>₹${item.price.toFixed(2)}</td>
        </tr>`;
        orderItemsText += `${index + 1}. ${item.name}\n   Price: ₹${item.price.toFixed(2)}\n   Category: ${item.category}\n\n`;
    });
    
    // Try to send email using EmailJS if available, otherwise use mailto
    const emailSent = await sendOrderEmail(adminEmail, customerName, customerEmail, orderItemsText, total, orderItemsHTML);
    
    if (emailSent) {
        alert('Order submitted successfully! The admin has been notified.');
    } else {
        // Fallback to mailto
        const subject = encodeURIComponent(`New Order from ${customerName}`);
        const body = encodeURIComponent(`New Order Received

Customer Information:
Name: ${customerName}
Email: ${customerEmail}

Order Details:
${orderItemsText}
Total Amount: ₹${total.toFixed(2)}

Order Date: ${new Date().toLocaleString()}
`);
        const mailtoLink = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        alert('Order submitted! Your email client will open to send the order details to the admin.');
    }
    
    // Clear cart after successful submission
    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify([]));
        updateCartCount();
        window.location.href = 'index.html';
    }, 1000);
}

// Send order email using EmailJS or mailto fallback
async function sendOrderEmail(adminEmail, customerName, customerEmail, orderItemsText, total, orderItemsHTML) {
    if (!isEmailJsConfigured()) {
        console.warn('EmailJS is not configured. Falling back to mailto.');
        return false;
    }
    
    try {
        const templateParams = {
            to_email: adminEmail,
            customer_name: customerName,
            customer_email: customerEmail,
            order_items: orderItemsHTML,
            order_items_text: orderItemsText,
            total_amount: `₹${total.toFixed(2)}`,
            order_date: new Date().toLocaleString()
        };
        
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        return true;
    } catch (error) {
        console.error('EmailJS error:', error);
        alert('Unable to send email using EmailJS. Your email client will open as a fallback.');
        return false;
    }
}

function isEmailJsConfigured() {
    return (
        typeof emailjs !== 'undefined' &&
        EMAILJS_PUBLIC_KEY &&
        EMAILJS_PUBLIC_KEY !== 'REPLACE_WITH_PUBLIC_KEY' &&
        EMAILJS_SERVICE_ID &&
        EMAILJS_SERVICE_ID !== 'REPLACE_WITH_SERVICE_ID' &&
        EMAILJS_TEMPLATE_ID &&
        EMAILJS_TEMPLATE_ID !== 'REPLACE_WITH_TEMPLATE_ID'
    );
}

function initializeEmailJs() {
    if (isEmailJsConfigured()) {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    // Ensure dresses and admin email are loaded
    await getDresses();
    initializeEmailJs();
    loadCart();
});

// Make functions available globally
window.removeItem = removeItem;
window.showCheckoutForm = showCheckoutForm;
window.hideCheckoutForm = hideCheckoutForm;
window.handleCheckout = handleCheckout;

