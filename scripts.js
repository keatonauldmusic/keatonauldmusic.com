document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const socialIcons = document.querySelector('header .social-icons');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            socialIcons.classList.toggle('active');
        });
    }

    // Scroll Animation Observer (Fade In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
});



// Target all cards on the page using a class name
const cards = document.querySelectorAll('.steam-card');

cards.forEach(card => {
  const inner = card.querySelector('.card-inner');
  const shine = card.querySelector('.card-shine');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 1. Calculate Tilt Rotation Angles
    const rotateX = -(y - centerY) / 8; // Adjust divisor for stiffness
    const rotateY = (x - centerX) / 8;

    // Apply the 3D rotation and a subtle zoom scale
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

    // 2. Calculate Shine Position and Angle
    // Converts coordinate offsets into degree angles for the gradient
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
    
    // Calculates how close the mouse is to the edge to dynamically dim/brighten the shine
    const distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const opacity = (distanceToCenter / maxDistance) * 0.4; // Max 40% glare opacity

    // Apply the glossy linear gradient reflecting the mouse position
    shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 80%)`;
  });

  // Reset animations smoothly when leaving a card
  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)';
  });
});

