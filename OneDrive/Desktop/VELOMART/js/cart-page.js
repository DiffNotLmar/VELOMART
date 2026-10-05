// Shopping Cart Page JavaScript

// Helper function to fix image paths for subdirectory pages
function fixImagePath(imagePath) {
    if (imagePath.startsWith('images/') && window.location.pathname.includes('/pages/')) {
        return '../' + imagePath;
    }
    return imagePath;
}

document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();
});

function loadCartPage() {
    const container = document.getElementById('cartLayout');
    
    if (cart.items.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Your cart is empty</h2>
                <p>Add some vehicles to your cart to get started!</p>
                <a href="vehicles.html" class="btn-primary">
                    <i class="fas fa-car"></i>
                    Browse Vehicles
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="cart-items-section" id="cartItems">
            ${renderCartItems()}
        </div>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            ${renderCartSummary()}
        </div>
    `;

    setupCartEventListeners();
}

function renderCartItems() {
    return cart.items.map(item => {
        const vehicle = item.vehicle;
        const itemTotal = vehicle.price * item.quantity;
        const imagePath = fixImagePath(vehicle.image);
        
        return `
            <div class="cart-item" data-vehicle-id="${vehicle.id}">
                <div class="cart-item-image">
                    <img src="${imagePath}" alt="${vehicle.name}" onerror="this.src='https://via.placeholder.com/150x100?text=No+Image'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">
                        <a href="vehicle-detail.html?id=${vehicle.id}">${vehicle.name}</a>
                    </div>
                    <div class="cart-item-specs">
                        <span><i class="fas fa-calendar"></i> ${vehicle.year}</span>
                        <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
                        <span><i class="fas fa-gas-pump"></i> ${vehicle.fuelType}</span>
                    </div>
                    <div class="cart-item-price">${formatPrice(itemTotal)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-vehicle-id="${vehicle.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-vehicle-id="${vehicle.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" data-vehicle-id="${vehicle.id}">
                        <i class="fas fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderCartSummary() {
    const subtotal = cart.getTotal();
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.12; // 12% tax
    const total = subtotal + shipping + tax;

    return `
        <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Shipping</span>
            <span class="summary-value">
                ${shipping === 0 ? 'FREE' : formatPrice(shipping)}
            </span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Tax (12%)</span>
            <span class="summary-value">${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span class="summary-label">Total</span>
            <span class="summary-value">${formatPrice(total)}</span>
        </div>

        <button class="btn-primary checkout-btn" id="checkoutBtn">
            Proceed to Checkout
        </button>

        <div class="summary-note">
            <i class="fas fa-shield-alt"></i>
            Safe and secure checkout
        </div>

        <div class="promo-section">
            <h4>Have a promo code?</h4>
            <div class="promo-input-group">
                <input type="text" class="promo-input" id="promoCode" placeholder="Enter code">
                <button class="promo-btn" id="applyPromo">Apply</button>
            </div>
        </div>

        <div class="security-badges">
            <div class="security-badge">
                <i class="fas fa-lock"></i>
                <span>Secure</span>
            </div>
            <div class="security-badge">
                <i class="fas fa-check-circle"></i>
                <span>Verified</span>
            </div>
            <div class="security-badge">
                <i class="fas fa-shield-alt"></i>
                <span>Protected</span>
            </div>
        </div>
    `;
}

function setupCartEventListeners() {
    // Decrease quantity buttons
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const vehicleId = parseInt(this.dataset.vehicleId);
            const item = cart.items.find(i => i.id === vehicleId);
            if (item) {
                if (item.quantity > 1) {
                    cart.updateQuantity(vehicleId, item.quantity - 1);
                    loadCartPage();
                } else {
                    showConfirm('Remove this item from cart?', function() {
                        cart.removeItem(vehicleId);
                        loadCartPage();
                    });
                }
            }
        });
    });

    // Increase quantity buttons
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const vehicleId = parseInt(this.dataset.vehicleId);
            const item = cart.items.find(i => i.id === vehicleId);
            if (item) {
                cart.updateQuantity(vehicleId, item.quantity + 1);
                loadCartPage();
            }
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const vehicleId = parseInt(this.dataset.vehicleId);
            showConfirm('Are you sure you want to remove this item from your cart?', function() {
                cart.removeItem(vehicleId);
                loadCartPage();
                showSuccess('Item removed from cart');
            });
        });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('velomart_current_user') || 'null');
            if (!currentUser) {
                // User not logged in, show login modal
                showInfo('Please login or create an account to proceed with checkout.');
                setTimeout(() => showLoginModal(), 500);
            } else {
                // User is logged in, proceed to checkout
                window.location.href = 'checkout.html';
            }
        });
    }

    // Promo code
    const applyPromoBtn = document.getElementById('applyPromo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = document.getElementById('promoCode').value.trim();
            if (promoCode) {
                // Placeholder for promo code validation
                showInfo('Promo code feature coming soon!');
            } else {
                showWarning('Please enter a promo code');
            }
        });
    }
}

