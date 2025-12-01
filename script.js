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

// GitHub Configuration Functions - Hardcoded Configuration
const GITHUB_CONFIG = {
    owner: 'senthilamigo', // Set your GitHub username here
    repo: 'zone5-shop-web', // Set your repository name here
    path: 'dresses.json',
    branch: 'main',
    token: 'process.env.PAT_TOKEN_KEY' // Set your GitHub Personal Access Token here
};

function getGitHubConfig() {
    console.log("token is ${config.token} ");
    return GITHUB_CONFIG;
}

function setGitHubConfig(config) {
    // Configuration is now hardcoded, this function is kept for backward compatibility
    // but does nothing
    console.warn('setGitHubConfig() called but configuration is hardcoded. Update GITHUB_CONFIG constant in script.js to change configuration.');
}

// Load file from GitHub repository
async function loadFileFromGitHub() {
    const config = getGitHubConfig();
    
    if (!config.owner || !config.repo || !config.token) {
        throw new Error('GitHub configuration is incomplete');
    }
    
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}`;
    
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${config.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('File not found in repository');
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Decode base64 content
    const content = atob(data.content.replace(/\s/g, ''));
    return JSON.parse(content);
}

// Save file to GitHub repository
async function saveFileToGitHub(jsonData, commitMessage = 'Update dresses.json') {
    const config = getGitHubConfig();
    
    if (!config.owner || !config.repo || !config.token) {
        throw new Error('GitHub configuration is incomplete');
    }
    
    // First, get the current file to get its SHA (required for update)
    let sha = null;
    try {
        const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            sha = data.sha;
        }
    } catch (error) {
        // File doesn't exist yet, that's okay
        console.log('File does not exist, will create new file');
    }
    
    // Encode content to base64
    const content = btoa(JSON.stringify(jsonData, null, 2));
    
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`;
    
    const body = {
        message: commitMessage,
        content: content,
        branch: config.branch
    };
    
    if (sha) {
        body.sha = sha;
    }
    
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to save to GitHub: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
    }
    
    return await response.json();
}

