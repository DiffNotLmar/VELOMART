// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('velomart_orders') || '[]');
    
    // Calculate stats
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;
    const uniqueCustomers = new Set(orders.map(o => o.customer.email)).size;

    // Update stats cards
    document.getElementById('totalSales').textContent = formatPrice(totalSales);
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('activeVehicles').textContent = activeVehicles;
    document.getElementById('totalCustomers').textContent = uniqueCustomers;

    // Load orders by status
    loadOrdersByStatus(orders);

    // Load recent orders
    loadRecentOrders(orders);

    // Load top vehicles
    loadTopVehicles();
}

function loadOrdersByStatus(orders) {
    const statusCounts = {
        pending: 0,
        processing: 0,
        completed: 0,
        cancelled: 0
    };

    orders.forEach(order => {
        const status = order.status || 'pending';
        if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status]++;
        }
    });

    const container = document.getElementById('ordersByStatus');
    container.innerHTML = `
        <div class="status-item">
            <div class="status-label">
                <span class="status-dot pending"></span>
                <span>Pending</span>
            </div>
            <span class="status-value">${statusCounts.pending}</span>
        </div>
        <div class="status-item">
            <div class="status-label">
                <span class="status-dot processing"></span>
                <span>Processing</span>
            </div>
            <span class="status-value">${statusCounts.processing}</span>
        </div>
        <div class="status-item">
            <div class="status-label">
                <span class="status-dot completed"></span>
                <span>Completed</span>
            </div>
            <span class="status-value">${statusCounts.completed}</span>
        </div>
        <div class="status-item">
            <div class="status-label">
                <span class="status-dot cancelled"></span>
                <span>Cancelled</span>
            </div>
            <span class="status-value">${statusCounts.cancelled}</span>
        </div>
    `;
}

function loadRecentOrders(orders) {
    const tbody = document.getElementById('recentOrdersTable');
    
    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No orders yet
                </td>
            </tr>
        `;
        return;
    }

    // Show last 5 orders
    const recentOrders = orders.slice(-5).reverse();
    
    tbody.innerHTML = recentOrders.map(order => {
        const firstItem = order.items[0];
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });

        return `
            <tr>
                <td><strong>${order.orderId.substring(0, 12)}...</strong></td>
                <td>${order.customer.fullName}</td>
                <td>${firstItem.vehicleName}${order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}</td>
                <td><strong>${formatPrice(order.total)}</strong></td>
                <td><span class="status-badge ${order.status || 'pending'}">${(order.status || 'pending').toUpperCase()}</span></td>
                <td>${formattedDate}</td>
            </tr>
        `;
    }).join('');
}

function loadTopVehicles() {
    const container = document.getElementById('topVehicles');
    
    // Show first 4 vehicles
    const topVehicles = vehicles.filter(v => v.status === 'active').slice(0, 4);
    
    container.innerHTML = topVehicles.map(vehicle => `
        <div class="admin-vehicle-card">
            <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='https://via.placeholder.com/250x150?text=No+Image'">
            <div class="admin-vehicle-info">
                <div class="admin-vehicle-name">${vehicle.name}</div>
                <div class="admin-vehicle-price">${formatPrice(vehicle.price)}</div>
            </div>
        </div>
    `).join('');
}
