// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };

        // Save to localStorage (simulate sending)
        let messages = JSON.parse(localStorage.getItem('velomart_messages') || '[]');
        messages.push(data);
        localStorage.setItem('velomart_messages', JSON.stringify(messages));

        // Show success message
        showSuccessMessage();

        // Reset form
        contactForm.reset();
    });
});

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-card);
        border: 2px solid var(--success-color);
        padding: 2rem;
        border-radius: 12px;
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;

    successDiv.innerHTML = `
        <div style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="margin-bottom: 0.5rem;">Message Sent!</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            Thank you for contacting us. We'll get back to you soon.
        </p>
        <button onclick="this.parentElement.remove()" class="btn-primary" style="width: 100%;">
            Close
        </button>
    `;

    document.body.appendChild(successDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}
