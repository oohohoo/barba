// GSAP UTILS TO ARRAY ----- kao radi ali sa zamuckivanjem
gsap.utils.toArray(".c-image-overlay").forEach(container => {
    let 
   //info = container.querySelector(".information"),
     // test = container.querySelector(".test"),
   
        tl = gsap.timeline({ paused: true });
    
    tl
   //.to(info, { yPercent: 20 })
      //.from(supscript, { ease: "power2.inOut", duration: 0.2, y: 20, autoAlpha:0, color: "#12335B", overwrite:"all" }, 0)
     .to(ball, { scale:10, ease: "power2.inOut", duration: 0.3, overwrite:"all"});
    
    
    container.addEventListener("mouseenter", () => tl.play() );
    container.addEventListener("mouseleave", () => tl.reverse() );
  }); 

