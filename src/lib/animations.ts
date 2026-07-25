import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateHero = (
  container: HTMLElement,
  title: HTMLElement,
  subtitle: HTMLElement,
  buttons: HTMLElement[],
  background: HTMLElement
) => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    title.querySelectorAll("span"),
    { y: 80, opacity: 0, rotateX: -15 },
    { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15 }
  )
    .fromTo(
      subtitle,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.6"
    )
    .fromTo(
      buttons,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "-=0.4"
    );

  gsap.fromTo(
    background,
    { scale: 1 },
    { scale: 1.1, duration: 8, ease: "power1.out", delay: 0.5 }
  );
};
