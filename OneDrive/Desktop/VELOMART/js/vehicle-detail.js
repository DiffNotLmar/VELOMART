// Vehicle Detail Page JavaScript

let currentVehicle = null;
let currentImageIndex = 0;

// Helper function to fix image paths for subdirectory pages
function fixImagePath(imagePath) {
    if (imagePath.startsWith('images/') && window.location.pathname.includes('/pages/')) {
        return '../' + imagePath;
    }
    return imagePath;
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = parseInt(urlParams.get('id'));

    if (vehicleId) {
        currentVehicle = getVehicleById(vehicleId);
        if (currentVehicle) {
            loadVehicleDetail(currentVehicle);
            setupEventListeners();
        } else {
            showVehicleNotFound();
        }
    } else {
        showVehicleNotFound();
    }
});

function loadVehicleDetail(vehicle) {
    const container = document.getElementById('vehicleDetail');
    
    // Fix image paths for subdirectory
    const fixedImages = vehicle.images.map(img => fixImagePath(img));
    
    container.innerHTML = `
        <!-- Gallery Section -->
        <div class="gallery-section">
            <div class="main-image-container" id="mainImageContainer">
                <img src="${fixedImages[0]}" alt="${vehicle.name}" class="main-image" id="mainImage" onerror="this.src='https://via.placeholder.com/800x500?text=No+Image'">
                <button class="favorite-badge" id="favoriteBtn">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="thumbnail-gallery">
                ${fixedImages.map((img, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <img src="${img}" alt="${vehicle.name}" onerror="this.src='https://via.placeholder.com/120x100?text=No+Image'">
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Vehicle Info Card -->
        <div class="vehicle-info-card">
            <span class="vehicle-category">${vehicle.category}</span>
            <h1 class="vehicle-title">${vehicle.name}</h1>
            <p class="vehicle-subtitle">${vehicle.type} • ${vehicle.year}</p>

            <div class="price-section">
                <div class="price-label">Price</div>
                <div class="price-amount">${formatPrice(vehicle.price)}</div>
            </div>

            <div class="action-buttons">
                <button class="btn-primary" id="addToCartBtn">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="btn-secondary" id="buyNowBtn">
                    <i class="fas fa-bolt"></i>
                    Buy Now
                </button>
            </div>

            <div class="seller-info">
                <h4><i class="fas fa-store"></i> Seller Information</h4>
                <div class="seller-details">
                    <div class="seller-detail">
                        <i class="fas fa-user-check"></i>
                        <span>${vehicle.seller}</span>
                        <span class="verified-badge">
                            <i class="fas fa-check-circle"></i> Verified
                        </span>
                    </div>
                    <div class="seller-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${vehicle.location}</span>
                    </div>
                    <div class="seller-detail">
                        <i class="fas fa-phone"></i>
                        <span>Contact Seller</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Section -->
        <div class="details-section">
            <div class="details-tabs">
                <button class="tab-btn active" data-tab="description">Description</button>
                <button class="tab-btn" data-tab="specifications">Specifications</button>
                <button class="tab-btn" data-tab="features">Features</button>
            </div>

            <!-- Description Tab -->
            <div class="tab-content active" id="description">
                <div class="description-content">
                    <h3>About this vehicle</h3>
                    <p>${vehicle.description}</p>
                </div>
            </div>

            <!-- Specifications Tab -->
            <div class="tab-content" id="specifications">
                <div class="specifications-grid">
                    <div class="spec-card">
                        <h4><i class="fas fa-info-circle"></i> Basic Information</h4>
                        <div class="spec-item">
                            <span class="spec-label">Year</span>
                            <span class="spec-value">${vehicle.year}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Type</span>
                            <span class="spec-value">${vehicle.type}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Category</span>
                            <span class="spec-value">${vehicle.category}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Color</span>
                            <span class="spec-value">${vehicle.color}</span>
                        </div>
                    </div>

                    <div class="spec-card">
                        <h4><i class="fas fa-cogs"></i> Performance</h4>
                        <div class="spec-item">
                            <span class="spec-label">Mileage</span>
                            <span class="spec-value">${vehicle.mileage}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Transmission</span>
                            <span class="spec-value">${vehicle.transmission}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Fuel Type</span>
                            <span class="spec-value">${vehicle.fuelType}</span>
                        </div>
                    </div>

                    <div class="spec-card">
                        <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
                        <div class="spec-item">
                            <span class="spec-label">Location</span>
                            <span class="spec-value">${vehicle.location}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Status</span>
                            <span class="spec-value" style="color: var(--success-color);">Available</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Tab -->
            <div class="tab-content" id="features">
                <div class="features-grid">
                    ${vehicle.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Thumbnail gallery
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateMainImage(index);
        });
    });

    // Main image click - open modal
    document.getElementById('mainImageContainer').addEventListener('click', function(e) {
        if (e.target.classList.contains('main-image')) {
            openImageModal();
        }
    });

    // Favorite button
    const favoriteBtn = document.getElementById('favoriteBtn');
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
    });

    // Add to cart button
    document.getElementById('addToCartBtn').addEventListener('click', function() {
        cart.addItem(currentVehicle.id);
    });

    // Buy now button
    document.getElementById('buyNowBtn').addEventListener('click', function() {
        cart.clearCart();
        cart.addItem(currentVehicle.id);
        window.location.href = 'cart.html';
    });

    // Image modal controls
    setupModalControls();
}

function updateMainImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    mainImage.src = fixImagePath(currentVehicle.images[index]);
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function openImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modal.classList.add('active');
    modalImage.src = fixImagePath(currentVehicle.images[currentImageIndex]);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function setupModalControls() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');

    closeBtn.addEventListener('click', closeImageModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + currentVehicle.images.length) % currentVehicle.images.length;
        document.getElementById('modalImage').src = currentVehicle.images[currentImageIndex];
        updateMainImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % currentVehicle.images.length;
        document.getElementById('modalImage').src = currentVehicle.images[currentImageIndex];
        updateMainImage(currentImageIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeImageModal();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
}

function showVehicleNotFound() {
    const container = document.getElementById('vehicleDetail');
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; grid-column: 1 / -1;">
            <i class="fas fa-car" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h2>Vehicle Not Found</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">The vehicle you're looking for doesn't exist or has been removed.</p>
            <a href="vehicles.html" class="btn-primary">Browse All Vehicles</a>
        </div>
    `;
}
