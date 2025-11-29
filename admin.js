// Admin Page JavaScript

let editingDressId = null;

// Load inventory and display all dresses
async function loadInventory() {
    const dresses = await getDresses();
    const inventoryGrid = document.getElementById('inventoryGrid');
    
    if (!inventoryGrid) return;
    
    inventoryGrid.innerHTML = '';
    
    if (dresses.length === 0) {
        inventoryGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">No dresses in inventory. Add your first dress using the form.</p>';
        return;
    }
    
    dresses.forEach(dress => {
        const item = createInventoryItem(dress);
        inventoryGrid.appendChild(item);
    });
}

// Create inventory item card
function createInventoryItem(dress) {
    const item = document.createElement('div');
    item.className = 'inventory-item';
    
    const status = dress.status || 'Available';
    const statusClass = status === 'SoldOut' ? 'status-soldout' : 'status-available';
    
    item.innerHTML = `
        <img src="${dress.image}" alt="${dress.name}" class="inventory-item-image" onerror="this.src='https://via.placeholder.com/100x133?text=Dress'">
        <div class="inventory-item-content">
            <h3 class="inventory-item-name">${dress.name}</h3>
            <p class="inventory-item-category">Category: ${dress.category}</p>
            <p class="inventory-item-tags">Tags: ${dress.tags ? dress.tags.join(', ') : 'None'}</p>
            <p class="inventory-item-price">₹${dress.price.toFixed(2)}</p>
            <p class="inventory-item-status" style="margin: 8px 0;">
                <span style="font-weight: bold;">Status: </span>
                <span class="${statusClass}" style="padding: 2px 8px; border-radius: 4px; background-color: ${status === 'SoldOut' ? '#ffcccc' : '#ccffcc'}; color: ${status === 'SoldOut' ? '#cc0000' : '#006600'};">
                    ${status}
                </span>
            </p>
            <div class="inventory-item-actions">
                <button class="btn btn-edit" onclick="editDress('${dress.id}')">Edit</button>
                <button class="btn btn-delete" onclick="deleteDressItem('${dress.id}')">Delete</button>
            </div>
        </div>
    `;
    
    return item;
}

// Setup form handler
function setupForm() {
    const form = document.getElementById('dressForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            resetForm();
        });
    }
}

// Handle form submission
async function handleFormSubmit() {
    const name = document.getElementById('dressName').value.trim();
    const image = document.getElementById('dressImage').value.trim();
    const description = document.getElementById('dressDescription').value.trim();
    const category = document.getElementById('dressCategory').value;
    const tagsInput = document.getElementById('dressTags').value.trim();
    const price = parseFloat(document.getElementById('dressPrice').value);
    const status = document.getElementById('dressStatus').value;
    
    if (!name || !image || !description || !category || !tagsInput || !price || isNaN(price) || !status) {
        alert('Please fill in all fields correctly.');
        return;
    }
    
    // Parse tags (comma-separated)
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    if (tags.length === 0) {
        alert('Please enter at least one tag.');
        return;
    }
    
    const dress = {
        id: editingDressId || generateId(),
        name: name,
        image: image,
        description: description,
        category: category,
        tags: tags,
        price: price,
        status: status
    };
    
    try {
        const config = getGitHubConfig();
        const saveToGitHub = config.owner && config.repo && config.token;
        
        await saveDress(dress, saveToGitHub);
        
        if (editingDressId) {
            alert('Dress updated successfully!' + (saveToGitHub ? ' (Saved to GitHub)' : ''));
        } else {
            alert('Dress added successfully!' + (saveToGitHub ? ' (Saved to GitHub)' : ''));
        }
    } catch (error) {
        console.error('Error saving dress:', error);
        alert('Dress saved locally, but failed to save to GitHub: ' + error.message);
    }
    
    resetForm();
    loadInventory();
}

