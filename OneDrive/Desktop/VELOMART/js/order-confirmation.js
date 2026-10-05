// Order Confirmation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    if (orderId) {
        loadOrderConfirmation(orderId);
    } else {
        showNoOrder();
    }
});

function loadOrderConfirmation(orderId) {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('velomart_orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        showNoOrder();
        return;
    }

    const container = document.getElementById('confirmationContent');
    
    const paymentMethodNames = {
        'gcash': 'GCash',
        'bank': 'Bank Transfer',
        'card': 'Credit/Debit Card',
        'cod': 'Cash on Delivery'
    };

    const paymentMethodIcons = {
        'gcash': 'fa-mobile-alt',
        'bank': 'fa-university',
        'card': 'fa-credit-card',
        'cod': 'fa-money-bill-wave'
    };

    container.innerHTML = `
        <!-- Success Header -->
        <div class="success-header">
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h1>Your Order Has Been Confirmed!</h1>
            <p>Thank you for shopping with VeloMart. Your order is successfully placed.</p>
            <div class="order-number">Order #${order.orderId}</div>
        </div>

        <!-- Order Details -->
        <div class="order-details-card">
            <h3>Order Details</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Order Date</span>
                    <span class="detail-value">${formatDate(order.orderDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Order Status</span>
                    <span class="detail-value" style="color: var(--warning-color);">Pending</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Customer Name</span>
                    <span class="detail-value">${order.customer.fullName}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${order.customer.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${order.customer.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Payment Method</span>
                    <span class="detail-value">
                        <span class="payment-method-badge">
                            <i class="fas ${paymentMethodIcons[order.paymentMethod]}"></i>
                            ${paymentMethodNames[order.paymentMethod]}
                        </span>
                    </span>
                </div>
            </div>

            <div class="detail-item">
                <span class="detail-label">Delivery Address</span>
                <span class="detail-value">${order.address.street}, ${order.address.city}, ${order.address.region} ${order.address.zipCode}</span>
            </div>

            <!-- Order Items -->
            <div class="order-items-section">
                <h4>Items Ordered</h4>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="confirmation-order-item">
                            <div class="confirmation-order-item-image">
                                <img src="${getVehicleById(item.vehicleId)?.image || 'https://via.placeholder.com/100x70?text=No+Image'}" 
                                     alt="${item.vehicleName}"
                                     onerror="this.src='https://via.placeholder.com/100x70?text=No+Image'">
                            </div>
                            <div class="confirmation-order-item-details">
                                <div class="confirmation-order-item-name">${item.vehicleName}</div>
                                <div class="confirmation-order-item-quantity">Quantity: ${item.quantity}</div>
                            </div>
                            <div class="confirmation-order-item-price">${formatPrice(item.price * item.quantity)}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Order Summary -->
                <div class="order-summary-totals">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span class="summary-value">${formatPrice(order.subtotal)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span class="summary-value">${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax (12%)</span>
                        <span class="summary-value">${formatPrice(order.tax)}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span class="summary-value">${formatPrice(order.total)}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Next Steps -->
        <div class="next-steps-card">
            <h3>What Happens Next?</h3>
            <div class="steps-list">
                <div class="step-item">
                    <div class="step-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="step-content">
                        <h4>Order Confirmation Email</h4>
                        <p>We'll send you an email with your order details at ${order.customer.email}</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-icon">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="step-content">
                        <h4>Order Processing</h4>
                        <p>Our team will verify your order and prepare your vehicle(s) for delivery</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="step-content">
                        <h4>Delivery</h4>
                        <p>We'll contact you to arrange delivery to your specified address</p>
                    </div>
                </div>
                ${order.paymentMethod !== 'cod' ? `
                <div class="step-item">
                    <div class="step-icon">
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <div class="step-content">
                        <h4>Payment Confirmation</h4>
                        <p>Complete your payment via ${paymentMethodNames[order.paymentMethod]} using the details we'll send you</p>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
            <a href="../index.html" class="btn-primary">
                <i class="fas fa-home"></i>
                Back to Home
            </a>
            <a href="vehicles.html" class="btn-secondary">
                <i class="fas fa-car"></i>
                Continue Shopping
            </a>
        </div>

        <!-- Support Banner -->
        <div class="support-banner">
            <i class="fas fa-headset"></i>
            <h4>Need Help?</h4>
            <p>Our customer support team is here to help you with any questions.</p>
            <a href="contact.html">Contact Support</a>
        </div>
    `;

    // Send confirmation email (simulation)
    console.log('Order confirmed:', order);
}

function showNoOrder() {
    const container = document.getElementById('confirmationContent');
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
            <div style="font-size: 5rem; color: var(--text-secondary); margin-bottom: 1rem; opacity: 0.5;">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h2>Order Not Found</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                We couldn't find the order you're looking for.
            </p>
            <a href="vehicles.html" class="btn-primary">
                <i class="fas fa-car"></i>
                Browse Vehicles
            </a>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