// Load dresses from JSON file (GitHub or local fallback)
async function loadDressesFromJSON() {
    if (dressesLoaded) {
        return dressesData;
    }
    
    try {
        let jsonData;
        const config = getGitHubConfig();
        
        // Try GitHub first if configured
        if (config.owner && config.repo && config.token) {
            try {
                jsonData = await loadFileFromGitHub();
                console.log('Loaded dresses from GitHub repository');
            } catch (error) {
                console.warn('Failed to load from GitHub, trying local file:', error);
                // Fallback to local file
                const response = await fetch('dresses.json');
                if (!response.ok) {
                    throw new Error('Failed to load dresses.json');
                }
                jsonData = await response.json();
            }
        } else {
            // Load from local file
            const response = await fetch('dresses.json');
            if (!response.ok) {
                throw new Error('Failed to load dresses.json');
            }
            jsonData = await response.json();
        }
        
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

// Save a dress (add or update) - saves to localStorage cache and optionally to GitHub
async function saveDress(dress, saveToGitHub = false) {
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
    
    // Save to GitHub if requested
    if (saveToGitHub) {
        try {
            const email = getAdminEmail();
            const exportData = {
                adminEmail: email,
                dresses: dresses
            };
            await saveFileToGitHub(exportData, `Update dress: ${dress.name}`);
        } catch (error) {
            console.error('Failed to save to GitHub:', error);
            throw error;
        }
    }
    
    return dress;
}

// Delete a dress by ID
async function deleteDress(id, saveToGitHub = false) {
    const dresses = getDressesSync();
    const dressToDelete = dresses.find(d => d.id === id);
    const filtered = dresses.filter(d => d.id !== id);
    
    // Update global cache
    dressesData = filtered;
    
    // Update localStorage cache
    localStorage.setItem('dressesInventory', JSON.stringify(filtered));
    
    // Save to GitHub if requested
    if (saveToGitHub) {
        try {
            const email = getAdminEmail();
            const exportData = {
                adminEmail: email,
                dresses: filtered
            };
            await saveFileToGitHub(exportData, `Delete dress: ${dressToDelete ? dressToDelete.name : id}`);
        } catch (error) {
            console.error('Failed to save to GitHub:', error);
            throw error;
        }
    }
    
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

// Export dresses to JSON file (save to GitHub or download)
// Convert dresses data to Excel format
function exportDressesToExcel(dresses) {
    // Check if XLSX library is available
    if (typeof XLSX === 'undefined') {
        throw new Error('XLSX library not loaded. Please refresh the page.');
    }
    
    // Prepare data for Excel
    const excelData = dresses.map(dress => ({
        'ID': dress.id || '',
        'Name': dress.name || '',
        'Image URL': dress.image || '',
        'Description': dress.description || '',
        'Category': dress.category || '',
        'Tags': dress.tags ? dress.tags.join(', ') : '',
        'Price (₹)': dress.price || 0,
        'Status': dress.status || 'Available'
    }));
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    const colWidths = [
        { wch: 15 }, // ID
        { wch: 30 }, // Name
        { wch: 50 }, // Image URL
        { wch: 40 }, // Description
        { wch: 20 }, // Category
        { wch: 30 }, // Tags
        { wch: 12 }, // Price
        { wch: 12 }  // Status
    ];
    ws['!cols'] = colWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Dresses');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Download Excel file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dresses.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function exportDressesToJSON() {
    const dresses = getDressesSync();
    const email = getAdminEmail();
    const exportData = {
        adminEmail: email,
        dresses: dresses
    };
    
    // Download JSON file locally
    const jsonString = JSON.stringify(exportData, null, 2);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = 'dresses.json';
    document.body.appendChild(jsonLink);
    jsonLink.click();
    document.body.removeChild(jsonLink);
    URL.revokeObjectURL(jsonUrl);
    
    // Also download Excel file
    try {
        // Small delay to ensure JSON download starts first
        setTimeout(() => {
            exportDressesToExcel(dresses);
        }, 100);
    } catch (error) {
        console.error('Failed to export to Excel:', error);
        alert('JSON file downloaded, but Excel export failed: ' + error.message);
    }
}

// Import from Excel and save to GitHub
async function importFromExcel() {
    // Check if XLSX library is available
    if (typeof XLSX === 'undefined') {
        alert('XLSX library not loaded. Please refresh the page.');
        return;
    }
    
    // Check GitHub configuration
    const config = getGitHubConfig();
    if (!config.owner || !config.repo || !config.token) {
        alert('Please configure GitHub settings first (Repository Owner, Repository Name, Branch, and Personal Access Token).');
        return;
    }
    
    // Create file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) {
            document.body.removeChild(fileInput);
            return;
        }
        
        try {
            // Show loading message
            const submitBtn = document.getElementById('importExcelBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
            }
            
            // Read Excel file
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    // Get first sheet
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    
                    // Convert to JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    
                    // Convert Excel format to dresses format
                    const dresses = jsonData.map((row, index) => {
                        // Parse tags if it's a string
                        let tags = [];
                        if (row['Tags']) {
                            if (typeof row['Tags'] === 'string') {
                                tags = row['Tags'].split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                            } else if (Array.isArray(row['Tags'])) {
                                tags = row['Tags'];
                            }
                        }
                        
                        return {
                            id: row['ID'] || `dress-${Date.now()}-${index}`,
                            name: row['Name'] || '',
                            image: row['Image URL'] || '',
                            description: row['Description'] || '',
                            category: row['Category'] || '',
                            tags: tags,
                            price: parseFloat(row['Price (₹)']) || 0,
                            status: row['Status'] || 'Available'
                        };
                    });
                    
                    // Get admin email (keep existing if available)
                    const existingEmail = getAdminEmail();
                    const exportData = {
                        adminEmail: existingEmail,
                        dresses: dresses
                    };
                    
                    // Save to GitHub
                    await saveFileToGitHub(exportData, 'Import dresses from Excel file');
                    
                    // Update dresses data
                    dressesData = dresses;
                    dressesLoaded = true;
                    adminEmail = existingEmail;
                    
                    // Update localStorage
                    localStorage.setItem('dressesInventory', JSON.stringify(dresses));
                    if (existingEmail) {
                        localStorage.setItem('adminEmail', existingEmail);
                    }
                    
                    // Dispatch event to reload inventory
                    window.dispatchEvent(new CustomEvent('dressesLoaded'));
                    
                    alert(`Successfully imported ${dresses.length} dresses from Excel and saved to GitHub repository as dresses.json!`);
                } catch (error) {
                    console.error('Error processing Excel file:', error);
                    alert('Failed to process Excel file: ' + error.message);
                } finally {
                    // Clean up
                    document.body.removeChild(fileInput);
                    const submitBtn = document.getElementById('importExcelBtn');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Import from Excel';
                    }
                }
            };
            
            reader.onerror = function() {
                alert('Failed to read Excel file.');
                document.body.removeChild(fileInput);
                const submitBtn = document.getElementById('importExcelBtn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Import from Excel';
                }
            };
            
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error reading file:', error);
            alert('Failed to read file: ' + error.message);
            document.body.removeChild(fileInput);
            const submitBtn = document.getElementById('importExcelBtn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Import from Excel';
            }
        }
    });
    
    // Trigger file selection
    document.body.appendChild(fileInput);
    fileInput.click();
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
window.importFromExcel = importFromExcel;
window.getAdminEmail = getAdminEmail;
window.setAdminEmail = setAdminEmail;
window.getGitHubConfig = getGitHubConfig;
window.setGitHubConfig = setGitHubConfig;
window.loadFileFromGitHub = loadFileFromGitHub;
window.saveFileToGitHub = saveFileToGitHub;
