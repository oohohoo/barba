// ClassNamePlugin START (requires GSAP 3.2.2 or later)
gsap.registerPlugin({
	name: "className",
	init: true,
	register(gsap, Plugin) {
		var CSSPlugin = gsap.plugins.css,
			cssCore = CSSPlugin.core || console.warn("Requires GSAP 3.2.1 or later") || {},
			_removeLinkedListItem = gsap.core._removeLinkedListItem,
			_removeProperty = cssCore._removeProperty,
			PropTween = gsap.core.PropTween,
			_getAllStyles = function(target, uncache) {
				var styles = {},
					computed = getComputedStyle(target),
					cache = target._gsap,
					p;
				for (p in computed) {
					if (isNaN(p) && p !== "cssText" && p !== "length") {
						styles[p] = computed[p];
					}
				}
				uncache && cache && (cache.uncache = true);
				gsap.getProperty(target, "x"); 
				cache = target._gsap;
				for (p in cache) {
					styles[p] = cache[p];
				}
				return styles;
			};
		Plugin.prototype.init = function(target, endValue, tween) {
			let startClassList = target.getAttribute("class"),
				style = target.style,
				cssText = style.cssText,
				cache = target._gsap,
				classPT = cache.classPT,
				inlineToRemoveAtEnd = {},
				end = (endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : ""),
				plugin = this,
				changingVars = {},
				startVars = _getAllStyles(target),
				transformRelated = /(transform|perspective)/i,
				css = new CSSPlugin(),
				_renderClassName = function(ratio) {
					css.render(ratio, css);
					if (!ratio || ratio === 1) {
						target.setAttribute("class", ratio ? end : startClassList);
						for (var p in inlineToRemoveAtEnd) {
							_removeProperty(target, p);
						}
					}
				},
				endVars, p;
			if (classPT) {
				classPT.r(1, classPT.d);
				_removeLinkedListItem(classPT.d, classPT, "_pt");
			}
			target.setAttribute("class", end);
			endVars = _getAllStyles(target, true);
			target.setAttribute("class", startClassList);
			for (p in endVars) {
				if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
					changingVars[p] = endVars[p];
					if (!style[p] && style[p] !== "0") {
						inlineToRemoveAtEnd[p] = 1;
					}
				}
			}
			cache.classPT = plugin._pt = new PropTween(null, target, "className", 0, 0, _renderClassName, plugin, 0, -11);
			if (style.cssText !== cssText) {
				style.cssText = cssText; 
			}
			cache.uncache = true;
			gsap.getProperty(target, "x"); 
			css.init(target, changingVars, tween);
			plugin._props.push.apply(plugin._props, css._props);
			return 1;
		};
	}
});
// ClassNamePlugin END

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
      gsap.to(cursor, {className: "+=cursorx", duration:0.3, scale: 1, autoAlpha: 1});
      overlay.forEach(item =>{
        item.addEventListener("mousemove", moveCircle);
        })
      })
	});
	
	
    overlay.forEach(item => {item.addEventListener("mouseout", function(){
     flag = false;
     gsap.to(cursor, {className: "+=cursor",duration:0.3, scale: 0.1, autoAlpha: 0});
    })
	});
	
