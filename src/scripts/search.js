  // On mobile, the search drawer needs to fill the remaining viewport height below the search input.
  // CSS can't calculate this dynamically since the input position changes based on header state.
  // MutationObserver watches for the drawer's hidden class being removed (i.e. results appearing),
  // then measures the search input's position and sets the drawer to fill the remaining screen height.
  // On desktop, the drawer width is set to match the search form width.
  const searchInput = document.querySelector('.pagefind-ui__search-input')
  const drawer = document.querySelector('.pagefind-ui__drawer')
  const form = document.querySelector('.pagefind-ui__form')

  if (drawer && searchInput) {
    const observer = new MutationObserver(() => {
      if (!drawer.classList.contains('pagefind-ui__hidden')) {
        const rect = searchInput.getBoundingClientRect();
        drawer.style.position = 'fixed';
        drawer.style.height = (window.innerHeight - rect.bottom) + 'px';
        if (window.innerWidth >= 768 && form) {
          drawer.style.width = (form.getBoundingClientRect().width + 4) + 'px';
        }
      } else {
        // reset to desktop styles when closed
        drawer.style.position = '';
        drawer.style.height = '';
        drawer.style.width = '';
      }
    });

    observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });
  }