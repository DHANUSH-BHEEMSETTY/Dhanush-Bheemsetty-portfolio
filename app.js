/**
 * Dhanush Bheemisetty — Portfolio Interactivity & Section-Specific Animations
 * Inspired by Kartik Goel Portfolio Experience
 * Smooth, non-intrusive, 60fps micro-animations and seamless page transitions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Seamless Page Entrance Transition ---
  const overlay = document.getElementById('page-transition-overlay');
  if (overlay) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        overlay.classList.add('loaded');
      }, 60);
    });
  }

  // --- 2. Top Scroll & Navigation Progress Bar ---
  const progressBar = document.getElementById('page-progress');

  const updateProgressBar = () => {
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
  };

  window.addEventListener('scroll', updateProgressBar, { passive: true });

  // --- 3. Ambient Spotlight & Interactive Hover Arrow Follower ---
  const glow = document.getElementById('ambient-glow');
  const follower = document.getElementById('cursor-follower');
  const followerLabel = document.getElementById('follower-label');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;
  let isMouseInWindow = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMouseInWindow && follower) {
      isMouseInWindow = true;
      follower.classList.add('is-active');
    }
  });

  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement && follower) {
      isMouseInWindow = false;
      follower.classList.remove('is-active');
    }
  });

  // Silky Smooth 60fps Lerp Loop
  const updateCursorPhysics = () => {
    // 1. Ambient Spotlight
    if (glow) {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
    }

    // 2. Interactive Hover Arrow Follower
    if (follower && isMouseInWindow) {
      followerX += (mouseX - followerX) * 0.22;
      followerY += (mouseY - followerY) * 0.22;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    }

    requestAnimationFrame(updateCursorPhysics);
  };
  requestAnimationFrame(updateCursorPhysics);

  // Dynamic Context-Aware Hover Triggers
  document.addEventListener('mouseover', (e) => {
    if (!follower || !followerLabel) return;

    const target = e.target;
    const isCanvas = target.closest('#hero-canvas-box');
    const isStatus = target.closest('#hiring-status-pill');
    const isBtn = target.closest('.btn-primary, .btn-secondary, .nav-cta-btn, .btn-cta-emerald, .btn-cta-copy, .social-pill');
    const isCard = target.closest('.project-card, .sidequest-card, .award-showcase-box, .marquee-item');
    const isHero = target.closest('.hero-section');

    // Reset modifier classes
    follower.classList.remove('is-hovering-btn', 'is-hovering-canvas', 'is-hovering-status');

    if (isCanvas) {
      follower.classList.add('is-hovering-canvas');
      followerLabel.textContent = 'INTERACT';
    } else if (isStatus) {
      follower.classList.add('is-hovering-status');
      followerLabel.textContent = 'OPEN TO HIRE 🟢';
    } else if (isBtn) {
      follower.classList.add('is-hovering-btn');
      followerLabel.textContent = 'CLICK ↗';
    } else if (isCard) {
      follower.classList.add('is-hovering-btn');
      followerLabel.textContent = 'EXPLORE ↗';
    } else if (isHero) {
      followerLabel.textContent = 'EXPLORE';
    } else {
      followerLabel.textContent = 'DHANUSH.AI';
    }
  });

  // --- 4. Scroll-Driven Section Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --- 5. Sticky Navigation Header Elevation & Scroll Spy ---
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main > section, section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Spy: Highlight active nav link
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.slice(1) === currentSectionId) {
        link.classList.add('active');
      } else if (href && href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }, { passive: true });

  // --- 6. Smooth Page Link Transitions & Section Focus Highlight ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();

        // Animate top progress bar for a modern "loading" pulse
        if (progressBar) {
          progressBar.style.transition = 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          progressBar.style.width = '75%';
          setTimeout(() => {
            progressBar.style.width = '100%';
            setTimeout(() => {
              progressBar.style.transition = 'width 0.12s ease-out';
              updateProgressBar();
            }, 300);
          }, 200);
        }

        // Smooth scroll with offset for sticky header
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Trigger subtle section highlight animation
        const titleEl = targetEl.querySelector('.section-title') || targetEl;
        titleEl.classList.remove('section-highlight');
        void titleEl.offsetWidth; // Trigger reflow
        titleEl.classList.add('section-highlight');

        // Close mobile nav if open
        const navMenu = document.getElementById('nav-menu');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        if (navMenu?.classList.contains('open')) {
          navMenu.classList.remove('open');
          if (mobileBtn) mobileBtn.textContent = '☰';
        }
      }
    });
  });

  // --- 8. 3D Perspective Card Tilt on Mouse Move ---
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Small degrees (max 2.2deg) for subtle, smooth feedback
      const rotateX = ((y - centerY) / centerY) * -2.2;
      const rotateY = ((x - centerX) / centerX) * 2.2;

      card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // --- 9. Copy Email to Clipboard with Toast Notification ---
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'dhanushbheemisetty0@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard: ' + email);
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email copied: ' + email);
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    const textSpan = toast.querySelector('span');
    if (textSpan && message) textSpan.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- 10. Mobile Navigation Toggle & Drawer Management ---
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  const closeMobileNav = () => {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (mobileBtn) {
        mobileBtn.textContent = '☰';
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    }
  };

  const openMobileNav = () => {
    if (navMenu) {
      navMenu.classList.add('open');
      if (mobileBtn) {
        mobileBtn.textContent = '✕';
        mobileBtn.setAttribute('aria-expanded', 'true');
      }
    }
  };

  if (mobileBtn && navMenu) {
    mobileBtn.setAttribute('aria-expanded', 'false');

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when clicking outside of the navigation
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open')) {
        const isClickInsideNav = navMenu.contains(e.target) || mobileBtn.contains(e.target);
        if (!isClickInsideNav) {
          closeMobileNav();
        }
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Close automatically when resized past mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 890 && navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // --- 11. Interactive Hero Canvas Selection Box ---
  const canvasBox = document.getElementById('hero-canvas-box');

  if (canvasBox) {
    canvasBox.addEventListener('click', () => {
      canvasBox.style.transform = 'scale(0.96)';
      setTimeout(() => {
        canvasBox.style.transform = 'scale(1)';
      }, 150);
      showToast('⚡ 0-to-1 AI Builder & Vibe Coder ready to ship!');
    });
  }

  // --- 12. Console Greeting for Tech Recruiters & Engineering Leads ---
  console.log(
    '%c🚀 Dhanush Bheemisetty — AI Engineer & Venture Builder',
    'color: #10B981; font-size: 16px; font-weight: bold; font-family: monospace;'
  );
  console.log(
    '%cActively seeking SDE, AI Engineer & Full-Stack roles for the 2025-2026 hiring season.\nContact: dhanushbheemisetty0@gmail.com | +91 7989107910\nHoverCharge Demo: https://hovercharge-react.onrender.com/',
    'color: #4B5563; font-size: 12px; font-family: sans-serif;'
  );

});
