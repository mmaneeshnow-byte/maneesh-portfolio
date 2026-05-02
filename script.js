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
    
    // Add same animation to contact section
    const contactSection = document.getElementById('contact');
    observer.observe(contactSection);
});