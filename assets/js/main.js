// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        header.style.animation = 'slideDown 0.5s';
    } else {
        header.style.position = 'relative';
        header.style.animation = 'none';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Mobile Menu Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.style.animation = 'slideUp 0.3s forwards';
            setTimeout(() => {
                navbarCollapse.classList.remove('show');
            }, 300);
        } else {
            navbarCollapse.classList.add('show');
            navbarCollapse.style.animation = 'slideDown 0.3s forwards';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarCollapse.style.animation = 'slideUp 0.3s forwards';
            setTimeout(() => {
                navbarCollapse.classList.remove('show');
            }, 300);
        }
    }
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form Validation for Contact Form
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            form.reset();
        }
    });
});

// Course Category Hover Effect
const courseCategories = document.querySelectorAll('.course-category');
courseCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });

    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// AI Assistant Functionality
const aiAssistantIcon = document.getElementById('aiAssistantIcon');
const aiAssistantChat = document.getElementById('aiAssistantChat');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const userMessage = document.getElementById('userMessage');
const sendMessage = document.getElementById('sendMessage');

// Toggle chat window
aiAssistantIcon.addEventListener('click', () => {
    aiAssistantChat.classList.add('active');
});

closeChat.addEventListener('click', () => {
    aiAssistantChat.classList.remove('active');
});

// Send message
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessage.addEventListener('click', () => {
    const message = userMessage.value.trim();
    if (message) {
        addMessage(message, true);
        userMessage.value = '';
        
        // Simulate bot response (replace with actual AI integration)
        setTimeout(() => {
            const responses = [
                "I'll help you with that! Please provide more details.",
                "Thank you for your question. Let me find the information for you.",
                "I understand what you're looking for. Here's what you need to know...",
                "That's a great question! Here's how we can help..."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse);
        }, 1000);
    }
});

userMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage.click();
    }
});

// Counter Animation for Glance Section
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed here
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + (element.getAttribute('data-suffix') || '');
    }, 20);
}

// Animate counters when they come into view
const counters = document.querySelectorAll('.counter');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// Smooth scrolling for course links
document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close the dropdown menu
            const dropdownMenu = this.closest('.dropdown-menu');
            if (dropdownMenu) {
                const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
                if (dropdownToggle) {
                    bootstrap.Dropdown.getInstance(dropdownToggle).hide();
                }
            }
        }
    });
}); 