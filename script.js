// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = '#ffffff';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and handling
document.getElementById('quoteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        emailId: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        movingFrom: document.getElementById('from').value.trim(),
        movingTo: document.getElementById('to').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    console.log('Form Data:', formData);

    // Validate form data
    // if (!validateForm(formData)) {
    //     return;
    // }

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Replace with your actual API URL
    const apiUrl = 'https://013e-106-219-140-88.ngrok-free.app/api/people/fill-quotation';

    // Make POST API call
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(formData)
    })
        .then((response) => {
            if (response.status === 200) {
                // Show success message
                showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
                this.reset(); // Reset the form
            } else {
                // Show error notification
                showNotification('Something went wrong. Please try again.', 'error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show error notification
            showNotification('Failed to send your inquiry. Please try again later.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});


// Form validation function
function validateForm(formData) {
    // Name validation
    if (formData.name.length < 2) {
        showNotification('Please enter a valid name', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Location validation
    if (formData.from.length < 3 || formData.to.length < 3) {
        showNotification('Please enter valid locations', 'error');
        return false;
    }
    
    // Message validation
    if (formData.message.length < 10) {
        showNotification('Please provide more details about your move', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '5px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.style.opacity = '1', 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    // Select all the FAQ items
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.toggle-icon');

        // Add click event listener to the question
        question.addEventListener('click', () => {
            // Check if this item is already open
            const isOpen = item.classList.contains('open');

            // Close all open items
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.toggle-icon').textContent = '+';
            });

            // Toggle the clicked item
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggleIcon.textContent = '-';
            }
        });
    });

});



// Services hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Phone number formatter
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove all non-numeric characters
    let phoneNumber = e.target.value.replace(/\D/g, '');
    
    // Format the number
    if (phoneNumber.length > 0) {
        if (phoneNumber.length <= 3) {
            phoneNumber = phoneNumber;
        } else if (phoneNumber.length <= 6) {
            phoneNumber = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);
        } else {
            phoneNumber = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6, 10);
        }
    }
    
    // Update the input value
    e.target.value = phoneNumber;
});

// Add scroll-to-top button functionality
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';
Object.assign(scrollButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#7b1fa2',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'none',
    zIndex: '999',
    fontSize: '20px'
});

document.body.appendChild(scrollButton);

// Show/hide scroll button
window.addEventListener('scroll', () => {
    scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Scroll to top when clicked
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation for images
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '1';
    });
});