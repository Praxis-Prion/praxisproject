// ───────────────────────────────────────
// NAV SCROLLSPY
// ───────────────────────────────────────
// Wrapped in a function so it re-initializes after each view transition.
// The observer is disconnected first to prevent stacking multiple observers
// on the same sections across navigations.

let navObserver = null;

function initNavScrollspy() {
  // Disconnect any previous observer before re-initializing
  if (navObserver) {
    navObserver.disconnect();
    navObserver = null;
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  // Only run on pages that have sections to observe
  if (sections.length === 0) return;

  navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id ||
            link.getAttribute('href') === '/#' + entry.target.id
          );
        });
      }
    });
  }, {
    rootMargin: '-50% 0px -50% 0px'
  });

  sections.forEach(section => navObserver.observe(section));

  // Set initial active link on page load
  const firstSection = document.querySelector('section[id]');
  if (firstSection) {
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + firstSection.id ||
        link.getAttribute('href') === '/#' + firstSection.id
      );
    });
  }
}

document.addEventListener('astro:page-load', initNavScrollspy);