// Global Notification System for VeloMart

// Create notification container on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
});

// Main notification function
function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notificationContainer') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Get icon based on type
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icon}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            closeNotification(notification);
        }, duration);
    }
    
    return notification;
}

// Notification type shortcuts
function showSuccess(message, duration = 4000) {
    return showNotification(message, 'success', duration);
}

function showError(message, duration = 5000) {
    return showNotification(message, 'error', duration);
}

function showWarning(message, duration = 4500) {
    return showNotification(message, 'warning', duration);
}

function showInfo(message, duration = 4000) {
    return showNotification(message, 'info', duration);
}

// Confirmation dialog with callbacks
function showConfirm(message, onConfirm, onCancel = null) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
        <div class="confirm-icon">
            <i class="fas fa-question-circle"></i>
        </div>
        <div class="confirm-message">${message}</div>
        <div class="confirm-actions">
            <button class="confirm-btn confirm-cancel">Cancel</button>
            <button class="confirm-btn confirm-ok">OK</button>
        </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Handle buttons
    const cancelBtn = dialog.querySelector('.confirm-cancel');
    const okBtn = dialog.querySelector('.confirm-ok');
    
    cancelBtn.addEventListener('click', () => {
        closeConfirm(overlay);
        if (onCancel) onCancel();
    });
    
    okBtn.addEventListener('click', () => {
        closeConfirm(overlay);
        if (onConfirm) onConfirm();
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeConfirm(overlay);
            if (onCancel) onCancel();
        }
    });
}

function closeConfirm(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
        overlay.remove();
    }, 300);
}

function closeNotification(element) {
    const notification = element.classList ? element : element.parentElement.parentElement;
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Loading notification (stays until manually closed)
function showLoading(message = 'Loading...') {
    return showNotification(`<i class="fas fa-spinner fa-spin"></i> ${message}`, 'info', 0);
}

// Make functions globally available
window.showNotification = showNotification;
window.showSuccess = showSuccess;
window.showError = showError;
window.showWarning = showWarning;
window.showInfo = showInfo;
window.showConfirm = showConfirm;
window.showLoading = showLoading;
window.closeNotification = closeNotification;
