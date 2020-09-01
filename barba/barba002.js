function init(){
    
    const loader = document.querySelector('.loader002');

    // reset position of the loading screen
    gsap.set(loader, {scaleX: 0, rotation: 10, xPercent: -5, yPercent: -50, transformOrigin: 'left center', autoAlpha: 1});


    function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
        return gsap.fromTo(loader, {rotation: 10, scaleX: 0, xPercent: -5},
            {duration: 0.8, xPercent: 0, scaleX: 1, rotation: 0, ease: 'power4.inOut', transformOrigin: 'left center'});
    }

    function loaderAway() {
    // GSAP tween to hide the loading screen
        return gsap.to(loader, {duration: 0.8, scaleX: 0,  xPercent: 5, rotation: -10, transformOrigin: 'right center', ease: 'power4.inOut'});
    }

/* 
=======================================================================================================================================
    Barba.js also gives you access to specific lifecycle methods or hooks that you can tap into.
    One common example would be to add css class to your page to prevent users from double clicking on links.
=======================================================================================================================================
*/

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

/*
=======================================================================================================================================
Another example would be to enable scrolling to the top of the newly loaded page. We can use .enter hook for that.
=======================================================================================================================================
*/

    // scroll to the top of the page
    barba.hooks.enter(() => {

        window.scrollTo(0, 0);

    });


/* 
=======================================================================================================================================
In the main.js, we then initiate Barba.js to create our transition.
leave() will be executed first, followed by enter().
loaderIn() is a function that returns GSAP tween which stretches our .loader to cover the whole screen.
loaderAway() is a function that returns GSAP tween which scales the loader back to scaleX:0, when the new page is loaded underneath it. 
/* 
========================================================================================================================================
*/

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

