// Index Page JavaScript

// Load and display sections grouped by category+tag combinations
function loadSections() {
    const dresses = getDresses();
    const sectionsContainer = document.getElementById('sections-container');
    
    if (!sectionsContainer) return;
    
    // Group dresses by category and tag combinations
    const categoryTagMap = new Map();
    
    dresses.forEach(dress => {
        dress.tags.forEach(tag => {
            const key = `${dress.category}-${tag}`;
            if (!categoryTagMap.has(key)) {
                categoryTagMap.set(key, []);
            }
            categoryTagMap.get(key).push(dress);
        });
    });
    
    // Get unique category+tag combinations and limit to 6 sections
    // Sort by number of dresses (descending) to show sections with most items first
    const combinations = Array.from(categoryTagMap.entries())
        .filter(([key, dresses]) => dresses.length > 0)
        .sort((a, b) => b[1].length - a[1].length) // Sort by dress count descending
        .slice(0, 6);
    
    if (combinations.length === 0) {
        sectionsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No dresses available. Please add dresses in the admin section.</p>';
        return;
    }
    
    sectionsContainer.innerHTML = '';
    
    combinations.forEach(([key, sectionDresses]) => {
        const [category, tag] = key.split('-');
        // Take up to 4 dresses, or all if less than 4
        const sectionDressesLimited = sectionDresses.slice(0, Math.min(4, sectionDresses.length));
        renderSection(category, tag, sectionDressesLimited);
    });
}

// Render a section with category and tag
function renderSection(category, tag, dresses) {
    const sectionsContainer = document.getElementById('sections-container');
    
    const section = document.createElement('section');
    section.className = 'section';
    
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
        <h2>${category} - ${tag}</h2>
    `;
    
    const sectionGrid = document.createElement('div');
    sectionGrid.className = 'section-grid';
    
    dresses.forEach(dress => {
        const card = createProductCard(dress);
        sectionGrid.appendChild(card);
    });
    
    section.appendChild(sectionHeader);
    section.appendChild(sectionGrid);
    sectionsContainer.appendChild(section);
}

// Create product card HTML
function createProductCard(dress) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const imageUrl = dress.image || 'https://via.placeholder.com/300x300?text=Dress';
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${imageUrl}" alt="${dress.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300?text=Dress';">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${dress.tags[0]}</div>` : ''}
        </div>
    `;
    
    // Add click handler to navigate to details page
    card.addEventListener('click', function(e) {
        window.location.href = `dress-details.html?id=${dress.id}`;
    });
    
    return card;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Ensure sample data is initialized first, then load sections
    // Check if data exists, if not wait for initialization
    function tryLoadSections() {
        const dresses = getDresses();
        if (dresses.length > 0) {
            loadSections();
        } else {
            // If no data yet, wait a bit more and try again
            setTimeout(tryLoadSections, 200);
        }
    }
    
    // Start trying to load sections
    tryLoadSections();
    
    // Also reload sections when data might have changed
    window.addEventListener('storage', function() {
        loadSections();
    });
});

// Make loadSections available globally
window.loadSections = loadSections;

