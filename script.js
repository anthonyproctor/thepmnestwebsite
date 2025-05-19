// The PM Nest - JavaScript for Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Make sure the modal is hidden on page load
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    
    // Make sure success message is hidden initially
    document.getElementById('formSuccess').style.display = 'none';

    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');

    navToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        navToggle.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', 
            navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !mobileNav.contains(event.target)) {
            mobileNav.classList.remove('active');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Testimonial Carousel
    const testimonialList = document.querySelector('.testimonial-list');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-arrow.prev');
    const nextButton = document.querySelector('.testimonial-arrow.next');
    let currentIndex = 0;

    function showTestimonial(index) {
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update testimonial position
        testimonialList.style.transform = `translateX(-${index * 100}%)`;
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // Arrow navigation
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        });
    }

    // Auto-advance
    let autoAdvanceInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Pause on hover
    if (testimonialList) {
        testimonialList.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });

        testimonialList.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                showTestimonial(currentIndex);
            }, 5000);
        });
    }
});

// Function to open the contact form modal
function openContactForm(type) {
    const modal = document.getElementById('contactModal');
    const formType = document.getElementById('formType');
    const formTitle = document.getElementById('formTitle');
    
    formType.value = type;
    formTitle.textContent = type === 'starter' ? 'Start Your Project' : 'Book a Free Project Audit';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close the contact form modal
function closeContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactForm();
    }
}

// Function to handle form submission
async function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formEndpoint = form.action; // Get the Formspree URL from the form's action attribute
    
    try {
        const response = await fetch(formEndpoint, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Form submitted successfully
            showSuccessMessage();
        } else {
            // Form submission failed
            const errorData = await response.json();
            console.error('Form submission failed:', response.status, errorData);
            alert('Oops! There was a problem submitting your form.'); // Basic error message
        }
    } catch (error) {
        console.error('Error during form submission:', error);
        alert('Oops! An error occurred. Please try again later.'); // Basic error message
    }
}

// Function to show success message
function showSuccessMessage() {
    // Hide the form
    document.getElementById('contactForm').style.display = 'none';
    
    // Show success message
    document.getElementById('formSuccess').style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        closeContactForm();
        document.getElementById('contactForm').reset();
        document.getElementById('formSuccess').style.display = 'none';
    }, 3000);
}