// Display Page JavaScript

let allDresses = [];
let filteredDresses = [];
let selectedCategories = [];
let selectedTags = [];

// Load all dresses and display them
async function loadAllDresses() {
    allDresses = await getDresses();
    filteredDresses = [...allDresses];
    renderProductGrid(filteredDresses);
    setupFilters();
    updateProductCount();
}

// Setup filter checkboxes
function setupFilters() {
    setupCategoryFilters();
    setupTagFilters();
}

// Setup category filters
function setupCategoryFilters() {
    const categoryFiltersContainer = document.getElementById('categoryFilters');
    if (!categoryFiltersContainer) return;
    
    const categories = ['silk sarees', 'anarkali sarees', 'formal', 'churidar'];
    
    categoryFiltersContainer.innerHTML = '';
    
    categories.forEach(category => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `category-${category}`;
        checkbox.value = category;
        checkbox.addEventListener('change', handleFilterChange);
        
        const label = document.createElement('label');
        label.htmlFor = `category-${category}`;
        label.textContent = category;
        
        option.appendChild(checkbox);
        option.appendChild(label);
        categoryFiltersContainer.appendChild(option);
    });
}

// Setup tag filters
function setupTagFilters() {
    const tagFiltersContainer = document.getElementById('tagFilters');
    if (!tagFiltersContainer) return;
    
    // Get all unique tags from dresses
    const allTags = new Set();
    allDresses.forEach(dress => {
        if (dress.tags && Array.isArray(dress.tags)) {
            dress.tags.forEach(tag => {
                if (tag && tag.trim()) {
                    allTags.add(tag.trim());
                }
            });
        }
    });
    
    const sortedTags = Array.from(allTags).sort();
    
    tagFiltersContainer.innerHTML = '';
    
    if (sortedTags.length === 0) {
        tagFiltersContainer.innerHTML = '<p style="font-size: 12px; color: #666;">No tags available</p>';
        return;
    }
    
    sortedTags.forEach(tag => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `tag-${tag}`;
        checkbox.value = tag;
        checkbox.addEventListener('change', handleFilterChange);
        
        const label = document.createElement('label');
        label.htmlFor = `tag-${tag}`;
        label.textContent = tag;
        
        option.appendChild(checkbox);
        option.appendChild(label);
        tagFiltersContainer.appendChild(option);
    });
}

// Handle filter change
function handleFilterChange() {
    selectedCategories = [];
    selectedTags = [];
    
    // Get selected categories
    const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]:checked');
    categoryCheckboxes.forEach(cb => {
        selectedCategories.push(cb.value);
    });
    
    // Get selected tags
    const tagCheckboxes = document.querySelectorAll('#tagFilters input[type="checkbox"]:checked');
    tagCheckboxes.forEach(cb => {
        selectedTags.push(cb.value);
    });
    
    applyFilters();
}

// Apply filters
function applyFilters() {
    filteredDresses = allDresses.filter(dress => {
        // Category filter
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(dress.category);
        
        // Tag filter
        let tagMatch = true;
        if (selectedTags.length > 0) {
            tagMatch = dress.tags && dress.tags.some(tag => selectedTags.includes(tag.trim()));
        }
        
        return categoryMatch && tagMatch;
    });
    
    renderProductGrid(filteredDresses);
    updateProductCount();
}

// Render product grid
function renderProductGrid(dresses) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (dresses.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">No dresses match your filters.</p>';
        return;
    }
    
    dresses.forEach(dress => {
        const card = createProductCard(dress);
        productsGrid.appendChild(card);
    });
}

// Create product card for display page
// Helper function to escape HTML and preserve newlines
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createProductCard(dress) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const status = dress.status || 'Available';
    const isSoldOut = status === 'SoldOut';
    const statusBadge = isSoldOut ? '<div class="product-card-badge" style="background-color: #cc0000;">Sold Out</div>' : '';
    
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${escapeHtml(dress.image)}" alt="${escapeHtml(dress.name)}" onerror="this.src='https://via.placeholder.com/300x400?text=Dress'">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${escapeHtml(dress.tags[0])}</div>` : ''}
            ${statusBadge}
        </div>
        <div class="product-card-content">
            <h3 class="product-card-name">${escapeHtml(dress.name)}</h3>
            <p class="product-card-description">${escapeHtml(dress.description || '')}</p>
            <div class="product-card-price">₹${dress.price.toFixed(2)}</div>
            <div class="product-card-actions">
                <a href="dress-details.html?id=${dress.id}" class="btn btn-primary" style="width: 100%; display: block; text-align: center; margin-bottom: 8px;">View Details</a>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); handleAddToCart('${dress.id}')" style="width: 100%;" ${isSoldOut ? 'disabled' : ''}>${isSoldOut ? 'Sold Out' : 'Add to Cart'}</button>
            </div>
        </div>
    `;
    
    // Add click handler to navigate to details page
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.btn')) {
            window.location.href = `dress-details.html?id=${dress.id}`;
        }
    });
    
    return card;
}

// Handle add to cart
function handleAddToCart(dressId) {
    const dress = getDressById(dressId);
    if (dress && dress.status === 'SoldOut') {
        alert('This dress is currently sold out.');
        return;
    }
    
    const added = addToCart(dressId);
    if (added) {
        alert('Dress added to cart!');
    } else {
        alert('Dress is already in cart or not found.');
    }
}

// Update product count
function updateProductCount() {
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = `${filteredDresses.length} product${filteredDresses.length !== 1 ? 's' : ''}`;
    }
}

// Clear all filters
function clearFilters() {
    selectedCategories = [];
    selectedTags = [];
    
    const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]');
    categoryCheckboxes.forEach(cb => cb.checked = false);
    
    const tagCheckboxes = document.querySelectorAll('#tagFilters input[type="checkbox"]');
    tagCheckboxes.forEach(cb => cb.checked = false);
    
    applyFilters();
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    await loadAllDresses();
    
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Reload when dresses are updated
    window.addEventListener('dressesLoaded', function() {
        loadAllDresses();
    });
});

// Make functions available globally
window.handleAddToCart = handleAddToCart;
window.clearFilters = clearFilters;

