'use strict';

// ===== DARK MODE TOGGLE =====
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', savedTheme === 'dark');
updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if (themeToggle) {
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
  }
}

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-stagger, .features-item, .event-card, .testi-card').forEach((el) => {
  el.classList.add('reveal-stagger');
  observer.observe(el);
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header') || document.querySelector('[data-header]');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    header?.classList.add('scrolled');
    header?.classList.add('active');
  } else {
    header?.classList.remove('scrolled');
    header?.classList.remove('active');
  }
  
  lastScrollTop = scrollTop;
});

// ===== MOBILE MENU TOGGLE =====
const navOpenBtn = document.querySelector('[data-nav-open-btn]') || document.querySelector('.nav-open-btn');
const navCloseBtn = document.querySelector('[data-nav-close-btn]') || document.querySelector('.nav-close-btn');
const navbar = document.querySelector('[data-navbar]') || document.querySelector('.navbar');

if (navOpenBtn && navbar) {
  navOpenBtn.addEventListener('click', () => {
    navbar.classList.add('active');
    body.style.overflow = 'hidden';
  });
}

if (navCloseBtn && navbar) {
  navCloseBtn.addEventListener('click', () => {
    navbar.classList.remove('active');
    body.style.overflow = 'auto';
  });
}

// Close mobile menu when link is clicked
document.querySelectorAll('[data-nav-link], .navbar-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar) {
      navbar.classList.remove('active');
      body.style.overflow = 'auto';
    }
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const headerHeight = header?.offsetHeight || 80;
      const targetTop = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CUSTOM SCROLL PROGRESS BAR =====
const createScrollProgressBar = () => {
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #8b5cf6, #06b6d4);
      z-index: 1001;
      transition: width 0.2s ease;
      width: 0%;
    `;
    document.body.appendChild(progressBar);
  }
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

createScrollProgressBar();

// ===== BUTTON HOVER EFFECTS =====
document.querySelectorAll('.btn, button').forEach((btn) => {
  btn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px)';
  });
  
  btn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape' && navbar) {
    navbar.classList.remove('active');
    body.style.overflow = 'auto';
  }
});

// ===== MOBILE TOUCH OPTIMIZATION =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  // Swipe right to open mobile menu
  if (touchEndX > touchStartX + 50 && touchStartX < 50) {
    if (navOpenBtn && navbar) {
      navbar.classList.add('active');
      body.style.overflow = 'hidden';
    }
  }
  
  // Swipe left to close mobile menu
  if (touchEndX < touchStartX - 50 && navbar?.classList.contains('active')) {
    navbar.classList.remove('active');
    body.style.overflow = 'auto';
  }
}

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
  // Trigger reveals on page load
  document.querySelectorAll('.reveal-stagger').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('active');
    }, index * 50);
  });
});

// ===== ADD ANIMATION KEYFRAMES DYNAMICALLY =====
const addAnimationKeyframes = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

addAnimationKeyframes();

// ===== RIPPLE EFFECT ON CLICK =====
document.querySelectorAll('.btn, a, button').forEach((element) => {
  element.addEventListener('click', function (e) {
    // Don't create ripple for links that navigate
    if (this.tagName === 'A' && !this.href.startsWith('#')) return;
    
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: rippleEffect 0.6s ease-out;
    `;
    
    if (this.style.position !== 'relative' && this.style.position !== 'absolute' && this.tagName !== 'A') {
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
    }
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===== CONSOLE LOG =====
console.log('[v0] Modern redesign with dark mode, animations, and custom cursor loaded successfully!');
