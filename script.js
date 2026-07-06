<<<<<<< HEAD
// Navbar scroll effect
const navbar = document.getElementById('navbar');

=======
import { supabase } from './supabaseClient.js';

// ==========================================
// 1. SUPABASE DATABASE INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    // A. POPULATE THE ROLE DROPDOWN
    const roleDropdown = document.getElementById('apply-role');
    if (roleDropdown) {
        const { data: openRoles, error: roleError } = await supabase
            .from('project_roles')
            .select('id, role_title, projects(title)')
            .eq('is_open', true);

        if (!roleError && openRoles) {
            openRoles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;
                option.textContent = `${role.role_title} — (${role.projects.title})`;
                roleDropdown.appendChild(option);
            });
        }
    }

    // B. FETCH AND DISPLAY PROJECTS IN "OUR WORK"
    const workViewContainer = document.getElementById('work-view');
    if (workViewContainer) {
        const { data: projects, error: projectError } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (!projectError && projects) {
            workViewContainer.innerHTML = ''; // Clear empty container

            projects.forEach(project => {
                const mediaContent = project.video_url
                    ? `<video src="${project.video_url}" controls playsinline style="width:100%; border-radius:6px; background:#1C1C1E; display:block;"></video>`
                    : `<img src="${project.thumbnail_url || 'https://via.placeholder.com/800x450?text=No+Image'}" alt="${project.title}" style="width:100%; border-radius:6px; display:block; object-fit:cover;">`;

                const projectCardHTML = `
                    <section class="current-production" style="padding: 0; margin-bottom: 80px;">
                        <div class="section-tag">[ ${project.status.toUpperCase()} ]</div>
                        <h2 class="section-heading">${project.title}</h2>
                        <div class="production-card">
                            <h3 class="production-title">${project.title}</h3>
                            <p class="production-story">
                                ${project.description || 'Details coming soon.'}
                            </p>
                            <div class="production-media">
                                <div class="media-box-wrapper">
                                    ${mediaContent}
                                </div>
                            </div>
                        </div>
                    </section>
                `;
                workViewContainer.insertAdjacentHTML('beforeend', projectCardHTML);
            });
        }
    }
});

// ==========================================
// 2. SPA VIEW TOGGLE LOGIC (NAVIGATION)
// ==========================================
const ALL_VIEWS = ['main-content', 'about', 'work-view', 'ajinkyan-view', 'contact-view'];

function transitionToView(targetId, event) {
    if (event) event.preventDefault();

    ALL_VIEWS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id !== targetId) {
                el.classList.add('hidden');
                el.classList.remove('view-enter-active');
            }
        }
    });

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.classList.remove('hidden');
        void targetEl.offsetWidth; // Force reflow for animation
        targetEl.classList.add('view-enter-active');
    }
    window.scrollTo(0, 0);
}

// 🔓 ATTACHED TO WINDOW: So HTML buttons can click them!
window.showHomeView = function (event) { transitionToView('main-content', event); };
window.showAboutView = function (event) { transitionToView('about', event); };
window.showWorkView = function (event) { transitionToView('work-view', event); };
window.showAjinkyanView = function (event) { transitionToView('ajinkyan-view', event); };
window.showContactView = function (event) { transitionToView('contact-view', event); };

// Initial load animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const activeView = document.querySelector('.view-section:not(.hidden)');
        if (activeView) {
            activeView.classList.add('view-enter-active');
        } else {
            const mainContent = document.getElementById('main-content');
            if (mainContent && !mainContent.classList.contains('hidden')) {
                mainContent.classList.add('view-enter-active');
            }
        }
    }, 50);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

<<<<<<< HEAD


// Carousel Logic
=======
// ==========================================
// 3. CAROUSEL LOGIC
// ==========================================
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
let carouselIndex = 0;
let carouselTimer = null;

function showCarouselSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    if (slides.length === 0) return;
<<<<<<< HEAD
    
=======

>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
    if (index >= slides.length) {
        carouselIndex = 0;
    } else if (index < 0) {
        carouselIndex = slides.length - 1;
    } else {
        carouselIndex = index;
    }
<<<<<<< HEAD
    
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
=======

    slides.forEach((slide, i) => slide.classList.toggle('active', i === carouselIndex));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === carouselIndex));
}

// 🔓 ATTACHED TO WINDOW: So HTML buttons can click them!
window.moveCarousel = function (direction) {
    resetCarouselTimer();
    showCarouselSlide(carouselIndex + direction);
};

