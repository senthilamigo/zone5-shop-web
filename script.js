// LocalStorage Utilities

// Initialize LocalStorage with empty arrays if they don't exist
function initLocalStorage() {
    if (!localStorage.getItem('dressesInventory')) {
        localStorage.setItem('dressesInventory', JSON.stringify([]));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Get all dresses from LocalStorage
function getDresses() {
    const dresses = localStorage.getItem('dressesInventory');
    return dresses ? JSON.parse(dresses) : [];
}

// Save a dress (add or update)
function saveDress(dress) {
    const dresses = getDresses();
    const existingIndex = dresses.findIndex(d => d.id === dress.id);
    
    if (existingIndex >= 0) {
        // Update existing dress
        dresses[existingIndex] = dress;
    } else {
        // Add new dress
        dresses.push(dress);
    }
    
    localStorage.setItem('dressesInventory', JSON.stringify(dresses));
    return dress;
}

// Delete a dress by ID
function deleteDress(id) {
    const dresses = getDresses();
    const filtered = dresses.filter(d => d.id !== id);
    localStorage.setItem('dressesInventory', JSON.stringify(filtered));
    return filtered;
}

// Get a dress by ID
function getDressById(id) {
    const dresses = getDresses();
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

// Initialize sample data
function initSampleData() {
    const dresses = getDresses();
    
    // Only initialize if inventory is empty
    if (dresses.length > 0) {
        return;
    }
    
    let idCounter = 1;
    const sampleDresses = [
        // Silk Sarees
        {
            id: 'dress-' + (idCounter++),
            name: "Elegant Silk Saree - Festive",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
            description: "Beautiful traditional silk saree perfect for festive occasions",
            category: "silk sarees",
            tags: ["festive", "traditional", "wedding"],
            price: 8999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Designer Silk Saree - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer silk saree for parties and celebrations",
            category: "silk sarees",
            tags: ["party", "designer", "elegant"],
            price: 12999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Classic Silk Saree - Traditional",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Classic silk saree with traditional patterns",
            category: "silk sarees",
            tags: ["traditional", "classic", "wedding"],
            price: 7999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Modern Silk Saree - Casual",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Modern twist on traditional silk saree for casual wear",
            category: "silk sarees",
            tags: ["casual", "modern", "comfortable"],
            price: 6999.00
        },
        // Anarkali Sarees
        {
            id: 'dress-' + (idCounter++),
            name: "Floral Anarkali Saree - Festive",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Beautiful floral print anarkali saree for festive occasions",
            category: "anarkali sarees",
            tags: ["festive", "floral", "elegant"],
            price: 5999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Designer Anarkali Saree - Party",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Stylish designer anarkali saree perfect for parties",
            category: "anarkali sarees",
            tags: ["party", "designer", "stylish"],
            price: 8999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Traditional Anarkali Saree - Wedding",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree for wedding ceremonies",
            category: "anarkali sarees",
            tags: ["wedding", "traditional", "ceremony"],
            price: 11999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Casual Anarkali Saree - Office",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Comfortable anarkali saree suitable for office wear",
            category: "anarkali sarees",
            tags: ["office", "casual", "professional"],
            price: 4999.00
        },
        // Formal
        {
            id: 'dress-' + (idCounter++),
            name: "Professional Formal Dress - Office",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Elegant professional formal dress for office wear",
            category: "formal",
            tags: ["office", "professional", "business"],
            price: 3999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Classic Formal Dress - Party",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Classic formal dress perfect for parties and events",
            category: "formal",
            tags: ["party", "classic", "elegant"],
            price: 5999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Modern Formal Dress - Casual",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Modern formal dress with casual appeal",
            category: "formal",
            tags: ["casual", "modern", "comfortable"],
            price: 3499.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Designer Formal Dress - Festive",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Designer formal dress for festive celebrations",
            category: "formal",
            tags: ["festive", "designer", "celebration"],
            price: 7999.00
        },
        // Churidar
        {
            id: 'dress-' + (idCounter++),
            name: "Elegant Churidar Set - Festive",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Beautiful churidar set perfect for festive occasions",
            category: "churidar",
            tags: ["festive", "elegant", "traditional"],
            price: 4999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Designer Churidar Set - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer churidar set for parties",
            category: "churidar",
            tags: ["party", "designer", "stylish"],
            price: 6999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Traditional Churidar Set - Wedding",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Traditional churidar set for wedding ceremonies",
            category: "churidar",
            tags: ["wedding", "traditional", "ceremony"],
            price: 8999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Casual Churidar Set - Office",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Comfortable churidar set suitable for office wear",
            category: "churidar",
            tags: ["office", "casual", "comfortable"],
            price: 3999.00
        },
        // Additional dresses to ensure 6 sections with 4 each
        {
            id: 'dress-' + (idCounter++),
            name: "Premium Silk Saree - Wedding",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Premium quality silk saree for wedding ceremonies",
            category: "silk sarees",
            tags: ["wedding", "premium", "luxury"],
            price: 15999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Festive Anarkali Saree - Traditional",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree with festive designs",
            category: "anarkali sarees",
            tags: ["festive", "traditional", "celebration"],
            price: 6999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Business Formal Dress - Professional",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Professional business formal dress for corporate events",
            category: "formal",
            tags: ["office", "professional", "corporate"],
            price: 4499.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Wedding Churidar Set - Traditional",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Traditional wedding churidar set with intricate designs",
            category: "churidar",
            tags: ["wedding", "traditional", "intricate"],
            price: 10999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Party Silk Saree - Elegant",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Elegant silk saree perfect for party occasions",
            category: "silk sarees",
            tags: ["party", "elegant", "celebration"],
            price: 9999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Office Anarkali Saree - Professional",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Professional anarkali saree suitable for office environment",
            category: "anarkali sarees",
            tags: ["office", "professional", "business"],
            price: 5499.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Casual Formal Dress - Comfortable",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Comfortable casual formal dress for everyday wear",
            category: "formal",
            tags: ["casual", "comfortable", "everyday"],
            price: 2999.00
        },
        {
            id: 'dress-' + (idCounter++),
            name: "Festive Churidar Set - Celebration",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Celebration-worthy churidar set for festive occasions",
            category: "churidar",
            tags: ["festive", "celebration", "special"],
            price: 5999.00
        }
    ];
    
    // Save all sample dresses
    sampleDresses.forEach(dress => {
        saveDress(dress);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initLocalStorage();
    initSampleData();
    updateCartCount();
});

