// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
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

$(document).ready(function() {
    // Initialize Owl Carousel
    $('.hero-slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        nav: true,
        dots: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: {
                nav: false
            },
            768: {
                nav: true
            }
        }
    });

    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('.nav-menu').slideToggle();
    });

    // Dropdown Menu on Hover
    $('.nav-menu .dropdown').hover(
        function() {
            $(this).find('.dropdown-menu').stop(true, true).fadeIn(200);
        },
        function() {
            $(this).find('.dropdown-menu').stop(true, true).fadeOut(200);
        }
    );

    // Search Toggle
    $('.search-toggle').click(function() {
        $('.search-box').toggleClass('active');
    });

    // Sticky Navigation
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.main-nav').addClass('sticky');
        } else {
            $('.main-nav').removeClass('sticky');
        }
    });
});

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add the toggle to the navigation section
    setTimeout(() => {
        const navContainer = document.querySelector('.main-nav .container');
        if (navContainer) {
            // Create the toggle button for mobile
            if (window.innerWidth < 992) {
                navContainer.prepend(menuToggle);
            }
            
            // Event listener for menu toggle
            menuToggle.addEventListener('click', function() {
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) {
                    navMenu.classList.toggle('active');
                    
                    if (navMenu.classList.contains('active')) {
                        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
            
            // Handle dropdown touch on mobile
            const dropdownItems = document.querySelectorAll('.dropdown > a');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (window.innerWidth < 992) {
                        e.preventDefault();
                        const parent = this.parentElement;
                        const dropdownMenu = parent.querySelector('.dropdown-menu');
                        
                        // Close other open dropdowns
                        const otherDropdowns = document.querySelectorAll('.dropdown');
                        otherDropdowns.forEach(dropdown => {
                            if (dropdown !== parent && dropdown.classList.contains('active')) {
                                dropdown.classList.remove('active');
                                const otherMenu = dropdown.querySelector('.dropdown-menu');
                                if (otherMenu) {
                                    otherMenu.style.display = 'none';
                                }
                            }
                        });
                        
                        // Toggle current dropdown
                        parent.classList.toggle('active');
                        if (parent.classList.contains('active')) {
                            dropdownMenu.style.display = 'block';
                        } else {
                            dropdownMenu.style.display = 'none';
                        }
                    }
                });
            });
        }
    }, 500); // Give time for header-loader.js to load the header
});

// Sticky Header Behavior
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    
    if (window.scrollY > 100) {
        if (nav) nav.classList.add('header-scroll-down');
    } else {
        if (nav) nav.classList.remove('header-scroll-down');
    }
});

// Initialize Owl Carousel if it exists
document.addEventListener('DOMContentLoaded', function() {
    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('.hero-slider').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            nav: true,
            dots: true,
            animateOut: 'fadeOut',
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
        });
    }
});

// Notice Details Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the notice-details page
    const noticeDetailsContainer = document.getElementById('notice-details-container');
    if (noticeDetailsContainer) {
        loadNoticeDetails();
    }
});

function loadNoticeDetails() {
    // Get notice ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const noticeId = urlParams.get('id');
    
    if (!noticeId) {
        showNoticeError("Notice ID is missing");
        return;
    }
    
    // In a real application, you would fetch the notice data from a server
    // For demo purposes, we'll use sample data
    const noticeData = getNoticeById(noticeId);
    
    if (!noticeData) {
        showNoticeError("Notice not found");
        return;
    }
    
    displayNoticeDetails(noticeData);
}

