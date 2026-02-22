/*-----------------------------------*\
  #THEME.JS - Dark/Light Mode Toggle
\*-----------------------------------*/

class ThemeManager {
  constructor() {
    this.theme = this.loadTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.createThemeToggle();
    this.attachEventListeners();
  }

  loadTheme() {
    // Check localStorage
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  saveTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
    this.saveTheme(theme);

    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    
    // Trigger animation
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.style.animation = 'none';
      setTimeout(() => {
        toggle.style.animation = 'rotateIn 0.4s ease-out';
      }, 10);
    }
  }

  createThemeToggle() {
    if (document.querySelector('.theme-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
    document.body.appendChild(toggle);
  }

  attachEventListeners() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleTheme());
      
      // Update icon on theme change
      const observer = new MutationObserver(() => {
        const icon = this.theme === 'dark' ? '☀️' : '🌙';
        if (toggle.innerHTML !== icon) {
          toggle.innerHTML = icon;
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    // Listen for system theme preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
