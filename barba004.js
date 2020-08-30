// SIMPLE VERSION from BARBA documentation
barba.init({
    transitions: [{
      sync: true,
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0, y:100
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0, y:100
        });
      }
    }]
  });
