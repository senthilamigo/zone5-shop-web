# Create an online dress shop website
_Exported on 11/8/2025 at 12:36:08 GMT+5:30 from Cursor (2.0.69)_

---

**User**

Create a website following the below instructions:

- website is for online dress shop mainly for women

- Use html, css and java script

- website has the CRUD operations

- Inventory of dresses are broadly categorized as - silk sarees, anarkali sarees, formal, churidar

- Multiple tags can be added to each dress.

- the index.html page contains 6 sections. Each section has 4 cards grouped by category or tags. For example a section contain 4 dresses of churidar category with festive tag.

- On clicking any of the cards user land to second page display.html displaying all dresses in matrix format with filters on left. Users can select any filters and corresponding dresses will be displayed on the page. Each dress has a name, short description and price

- user can add dress to the cart and remove from cart

- A third page admin.html will be used by the owner to add dress to the inventory. It accepts dress name, image link, short description, category, tags and price

- keep the data in localstorage itself

- Add images from any websites.   please follow @design.json  for the design

---

**Cursor**


Reviewing the design file and clarifying a few points before drafting the plan.



A few clarifications before drafting the plan:

1. For the 6 sections on index.html, how should they be grouped?
   - a) By category (e.g., "Churidar", "Formal", "Silk Sarees")
   - b) By tag (e.g., "Festive", "Casual", "Wedding")
   - c) By category + tag combinations (e.g., "Churidar - Festive", "Formal - Office")

2. What tags should be available for dresses?
   - a) Predefined list (e.g., Festive, Casual, Office, Wedding, Party, Traditional)
   - b) Allow any custom tags

3. For CRUD in admin.html, should it support:
   - a) Only Create (add new dresses)
   - b) Full CRUD (Create, Read/View, Update, Delete existing dresses)

4. For the cart functionality:
   - a) Cart icon with count in header only
   - b) Separate cart page/view to see and manage cart items

Once confirmed, I'll draft the implementation plan.

---

**User**

1.c , 2.b, 3.b, 4b

---

**Cursor**


Creating the implementation plan.


---

**User**

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**


Starting implementation. Creating the file structure and working through each component.


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Women's Dress Shop - Home</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <div class="header-top">
            <div class="header-links">
                <a href="#">Track Orders</a>
                <a href="#">Sign In</a>
                <a href="#">Sign Up</a>
            </div>
        </div>
        <nav class="main-nav">
            <div class="nav-container">
                <a href="index.html" class="logo">Dress Shop</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="display.html">Shop</a>
                    <a href="admin.html">Admin</a>
                </div>
                <a href="cart.html" class="cart-icon">
                    <span class="cart-count">0</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4m7 14V9a2 2 0 0 0-2-2h-5m0 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 3v4m0 0v10m0-10h10m-10 0H5m12 0v10m0-10h2"/>
                    </svg>
                </a>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>Discover Your Perfect Style</h1>
                <p>Explore our curated collection of elegant dresses</p>
                <a href="display.html" class="btn btn-primary">Shop Now</a>
            </div>
        </section>

        <div class="container">
            <div id="sections-container">
                <!-- Sections will be dynamically loaded here -->
            </div>
        </div>
    </main>

    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Company</h3>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Trust Indicators</h3>
                <ul>
                    <li>✓ Authentic Products</li>
                    <li>✓ Easy Returns</li>
                    <li>✓ Secure Payments</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Dress Shop. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="index.js"></script>
</body>
</html>

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Women's Dress Shop - Shop All</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <div class="header-top">
            <div class="header-links">
                <a href="#">Track Orders</a>
                <a href="#">Sign In</a>
                <a href="#">Sign Up</a>
            </div>
        </div>
        <nav class="main-nav">
            <div class="nav-container">
                <a href="index.html" class="logo">Dress Shop</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="display.html">Shop</a>
                    <a href="admin.html">Admin</a>
                </div>
                <a href="cart.html" class="cart-icon">
                    <span class="cart-count">0</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4m7 14V9a2 2 0 0 0-2-2h-5m0 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 3v4m0 0v10m0-10h10m-10 0H5m12 0v10m0-10h2"/>
                    </svg>
                </a>
            </div>
        </nav>
    </header>

    <main class="display-main">
        <div class="display-container">
            <aside class="filters-sidebar">
                <div class="filters-header">
                    <h2>Filters</h2>
                    <button class="clear-filters" id="clearFilters">Clear All</button>
                </div>
                
                <div class="filter-section">
                    <h3 class="filter-title">Category</h3>
                    <div class="filter-options" id="categoryFilters">
                        <!-- Category filters will be dynamically loaded -->
                    </div>
                </div>

                <div class="filter-section">
                    <h3 class="filter-title">Tags</h3>
                    <div class="filter-options" id="tagFilters">
                        <!-- Tag filters will be dynamically loaded -->
                    </div>
                </div>
            </aside>

            <div class="products-section">
                <div class="products-header">
                    <h2>All Dresses</h2>
                    <span class="product-count" id="productCount">0 products</span>
                </div>
                <div class="products-grid" id="productsGrid">
                    <!-- Products will be dynamically loaded here -->
                </div>
            </div>
        </div>
    </main>

    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Company</h3>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Trust Indicators</h3>
                <ul>
                    <li>✓ Authentic Products</li>
                    <li>✓ Easy Returns</li>
                    <li>✓ Secure Payments</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Dress Shop. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="display.js"></script>
