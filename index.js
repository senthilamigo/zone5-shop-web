// Index Page JavaScript

// Load and display sections grouped by category+tag combinations
async function loadSections() {
    const dresses = await getDresses();
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
        if (category != "Unstitched Salwar Suits" && key != "Salwar Suit" ) {        
            // Take up to 4 dresses, or all if less than 4
            const sectionDressesLimited = sectionDresses.slice(0, Math.min(4, sectionDresses.length));
            renderSection(category, tag, sectionDressesLimited);
        }
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
    const status = dress.status || 'Available';
    const isSoldOut = status === 'SoldOut';
    const statusBadge = isSoldOut ? '<div class="product-card-badge" style="background-color: #cc0000; top: 10px; right: 10px;">Sold Out</div>' : '';
    
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${imageUrl}" alt="${dress.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300?text=Dress';">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${dress.tags[0]}</div>` : ''}
            ${statusBadge}
        </div>
    `;
    
    // Add click handler to navigate to details page
    card.addEventListener('click', function(e) {
        window.location.href = `dress-details.html?id=${dress.id}`;
    });
    
    return card;
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    // Wait for dresses to be loaded from JSON
    await loadSections();
    
    // Also reload sections when data might have changed
    window.addEventListener('dressesLoaded', function() {
        loadSections();
    });
    
    // Reload on storage changes (for admin edits)
    window.addEventListener('storage', function() {
        loadSections();
    });
});

// Make loadSections available globally
window.loadSections = loadSections;


