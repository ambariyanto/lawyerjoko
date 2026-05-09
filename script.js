/**
 * Joko Siswanto Lawyer Website
 * Plain JavaScript - No frameworks
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('active');
      
      if (isOpen) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
      } else {
        mobileMenu.classList.add('active');
        mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'close';
      }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    mobileMenuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
      });
    });
  }

  // ===== FAQ Accordion =====
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // ===== Contact Form - Redirect to WhatsApp =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validate form
      if (!name || !phone || !email || !message) {
        alert('Mohon lengkapi semua field.');
        return;
      }
      
      // Create WhatsApp message
      const waMessage = `Halo Pak Joko, saya ${name}.

Email: ${email}
Telepon: ${phone}

Pesan:
${message}`;
      
      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/6281330408000?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(waUrl, '_blank');
      
      // Reset form
      contactForm.reset();
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== Header Shadow on Scroll =====
  const header = document.getElementById('header');
  
  if (header) {
    function updateHeaderShadow() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
    
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    updateHeaderShadow();
  }

  // ===== Active Navigation Highlighting =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');
  
  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = 'var(--primary)';
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation, { passive: true });

  // ===== Intersection Observer for Fade-in Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class and observe
  const fadeElements = document.querySelectorAll('.service-card, .testimonial-card, .reason-item, .badge-item, .credential-item');
  fadeElements.forEach(function(el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease ' + (index % 3) * 0.1 + 's, transform 0.5s ease ' + (index % 3) * 0.1 + 's';
    fadeObserver.observe(el);
  });

  // CSS for is-visible class
  const style = document.createElement('style');
  style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ===== Phone Number Click Tracking (Optional Analytics) =====
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Analytics tracking can be added here
      console.log('Phone link clicked:', this.href);
    });
  });

  // ===== WhatsApp Click Tracking (Optional Analytics) =====
  const waLinks = document.querySelectorAll('a[href^="https://wa.me"]');
  waLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Analytics tracking can be added here
      console.log('WhatsApp link clicked');
    });
  });

});
