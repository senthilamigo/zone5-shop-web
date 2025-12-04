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
// Initialize image upload slots
function initializeImageUploads() {
    const container = document.getElementById('imageUploadsContainer');
    if (!container) return;
    
    // Always start with at least one image slot (mandatory)
    container.innerHTML = '';
    addImageSlot(0, true); // First slot is mandatory
    
    // Setup add image button
    const addBtn = document.getElementById('addImageSlotBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            const slots = container.querySelectorAll('.image-upload-slot');
            if (slots.length < 5) {
                addImageSlot(slots.length, false);
            } else {
                alert('Maximum 5 images allowed.');
            }
        });
    }
}

// Add an image upload slot
function addImageSlot(index, isMandatory) {
    const container = document.getElementById('imageUploadsContainer');
    if (!container) return;
    
    const slot = document.createElement('div');
    slot.className = 'image-upload-slot';
    slot.dataset.index = index;
    
    const slotId = `imageSlot_${index}`;
    const inputId = `dressImage_${index}`;
    const previewId = `previewImg_${index}`;
    const removeBtnId = `removeBtn_${index}`;
    
    slot.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; background-color: #f9f9f9;">
            <div style="flex: 1;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold; font-size: 12px;">
                    Image ${index + 1} ${isMandatory ? '*' : '(Optional)'}
                </label>
                <input type="file" id="${inputId}" accept="image/*" style="display: none;" data-index="${index}">
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('${inputId}').click()" style="width: 100%; font-size: 12px; padding: 8px;">
                    Choose Image
                </button>
            </div>
            <div id="${previewId}" style="display: none; width: 80px; height: 80px; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; flex-shrink: 0;">
                <img src="" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            ${!isMandatory ? `<button type="button" id="${removeBtnId}" class="btn btn-secondary" onclick="removeImageSlot(${index})" style="padding: 8px 12px; font-size: 12px;">Remove</button>` : ''}
        </div>
    `;
    
    container.appendChild(slot);
    
    // Setup file input change handler
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById(previewId);
                    if (preview) {
                        const img = preview.querySelector('img');
                        if (img) img.src = e.target.result;
                        preview.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    updateAddButtonVisibility();
}

// Remove an image upload slot
function removeImageSlot(index) {
    const container = document.getElementById('imageUploadsContainer');
    if (!container) return;
    
    const slot = container.querySelector(`[data-index="${index}"]`);
    if (slot) {
        slot.remove();
        // Reindex remaining slots
        reindexImageSlots();
    }
}

// Reindex image slots after removal
function reindexImageSlots() {
    const container = document.getElementById('imageUploadsContainer');
    if (!container) return;
    
    const slots = container.querySelectorAll('.image-upload-slot');
    slots.forEach((slot, newIndex) => {
        slot.dataset.index = newIndex;
        const input = slot.querySelector('input[type="file"]');
        const label = slot.querySelector('label');
        const removeBtn = slot.querySelector('button[onclick*="removeImageSlot"]');
        
        if (input) {
            input.dataset.index = newIndex;
            input.id = `dressImage_${newIndex}`;
            input.setAttribute('onclick', `document.getElementById('dressImage_${newIndex}').click()`);
        }
        if (label) {
            label.innerHTML = `Image ${newIndex + 1} ${newIndex === 0 ? '*' : '(Optional)'}`;
        }
        if (removeBtn && newIndex > 0) {
            removeBtn.setAttribute('onclick', `removeImageSlot(${newIndex})`);
            removeBtn.id = `removeBtn_${newIndex}`;
        }
    });
    
    updateAddButtonVisibility();
}

// Update add button visibility based on current slot count
function updateAddButtonVisibility() {
    const container = document.getElementById('imageUploadsContainer');
    const addBtn = document.getElementById('addImageSlotBtn');
    if (!container || !addBtn) return;
    
    const slots = container.querySelectorAll('.image-upload-slot');
    if (slots.length >= 5) {
        addBtn.style.display = 'none';
    } else {
        addBtn.style.display = 'block';
    }
}

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
    
    // Initialize image uploads
    initializeImageUploads();
}

// Handle form submission
async function handleFormSubmit() {
    const name = document.getElementById('dressName').value.trim();
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
    
    // Get all image inputs and existing URLs
    const container = document.getElementById('imageUploadsContainer');
    const imageSlots = container ? container.querySelectorAll('.image-upload-slot') : [];
    const imageFiles = [];
    const existingImageUrls = [];
    
    // Collect image files and existing URLs
    imageSlots.forEach((slot, index) => {
        const input = slot.querySelector('input[type="file"]');
        const preview = slot.querySelector('div[id^="previewImg_"]');
        
        if (input && input.files && input.files.length > 0) {
            imageFiles.push({ index: index, file: input.files[0] });
        } else if (preview && preview.style.display !== 'none') {
            // Check if this is an existing image URL (from edit mode)
            const img = preview.querySelector('img');
            if (img && img.src && !img.src.startsWith('data:')) {
                existingImageUrls.push({ index: index, url: img.src });
            }
        }
    });
    
    // Validate that at least the first image is provided
    if (imageFiles.length === 0 && existingImageUrls.length === 0) {
        alert('Please upload at least one image (first image is mandatory).');
        return;
    }
    
    // Parse tags (comma-separated)
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    if (tags.length === 0) {
        alert('Please enter at least one tag.');
        return;
    }
    
    // Upload images if files are selected
    const imageUrls = [];
    const submitBtn = document.getElementById('submitBtn');
    
    try {
        if (imageFiles.length > 0) {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = `Uploading ${imageFiles.length} image(s)...`;
            }
            
            // Upload all images
            for (let i = 0; i < imageFiles.length; i++) {
                const { index, file } = imageFiles[i];
                try {
                    const uploadedUrl = await uploadImageToGitHub(file);
                    imageUrls[index] = uploadedUrl;
                } catch (error) {
                    console.error(`Error uploading image ${index + 1}:`, error);
                    throw new Error(`Failed to upload image ${index + 1}: ${error.message}`);
                }
            }
        }
        
        // Combine uploaded URLs with existing URLs
        existingImageUrls.forEach(({ index, url }) => {
            if (!imageUrls[index]) {
                imageUrls[index] = url;
            }
        });
        
        // Filter out undefined entries and ensure array is sequential
        const finalImageUrls = imageUrls.filter(url => url !== undefined && url !== null);
        
        if (finalImageUrls.length === 0) {
            alert('No valid images found. Please upload at least one image.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = editingDressId ? 'Update Dress' : 'Add Dress';
            }
            return;
        }
        
        if (submitBtn) {
            submitBtn.textContent = editingDressId ? 'Updating...' : 'Adding...';
        }
        
        // Get primary image (first image) for backward compatibility
        const primaryImage = finalImageUrls[0];
        
        const dress = {
            id: editingDressId || generateId(),
            name: name,
            image: primaryImage, // For backward compatibility
            images: finalImageUrls, // New format with all images
            description: description,
            category: category,
            tags: tags,
            price: price,
            status: status
        };
        
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
        alert('Error: ' + error.message);
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = editingDressId ? 'Update Dress' : 'Add Dress';
        }
        return;
    } finally {
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
    
    // Get all images for the dress (support both old and new format)
    const images = getDressImagesForEdit(dress);
    
    // Clear and rebuild image upload slots
    const container = document.getElementById('imageUploadsContainer');
    if (container) {
        container.innerHTML = '';
        
        // Create slots for each existing image
        images.forEach((imageUrl, index) => {
            const isMandatory = index === 0;
            addImageSlot(index, isMandatory);
            
            // Set the preview image
            setTimeout(() => {
                const previewId = `previewImg_${index}`;
                const preview = document.getElementById(previewId);
                if (preview) {
                    const img = preview.querySelector('img');
                    if (img) {
                        img.src = imageUrl;
                        preview.style.display = 'block';
                    }
                }
            }, 100);
        });
        
        // If no images, at least show one mandatory slot
        if (images.length === 0) {
            addImageSlot(0, true);
        }
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

// Get all images for a dress (for edit mode)
function getDressImagesForEdit(dress) {
    // New format: images array
    if (dress.images && Array.isArray(dress.images) && dress.images.length > 0) {
        return dress.images;
    }
    // Old format: single image field (for backward compatibility)
    if (dress.image) {
        return [dress.image];
    }
    // No images
    return [];
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
    
    // Reset image uploads - reinitialize with one mandatory slot
    initializeImageUploads();
    
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
    // Get token from input field first (in case user entered but didn't save)
    const tokenInput = document.getElementById('githubToken');
    const tokenFromInput = tokenInput ? tokenInput.value.trim() : '';
    
    // Get config (which reads from localStorage)
    const config = getGitHubConfig();
    
    // Use token from input if available, otherwise use from config
    const token = tokenFromInput || config.token;
    
    if (!config.owner || !config.repo) {
        alert('GitHub repository configuration is incomplete. Please check script.js.');
        return;
    }
    
    if (!token) {
        alert('Please enter and save a GitHub Personal Access Token first.');
        return;
    }
    
    // Show loading state
    const testBtn = document.querySelector('button[onclick*="testGitHubConnection"]');
    const originalText = testBtn ? testBtn.textContent : '';
    if (testBtn) {
        testBtn.disabled = true;
        testBtn.textContent = 'Testing...';
    }
    
    try {
        const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            alert('✓ Connection successful! Repository and file are accessible.');
        } else if (response.status === 404) {
            alert('⚠ Connection successful, but file not found. It will be created on first save.');
        } else if (response.status === 401 || response.status === 403) {
            const errorData = await response.json().catch(() => ({}));
            alert('✗ Authentication failed. Please check your Personal Access Token. Make sure it has "repo" permissions.');
        } else {
            const errorData = await response.json().catch(() => ({}));
            alert('✗ Connection failed: ' + (errorData.message || response.statusText) + ` (Status: ${response.status})`);
        }
    } catch (error) {
        console.error('GitHub connection test error:', error);
        alert('✗ Connection failed: ' + error.message);
    } finally {
        // Restore button state
        if (testBtn) {
            testBtn.disabled = false;
            testBtn.textContent = originalText;
        }
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
window.removeImageSlot = removeImageSlot;

