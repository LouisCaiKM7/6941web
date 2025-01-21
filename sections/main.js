// Initialize all sections
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    loadTBAEvents();
    loadNews();
    setupContactForm();
    setupSponsorButtons();
});

// Scroll animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Add these classes to elements you want to animate
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
}); 