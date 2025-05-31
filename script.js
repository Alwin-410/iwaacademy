// Remove preloader once the video and DOM are loaded
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const video = document.querySelector('.background-video');

    // Wait for the video to be ready or a timeout (e.g., 3 seconds)
    const videoReady = new Promise((resolve) => {
        if (video) {
            video.oncanplay = () => resolve();
            video.onerror = () => resolve(); // Resolve even if video fails to load
        } else {
            resolve(); // No video, resolve immediately
        }
    });

    Promise.race([
        videoReady,
        new Promise(resolve => setTimeout(resolve, 3000)) // Fallback timeout
    ]).then(() => {
        if (preloader) preloader.style.display = 'none';
    });
});

// Handle Front Overlay Transition
const frontOverlay = document.querySelector('.front-overlay');
const mainContent = document.querySelector('.main-content');
const enterBtn = document.querySelector('.enter-btn');

enterBtn.addEventListener('click', () => {
    frontOverlay.classList.add('hidden');
    mainContent.classList.add('visible');
    document.body.style.overflow = 'auto'; // Enable scrolling after overlay is hidden
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Slideshow
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    let slideIndex = 0;
    const nextSlide = document.querySelector('.next');
    const prevSlide = document.querySelector('.prev');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    nextSlide.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    });

    prevSlide.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 5000);
}

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length > 0) {
    let testimonialIndex = 0;
    const nextTestimonial = document.querySelector('.next-testimonial');
    const prevTestimonial = document.querySelector('.prev-testimonial');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    nextTestimonial.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    });

    prevTestimonial.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(testimonialIndex);
    });
}

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-img');
if (galleryImages.length > 0) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    });
}
