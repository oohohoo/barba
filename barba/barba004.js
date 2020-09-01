/*
  ================================================================================
    SMOOTH SCROLL + SCROLLTRIGGER
  ================================================================================
  */

/* // --- REGISTER SCROLLTRIGGER
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


// SIMPLE VERSION / FADEOUT -> FADEIN // from SLACK

let scroll;

barba.init({
  transitions: [{
    //sync: true,
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
  }]
});

function initScroll(container) {
  if (container.hasAttribute('data-scroll-container')) {
    scroll = new LocomotiveScroll({
      el: container,
      smooth: true
    });
  }
}



// ---- PRVA VERZIJA
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
}); */