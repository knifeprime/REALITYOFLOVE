/*-----------------------------------*\
  #CURSOR.JS - Custom Cursor Tracking
\*-----------------------------------*/

class CustomCursor {
  constructor() {
    this.cursor = null;
    this.trails = [];
    this.maxTrails = 5;
    this.isDesktop = window.innerWidth > 640;
    
    if (this.isDesktop) {
      this.init();
    }

    // Re-init on resize
    window.addEventListener('resize', () => {
      const newIsDesktop = window.innerWidth > 640;
      if (newIsDesktop !== this.isDesktop) {
        this.isDesktop = newIsDesktop;
        if (this.isDesktop) {
          this.init();
        } else {
          this.destroy();
        }
      }
    });
  }

  init() {
    this.createCursor();
    this.attachEventListeners();
    this.animate();
  }

  destroy() {
    if (this.cursor) {
      this.cursor.remove();
      this.cursor = null;
    }
    this.trails.forEach(trail => trail.remove());
    this.trails = [];
  }

  createCursor() {
    if (this.cursor) return;

    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
  }

  attachEventListeners() {
    document.addEventListener('mousemove', (e) => this.updateCursorPosition(e));
    document.addEventListener('mouseenter', () => this.showCursor());
    document.addEventListener('mouseleave', () => this.hideCursor());
    document.addEventListener('mousedown', () => this.clickEffect());
    document.addEventListener('mouseup', () => this.releaseEffect());

    // Add hover effect to interactive elements
    this.setupHoverEffects();
  }

  updateCursorPosition(e) {
    if (!this.cursor) return;

    const x = e.clientX;
    const y = e.clientY;

    this.cursor.style.left = x + 'px';
    this.cursor.style.top = y + 'px';

    // Create trail
    this.createTrail(x, y);
  }

  createTrail(x, y) {
    if (this.trails.length >= this.maxTrails) {
      const oldTrail = this.trails.shift();
      oldTrail.remove();
    }

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);

    this.trails.push(trail);

    // Fade out and remove
    setTimeout(() => {
      trail.style.opacity = '0';
      trail.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => trail.remove(), 500);
    }, 100);
  }

  showCursor() {
    if (this.cursor) {
      this.cursor.style.opacity = '1';
    }
  }

  hideCursor() {
    if (this.cursor) {
      this.cursor.style.opacity = '0';
    }
  }

  clickEffect() {
    if (this.cursor) {
      this.cursor.classList.add('click');
      setTimeout(() => this.cursor.classList.remove('click'), 400);
    }
  }

  releaseEffect() {
    if (this.cursor) {
      this.cursor.classList.remove('click');
    }
  }

  setupHoverEffects() {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .clickable, input, textarea');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.hoverOn());
      el.addEventListener('mouseleave', () => this.hoverOff());
    });

    // Observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const newInteractive = node.querySelectorAll('a, button, [role="button"], .clickable, input, textarea');
              newInteractive.forEach(el => {
                el.addEventListener('mouseenter', () => this.hoverOn());
                el.addEventListener('mouseleave', () => this.hoverOff());
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  hoverOn() {
    if (this.cursor) {
      this.cursor.classList.add('hover');
    }
  }

  hoverOff() {
    if (this.cursor) {
      this.cursor.classList.remove('hover');
    }
  }

  animate() {
    if (this.isDesktop) {
      requestAnimationFrame(() => this.animate());
    }
  }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});
