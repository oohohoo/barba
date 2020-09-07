https://codepen.io/william_bella/project/editor/AxLLKq



//header
gsap.registerPlugin(ScrollTrigger);

barba.init({
	sync: true,

	transitions: [
		{
			async leave(data) {
				console.log(data);
				pageTransition();
				await delay(1000);
				data.current.container.remove();
			},

			async beforeEnter(data) {
				ScrollTrigger.getAll().forEach(t => t.kill());
			},

			async enter(data) {	
				// In the next page
				allAnimationComponents();
			},

			async once(data) {
				allAnimationComponents();
			},
		},
	],
});

function allAnimationComponents() {
	bannerAnimation();
	contentAnimation();
}

function bannerAnimation() {
	const bannerTL = gsap.timeline();
	bannerTL
		.from(["#bannerBgAddition", "#bannerBg"], {
			duration: 1.2,
			width: 0,
			skewX: 4,
			ease: "power3.inOut",
			stagger: {
				amount: 0.2
			}
		})
		.from("#header", {
			delay: -0.2,
			y: 16,
			opacity: 0,
			duration: 0.3,
			ease: "power3.inOut"
		})
		.from(".line span", {
			delay: -0.4,
			y: 80,
			opacity: 0,
			duration: 0.8,
			ease: "power3.out",
			stagger: {
				amount: 0.2
			}
		})
		.from([".content-inner p", ".content-inner .btn-row"], {
			delay: -0.6,
			y: -40,
			duration: 0.8,
			opacity: 0,
			ease: "power3.out",
			stagger: {
				amount: 0.2
			}
		});
}

function contentAnimation() {

	console.log('content animation');

	var contentTl = gsap.timeline({
		scrollTrigger: {
			trigger:".section-c p",
			markers:true,
			start:"top 85%", 
			end:"bottom 60%",
			toggleActions:"play none none none"
		},
	});

	contentTl.addLabel("start").fromTo(".about-content .title", { y: 16,opacity: 0, }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.inOut" })
	.fromTo(".about-content p", { y: 40, opacity: 0, }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.inOut" })
	.fromTo(".content-list", { y: 40, opacity: 0, }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.inOut",stagger: { amount: 0.2 } })
	.addLabel("end");
}

function pageTransition() {
	var tl = gsap.timeline();

	tl.to(".transition li", {
		duration: 1,
		scaleX: 1,
		transformOrigin: "left",
		stagger: 0.2,
	});

	tl.to(".transition li", {
		duration: 1,
		scaleX: 0,
		transformOrigin: "right",
		stagger: 0.1,
		delay: 0.1,
	});
}

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}
