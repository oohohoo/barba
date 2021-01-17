// OVA VERZIJA RADI BARBA

gsap.registerPlugin(ScrollTrigger);
console.log("ScrollTrigger Loaded!");

let locoScroll;
console.log("Locomotive Loaded");

/*
================================================================================
PRELOADER
================================================================================
*/

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loaderx');
const loaderInner = select('.inner-loader');
const progressBar = select('.progress');
const loaderMask = select('.loader__mask');

/*
================================================================================
IMAGES LOADED
================================================================================
*/

function init() {

  // show loader on page load
  gsap.set(loader, {autoAlpha: 1});

  // scale loader down
  gsap.set(loaderInner, {scaleY: 0.025, transformOrigin: 'bottom'});

  // make a tween that scales the loader
  const progressTween = gsap.to(progressBar, {paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right'});

  // setup variables
  let loadedImageCount = 0,
    imageCount;
  const container = select('.smooth-scroll');

  // setup Images loaded
  const imgLoad = imagesLoaded(container);
  imageCount = imgLoad.images.length;

  // set the initial progress to 0
  updateProgress(0);

  // triggered after each item is loaded
  imgLoad.on('progress', function () {
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    updateProgress(loadedImageCount);
  });

  // update the progress of our progressBar tween
  function updateProgress(value) {
    // console.log(value/imageCount)
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
      progress: value / imageCount,
      duration: 0.3,
      ease: 'power1.out'
    })
  }

  // do whatever you want when all images are loaded
  imgLoad.on('done', function (instance) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, {
      autoAlpha: 0,
      onComplete: initPageTransitions
    });
  });

}

init();

/*
================================================================================
MAIN JS + LOCOMOTIVE SCROLL + SCROLL TRIGGER PROXY
================================================================================
*/
function initScroll(container) {

   locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    getDirection: true,
    scrollFromAnywhere: true,
    touchMultiplier: 4,
   // scrollbarContainer: document.querySelector('#primary'),
    smartphone: {
          smooth: true,
      },
      tablet: {
          smooth: true,
      
      }
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
    // we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    // UKLJUČITI SAMO NA MOBILNOJ VERZIJI
    // pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });

/* ===== 
// Remove Old Locomotive Scrollbar.
const scrollbar = document.querySelectorAll( '.c-scrollbar' );
    
if ( scrollbar.length > 1 ) {
    scrollbar[0].remove();
}
/* ===== */

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  console.log("Scrolltrigger refreshed!");

/* ===== */
locoScroll.update();
console.log("Locomotive Updated once more");;
//locoScroll.scrollTo( 'top' );
                // When window reszie, need to update locomotive scroll.
               /* $( window ).on( 'resize', function() {
                  locoScroll.update();
                  console.log("JEBOTE RESIZED!");
} 

);*/
/* ===== */

/*
================================================================================
SCROLLTRIGGER TEST
================================================================================
*/
  gsap.utils.toArray('.block1').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
       // markers: true,
        scroller: ".smooth-scroll",
        start: 'top bottom',
        end: "top top",
      },
      y: 100,
      opacity: 0
    })
  });
  console.log("Scrolltrigger animacija loaded");

  /*
================================================================================
LOCOMOTIVE 4 SCROLL TO TOP
================================================================================
*//*
	locoScroll.scrollTo( '#top', {
		'offset': 0,
		'duration': 5000,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
  */
}

/*
================================================================================
PRELOADER --> vodi na --> INIT CONTENT
================================================================================
*/
function initLoader() {

  const tlLoaderIn = gsap.timeline({
    id: 'tlLoaderIn',
    defaults: {duration: 1.1, ease: 'power2.out'},
    onComplete: () => initContent()
  });

  const image = select('.loader-img-img');
  const mask = select('.loader__image--mask');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');

  const loader = select('.loaderx');
  const loaderInner = select('.inner-loader');

  tlLoaderIn

    .set(loaderContent, {autoAlpha: 1})
    .set(".txt", {yPercent: 100})
    .set(mask, {yPercent: 0})
    .set(image, {yPercent: 100})
    .set(".main", {y: 150})

    .to(loaderInner, {scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut'})

    .addLabel('revealImage')
    .to(image, {yPercent: 0}, 'revealImage-=0.5')
    .to(".txt", {yPercent: 0, stagger: 0.2}, 'revealImage-=0.4');

  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {duration: 1.2, ease: 'power2.inOut'}, delay: 1});

  tlLoaderOut

    .to(lines, {yPercent: -500, stagger: 0.2}, 0)
    .to([loader, loaderContent], {yPercent: -100}, 0.2)
    .to('.main', {y: 0}, 0);

  const tlLoader = gsap.timeline();
  tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut);
}

