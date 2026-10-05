// Main JavaScript for Homepage

document.addEventListener('DOMContentLoaded', function() {
    // Load featured vehicles on homepage
    const featuredVehiclesContainer = document.getElementById('featuredVehicles');
    if (featuredVehiclesContainer) {
        loadFeaturedVehicles();
    }

    // Search functionality
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton && searchBar) {
        searchButton.addEventListener('click', performSearch);
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Navigation search button
    const navSearchBtn = document.getElementById('searchBtn');
    if (navSearchBtn) {
        navSearchBtn.addEventListener('click', function() {
            toggleSearchModal();
        });
    }

    // Navigation user/login button
    const navUserBtn = document.getElementById('userBtn');
    if (navUserBtn) {
        navUserBtn.addEventListener('click', function() {
            showLoginModal();
        });
    }
});

function loadFeaturedVehicles() {
    const container = document.getElementById('featuredVehicles');
    const featured = getFeaturedVehicles();
    
    container.innerHTML = featured.map(vehicle => createVehicleCard(vehicle)).join('');
    
    // Add event listeners for "Add to Cart" buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const vehicleId = parseInt(this.dataset.vehicleId);
            cart.addItem(vehicleId);
        });
    });

    // Add event listeners for favorite buttons
    container.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
        });
    });
}

function createVehicleCard(vehicle) {
    // Fix image path for pages subdirectory
    let imagePath = vehicle.image;
    if (imagePath.startsWith('images/') && window.location.pathname.includes('/pages/')) {
        imagePath = '../' + imagePath;
    }
    
    return `
        <div class="vehicle-card">
            <button class="favorite-btn">
                <i class="far fa-heart"></i>
            </button>
            <img src="${imagePath}" alt="${vehicle.name}" class="vehicle-image" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
            <div class="vehicle-info">
                <h3 class="vehicle-name">${vehicle.name}</h3>
                <div class="vehicle-price">${formatPrice(vehicle.price)}</div>
                <div class="vehicle-details">
                    <span><i class="fas fa-calendar"></i> ${vehicle.year}</span>
                    <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
                    <span><i class="fas fa-gas-pump"></i> ${vehicle.fuelType}</span>
                </div>
                <div class="vehicle-actions">
                    <button class="btn-primary add-to-cart-btn" data-vehicle-id="${vehicle.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <a href="pages/vehicle-detail.html?id=${vehicle.id}" class="btn-secondary" style="text-align: center; text-decoration: none; padding: 10px; font-size: 0.9rem;">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

function performSearch() {
    const searchBar = document.querySelector('.search-bar input');
    const searchTerm = searchBar.value.trim();
    if (searchTerm) {
        window.location.href = `pages/vehicles.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

function toggleSearchModal() {
    // Create search modal if it doesn't exist
    let searchModal = document.getElementById('searchModal');
    if (!searchModal) {
        searchModal = document.createElement('div');
        searchModal.id = 'searchModal';
        searchModal.innerHTML = `
            <div class="search-modal-overlay" onclick="closeSearchModal()"></div>
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Search Vehicles</h3>
                    <button onclick="closeSearchModal()" class="modal-close-btn">&times;</button>
                </div>
                <div class="search-modal-body">
                    <div class="search-input-group">
                        <input type="text" id="modalSearchInput" placeholder="Search for cars, motorcycles, boats..." autofocus>
                        <button onclick="performModalSearch()" class="btn-primary">
                            <i class="fas fa-search"></i> Search
                        </button>
                    </div>
                    <div class="popular-searches">
                        <h4>Popular Searches:</h4>
                        <div class="search-tags">
                            <a href="pages/vehicles.html?search=toyota">Toyota</a>
                            <a href="pages/vehicles.html?search=honda">Honda</a>
                            <a href="pages/vehicles.html?search=motorcycle">Motorcycle</a>
                            <a href="pages/vehicles.html?category=cars">Cars</a>
                            <a href="pages/vehicles.html?category=vans">Vans</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);

        // Add enter key support
        document.getElementById('modalSearchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performModalSearch();
            }
        });
    }
    searchModal.classList.add('active');
    setTimeout(() => {
        document.getElementById('modalSearchInput').focus();
    }, 100);
}

function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.remove('active');
    }
}

function performModalSearch() {
    const searchInput = document.getElementById('modalSearchInput');
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Check if we're in the pages directory
        const inPagesDir = window.location.pathname.includes('/pages/');
        const targetUrl = inPagesDir ? `vehicles.html?search=${encodeURIComponent(searchTerm)}` : `pages/vehicles.html?search=${encodeURIComponent(searchTerm)}`;
        window.location.href = targetUrl;
    }
}

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
                    <h3 id="authModalTitle">Login to VeloMart</h3>
                    <button onclick="closeLoginModal()" class="modal-close-btn">&times;</button>
                </div>
                <div class="search-modal-body">
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
    
    // Save to localStorage (demo - in production this would call an API)
    const users = JSON.parse(localStorage.getItem('velomart_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save logged in user
        localStorage.setItem('velomart_current_user', JSON.stringify(user));
        showSuccess(`Welcome back, ${user.name}!`);
        closeLoginModal();
        updateUserButton();
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
    updateUserButton();
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
        modalTitle.textContent = 'Login to VeloMart';
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

function updateUserButton() {
    const currentUser = JSON.parse(localStorage.getItem('velomart_current_user') || 'null');
    const userBtn = document.getElementById('userBtn');
    
    if (currentUser && userBtn) {
        // Show user is logged in
        userBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
        userBtn.title = `Logged in as ${currentUser.name}`;
        
        // Change click behavior to show user menu
        userBtn.onclick = function() {
            showConfirm(
                `Logged in as: ${currentUser.name}<br>${currentUser.email}<br><br>Do you want to logout?`,
                function() {
                    // Confirmed - logout
                    localStorage.removeItem('velomart_current_user');
                    showInfo('Logged out successfully!');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            );
        };
    }
}

function showSignupForm() {
    toggleAuthForm();
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUserButton();
});

// Make functions global so they can be called from onclick attributes
window.closeSearchModal = closeSearchModal;
window.performModalSearch = performModalSearch;
window.closeLoginModal = closeLoginModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.toggleAuthForm = toggleAuthForm;
window.togglePassword = togglePassword;
window.showSignupForm = showSignupForm;
