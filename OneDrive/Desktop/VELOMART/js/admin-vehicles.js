// Admin Vehicles Management JavaScript

let editingVehicleId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadVehiclesTable();
    setupEventListeners();
});

function setupEventListeners() {
    // Add vehicle button
    document.getElementById('addVehicleBtn').addEventListener('click', function() {
        editingVehicleId = null;
        document.getElementById('modalTitle').textContent = 'Add New Vehicle';
        document.getElementById('vehicleForm').reset();
        document.getElementById('vehicleModal').classList.add('active');
    });

    // Close modal buttons
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);

    // Form submit
    document.getElementById('vehicleForm').addEventListener('submit', handleFormSubmit);

    // Search and filters
    document.getElementById('searchVehicles').addEventListener('input', loadVehiclesTable);
    document.getElementById('filterCategory').addEventListener('change', loadVehiclesTable);
    document.getElementById('filterStatus').addEventListener('change', loadVehiclesTable);

    // Close modal on outside click
    document.getElementById('vehicleModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function loadVehiclesTable() {
    const searchTerm = document.getElementById('searchVehicles').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value;
    const statusFilter = document.getElementById('filterStatus').value;

    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm) ||
                            vehicle.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || vehicle.category === categoryFilter;
        const matchesStatus = !statusFilter || vehicle.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const tbody = document.getElementById('vehiclesTableBody');

    if (filteredVehicles.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No vehicles found
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredVehicles.map(vehicle => `
        <tr>
            <td><img src="${vehicle.image}" alt="${vehicle.name}" class="table-image" onerror="this.src='https://via.placeholder.com/80x60?text=No+Image'"></td>
            <td>${vehicle.type}</td>
            <td><strong>${vehicle.name}</strong></td>
            <td><strong>${formatPrice(vehicle.price)}</strong></td>
            <td>${vehicle.year}</td>
            <td><span class="status-badge ${vehicle.category}">${vehicle.category}</span></td>
            <td><span class="status-badge ${vehicle.status}">${vehicle.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn" onclick="editVehicle(${vehicle.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteVehicle(${vehicle.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function editVehicle(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;

    editingVehicleId = id;
    document.getElementById('modalTitle').textContent = 'Edit Vehicle';

    const form = document.getElementById('vehicleForm');
    form.elements.name.value = vehicle.name;
    form.elements.type.value = vehicle.type;
    form.elements.category.value = vehicle.category;
    form.elements.price.value = vehicle.price;
    form.elements.year.value = vehicle.year;
    form.elements.mileage.value = vehicle.mileage;
    form.elements.transmission.value = vehicle.transmission;
    form.elements.fuelType.value = vehicle.fuelType;
    form.elements.color.value = vehicle.color;
    form.elements.status.value = vehicle.status;
    form.elements.description.value = vehicle.description;
    form.elements.image.value = vehicle.image;

    document.getElementById('vehicleModal').classList.add('active');
}

function deleteVehicle(id) {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    const index = vehicles.findIndex(v => v.id === id);
    if (index !== -1) {
        vehicles.splice(index, 1);
        loadVehiclesTable();
        showNotification('Vehicle deleted successfully', 'success');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const vehicleData = {
        name: formData.get('name'),
        type: formData.get('type'),
        category: formData.get('category'),
        price: parseInt(formData.get('price')),
        year: parseInt(formData.get('year')),
        mileage: formData.get('mileage'),
        transmission: formData.get('transmission'),
        fuelType: formData.get('fuelType'),
        color: formData.get('color'),
        status: formData.get('status'),
        description: formData.get('description'),
        image: formData.get('image'),
        images: [formData.get('image')],
        features: ['Air Conditioning', 'Power Steering', 'Power Windows'],
        seller: 'Verified Seller',
        location: 'Metro Manila'
    };

    if (editingVehicleId) {
        // Update existing vehicle
        const index = vehicles.findIndex(v => v.id === editingVehicleId);
        if (index !== -1) {
            vehicles[index] = { ...vehicles[index], ...vehicleData };
            showNotification('Vehicle updated successfully', 'success');
        }
    } else {
        // Add new vehicle
        const newId = Math.max(...vehicles.map(v => v.id)) + 1;
        vehicles.push({ id: newId, ...vehicleData });
        showNotification('Vehicle added successfully', 'success');
    }

    closeModal();
    loadVehiclesTable();
}

function closeModal() {
    document.getElementById('vehicleModal').classList.remove('active');
    document.getElementById('vehicleForm').reset();
    editingVehicleId = null;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, var(--success-color), #059669)' : 'linear-gradient(135deg, var(--danger-color), #dc2626)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Make functions global
window.editVehicle = editVehicle;
window.deleteVehicle = deleteVehicle;