</body>
</html>

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Women's Dress Shop - Admin</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <div class="header-top">
            <div class="header-links">
                <a href="#">Track Orders</a>
                <a href="#">Sign In</a>
                <a href="#">Sign Up</a>
            </div>
        </div>
        <nav class="main-nav">
            <div class="nav-container">
                <a href="index.html" class="logo">Dress Shop</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="display.html">Shop</a>
                    <a href="admin.html">Admin</a>
                </div>
                <a href="cart.html" class="cart-icon">
                    <span class="cart-count">0</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4m7 14V9a2 2 0 0 0-2-2h-5m0 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 3v4m0 0v10m0-10h10m-10 0H5m12 0v10m0-10h2"/>
                    </svg>
                </a>
            </div>
        </nav>
    </header>

    <main class="admin-main">
        <div class="container">
            <h1 class="admin-title">Admin - Manage Inventory</h1>
            
            <div class="admin-content">
                <section class="admin-form-section">
                    <h2 id="formTitle">Add New Dress</h2>
                    <form id="dressForm" class="dress-form">
                        <input type="hidden" id="dressId">
                        
                        <div class="form-group">
                            <label for="dressName">Dress Name *</label>
                            <input type="text" id="dressName" required>
                        </div>

                        <div class="form-group">
                            <label for="dressImage">Image Link (URL) *</label>
                            <input type="url" id="dressImage" required>
                        </div>

                        <div class="form-group">
                            <label for="dressDescription">Short Description *</label>
                            <textarea id="dressDescription" rows="3" required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="dressCategory">Category *</label>
                            <select id="dressCategory" required>
                                <option value="">Select Category</option>
                                <option value="silk sarees">Silk Sarees</option>
                                <option value="anarkali sarees">Anarkali Sarees</option>
                                <option value="formal">Formal</option>
                                <option value="churidar">Churidar</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="dressTags">Tags (comma-separated) *</label>
                            <input type="text" id="dressTags" placeholder="e.g., festive, casual, office" required>
                            <small>Separate multiple tags with commas</small>
                        </div>

                        <div class="form-group">
                            <label for="dressPrice">Price (₹) *</label>
                            <input type="number" id="dressPrice" min="0" step="0.01" required>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary" id="submitBtn">Add Dress</button>
                            <button type="button" class="btn btn-secondary" id="cancelBtn" style="display: none;">Cancel</button>
                        </div>
                    </form>
                </section>

                <section class="admin-inventory-section">
                    <h2>Inventory</h2>
                    <div class="inventory-grid" id="inventoryGrid">
                        <!-- Inventory items will be dynamically loaded here -->
                    </div>
                </section>
            </div>
        </div>
    </main>

    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Company</h3>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Trust Indicators</h3>
                <ul>
                    <li>✓ Authentic Products</li>
                    <li>✓ Easy Returns</li>
                    <li>✓ Secure Payments</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Dress Shop. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="admin.js"></script>
</body>
</html>

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Women's Dress Shop - Shopping Cart</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <div class="header-top">
            <div class="header-links">
                <a href="#">Track Orders</a>
                <a href="#">Sign In</a>
                <a href="#">Sign Up</a>
            </div>
        </div>
        <nav class="main-nav">
            <div class="nav-container">
                <a href="index.html" class="logo">Dress Shop</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="display.html">Shop</a>
                    <a href="admin.html">Admin</a>
                </div>
                <a href="cart.html" class="cart-icon">
                    <span class="cart-count">0</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4m7 14V9a2 2 0 0 0-2-2h-5m0 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 3v4m0 0v10m0-10h10m-10 0H5m12 0v10m0-10h2"/>
                    </svg>
                </a>
            </div>
        </nav>
    </header>

    <main class="cart-main">
        <div class="container">
            <h1 class="cart-title">Shopping Cart</h1>
            
            <div id="cartContent">
                <div class="cart-items" id="cartItems">
                    <!-- Cart items will be dynamically loaded here -->
                </div>
                
                <div class="cart-summary" id="cartSummary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span id="subtotal">₹0.00</span>
                    </div>
                    <div class="summary-row">
                        <span>Total:</span>
                        <span id="total" class="total-price">₹0.00</span>
                    </div>
                    <button class="btn btn-primary btn-checkout">Proceed to Checkout</button>
                </div>
            </div>

            <div id="emptyCart" class="empty-cart" style="display: none;">
                <p>Your cart is empty</p>
                <a href="display.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        </div>
    </main>

    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Company</h3>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Trust Indicators</h3>
                <ul>
                    <li>✓ Authentic Products</li>
                    <li>✓ Easy Returns</li>
                    <li>✓ Secure Payments</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Dress Shop. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="cart.js"></script>
</body>
</html>

```


Creating the CSS file following the design system:


```css
/* Design System Variables */
:root {
    /* Colors */
    --color-primary: #E91E63;
    --color-primary-name: "CLiQ Fashion Pink";
    --color-secondary-dark: #1A1A1A;
    --color-secondary-dark-gray: #2D2D2D;
    --color-neutral-light-gray: #F5F5F5;
    --color-neutral-medium-gray: #E0E0E0;
    --color-white: #FFFFFF;
    --color-text-primary: #000000;
    --color-text-secondary: #666666;
    --color-text-inverse: #FFFFFF;
    --color-accent-red: #D32F2F;
    --color-accent-sale: #FF0000;
    --color-accent-discount: #4CAF50;

    /* Typography */
    --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
    --font-fallback: system-ui, -apple-system, sans-serif;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;

    /* Layout */
    --max-width: 1440px;
    --gutter: 16px;
    --border-radius: 4px;
    --border-radius-lg: 8px;
}

/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-primary);
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-primary);
    background-color: var(--color-white);
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Typography */
h1 {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
}

h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
}

h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
}

@media (max-width: 768px) {
    h1 {
        font-size: 32px;
    }
    h2 {
        font-size: 20px;
    }
}

/* Container */
.container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

/* Header */
.main-header {
    background-color: var(--color-secondary-dark);
    color: var(--color-text-inverse);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.header-top {
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--color-secondary-dark-gray);
}

.header-links {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-lg);
    font-size: 12px;
}

.header-links a {
    color: var(--color-text-inverse);
    transition: opacity 0.2s;
}

.header-links a:hover {
    opacity: 0.8;
}

.main-nav {
    padding: var(--spacing-md);
}

.nav-container {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
}

.nav-links {
    display: flex;
    gap: var(--spacing-lg);
}

