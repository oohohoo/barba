function leaveAnimation(e) {
    return new Promise(async resolve => {
      const elements = e.querySelectorAll("img, h1");
      await gsap
        .to(elements, {duration: 1, y: 100, opacity: 0, ease: "power2.inOut", stagger: 0.3})
        .then();
      resolve()
    });
  }
  
  function enterAnimation(e) {
    return new Promise(resolve => {
      const elements = e.querySelectorAll("img, h1");
      gsap
        .from(elements, {duration: 1, y: 100, opacity: 0, ease: "power2.inOut", stagger: 0.3})
        .then(resolve());
  
    });
  }
  
  barba.init({
    debug: true,
    transitions: [
      {
        sync: false,
        leave: ({ current }) =>
          leaveAnimation(current.container.querySelector("main")),
        once: ({ next }) => enterAnimation(next.container.querySelector("main")),
        enter: ({ next }) => enterAnimation(next.container.querySelector("main"))
      }
    ]
  });