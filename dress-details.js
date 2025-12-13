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

// Helper function to escape HTML and preserve newlines
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Get all images for a dress (supports both old and new format)
function getDressImages(dress) {
    // New format: images array (first is mandatory, rest optional)
    if (dress.images && Array.isArray(dress.images) && dress.images.length > 0) {
        return dress.images;
    }
    // Old format: single image field (for backward compatibility)
    if (dress.image) {
        return [dress.image];
    }
    // Fallback
    return ['https://via.placeholder.com/500x700?text=Dress'];
}

// Render dress details
function renderDressDetails(dress) {
    const detailsContainer = document.getElementById('dressDetails');
    const notFound = document.getElementById('notFound');
    
    if (!detailsContainer) return;
    
    const statusClass = dress.status === 'SoldOut' ? 'status-soldout' : 'status-available';
    const statusText = dress.status || 'Available';
    const isSoldOut = dress.status === 'SoldOut';
    
    // Get all images for the dress
    const images = getDressImages(dress);
    const mainImage = images[0]; // First image is mandatory
    
    // Generate thumbnail HTML
    const thumbnailsHTML = images.map((img, index) => {
        const isActive = index === 0 ? 'active' : '';
        return `
            <div class="image-thumbnail ${isActive}" data-image-index="${index}" data-image-url="${escapeHtml(img)}">
                <img src="${escapeHtml(img)}" alt="${escapeHtml(dress.name)} - Image ${index + 1}" onerror="this.src='https://via.placeholder.com/100x100?text=Image'">
            </div>
        `;
    }).join('');
    
    detailsContainer.innerHTML = `
        <div class="dress-details-content">
            <div class="dress-details-image-section">
                <div class="dress-details-image">
                    <img id="mainDressImage" src="${escapeHtml(mainImage)}" alt="${escapeHtml(dress.name)}" onerror="this.src='https://via.placeholder.com/500x700?text=Dress'">
                </div>
                ${images.length > 1 ? `
                <div class="dress-image-thumbnails">
                    ${thumbnailsHTML}
                </div>
                ` : ''}
            </div>
            <div class="dress-details-info">
                <h1 class="dress-details-name">${escapeHtml(dress.name)}</h1>
                <p class="dress-details-id">${escapeHtml(dress.id)}</p>
                <div class="dress-details-price">₹${dress.price.toFixed(2)}</div>
                <div class="dress-details-status">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value ${statusClass}">${escapeHtml(statusText)}</span>
                </div>
                <div class="dress-details-category">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value">${escapeHtml(dress.category)}</span>
                </div>
                <div class="dress-details-tags">
                    <span class="detail-label">Tags:</span>
                    <div class="tags-list">
                        ${dress.tags && dress.tags.length > 0 
                            ? dress.tags.map(tag => `<span class="tag-badge">${escapeHtml(tag)}</span>`).join('') 
                            : '<span class="no-tags">No tags</span>'}
                    </div>
                </div>
                <div class="dress-details-description">
                    <span class="detail-label">Description:</span>
                    <p class="detail-description-text">${escapeHtml(dress.description || 'No description available.')}</p>
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
    
    // Store images array for the switchMainImage function
    detailsContainer.dataset.images = JSON.stringify(images);
    
    // Add event listeners to thumbnails
    setTimeout(() => {
        const thumbnails = detailsContainer.querySelectorAll('.image-thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.dataset.imageIndex);
                const imageUrl = this.dataset.imageUrl;
                switchMainImage(index, imageUrl);
            });
        });
    }, 0);
    
    if (detailsContainer) {
        detailsContainer.style.display = 'block';
    }
    if (notFound) {
        notFound.style.display = 'none';
    }
}

// Switch main image when thumbnail is clicked
function switchMainImage(index, imageUrl) {
    const mainImage = document.getElementById('mainDressImage');
    if (mainImage) {
        mainImage.src = imageUrl;
    }
    
    // Update active thumbnail
    const detailsContainer = document.getElementById('dressDetails');
    if (detailsContainer) {
        const thumbnails = detailsContainer.querySelectorAll('.image-thumbnail');
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
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

// Make handleAddToCart and switchMainImage available globally
window.handleAddToCart = handleAddToCart;
window.switchMainImage = switchMainImage;

