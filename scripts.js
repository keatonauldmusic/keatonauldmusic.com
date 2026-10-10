document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const socialIcons = document.querySelector('header .social-icons');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      socialIcons.classList.toggle('active');
    });
  }

  // Scroll Animation Observer (Fade In)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in');
  animatedElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const track = document.getElementById('track');
  const viewport = document.getElementById('viewport');
  const indicator = document.getElementById('indicator');
  const panes = document.querySelectorAll('.tab-pane');

  let activeIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  // Update View & Container Height
  function updateTab(index) {
    activeIndex = index;

    // Move active indicator & content track
    indicator.style.transform = `translateX(${index * 100}%)`;
    track.style.transform = `translateX(-${index * 50}%)`;

    // Update ARIA states & tab active styling
    tabs.forEach((tab, idx) => {
      const isActive = idx === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive);
    });

    // Smoothly adjust viewport height to match active content length
    const activePaneHeight = panes[index].getBoundingClientRect().height;
    viewport.style.height = `${activePaneHeight}px`;

    prevTranslate = -index * (viewport.offsetWidth);
  }

  // Handle Tab Click
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => updateTab(index));
  });

  // Swipe Gestures Logic
  function getPositionX(event) {
    return event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
  }

  function touchStart(event) {
    startX = getPositionX(event);
    isDragging = true;
    track.classList.add('dragging');
  }

  function touchMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const diffX = currentX - startX;

    // Calculate dynamic drag translation
    const viewportWidth = viewport.offsetWidth;
    const currentOffset = -activeIndex * viewportWidth;
    currentTranslate = currentOffset + diffX;

    // Add resistance at bounds (first and last tabs)
    if (currentTranslate > 0) {
      currentTranslate = diffX * 0.3; // Resistance at start
    } else if (currentTranslate < -viewportWidth) {
      currentTranslate = -viewportWidth + (diffX * 0.3); // Resistance at end
    }

    // Apply drag position percentage
    const percent = (currentTranslate / (viewportWidth * 2)) * 100;
    track.style.transform = `translateX(${percent}%)`;
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');

    const movedBy = currentTranslate - prevTranslate;
    const swipeThreshold = 50; // Minimum drag distance to trigger switch

    // Switch tabs if swipe distance exceeds threshold
    if (movedBy < -swipeThreshold && activeIndex < tabs.length - 1) {
      activeIndex += 1;
    } else if (movedBy > swipeThreshold && activeIndex > 0) {
      activeIndex -= 1;
    }

    updateTab(activeIndex);
  }

  // Event Listeners for Touch/Pointer Events
  viewport.addEventListener('touchstart', touchStart, { passive: true });
  viewport.addEventListener('touchmove', touchMove, { passive: true });
  viewport.addEventListener('touchend', touchEnd);

  // Handle Window Resize (recalculates height & offsets dynamically)
  window.addEventListener('resize', () => updateTab(activeIndex));

  // Initial alignment load
  updateTab(0);
});

// Target all cards on the page using a class name
const cards = document.querySelectorAll('.steam-card');

cards.forEach(card => {
  const inner = card.querySelector('.card-inner');
  const shine = card.querySelector('.card-shine');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 1. Calculate Tilt Rotation Angles
    const rotateX = -(y - centerY) / 8; // Adjust divisor for stiffness
    const rotateY = (x - centerX) / 8;

    // Apply the 3D rotation and a subtle zoom scale
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

    // 2. Calculate Shine Position and Angle
    // Converts coordinate offsets into degree angles for the gradient
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;

    // Calculates how close the mouse is to the edge to dynamically dim/brighten the shine
    const distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const opacity = (distanceToCenter / maxDistance) * 0.4; // Max 40% glare opacity

    // Apply the glossy linear gradient reflecting the mouse position
    shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 80%)`;
  });

  // Reset animations smoothly when leaving a card
  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)';
  });
});

function switchBeatView(viewType) {
  const cardsView = document.getElementById('beatCardsView');
  const tableView = document.getElementById('beatTableView');
  const buttons = document.querySelectorAll('.beat-toggle-btn');

  if (viewType === 'cards') {
    cardsView.style.display = 'grid';
    tableView.style.display = 'none';
    buttons[0].classList.add('active');
    buttons[1].classList.remove('active');
  } else {
    cardsView.style.display = 'none';
    tableView.style.display = 'block';
    buttons[0].classList.remove('active');
    buttons[1].classList.add('active');
  }
}


// Get references to the HTML elements
const selectDropdown = document.getElementById('genre-select');
const otherInputContainer = document.getElementById('other-genre-container');

// Listen for changes on the dropdown
selectDropdown.addEventListener('change', function () {
  // If the selected value is 'other', show the input field; otherwise, hide it
  if (this.value === 'other') {
    otherInputContainer.style.display = 'block';
  } else {
    otherInputContainer.style.display = 'none';
  }
});




const ERROR_TEMPLATES = {
  valueMissing: (name) => `${name} is required.`,
  typeMismatch: (name) => `Please enter a valid ${name.toLowerCase()}.`,
  tooShort: (name, el) => `${name} must be at least ${el.minLength} characters long.`,
  rangeUnderflow: (name, el) => `${name} must be at least ${el.min}.`,
  rangeOverflow: (name, el) => `${name} cannot be greater than ${el.max}.`
};

/**
 * Validates a single input element and updates its parent label's UI state.
 */
function validateField(inputEl) {
  // Target the span inside the same parent label container
  const parentLabel = inputEl.parentElement;
  const errorSpan = parentLabel.querySelector('.error-message');
  const fieldName = inputEl.getAttribute('data-name') || 'This field';
  
  if (inputEl.validity.valid) {
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }
    inputEl.classList.remove('invalid');
    return true;
  }

  let errorMessage = 'Invalid input.';
  for (const [errorKey, messageTemplate] of Object.entries(ERROR_TEMPLATES)) {
    if (inputEl.validity[errorKey]) {
      errorMessage = messageTemplate(fieldName, inputEl);
      break;
    }
  }

  if (errorSpan) {
    errorSpan.textContent = errorMessage;
    errorSpan.style.display = 'block';
  }
  inputEl.classList.add('invalid');
  return false;
}

// --- Wire up listeners exactly the same way ---
const form = document.getElementById('beat-request-form');
const fieldsToValidate = form.querySelectorAll('input, select, textarea');

fieldsToValidate.forEach(field => {
  field.addEventListener('input', () => validateField(field));
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isFormValid = true;

  fieldsToValidate.forEach(field => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    window.location.href="success.html"
  } else {
    form.querySelector('.invalid')?.focus();
  }
});
