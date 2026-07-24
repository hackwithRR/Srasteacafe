"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyTimeline = [
  {
    year: "2019",
    title: "The Vision",
    description:
      "Founded on the belief that great food and meaningful conversations create lasting memories.",
  },
  {
    year: "2020",
    title: "First Location",
    description:
      "Opened our doors in the heart of the city, bringing warmth to urban spaces.",
  },
  {
    year: "2022",
    title: "Craft Evolution",
    description:
      "Introduced artisanal brewing methods and farm-to-table ingredients.",
  },
  {
    year: "2024",
    title: "Community Sanctuary",
    description:
      "Evolved into a gathering place for creatives, thinkers, and dreamers.",
  },
];

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleEl = sectionRef.current?.querySelector(".section-title");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { y: 60, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Progress line animation
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1,
            },
          }
        );
      }

      // Timeline items animation
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="section-spacing section-padding bg-secondary relative"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-24 md:mb-40">
          <h2 className="section-title editorial-heading text-primary">
            Our
            <span className="block text-accent">Story</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Timeline */}
          <div ref={timelineRef} className="relative space-y-16">
            {/* Progress Line */}
            <div 
              ref={progressLineRef}
              className="absolute left-5 top-0 bottom-0 w-px bg-accent/20 origin-top"
            />
            
            {storyTimeline.map((item, index) => (
              <div key={item.year} className="timeline-item relative pl-16">
                {/* Year Badge */}
                <div className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center border border-accent/30 rounded-full bg-secondary">
                  <span className="font-body text-[10px] tracking-widest uppercase text-accent">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
                  {item.title}
                </h3>
                <p className="body-small text-text/60 leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-[2s] ease-out"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop')",
                }}
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;