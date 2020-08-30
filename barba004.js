// SIMPLE VERSION from BARBA documentation
 

/* barba.init({
  debug: true,
  sync: true,
  transitions: [{
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
}); */



barba.init({
  debug: true,
  sync: true,
  transitions: [{
      leave: (data) => {
          
        return gsap.to(data.current.container, {
          autoAlpha: 0
        });
       
      },
      enter: (data) => {

        return gsap.from(data.next.container, {
          autoAlpha: 1, y:100
        });


      },
  }]
});