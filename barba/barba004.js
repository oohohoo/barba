/*
================================================================================
BARBA + LOCOMOTIVE SCROLL FADEIN/OUT
================================================================================
*/

let scroll;

barba.init({
  debug: true,
  transitions: [{
    sync: true,
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    },
    once({ next }) {
      initScroll(next.container);
    },
    beforeEnter({ next }) {
      scroll.destroy();
      initScroll(next.container);
    }
  }],

  /*
  ================================================================================
  PREVENT CURRENT LINK + SCROLL TO TOP
  ================================================================================
  */

  prevent: ({ event, href }) => {
    if (event.type === 'click') {

      // prevent the user to reload the page if the location is the same
      if (href === window.location.href) {
        event.preventDefault();
        event.stopPropagation();
        // automatically scroll to the top of the page on same location
        scroll.scrollTo('#top')
        return true;
      }
    }
  }

});

/*
================================================================================
UPDATE ACTIVE CLASS ON THE MENU - BASED ON THE GIVEN URL
================================================================================
*/

function updateMenu(url) {
  const active = document.querySelector('.g-header .nav-link.active');

  if (active !== null) {
    active.classList.remove('active');
  }

  const links = Array.from(document.querySelectorAll('.g-header .nav-link'));

  const index = links.map(link => link.href).findIndex((href) => {
    return url.indexOf(href) !== -1;
  });

  if (index !== -1) {
    links[index].classList.add('active');
  }
}

// hooks that will be triggered before any page transition
// meaning your menu active class will be updated before going to the next page
barba.hooks.before((data) => {
  updateMenu(data.trigger.href);
});

/*
================================================================================
XAVIER INIT LOCOMOTIVESCROLL SCROLL 
================================================================================
*/

function initScroll(container) {
  if (container.hasAttribute('data-scroll-container')) {
    scroll = new LocomotiveScroll({
      el: container,
      smooth: true,
      scrollFromAnywhere: true
    });
  }
}
