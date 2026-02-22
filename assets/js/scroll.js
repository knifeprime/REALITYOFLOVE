/*-----------------------------------*\
  #SCROLL.JS - Scroll Animations & Progress
\*-----------------------------------*/

class ScrollManager {
  constructor() {
    this.progressBar = null;
    this.scrollPercentage = 0;
    this.init();
  }

  init() {
    this.createProgressBar();
    this.setupScrollListener();
    this.setupRevealAnimations();
  }

  createProgressBar() {
    if (document.querySelector('.scroll-progress-bar')) return;

    this.progressBar = document.createElement('div');
    this.progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(this.progressBar);
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => this.updateScrollProgress());
    // Initial call
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercentage = (window.scrollY / scrollHeight) * 100;

    if (this.progressBar) {
      this.progressBar.style.setProperty('--scroll-progress', this.scrollPercentage + '%');
    }

    // Trigger reveal animations on scroll
    this.checkRevealElements();
  }

  setupRevealAnimations() {
    // Initialize Intersection Observer for reveal animations
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealElement(entry.target);
        }
      });
    }, options);

    // Observe all reveal elements
    document.querySelectorAll('[data-reveal]').forEach(el => {
      this.observer.observe(el);
    });

    // Observe dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-reveal')) {
              this.observer.observe(node);
            }
            if (node.nodeType === 1 && node.querySelectorAll) {
              node.querySelectorAll('[data-reveal]').forEach(el => {
                this.observer.observe(el);
              });
            }
          });
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  revealElement(element) {
    const revealType = element.getAttribute('data-reveal') || 'slideInUp';
    
    element.classList.add(revealType);
    element.classList.add('visible');
    
    this.observer.unobserve(element);

    // Add stagger effect for child elements if needed
    if (element.hasAttribute('data-stagger')) {
      const children = element.querySelectorAll('[data-stagger-item]');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('stagger-item', 'visible');
        }, index * 100);
      });
    }
  }

  checkRevealElements() {
    // Manual reveal check for elements without Intersection Observer
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.classList.add('visible');
      }
    });
  }

  // Utility function to manually trigger reveal
  static reveal(element, type = 'slideInUp', delay = 0) {
    setTimeout(() => {
      element.classList.add(type, 'visible');
    }, delay);
  }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize scroll manager
document.addEventListener('DOMContentLoaded', () => {
  new ScrollManager();
  setupSmoothScroll();
});
