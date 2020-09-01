// SIMPLE VERSION / FADEOUT -> FADEIN // from SLACK

barba.init({
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

