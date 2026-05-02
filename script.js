// Typing effect for hero header
document.addEventListener('DOMContentLoaded', function() {
    const typingText = "Maneesh";
    const typingElement = document.querySelector('.typing-effect');
    const cursorElement = document.getElementById('cursor');
    
    // Clear initial content
    typingElement.innerHTML = '<span class="prompt">whoami:</span> ';
    
    let charIndex = 0;
    
    function typeLetter() {
        if (charIndex < typingText.length) {
            typingElement.textContent += typingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeLetter, 150);
        } else {
            // Stop cursor blinking after typing completes
            cursorElement.style.animation = 'none';
            cursorElement.style.opacity = '1';
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeLetter, 500);
    
    // Copy to clipboard functionality for email
    const emailBtn = document.getElementById('emailBtn');
    const emailText = emailBtn.querySelector('.email-text').textContent;
    const copyTooltip = document.getElementById('copyTooltip');
    
    emailBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(emailText).then(() => {
            // Show tooltip
            copyTooltip.style.opacity = '1';
            setTimeout(() => {
                copyTooltip.style.opacity = '0';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
    
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or use system preference
    const getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Set theme on page load
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('light-mode');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.classList.add('light-mode');
            themeIcon.textContent = '☀️';
        }
        localStorage.setItem('theme', theme);
    };
    
    // Initialize theme
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    // Active section tracking on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const activateSection = () => {
        let scrollPosition = window.scrollY + 100; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', activateSection);
    // Initialize on load
    activateSection();
    
    // Add subtle animation to skill cards on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add same animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add same animation to about images
    const aboutImages = document.querySelectorAll('.image-placeholder');
    aboutImages.forEach(image => {
        observer.observe(image);
    });
    
    // Add same animation to contact section
    const contactSection = document.getElementById('contact');
    observer.observe(contactSection);
});