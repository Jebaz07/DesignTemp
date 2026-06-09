/* ==========================================================================
   InAmigos Foundation - Interactive Script
   Adds premium interactions, counters, scroll animations, and lightbox gallery.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon between bars and Xmark
            if (navMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinksList = document.querySelectorAll('.nav-link');
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Dynamic Year Footer Update
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 4. Back To Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Scroll active nav-link indicator
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 160; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Number Counting Animation (Intersection Observer)
    const animateCounters = (counterElement) => {
        const target = +counterElement.getAttribute('data-target');
        let count = 0;
        
        // Dynamic speed based on target size
        const speed = target > 1000 ? Math.ceil(target / 100) : 2;
        const increment = Math.ceil(target / (1000 / speed));

        const updateCount = () => {
            count += increment;
            if (count < target) {
                // Formatting helper for 1000s
                if (target >= 1000) {
                    counterElement.innerText = Math.floor(count).toLocaleString() + '+';
                } else {
                    counterElement.innerText = Math.floor(count) + '+';
                }
                setTimeout(updateCount, 15);
            } else {
                counterElement.innerText = target.toLocaleString() + '+';
            }
        };

        updateCount();
    };

    const counterSectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.counter-number, .impact-number');
                numbers.forEach(num => animateCounters(num));
                observer.unobserve(entry.target); // Trigger animation only once
            }
        });
    }, { threshold: 0.15 });

    // Observe sections holding numbers
    const statsGrid = document.querySelector('.stats-counter-grid');
    const impactGrid = document.querySelector('.social-impact-grid');
    if (statsGrid) counterSectionObserver.observe(statsGrid);
    if (impactGrid) counterSectionObserver.observe(impactGrid);


    // 7. Gallery Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const captionText = item.getAttribute('data-caption');
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightboxCaption.textContent = captionText || img.alt || 'InAmigos Activity Image';
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Stop background scrolling
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Resume background scrolling
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 8. Element Fade-In Scroll Animation
    const fadeElementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => fadeElementsObserver.observe(el));

});
