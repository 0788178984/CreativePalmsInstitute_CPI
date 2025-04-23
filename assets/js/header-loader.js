// Header loader script
document.addEventListener('DOMContentLoaded', function() {
    // Function to load header
    function loadHeader() {
        fetch('header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const headerContainer = document.getElementById('header-container');
                if (headerContainer) {
                    headerContainer.innerHTML = data;
                    
                    // Initialize mobile menu functionality
                    initMobileMenu();
                    
                    // Get current page URL for menu highlighting
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    
                    // Highlight active menu items
                    setTimeout(() => {
                        highlightCurrentPage(currentPage);
                    }, 100);
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Provide fallback
                const headerContainer = document.getElementById('header-container');
                if (headerContainer) {
                    headerContainer.innerHTML = '<div class="container py-3 text-center"><a href="index.html">Home</a> | <a href="about.html">About</a> | <a href="contact.html">Contact</a></div>';
                }
            });
    }
    
    // Function to initialize mobile menu
    function initMobileMenu() {
        // Mobile menu toggle
        const burger = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('mainNavMenu');
        const searchBox = document.querySelector('.search-box');
        
        if (burger && navMenu) {
            burger.addEventListener('click', function() {
                burger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Toggle search box visibility on mobile
                if (window.innerWidth <= 991 && searchBox) {
                    if (navMenu.classList.contains('active')) {
                        setTimeout(() => {
                            searchBox.style.display = 'block';
                        }, 300); // Slight delay to show after menu animation
                    } else {
                        searchBox.style.display = '';
                    }
                }
            });
        }
        
        // Dropdown toggle for mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            if (dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    // Only handle dropdown toggle on mobile
                    if (window.innerWidth <= 991) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 991 && navMenu && navMenu.classList.contains('active')) {
                // If click is outside nav menu and not on the burger button
                if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
                    navMenu.classList.remove('active');
                    burger.classList.remove('active');
                    if (searchBox) {
                        searchBox.style.display = '';
                    }
                }
            }
        });
        
        // Handle search button functionality
        const searchButton = document.querySelector('.search-box button');
        const searchInput = document.querySelector('.search-box input');
        
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (searchInput.value.trim() !== '') {
                    // Implement search functionality
                    performSearch(searchInput.value);
                } else {
                    // If empty, focus the input
                    searchInput.focus();
                }
            });
            
            // Allow search on Enter key
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                    e.preventDefault();
                    performSearch(searchInput.value);
                }
            });
        }
    }
    
    // Function to perform search
    function performSearch(query) {
        // For now, just redirect to a search results page with the query
        window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
        
        // In the future, you could implement AJAX search functionality here
        // Example:
        /*
        fetch('search.php?q=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                // Process search results
                console.log(data);
            })
            .catch(error => {
                console.error('Error performing search:', error);
            });
        */
    }
    
    // Function to highlight current page in navigation
    function highlightCurrentPage(currentPage) {
        // Remove active class from all navigation items
        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.classList.remove('active');
        });
        
        // Add active class to current page
        if (currentPage === '' || currentPage === 'index.html') {
            document.getElementById('nav-home')?.classList.add('active');
        } else if (currentPage === 'history.html') {
            document.getElementById('nav-history')?.classList.add('active');
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage === 'vision.html') {
            document.getElementById('nav-vision')?.classList.add('active');
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage === 'policies.html') {
            document.getElementById('nav-policies')?.classList.add('active');
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage === 'administration.html') {
            document.getElementById('nav-administration')?.classList.add('active');
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage === 'staff.html') {
            document.getElementById('nav-staff')?.classList.add('active');
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage === 'national-certificate.html') {
            document.getElementById('nav-certificate')?.classList.add('active');
            document.getElementById('nav-courses')?.classList.add('active');
        } else if (currentPage === 'national-diploma.html') {
            document.getElementById('nav-diploma')?.classList.add('active');
            document.getElementById('nav-courses')?.classList.add('active');
        } else if (currentPage === 'short-courses.html') {
            document.getElementById('nav-short-courses')?.classList.add('active');
            document.getElementById('nav-courses')?.classList.add('active');
        } else if (currentPage === 'vocational.html') {
            document.getElementById('nav-vocational')?.classList.add('active');
            document.getElementById('nav-courses')?.classList.add('active');
        } else if (currentPage === 'fees.html') {
            document.getElementById('nav-fees')?.classList.add('active');
            document.getElementById('nav-courses')?.classList.add('active');
        } else if (currentPage === 'requirements.html') {
            document.getElementById('nav-requirements')?.classList.add('active');
            document.getElementById('nav-admission')?.classList.add('active');
        } else if (currentPage === 'apply.html') {
            document.getElementById('nav-apply')?.classList.add('active');
            document.getElementById('nav-admission')?.classList.add('active');
        } else if (currentPage === 'downloads.html') {
            document.getElementById('nav-downloads')?.classList.add('active');
            document.getElementById('nav-admission')?.classList.add('active');
        } else if (currentPage === 'scholarships.html') {
            document.getElementById('nav-scholarships')?.classList.add('active');
            document.getElementById('nav-admission')?.classList.add('active');
        } else if (currentPage === 'news.html') {
            document.getElementById('nav-news')?.classList.add('active');
        } else if (currentPage === 'contact.html') {
            document.getElementById('nav-contact')?.classList.add('active');
        }
    }
    
    // Load the header
    loadHeader();
}); 