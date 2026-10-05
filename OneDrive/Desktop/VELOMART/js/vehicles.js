// Vehicles Page JavaScript

let currentPage = 1;
const vehiclesPerPage = 9;
let filteredVehicles = [...vehicles];
let currentFilters = {
    categories: ['all'],
    make: '',
    minPrice: 0,
    maxPrice: Infinity,
    year: '',
    transmission: [],
    fuel: [],
    search: ''
};

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    loadUrlParameters();
    applyFiltersAndSort();
    setupEventListeners();
});

function initializeFilters() {
    // Populate make filter
    const makes = [...new Set(vehicles.map(v => v.name.split(' ')[0]))];
    const makeFilter = document.getElementById('makeFilter');
    makes.forEach(make => {
        const option = document.createElement('option');
        option.value = make;
        option.textContent = make;
        makeFilter.appendChild(option);
    });
}

function loadUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Category from URL
    const category = urlParams.get('category');
    if (category) {
        currentFilters.categories = [category];
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = cb.value === category || cb.value === 'all';
        });
    }
    
    // Search term from URL
    const search = urlParams.get('search');
    if (search) {
        currentFilters.search = search;
    }
}

function setupEventListeners() {
    // Category checkboxes
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryChange);
    });

    // Make filter
    document.getElementById('makeFilter').addEventListener('change', function(e) {
        currentFilters.make = e.target.value;
    });

    // Price inputs
    document.getElementById('minPrice').addEventListener('input', function(e) {
        currentFilters.minPrice = parseInt(e.target.value) || 0;
    });

    document.getElementById('maxPrice').addEventListener('input', function(e) {
        currentFilters.maxPrice = parseInt(e.target.value) || Infinity;
    });

    // Year filter
    document.getElementById('yearFilter').addEventListener('change', function(e) {
        currentFilters.year = e.target.value;
    });

    // Transmission checkboxes
    document.querySelectorAll('input[name="transmission"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCheckboxFilter('transmission');
            applyFiltersAndSort();
        });
    });

    // Fuel type checkboxes
    document.querySelectorAll('input[name="fuel"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCheckboxFilter('fuel');
            applyFiltersAndSort();
        });
    });

    // Apply filters button
    document.getElementById('applyFilters').addEventListener('click', function() {
        applyFiltersAndSort();
    });

    // Reset filters button
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Sort dropdown
    document.getElementById('sortBy').addEventListener('change', function() {
        applyFiltersAndSort();
    });

    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
}

function handleCategoryChange(e) {
    const allCheckbox = document.querySelector('input[name="category"][value="all"]');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:not([value="all"])');

    if (e.target.value === 'all') {
        if (e.target.checked) {
            categoryCheckboxes.forEach(cb => cb.checked = false);
            currentFilters.categories = ['all'];
        }
    } else {
        if (e.target.checked) {
            allCheckbox.checked = false;
        }
        updateCheckboxFilter('category');
    }

    // If no categories selected, check "all"
    const anyChecked = Array.from(categoryCheckboxes).some(cb => cb.checked);
    if (!anyChecked) {
        allCheckbox.checked = true;
        currentFilters.categories = ['all'];
    }

    // Apply filters immediately when category changes
    applyFiltersAndSort();
}

function updateCheckboxFilter(filterName) {
    const checkboxes = document.querySelectorAll(`input[name="${filterName}"]:checked`);
    const values = Array.from(checkboxes).map(cb => cb.value);
    
    if (filterName === 'category') {
        currentFilters.categories = values.length > 0 ? values : ['all'];
    } else {
        currentFilters[filterName] = values;
    }
}

function resetFilters() {
    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'all';
    });

    // Reset selects
    document.getElementById('makeFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('sortBy').value = 'newest';

    // Reset price inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';

    // Reset filters object
    currentFilters = {
        categories: ['all'],
        make: '',
        minPrice: 0,
        maxPrice: Infinity,
        year: '',
        transmission: [],
        fuel: [],
        search: ''
    };

    applyFiltersAndSort();
}

function applyFiltersAndSort() {
    // Filter vehicles
    filteredVehicles = vehicles.filter(vehicle => {
        // Category filter
        const categoryMatch = currentFilters.categories.includes('all') || 
                            currentFilters.categories.includes(vehicle.category);

        // Make filter
        const makeMatch = !currentFilters.make || 
                         vehicle.name.toLowerCase().startsWith(currentFilters.make.toLowerCase());

        // Price filter
        const priceMatch = vehicle.price >= currentFilters.minPrice && 
                          vehicle.price <= currentFilters.maxPrice;

        // Year filter
        const yearMatch = !currentFilters.year || 
                         vehicle.year.toString() === currentFilters.year;

        // Transmission filter
        const transmissionMatch = currentFilters.transmission.length === 0 ||
                                 currentFilters.transmission.includes(vehicle.transmission.toLowerCase());

        // Fuel filter
        const fuelMatch = currentFilters.fuel.length === 0 ||
                         currentFilters.fuel.includes(vehicle.fuelType.toLowerCase());

        // Search filter
        const searchMatch = !currentFilters.search ||
                          vehicle.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
                          vehicle.description.toLowerCase().includes(currentFilters.search.toLowerCase());

        return categoryMatch && makeMatch && priceMatch && yearMatch && 
               transmissionMatch && fuelMatch && searchMatch && vehicle.status === 'active';
    });

    // Sort vehicles
    const sortBy = document.getElementById('sortBy').value;
    filteredVehicles.sort((a, b) => {
        switch(sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'year-new':
                return b.year - a.year;
            case 'year-old':
                return a.year - b.year;
            case 'mileage':
                return parseInt(a.mileage) - parseInt(b.mileage);
            case 'newest':
            default:
                return b.id - a.id;
        }
    });

    // Reset to first page
    currentPage = 1;

    // Display vehicles
    displayVehicles();
    updatePagination();
}

function displayVehicles() {
    const grid = document.getElementById('vehiclesGrid');
    const start = (currentPage - 1) * vehiclesPerPage;
    const end = start + vehiclesPerPage;
    const pageVehicles = filteredVehicles.slice(start, end);

    // Update results count
    document.getElementById('currentCount').textContent = filteredVehicles.length;

    if (pageVehicles.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No vehicles found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = pageVehicles.map(vehicle => createVehicleCard(vehicle)).join('');

    // Add event listeners
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const vehicleId = parseInt(this.dataset.vehicleId);
            cart.addItem(vehicleId);
        });
    });

    grid.querySelectorAll('.favorite-btn').forEach(btn => {
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
                    <a href="vehicle-detail.html?id=${vehicle.id}" class="btn-secondary" style="text-align: center; text-decoration: none; padding: 10px; font-size: 0.9rem;">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

function updatePagination() {
    const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
    const pageNumbersDiv = document.getElementById('pageNumbers');
    
    // Update prev/next buttons
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;

    // Generate page numbers
    pageNumbersDiv.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => goToPage(i));
            pageNumbersDiv.appendChild(pageBtn);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 8px';
            ellipsis.style.color = 'var(--text-secondary)';
            pageNumbersDiv.appendChild(ellipsis);
        }
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        goToPage(newPage);
    }
}

function goToPage(page) {
    currentPage = page;
    displayVehicles();
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
