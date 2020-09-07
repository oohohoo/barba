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
  
  
  
  
  
  
  
  
  
  /*
    ================================================================================
      SMOOTH SCROLL + SCROLLTRIGGER NEXT 
    ================================================================================
  */
  
  /* // --- REGISTER SCROLLTRIGGER
  gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    getDirection: true,
    //smoothMobile: true,
    //lerp: .05
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  scroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
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
  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
   */
  
  
  
  
  
  
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




  function initScroll(container) {

    /*
      ================================================================================
        SMOOTH SCROLL + SCROLLTRIGGER NEXT 
      ================================================================================
    */
    
     // --- REGISTER SCROLLTRIGGER
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector(".smooth-scroll"),
      smooth: true,
      getDirection: true,
      //smoothMobile: true,
      //lerp: .05
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    scroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
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
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
    }




    function initScroll(container) {
      if (container.hasAttribute('data-scroll-container')) {
        scroll = new LocomotiveScroll({
          el: container,
          smooth: true,
          scrollFromAnywhere: true
        });
      }
    }