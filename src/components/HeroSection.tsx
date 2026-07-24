"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!backgroundRef.current || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    backgroundRef.current.style.transform = `translate(${xPercent * -15}px, ${yPercent * -15}px) scale(1.1)`;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Split title into characters
    const titleEl = titleRef.current;
    const chars: HTMLSpanElement[] = [];
    if (titleEl) {
      const text = titleEl.textContent || "";
      titleEl.innerHTML = "";
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i] === " " ? "\u00A0" : text[i];
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(80px) rotateX(-20deg)";
        titleEl.appendChild(span);
        chars.push(span);
      }
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Char stagger
    tl.to(chars, {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: "power4.out",
    })
    .fromTo(
      taglineRef.current,
      { y: 30, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
      "-=0.4"
    )
    .fromTo(
      container.querySelectorAll(".hero-deco"),
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.15, transformOrigin: "center" },
      "-=0.6"
    )
    .fromTo(
      buttonsRef.current?.querySelectorAll("a") || [],
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
      "-=0.4"
    )
    .fromTo(
      scrollIndicatorRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.2"
    );

    // Background slow zoom
    gsap.fromTo(
      backgroundRef.current,
      { scale: 1 },
      { scale: 1.1, duration: 8, ease: "power1.out", delay: 0.5 }
    );

    // Scroll parallax
    gsap.to(overlayRef.current, {
      y: "25%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden bg-dark"
    >
      {/* Background with overlay */}
      <div ref={overlayRef} className="absolute inset-0 will-change-transform">
        <div
          ref={backgroundRef}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')",
            }}
          />
        </div>
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/20 to-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/30 via-transparent to-dark/30" />
        {/* Warm radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(200, 155, 99, 0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl mx-auto">
          {/* Tagline */}
          <p
            ref={taglineRef}
            className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-secondary/70 mb-6 md:mb-8"
          >
            Crafted for Conversations. Made for Slow Evenings.
          </p>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-display text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-tight text-secondary font-light"
          >
            SRASHTEA
          </h1>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
            <span className="hero-deco block w-12 h-[1px] bg-accent/60 origin-left" />
            <span className="hero-deco block w-2 h-2 rounded-full bg-accent scale-0" />
            <span className="hero-deco block w-12 h-[1px] bg-accent/60 origin-right" />
          </div>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-14"
          >
            <a
              href="#visit"
              className="btn-primary ripple min-w-[200px]"
              data-magnetic
            >
              Reserve Table
            </a>
            <a
              href="#menu"
              className="btn-outline ripple min-w-[200px] text-secondary border-secondary/40 hover:bg-secondary/10 hover:border-secondary"
              data-magnetic
            >
              Explore Menu
            </a>
          </div>

          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="flex flex-col items-center justify-center gap-3 mt-16 md:mt-20"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary/40">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;