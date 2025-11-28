// Dress Data Management - JSON File Based

// Global variable to store dresses loaded from JSON
let dressesData = [];
let dressesLoaded = false;

// Initialize cart in localStorage
function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Global variable to store admin email
let adminEmail = '';

// Load dresses from JSON file
async function loadDressesFromJSON() {
    if (dressesLoaded) {
        return dressesData;
    }
    
    try {
        const response = await fetch('dresses.json');
        if (!response.ok) {
            throw new Error('Failed to load dresses.json');
        }
        const jsonData = await response.json();
        
        // Handle both new object format and legacy array format
        let dressesArray = [];
        if (Array.isArray(jsonData)) {
            // Legacy format: just an array of dresses
            dressesArray = jsonData;
            adminEmail = localStorage.getItem('adminEmail') || '';
        } else if (jsonData.dresses && Array.isArray(jsonData.dresses)) {
            // New format: object with adminEmail and dresses
            dressesArray = jsonData.dresses;
            adminEmail = jsonData.adminEmail || localStorage.getItem('adminEmail') || '';
            // Save admin email to localStorage for quick access
            if (jsonData.adminEmail) {
                localStorage.setItem('adminEmail', jsonData.adminEmail);
            }
        } else {
            throw new Error('Invalid JSON structure');
        }
        
        // Merge with localStorage cache if it exists (for admin edits)
        const cachedDresses = localStorage.getItem('dressesInventory');
        if (cachedDresses) {
            const cached = JSON.parse(cachedDresses);
            // Merge: cached items override JSON items with same ID, new items from JSON are added
            const merged = [...dressesArray];
            cached.forEach(cachedDress => {
                const index = merged.findIndex(d => d.id === cachedDress.id);
                if (index >= 0) {
                    merged[index] = cachedDress;
                } else {
                    merged.push(cachedDress);
                }
            });
            dressesData = merged;
        } else {
            dressesData = dressesArray;
        }
        
        // Ensure all dresses have status field
        dressesData = dressesData.map(dress => {
            if (!dress.status) {
                dress.status = 'Available';
            }
            return dress;
        });
        
        dressesLoaded = true;
        return dressesData;
    } catch (error) {
        console.error('Error loading dresses.json:', error);
        // Fallback to localStorage if JSON file doesn't exist
        const cachedDresses = localStorage.getItem('dressesInventory');
        if (cachedDresses) {
            dressesData = JSON.parse(cachedDresses);
            dressesLoaded = true;
            return dressesData;
        }
        adminEmail = localStorage.getItem('adminEmail') || '';
        return [];
    }
}

// Get admin email
function getAdminEmail() {
    return adminEmail || localStorage.getItem('adminEmail') || '';
}

// Set admin email
function setAdminEmail(email) {
    adminEmail = email;
    localStorage.setItem('adminEmail', email);
}

// Get all dresses (loads from JSON if not already loaded)
async function getDresses() {
    if (!dressesLoaded) {
        await loadDressesFromJSON();
    }
    return dressesData;
}

// Synchronous version for backward compatibility (returns cached data)
function getDressesSync() {
    return dressesData;
}

// Save a dress (add or update) - saves to localStorage cache
function saveDress(dress) {
    // Ensure status field exists
    if (!dress.status) {
        dress.status = 'Available';
    }
    
    const dresses = getDressesSync();
    const existingIndex = dresses.findIndex(d => d.id === dress.id);
    
    if (existingIndex >= 0) {
        // Update existing dress
        dresses[existingIndex] = dress;
    } else {
        // Add new dress
        dresses.push(dress);
    }
    
    // Update global cache
    dressesData = dresses;
    
    // Save to localStorage as cache
    localStorage.setItem('dressesInventory', JSON.stringify(dresses));
    return dress;
}

// Delete a dress by ID
function deleteDress(id) {
    const dresses = getDressesSync();
    const filtered = dresses.filter(d => d.id !== id);
    
    // Update global cache
    dressesData = filtered;
    
    // Update localStorage cache
    localStorage.setItem('dressesInventory', JSON.stringify(filtered));
    return filtered;
}

// Get a dress by ID
function getDressById(id) {
    const dresses = getDressesSync();
    return dresses.find(d => d.id === id);
}

// Get cart from LocalStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Add dress to cart
function addToCart(dressId) {
    const cart = getCart();
    const dress = getDressById(dressId);
    
    // Check if dress is available
    if (dress && dress.status === 'SoldOut') {
        alert('This dress is currently sold out.');
        return false;
    }
    
    if (dress && !cart.find(item => item.id === dressId)) {
        cart.push(dress);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        return true;
    }
    return false;
}

// Remove dress from cart
function removeFromCart(dressId) {
    const cart = getCart();
    const filtered = cart.filter(item => item.id !== dressId);
    localStorage.setItem('cart', JSON.stringify(filtered));
    updateCartCount();
    return filtered;
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Export dresses to JSON file (download)
function exportDressesToJSON() {
    const dresses = getDressesSync();
    const email = getAdminEmail();
    const exportData = {
        adminEmail: email,
        dresses: dresses
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dresses.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    initCart();
    await loadDressesFromJSON();
    updateCartCount();
    
    // Dispatch custom event when dresses are loaded
    window.dispatchEvent(new CustomEvent('dressesLoaded'));
});

// Make functions available globally
window.exportDressesToJSON = exportDressesToJSON;
window.getAdminEmail = getAdminEmail;
window.setAdminEmail = setAdminEmail;