.nav-links a {
    color: var(--color-text-inverse);
    font-weight: 500;
    text-transform: uppercase;
    transition: opacity 0.2s;
}

.nav-links a:hover {
    opacity: 0.8;
}

.cart-icon {
    position: relative;
    color: var(--color-text-inverse);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.cart-count {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    position: absolute;
    top: -8px;
    right: -8px;
}

/* Main Content */
main {
    margin-top: 120px;
    min-height: calc(100vh - 120px);
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, var(--color-primary) 0%, #C2185B 100%);
    color: var(--color-text-inverse);
    padding: var(--spacing-xxxl) var(--spacing-md);
    text-align: center;
}

.hero-content h1 {
    color: var(--color-text-inverse);
    margin-bottom: var(--spacing-md);
}

.hero-content p {
    font-size: 18px;
    margin-bottom: var(--spacing-lg);
    opacity: 0.9;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 12px 32px;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    text-align: center;
}

.btn-primary {
    background-color: var(--color-secondary-dark);
    color: var(--color-white);
}

.btn-primary:hover {
    transform: scale(1.02);
    opacity: 0.9;
}

.btn-secondary {
    background-color: transparent;
    border: 2px solid var(--color-secondary-dark);
    color: var(--color-secondary-dark);
}

.btn-secondary:hover {
    background-color: var(--color-secondary-dark);
    color: var(--color-white);
}

/* Product Cards */
.product-card {
    background-color: var(--color-white);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    border: 1px solid var(--color-neutral-medium-gray);
}

.product-card:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card-image {
    position: relative;
    width: 100%;
    padding-top: 133.33%; /* 3:4 aspect ratio */
    overflow: hidden;
    background-color: var(--color-neutral-light-gray);
}

.product-card-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-card-badge {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 4px 8px;
    border-radius: var(--border-radius);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
}

.product-card-content {
    padding: var(--spacing-md);
}

.product-card-name {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-primary);
    text-transform: capitalize;
}

.product-card-description {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-card-price {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
}

.product-card-actions {
    display: flex;
    gap: var(--spacing-sm);
}

/* Sections */
.section {
    margin-bottom: var(--spacing-xxxl);
}

.section-header {
    margin-bottom: var(--spacing-lg);
    text-align: center;
}

.section-header h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    text-transform: capitalize;
}

.section-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
}

/* Display Page */
.display-main {
    padding: var(--spacing-lg) 0;
}

.display-container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    display: flex;
    gap: var(--spacing-lg);
}

.filters-sidebar {
    width: 250px;
    background-color: var(--color-neutral-light-gray);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-lg);
    height: fit-content;
    position: sticky;
    top: 140px;
}

.filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.filters-header h2 {
    font-size: 20px;
}

.clear-filters {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
}

.filter-section {
    margin-bottom: var(--spacing-lg);
}

.filter-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
    text-transform: uppercase;
}

.filter-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.filter-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.filter-option input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.filter-option label {
    font-size: 13px;
    cursor: pointer;
    text-transform: capitalize;
}

.products-section {
    flex: 1;
}

.products-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.product-count {
    color: var(--color-text-secondary);
    font-size: 14px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
}

/* Admin Page */
.admin-main {
    padding: var(--spacing-lg) 0;
}

.admin-title {
    margin-bottom: var(--spacing-xl);
    text-align: center;
}

.admin-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--spacing-xl);
}

.admin-form-section {
    background-color: var(--color-neutral-light-gray);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-lg);
    height: fit-content;
    position: sticky;
    top: 140px;
}

.dress-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.form-group label {
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
}

.form-group input,
.form-group textarea,
.form-group select {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-neutral-medium-gray);
    border-radius: var(--border-radius);
    font-family: var(--font-primary);
    font-size: 14px;
}

.form-group small {
    font-size: 11px;
    color: var(--color-text-secondary);
}

.form-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.inventory-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
}

.inventory-item {
    background-color: var(--color-white);
    border: 1px solid var(--color-neutral-medium-gray);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-md);
    display: flex;
    gap: var(--spacing-md);
}

.inventory-item-image {
    width: 100px;
    height: 133px;
    object-fit: cover;
    border-radius: var(--border-radius);
}

.inventory-item-content {
    flex: 1;
}

.inventory-item-name {
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    text-transform: capitalize;
}

.inventory-item-category {
    font-size: 12px;
    color: var(--color-text-secondary);
    text-transform: capitalize;
    margin-bottom: var(--spacing-xs);
}

.inventory-item-tags {
    font-size: 11px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
}

.inventory-item-price {
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
}

.inventory-item-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.btn-edit {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 6px 12px;
    font-size: 12px;
}

.btn-delete {
    background-color: var(--color-accent-red);
    color: var(--color-white);
    padding: 6px 12px;
    font-size: 12px;
}

/* Cart Page */
.cart-main {
    padding: var(--spacing-lg) 0;
}

.cart-title {
    margin-bottom: var(--spacing-xl);
    text-align: center;
}

.cart-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacing-xl);
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.cart-item {
    background-color: var(--color-white);
    border: 1px solid var(--color-neutral-medium-gray);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-md);
    display: flex;
    gap: var(--spacing-md);
}

.cart-item-image {
    width: 120px;
    height: 160px;
    object-fit: cover;
    border-radius: var(--border-radius);
}

.cart-item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-item-name {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: var(--spacing-xs);
    text-transform: capitalize;
}

.cart-item-price {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: var(--spacing-sm);
}

.cart-summary {
    background-color: var(--color-neutral-light-gray);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-lg);
    height: fit-content;
    position: sticky;
    top: 140px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    font-size: 16px;
}

.total-price {
    font-weight: 700;
    font-size: 20px;
}

.btn-checkout {
    width: 100%;
    margin-top: var(--spacing-md);
}

.empty-cart {
    text-align: center;
    padding: var(--spacing-xxxl);
}

