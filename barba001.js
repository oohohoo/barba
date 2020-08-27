function init(){
    
    const loader = document.querySelector('.loader');

    // reset position of the loading screen
    gsap.set(loader, {
        scaleX: 0, yPercent: 0, transformOrigin: 'left center', autoAlpha: 1
    });

    function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
        return gsap.fromTo(loader, {scaleX: 0},
            {duration: 0.8, xPercent: 0, scaleX: 1, ease: 'Expo.easeInOut', transformOrigin: 'left center'});
    }

    function loaderAway() {
    // GSAP tween to hide the loading screen
        return gsap.to(loader, {duration: 0.8, scaleX: 0, transformOrigin: 'right center', ease: 'Expo.easeInOut'});
    }

    // do something before the transition starts
    barba.hooks.before(() => {

        document.querySelector('html').classList.add('is-transitioning');
        barba.wrapper.classList.add('is-animating');

    });

    // do something after the transition finishes
    barba.hooks.after(() => {

        document.querySelector('html').classList.remove('is-transitioning');
        barba.wrapper.classList.remove('is-animating');

    });

    // scroll to the top of the page
    barba.hooks.enter(() => {

        window.scrollTo(0, 0);

    });

    barba.init({
      debug: true,
        transitions: [{
            async leave() {
                await loaderIn();
        
            },
            enter() {
                loaderAway();
            }
        }]
    })

}

// GO when everything is loaded 
window.addEventListener('load', function(){
    init();
});
