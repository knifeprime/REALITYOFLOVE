/*-----------------------------------*\
  #ANIMATIONS.JS - Interactive Effects
\*-----------------------------------*/

class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupButtonAnimations();
    this.setupCardAnimations();
    this.setupParallaxEffect();
    this.setupHoverGlow();
  }

  setupButtonAnimations() {
    const buttons = document.querySelectorAll('button, .btn, [role="button"]');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.animation = 'hoverLift 0.3s ease-out forwards';
      });

      button.addEventListener('mouseleave', () => {
        button.style.animation = 'none';
      });

      button.addEventListener('click', () => {
        button.style.animation = 'buttonPulse 0.4s ease-out';
      });
    });
  }

  setupCardAnimations() {
    const cards = document.querySelectorAll('[data-card], .card, .feature-card, .testimonial-card');
    
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = 'var(--shadow-lg)';
        card.style.transition = 'all var(--transition-normal)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-md)';
      });
    });
  }

  setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = window.scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupHoverGlow() {
    const glowElements = document.querySelectorAll('[data-glow]');
    
    glowElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('glow-effect');
      });

      element.addEventListener('mouseleave', () => {
        element.classList.remove('glow-effect');
      });
    });
  }

  // Utility: Add animation to element
  static animateElement(element, animation, duration = 600) {
    return new Promise((resolve) => {
      element.style.animation = `${animation} ${duration}ms ease-out forwards`;
      setTimeout(() => {
        element.style.animation = 'none';
        resolve();
      }, duration);
    });
  }

  // Utility: Stagger animation for multiple elements
  static staggerAnimation(elements, animation, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        AnimationManager.animateElement(element, animation);
      }, index * delay);
    });
  }

  // Utility: Fade in all reveal elements on page load
  static revealAllElements() {
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);
    });
  }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  new AnimationManager();

  // Add reveal effect to common elements if not already specified
  document.querySelectorAll('section, .hero, .features-list li, .cta, .testi-card').forEach(el => {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', 'slideInUp');
    }
  });
});

// Add CSS class for glow effect
const style = document.createElement('style');
style.textContent = `
  .glow-effect {
    animation: glow 0.6s ease-out forwards !important;
  }
`;
document.head.appendChild(style);
