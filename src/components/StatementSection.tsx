"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatementSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pullquoteRef = useRef<HTMLDivElement>(null);
  const decoLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const lines = leftRef.current?.querySelectorAll(".reveal-line");
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { y: 80, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.25,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Decorative line animation
      if (decoLineRef.current) {
        gsap.fromTo(
          decoLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image reveal with parallax
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { x: 120, opacity: 0, scale: 0.92 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Text fade
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Pullquote animation
      if (pullquoteRef.current) {
        gsap.fromTo(
          pullquoteRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-spacing section-padding bg-secondary relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Large Statement */}
        <div ref={leftRef} className="text-center mb-24 md:mb-40">
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.85] tracking-tight font-light text-primary">
            <span className="reveal-line block">Not Just</span>
            <span className="reveal-line block text-accent">Another Café</span>
          </h2>
          
          {/* Decorative Separator */}
          <div 
            ref={decoLineRef}
            className="w-24 h-[1px] bg-accent/40 mx-auto mt-12 md:mt-16 origin-center"
          />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Side */}
          <div className="lg:pr-12 xl:pr-20 order-2 lg:order-1">
            <p
              ref={textRef}
              className="body-large text-text/80 leading-[1.8] max-w-xl mb-12"
            >
              Nestled in the heart of the city, SRASHTEA is a sanctuary designed
              for those who appreciate the art of slowing down. Here, every
              element—from the handcrafted furniture to the warm glow of pendant
              lights—has been thoughtfully curated to create an atmosphere of
              understated elegance.
            </p>

            {/* Pullquote */}
            <div 
              ref={pullquoteRef}
              className="relative pl-8 border-l-2 border-accent/30 mb-16"
            >
              <p className="font-display text-2xl md:text-3xl text-primary/90 italic leading-tight">
                "Where craftsmanship meets comfort, and every detail tells a story."
              </p>
            </div>

            <div className="space-y-8">
              {[
                { label: "Ambience", value: "Warm · Earthy · Intimate" },
                { label: "Philosophy", value: "Slow Living · Craft · Connection" },
                { label: "Cuisine", value: "Modern Comfort · Artisanal" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-6">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent min-w-[100px] pt-1">
                    {item.label}
                  </span>
                  <span className="w-px h-4 bg-accent/30 mt-1.5" />
                  <span className="body-small text-text/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div
            ref={rightRef}
            className="relative aspect-[4/5] overflow-hidden rounded-lg order-1 lg:order-2"
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-[2s] ease-out"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2074&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            
            {/* Floating accent element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatementSection;