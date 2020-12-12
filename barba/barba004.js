
/*
================================================================================
LOAD AFTER EVERYTHING LOADS // TESTIRAJ ovo ili ONO DRUGO ili NONE
================================================================================
*/
window.addEventListener('load', function () {

  /*
  ================================================================================
  HIDE OVERFLOW ON BODY TO AVOID SCROLLBARS WHEN SLIDING IN/OUT
  ================================================================================
  */

  barba.hooks.before(() => {
    document.body.classList.add("is-transitioning");
  });

  barba.hooks.after(() => {
    document.body.classList.remove("is-transitioning");
  });

	// tell Barba to use the prefetch plugin
	barba.use(barbaPrefetch);
  console.log("barba prefetch!");

  /*
  ================================================================================
  BARBA + GSAP FADEIN/OUT
  ================================================================================
  */

  let scroll;

  barba.init({
    debug: true,
    //timeout: 5000,
    prefetch: true,

  /*
  ================================================================================
  TRANSITIONS
  ================================================================================
  */

    transitions: [
      {
      sync: true,
      name: 'opacity-transition',
      
      leave(data) {
        const done = this.async(); // ovo i onComplete:done je dodano
        return gsap.to(data.current.container, {
          yPercent:-100, duration: 1.3, force3D: true, ease: 'expo.inOut', onComplete:done
          //opacity: 0
        });
      },

//------------------------------------------------------------------------------ 
      
      enter(data) {
        const done = this.async(); // ovo i onComplete:done je dodano
        return gsap.from(data.next.container, {
        yPercent:100, duration: 1.3,  force3D: true, ease: 'expo.inOut', onComplete:done
        // opacity: 0
        });
      },
      
//------------------------------------------------------------------------------ 

      once({ next }) {
        // init LocomotiveScroll on page load
        smooth(next.container);
      },
      
//------------------------------------------------------------------------------ 

      beforeEnter({ next }) {

        // destroy the previous scroll
        scroll.destroy();
        //console.log("locomotive killed"); 
        // destroy all ScrollTriggers
        ScrollTrigger.getAll().forEach(t => t.kill());
        //console.log("scrolltrigger killed");

        // init LocomotiveScroll regarding the next page 
        smooth(next.container);
        //console.log("locomotive+scrolltrigger loaded");
      }
    },
    {
  
  /*
  ================================================================================
  RULES
  ================================================================================
  */
  
    name: 'home-about',
      from: { namespace:'home' },
      to: { namespace:'about' },
      leave: function(data) {
        
      // do something 
      
    },
      enter: function(data) {
       
      // do something 

      },
    },
    { 

//------------------------------------------------------------------------------      

    name: 'about-home',
      from: { namespace:'about' },
      to: { namespace:'home' },
      leave: function(data) {
        
      // do something 
      
    },
      enter: function(data) {
       
      // do something 
      
      },
    },
   
    // add more rules
    
  
  ], // end of transitions

 /*
  ================================================================================
  VIEWS
  ================================================================================
 */

views: [
  {

    namespace: 'home',
    beforeAppear(data){

    },
    beforeEnter(data){


    },
    afterEnter(data){

    },
    afterLeave(data){

    }
  },
  {

// -----------------------------------------------------------------------------

    namespace: 'about',
    beforeAppear(data){
      
    },
    afterAppear(data){
      
    },
    beforeEnter(data){
      
    },
    afterEnter(data) {
      
    },
    beforeLeave(data){
     
    }
  },
],

  /*
  ================================================================================
  PREVENT / CLICKS DURRING TRANSITION AND CURRENT LINK + SCROLL TO TOP
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
        if (barba.transitions.isRunning) {
          event.preventDefault();
          event.stopPropagation();

          return true;
        }
      }
    }

    //KRAJ BARBA INITA
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
  LOCOMOTIVE SCROLL+SCROLLTRIGGER FUNCTION
  ================================================================================
 */

  function smooth(container) {
    if (container.hasAttribute('data-scroll-container')) {
      scroll = new LocomotiveScroll({
        el: container,
       // scrollbarContainer: ".barba-container",
        smooth: true,
        scrollFromAnywhere: true
      });
    }
 
  // REGISTER SCROLLTRIGGER
    gsap.registerPlugin(ScrollTrigger);

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    scroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },

      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
      // we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      // UKLJUČITI SAMO NA MOBILNOJ VERZIJI
      // pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    console.log("locoscroll refresh");

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
     console.log("scrolltrigger refresh");

  /*
  ================================================================================
  SCROLLTRIGGER TEST
  ================================================================================
 */

    gsap.utils.toArray('.block1').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          //markers: true,
          scroller: '[data-scroll-container]',
          //togglEvents: onEnter onLeave onEnterBack onLeaveBack
          //toggleActions: "restart pause reverse pause",
          start: 'top bottom',
          end: "top top",
          // scrub: i * 0.2 
        },
        y: 100,
        opacity: 0
      })
    });


