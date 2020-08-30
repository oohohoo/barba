// SIMPLE VERSION from BARBA documentation
 
/* 
 barba.init({
  debug: true,
  transitions: [{
    name: 'legacy-example',
      leave: (data) => {
          
        return gsap.to(data.current.container, {
          opacity: 0
        });
       
      },
      enter: (data) => {

        return gsap.from(data.next.container, {
          opacity: 0, y:100
        });


      },
  }]
}); 
 */

barba.init({
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
});