/*
================================================================================
INIT CONTENT --> vodi na --> INIT SCROLL
================================================================================
*/
function initContent() {

  select('body').classList.remove('is-loading');
  initScroll();
console.log("Locoscroll+Scrolltrigger loaded after preloader done");

  //initNavigation();
  //initHeaderTilt();

}

/*
================================================================================
BARBA PAGE TRANSITION IN
================================================================================
*/
function pageTransitionIn({
  container
}) {
 // console.log('pageTransitionIn');
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power1.inOut'} });
  tl
    .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: -100}, {yPercent: 0})
    .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0)
    .to(container, {y: 150}, 0);

  return tl;
}

/*
================================================================================
BARBA PAGE TRANSITION OUT
================================================================================
*/
function pageTransitionOut({
  container
}) {
  //console.log('pageTransitionOut');
  // timeline to move loader away down
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power1.inOut'},
  // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    .to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)
    .from(container, {y: -150}, 0);
  return tl;
}

/*
================================================================================
BARBA GLOBAL HOOKS + PREFETCH + INIT + VIEWS + TRANSITIONS
================================================================================
*/
function initPageTransitions() {
  // do something before the transition starts
  barba.hooks.before(() => {
    select('html').classList.add('is-transitioning');
  });
  // do something after the transition finishes
  barba.hooks.after(() => {
    select('html').classList.remove('is-transitioning');
  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        //strigtest();
   
  });
   //kill scrolltrigger
   barba.hooks.beforeLeave(() => {
    locoScroll.destroy();
    console.log("Locomotive scroll destroyed!");
    cursorThinking();
    console.log("CURSOR THINKING");
  });
  //init scrolltrigger
   barba.hooks.afterEnter(() => {
    cursorActive();
    console.log("CURSOR ACTIVE");
    
  });
 

/*
================================================================================
BARBA PREFETCH
================================================================================
*/

barba.use(barbaPrefetch);
console.log("Prefetch loaded");
/*


================================================================================
BARBA INIT 
================================================================================
*/

barba.init({
  debug: true,
  prefetch: true,
/*
================================================================================
BARBA VIEWS
================================================================================
*/  
 /* views: [{
    namespace: 'about',
    beforeEnter(){
        strigtest();
        aboutanimations();
        console.log("About anomations tregered!");
    } 


}],*/
/*
================================================================================
BARBA TRANSITIONS
================================================================================
*/  
   transitions: [
         {
    // ROUTE AKO IDE NA ABOUT IDE DRUGA ANIMACIJA
    

    once({next}) {
       // do something once on the initial page load
       initLoader();
        resetActiveLink();
        animationEnter();
        customCursor();
        //homeanimations();
        console.log("ONCE +++ uhihi!");
     },

     
     
     async leave({current}) {
       // animate loading screen in
       await pageTransitionIn(current);
       console.log("LEAVE");
       
     },
     enter({next}) {
       // animate loading screen away
       pageTransitionOut(next);
         console.log("NEXT");
     },
     
     afterEnter({next}) {
      animationEnter();
      console.log("AFTER ENTER");

     },
     
     beforeEnter({next}) {
     
     },
  
   



   }],

 /*
 ================================================================================
 PREVENT / CLICKS DURRING TRANSITION AND CURRENT LINK + SCROLL TO TOP
 ================================================================================
 */
prevent: ({
  event,
  href
}) => {
  if (event.type === 'click') {

    // prevent the user to reload the page if the location is the same
    if (href === window.location.href) {
      event.preventDefault();
      event.stopPropagation();
      // automatically scroll to the top of the page on same location
   //   locoScroll.scrollTo('#top')
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
/*
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
*/
/*
================================================================================
UPDATE ACTIVE CLASS ON THE MENU - BASED ON THE GIVEN URL
================================================================================
*/

function init() {
  initLoader();
}

}

/*
================================================================================
UNDERLINE
================================================================================
*/
function animationEnter() {
 
  //const mask = select('.b-img');
  const text = select('.b-header');
  const homeimg = select('.homeimg');
  //const navlink = select('.nav-link');
  //const active = select('.w--current');
  const underline = select('.underline');
  homeimg
  const tl = gsap.timeline({
  defaults: {
  
    duration: 5, ease: 'power4.out'
  }
  });
  
  tl
   //.from(navlink, {duration: 0.6, autoAlpha:0, yPercent:100, stagger:0.2, ease: 'power1.out'})
   .fromTo(underline, {scaleX:0},{duration: 0.6, scaleX:1, ease: 'power1.out'})
   .from(text, {yPercent:100, autoAlpha:0});
     //.from(mask, {xPercent:-101},0)
     //.from(homeimg, {xPercent:101},0);
     console.log("animation enter triggered");
     return tl
  }        

/*
================================================================================
ACTIVE UNDERLINE LINK
================================================================================
*/
const resetActiveLink = () => gsap.set('.underline, w--current', {
  scaleX:0.4,
  transformOrigin: 'left'
  });
  
  


/*
================================================================================
THE CURSOR - under construction
================================================================================
*/
function customCursor() {
  


/*
================================================================================
CUSTOM CURSOR QUICK SETTER BLAKE + SVG TRANSFORMS
================================================================================
*/

/*
================================================================================
SET TO CENTER
================================================================================
*/

gsap.set(".cursory", {xPercent: -50, yPercent: -50});

/*
================================================================================
SET VARIABLE
================================================================================
*/
var ball = document.querySelector(".cursory");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.2;

var fpms = 60 / 1000;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");


/*
================================================================================
SET OUT OF WINDOW ANIMATION 
================================================================================
*/
var showAnimation = gsap.to(ball, {
  opacity: 1,
  paused: true

});

var timer = gsap.delayedCall(5, () => {
  showAnimation.reverse();
}).pause();

console.log("out of windowwwwwwwww");
/*
================================================================================
MOUSE MOVE LISTENER
================================================================================
*/

window.addEventListener("mousemove", init);

function init() {
   
  window.removeEventListener("mousemove", init);
  
  window.addEventListener("mousemove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
  });
  
/*
================================================================================
OUT OF WINDOW LISTENER
================================================================================
*/  
  document.addEventListener("mouseleave", e => {
    showAnimation.reverse();
      console.log("Mouse Leave");
  });
  
  document.addEventListener("mouseenter", e => {
    showAnimation.play();
    console.log("Mouse Enter");
  
/*
================================================================================
GSAP TICKER -- NE ZNAM DETALJE
================================================================================
*/  
  
    mouse.x = pos.x = e.x;
    mouse.y = pos.y = e.y;
  });

  gsap.ticker.add((time, deltaTime) => {

    var delta = deltaTime * fpms;
    var dt = 1.0 - Math.pow(1.0 - speed, delta); 

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });
  
  showAnimation.play();
}

/*
================================================================================
SET VARIABLES & SELECTORS
================================================================================
*/  
const $bigCircle = document.querySelector('.cursor__circle');
//const $linkhover = document.querySelectorAll('.linkhover');
const imghover = document.querySelectorAll('.imghover');
const vidhover = document.querySelectorAll('.video');
const playtxt = document.querySelectorAll('.playtxt');
const imgtext = document.querySelectorAll('.imgtext');
gsap.set($bigCircle, {mixBlendMode: 'difference'});
/*
================================================================================
ON HOVER LINKS
================================================================================
*/  
/*
for (let i = 0; i < $linkhover.length; i++) {
	$linkhover[i].addEventListener('mouseenter', onMouseHover);
	$linkhover[i].addEventListener('mouseleave', onMouseHoverOut);
}

// LINK ON HOVER
function onMouseHover() {
	//gsap.to('#bigCircle', {attr: {r: 6, stroke: 5 }})
  gsap.to('#bigCircle', {duration:0.3, scale: 0.2, overwrite: true, transformOrigin: 'center center', strokeWidth:18});
}
// LINK ON HOVER OUT
function onMouseHoverOut() {
//	gsap.to('#bigCircle', {attr: {r: 18, stroke: 2}})
   gsap.to('#bigCircle', {duration:0.3, scale: 1, overwrite: true,  transformOrigin: 'center center', strokeWidth:2});
}
*/
/*
================================================================================
ON HOVER IMAGES
================================================================================
*/  

for (let i = 0; i < imghover.length; i++) {
	imghover[i].addEventListener('mouseenter', onMouseHoverArea);
	imghover[i].addEventListener('mouseleave', onMouseHoverAreaOut);
}


// IMAGE ON HOVER
function onMouseHoverArea() {
	gsap.to($bigCircle, {duration:0.6, scale: 4, overwrite: true, fill: '#1801E6', stroke: 'transparent', mixBlendMode: 'difference', ease: "expo.inOut"})
  gsap.to(imgtext, {duration:0.6, autoAlpha:1, scale: 1, overwrite: true,  /*mixBlendMode: 'difference',*/ ease: "expo.inOut"}, "-=0.3")
}

// IMAGE ON HOVER OUT
function onMouseHoverAreaOut() {
	gsap.to($bigCircle, {duration:0.3, scale: 1, overwrite: true,  fill: 'transparent', stroke: "#000000", mixBlendMode: 'difference'})
  gsap.to(imgtext, {duration:0.3, scale: 0, overwrite: true, /*mixBlendMode: 'difference',*/ ease: "expo.inOut"}, "<")
}


/*
================================================================================
ON HOVER VIDEO
================================================================================
*/  

for (let i = 0; i < vidhover.length; i++) {
	vidhover[i].addEventListener('mouseenter', onMouseHoverVid);
	vidhover[i].addEventListener('mouseleave', onMouseHoverVidOut);
}



// VIDEO ON HOVER
function onMouseHoverVid() {
	gsap.to($bigCircle, {duration:0.6, scale: 4, overwrite: true, fill: '#E3C8CB', stroke: 'transparent', mixBlendMode: 'difference', ease: "expo.inOut"})
  gsap.to(playtxt, {duration:0.6, autoAlpha:1, scale: 1, overwrite: true, mixBlendMode: 'difference', ease: "expo.inOut"}, "-=0.3")

}

// VIDEO ON HOVER OUT
function onMouseHoverVidOut() {
	gsap.to($bigCircle, {duration:0.3, scale: 1, overwrite: true, fill: 'transparent', stroke: "#000000", mixBlendMode: 'difference'})
  gsap.to(playtxt, {duration:0.3, autoAlpha:0, scale: 0, overwrite: true, mixBlendMode: 'difference', ease: "expo.inOut"}, "<")

}

// UNDER CONSTRUCTION !!!!!!!!!!!!
$( document ).ready(function() {
  $('body').addClass('cursoractive');
  $($bigCircle).addClass('active');
});


}



/*
================================================================================
THE CURSOR - THINKING
================================================================================
*/
function cursorThinking() {
  $('a').off();
  $('#bigCircle').removeClass("hover"); 
  $('#bigCircle').addClass("thinking");
  /*$('#cover').css({display:"block",opacity:0});
  $('.cursor__circle svg path').css({ stroke: "" });*/
}


/*
================================================================================
THE CURSOR - ACTIVE
================================================================================
*/
function cursorActive() {
  $('a').addClass('cursoractive');
  $('#bigCircle').removeClass("thinking");
  $('a').on('mouseover', function(){
   $('#bigCircle').addClass("hover");
   /* if($(this).parent().hasClass('project')){
      var colour = $(this).data('colour');
      $('#bigCircle svg path').css({ stroke: colour });
    }*/
  });


  $('a').on('mouseout', function(){
    $('#bigCircle').removeClass("hover");
   /* $('.cursor__circle svg path').css({ stroke: ""});*/
  });
  /*$('#cover').css({display:"none"}); */
}


