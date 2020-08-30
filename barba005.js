barba.init({
    debug: true,
    transitions: [{
        sync: true,
        leave: (data) => {
            return new Promise(resolve => {
                gsap.to(data.current.container, {
                    duration:2, 
                    opacity: 0,
                    complete: () => {
                        resolve();
                    }
                });
            });
        },
        enter: (data) => {
            gsap.from(data.next.container, {
                duration:2,
                opacity: 0,
            });
        },
    }]
});

