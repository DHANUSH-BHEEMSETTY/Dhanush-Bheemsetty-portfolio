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

  // --- Hero Floating Icons Physics (Mouse Repulsion + Multi-Layer Scroll Parallax) ---
  const heroSection = document.getElementById('hero-section');
  const floatingIcons = document.querySelectorAll('.hero-floating-icon');

  // Multi-tier parallax speeds for realistic 3D depth dispersion on scroll
  const iconSpeeds = [
    -0.22,  0.28, -0.15,  0.24,
    -0.28,  0.32, -0.18,  0.22,
    -0.14,  0.26, -0.25,  0.18,
    -0.30,  0.20, -0.16,  0.25
  ];

  const iconPhysics = Array.from(floatingIcons).map((icon, idx) => ({
    el: icon,
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    parallaxSpeed: iconSpeeds[idx % iconSpeeds.length],
  }));

  const updateIconRepulsionTargets = () => {
    if (!heroSection) return;
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) return;

    iconPhysics.forEach((item) => {
      const rect = item.el.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(mouseX - iconCenterX, mouseY - iconCenterY);

      if (distance < 160) {
        const angle = Math.atan2(mouseY - iconCenterY, mouseX - iconCenterX);
        const force = (1 - distance / 160) * 55;
        item.targetX = -Math.cos(angle) * force;
        item.targetY = -Math.sin(angle) * force;
      } else {
        item.targetX = 0;
        item.targetY = 0;
      }
    });
  };

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMouseInWindow && follower) {
      isMouseInWindow = true;
      follower.classList.add('is-active');
    }

    updateIconRepulsionTargets();
  }, { passive: true });

  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement && follower) {
      isMouseInWindow = false;
      follower.classList.remove('is-active');
    }
  });

  // Silky Smooth 60fps Lerp & Spring Loop
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

    // 3. Floating Icons Spring Physics + Scroll Parallax Dispersion
    const scrollY = window.scrollY || window.pageYOffset;
    iconPhysics.forEach((item) => {
      item.currentX += (item.targetX - item.currentX) * 0.15;
      item.currentY += (item.targetY - item.currentY) * 0.15;

      // Combine spring mouse-repulsion with multi-plane scroll parallax
      const parallaxY = scrollY * item.parallaxSpeed;
      const totalY = item.currentY + parallaxY;

      item.el.style.transform = `translate3d(${item.currentX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(updateCursorPhysics);
  };
  requestAnimationFrame(updateCursorPhysics);

  // Dynamic Context-Aware Hover Triggers
  document.addEventListener('mouseover', (e) => {
    if (!follower || !followerLabel) return;

    const target = e.target;
    const isCanvas = target.closest('#hero-canvas-box');
    const isStatus = target.closest('#hiring-status-pill');
    const isCert = target.closest('.cert-img-container, #view-aws-cert-btn, #verify-aws-cert-btn');
    const isBtn = target.closest('.btn-primary, .btn-secondary, .nav-cta-btn, .btn-cta-emerald, .btn-cta-copy, .social-pill, .btn-card-primary, .btn-card-secondary');
    const isTestimonialCard = target.closest('.testimonial-card');
    const isFloatingIcon = target.closest('.hero-floating-icon');
    const isCard = target.closest('.project-card, .award-showcase-box, .marquee-item');
    const isHero = target.closest('.hero-section');

    // Reset modifier classes
    follower.classList.remove('is-hovering-btn', 'is-hovering-canvas', 'is-hovering-status');

    if (isTestimonialCard) {
      follower.classList.add('is-hovering-btn');
      followerLabel.textContent = isTestimonialCard.classList.contains('is-active') ? 'OPEN PROOF ↗' : 'FLIP DECK ⚡';
    } else if (isFloatingIcon) {
      follower.classList.add('is-hovering-btn');
      const tooltip = isFloatingIcon.querySelector('.floating-icon-tooltip');
      followerLabel.textContent = tooltip ? tooltip.textContent.toUpperCase() + ' ⚡' : 'TECH STACK ⚡';
    } else if (isCanvas) {
      follower.classList.add('is-hovering-canvas');
      followerLabel.textContent = 'INTERACT';
    } else if (isStatus) {
      follower.classList.add('is-hovering-status');
      followerLabel.textContent = 'OPEN TO HIRE 🟢';
    } else if (isCert) {
      follower.classList.add('is-hovering-btn');
      followerLabel.textContent = 'VIEW CREDENTIAL ↗';
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

        // Smooth scroll with offset for sticky floating header
        const headerOffset = 90;
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

  // --- 8. Multi-Plane Parallax & Stacking Cards Engine ---
  const initParallaxEngine = () => {
    const cards = Array.from(document.querySelectorAll('.projects-stack .project-card'));
    const heroCanvasWrap = document.querySelector('.canvas-title-wrap');
    const aboutPortraitWrap = document.querySelector('.about-portrait-wrap');
    const totalCards = cards.length;

    const updateParallax = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const windowWidth = window.innerWidth;
      const isPhone = windowWidth <= 480;
      const isTablet = windowWidth <= 940;
      const isMobile = windowWidth <= 940;

      // A. Hero Canvas Subtle Parallax Drift
      if (heroCanvasWrap && scrollY < windowHeight * 1.2) {
        const heroDrift = scrollY * 0.08;
        heroCanvasWrap.style.transform = `translate3d(0, ${heroDrift.toFixed(2)}px, 0)`;
      }

      // B. Stacking Project Cards Multi-Plane Parallax (Motion / Stacking Card)
      if (totalCards > 0) {
        const topOffsetBase = isPhone ? 66 : (isTablet ? 76 : 90);
        const topOffsetStep = isPhone ? 10 : (isTablet ? 16 : 24);

        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const stickyTop = topOffsetBase + i * topOffsetStep;

          // 1. Calculate Entry Progress (from viewport bottom to sticky docking top)
          const enterRange = windowHeight - stickyTop;
          let entryProgress = 1;
          if (enterRange > 0) {
            entryProgress = (windowHeight - rect.top) / enterRange;
          }
          entryProgress = Math.max(0, Math.min(1, entryProgress));

          // 2. Parallax Image Scale & Vertical Travel (Multi-Plane Window Parallax)
          // Emulating Framer Motion: useTransform(scrollYProgress, [0, 1], [1.25, 1.02])
          const img = card.querySelector('.stack-card-img, .project-img-wrapper img');
          if (img) {
            const imgScale = 1.02 + (1 - entryProgress) * 0.18; // 1.20 down to 1.02
            const imgShiftY = (1 - entryProgress) * 36 - 18; // +18px down to -18px
            img.style.transform = `translate3d(0, ${imgShiftY.toFixed(1)}px, 0) scale(${imgScale.toFixed(3)})`;
          }

          // 3. Card Left Text Column Subtle Parallax Lag
          const leftCol = card.querySelector('.stack-card-left');
          if (leftCol && !isMobile) {
            const textLagY = (1 - entryProgress) * 16;
            leftCol.style.transform = `translate3d(0, ${textLagY.toFixed(1)}px, 0)`;
          } else if (leftCol) {
            leftCol.style.transform = '';
          }

          // 4. Stacking Decrement for Preceding Cards as Later Cards Stack Over
          if (i === totalCards - 1) {
            card.style.setProperty('--card-scale', '1');
            card.style.setProperty('--card-brightness', '1');
            return;
          }

          let scaleDecrement = 0;
          let brightnessDecrement = 0;
          const stepScale = 0.038;
          const stepBrightness = 0.055;

          for (let j = i + 1; j < totalCards; j++) {
            const nextCard = cards[j];
            const nextRect = nextCard.getBoundingClientRect();
            const nextStickyTop = topOffsetBase + j * topOffsetStep;
            const range = windowHeight - nextStickyTop;
            let progress = 0;
            if (range > 0) {
              progress = (windowHeight - nextRect.top) / range;
            }
            progress = Math.max(0, Math.min(1, progress));
            scaleDecrement += progress * stepScale;
            brightnessDecrement += progress * stepBrightness;
          }

          const currentScale = Math.max(0.85, 1 - scaleDecrement);
          const currentBrightness = Math.max(0.84, 1 - brightnessDecrement);

          card.style.setProperty('--card-scale', currentScale.toFixed(4));
          card.style.setProperty('--card-brightness', currentBrightness.toFixed(4));
        });
      }

      // C. About Section Studio Portrait 3D Parallax Depth
      if (aboutPortraitWrap) {
        const aboutRect = aboutPortraitWrap.getBoundingClientRect();
        if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
          const centerDelta = (aboutRect.top + aboutRect.height / 2) - windowHeight / 2;
          const pY = centerDelta * 0.08; // Smooth 8% parallax rate
          aboutPortraitWrap.style.transform = `translate3d(0, ${(-pY).toFixed(1)}px, 0)`;
        }
      }
    };

    // rAF-throttled scroll handler for pristine 60fps performance without layout thrashing
    let isTicking = false;
    const onScroll = () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateParallax();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateParallax();

    // Subtle 3D Tilt on the visual mockup canvas (smooth and non-intrusive)
    cards.forEach(card => {
      const visual = card.querySelector('.stack-card-right, .project-visual');
      if (!visual) return;

      card.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        visual.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
        visual.style.transition = 'transform 0.08s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        visual.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        visual.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  };

  initParallaxEngine();

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
      if (window.innerWidth > 940 && navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // --- 12. Aceternity Animated Testimonials Showcase for Awards & Certifications ---
  function initAnimatedTestimonials() {
    const deck = document.getElementById('awards-deck');
    const cards = deck ? Array.from(deck.querySelectorAll('.testimonial-card')) : [];
    const dots = Array.from(document.querySelectorAll('#awards-dots .deck-dot'));
    const prevBtn = document.getElementById('awards-prev-btn');
    const nextBtn = document.getElementById('awards-next-btn');
    const counterCurr = document.getElementById('awards-counter-curr');
    const infoCard = document.getElementById('awards-info-card');
    const badgeEl = document.getElementById('awards-badge');
    const badgeTextEl = document.getElementById('awards-badge-text');
    const nameEl = document.getElementById('awards-name');
    const designationEl = document.getElementById('awards-designation');
    const quoteTextEl = document.getElementById('awards-quote-text');
    const metaStripEl = document.getElementById('awards-meta-strip');
    const actionsEl = document.getElementById('awards-actions');

    if (!deck || cards.length === 0) return;

    const awardsData = [
      {
        badge: 'OFFICIAL AWS CERTIFICATION',
        badgeClass: 'award-header-badge aws-badge',
        badgeIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>',
        name: 'AWS Certified Cloud Practitioner',
        designationHtml: 'Amazon Web Services (AWS) • Validation ID: <code>96da20d36d44477fba59b31a985bcd29</code>',
        quote: 'Formally verified by Amazon Web Services for fluency in cloud infrastructure, core compute/storage (EC2, S3, RDS, Lambda), IAM security policies, and high-availability architecture.',
        meta: [
          '<b>ID:</b> <code>96da20d36d44477fba59b31a985bcd29</code>',
          '<b>Valid:</b> Oct 11, 2026 – Oct 11, 2029',
          '<span class="status-dot-active"></span> Active &amp; Verified',
          'AWS Training &amp; Cert'
        ],
        actions: [
          {
            text: 'View Official Certificate (PDF)',
            url: 'https://drive.google.com/file/d/1W6-QZ9SQtYGLJ5f0MtmlI6Drr4ow3lCu/view?usp=sharing',
            primary: true,
            icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
          },
          {
            text: 'AWS Verification Portal',
            url: 'https://aws.amazon.com/verification',
            primary: false,
            icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>'
          }
        ]
      },
      {
        badge: '🏆 1ST PLACE WINNER',
        badgeClass: 'award-header-badge',
        badgeIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
        name: 'Ranked #1 Startup Concept Across Universities',
        designationHtml: 'VLaunch Pad 2025 • Commended by <b>Dr. Pemmasani Chandra Shekhar</b> (Union Minister of State)',
        quote: 'Awarded 1st Place out of dozens of university startup ventures for HoverCharge. Pitched before venture capitalists and the Union Minister of State, evaluated on autonomous fleet dispatch and unit economics.',
        meta: [
          '🏆 1st Place of 30+ Ventures',
          'VLaunch Pad 2025 Summit',
          'Dr. Pemmasani Chandra Shekhar Commendation',
          'Fleet Dispatch AI'
        ],
        actions: [
          {
            text: 'View Official Commendation Letter',
            url: 'https://drive.google.com/file/d/1wEuhZrC7hCYjdq86LnA1EEZkBDLjqNnJ/view',
            primary: true,
            icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
          }
        ]
      },
      {
        badge: '⚡ LIVE JURY DEFENSE',
        badgeClass: 'award-header-badge',
        badgeIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
        name: 'HoverCharge Venture Defense & Live Demo',
        designationHtml: 'VLaunch Pad 2025 • Jury &amp; Venture Evaluation Committee',
        quote: 'Delivered a live operational defense of the on-demand EV wireless charging architecture. Validated inductive hardware synchronization and driver fleet telemetry before engineering deans and seed investors.',
        meta: [
          '⚡ Live Hardware &amp; App Demo',
          'VC &amp; Deans Jury Panel',
          'Unanimous Top Evaluation',
          'Autonomous Fleet Routing'
        ],
        actions: [
          {
            text: 'Explore HoverCharge Demo',
            url: 'https://hovercharge-react.onrender.com/',
            primary: true,
            icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
          },
          {
            text: 'View Commendation Letter',
            url: 'https://drive.google.com/file/d/1wEuhZrC7hCYjdq86LnA1EEZkBDLjqNnJ/view',
            primary: false,
            icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
          }
        ]
      },
      {
        badge: '🥇 STAGE COMMENDATION',
        badgeClass: 'award-header-badge',
        badgeIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>',
        name: 'Championship Stage Commendation',
        designationHtml: 'VIT-AP University &amp; Ministry of Communications • Innovation Gala',
        quote: 'Honored on the grand convention stage celebrating 0-to-1 startup leadership, deep-tech AI engineering, and high-velocity venture execution recognized across university ecosystems.',
        meta: [
          'VIT-AP Central Convention Stage',
          '🏆 Trophy Plaque &amp; Merit Citation',
          '0-to-1 CleanTech Leadership',
          'Ministry of Communications'
        ],
        actions: [
          {
            text: 'View Award Ceremony Document',
            url: 'https://drive.google.com/file/d/1wEuhZrC7hCYjdq86LnA1EEZkBDLjqNnJ/view',
            primary: true,
            icon: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
          }
        ]
      }
    ];

    let currentIndex = 0;
    const cardAngles = [-4, 3, -3, 4];

    function updateDeckTransforms(newIndex, leap) {
      cards.forEach((card, idx) => {
        const offset = (idx - newIndex + cards.length) % cards.length;
        card.classList.remove('is-leaping');

        if (offset === 0) {
          card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
          card.style.opacity = '1';
          card.style.zIndex = '30';
          card.style.filter = 'blur(0px)';
          card.classList.add('is-active');

          if (leap) {
            void card.offsetWidth; // Trigger reflow
            card.classList.add('is-leaping');
          }
        } else if (offset === 1) {
          const rot = cardAngles[idx];
          card.style.transform = `translate3d(8px, 6px, -20px) rotate(${rot}deg) scale(0.96)`;
          card.style.opacity = '0.78';
          card.style.zIndex = '20';
          card.style.filter = 'blur(0px)';
          card.classList.remove('is-active');
        } else if (offset === 2) {
          const rot = cardAngles[idx];
          card.style.transform = `translate3d(-8px, 12px, -40px) rotate(${rot}deg) scale(0.91)`;
          card.style.opacity = '0.52';
          card.style.zIndex = '10';
          card.style.filter = 'blur(0.5px)';
          card.classList.remove('is-active');
        } else {
          const rot = cardAngles[idx];
          card.style.transform = `translate3d(5px, 18px, -60px) rotate(${rot}deg) scale(0.86)`;
          card.style.opacity = '0.34';
          card.style.zIndex = '5';
          card.style.filter = 'blur(1px)';
          card.classList.remove('is-active');
        }
      });

      // Update dots and counter
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === newIndex);
      });
      if (counterCurr) {
        counterCurr.textContent = `0${newIndex + 1}`;
      }
    }

    function renderInfoPane(index) {
      const data = awardsData[index];
      if (!data) return;

      if (infoCard) {
        infoCard.classList.add('fade-out');
      }

      setTimeout(() => {
        // Badge
        if (badgeEl && badgeTextEl) {
          badgeEl.className = data.badgeClass;
          badgeEl.innerHTML = `${data.badgeIcon}<span id="awards-badge-text">${data.badge}</span>`;
        }

        // Title and Designation
        if (nameEl) nameEl.textContent = data.name;
        if (designationEl) designationEl.innerHTML = data.designationHtml;

        // Quote with Aceternity Word-by-Word Blur Animation
        if (quoteTextEl) {
          quoteTextEl.innerHTML = '';
          const words = data.quote.split(' ');
          const wordSpans = words.map((word) => {
            const span = document.createElement('span');
            span.className = 'word-span';
            span.innerHTML = `${word}&nbsp;`;
            quoteTextEl.appendChild(span);
            return span;
          });

          // Staggered reveal
          wordSpans.forEach((span, i) => {
            setTimeout(() => {
              span.classList.add('is-visible');
            }, 25 + i * 16);
          });
        }

        // Clean Meta Strip
        if (metaStripEl) {
          metaStripEl.innerHTML = data.meta
            .map((item) => `<span class="meta-chip">${item}</span>`)
            .join('');
        }

        // Action Buttons
        if (actionsEl) {
          actionsEl.innerHTML = data.actions
            .map(
              (act) => `
            <a href="${act.url}" target="_blank" class="${act.primary ? 'btn-card-primary' : 'btn-card-secondary'}">
              <span>${act.text}</span>
              ${act.icon}
            </a>
          `
            )
            .join('');
        }

        if (infoCard) {
          infoCard.classList.remove('fade-out');
        }
      }, 140);
    }

    function goToSlide(newIndex, leap = true) {
      if (newIndex === currentIndex && leap) return;
      currentIndex = newIndex;
      updateDeckTransforms(currentIndex, leap);
      renderInfoPane(currentIndex);
    }

    // Initial load
    updateDeckTransforms(0, false);
    renderInfoPane(0);

    // Event Listeners for Nav Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide((currentIndex - 1 + awardsData.length) % awardsData.length, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide((currentIndex + 1) % awardsData.length, true);
      });
    }

    // Dots click
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx)) goToSlide(idx, true);
      });
    });

    // Card click on 3D deck directly switches to clicked card, or opens proof if clicked active card
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          if (idx !== currentIndex) {
            goToSlide(idx, true);
          } else {
            const data = awardsData[currentIndex];
            if (data && data.actions && data.actions.length > 0 && data.actions[0].url) {
              window.open(data.actions[0].url, '_blank', 'noopener,noreferrer');
            }
          }
        }
      });
    });

    // Keyboard navigation when user is over the section
    const awardsSection = document.getElementById('awards');
    if (awardsSection) {
      document.addEventListener('keydown', (e) => {
        const rect = awardsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isInView) return;

        if (e.key === 'ArrowLeft') {
          goToSlide((currentIndex - 1 + awardsData.length) % awardsData.length, true);
        } else if (e.key === 'ArrowRight') {
          goToSlide((currentIndex + 1) % awardsData.length, true);
        }
      });
    }

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    deck.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    deck.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 35) {
        if (swipeDistance < 0) {
          goToSlide((currentIndex + 1) % awardsData.length, true);
        } else {
          goToSlide((currentIndex - 1 + awardsData.length) % awardsData.length, true);
        }
      }
    }, { passive: true });
  }

  initAnimatedTestimonials();

  // --- 13. Console Greeting for Tech Recruiters & Engineering Leads ---
  console.log(
    '%c🚀 Dhanush Bheemisetty — AI Engineer & Venture Builder',
    'color: #10B981; font-size: 16px; font-weight: bold; font-family: monospace;'
  );
  console.log(
    '%cActively seeking SDE, AI Engineer & Full-Stack roles for the 2025-2026 hiring season.\nContact: dhanushbheemisetty0@gmail.com | +91 7989107910\nHoverCharge Demo: https://hovercharge-react.onrender.com/',
    'color: #4B5563; font-size: 12px; font-family: sans-serif;'
  );

});
