// Admin Orders Management JavaScript

let orders = [];

document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    setupEventListeners();
});

function loadOrders() {
    orders = JSON.parse(localStorage.getItem('velomart_orders') || '[]');
    loadOrdersTable();
}

function setupEventListeners() {
    // Close modal buttons
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('closeOrderBtn').addEventListener('click', closeModal);

    // Search and filters
    document.getElementById('searchOrders').addEventListener('input', loadOrdersTable);
    document.getElementById('filterStatus').addEventListener('change', loadOrdersTable);
    document.getElementById('filterPayment').addEventListener('change', loadOrdersTable);

    // Close modal on outside click
    document.getElementById('orderModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function loadOrdersTable() {
    const searchTerm = document.getElementById('searchOrders').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const paymentFilter = document.getElementById('filterPayment').value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderId.toLowerCase().includes(searchTerm) ||
                            order.customer.fullName.toLowerCase().includes(searchTerm) ||
                            order.customer.email.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || order.status === statusFilter;
        const matchesPayment = !paymentFilter || order.paymentMethod === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const tbody = document.getElementById('ordersTableBody');

    if (filteredOrders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No orders found
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredOrders.map(order => {
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const paymentMethodNames = {
            'gcash': 'GCash',
            'bank': 'Bank Transfer',
            'card': 'Card',
            'cod': 'COD'
        };

        return `
            <tr>
                <td><strong>${order.orderId.substring(0, 15)}...</strong></td>
                <td>
                    <div>${order.customer.fullName}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">${order.customer.email}</div>
                </td>
                <td>${order.items.length} item(s)</td>
                <td><strong>${formatPrice(order.total)}</strong></td>
                <td>${paymentMethodNames[order.paymentMethod]}</td>
                <td>
                    <select class="status-select" onchange="updateOrderStatus('${order.orderId}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>${formattedDate}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn" onclick="viewOrder('${order.orderId}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteOrder('${order.orderId}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('velomart_orders', JSON.stringify(orders));
        showNotification('Order status updated successfully', 'success');
    }
}

function viewOrder(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const paymentMethodNames = {
        'gcash': 'GCash',
        'bank': 'Bank Transfer',
        'card': 'Credit/Debit Card',
        'cod': 'Cash on Delivery'
    };

    const orderDate = new Date(order.orderDate);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const content = document.getElementById('orderDetailsContent');
    content.innerHTML = `
        <div class="order-detail-section">
            <h4>Order Information</h4>
            <div class="detail-grid-modal">
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Order ID</span>
                    <span class="detail-value-modal">${order.orderId}</span>
                </div>
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Order Date</span>
                    <span class="detail-value-modal">${formattedDate}</span>
                </div>
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Status</span>
                    <span class="detail-value-modal">
                        <span class="status-badge ${order.status}">${(order.status || 'pending').toUpperCase()}</span>
                    </span>
                </div>
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Payment Method</span>
                    <span class="detail-value-modal">${paymentMethodNames[order.paymentMethod]}</span>
                </div>
            </div>
        </div>

        <div class="order-detail-section">
            <h4>Customer Information</h4>
            <div class="detail-grid-modal">
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Name</span>
                    <span class="detail-value-modal">${order.customer.fullName}</span>
                </div>
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Email</span>
                    <span class="detail-value-modal">${order.customer.email}</span>
                </div>
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Phone</span>
                    <span class="detail-value-modal">${order.customer.phone}</span>
                </div>
                <div class="detail-item-modal">
                    <span class="detail-label-modal">Address</span>
                    <span class="detail-value-modal">${order.address.street}, ${order.address.city}, ${order.address.region} ${order.address.zipCode}</span>
                </div>
            </div>
        </div>

        <div class="order-detail-section">
            <h4>Order Items</h4>
            <div class="order-items-list-modal">
                ${order.items.map(item => {
                    const vehicle = getVehicleById(item.vehicleId);
                    return `
                        <div class="order-item-modal">
                            <img src="${vehicle?.image || 'https://via.placeholder.com/60x45?text=No+Image'}" 
                                 alt="${item.vehicleName}" 
                                 class="order-item-image-modal"
                                 onerror="this.src='https://via.placeholder.com/60x45?text=No+Image'">
                            <div class="order-item-details-modal">
                                <div class="order-item-name-modal">${item.vehicleName}</div>
                                <div class="order-item-quantity-modal">Quantity: ${item.quantity}</div>
                            </div>
                            <div class="order-item-price-modal">${formatPrice(item.price * item.quantity)}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <div class="order-detail-section">
            <h4>Order Summary</h4>
            <div style="background: rgba(139, 92, 246, 0.05); padding: 1rem; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: var(--text-secondary);">
                    <span>Subtotal</span>
                    <span>${formatPrice(order.subtotal)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: var(--text-secondary);">
                    <span>Shipping</span>
                    <span>${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-secondary);">
                    <span>Tax (12%)</span>
                    <span>${formatPrice(order.tax)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 700; padding-top: 1rem; border-top: 2px solid var(--border-color);">
                    <span>Total</span>
                    <span style="color: var(--primary-color);">${formatPrice(order.total)}</span>
                </div>
            </div>
        </div>

        ${order.notes ? `
            <div class="order-detail-section">
                <h4>Order Notes</h4>
                <p style="color: var(--text-secondary); line-height: 1.6;">${order.notes}</p>
            </div>
        ` : ''}
    `;

    document.getElementById('orderModal').classList.add('active');
}

function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        localStorage.setItem('velomart_orders', JSON.stringify(orders));
        loadOrdersTable();
        showNotification('Order deleted successfully', 'success');
    }
}

function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
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

// Add CSS for status select
const style = document.createElement('style');
style.textContent = `
    .status-select {
        background: var(--bg-dark);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        outline: none;
    }
    .status-select:focus {
        border-color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Make functions global
window.updateOrderStatus = updateOrderStatus;
window.viewOrder = viewOrder;
window.deleteOrder = deleteOrder;
