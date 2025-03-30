// Add this JavaScript to handle enhanced navbar functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggle && navbarCollapse) {
      navbarToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        navbarCollapse.classList.toggle('show');
        
        // Animate hamburger to X
        this.querySelectorAll('.toggle-line').forEach(line => {
          line.classList.toggle('active');
        });
      });
    }
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
      
      // If we're at the top of the page, highlight Home
      if (scrollPosition < 200) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.textContent.trim() === 'Home') {
            link.classList.add('active');
          }
        });
      }
    }
    
    // Enhanced sticky effect
    const navbar = document.querySelector('.navbar');
    
    function stickyNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Run on page load and scroll
    highlightNavOnScroll();
    stickyNavbar();
    window.addEventListener('scroll', function() {
      highlightNavOnScroll();
      stickyNavbar();
    });
    
    // Search functionality animation
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
      searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
          // Here you would implement actual search functionality
          console.log('Searching for:', searchInput.value);
          
          // Example animation
          searchBtn.classList.add('searching');
          setTimeout(() => {
            searchBtn.classList.remove('searching');
          }, 1000);
        } else {
          searchInput.focus();
        }
      });
    }
  }); 