function getNoticeById(id) {
    // This is a mock function that would be replaced with an API call in a real application
    const notices = [
        {
            id: "1",
            title: "Exam Schedule for Final Semester",
            category: "important",
            date: "October 15, 2023",
            department: "Examination Department",
            summary: "The final semester examination schedule has been released. Please check the dates and prepare accordingly.",
            content: `
                <p class="lead">The Examination Department has released the schedule for the final semester examinations starting from November 10, 2023.</p>
                
                <h3>Important Dates</h3>
                <ul>
                    <li>Form Submission Deadline: October 25, 2023</li>
                    <li>Practical Examinations: November 1-5, 2023</li>
                    <li>Theory Examinations: November 10-25, 2023</li>
                    <li>Result Declaration: December 15, 2023</li>
                </ul>
                
                <h3>Examination Guidelines</h3>
                <p>All students are required to bring their ID cards to the examination hall. Mobile phones and other electronic devices are strictly prohibited inside the examination hall.</p>
                
                <div class="note-box">
                    <h4><i class="fas fa-exclamation-circle"></i> Important Note</h4>
                    <p>Students with outstanding fees will not be allowed to sit for the examinations. Please clear all dues before October 20, 2023.</p>
                </div>
                
                <h3>Related Documents</h3>
                <div class="related-files mt-4">
                    <a href="#" class="file-link mb-2">
                        <i class="fas fa-file-pdf"></i>
                        <span>Detailed Examination Schedule</span>
                    </a>
                    <a href="#" class="file-link">
                        <i class="fas fa-file-alt"></i>
                        <span>Examination Rules and Regulations</span>
                    </a>
                </div>
            `,
            author: "Dr. Sarah Johnson",
            relatedNotices: ["2", "3"]
        },
        {
            id: "2",
            title: "Scholarship Application Now Open",
            category: "announcement",
            date: "October 10, 2023",
            department: "Scholarship Department",
            summary: "Applications for the annual merit scholarships are now open. Eligible students can apply online through the student portal.",
            content: `
                <p class="lead">The Scholarship Department is pleased to announce that applications for the annual merit scholarships for the academic year 2023-24 are now open.</p>
                
                <h3>Eligibility Criteria</h3>
                <ul>
                    <li>Minimum CGPA of 3.5 in the previous academic year</li>
                    <li>No disciplinary actions against the student</li>
                    <li>Participation in at least one extracurricular activity</li>
                </ul>
                
                <h3>Application Process</h3>
                <p>Eligible students can apply online through the student portal. The application form must be filled and submitted along with the required documents before the deadline.</p>
                
                <h3>Important Dates</h3>
                <ul>
                    <li>Application Start Date: October 10, 2023</li>
                    <li>Application End Date: October 30, 2023</li>
                    <li>Interview of Shortlisted Candidates: November 5-10, 2023</li>
                    <li>Result Declaration: November 15, 2023</li>
                </ul>
                
                <div class="note-box">
                    <h4><i class="fas fa-exclamation-circle"></i> Important Note</h4>
                    <p>Late applications will not be accepted under any circumstances. Please ensure that all required documents are uploaded before submitting the application.</p>
                </div>
                
                <h3>Required Documents</h3>
                <ul>
                    <li>Academic transcripts of the previous year</li>
                    <li>Certificates of extracurricular activities</li>
                    <li>Recommendation letter from a faculty member</li>
                </ul>
                
                <h3>Related Documents</h3>
                <div class="related-files mt-4">
                    <a href="#" class="file-link mb-2">
                        <i class="fas fa-file-pdf"></i>
                        <span>Scholarship Application Form</span>
                    </a>
                    <a href="#" class="file-link">
                        <i class="fas fa-file-alt"></i>
                        <span>Scholarship Rules and Regulations</span>
                    </a>
                </div>
            `,
            author: "Prof. Michael Chen",
            relatedNotices: ["1", "3"]
        },
        {
            id: "3",
            title: "Campus Placement Drive",
            category: "event",
            date: "October 5, 2023",
            department: "Career Development Cell",
            summary: "A campus placement drive will be conducted next week for final year students. Several leading companies will be participating.",
            content: `
                <p class="lead">The Career Development Cell is organizing a campus placement drive for final year students from October 12-15, 2023.</p>
                
                <h3>Participating Companies</h3>
                <ul>
                    <li>Tech Innovations Inc.</li>
                    <li>Global Solutions Ltd.</li>
                    <li>NextGen Systems</li>
                    <li>Infinity Consulting Group</li>
                    <li>Data Analytics Pro</li>
                </ul>
                
                <h3>Eligibility Criteria</h3>
                <p>All final year students with a minimum CGPA of 3.0 are eligible to participate in the placement drive. Students with backlogs are not eligible.</p>
                
                <h3>Schedule</h3>
                <ul>
                    <li>October 12: Pre-placement Talk</li>
                    <li>October 13: Aptitude Test and Technical Interviews</li>
                    <li>October 14-15: HR Interviews</li>
                </ul>
                
                <div class="note-box">
                    <h4><i class="fas fa-exclamation-circle"></i> Important Note</h4>
                    <p>Students must bring their updated resumes, ID cards, and dress formally for all the placement activities.</p>
                </div>
                
                <h3>Related Documents</h3>
                <div class="related-files mt-4">
                    <a href="#" class="file-link mb-2">
                        <i class="fas fa-file-pdf"></i>
                        <span>Company Profiles</span>
                    </a>
                    <a href="#" class="file-link">
                        <i class="fas fa-file-alt"></i>
                        <span>Placement Guidelines</span>
                    </a>
                </div>
            `,
            author: "Prof. Lisa Rodriguez",
            relatedNotices: ["1", "2"]
        }
    ];
    
    return notices.find(notice => notice.id === id);
}

