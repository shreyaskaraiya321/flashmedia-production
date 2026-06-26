// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
});

// Close drawer on link click
drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
    });
});

// Countdown Timer logic for Ajinkyan
// Target: January 26, 2027
const targetDate = new Date('January 26, 2027 00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Initial call
updateTimer();
// Update every second
setInterval(updateTimer, 1000);
