/* 
// GSAP ORIGINAL quickSetter
gsap.set(".cursor", {xPercent: -50, yPercent: -50});

var ball = document.querySelector(".cursor");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add(() => {
  var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
}); */



// BLAKE BOWEN QUICK SETTER
gsap.set(".cursor", {xPercent: -50, yPercent: -50});

var ball = document.querySelector(".cursor");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var fpms = 60 / 1000;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  

});

gsap.ticker.add((time, deltaTime) => {
  
	var delta = deltaTime * fpms;
	var dt = 1.0 - Math.pow(1.0 - speed, delta); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

//-----
gsap.utils.toArray(".test").forEach(container => {
    let 
    /*info = container.querySelector(".information"),*/
      var ball = container.querySelector(".cursor"),
   
        tl = gsap.timeline({ paused: true });
    
    tl
    /*.to(info, { yPercent: 20 })*/
      //.from(supscript, { ease: "power2.inOut", duration: 0.2, y: 20, autoAlpha:0, color: "#12335B", overwrite:"all" }, 0)
     .to(ball, { scale:4, ease: "power2.inOut", duration: 0.3, autoAlpha:0.7}, 0);
    
    
    container.addEventListener("mouseenter", () => tl.play() );
    container.addEventListener("mouseleave", () => tl.reverse() );
  });