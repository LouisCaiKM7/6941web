// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active state in navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});


// Add scroll reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});

// TBA Calendar Integration
async function loadTBAEvents() {
    const TBA_API_KEY = 'your-tba-api-key';
    const TEAM_KEY = 'frc6941';
    
    try {
        const response = await fetch(`https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/events/2024`, {
            headers: {
                'X-TBA-Auth-Key': TBA_API_KEY
            }
        });
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error loading TBA events:', error);
    }
}

function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        eventElement.innerHTML = `
            <h4>${event.name}</h4>
            <p>${new Date(event.start_date).toLocaleDateString()} - ${new Date(event.end_date).toLocaleDateString()}</p>
            <p>${event.city}, ${event.state_prov}</p>
        `;
        eventsList.appendChild(eventElement);
    });
}

// News System
let newsPage = 1;
async function loadNews() {
    // Simulate loading news from an API
    const newsItems = [
        { title: 'Competition Success!', date: '2024-03-15', content: 'Team 6941 wins...' },
        // Add more news items
    ];
    
    const newsContainer = document.getElementById('news-container');
    newsItems.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        newsElement.innerHTML = `
            <h3>${item.title}</h3>
            <p class="date">${item.date}</p>
            <p>${item.content}</p>
        `;
        newsContainer.appendChild(newsElement);
    });
}

// Form Handling
document.getElementById('recruitment-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add form submission logic here
    alert('Thank you for your interest! We will contact you soon.');
});

// Sponsor Form Handling
document.getElementById('sponsor-inquiry-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Gather form data
    const formData = {
        companyName: document.getElementById('company-name').value,
        contactName: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        sponsorshipLevel: document.getElementById('sponsorship-level').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send this data to your server
    console.log('Sponsor inquiry:', formData);
    
    // Show success message
    alert('Thank you for your interest in sponsoring Team 6941! We will contact you shortly.');
    
    // Reset form
    this.reset();
});

// Add smooth scroll animation for sponsor tiers
document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation click handling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, '', targetId);
            }
        });
    });

    // Handle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Highlight current section while scrolling
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "-50px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const id = entry.target.id;
                const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
});

// Payment Methods Functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const details = this.closest('.payment-details').textContent;
        navigator.clipboard.writeText(details).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
});

// Payment Button Handlers
document.querySelectorAll('.payment-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        if (this.classList.contains('paypal-btn')) {
            // Redirect to PayPal
            window.location.href = 'https://www.paypal.com/yourpaypallink';
        } else {
            // Handle credit card payment
            // Integrate with your payment processor here
            console.log('Processing credit card payment...');
        }
    });
});

// Keyboard Navigation
document.querySelectorAll('.payment-card').forEach(card => {
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.querySelector('button')?.click();
        }
    });
});

// Announce copied text for screen readers
function announceForScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 3000);
}
// Highlight current section in navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Contact Form Handler
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send this data to your server
    console.log('Contact form submission:', formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    loadTBAEvents();
    loadNews();
}); 