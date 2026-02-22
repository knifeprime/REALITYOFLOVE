'use strict';

/**
 * navbar toggle - Modern Mobile Menu
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

// Toggle navbar when menu button is clicked
if (navOpenBtn && navCloseBtn && navbar) {
  navOpenBtn.addEventListener("click", () => {
    navbar.classList.add("navbar--active");
    document.body.style.overflow = "hidden";
  });

  navCloseBtn.addEventListener("click", () => {
    navbar.classList.remove("navbar--active");
    document.body.style.overflow = "auto";
  });
}

/**
 * Toggle navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

navbarLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar?.classList.remove("navbar--active");
    document.body.style.overflow = "auto";
  });
});

/**
 * Header scroll effect
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header?.classList.add("header--active");
  } else {
    header?.classList.remove("header--active");
  }
});

/**
 * Close mobile menu when clicking outside
 */

document.addEventListener("click", (e) => {
  if (navbar?.classList.contains("navbar--active")) {
    if (!navbar.contains(e.target) && !navOpenBtn.contains(e.target)) {
      navbar.classList.remove("navbar--active");
      document.body.style.overflow = "auto";
    }
  }
});

/**
 * Smooth scroll effect for better UX
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
