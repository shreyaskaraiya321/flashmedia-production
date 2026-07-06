// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// Carousel Logic
let carouselIndex = 0;
let carouselTimer = null;

function showCarouselSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    if (slides.length === 0) return;
    
    if (index >= slides.length) {
        carouselIndex = 0;
    } else if (index < 0) {
        carouselIndex = slides.length - 1;
    } else {
        carouselIndex = index;
    }
    
    slides.forEach((slide, i) => {
        if (i === carouselIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    dots.forEach((dot, i) => {
        if (i === carouselIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function moveCarousel(direction) {
    resetCarouselTimer();
    showCarouselSlide(carouselIndex + direction);
}

function setCarouselSlide(index) {
    resetCarouselTimer();
    showCarouselSlide(index);
}

function startCarouselTimer() {
    carouselTimer = setInterval(() => {
        showCarouselSlide(carouselIndex + 1);
    }, 3500);
}

function resetCarouselTimer() {
    clearInterval(carouselTimer);
    startCarouselTimer();
}

// Initialize Carousel
const slides = document.querySelectorAll('.carousel-slide');
if (slides.length > 0) {
    startCarouselTimer();
}



// Apply Modal Logic
const applyModal = document.getElementById('apply-modal');
const applyForm = document.getElementById('apply-role-form');

function openApplyModal() {
    applyModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeApplyModal() {
    applyModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // Reset form states after animation
    setTimeout(() => {
        document.getElementById('apply-form-container').classList.remove('hidden');
        document.getElementById('apply-success-container').classList.add('hidden');
        if (applyForm) applyForm.reset();
        document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
        document.getElementById('apply-form-error').classList.add('hidden');
    }, 300);
}

if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate required fields
        let isValid = true;
        const requiredFields = ['apply-name', 'apply-age', 'apply-city', 'apply-state', 'apply-email', 'apply-mobile', 'apply-role'];
        
        requiredFields.forEach(id => {
            const el = document.getElementById(id);
            const errorEl = el.nextElementSibling;
            if (!el.value.trim()) {
                errorEl.innerText = 'This field is required.';
                isValid = false;
            } else if (id === 'apply-age' && (el.value < 16 || el.value > 65)) {
                errorEl.innerText = 'Age must be between 16 and 65.';
                isValid = false;
            } else {
                errorEl.innerText = '';
            }
        });
        
        if (!isValid) return;
        
        const submitBtn = applyForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Submitting...';
        submitBtn.disabled = true;
        document.getElementById('apply-form-error').classList.add('hidden');
        
        const formData = {
            name: document.getElementById('apply-name').value,
            age: document.getElementById('apply-age').value,
            city: document.getElementById('apply-city').value,
            state: document.getElementById('apply-state').value,
            email: document.getElementById('apply-email').value,
            mobile: document.getElementById('apply-mobile').value,
            role: document.getElementById('apply-role').value,
            experience: document.getElementById('apply-experience').value,
            portfolio: document.getElementById('apply-portfolio').value,
            message: document.getElementById('apply-message').value
        };
        
        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbyqS2HIcCtoIJ6IMYneFxLICLqK2EurnJojHvH9mxXGkwnmWOBHnYsQD5xHdWsOQg/exec", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // On success
            if (response.ok || response.type === 'opaque') {
                document.getElementById('apply-form-container').classList.add('hidden');
                document.getElementById('apply-success-container').classList.remove('hidden');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error(error);
            document.getElementById('apply-form-error').classList.remove('hidden');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// SPA View Toggle: Home / About / Work / Contact
function showAboutView(event) {
    if (event) event.preventDefault();
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('work-view').classList.add('hidden');
    document.getElementById('contact-view').classList.add('hidden');
    document.getElementById('ajinkyan-view').classList.add('hidden');
    document.getElementById('about').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showWorkView(event) {
    if (event) event.preventDefault();
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');
    document.getElementById('contact-view').classList.add('hidden');
    document.getElementById('ajinkyan-view').classList.add('hidden');
    document.getElementById('work-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showHomeView() {
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('about').classList.add('hidden');
    document.getElementById('work-view').classList.add('hidden');
    document.getElementById('contact-view').classList.add('hidden');
    document.getElementById('ajinkyan-view').classList.add('hidden');
}

function showContactView(event) {
    if (event) event.preventDefault();
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');
    document.getElementById('work-view').classList.add('hidden');
    document.getElementById('ajinkyan-view').classList.add('hidden');
    document.getElementById('contact-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showAjinkyanView(event) {
    if (event) event.preventDefault();
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');
    document.getElementById('work-view').classList.add('hidden');
    document.getElementById('contact-view').classList.add('hidden');
    document.getElementById('ajinkyan-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// BTS Carousel Logic
const btsSlides = document.querySelectorAll('.bts-carousel-slide');
const btsDots = document.querySelectorAll('.bts-dot');
let currentBtsIndex = 0;
let btsAutoAdvanceInterval;

function updateBtsCarousel() {
    if (!btsSlides.length) return;
    btsSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentBtsIndex);
    });
    btsDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentBtsIndex);
    });
}

function moveBtsCarousel(step) {
    if (!btsSlides.length) return;
    currentBtsIndex = (currentBtsIndex + step + btsSlides.length) % btsSlides.length;
    updateBtsCarousel();
    resetBtsAutoAdvance();
}

function setBtsCarousel(index) {
    if (!btsSlides.length) return;
    currentBtsIndex = index;
    updateBtsCarousel();
    resetBtsAutoAdvance();
}

function resetBtsAutoAdvance() {
    clearInterval(btsAutoAdvanceInterval);
    btsAutoAdvanceInterval = setInterval(() => {
        moveBtsCarousel(1);
    }, 4000);
}

// Initialize Carousel
if (btsSlides.length > 0) {
    updateBtsCarousel();
    resetBtsAutoAdvance();
}
