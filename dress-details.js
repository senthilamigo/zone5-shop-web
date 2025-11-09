// Dress Details Page JavaScript

// Load dress details from URL parameter
async function loadDressDetails() {
    // Get dress ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dressId = urlParams.get('id');
    
    if (!dressId) {
        showNotFound();
        return;
    }
    
    // Ensure dresses are loaded
    await getDresses();
    const dress = getDressById(dressId);
    
    if (!dress) {
        showNotFound();
        return;
    }
    
    renderDressDetails(dress);
}

// Render dress details
function renderDressDetails(dress) {
    const detailsContainer = document.getElementById('dressDetails');
    const notFound = document.getElementById('notFound');
    
    if (!detailsContainer) return;
    
    const statusClass = dress.status === 'SoldOut' ? 'status-soldout' : 'status-available';
    const statusText = dress.status || 'Available';
    const isSoldOut = dress.status === 'SoldOut';
    
    detailsContainer.innerHTML = `
        <div class="dress-details-content">
            <div class="dress-details-image">
                <img src="${dress.image}" alt="${dress.name}" onerror="this.src='https://via.placeholder.com/500x700?text=Dress'">
            </div>
            <div class="dress-details-info">
                <h1 class="dress-details-name">${dress.name}</h1>
                <div class="dress-details-price">₹${dress.price.toFixed(2)}</div>
                <div class="dress-details-status">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value ${statusClass}">${statusText}</span>
                </div>
                <div class="dress-details-category">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value">${dress.category}</span>
                </div>
                <div class="dress-details-tags">
                    <span class="detail-label">Tags:</span>
                    <div class="tags-list">
                        ${dress.tags && dress.tags.length > 0 
                            ? dress.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('') 
                            : '<span class="no-tags">No tags</span>'}
                    </div>
                </div>
                <div class="dress-details-description">
                    <span class="detail-label">Description:</span>
                    <p class="detail-description-text">${dress.description || 'No description available.'}</p>
                </div>
                <div class="dress-details-actions">
                    <button class="btn btn-primary btn-add-to-cart" onclick="handleAddToCart('${dress.id}')" ${isSoldOut ? 'disabled' : ''}>
                        ${isSoldOut ? 'Sold Out' : 'Add to Cart'}
                    </button>
                    <a href="display.html" class="btn btn-secondary">Continue Shopping</a>
                </div>
            </div>
        </div>
    `;
    
    if (detailsContainer) {
        detailsContainer.style.display = 'block';
    }
    if (notFound) {
        notFound.style.display = 'none';
    }
}

// Show not found message
function showNotFound() {
    const detailsContainer = document.getElementById('dressDetails');
    const notFound = document.getElementById('notFound');
    
    if (detailsContainer) {
        detailsContainer.style.display = 'none';
    }
    if (notFound) {
        notFound.style.display = 'block';
    }
}

// Handle add to cart
function handleAddToCart(dressId) {
    const added = addToCart(dressId);
    if (added) {
        alert('Dress added to cart!');
    } else {
        alert('Dress is already in cart or not found.');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    await loadDressDetails();
});

// Make handleAddToCart available globally
window.handleAddToCart = handleAddToCart;

