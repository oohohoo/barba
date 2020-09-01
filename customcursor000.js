
/* // GSAP ORIGINAL quickSetter
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
});  */




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

//---------------------------------------------------------------------------------------

// VESNA -- image overlay 

var cursor = document.querySelector('.cursor');
var overlay = document.querySelectorAll('.project-overlay');
  
/* function moveCircle(e) {
gsap.to(cursor, {duration:0.3,
      x: e.clientX,
      y: e.clientY,
      delay:0.03
  });
    }  */
    
  
   
document.querySelector('.p-1').addEventListener("mouseover", function(){
document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive1_fkkxso.jpg)"});
/* document.querySelector('.p-2').addEventListener("mouseover", function(){
document.querySelector('.cursor').style.backgroundImage = "url(https://res.cloudinary.com/du25cd0bj/image/upload/v1579694456/driveImages/drive2_gcrxje.jpg)"}); */



 var flag = false;
    overlay.forEach(item => {
      item.addEventListener("mousemove", function(){
      flag = true;
      gsap.to(cursor, {duration:0.3, scale: 1, autoAlpha: 1});
     /*  overlay.forEach(item =>{
        item.addEventListener("mousemove", moveCircle);
        }) */
      })
	});
	
	
    overlay.forEach(item => {item.addEventListener("mouseout", function(){
     flag = false;
     gsap.to(cursor, {duration:0.3, scale: 0.1, autoAlpha: 0});
    })
	});
	
