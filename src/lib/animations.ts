/**
 * Shared GSAP animation utilities.
 * All functions must be called inside onMount (client-only).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Fade + slide up a set of elements with stagger */
export function revealUp(targets: string | Element | Element[], opts: gsap.TweenVars = {}) {
	return gsap.from(targets, {
		y: 40,
		opacity: 0,
		duration: 0.9,
		ease: 'power3.out',
		stagger: 0.1,
		...opts
	});
}

/** ScrollTrigger reveal for a grid of cards */
export function scrollRevealCards(container: Element, cards: string = '.card-reveal') {
	return gsap.from(container.querySelectorAll(cards), {
		y: 60,
		opacity: 0,
		duration: 0.8,
		ease: 'power3.out',
		stagger: 0.08,
		scrollTrigger: {
			trigger: container,
			start: 'top 85%',
			once: true
		}
	});
}

/** Horizontal line wipe reveal */
export function lineReveal(target: Element | string) {
	return gsap.from(target, {
		scaleX: 0,
		transformOrigin: 'left center',
		duration: 1.2,
		ease: 'expo.out',
		scrollTrigger: {
			trigger: target,
			start: 'top 90%',
			once: true
		}
	});
}

/** Count-up number animation */
export function countUp(el: Element, end: number, opts: gsap.TweenVars = {}) {
	const obj = { value: 0 };
	return gsap.to(obj, {
		value: end,
		duration: 1.5,
		ease: 'power2.out',
		onUpdate: () => { el.textContent = Math.round(obj.value).toString(); },
		...opts
	});
}
