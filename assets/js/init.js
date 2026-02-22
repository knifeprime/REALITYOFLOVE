// Simple init script to ensure theme toggle works
document.addEventListener('DOMContentLoaded', function() {
  // Create theme toggle if it doesn't exist
  if (!document.querySelector('.theme-toggle')) {
    const header = document.querySelector('.header, [data-header]');
    const headerAction = document.querySelector('.header-action');
    
    if (headerAction) {
      const themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('aria-label', 'Toggle Theme');
      themeToggle.setAttribute('title', 'Toggle dark/light mode');
      themeToggle.textContent = '🌙';
      headerAction.insertBefore(themeToggle, headerAction.firstChild);
    }
  }
  
  // Add animation classes to elements
  document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('reveal-stagger');
  });
  
  document.querySelectorAll('.features-item, .event-card, .testi-card').forEach((el) => {
    el.classList.add('reveal-stagger');
  });
});
