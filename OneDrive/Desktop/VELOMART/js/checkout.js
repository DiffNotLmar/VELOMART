// Checkout Page JavaScript

// Helper function to fix image paths for subdirectory pages
function fixImagePath(imagePath) {
    if (imagePath.startsWith('images/') && window.location.pathname.includes('/pages/')) {
        return '../' + imagePath;
    }
    return imagePath;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('velomart_current_user') || 'null');
    if (!currentUser) {
        showWarning('Please login to continue with checkout.');
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 2000);
        return;
    }
    
    // Check if cart is empty
    if (cart.items.length === 0) {
        showInfo('Your cart is empty. Add some vehicles to checkout!');
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 2000);
        return;
    }

    loadOrderSummary();
    setupCheckoutForm();
});

function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    const summaryTotalsContainer = document.getElementById('summaryTotals');

    // Render order items
    orderItemsContainer.innerHTML = cart.items.map(item => {
        const vehicle = item.vehicle;
        const itemTotal = vehicle.price * item.quantity;
        const imagePath = fixImagePath(vehicle.image);

        return `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${imagePath}" alt="${vehicle.name}" onerror="this.src='https://via.placeholder.com/80x60?text=No+Image'">
                </div>
                <div class="order-item-details">
                    <div class="order-item-name">${vehicle.name}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="order-item-price">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');

    // Calculate totals
    const subtotal = cart.getTotal();
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.12; // 12% tax
    const total = subtotal + shipping + tax;

    // Render summary totals
    summaryTotalsContainer.innerHTML = `
        <div class="summary-row">
            <span>Subtotal</span>
            <span class="summary-value">${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span class="summary-value">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (12%)</span>
            <span class="summary-value">${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span class="summary-value">${formatPrice(total)}</span>
        </div>
    `;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const orderData = {
            customer: {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            address: {
                street: formData.get('address'),
                city: formData.get('city'),
                region: formData.get('region'),
                zipCode: formData.get('zipCode')
            },
            paymentMethod: formData.get('paymentMethod'),
            notes: formData.get('notes'),
            items: cart.items.map(item => ({
                vehicleId: item.vehicle.id,
                vehicleName: item.vehicle.name,
                quantity: item.quantity,
                price: item.vehicle.price
            })),
            subtotal: cart.getTotal(),
            tax: cart.getTotal() * 0.12,
            shipping: 0,
            total: cart.getTotal() + (cart.getTotal() * 0.12),
            orderDate: new Date().toISOString(),
            status: 'pending'
        };

        // Generate order ID
        const orderId = generateOrderId();
        orderData.orderId = orderId;

        // Save order to localStorage
        saveOrder(orderData);

        // Save customer info if checkbox is checked
        if (formData.get('saveInfo')) {
            saveCustomerInfo(orderData.customer, orderData.address);
        }

        // Clear cart
        cart.clearCart();

        // Redirect to confirmation page
        window.location.href = `order-confirmation.html?orderId=${orderId}`;
    });

    // Load saved customer info if available
    loadSavedCustomerInfo();
}

function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD${timestamp}${random}`;
}

function saveOrder(orderData) {
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('velomart_orders') || '[]');
    
    // Add new order
    orders.push(orderData);
    
    // Save back to localStorage
    localStorage.setItem('velomart_orders', JSON.stringify(orders));
}

function saveCustomerInfo(customer, address) {
    const customerInfo = {
        ...customer,
        ...address
    };
    localStorage.setItem('velomart_customer_info', JSON.stringify(customerInfo));
}

function loadSavedCustomerInfo() {
    // First try to load from current logged-in user
    const currentUser = JSON.parse(localStorage.getItem('velomart_current_user') || 'null');
    if (currentUser) {
        document.getElementById('fullName').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('phone').value = currentUser.phone || '';
    }
    
    // Then try to load saved shipping info (if previously saved)
    const savedInfo = localStorage.getItem('velomart_customer_info');
    if (savedInfo) {
        try {
            const info = JSON.parse(savedInfo);
            
            // Fill form fields (only if not already filled from user)
            if (!document.getElementById('fullName').value) {
                document.getElementById('fullName').value = info.fullName || '';
            }
            if (!document.getElementById('email').value) {
                document.getElementById('email').value = info.email || '';
            }
            if (!document.getElementById('phone').value) {
                document.getElementById('phone').value = info.phone || '';
            }
            document.getElementById('address').value = info.street || '';
            document.getElementById('city').value = info.city || '';
            document.getElementById('region').value = info.region || '';
            document.getElementById('zipCode').value = info.zipCode || '';
        } catch (e) {
            console.error('Error loading saved customer info:', e);
        }
    }
}

// Form validation helpers
document.getElementById('phone').addEventListener('input', function(e) {
    // Format phone number
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    e.target.value = value;
});

document.getElementById('zipCode').addEventListener('input', function(e) {
    // Only allow numbers
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.slice(0, 4);
    }
    e.target.value = value;
});

// Payment method selection visual feedback
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Optional: Add any additional logic when payment method changes
        console.log('Payment method selected:', this.value);
    });
});
