// Admin Page JavaScript

let editingDressId = null;

// Upload image to GitHub repository
async function uploadImageToGitHub(imageFile) {
    const config = getGitHubConfig();
    
    if (!config.owner || !config.repo || !config.token) {
        throw new Error('GitHub configuration is incomplete. Please configure GitHub settings first.');
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = imageFile.name.split('.').pop();
    const fileName = `image_${timestamp}.${fileExtension}`;
    const imagePath = `images/${fileName}`;
    
    // Convert file to base64
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
                const base64Content = e.target.result.split(',')[1];
                
                // Check if file already exists (for update)
                let sha = null;
                try {
                    const checkUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${imagePath}?ref=${config.branch}`;
                    const checkResponse = await fetch(checkUrl, {
                        headers: {
                            'Authorization': `token ${config.token}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    });
                    
                    if (checkResponse.ok) {
                        const data = await checkResponse.json();
                        sha = data.sha;
                    }
                } catch (error) {
                    // File doesn't exist, that's okay
                }
                
                // Upload to GitHub
                const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${imagePath}`;
                const body = {
                    message: `Upload image: ${fileName}`,
                    content: base64Content,
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
                    throw new Error(`Failed to upload image: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
                }
                
                // Generate raw file URL
                const rawUrl = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${imagePath}`;
                resolve(rawUrl);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    });
}

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
    
    // Setup image preview
    const imageInput = document.getElementById('dressImage');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Show preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewImg = document.getElementById('previewImg');
                    const imagePreview = document.getElementById('imagePreview');
                    const imageFileName = document.getElementById('imageFileName');
                    const uploadBtn = document.getElementById('uploadImageBtn');
                    
                    if (previewImg) previewImg.src = e.target.result;
                    if (imagePreview) imagePreview.style.display = 'block';
                    if (imageFileName) imageFileName.textContent = file.name;
                    if (uploadBtn) uploadBtn.textContent = 'Change Image';
                };
                reader.readAsDataURL(file);
                
                // Clear the hidden URL field
                const imageUrlInput = document.getElementById('dressImageUrl');
                if (imageUrlInput) imageUrlInput.value = '';
            }
        });
    }
}

// Handle form submission
async function handleFormSubmit() {
    const name = document.getElementById('dressName').value.trim();
    const imageInput = document.getElementById('dressImage');
    const imageUrlInput = document.getElementById('dressImageUrl');
    const description = document.getElementById('dressDescription').value.trim();
    const category = document.getElementById('dressCategory').value;
    const tagsInput = document.getElementById('dressTags').value.trim();
    const price = parseFloat(document.getElementById('dressPrice').value);
    const status = document.getElementById('dressStatus').value;
    
    // Validate required fields
    if (!name || !description || !category || !tagsInput || !price || isNaN(price) || !status) {
        alert('Please fill in all fields correctly.');
        return;
    }
    
    // Check if image is provided (either file upload or existing URL)
    let imageUrl = imageUrlInput ? imageUrlInput.value.trim() : '';
    const imageFile = imageInput && imageInput.files && imageInput.files.length > 0 ? imageInput.files[0] : null;
    
    if (!imageFile && !imageUrl) {
        alert('Please upload an image or provide an image URL.');
        return;
    }
    
    // Parse tags (comma-separated)
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    if (tags.length === 0) {
        alert('Please enter at least one tag.');
        return;
    }
    
    // Upload image if a new file is selected
    if (imageFile) {
        try {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Uploading Image...';
            }
            
            imageUrl = await uploadImageToGitHub(imageFile);
            
            // Save the URL to hidden field
            if (imageUrlInput) imageUrlInput.value = imageUrl;
            
            if (submitBtn) {
                submitBtn.textContent = editingDressId ? 'Updating...' : 'Adding...';
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image: ' + error.message);
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = editingDressId ? 'Update Dress' : 'Add Dress';
            }
            return;
        }
    }
    
    const dress = {
        id: editingDressId || generateId(),
        name: name,
        image: imageUrl,
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
    } finally {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = editingDressId ? 'Update Dress' : 'Add Dress';
        }
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
    document.getElementById('dressDescription').value = dress.description;
    document.getElementById('dressCategory').value = dress.category;
    document.getElementById('dressTags').value = dress.tags ? dress.tags.join(', ') : '';
    document.getElementById('dressPrice').value = dress.price;
    document.getElementById('dressStatus').value = dress.status || 'Available';
    
    // Handle image - show current image and set URL
    const imageInput = document.getElementById('dressImage');
    const imageUrlInput = document.getElementById('dressImageUrl');
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    const imageFileName = document.getElementById('imageFileName');
    const uploadBtn = document.getElementById('uploadImageBtn');
    
    if (imageUrlInput) imageUrlInput.value = dress.image || '';
    if (imageInput) imageInput.value = ''; // Clear file input
    
    // Show current image as preview
    if (dress.image && previewImg && imagePreview) {
        previewImg.src = dress.image;
        imagePreview.style.display = 'block';
        if (imageFileName) imageFileName.textContent = 'Current image (click button to change)';
        if (uploadBtn) uploadBtn.textContent = 'Change Image';
    } else {
        if (imagePreview) imagePreview.style.display = 'none';
        if (uploadBtn) uploadBtn.textContent = 'Choose Image to Upload';
    }
    
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
    
    // Reset image preview
    const imageInput = document.getElementById('dressImage');
    const imageUrlInput = document.getElementById('dressImageUrl');
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    const imageFileName = document.getElementById('imageFileName');
    const uploadBtn = document.getElementById('uploadImageBtn');
    
    if (imageInput) imageInput.value = '';
    if (imageUrlInput) imageUrlInput.value = '';
    if (previewImg) previewImg.src = '';
    if (imagePreview) imagePreview.style.display = 'none';
    if (imageFileName) imageFileName.textContent = '';
    if (uploadBtn) uploadBtn.textContent = 'Choose Image to Upload';
    
    const formTitle = document.getElementById('formTitle');
    if (formTitle) {
        formTitle.textContent = 'Add New Dress';
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.textContent = 'Add Dress';
        submitBtn.disabled = false;
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }
}

// Load GitHub token
function loadGitHubToken() {
    const config = getGitHubConfig();
    const tokenInput = document.getElementById('githubToken');
    if (tokenInput) {
        tokenInput.value = config.token || '';
    }
}

// Save GitHub token
function saveGitHubToken() {
    const tokenInput = document.getElementById('githubToken');
    if (!tokenInput) {
        alert('Token field not found.');
        return;
    }
    
    const token = tokenInput.value.trim();
    if (!token) {
        alert('Please enter a GitHub Personal Access Token.');
        return;
    }
    
    setGitHubConfig({ token: token });
    alert('GitHub token saved successfully!');
}

// Test GitHub connection
async function testGitHubConnection() {
    const config = getGitHubConfig();
    
    if (!config.owner || !config.repo || !config.token) {
        alert('Please save GitHub token first.');
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


// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
    await loadInventory();
    setupForm();
    loadAdminEmail();
    loadGitHubToken();
    
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
window.saveGitHubToken = saveGitHubToken;
window.testGitHubConnection = testGitHubConnection;

