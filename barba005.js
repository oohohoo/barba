barba.init({
    debug: true,
    transitions: [{
        leave: (data) => {
            return new Promise(resolve => {
                gsap.to(data.current.container, {
                    duration:0.3, 
                    opacity: 0,
                    complete: () => {
                        resolve();
                    }
                });
            });
        },
        enter: (data) => {
            gsap.from(data.next.container, {
                duration:0.3,
                opacity: 0,
            });
        },
    }]
});



/* barba.init({
    sync: true,
    transitions: [{
         name: 'legacy-example',
      leave: function(data) {
        var done = this.async();
        gsap.to(data.current.container, {
          duration:0.3, 
          opacity: 0,
          onComplete: done
        });
      },
      enter: function(data) {
        gsap.from(data.next.container, {
          duration:0.3,
          opacity: 0,
          onComplete: () => {
            this.async();
          }
        });
      }
    }]
  }); */
  
  