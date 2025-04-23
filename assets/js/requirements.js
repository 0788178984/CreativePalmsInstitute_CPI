$(document).ready(function() {
    // Initialize all functions
    initSmoothScrolling();
    initAIAssistant();
    initScrollAnimations();
    handleStickyHeader();

    // Initialize accordion if it exists
    if ($('#faqAccordion').length) {
        // The Bootstrap 4 accordion is already initialized by Bootstrap
        // This is just additional custom behavior if needed
        $('.card-header button').click(function() {
            // Add some animation or custom behavior if needed
        });
    }
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    $('a[href^="#"]').not('[data-toggle="collapse"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.hash);
        if (target.length) {
            // Calculate header offset
            const headerOffset = $('.main-nav').outerHeight();
            const targetPosition = target.offset().top - headerOffset;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, 'swing');
        }
    });
}

/**
 * Initialize AI Assistant functionality
 */
function initAIAssistant() {
    const aiButton = $('.ai-assistant-button');
    const aiWindow = $('.ai-chat-window');
    const closeButton = $('.ai-close-button');
    const chatMessages = $('.ai-chat-messages');
    const messageInput = $('.ai-chat-input input');
    const sendButton = $('.ai-chat-input button');
    
    // Add welcome message
    chatMessages.append('<div class="ai-message">Hello! I\'m your admission assistant. How can I help you with the admission requirements?</div>');
    
    // Toggle chat window
    aiButton.on('click', function() {
        aiWindow.toggleClass('active');
    });
    
    // Close chat window
    closeButton.on('click', function() {
        aiWindow.removeClass('active');
    });
    
    // Send message on button click
    sendButton.on('click', function() {
        sendMessage();
    });
    
    // Send message on Enter key
    messageInput.on('keypress', function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
    
    // Function to handle sending a message
    function sendMessage() {
        const message = messageInput.val().trim();
        if (message !== '') {
            // Add user message to chat
            chatMessages.append('<div class="user-message">' + message + '</div>');
            messageInput.val('');
            
            // Auto scroll to bottom
            chatMessages.scrollTop(chatMessages[0].scrollHeight);
            
            // Process message and get AI response
            setTimeout(function() {
                const response = getAIResponse(message);
                chatMessages.append('<div class="ai-message">' + response + '</div>');
                
                // Auto scroll to bottom again
                chatMessages.scrollTop(chatMessages[0].scrollHeight);
            }, 600);
        }
    }
    
    // Function to generate AI responses
    function getAIResponse(message) {
        message = message.toLowerCase();
        
        // Check for keywords and return appropriate responses
        if (message.includes('deadline') || message.includes('when') || message.includes('date')) {
            return 'The application deadline for the upcoming session is August 30th. However, we recommend applying early as spaces fill up quickly.';
        } else if (message.includes('document') || message.includes('need to submit') || message.includes('paperwork')) {
            return 'Required documents include: completed application form, academic certificates, National ID/passport, four passport photos, medical examination report, and two recommendation letters. Would you like more details on any specific document?';
        } else if (message.includes('fee') || message.includes('cost') || message.includes('tuition')) {
            return 'Tuition fees vary by program. Business programs range from 1.2-1.8M UGX per semester, IT programs 1.5-2M UGX, and vocational programs 800K-1.2M UGX. There\'s also a one-time application fee of 50,000 UGX.';
        } else if (message.includes('qualification') || message.includes('eligible') || message.includes('requirements')) {
            return 'For Certificate programs, you need a minimum of 5 O-level passes. For Diploma programs, you need an A-level qualification or equivalent. Specific programs may have additional requirements. Which program are you interested in?';
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! How can I help you with the admission requirements today?';
        } else {
            return 'Thank you for your question. For this specific inquiry, please contact our Admissions Office directly at +256 790 123 456 or email at admissions@creativepalms.ac.ug for more detailed information.';
        }
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const animateItems = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally remove from observation after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        $('.animate-on-scroll').addClass('animated');
    }
}

/**
 * Handle sticky header behavior
 * This integrates with any global sticky header function if already defined
 */
function handleStickyHeader() {
    // If a global sticky header function exists, don't redefine it
    if (window.handleHeaderScroll) {
        return;
    }
    
    let lastScrollTop = 0;
    const mainNav = $('.main-nav');
    const header = $('.main-header');
    
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        
        // Add scroll class when scrolled
        if (scrollTop > 50) {
            header.addClass('scrolled');
            mainNav.addClass('scrolled');
            
            // Add scroll direction classes
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.removeClass('header-scroll-up');
                header.addClass('header-scroll-down');
            } else {
                // Scrolling up
                header.removeClass('header-scroll-down');
                header.addClass('header-scroll-up');
            }
        } else {
            header.removeClass('scrolled header-scroll-up header-scroll-down');
            mainNav.removeClass('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
} 