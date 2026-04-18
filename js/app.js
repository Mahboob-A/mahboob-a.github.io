/**
 * Main JavaScript for Mahboob Alam's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initializeAnimations();

  // Add smooth scrolling for anchor links
  initializeSmoothScrolling();

  // Add active state to links
  initializeActiveLinks();

  // Initialize decorative vine canopy
  initializeVineCanopy();
});

function initializeVineCanopy() {
  if (window.innerWidth < 1024) {
    return;
  }

  const heroSection = document.querySelector('.page-header');
  if (!heroSection) {
    return;
  }

  const vineCanopy = document.createElement('div');
  vineCanopy.id = 'vine-canopy';
  document.body.appendChild(vineCanopy);

  const anchorLine = document.createElement('div');
  anchorLine.id = 'vine-anchor-line';
  vineCanopy.appendChild(anchorLine);

  const strandCount = 5 + Math.floor(Math.random() * 4);
  const strands = [];

  for (let index = 0; index < strandCount; index += 1) {
    const strand = document.createElement('div');
    strand.className = 'vine-strand';

    const cable = document.createElement('div');
    cable.className = 'vine-cable';
    strand.appendChild(cable);

    const horizontalPercent = (index / (strandCount - 1)) * 100;
    const horizontalOffset = (Math.random() - 0.5) * 2;
    const strandHeight = 48 + Math.random() * 36;

    strand.style.left = `${horizontalPercent + horizontalOffset}%`;
    strand.style.setProperty('--vine-height', `${strandHeight}vh`);
    cable.style.setProperty('--sway-duration', `${8 + Math.random() * 7}s`);
    cable.style.setProperty('--sway-delay', `${Math.random() * 3.2}s`);
    cable.style.setProperty('--sway-span', `${7 + Math.random() * 8}px`);
    cable.style.setProperty('--tilt-span', `${1.1 + Math.random() * 1.8}deg`);

    const curvatureSeed = Math.random() * Math.PI * 2;
    const curvatureIntensity = 2.8 + Math.random() * 2.8;

    const segmentCount = 18 + Math.floor(Math.random() * 11);
    for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
      const segment = document.createElement('span');
      segment.className = 'vine-segment';

      const segmentProgress = segmentIndex / (segmentCount - 1);
      const segTop = segmentProgress * 100;
      const wavePrimary = Math.sin(segmentProgress * 3.8 + curvatureSeed);
      const waveSecondary = Math.sin(segmentProgress * 9.3 + curvatureSeed * 1.28) * 0.38;
      const segOffset = wavePrimary * curvatureIntensity + waveSecondary * 2.2 + (Math.random() - 0.5) * 1.1;
      const segRot = wavePrimary * 16 + waveSecondary * 24 + segmentProgress * 4;
      const segHeight = 11 + Math.random() * 7;
      const segWidth = 1.3 + (1 - segmentProgress) * 1.5 + Math.random() * 0.35;
      const segShade = 34 + Math.random() * 10 - segmentProgress * 4;
      const segAlpha = 0.46 + (1 - segmentProgress) * 0.28;
      const segShadeLight = Math.min(58, segShade + 10);
      const segShadeDark = Math.max(18, segShade - 10);
      const segAlphaLight = Math.min(0.95, segAlpha + 0.14);
      const segAlphaDark = Math.max(0.22, segAlpha - 0.1);

      segment.style.setProperty('--seg-top', `${segTop}%`);
      segment.style.setProperty('--seg-offset', `${segOffset.toFixed(2)}px`);
      segment.style.setProperty('--seg-rot', `${segRot.toFixed(2)}deg`);
      segment.style.setProperty('--seg-height', `${segHeight}px`);
      segment.style.setProperty('--seg-width', `${segWidth.toFixed(2)}px`);
      segment.style.setProperty('--seg-shade-light', `${segShadeLight.toFixed(1)}%`);
      segment.style.setProperty('--seg-shade', `${segShade.toFixed(1)}%`);
      segment.style.setProperty('--seg-shade-dark', `${segShadeDark.toFixed(1)}%`);
      segment.style.setProperty('--seg-alpha-light', `${segAlphaLight.toFixed(2)}`);
      segment.style.setProperty('--seg-alpha', `${segAlpha.toFixed(2)}`);
      segment.style.setProperty('--seg-alpha-dark', `${segAlphaDark.toFixed(2)}`);

      cable.appendChild(segment);
    }

    const leafCount = 7 + Math.floor(Math.random() * 5);
    for (let leafIndex = 0; leafIndex < leafCount; leafIndex += 1) {
      const leaf = document.createElement('span');
      leaf.className = 'vine-leaf';

      const blade = document.createElement('span');
      blade.className = 'vine-leaf-blade';
      leaf.appendChild(blade);

      const leafProgress = (leafIndex + 1) / (leafCount + 1);
      const topPercent = 8 + leafProgress * 84 + (Math.random() * 6 - 3);
      const side = leafIndex % 2 === 0 ? -1 : 1;
      const sideOffset = side * (8 + leafProgress * 7 + Math.random() * 7);
      const rotation = side * (14 + leafProgress * 32 + Math.random() * 18);
      const leafWidth = 9 + leafProgress * 5 + Math.random() * 2.4;
      const leafHeight = leafWidth * (1.08 + Math.random() * 0.24);
      const leafHue = 104 + Math.random() * 15;
      const leafSat = 34 + Math.random() * 16;
      const leafLight = 33 + Math.random() * 11;
      const leafDark = Math.max(18, leafLight - (10 + Math.random() * 6));

      leaf.style.setProperty('--leaf-top', `${topPercent}%`);
      leaf.style.setProperty('--leaf-left', `${50 + sideOffset}%`);
      leaf.style.setProperty('--leaf-rot', `${rotation}deg`);
      leaf.style.setProperty('--leaf-w', `${leafWidth.toFixed(2)}px`);
      leaf.style.setProperty('--leaf-h', `${leafHeight.toFixed(2)}px`);
      leaf.style.setProperty('--leaf-delay', `${Math.random() * 2.8}s`);
      leaf.style.setProperty('--leaf-duration', `${4.5 + Math.random() * 3.5}s`);
      leaf.style.setProperty('--leaf-hue', `${leafHue.toFixed(1)}`);
      leaf.style.setProperty('--leaf-sat', `${leafSat.toFixed(1)}%`);
      leaf.style.setProperty('--leaf-light', `${leafLight.toFixed(1)}%`);
      leaf.style.setProperty('--leaf-dark', `${leafDark.toFixed(1)}%`);
      leaf.style.setProperty('--leaf-pop', `${(0.7 + Math.random() * 0.6).toFixed(2)}`);

      cable.appendChild(leaf);
    }

    vineCanopy.appendChild(strand);
    strands.push(strand);
  }

  const getProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      return 0;
    }

    const heroEnd = heroSection.offsetTop + heroSection.offsetHeight;
    const start = Math.max(0, heroEnd - window.innerHeight * 0.08);
    const revealDistance = Math.min(Math.max(900, window.innerHeight * 1.35), Math.max(900, maxScroll - start));

    return Math.min(1, Math.max(0, (window.scrollY - start) / revealDistance));
  };

  let ticking = false;
  let windForce = 0;
  let windDirection = 0;
  let windFrame = null;
  let lastScrollY = window.scrollY;
  let lastWindSample = performance.now();

  const setWind = () => {
    vineCanopy.style.setProperty('--wind-force', windForce.toFixed(3));
    vineCanopy.style.setProperty('--wind-direction', windDirection.toFixed(3));
  };

  const decayWind = () => {
    windForce *= 0.93;
    windDirection *= 0.9;

    if (Math.abs(windForce) < 0.01 && Math.abs(windDirection) < 0.01) {
      windForce = 0;
      windDirection = 0;
      setWind();
      windFrame = null;
      return;
    }

    setWind();
    windFrame = window.requestAnimationFrame(decayWind);
  };

  const captureBreeze = () => {
    const now = performance.now();
    const deltaY = window.scrollY - lastScrollY;
    const deltaTime = Math.max(16, now - lastWindSample);
    const velocity = deltaY / deltaTime;
    const scrollForce = Math.min(1.2, Math.abs(velocity) * 5.4);

    windDirection = velocity === 0 ? windDirection * 0.85 : Math.sign(velocity);
    windForce = Math.max(-1.4, Math.min(1.4, windForce * 0.6 + windDirection * scrollForce));

    lastScrollY = window.scrollY;
    lastWindSample = now;
    setWind();

    if (!windFrame) {
      windFrame = window.requestAnimationFrame(decayWind);
    }
  };

  const updateStrands = () => {
    const progress = getProgress();
    const heroRect = heroSection.getBoundingClientRect();
    const anchorTop = Math.max(0, Math.min(window.innerHeight * 0.33, heroRect.bottom + 8));

    anchorLine.style.top = `${anchorTop}px`;
    anchorLine.style.opacity = `${progress * 0.92}`;
    anchorLine.style.transform = `scaleX(${0.92 + progress * 0.08})`;

    strands.forEach((strand, index) => {
      const threshold = index / (strandCount - 1);
      const activationWindow = 0.34;
      const local = Math.min(1, Math.max(0, (progress - threshold * 0.42) / activationWindow));
      const eased = local * local * (3 - 2 * local);

      strand.style.opacity = `${eased * 0.96}`;
      strand.style.top = `${anchorTop + 10}px`;
      strand.style.transform = `translateX(-50%) scaleY(${0.06 + eased * 0.94})`;
      strand.style.setProperty('--strand-depth', `${(0.84 + eased * 0.16).toFixed(3)}`);
    });
  };

  const onScroll = () => {
    captureBreeze();

    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        updateStrands();
        ticking = false;
      });
    }
  };

  updateStrands();
  setWind();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    lastScrollY = window.scrollY;
    lastWindSample = performance.now();
    onScroll();
  });
}

/**
 * Initialize animations for various elements
 */
function initializeAnimations() {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    // Stagger the animations
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 100 * index);
  });

  // Add hover effects to links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transition = 'color 0.3s ease';
    });
  });

  // Add hover effects to project cards
  const figures = document.querySelectorAll('.gallery figure');
  figures.forEach(figure => {
    figure.addEventListener('mouseenter', () => {
      figure.style.transform = 'translateY(-5px)';
      figure.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });

    figure.addEventListener('mouseleave', () => {
      figure.style.transform = 'translateY(0)';
      figure.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
  });
}

/**
 * Add smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add active state to links based on current section
 */
function initializeActiveLinks() {
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Handle contact form submission
 * Note: This is a placeholder function to be implemented if a contact form is added
 */
function handleContactFormSubmission(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());

  // Show sending state
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // In a real implementation, you would send this data to a server endpoint
    console.log('Form data:', formObject);

    // Show success message
    const formContainer = event.target.parentElement;
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';

    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
  }, 1500);
}
