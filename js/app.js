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

    const horizontalPercent = (index / (strandCount - 1)) * 100;
    const horizontalOffset = (Math.random() - 0.5) * 1.4;
    const strandHeight = 42 + Math.random() * 38;

    strand.style.left = `${horizontalPercent + horizontalOffset}%`;
    strand.style.setProperty('--vine-height', `${strandHeight}vh`);
    strand.style.setProperty('--sway-duration', `${6 + Math.random() * 5}s`);
    strand.style.setProperty('--sway-delay', `${Math.random() * 2.5}s`);

    const segmentCount = 16 + Math.floor(Math.random() * 8);
    for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
      const segment = document.createElement('span');
      segment.className = 'vine-segment';

      const segTop = (segmentIndex / segmentCount) * 100;
      const segWave = Math.sin(segmentIndex * 0.78 + index * 0.31);
      const segOffset = segWave * (4 + Math.random() * 2.5);
      const segRot = segWave * (11 + Math.random() * 8);

      segment.style.setProperty('--seg-top', `${segTop}%`);
      segment.style.setProperty('--seg-offset', `${segOffset.toFixed(2)}px`);
      segment.style.setProperty('--seg-rot', `${segRot.toFixed(2)}deg`);
      segment.style.setProperty('--seg-height', `${13 + Math.random() * 7}px`);

      strand.appendChild(segment);
    }

    const leafCount = 4 + Math.floor(Math.random() * 4);
    for (let leafIndex = 0; leafIndex < leafCount; leafIndex += 1) {
      const leaf = document.createElement('span');
      leaf.className = 'vine-leaf';

      const topPercent = 10 + (leafIndex / (leafCount + 1)) * 80 + (Math.random() * 6 - 3);
      const sideOffset = (leafIndex % 2 === 0 ? -1 : 1) * (6 + Math.random() * 7);
      const rotation = (leafIndex % 2 === 0 ? -1 : 1) * (18 + Math.random() * 30);

      leaf.style.setProperty('--leaf-top', `${topPercent}%`);
      leaf.style.setProperty('--leaf-left', `${50 + sideOffset}%`);
      leaf.style.setProperty('--leaf-rot', `${rotation}deg`);
      leaf.style.setProperty('--leaf-w', `${9 + Math.random() * 4}px`);
      leaf.style.setProperty('--leaf-h', `${14 + Math.random() * 7}px`);

      strand.appendChild(leaf);
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

  const updateStrands = () => {
    const progress = getProgress();
    const heroRect = heroSection.getBoundingClientRect();
    const anchorTop = Math.max(0, Math.min(window.innerHeight * 0.33, heroRect.bottom));

    anchorLine.style.top = `${anchorTop}px`;
    anchorLine.style.opacity = `${progress * 0.92}`;
    anchorLine.style.transform = `scaleX(${0.92 + progress * 0.08})`;

    strands.forEach((strand, index) => {
      const threshold = index / (strandCount - 1);
      const activationWindow = 0.2;
      const local = Math.min(1, Math.max(0, (progress - threshold * 0.52) / activationWindow));

      strand.style.opacity = `${local * 0.95}`;
      strand.style.top = `${anchorTop + 10}px`;
      strand.style.transform = `translateX(-50%) scaleY(${0.05 + local * 0.95})`;
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        updateStrands();
        ticking = false;
      });
    }
  };

  updateStrands();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
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
        window.scrollTo({
          top: targetElement.offsetTop - 100,
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
