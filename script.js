import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOMContentLoaded");
	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	document.querySelectorAll(".animate-text").forEach((textElement) => {
		textElement.setAttribute("data-text", textElement.textContent.trim());

		ScrollTrigger.create({
			trigger: textElement,
			start: "top 50%",
			end: "bottom 50%",
			scrub: 1,
			onUpdate: (self) => {
				console.log(self.progress);
				const clipValue = Math.max(0, 100 - self.progress * 100);
				textElement.style.setProperty("--clip-value", `${clipValue}%`);
			},
		});
	});
});