// Edit dress
function editDress(id) {
    const dress = getDressById(id);
    if (!dress) {
        alert('Dress not found.');
        return;
    }
    
    editingDressId = id;
    
    // Fill form with dress data
    document.getElementById('dressId').value = dress.id;
    document.getElementById('dressName').value = dress.name;
    document.getElementById('dressImage').value = dress.image;
    document.getElementById('dressDescription').value = dress.description;
    document.getElementById('dressCategory').value = dress.category;
    document.getElementById('dressTags').value = dress.tags ? dress.tags.join(', ') : '';
    document.getElementById('dressPrice').value = dress.price;
    document.getElementById('dressStatus').value = dress.status || 'Available';
    
    // Update form title and button
    const formTitle = document.getElementById('formTitle');
    if (formTitle) {
        formTitle.textContent = 'Edit Dress';
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.textContent = 'Update Dress';
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.style.display = 'inline-block';
    }
    
    // Scroll to form
    const formSection = document.querySelector('.admin-form-section');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Delete dress
async function deleteDressItem(id) {
    const dress = getDressById(id);
    if (!dress) {
        alert('Dress not found.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${dress.name}"?`)) {
        try {
            const config = getGitHubConfig();
            const saveToGitHub = config.owner && config.repo && config.token;
            
            await deleteDress(id, saveToGitHub);
            
            // Also remove from cart if present
            removeFromCart(id);
            
            alert('Dress deleted successfully!' + (saveToGitHub ? ' (Saved to GitHub)' : ''));
            loadInventory();
            
            // Reset form if editing this dress
            if (editingDressId === id) {
                resetForm();
            }
        } catch (error) {
            console.error('Error deleting dress:', error);
            alert('Dress deleted locally, but failed to save to GitHub: ' + error.message);
            loadInventory();
        }
    }
}

// Reset form
function resetForm() {
    editingDressId = null;
    
    const form = document.getElementById('dressForm');
    if (form) {
        form.reset();
    }
    
    document.getElementById('dressId').value = '';
    
    const formTitle = document.getElementById('formTitle');
    if (formTitle) {
        formTitle.textContent = 'Add New Dress';
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.textContent = 'Add Dress';
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }
}

// Load admin email
function loadAdminEmail() {
    const email = getAdminEmail();
    const emailInput = document.getElementById('adminEmail');
    if (emailInput) {
        emailInput.value = email;
    }
}

// Save admin email
async function saveAdminEmail() {
    const emailInput = document.getElementById('adminEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    setAdminEmail(email);
    
    // Also save to GitHub if configured
    const config = getGitHubConfig();
    if (config.owner && config.repo && config.token) {
        try {
            const dresses = getDressesSync();
            const exportData = {
                adminEmail: email,
                dresses: dresses
            };
            await saveFileToGitHub(exportData, 'Update admin email');
            alert('Admin email saved successfully! (Saved to GitHub)');
        } catch (error) {
            console.error('Failed to save to GitHub:', error);
            alert('Admin email saved locally, but failed to save to GitHub: ' + error.message);
        }
    } else {
        alert('Admin email saved successfully!');
    }
}

// Load GitHub configuration
function loadGitHubConfig() {
    const config = getGitHubConfig();
    const ownerInput = document.getElementById('githubOwner');
    const repoInput = document.getElementById('githubRepo');
    const pathInput = document.getElementById('githubPath');
    const branchInput = document.getElementById('githubBranch');
    const tokenInput = document.getElementById('githubToken');
    
    if (ownerInput) ownerInput.value = config.owner;
    if (repoInput) repoInput.value = config.repo;
    if (pathInput) pathInput.value = config.path;
    if (branchInput) branchInput.value = config.branch;
    if (tokenInput) tokenInput.value = config.token;
}

// Save GitHub configuration
function saveGitHubConfig() {
    const ownerInput = document.getElementById('githubOwner');
    const repoInput = document.getElementById('githubRepo');
    const pathInput = document.getElementById('githubPath');
    const branchInput = document.getElementById('githubBranch');
    const tokenInput = document.getElementById('githubToken');
    
    if (!ownerInput || !repoInput || !pathInput || !branchInput || !tokenInput) {
        alert('Configuration fields not found.');
        return;
    }
    
    const config = {
        owner: ownerInput.value.trim(),
        repo: repoInput.value.trim(),
        path: pathInput.value.trim() || 'dresses.json',
        branch: branchInput.value.trim() || 'main',
        token: tokenInput.value.trim()
    };
    
    if (!config.owner || !config.repo || !config.token) {
        alert('Please fill in all required fields (Owner, Repository, and Token).');
        return;
    }
    
    setGitHubConfig(config);
    alert('GitHub configuration saved successfully!');
}

// Test GitHub connection
async function testGitHubConnection() {
    const config = getGitHubConfig();
    
    if (!config.owner || !config.repo || !config.token) {
        alert('Please save GitHub configuration first.');
        return;
    }
    
    try {
        const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            alert('✓ Connection successful! Repository and file are accessible.');
        } else if (response.status === 404) {
            alert('⚠ Connection successful, but file not found. It will be created on first save.');
        } else {
            const errorData = await response.json().catch(() => ({}));
            alert('✗ Connection failed: ' + (errorData.message || response.statusText));
        }
    } catch (error) {
        alert('✗ Connection failed: ' + error.message);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    await loadInventory();
    setupForm();
    loadAdminEmail();
    loadGitHubConfig();
    
    // Reload inventory when dresses are updated
    window.addEventListener('dressesLoaded', function() {
        loadInventory();
        loadAdminEmail();
    });
});

// Make functions available globally
window.editDress = editDress;
window.deleteDressItem = deleteDressItem;
window.saveAdminEmail = saveAdminEmail;
window.saveGitHubConfig = saveGitHubConfig;
window.testGitHubConnection = testGitHubConnection;

