// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// ===== SMOOTH SCROLL =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll(
  '.service-card, .pricing-card, .trainer-card, .testimonial-card, .contact-item, .about-grid, .section-header'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Staggered animation for grid cards
const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
      siblings.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
      });
      gridObserver.unobserve(entry.target.parentElement);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.services-grid, .pricing-grid, .trainers-grid, .testimonials-grid').forEach(grid => {
  gridObserver.observe(grid);
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const success = document.getElementById('formSuccess');

  // Phone validation - exactly 10 digits
  const phoneInput = e.target.querySelector('input[type="tel"]');
  const phoneVal = phoneInput.value.replace(/\s/g, '');
  if (phoneVal.length !== 10 || !/^\d{10}$/.test(phoneVal)) {
    phoneInput.style.borderColor = '#e31e24';
    phoneInput.focus();
    phoneInput.placeholder = '⚠️ Enter valid 10-digit number';
    setTimeout(() => {
      phoneInput.style.borderColor = '';
      phoneInput.placeholder = 'Phone Number';
    }, 3000);
    return;
  }
  phoneInput.style.borderColor = '';

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✅ Sent!';
    success.style.display = 'block';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      success.style.display = 'none';

      // Scroll back to hero (top of page)
      document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }, 1200);
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#e31e24';
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text.includes('1200')) animateCounter(num, 1200, '+');
        else if (text.includes('15')) animateCounter(num, 15, '+');
        else if (text.includes('50')) animateCounter(num, 50, '+');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);