window.setCarouselSlide = function (index) {
    resetCarouselTimer();
    showCarouselSlide(index);
};

function startCarouselTimer() {
    carouselTimer = setInterval(() => { showCarouselSlide(carouselIndex + 1); }, 3500);
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
}

function resetCarouselTimer() {
    clearInterval(carouselTimer);
    startCarouselTimer();
}

<<<<<<< HEAD
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
=======
// Initialize Main Carousel
const slides = document.querySelectorAll('.carousel-slide');
if (slides.length > 0) startCarouselTimer();


// --- BTS Carousel Logic ---
const btsSlides = document.querySelectorAll('.bts-carousel-slide');
const btsDots = document.querySelectorAll('.bts-dot');
let currentBtsIndex = 0;
let btsAutoAdvanceInterval;

function updateBtsCarousel() {
    if (!btsSlides.length) return;
    btsSlides.forEach((slide, i) => slide.classList.toggle('active', i === currentBtsIndex));
    btsDots.forEach((dot, i) => dot.classList.toggle('active', i === currentBtsIndex));
}

// 🔓 ATTACHED TO WINDOW: So HTML buttons can click them!
window.moveBtsCarousel = function (step) {
    if (!btsSlides.length) return;
    currentBtsIndex = (currentBtsIndex + step + btsSlides.length) % btsSlides.length;
    updateBtsCarousel();
    resetBtsAutoAdvance();
};

window.setBtsCarousel = function (index) {
    if (!btsSlides.length) return;
    currentBtsIndex = index;
    updateBtsCarousel();
    resetBtsAutoAdvance();
};

function resetBtsAutoAdvance() {
    clearInterval(btsAutoAdvanceInterval);
    btsAutoAdvanceInterval = setInterval(() => { window.moveBtsCarousel(1); }, 4000);
}

// Initialize BTS Carousel
if (btsSlides.length > 0) {
    updateBtsCarousel();
    resetBtsAutoAdvance();
}

// ==========================================
// 4. APPLY MODAL LOGIC & FORM SUBMISSION
// ==========================================
const applyModal = document.getElementById('apply-modal');
const applyForm = document.getElementById('apply-role-form');

// 🔓 ATTACHED TO WINDOW
window.openApplyModal = function () {
    applyModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
};

window.closeApplyModal = function () {
    applyModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
    setTimeout(() => {
        document.getElementById('apply-form-container').classList.remove('hidden');
        document.getElementById('apply-success-container').classList.add('hidden');
        if (applyForm) applyForm.reset();
        document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
        document.getElementById('apply-form-error').classList.add('hidden');
    }, 300);
<<<<<<< HEAD
}
=======
};
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16

if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        
        // Validate required fields
        let isValid = true;
        const requiredFields = ['apply-name', 'apply-age', 'apply-city', 'apply-state', 'apply-email', 'apply-mobile', 'apply-role'];
        
=======

        let isValid = true;
        const requiredFields = ['apply-name', 'apply-age', 'apply-city', 'apply-state', 'apply-email', 'apply-mobile', 'apply-role'];

>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
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
<<<<<<< HEAD
        
        if (!isValid) return;
        
=======

        if (!isValid) return;

>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
        const submitBtn = applyForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Submitting...';
        submitBtn.disabled = true;
        document.getElementById('apply-form-error').classList.add('hidden');
<<<<<<< HEAD
        
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
=======

        const applicationData = {
            full_name: document.getElementById('apply-name').value,
            age: parseInt(document.getElementById('apply-age').value),
            city: document.getElementById('apply-city').value,
            state: document.getElementById('apply-state').value,
            email: document.getElementById('apply-email').value,
            phone_number: document.getElementById('apply-mobile').value,
            project_role_id: document.getElementById('apply-role').value,
            experience_years: document.getElementById('apply-experience').value,
            portfolio_link: document.getElementById('apply-portfolio').value,
            additional_notes: document.getElementById('apply-message').value
        };

        try {
            const { error } = await supabase
                .from('recruitment_applications')
                .insert([applicationData]);

            if (error) throw error;

            document.getElementById('apply-form-container').classList.add('hidden');
            document.getElementById('apply-success-container').classList.remove('hidden');

        } catch (error) {
            console.error('Supabase Error:', error.message);
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
            document.getElementById('apply-form-error').classList.remove('hidden');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
<<<<<<< HEAD
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
=======
}
>>>>>>> d9a54d412308b63bc1664ddb7e8afd96bda40f16
