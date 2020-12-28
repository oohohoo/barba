/**
 * Barba init function.
 * This function will perform a create fluid and smooth transitions between your pages.
 */
    var Remote_Barba = (function () {
        var init = function () {
            var scroll;
            gsap.registerPlugin(ScrollTrigger);
    
            if ( remote_settings.prefetch ) {
                // tell Barba to use the prefetch module
                barba.use(barbaPrefetch);
}
    
            barba.hooks.after((data) => {
                smooth(data.next.container);
                Remote_SVG_Inject.run( data.next.container );
});
    
            barba.hooks.beforeLeave((data) => {
                //smooth( data.current.container );
                if ( remote_settings.locomotive ) {
                    scroll.destroy();
}
});
            // Init Barba
            barba.init({
                debug: true,
                timeout: 5000,
                transitions: [{
                    //sync: true,
                    // css classes will look like `.fade-xxx-[-xxx]`
                    name: "fade",
                    once({
                        next
}) {
                        // init LocomotiveScroll on page load
                        smooth(next.container);
                        Remote_SVG_Inject.run( next.container );
},
                    beforeEnter({
                        current,
                        next,
                        trigger
}) {
                        // init LocomotiveScroll regarding the next page
},
                    leave({
                        current,
                        next,
                        trigger
}) {
                        return gsap.to(current.container, {
                            opacity: 0,
                            duration: .5
});
},
                    afterLeave({
                        current,
                        next,
                        trigger
}) {},
                    beforeEnter({
                        current,
                        next,
                        trigger
}) {},
                    enter({
                        current,
                        next,
                        trigger
}) {
},
                    after({
                        current,
                        next,
                        trigger
}) {
                        return gsap.fromTo(
                            next.container, {
                                opacity: 0,
}, {
                                opacity: 1,
                                duration: 1
}
);
},
}, ],
});
    
            /**
 * When load ajax page, we need to update locomotive scroll. So that function will do this.
 * @param {object} container Next Container from Barba.js
 */
            function smooth( container ) {
                if ( ! remote_settings.locomotive ) {
                    return;
}
                scroll = new LocomotiveScroll({
                    el: container.querySelector( '[data-scroll-container]' ),
                    smooth: true,
                    scrollbarContainer: false
});
    
                scroll.on( 'scroll', ScrollTrigger.update);
    
                ScrollTrigger.scrollerProxy( '[data-scroll-container]', {
                    scrollTop(value) {
                        return arguments.length ?
                            scroll.scrollTo(value, 0, 0) :
                            scroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
};
},
                    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                    pinType: container.querySelector( '[data-scroll-container]' ).style
.transform ?
                        "transform" :
                        "fixed",
});
    
                // Remove Old Locomotive Scrollbar.
                const scrollbar = document.querySelectorAll( '.c-scrollbar' );
    
                if ( scrollbar.length > 1 ) {
                    scrollbar[0].remove();
}
    
                // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
                ScrollTrigger.addEventListener("refresh", () => scroll.update());
    
                // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
                ScrollTrigger.refresh();
    
                scroll.update();
                scroll.scrollTo( 'top' );
                // When window reszie, need to update locomotive scroll.
                $( window ).on( 'resize', function() {
                    scroll.update();
} );
}
};
    
        return {
            run: init,
};
})();