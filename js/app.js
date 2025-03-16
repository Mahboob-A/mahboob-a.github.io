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
});

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