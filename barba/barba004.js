
/*
  ================================================================================
  BARBA + LOCOMOTIVESCROLL UPDATE
  ================================================================================
*/

let scroll;

barba.hooks.after (() => {
  scroll.update() ();
});

barba.init({
  transitions: [{
    name: 'custom-transition',
    once({ next }) {

      // init LocomotiveScroll on page load
      smooth(next.container);
    },
    leave(){},
    beforeEnter({ next }) {

      // destroy the previous scroll
      scroll.destroy();

      // init LocomotiveScroll regarding the next page
      smooth(next.container);
    },
    enter(){}
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


// -------------------------------------------------------------------------
  
function smooth(container) {
  scroll = new LocomotiveScroll({
    el: document.querySelector('.smooth-scroll'),
    smooth: true,
    scrollFromAnywhere: true
  });
}











// SIMPLE VERSION / FADEOUT -> FADEIN // from SLACK

// spoji sa gore

/*

barba.init({
  transitions: [{
    sync: true, // ---- check
     name: 'legacy-example',
  
  leave: function(data) {
    var done = this.async();
    gsap.to(data.current.container, {
      duration:0.3, 
      opacity: 0,
      onComplete: done
    });
  },
  enter: function(data) {
    gsap.from(data.next.container, {
      duration:0.3,
      opacity: 0,
      onComplete: () => {
        this.async();
      }
    });
  }

  
}]
});


*/







/*
  ================================================================================
    SMOOTH SCROLL + SCROLLTRIGGER
  ================================================================================
*/
/*
// --- REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
	el: document.querySelector(".smooth-scroll"),
	smooth: true,
	getDirection: true,
	//smoothMobile: true,
	//lerp: .05
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	}, // we don't have to define a scrollLeft because we're only scrolling vertically.
	getBoundingClientRect() {
		return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
	},
	
	// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
	// we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
	// UKLJUČITI SAMO NA MOBILNOJ VERZIJI
	// pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

*/