// HORIZZONTAL SCROLL WITH CHILD ANIMATION

let sections = gsap.utils.toArray(".h-scroll--slide");
let containerx = document.querySelector(".h-scroll--wrapper");
let pinner = document.querySelector(".h-scroll--");
let elements = gsap.utils.toArray(document.querySelectorAll(".h-scroll--slide > *"));

let timeline = gsap.timeline();

timeline.to(sections, {
    x: () =>
        -(containerx.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
    scrollTrigger: {
	      scroller: '[data-scroll-container]',
        //  pin:'.horiz-pin',
	   // pin: true,
	    pin: pinner,
        scrub: 1,
        overwrite: "auto",
        trigger: pinner,
        end: () => containerx.scrollWidth - document.documentElement.clientWidth
    }
});

let scrollTriggerTimeline = gsap.timeline();

elements.forEach((element) => {
    scrollTriggerTimeline.from(element, {
        yPercent: 50,
        opacity: 0,
        overwrite: "auto",
        scrollTrigger: {
	scroller: '[data-scroll-container]',
            scrub: 1,
            start: () => element.parentNode.offsetLeft - window.innerWidth,
            end: () =>
                element.parentNode.offsetLeft -
                window.innerWidth +
                element.parentNode.getBoundingClientRect().width
        }
    });
});

elements.forEach((element) => {
    scrollTriggerTimeline.to(element, {
        yPercent: 50,
        opacity: 0,
        overwrite: "auto",
        scrollTrigger: {
	scroller: '[data-scroll-container]',
            scrub: 1,
            immediateRender: false,
            start: () =>
                element.parentNode.offsetLeft -
                element.parentNode.getBoundingClientRect().width / 2,
            end: () =>
                element.parentNode.offsetLeft +
                element.parentNode.getBoundingClientRect().width
        }
    });
});

// TU ZAVRŠAVA GLAVNA LOCOMOTIVE + SCROLLTRIGGER FUNKCIJA - VIDI ŠTA OD KODA TRIBA IZBACITI I UBACITI U VIEWS
  }



  /*
  ================================================================================
  CUSTOM CURSOR
  ================================================================================
  */
  /*
  document.addEventListener('mousemove', e => {
      $('.cursor').attr("style", "top: "+e.pageY+"px; left: "+e.pageX+"px;")
  });
  
  $('a').on('mouseover', () => {
    $('.cursor').addClass("hover");
  });
  
  $('a').on('mouseout', () => {
    $('.cursor').removeClass("hover");
  });
  
  
  
  // video cursor
  $('.b-img').on('mouseover', () => {
    $('.cursor').addClass("videover");
  });
  
  $('.b-img').on('mouseout', () => {
    $('.cursor').removeClass("videover");
  });
  
  
  //---
  $( document ).ready(function() {
    $('body').addClass('cursoractive');
    $('.cursor').addClass('active');
  });
  

*/


}); // load complete

