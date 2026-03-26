// Grab the menu button from the DOM - the mobile hamburger toggle)
const menu = document.querySelector('.menu-button');

// Add a click handler if the button exists
// (the ?. prevents errors if the element isn’t on the page)
menu?.addEventListener('click', () => {
  // Read the current state from the aria attribute
  // aria-expanded="true" means the menu is open
  const isExpanded = menu.getAttribute('aria-expanded') === 'true';
  // Toggle the state:
  // - if open → set to false
  // - if closed → set to true
  // Used by CSS to show/hide the menu
  menu.setAttribute('aria-expanded', `${!isExpanded}`);
});

// ───────────────────────────────────────
// CLOSE MENU ON NAVIGATION
// ───────────────────────────────────────


// Select all links inside navigation
document.querySelectorAll('.nav a').forEach(link => {
  // When any nav link is clicked...
  link.addEventListener('click', () => {
    // Force the menu closed
    // (useful for mobile so the menu collapses after navigation)
    menu?.setAttribute('aria-expanded', 'false');
  });
});