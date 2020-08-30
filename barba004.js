// SIMPLE VERSION from BARBA documentation

/*  barba.init({
  debug: true,
    transitions: [{
      //sync: true,
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0
        });
      }
    }]
  }); */

 

barba.init({
  debug: true,
  transitions: [{
      leave: (data) => {
          
        return gsap.to(data.current.container, {
          opacity: 0, duration:3
        });
       
      },
      enter: (data) => {


        return gsap.from(data.next.container, {
          opacity: 0, duration:3, y:100
        });


      },
  }]
});