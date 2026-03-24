const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
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

sections.forEach(section => observer.observe(section));

// set initial active link on page load
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