function leaveAnimation(e) {

    const elements = e.querySelector(".b-content");
     return gsap
      .to(elements, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
      })

 
}

function enterAnimation(e) {

    const elements = e.querySelector(".b-content");
    return gsap
      .from(elements, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
      })



}

barba.init({
  debug: true,
  transitions: [
    {
      sync: false,
      leave: ({ current }) => leaveAnimation(current.container.querySelector(".b-bg")),
      once: ({ next }) => enterAnimation(next.container.querySelector(".b-bg")),
      enter: ({ next }) => enterAnimation(next.container.querySelector(".b-bg"))
    }
  ]
});
