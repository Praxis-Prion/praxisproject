// ───────────────────────────────────────
// TOC SCROLLSPY
// ───────────────────────────────────────
// Wrapped in a function so it re-initializes after each view transition.
// The observer is disconnected first to prevent stacking multiple observers
// on the same headings across navigations.

let tocObserver = null;

function initTocScrollspy() {
  // Disconnect any previous observer before re-initializing
  if (tocObserver) {
    tocObserver.disconnect();
    tocObserver = null;
  }

  const tocLinks = document.querySelectorAll('.toc-link');

  // Only run on pages that have a TOC
  if (tocLinks.length === 0) return;

  const headingIds = [...tocLinks].map(link =>
    link.getAttribute('href').slice(1)
  );

  const headingEls = headingIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.classList.toggle(
            'toc-link--active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -20% 0px'
  });

  headingEls.forEach(el => tocObserver.observe(el));
}

document.addEventListener('astro:page-load', initTocScrollspy);