function displayNoticeDetails(notice) {
    const container = document.getElementById('notice-details-container');
    
    // Create category class
    const categoryClass = notice.category.toLowerCase().replace(' ', '-');
    
    // Create HTML structure for notice details
    let html = `
        <div class="notice-details-card">
            <div class="notice-header">
                <div class="notice-meta">
                    <span class="notice-category ${categoryClass}">${notice.category}</span>
                    <span class="notice-date"><i class="far fa-calendar-alt"></i> ${notice.date}</span>
                    <span class="notice-department"><i class="far fa-building"></i> ${notice.department}</span>
                </div>
                <h1 class="notice-title">${notice.title}</h1>
            </div>
            
            <div class="notice-content">
                ${notice.content}
            </div>
            
            <div class="notice-footer">
                <div class="row">
                    <div class="col-md-6">
                        <p class="notice-author"><strong>Posted by:</strong> ${notice.author}</p>
                    </div>
                    <div class="col-md-6">
                        <div class="notice-actions">
                            <a href="#" class="btn btn-outline-primary btn-sm"><i class="fas fa-print"></i> Print</a>
                            <a href="#" class="btn btn-outline-secondary btn-sm"><i class="fas fa-share-alt"></i> Share</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="notice-navigation">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <a href="#" class="nav-link" onclick="return false;">
                        <span><i class="fas fa-arrow-left"></i> Previous Notice</span>
                        <h5>Student Council Elections</h5>
                    </a>
                </div>
                <div class="col-md-6 mb-3">
                    <a href="#" class="nav-link text-right" onclick="return false;">
                        <span>Next Notice <i class="fas fa-arrow-right"></i></span>
                        <h5>Annual Sports Meet</h5>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="related-notices mt-5">
            <h3 class="section-title">Related Notices</h3>
            <div class="row">`;
    
    // Add related notices if available
    if (notice.relatedNotices && notice.relatedNotices.length > 0) {
        notice.relatedNotices.forEach(relatedId => {
            const relatedNotice = getNoticeById(relatedId);
            if (relatedNotice) {
                html += `
                    <div class="col-md-6 mb-4">
                        <div class="notice-card">
                            <span class="notice-date">${relatedNotice.date}</span>
                            <h5 class="notice-title">${relatedNotice.title}</h5>
                            <p>${relatedNotice.summary}</p>
                            <a href="notice-details.html?id=${relatedNotice.id}" class="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>
                `;
            }
        });
    } else {
        html += `<div class="col-12"><p>No related notices found.</p></div>`;
    }
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function showNoticeError(message) {
    const container = document.getElementById('notice-details-container');
    container.innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-triangle"></i> ${message}
            <p class="mt-3">Return to <a href="notice-board.html">Notice Board</a></p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown menu hover functionality
    initDropdownHover();
    
    // Other initialization functions can be added here
    
    // Function to initialize dropdown hover
    function initDropdownHover() {
        // Only apply hover effect on desktop (screen width >= 992px)
        if (window.innerWidth >= 992) {
            const dropdowns = document.querySelectorAll('.nav-menu .dropdown');
            
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'block';
                    }
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                    }
                });
            });
        }
        
        // Update dropdown behavior on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                const dropdowns = document.querySelectorAll('.nav-menu .dropdown');
                
                dropdowns.forEach(dropdown => {
                    // Reset style first
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = '';
                    }
                    
                    // Reapply event listeners for hover
                    dropdown.addEventListener('mouseenter', function() {
                        const dropdownMenu = this.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            dropdownMenu.style.display = 'block';
                        }
                    });
                    
                    dropdown.addEventListener('mouseleave', function() {
                        const dropdownMenu = this.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            dropdownMenu.style.display = 'none';
                        }
                    });
                });
            }
        });
    }
}); 