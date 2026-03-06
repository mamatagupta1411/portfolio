// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }

  highlightNavLink();
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll(
  '.about-grid, .timeline-item, .project-card, .skill-category, .contact-grid'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ===== EMAILJS CONFIG =====
// Replace the placeholders below with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY  = 'PafdRbpn1PYn8dHF6';   // Account → General → Public Key
const EMAILJS_SERVICE_ID  = 'service_p4y07m9';   // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_22tq8nn';  // Email Templates → Template ID

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
    .then(() => {
      formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formStatus.style.color = '#6c63ff';
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      setTimeout(() => formStatus.textContent = '', 5000);
    })
    .catch((error) => {
      formStatus.textContent = '✗ Something went wrong. Please try again.';
      formStatus.style.color = '#ff6b6b';
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      console.error('EmailJS error:', error);
    });
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();
