// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Language Toggle
    const langBtns = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update HTML lang attribute
            htmlElement.setAttribute('lang', lang);
            htmlElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
            
            // Store preference
            localStorage.setItem('preferred-language', lang);
            
            // Update content immediately
            updateContent(lang);
            
            // Trigger language change event
            window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }));
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'he';
    const savedLangBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedLangBtn) {
        savedLangBtn.click();
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(238, 237, 235, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(238, 237, 235, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .intro-text, .read-more-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Enhanced image animations with Intersection Observer
    const enhancedImageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const figure = img.closest('figure');
                
                if (figure) {
                    figure.style.opacity = '1';
                    figure.style.transform = 'translateY(0)';
                    
                    // Add staggered delay for multiple images
                    const figures = figure.parentElement.querySelectorAll('figure');
                    const index = Array.from(figures).indexOf(figure);
                    figure.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Add loading animation for images
                img.style.opacity = '0';
                img.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all images for enhanced animations
    const allImages = document.querySelectorAll('img:not(.logo-image)');
    allImages.forEach(img => {
        enhancedImageObserver.observe(img);
    });
    
    // Special handling for logo animation
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.style.opacity = '0';
        logoImage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            logoImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            logoImage.style.opacity = '1';
            logoImage.style.transform = 'translateY(0)';
        }, 500);
    }
    

    
    // FAQ items now use speech bubble layout with answers visible by default
    // No JavaScript functionality needed for the new design
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Contact form submission:', data);
            
            // Show success message
            const currentLang = document.documentElement.getAttribute('lang') || 'he';
            const successText = languageContent[currentLang]?.common?.contactSuccess || 'תודה על הפנייה! אחזור אליך בהקדם.';
            const successMsg = document.createElement('div');
            successMsg.textContent = successText;
            successMsg.style.cssText = `
                color: #a06a4d;
                font-weight: 600;
                margin-top: 1rem;
                text-align: center;
                padding: 1rem;
                background: #f0f0f0;
                border-radius: 8px;
            `;
            
            this.appendChild(successMsg);
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Language content management
const languageContent = {
    he: {
        // Hebrew content
        nav: {
            home: 'בית',
            about: 'אודות',
            therapy: 'תחומי טיפול',
            courses: 'קורסים דיגיטליים',
            lectures: 'הרצאות',
            publications: 'פרסומים',
            faq: 'שאלות נפוצות',
            contact: 'צור קשר'
        },
        hero: {
            title: 'לבחור בנפש',
            subtitle: 'choose your mind',
            welcome: 'ברוכים הבאים, שמי ירדן גבאי, ואני פסיכולוגית קלינית...'
        },
        common: {
            contactSuccess: 'תודה על הפנייה! אחזור אליך בהקדם.',
            readMore: 'קרא עוד',
            backToPublications: 'חזרה לפרסומים',
        }
    },
    en: {
        // English content
        nav: {
            home: 'Home',
            about: 'About',
            therapy: 'Areas of Therapy',
            courses: 'Digital Courses',
            lectures: 'Lectures',
            publications: 'Publications',
            faq: 'FAQ',
            contact: 'Contact'
        },
        hero: {
            title: 'choose your mind',
            subtitle: 'לבחור בנפש',
            welcome: 'Welcome, I\'m Yarden Gabbay, a Clinical Psychologist...'
        },
        common: {
            contactSuccess: 'Thank you for your message! I\'ll get back to you soon.',
            readMore: 'Read More',
            backToPublications: 'Back to Publications',
        }
    }
};

// Function to update content based on language
function updateContent(lang) {
    const content = languageContent[lang];
    if (!content) return;
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const key = link.getAttribute('data-nav-key');
        if (key && content.nav[key]) {
            link.textContent = content.nav[key];
        }
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) heroTitle.textContent = content.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = content.hero.subtitle;
    
    // Update elements with data attributes
    const elementsWithData = document.querySelectorAll('[data-en][data-he]');
    elementsWithData.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholder attributes
    const elementsWithPlaceholder = document.querySelectorAll('[data-en-placeholder][data-he-placeholder]');
    elementsWithPlaceholder.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const toggleText = langToggle.querySelector('span');
        if (toggleText) {
            const oppositeLang = lang === 'he' ? 'en' : 'he';
            const oppositeText = toggleText.getAttribute(`data-${oppositeLang}`);
            if (oppositeText) {
                toggleText.textContent = oppositeText;
            }
        }
    }
}

// Listen for language changes
window.addEventListener('languageChange', function(e) {
    updateContent(e.detail.lang);
});

// Initialize content on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.documentElement.getAttribute('lang') || 'he';
    updateContent(currentLang);
}); 