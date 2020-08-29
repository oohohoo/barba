function leaveAnimation(e) {

    const elements = e.querySelector(".b-content");
     return gsap
      .to(elements, {
        duration: 1,
        rotate:-45,
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
      })

 
}

function enterAnimation(e) {

    const elements = e.querySelector(".b-content");
    return gsap
   
      .fromTo(elements, {y: 100, opacity: 0},
        {duration: 1, y: 0, rotate:45, opacity: 1, ease: "power2.inOut"});

}

barba.init({
  debug: true,
  transitions: [
    {
      sync: true,
      leave: ({ current }) => leaveAnimation(current.container.querySelector(".main-inner")),
      once: ({ next }) => enterAnimation(next.container.querySelector(".main-inner")),
      enter: ({ next }) => enterAnimation(next.container.querySelector(".main-inner"))
    }
  ]
});