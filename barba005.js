barba.init({
    debug: true,
    transitions: [{
        leave: (data) => {
            return new Promise(resolve => {
                anime({
                    targets: data.current.container,
                    opacity: 0,
                    complete: () => {
                        resolve();
                    }
                });
            });
        },
        enter: (data) => {
            anime({
                targets: data.next.container,
                opacity: [0, 1],
            });
        },
    }]
});