.empty-cart p {
    font-size: 18px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
}

/* Footer */
.main-footer {
    background-color: var(--color-neutral-light-gray);
    padding: var(--spacing-xxl) 0 var(--spacing-md);
    margin-top: var(--spacing-xxxl);
}

.footer-container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-xl);
}

.footer-section h3 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
}

.footer-section ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.footer-section ul li,
.footer-section ul li a {
    font-size: 13px;
    color: var(--color-text-secondary);
}

.footer-section ul li a:hover {
    color: var(--color-primary);
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.footer-bottom {
    max-width: var(--max-width);
    margin: var(--spacing-lg) auto 0;
    padding: var(--spacing-md);
    text-align: center;
    border-top: 1px solid var(--color-neutral-medium-gray);
    color: var(--color-text-secondary);
    font-size: 12px;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .section-grid,
    .products-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .admin-content {
        grid-template-columns: 1fr;
    }
    
    .admin-form-section {
        position: static;
    }
    
    .inventory-grid {
        grid-template-columns: 1fr;
    }
    
    .cart-content {
        grid-template-columns: 1fr;
    }
    
    .cart-summary {
        position: static;
    }
    
    .footer-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .section-grid,
    .products-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
    }
    
    .display-container {
        flex-direction: column;
    }
    
    .filters-sidebar {
        width: 100%;
        position: static;
    }
    
    .footer-container {
        grid-template-columns: 1fr;
    }
    
    .cart-item {
        flex-direction: column;
    }
    
    .cart-item-image {
        width: 100%;
        height: auto;
    }
}

@media (max-width: 480px) {
    .section-grid,
    .products-grid {
        grid-template-columns: 1fr;
    }
    
    .hero {
        padding: var(--spacing-xl) var(--spacing-md);
    }
    
    .container {
        padding: 0 var(--spacing-sm);
    }
}

```


Creating the shared JavaScript utilities:


```javascript
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initLocalStorage();
    updateCartCount();
});

