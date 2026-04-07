// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-text');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealOnScroll.observe(el));

// Navbar Transparency on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.height = '70px';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.height = '80px';
    }
});

// Modal Logic
const modal = document.getElementById('product-modal');
const modalRobotImage = document.getElementById('modal-robot-image');
const modalTitle = document.getElementById('modal-title');
const modalSpecs = document.getElementById('modal-specs');
const closeModal = document.querySelector('.close-modal');
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const specs = card.getAttribute('data-specs');
        const imgSrc = card.querySelector('img').src;

        modalTitle.innerText = title;
        modalSpecs.innerText = specs;
        
        // Use the authentic Unitree image
        modalRobotImage.src = imgSrc;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Stop scrolling
    });
});

closeModal.addEventListener('click', () => {
    closeProductModal();
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeProductModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProductModal();
    }
});

function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}
