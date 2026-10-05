// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const saved = localStorage.getItem('velomart_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('velomart_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(vehicleId) {
        const vehicle = getVehicleById(vehicleId);
        if (!vehicle) return false;

        const existingItem = this.items.find(item => item.id === vehicleId);
        if (existingItem) {
            existingItem.quantity += 1;
            showSuccess(`Increased ${vehicle.name} quantity to ${existingItem.quantity}`);
        } else {
            this.items.push({
                id: vehicleId,
                quantity: 1,
                vehicle: vehicle
            });
            showSuccess(`${vehicle.name} added to cart!`);
        }
        
        this.saveCart();
        return true;
    }

    removeItem(vehicleId) {
        this.items = this.items.filter(item => item.id !== vehicleId);
        this.saveCart();
    }

    updateQuantity(vehicleId, quantity) {
        const item = this.items.find(item => item.id === vehicleId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(vehicleId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.vehicle.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'block' : 'none';
        });
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Cart button click handler
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            // Check if we're already in a pages subdirectory
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                window.location.href = 'cart.html';
            } else {
                window.location.href = 'pages/cart.html';
            }
        });
    }
});
