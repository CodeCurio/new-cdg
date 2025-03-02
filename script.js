document.addEventListener('DOMContentLoaded', function() {
    // Fullscreen Navbar
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links'); 
    const fullscreenNav = document.createElement('div');
    fullscreenNav.classList.add('fullscreen-nav');
    
    // Create fullscreen nav content
    fullscreenNav.innerHTML = `
        <button class="close-nav">&times;</button>
        <nav class="fullscreen-nav-content">
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About Us</a></li>
                <li><a href="../services">Services</a></li>
                <li><a href="./health-pakages.html">Health Packages</a></li>
                <li><a href="../contact">Contact</a></li>
            </ul>
            <div class="fullscreen-nav-contact">
                <p><i class="fas fa-phone"></i> +91 9919474764</p>
                <p><i class="fas fa-envelope"></i> info@srldiagnostics.com</p>
                <div class="fullscreen-social-icons">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </nav>
    `;
    
    // Append to body
    document.body.appendChild(fullscreenNav);

    // Hamburger click event
    hamburger.addEventListener('click', () => {
        fullscreenNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close nav button
    const closeNav = fullscreenNav.querySelector('.close-nav');
    closeNav.addEventListener('click', () => {
        fullscreenNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close nav when a link is clicked
    const fullscreenNavLinks = fullscreenNav.querySelectorAll('a');
    fullscreenNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            fullscreenNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Image Slider
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');
    
    let currentSlide = 0;
    const totalSlides = slideItems.length;

    // Create dots
    slideItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Update dots
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        slides.style.transform = `translateX(-${currentSlide * 33.33}%)`;
        updateDots();
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    setInterval(nextSlide, 5000);

    // EmailJS Contact Form Submission
    (function(){
        emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual EmailJS User ID
    })();

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate Form Fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            // Remove previous error messages
            document.querySelectorAll('.form-error').forEach(el => el.remove());

            // Validation Flags
            let isValid = true;

            // Name Validation
            if (nameInput.value.trim() === '') {
                createErrorMessage(nameInput, 'Please enter your full name.');
                isValid = false;
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                createErrorMessage(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Optional Phone Validation
            if (phoneInput.value.trim() !== '') {
                const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
                if (!phoneRegex.test(phoneInput.value.trim())) {
                    createErrorMessage(phoneInput, 'Please enter a valid Indian phone number.');
                    isValid = false;
                }
            }

            // Subject Validation
            if (subjectInput.value.trim() === '') {
                createErrorMessage(subjectInput, 'Please enter a subject for your message.');
                isValid = false;
            }

            // Message Validation
            if (messageInput.value.trim() === '') {
                createErrorMessage(messageInput, 'Please enter your message.');
                isValid = false;
            }

            // If form is not valid, stop submission
            if (!isValid) return;

            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            // Prepare EmailJS parameters
            const templateParams = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                phone: phoneInput.value.trim() || 'Not Provided',
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Send Email using EmailJS
            emailjs.send(
                "YOUR_EMAILJS_SERVICE_ID",  // Replace with your actual EmailJS Service ID
                "YOUR_EMAILJS_TEMPLATE_ID", // Replace with your EmailJS Template ID
                templateParams
            ).then(
                function(response) {
                    // Success Message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.style.color = 'green';
                    successMessage.style.textAlign = 'center';
                    successMessage.style.marginTop = '1rem';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i> 
                        Thank you for your message! We will get back to you soon.
                    `;
                    
                    // Reset form and show success message
                    contactForm.reset();
                    contactForm.appendChild(successMessage);
                    
                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                },
                function(error) {
                    // Error Handling
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-error';
                    errorMessage.style.color = 'red';
                    errorMessage.style.textAlign = 'center';
                    errorMessage.style.marginTop = '1rem';
                    errorMessage.innerHTML = `
                        <i class="fas fa-exclamation-circle"></i> 
                        Sorry, there was an error sending your message. Please try again later.
                    `;
                    
                    contactForm.appendChild(errorMessage);
                    
                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';

                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                }
            );
        });
    }

    // Helper function to create error messages
    function createErrorMessage(inputElement, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.9rem';
        errorMessage.style.marginTop = '0.5rem';
        errorMessage.textContent = message;
        
        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
        inputElement.focus();
    }

    // Scroll-based Animation
    const animateElements = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Add animation to various sections
    const sections = [
        '.services-section', 
        '.welcome-section', 
        '.contact-section', 
        '.contact-map',
        '.site-footer'
    ];

    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('animate-on-scroll');
        }
    });

    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-scale-up');
    });

    // Floating social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.classList.add('hover-pulse');
    });

    animateElements();

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background-color: #007bff;
        z-index: 1000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);

        progressBar.style.width = `${scrollPercentRounded}%`;
    });

    // Floating Contact Button
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'contact.html';
    floatingBtn.classList.add('floating-btn', 'hover-pulse');
    floatingBtn.innerHTML = '<i class="fas fa-envelope"></i>';
    floatingBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007bff;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        text-decoration: none;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(floatingBtn);

    // Preloader
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 5px solid #007bff;
        border-top: 5px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    const spinKeyframes = document.createElement('style');
    spinKeyframes.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(spinKeyframes);
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Navigation
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-menu-active');
            hamburger.classList.toggle('active');
            console.log('Menu toggled'); 
        });

        // Add mobile menu links
        const mobileMenuLinks = [
            { text: 'Home', href: 'index.html' },
            { text: 'About Us', href: 'about.html' },
            { text: 'Services', href: 'services.html' },
            { text: 'Health Packages', href: '#packages' },
            { text: 'Contact', href: 'contact.html' }
        ];

        // Recreate navigation for mobile
        const navLinksUl = navLinks.querySelector('ul');
        navLinksUl.innerHTML = mobileMenuLinks.map(link => `
            <li>
                <a href="${link.href}" class="${link.href === window.location.pathname.split('/').pop() ? 'active' : ''}">${link.text}</a>
            </li>
        `).join('');

        // Close mobile menu when a link is clicked
        navLinks.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                navLinks.classList.remove('mobile-menu-active');
                hamburger.classList.remove('active');
                console.log('Menu closed'); 
            }
        });
    }
});
