// document.ready //
$(document).ready(function() {

  $('body').addClass('first-load');

  // Init Page-Transition Pre-Check
  transitionCheckupOutside(); // IS NOT re-initiated on page-transition
  transitionCheckupInside(); // IS re-initiated on page-transition

  // Init Page-Transition Function
  pageTransitions();


});
// document.ready //





// ... Scroll-Indicator Timeline-Function ......................................................................

function createScrollIndicationAnimation() {

  // var tl = gsap.timeline({ paused: true, reversed: true,  repeat: 1, repeatDelay: 1, force3D:true, yoyo: false });	^
  var tl = gsap.timeline({
    reversed: true,
    force3D: true,
    yoyo: false
  });

  tl

    .set('.scroll-indicator-main', {
      transformOrigin: "50% 0%"
    })

    .to('.scroll-indicator-main', {
      duration: 1.5,
      scaleY: 1,
      ease: "expo.inOut",
      onComplete: function() {
        
      }
    })

    .set('.scroll-indicator-main', {
      transformOrigin: "50% 100%"
    })

    .to('.scroll-indicator-main', {
      duration: 1.5,
      scaleY: 0,
      ease: "expo.inOut"
    })

    .set('.scroll-indicator-main', {
      transformOrigin: "50% 0%"
    })

  // .then(function () {


  // })

  ;

  return tl;

}

createScrollIndicationAnimation();








// // ... Scroll-Indicator Simple Timeline ......................................................................


// var scrollIndicationAnimation = gsap.timeline({ paused: true, reversed: true,  repeat: -1, repeatDelay: 1, force3D:true, yoyo: false });

// scrollIndicationAnimation

// .set('.scroll-indicator-main', { transformOrigin: "50% 0%" })

// .to('.scroll-indicator-main', { duration: 1.5, scaleY: 1, ease: "expo.inOut" })

// .set('.scroll-indicator-main', { transformOrigin: "50% 100%" })

// .to('.scroll-indicator-main', { duration: 1.5, scaleY: 0, ease: "expo.inOut", onComplete:function(){
// 	
// }  })

// .set('.scroll-indicator-main', { transformOrigin: "50% 0%" })

// // .then(function () {


// // })

// ;









// ... Page Transition Function - Barba.js .....................................................................


function pageTransitions() {


  barba.hooks.beforeEnter((data) => {

    var beforeEnterPromiseAll = new Promise(function(resolve) {

      // Change class on body
      if (!$('body').hasClass('first-load')) {
        $('body').addClass('' + data.next.namespace);
        $('body').removeClass('' + data.current.namespace);
      }

      resolve();

    });

    return beforeEnterPromiseAll;

  });


  barba.hooks.enter(({
    current,
    next
  }) => {

    var enterPromiseAll = new Promise(function(resolve) {

      current.container.remove();

      resolve();

    });

    return enterPromiseAll;

  });


  barba.hooks.afterEnter((data) => {

    var afterEnterPromiseAll = new Promise(function(resolve) {



      if (!$('body').hasClass('first-load')) {

        initRefireCallbacks();

        $('body').removeClass('is-transitioning');

      }

      resolve();

    });

    return afterEnterPromiseAll;

  });

  barba.init({

  /*   prevent: ({
      el
    }) => el.classList && el.classList.contains('prevent-transition'),
    prevent: ({
      event
    }) => {
      if (event.type === 'click') {
        // Prevent the user to reload the site if a page transition is engaged.
        if (barba.transitions.isRunning) {

          event.preventDefault();

          return true;

        }
      }
    },
 */

    cacheIgnore: false,
    prefetchIgnore: false,
    timeout: 5000, // default: 2000


    transitions: [

      {
        name: 'default',

        // Available hooks…
        beforeOnce(current, next, trigger) {

        },

        once(current, next, trigger) {

        },

        afterOnce(current, next, trigger) {

        },

        beforeLeave(current, next, trigger) {

        },

        leave(current, next, trigger) {

          var leavePromise = new Promise(function(resolve) {

            var outTransition = gsap.timeline({
              force3D: true
            });

            outTransition

              .to('.transit-overlay-simple', {
                duration: 0.75,
                scaleY: 1,
                ease: "power2.in"
              })

              .then(function() {

                resolve();

              })

          });

          return leavePromise;

        },

        afterLeave(current, next, trigger) {

        },

        beforeEnter(current, next, trigger) {

        },

        enter(current, next, trigger) {

        },

        afterEnter(current, next, trigger) {

          var afterEnterPromise = new Promise(function(resolve) {


            var inTransition = gsap.timeline({
              force3D: true
            });

            inTransition

              .to('.transit-overlay-simple', {
                duration: 1.0,
                scaleY: 0,
                ease: "power2.out",

                onComplete: function() {

                  resolve();

                }
              })

          });

          return afterEnterPromise;

        },

      },

      // More cases here

    ],


    views: [

      // View Index .........................................................................................................................
      {
        // Actions taken when certain page is viewed.
        namespace: 'index',

        // Available hooks…

        beforeLeave(data) {

          // scrollIndicationAnimation.kill();
          // gsap.set('.scroll-indicator-main', { clearProps: "all" })
          scrollIndicationAnimation.pause(0);

        },

        afterLeave(data) {

        },

        beforeEnter(data) {

        },

        afterEnter(data) {
          createScrollIndicationAnimation();
          // scrollIndicationAnimation.reversed() ? scrollIndicationAnimation.play() : scrollIndicationAnimation.reverse();

        },
      },





      // View Grafik .........................................................................................................................
      {
        // Actions taken when certain page is viewed.
        namespace: 'test',

        // Available hooks…

        beforeLeave(data) {

        },

        afterLeave(data) {

        },

        beforeEnter(data) {

        },

        afterEnter(data) {

        },
      },


      // More cases here

    ],

  });

}









// ... Check if destination-page is same as origin-page before transitioning ..................................................................................

// DOES NOT need re-initiation on page-transition

function transitionCheckupOutside() {

  var links = document.querySelectorAll('a[href]:not([target="_blank"])');

  var cbk = function(e) {
    if (!$(this).parents("main").length > 0) {


      if (e.currentTarget.href === window.location.href) {

        e.preventDefault();
        e.stopPropagation();


      } else {
        if ($('body').hasClass('first-load')) {
          $('body').removeClass('first-load');
        }
      }
    }
  };

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }

}





// DOES NEED re-initiation on page-transition

function transitionCheckupInside() {

  var links = document.querySelectorAll('main a[href]:not([target="_blank"])');

  var cbk = function(e) {

    if (e.currentTarget.href === window.location.href) {

      e.preventDefault();
      e.stopPropagation();

    } else {
      if ($('body').hasClass('first-load')) {
        $('body').removeClass('first-load');
      }
    }
  };

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }

}





// Refire- & Destroy-Functions on Page-Transit......................................................................................................................

// Refire functions that have to be refired for EVERY namespace ...........................................................

function initRefireCallbacks() {


  // transitionCheckupOutside();	// MUSTN'T Be re-initiated for e.g. Nav-Links that are being transferred over from before new-page-load
  transitionCheckupInside(); // NEEDS TO Be re-initiated for e.g. Text-Links in DOM that are being loaded fresh from scratch on page-load - DOES IT STILL !?

}
