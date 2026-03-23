const tocLinks = document.querySelectorAll('.toc-link');

if (tocLinks.length > 0) {
  const headingIds = [...tocLinks].map(link =>
    link.getAttribute('href').slice(1)
  );

  const headingEls = headingIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
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

  headingEls.forEach(el => observer.observe(el));
}

// const titleEl = document.getElementById('post-title');
// const headingIds = ['post-title', ...[...tocLinks].slice(1).map(link =>
//   link.getAttribute('href').slice(1)
// )];

// const headingEls = headingIds
//   .map(id => document.getElementById(id))
//   .filter(Boolean);