```

```javascript
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
    const combinations = Array.from(categoryTagMap.entries())
        .filter(([key, dresses]) => dresses.length >= 4)
        .slice(0, 6);
    
    if (combinations.length === 0) {
        sectionsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No dresses available. Please add dresses in the admin section.</p>';
        return;
    }
    
    sectionsContainer.innerHTML = '';
    
    combinations.forEach(([key, sectionDresses]) => {
        const [category, tag] = key.split('-');
        const sectionDressesLimited = sectionDresses.slice(0, 4); // Limit to 4 cards per section
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
    
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${dress.image}" alt="${dress.name}" onerror="this.src='https://via.placeholder.com/300x400?text=Dress'">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${dress.tags[0]}</div>` : ''}
        </div>
        <div class="product-card-content">
            <h3 class="product-card-name">${dress.name}</h3>
            <div class="product-card-price">₹${dress.price.toFixed(2)}</div>
            <div class="product-card-actions">
                <a href="display.html" class="btn btn-primary" style="width: 100%;">View Details</a>
            </div>
        </div>
    `;
    
    // Add click handler to navigate to display page
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.btn')) {
            window.location.href = 'display.html';
        }
    });
    
    return card;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadSections();
});

```

```javascript
// Display Page JavaScript

let allDresses = [];
let filteredDresses = [];
let selectedCategories = [];
let selectedTags = [];

// Load all dresses and display them
function loadAllDresses() {
    allDresses = getDresses();
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
function createProductCard(dress) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${dress.image}" alt="${dress.name}" onerror="this.src='https://via.placeholder.com/300x400?text=Dress'">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${dress.tags[0]}</div>` : ''}
        </div>
        <div class="product-card-content">
            <h3 class="product-card-name">${dress.name}</h3>
            <p class="product-card-description">${dress.description || ''}</p>
            <div class="product-card-price">₹${dress.price.toFixed(2)}</div>
            <div class="product-card-actions">
                <button class="btn btn-primary" onclick="handleAddToCart('${dress.id}')" style="width: 100%;">Add to Cart</button>
            </div>
        </div>
    `;
    
    return card;
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
document.addEventListener('DOMContentLoaded', function() {
    loadAllDresses();
    
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
});

// Make handleAddToCart available globally
window.handleAddToCart = handleAddToCart;

```

```javascript
// Admin Page JavaScript

let editingDressId = null;

// Load inventory and display all dresses
function loadInventory() {
    const dresses = getDresses();
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
    
    item.innerHTML = `
        <img src="${dress.image}" alt="${dress.name}" class="inventory-item-image" onerror="this.src='https://via.placeholder.com/100x133?text=Dress'">
        <div class="inventory-item-content">
            <h3 class="inventory-item-name">${dress.name}</h3>
            <p class="inventory-item-category">Category: ${dress.category}</p>
            <p class="inventory-item-tags">Tags: ${dress.tags ? dress.tags.join(', ') : 'None'}</p>
            <p class="inventory-item-price">₹${dress.price.toFixed(2)}</p>
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
function handleFormSubmit() {
    const name = document.getElementById('dressName').value.trim();
    const image = document.getElementById('dressImage').value.trim();
    const description = document.getElementById('dressDescription').value.trim();
    const category = document.getElementById('dressCategory').value;
    const tagsInput = document.getElementById('dressTags').value.trim();
    const price = parseFloat(document.getElementById('dressPrice').value);
    
    if (!name || !image || !description || !category || !tagsInput || !price || isNaN(price)) {
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
        price: price
    };
    
    saveDress(dress);
    
    if (editingDressId) {
        alert('Dress updated successfully!');
    } else {
        alert('Dress added successfully!');
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
function deleteDressItem(id) {
    const dress = getDressById(id);
    if (!dress) {
        alert('Dress not found.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${dress.name}"?`)) {
        deleteDress(id);
        
        // Also remove from cart if present
        removeFromCart(id);
        
        alert('Dress deleted successfully!');
        loadInventory();
        
        // Reset form if editing this dress
        if (editingDressId === id) {
            resetForm();
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadInventory();
    setupForm();
});

// Make functions available globally
window.editDress = editDress;
window.deleteDressItem = deleteDressItem;

```

```javascript
// Cart Page JavaScript

// Load cart and display items
function loadCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItems || !cartContent || !emptyCart) return;
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        updateSummary(0);
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';
    
    cartItems.innerHTML = '';
    
    cart.forEach(dress => {
        const item = createCartItem(dress);
        cartItems.appendChild(item);
    });
    
    calculateTotal();
}

// Create cart item
function createCartItem(dress) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    
    item.innerHTML = `
        <img src="${dress.image}" alt="${dress.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/120x160?text=Dress'">
        <div class="cart-item-content">
            <h3 class="cart-item-name">${dress.name}</h3>
            <p class="cart-item-price">₹${dress.price.toFixed(2)}</p>
            <button class="btn btn-secondary" onclick="removeItem('${dress.id}')">Remove</button>
        </div>
    `;
    
    return item;
}

// Remove item from cart
function removeItem(dressId) {
    const dress = getDressById(dressId);
    if (dress && confirm(`Remove "${dress.name}" from cart?`)) {
        removeFromCart(dressId);
        loadCart();
    }
}

// Calculate total
function calculateTotal() {
    const cart = getCart();
    let subtotal = 0;
    
    cart.forEach(dress => {
        subtotal += dress.price;
    });
    
    updateSummary(subtotal);
}

// Update summary
function updateSummary(subtotal) {
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) {
        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    }
    
    if (totalEl) {
        totalEl.textContent = `₹${subtotal.toFixed(2)}`;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

// Make removeItem available globally
window.removeItem = removeItem;

```


Fixing index.js and adding sample data initialization:


```javascript
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
    const combinations = Array.from(categoryTagMap.entries())
        .filter(([key, dresses]) => dresses.length >= 4)
        .slice(0, 6);
    
    if (combinations.length === 0) {
        sectionsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No dresses available. Please add dresses in the admin section.</p>';
        return;
    }
    
    sectionsContainer.innerHTML = '';
    
    combinations.forEach(([key, sectionDresses]) => {
        const [category, tag] = key.split('-');
        const sectionDressesLimited = sectionDresses.slice(0, 4); // Limit to 4 cards per section
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
    
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${dress.image}" alt="${dress.name}" onerror="this.src='https://via.placeholder.com/300x400?text=Dress'">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${dress.tags[0]}</div>` : ''}
        </div>
        <div class="product-card-content">
            <h3 class="product-card-name">${dress.name}</h3>
            <div class="product-card-price">₹${dress.price.toFixed(2)}</div>
            <div class="product-card-actions">
                <a href="display.html" class="btn btn-primary" style="width: 100%;">View Details</a>
            </div>
        </div>
    `;
    
    // Add click handler to navigate to display page
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.btn')) {
            window.location.href = 'display.html';
        }
    });
    
    return card;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadSections();
});

// Make loadSections available globally
window.loadSections = loadSections;


```


Adding sample data initialization:


```javascript
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
    
    const sampleDresses = [
        // Silk Sarees
        {
            id: generateId(),
            name: "Elegant Silk Saree - Festive",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
            description: "Beautiful traditional silk saree perfect for festive occasions",
            category: "silk sarees",
            tags: ["festive", "traditional", "wedding"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Designer Silk Saree - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer silk saree for parties and celebrations",
            category: "silk sarees",
            tags: ["party", "designer", "elegant"],
            price: 12999.00
        },
        {
            id: generateId(),
            name: "Classic Silk Saree - Traditional",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Classic silk saree with traditional patterns",
            category: "silk sarees",
            tags: ["traditional", "classic", "wedding"],
            price: 7999.00
        },
        {
            id: generateId(),
            name: "Modern Silk Saree - Casual",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Modern twist on traditional silk saree for casual wear",
            category: "silk sarees",
            tags: ["casual", "modern", "comfortable"],
            price: 6999.00
        },
        // Anarkali Sarees
        {
            id: generateId(),
            name: "Floral Anarkali Saree - Festive",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Beautiful floral print anarkali saree for festive occasions",
            category: "anarkali sarees",
            tags: ["festive", "floral", "elegant"],
            price: 5999.00
        },
        {
            id: generateId(),
            name: "Designer Anarkali Saree - Party",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Stylish designer anarkali saree perfect for parties",
            category: "anarkali sarees",
            tags: ["party", "designer", "stylish"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Traditional Anarkali Saree - Wedding",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree for wedding ceremonies",
            category: "anarkali sarees",
            tags: ["wedding", "traditional", "ceremony"],
            price: 11999.00
        },
        {
            id: generateId(),
            name: "Casual Anarkali Saree - Office",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Comfortable anarkali saree suitable for office wear",
            category: "anarkali sarees",
            tags: ["office", "casual", "professional"],
            price: 4999.00
        },
        // Formal
        {
            id: generateId(),
            name: "Professional Formal Dress - Office",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Elegant professional formal dress for office wear",
            category: "formal",
            tags: ["office", "professional", "business"],
            price: 3999.00
        },
        {
            id: generateId(),
            name: "Classic Formal Dress - Party",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Classic formal dress perfect for parties and events",
            category: "formal",
            tags: ["party", "classic", "elegant"],
            price: 5999.00
        },
        {
            id: generateId(),
            name: "Modern Formal Dress - Casual",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Modern formal dress with casual appeal",
            category: "formal",
            tags: ["casual", "modern", "comfortable"],
            price: 3499.00
        },
        {
            id: generateId(),
            name: "Designer Formal Dress - Festive",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Designer formal dress for festive celebrations",
            category: "formal",
            tags: ["festive", "designer", "celebration"],
            price: 7999.00
        },
        // Churidar
        {
            id: generateId(),
            name: "Elegant Churidar Set - Festive",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Beautiful churidar set perfect for festive occasions",
            category: "churidar",
            tags: ["festive", "elegant", "traditional"],
            price: 4999.00
        },
        {
            id: generateId(),
            name: "Designer Churidar Set - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer churidar set for parties",
            category: "churidar",
            tags: ["party", "designer", "stylish"],
            price: 6999.00
        },
        {
            id: generateId(),
            name: "Traditional Churidar Set - Wedding",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Traditional churidar set for wedding ceremonies",
            category: "churidar",
            tags: ["wedding", "traditional", "ceremony"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Casual Churidar Set - Office",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Comfortable churidar set suitable for office wear",
            category: "churidar",
            tags: ["office", "casual", "comfortable"],
            price: 3999.00
        },
        // Additional dresses to ensure 6 sections with 4 each
        {
            id: generateId(),
            name: "Premium Silk Saree - Wedding",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Premium quality silk saree for wedding ceremonies",
            category: "silk sarees",
            tags: ["wedding", "premium", "luxury"],
            price: 15999.00
        },
        {
            id: generateId(),
            name: "Festive Anarkali Saree - Traditional",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree with festive designs",
            category: "anarkali sarees",
            tags: ["festive", "traditional", "celebration"],
            price: 6999.00
        },
        {
            id: generateId(),
            name: "Business Formal Dress - Professional",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Professional business formal dress for corporate events",
            category: "formal",
            tags: ["office", "professional", "corporate"],
            price: 4499.00
        },
        {
            id: generateId(),
            name: "Wedding Churidar Set - Traditional",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Traditional wedding churidar set with intricate designs",
            category: "churidar",
            tags: ["wedding", "traditional", "intricate"],
            price: 10999.00
        },
        {
            id: generateId(),
            name: "Party Silk Saree - Elegant",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Elegant silk saree perfect for party occasions",
            category: "silk sarees",
            tags: ["party", "elegant", "celebration"],
            price: 9999.00
        },
        {
            id: generateId(),
            name: "Office Anarkali Saree - Professional",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Professional anarkali saree suitable for office environment",
            category: "anarkali sarees",
            tags: ["office", "professional", "business"],
            price: 5499.00
        },
        {
            id: generateId(),
            name: "Casual Formal Dress - Comfortable",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Comfortable casual formal dress for everyday wear",
            category: "formal",
            tags: ["casual", "comfortable", "everyday"],
            price: 2999.00
        },
        {
            id: generateId(),
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


```


Fixing a few issues in the JavaScript files:



Fixing the handleAddToCart function in display.js:


```javascript
// Display Page JavaScript

let allDresses = [];
let filteredDresses = [];
let selectedCategories = [];
let selectedTags = [];

// Load all dresses and display them
function loadAllDresses() {
    allDresses = getDresses();
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
function createProductCard(dress) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-card-image">
            <img src="${dress.image}" alt="${dress.name}" onerror="this.src='https://via.placeholder.com/300x400?text=Dress'">
            ${dress.tags && dress.tags.length > 0 ? `<div class="product-card-badge">${dress.tags[0]}</div>` : ''}
        </div>
        <div class="product-card-content">
            <h3 class="product-card-name">${dress.name}</h3>
            <p class="product-card-description">${dress.description || ''}</p>
            <div class="product-card-price">₹${dress.price.toFixed(2)}</div>
            <div class="product-card-actions">
                <button class="btn btn-primary" onclick="handleAddToCart('${dress.id}')" style="width: 100%;">Add to Cart</button>
            </div>
        </div>
    `;
    
    return card;
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
document.addEventListener('DOMContentLoaded', function() {
    loadAllDresses();
    
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
});

// Make functions available globally
window.handleAddToCart = handleAddToCart;
window.clearFilters = clearFilters;


```


Fixing the cart page layout:


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Women's Dress Shop - Shopping Cart</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <div class="header-top">
            <div class="header-links">
                <a href="#">Track Orders</a>
                <a href="#">Sign In</a>
                <a href="#">Sign Up</a>
            </div>
        </div>
        <nav class="main-nav">
            <div class="nav-container">
                <a href="index.html" class="logo">Dress Shop</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="display.html">Shop</a>
                    <a href="admin.html">Admin</a>
                </div>
                <a href="cart.html" class="cart-icon">
                    <span class="cart-count">0</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4m7 14V9a2 2 0 0 0-2-2h-5m0 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 3v4m0 0v10m0-10h10m-10 0H5m12 0v10m0-10h2"/>
                    </svg>
                </a>
            </div>
        </nav>
    </header>

    <main class="cart-main">
        <div class="container">
            <h1 class="cart-title">Shopping Cart</h1>
            
            <div id="cartContent" class="cart-content">
                <div class="cart-items" id="cartItems">
                    <!-- Cart items will be dynamically loaded here -->
                </div>
                
                <div class="cart-summary" id="cartSummary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span id="subtotal">₹0.00</span>
                    </div>
                    <div class="summary-row">
                        <span>Total:</span>
                        <span id="total" class="total-price">₹0.00</span>
                    </div>
                    <button class="btn btn-primary btn-checkout">Proceed to Checkout</button>
                </div>
            </div>

            <div id="emptyCart" class="empty-cart" style="display: none;">
                <p>Your cart is empty</p>
                <a href="display.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        </div>
    </main>

    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Company</h3>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Trust Indicators</h3>
                <ul>
                    <li>✓ Authentic Products</li>
                    <li>✓ Easy Returns</li>
                    <li>✓ Secure Payments</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Dress Shop. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="cart.js"></script>
</body>
</html>


```


Adding the cart-content class to the CSS:


```css
.cart-title {
    margin-bottom: var(--spacing-xl);
    text-align: center;
}

.cart-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacing-xl);
}
```


Checking cart.js for correct class usage:


```javascript
// Load cart and display items
function loadCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItems || !cartContent || !emptyCart) return;
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        updateSummary(0);
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';
    
    cartItems.innerHTML = '';
    
    cart.forEach(dress => {
        const item = createCartItem(dress);
        cartItems.appendChild(item);
    });
    
    calculateTotal();
}
```


Verifying the CSS includes the cart-content class:



The cart-content class is already in the CSS. Verifying all files are complete and checking for any final issues:



Checking the order of functions in script.js to ensure generateId is available when initializing sample data:



Fixing ID generation in sample data to ensure unique IDs:


```javascript
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
            id: generateId(),
            name: "Designer Silk Saree - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer silk saree for parties and celebrations",
            category: "silk sarees",
            tags: ["party", "designer", "elegant"],
            price: 12999.00
        },
        {
            id: generateId(),
            name: "Classic Silk Saree - Traditional",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Classic silk saree with traditional patterns",
            category: "silk sarees",
            tags: ["traditional", "classic", "wedding"],
            price: 7999.00
        },
        {
            id: generateId(),
            name: "Modern Silk Saree - Casual",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Modern twist on traditional silk saree for casual wear",
            category: "silk sarees",
            tags: ["casual", "modern", "comfortable"],
            price: 6999.00
        },
        // Anarkali Sarees
        {
            id: generateId(),
            name: "Floral Anarkali Saree - Festive",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Beautiful floral print anarkali saree for festive occasions",
            category: "anarkali sarees",
            tags: ["festive", "floral", "elegant"],
            price: 5999.00
        },
        {
            id: generateId(),
            name: "Designer Anarkali Saree - Party",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Stylish designer anarkali saree perfect for parties",
            category: "anarkali sarees",
            tags: ["party", "designer", "stylish"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Traditional Anarkali Saree - Wedding",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree for wedding ceremonies",
            category: "anarkali sarees",
            tags: ["wedding", "traditional", "ceremony"],
            price: 11999.00
        },
        {
            id: generateId(),
            name: "Casual Anarkali Saree - Office",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Comfortable anarkali saree suitable for office wear",
            category: "anarkali sarees",
            tags: ["office", "casual", "professional"],
            price: 4999.00
        },
        // Formal
        {
            id: generateId(),
            name: "Professional Formal Dress - Office",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Elegant professional formal dress for office wear",
            category: "formal",
            tags: ["office", "professional", "business"],
            price: 3999.00
        },
        {
            id: generateId(),
            name: "Classic Formal Dress - Party",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Classic formal dress perfect for parties and events",
            category: "formal",
            tags: ["party", "classic", "elegant"],
            price: 5999.00
        },
        {
            id: generateId(),
            name: "Modern Formal Dress - Casual",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Modern formal dress with casual appeal",
            category: "formal",
            tags: ["casual", "modern", "comfortable"],
            price: 3499.00
        },
        {
            id: generateId(),
            name: "Designer Formal Dress - Festive",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Designer formal dress for festive celebrations",
            category: "formal",
            tags: ["festive", "designer", "celebration"],
            price: 7999.00
        },
        // Churidar
        {
            id: generateId(),
            name: "Elegant Churidar Set - Festive",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Beautiful churidar set perfect for festive occasions",
            category: "churidar",
            tags: ["festive", "elegant", "traditional"],
            price: 4999.00
        },
        {
            id: generateId(),
            name: "Designer Churidar Set - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer churidar set for parties",
            category: "churidar",
            tags: ["party", "designer", "stylish"],
            price: 6999.00
        },
        {
            id: generateId(),
            name: "Traditional Churidar Set - Wedding",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Traditional churidar set for wedding ceremonies",
            category: "churidar",
            tags: ["wedding", "traditional", "ceremony"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Casual Churidar Set - Office",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Comfortable churidar set suitable for office wear",
            category: "churidar",
            tags: ["office", "casual", "comfortable"],
            price: 3999.00
        },
        // Additional dresses to ensure 6 sections with 4 each
        {
            id: generateId(),
            name: "Premium Silk Saree - Wedding",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Premium quality silk saree for wedding ceremonies",
            category: "silk sarees",
            tags: ["wedding", "premium", "luxury"],
            price: 15999.00
        },
        {
            id: generateId(),
            name: "Festive Anarkali Saree - Traditional",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree with festive designs",
            category: "anarkali sarees",
            tags: ["festive", "traditional", "celebration"],
            price: 6999.00
        },
        {
            id: generateId(),
            name: "Business Formal Dress - Professional",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Professional business formal dress for corporate events",
            category: "formal",
            tags: ["office", "professional", "corporate"],
            price: 4499.00
        },
        {
            id: generateId(),
            name: "Wedding Churidar Set - Traditional",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Traditional wedding churidar set with intricate designs",
            category: "churidar",
            tags: ["wedding", "traditional", "intricate"],
            price: 10999.00
        },
        {
            id: generateId(),
            name: "Party Silk Saree - Elegant",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Elegant silk saree perfect for party occasions",
            category: "silk sarees",
            tags: ["party", "elegant", "celebration"],
            price: 9999.00
        },
        {
            id: generateId(),
            name: "Office Anarkali Saree - Professional",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Professional anarkali saree suitable for office environment",
            category: "anarkali sarees",
            tags: ["office", "professional", "business"],
            price: 5499.00
        },
        {
            id: generateId(),
            name: "Casual Formal Dress - Comfortable",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Comfortable casual formal dress for everyday wear",
            category: "formal",
            tags: ["casual", "comfortable", "everyday"],
            price: 2999.00
        },
        {
            id: generateId(),
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


```

```javascript
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
            id: generateId(),
            name: "Classic Silk Saree - Traditional",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Classic silk saree with traditional patterns",
            category: "silk sarees",
            tags: ["traditional", "classic", "wedding"],
            price: 7999.00
        },
        {
            id: generateId(),
            name: "Modern Silk Saree - Casual",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Modern twist on traditional silk saree for casual wear",
            category: "silk sarees",
            tags: ["casual", "modern", "comfortable"],
            price: 6999.00
        },
        // Anarkali Sarees
        {
            id: generateId(),
            name: "Floral Anarkali Saree - Festive",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Beautiful floral print anarkali saree for festive occasions",
            category: "anarkali sarees",
            tags: ["festive", "floral", "elegant"],
            price: 5999.00
        },
        {
            id: generateId(),
            name: "Designer Anarkali Saree - Party",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Stylish designer anarkali saree perfect for parties",
            category: "anarkali sarees",
            tags: ["party", "designer", "stylish"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Traditional Anarkali Saree - Wedding",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree for wedding ceremonies",
            category: "anarkali sarees",
            tags: ["wedding", "traditional", "ceremony"],
            price: 11999.00
        },
        {
            id: generateId(),
            name: "Casual Anarkali Saree - Office",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Comfortable anarkali saree suitable for office wear",
            category: "anarkali sarees",
            tags: ["office", "casual", "professional"],
            price: 4999.00
        },
        // Formal
        {
            id: generateId(),
            name: "Professional Formal Dress - Office",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Elegant professional formal dress for office wear",
            category: "formal",
            tags: ["office", "professional", "business"],
            price: 3999.00
        },
        {
            id: generateId(),
            name: "Classic Formal Dress - Party",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Classic formal dress perfect for parties and events",
            category: "formal",
            tags: ["party", "classic", "elegant"],
            price: 5999.00
        },
        {
            id: generateId(),
            name: "Modern Formal Dress - Casual",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Modern formal dress with casual appeal",
            category: "formal",
            tags: ["casual", "modern", "comfortable"],
            price: 3499.00
        },
        {
            id: generateId(),
            name: "Designer Formal Dress - Festive",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Designer formal dress for festive celebrations",
            category: "formal",
            tags: ["festive", "designer", "celebration"],
            price: 7999.00
        },
        // Churidar
        {
            id: generateId(),
            name: "Elegant Churidar Set - Festive",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Beautiful churidar set perfect for festive occasions",
            category: "churidar",
            tags: ["festive", "elegant", "traditional"],
            price: 4999.00
        },
        {
            id: generateId(),
            name: "Designer Churidar Set - Party",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Stylish designer churidar set for parties",
            category: "churidar",
            tags: ["party", "designer", "stylish"],
            price: 6999.00
        },
        {
            id: generateId(),
            name: "Traditional Churidar Set - Wedding",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Traditional churidar set for wedding ceremonies",
            category: "churidar",
            tags: ["wedding", "traditional", "ceremony"],
            price: 8999.00
        },
        {
            id: generateId(),
            name: "Casual Churidar Set - Office",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Comfortable churidar set suitable for office wear",
            category: "churidar",
            tags: ["office", "casual", "comfortable"],
            price: 3999.00
        },
        // Additional dresses to ensure 6 sections with 4 each
        {
            id: generateId(),
            name: "Premium Silk Saree - Wedding",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Premium quality silk saree for wedding ceremonies",
            category: "silk sarees",
            tags: ["wedding", "premium", "luxury"],
            price: 15999.00
        },
        {
            id: generateId(),
            name: "Festive Anarkali Saree - Traditional",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
            description: "Traditional anarkali saree with festive designs",
            category: "anarkali sarees",
            tags: ["festive", "traditional", "celebration"],
            price: 6999.00
        },
        {
            id: generateId(),
            name: "Business Formal Dress - Professional",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b7b97ccd1?w=400&h=600&fit=crop",
            description: "Professional business formal dress for corporate events",
            category: "formal",
            tags: ["office", "professional", "corporate"],
            price: 4499.00
        },
        {
            id: generateId(),
            name: "Wedding Churidar Set - Traditional",
            image: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=400&h=600&fit=crop",
            description: "Traditional wedding churidar set with intricate designs",
            category: "churidar",
            tags: ["wedding", "traditional", "intricate"],
            price: 10999.00
        },
        {
            id: generateId(),
            name: "Party Silk Saree - Elegant",
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=600&fit=crop",
            description: "Elegant silk saree perfect for party occasions",
            category: "silk sarees",
            tags: ["party", "elegant", "celebration"],
            price: 9999.00
        },
        {
            id: generateId(),
            name: "Office Anarkali Saree - Professional",
            image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop",
            description: "Professional anarkali saree suitable for office environment",
            category: "anarkali sarees",
            tags: ["office", "professional", "business"],
            price: 5499.00
        },
        {
            id: generateId(),
            name: "Casual Formal Dress - Comfortable",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
            description: "Comfortable casual formal dress for everyday wear",
            category: "formal",
            tags: ["casual", "comfortable", "everyday"],
            price: 2999.00
        },
        {
            id: generateId(),
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


```

```javascript
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


```


Checking for syntax errors:



## Implementation complete

### Files created:
1. **HTML files:**
   - `index.html` - Homepage with 6 sections grouped by category+tag combinations
   - `display.html` - Product listing page with left sidebar filters
   - `admin.html` - Admin page for full CRUD operations
   - `cart.html` - Shopping cart page

2. **CSS:**
   - `styles.css` - Design system following design.json specifications

3. **JavaScript files:**
   - `script.js` - Shared LocalStorage utilities and sample data initialization
   - `index.js` - Homepage logic for displaying 6 sections with 4 cards each
   - `display.js` - Filtering logic (category and tags) and product grid rendering
   - `admin.js` - Full CRUD operations (Create, Read, Update, Delete)
   - `cart.js` - Cart management (add, remove, calculate total)

### Features implemented:
- ✅ 6 sections on index.html grouped by category+tag combinations (4 cards each)
- ✅ Filtering by category and tags on display.html
- ✅ Full CRUD operations in admin.html
- ✅ Shopping cart with add/remove functionality
- ✅ LocalStorage for data persistence
- ✅ Sample data with 24 dresses covering all 4 categories and various tags
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Design system following design.json (colors, typography, layout)

The website is ready to use. Open `index.html` in a browser to start. Sample data will be automatically initialized on first load.

