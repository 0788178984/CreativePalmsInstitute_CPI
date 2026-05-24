/* Site-wide enhancements: scroll reveal, header shadow */
(function () {
    'use strict';

    document.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    window.addEventListener('scroll', function () {
        var header = document.querySelector('.site-header');
        if (header) {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        }
    });
})();
