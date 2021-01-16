/* https://greensock.com/forums/topic/26805-gsap-footer-parallax-effect-spoil-if-barbajs-apply/*/ 


$(function () {
});

function reInitialized() {
  var swiper = new Swiper('.swiper-slider-single', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}


function initScrollTriggers() {
  
  gsap.set('.footer-container', { yPercent: -50 })
  const uncover = gsap.timeline({ paused:true })
  uncover.to('.footer-container', { yPercent: 0, ease: 'none' });
  ScrollTrigger.create({  
    trigger: 'main',
    // markers: true,
    start: 'bottom bottom',
    end: '+=95%',
    animation: uncover,
    scrub: true,  
  })
  // uncover.restart();
  
  console.log('ST Initiated')
  
}
initScrollTriggers();

barba.init({
    transitions: [{
        name: 'default-transition',
        leave(data) {
            return gsap.to(data.current.container, {
                duration: 0.5,
                y: 200,
                opacity: 0,
            });
        },
        after(data) {
            return gsap.from(data.next.container, {
                duration: 0.5,
                y: 200,
                opacity: 0,
                onComplete: function() {
                  initScrollTriggers();
                }
            });
        }
    }],
  views: [{
    namespace: 'home',
    beforeEnter() {
      console.log(1);
    },
    afterEnter() {
      console.log(2);
    }
  }]
});

barba.hooks.afterLeave((data) => {
		let triggers = ScrollTrigger.getAll();
		triggers.forEach( trigger => {			
			trigger.kill();
		});
    console.log('ST Killed')
});


barba.hooks.enter((data) => {
  window.scrollTo(0, 0);  
});

barba.hooks.afterEnter((data) => {  
  reInitialized();
});
