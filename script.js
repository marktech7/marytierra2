// Menu filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuItems = document.querySelectorAll('.menu-item');

    // Add staggered animation delays
    menuItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter sections
            filterSections(category);
            
            // Smooth scroll to menu
            document.querySelector('.menu-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    function filterSections(category) {
        menuSections.forEach(section => {
            if (category === 'all') {
                section.classList.remove('hidden');
                animateSection(section);
            } else if (section.getAttribute('data-category') === category) {
                section.classList.remove('hidden');
                animateSection(section);
            } else {
                section.classList.add('hidden');
            }
        });
    }

    function animateSection(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu items for scroll animations
    menuItems.forEach(item => {
        observer.observe(item);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover sound effect (optional)
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Price highlighting on hover
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', () => {
            price.style.transform = 'scale(1.1) rotate(5deg)';
            price.style.boxShadow = '0 8px 25px rgba(255,107,53,0.5)';
        });
        
        price.addEventListener('mouseleave', () => {
            price.style.transform = 'scale(1) rotate(0deg)';
            price.style.boxShadow = '0 4px 15px rgba(255,107,53,0.3)';
        });
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate menu items in sequence
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // Mobile menu optimization
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        navContainer.style.overflowX = 'auto';
        navContainer.style.scrollBehavior = 'smooth';
    }

    // Image lazy loading optimization
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.filter = 'blur(0)';
        });
        
        img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        });
    });
});