// Login Modal Functions for Cart Page
function showLoginModal() {
    // Create login modal if it doesn't exist
    let loginModal = document.getElementById('loginModal');
    if (!loginModal) {
        loginModal = document.createElement('div');
        loginModal.id = 'loginModal';
        loginModal.innerHTML = `
            <div class="search-modal-overlay" onclick="closeLoginModal()"></div>
            <div class="login-modal-content">
                <div class="search-modal-header">
                    <h3 id="authModalTitle">Login to Continue</h3>
                    <button onclick="closeLoginModal()" class="modal-close-btn">&times;</button>
                </div>
                <div class="search-modal-body">
                    <p style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem;">
                        Please login or create an account to proceed with checkout
                    </p>
                    
                    <!-- Login Form -->
                    <form id="loginForm" onsubmit="handleLogin(event)" style="display: block;">
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input type="email" id="loginEmail" required placeholder="your@email.com">
                        </div>
                        <div class="form-group">
                            <label>Password *</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="loginPassword" required placeholder="Enter your password">
                                <button type="button" class="toggle-password" onclick="togglePassword('loginPassword')">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="rememberMe" style="width: auto; margin: 0;">
                            <label for="rememberMe" style="margin: 0; cursor: pointer;">Remember me</label>
                        </div>
                        <button type="submit" class="btn-primary" style="width: 100%; margin-top: 1rem;">
                            <i class="fas fa-sign-in-alt"></i> Login
                        </button>
                    </form>

                    <!-- Register Form -->
                    <form id="registerForm" onsubmit="handleRegister(event)" style="display: none;">
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" id="registerName" required placeholder="John Doe">
                        </div>
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input type="email" id="registerEmail" required placeholder="your@email.com">
                        </div>
                        <div class="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" id="registerPhone" required placeholder="+63 XXX XXX XXXX">
                        </div>
                        <div class="form-group">
                            <label>Password *</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="registerPassword" required placeholder="Create a password" minlength="6">
                                <button type="button" class="toggle-password" onclick="togglePassword('registerPassword')">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>
                            <small style="color: var(--text-secondary); font-size: 0.85rem;">Minimum 6 characters</small>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password *</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="confirmPassword" required placeholder="Confirm your password" minlength="6">
                                <button type="button" class="toggle-password" onclick="togglePassword('confirmPassword')">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="agreeTerms" required style="width: auto; margin: 0;">
                            <label for="agreeTerms" style="margin: 0; cursor: pointer; font-size: 0.9rem;">
                                I agree to the <a href="#" style="color: var(--primary-color);">Terms & Conditions</a>
                            </label>
                        </div>
                        <button type="submit" class="btn-primary" style="width: 100%; margin-top: 1rem;">
                            <i class="fas fa-user-plus"></i> Create Account
                        </button>
                    </form>

                    <div class="login-divider">
                        <span>OR</span>
                    </div>

                    <!-- Toggle between Login and Register -->
                    <div class="auth-toggle">
                        <p id="authToggleText">Don't have an account? <a href="#" onclick="toggleAuthForm(); return false;">Sign up here</a></p>
                    </div>

                    <div class="login-footer" id="forgotPasswordLink">
                        <a href="#" onclick="alert('Password reset feature coming soon!'); return false;">Forgot Password?</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(loginModal);
    }
    loginModal.classList.add('active');
}

function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Check credentials from localStorage
    const users = JSON.parse(localStorage.getItem('velomart_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save logged in user
        localStorage.setItem('velomart_current_user', JSON.stringify(user));
        showSuccess(`Welcome back, ${user.name}!`);
        closeLoginModal();
        // Proceed to checkout
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 1000);
    } else {
        showError('Invalid email or password. Please try again or create a new account.');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('velomart_users') || '[]');
    if (users.find(u => u.email === email)) {
        showWarning('Email already registered. Please login instead.');
        return;
    }
    
    // Save new user
    const newUser = { name, email, phone, password, registeredAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('velomart_users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('velomart_current_user', JSON.stringify(newUser));
    
    showSuccess(`Welcome to VeloMart, ${name}! Your account has been created successfully.`);
    closeLoginModal();
    // Proceed to checkout
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
}

function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('authModalTitle');
    const toggleText = document.getElementById('authToggleText');
    const forgotLink = document.getElementById('forgotPasswordLink');
    
    if (loginForm.style.display === 'none') {
        // Switch to login
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        modalTitle.textContent = 'Login to Continue';
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthForm(); return false;">Sign up here</a>';
        forgotLink.style.display = 'block';
    } else {
        // Switch to register
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        modalTitle.textContent = 'Create Account';
        toggleText.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthForm(); return false;">Login here</a>';
        forgotLink.style.display = 'none';
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Make functions global
window.showLoginModal = showLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.toggleAuthForm = toggleAuthForm;
window.togglePassword = togglePassword;
