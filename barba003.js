function init() {

    const loader = document.querySelector('.loader003');

    // reset loader to be invisible on page load
    gsap.set('.loader003', { scale: 0 });
    /*
    =======================================================================================================================================
    How to scale up from where the user clicked
    
    Each Barba.js hook receives the same data argument that contains the current and next page properties, 
    it also includes trigger that is the link that triggered the transition.
    =======================================================================================================================================
    */
    function loaderIn(trigger) {
        
    // Getting the dimensions of the trigger and its top and left offset 
    // relative to the viewport using the javascript getBoundingClientRect() method.
        const { height, width, top, left } = trigger.getBoundingClientRect();
        const triggerTop = Math.floor(top);
        const triggerLeft = Math.floor(left);
        const triggerWidth = Math.floor(width);
        const triggerHeight = Math.floor(height);

    // Because the loader will always scale up from the center of the clicked element 
    // we need to make sure it is twice the size of the viewport.
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const loaderSize = viewportHeight > viewportWidth ? viewportHeight * 2 : viewportWidth * 2;

    /*
    =======================================================================================================================================
    Firstly we use the .set tween to set the right position of the loader and resize it according to the viewport.
    We use xPercent: -50 and yPercent: -50 to center, the middle of the loader in the center of the clicked link.
    The .fromTo tween scales the loader from 0 to 1.
    Regardless of where the link is on the page, the loader will always scale up from there and cover the whole screen.
    =======================================================================================================================================
    */
    const tl = gsap.timeline();
        tl
            .set(loader, {
                autoAlpha: 1, x: triggerLeft + (triggerWidth / 2), y: triggerTop + (triggerHeight / 2), width: loaderSize, height: loaderSize, xPercent: -50, yPercent: -50
            })
            .fromTo(loader, { scale: 0, transformOrigin: 'center center' },
                { duration: 0.8, scale: 1, ease: 'Power4.out' });
        return tl;
    }

    /*
    =======================================================================================================================================
    Remember Barba.js only replaces the content of the data-barba="container”. This means that the body class would stay the same when navigating between the pages.
    We have to manually update it like this:
    =======================================================================================================================================
    */
    function loaderAway(next) {
        document.body.removeAttribute('class');
        document.body.classList.add(next.container.dataset.class);

    /*
    =======================================================================================================================================
    Remember Barba.js only replaces the content of the data-barba="container”. This means that the body class would stay the same when navigating between the pages.
    We have to manually update it like this:
    =======================================================================================================================================
    */    
        // const bodyClass = trigger.dataset.class;
        // console.log(bodyClass);
        // GSAP tween to hide the loading screen
        // maybe a different effect for the reveal?
        const h1 = next.container.querySelector('h1');
        const p = next.container.querySelectorAll('p');
        const img = next.container.querySelector('img');

    /*
    =======================================================================================================================================
    Now we have the whole page covered by the scaled-up loader, Barba updated the page under the loader and we are ready to reveal it.
    The loader is a simple div, with a border-radius set to 100% to appear as a circle.
    =======================================================================================================================================
    */ 

    const tl = gsap.timeline();
        return tl.to(loader, {
            duration: 1, scaleX: 0.5, /* squash the loader */ scaleY: 0.1, /* squash the loader */ yPercent: 0, /* move it down */ ease: 'Power4.inOut'
        })
            .fromTo([h1, p, img], { autoAlpha: 0 }, { duration: 0.9, autoAlpha: 1, stagger: 0.02, ease: 'none' }, 0.3);
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

    });

    // do something after the transition finishes
    barba.hooks.after(() => {

        document.querySelector('html').classList.remove('is-transitioning');

    });

    // scroll to the top of the page
    barba.hooks.enter(() => {

        window.scrollTo(0, 0);

    });


    /*
    =======================================================================================================================================
    We have two transitions leave() and enter(), but this time we are passing trigger to the loaderIn function and next to the loaderAway function.
    =======================================================================================================================================
    */
    barba.init({
        transitions: [{
            async leave({ trigger }) {
                await loaderIn(trigger);

            },
            enter({ next }) {
                loaderAway(next);
            }
        }]
    })

}

window.addEventListener('load', function () {
    init();
});
