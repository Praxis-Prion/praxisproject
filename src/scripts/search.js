// On mobile, the search drawer needs to fill the remaining viewport height below the search input.
// CSS can't calculate this dynamically since the input position changes based on header state.
// MutationObserver watches for the drawer's hidden class being removed (i.e. results appearing),
// then measures the search input's position and sets the drawer to fill the remaining screen height.
// On desktop, the drawer width is set to match the search form width.

// Grab key elements from the Pagefind UI
// - searchInput: the actual input field
// - drawer: the dropdown/results container
// - form: wrapper element (used for desktop sizing)
const searchInput = document.querySelector('.pagefind-ui__search-input')
const drawer = document.querySelector('.pagefind-ui__drawer')
const form = document.querySelector('.pagefind-ui__form')

// Only run this logic if the required elements exist
// (prevents errors on pages without search)
if (drawer && searchInput) {
  // MutationObserver watches for changes to the drawer's attributes
  // Specifically: when Pagefind toggles the "hidden" class
  const observer = new MutationObserver(() => {
    // If the drawer is visible (i.e. search results are showing)
    if (!drawer.classList.contains('pagefind-ui__hidden')) {
      // Get the position of the search input relative to the viewport
      const rect = searchInput.getBoundingClientRect();
      // MOBILE BEHAVIOR:
      // Lock the drawer to the viewport and make it fill the remaining space
      drawer.style.position = 'fixed';
      // Calculate remaining height below the input
      // (viewport height - bottom of input)
      drawer.style.height = (window.innerHeight - rect.bottom) + 'px';
      // DESKTOP BEHAVIOR (>= 768px)
      if (window.innerWidth >= 768 && form) {
        // Match drawer width to the form width
        const formRect = form.getBoundingClientRect();
        drawer.style.width = (formRect.width - 2) + 'px';
        // Align drawer to the right edge of the form
        // (accounts for viewport positioning)
        drawer.style.right = (window.innerWidth - formRect.right + 2) + 'px';
        // Position drawer just below the form
        drawer.style.top = formRect.bottom + 4 + 'px';
      }
    } else {
      // When the drawer is hidden again:
      // Reset all inline styles so CSS can take over normally
      drawer.style.position = '';
      drawer.style.height = '';
      drawer.style.width = '';
    }
  });
  // Start observing class changes on the drawer element
  // Only watching the "class" attribute for efficiency
  observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });
}