"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Nishanth Beldoni",
    rating: 5,
    text: "Diners like this cafe's delicious food, with many highlighting the ramen, pasta, and cold coffee. They also mention the cozy and aesthetic ambiance, making it a great place to spend time. Guests appreciate the friendly staff and affordable prices, noting it's a budget-friendly spot.",
    date: "2 months ago",
  },
  {
    name: "Simran Naik",
    rating: 5,
    text: "Perfect ambiance! Had a girl's day out and been there for the first time with my friends. From the lighting to the seating, everything speaks aesthetic. The staff members were very considerate and kind. They even turned the extra overhead lights down for us.",
    date: "8 months ago",
  },
  {
    name: "Nandan Gowda",
    rating: 5,
    text: "A small cafe right opposite to RNSIT college is the best spot to hangout for a perfect group of friends who just got done with their classes. They offer a variety of vegetarian food and I have tasted the sandwich and the rolls and it was amazing!",
    date: "11 months ago",
  },
  {
    name: "Aishwarya Patil",
    rating: 4,
    text: "The ambience at Srashtea Cafe is excellent – cozy and welcoming, perfect for spending some relaxed time. The menu options are limited, but the ramen stands out. It's quite spicy and flavorful, definitely worth trying if you enjoy bold tastes. Service is self-service style, which works fine here.",
    date: "10 months ago",
  },
];

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation with floating effect
      const cards = cardsRef.current?.querySelectorAll(".review-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Floating animation on hover
        cards.forEach((card) => {
          const cardEl = card as HTMLElement;
          cardEl.addEventListener("mouseenter", () => {
            gsap.to(cardEl, {
              y: -8,
              scale: 1.02,
              duration: 0.6,
              ease: "power2.out",
            });
          });
          cardEl.addEventListener("mouseleave", () => {
            gsap.to(cardEl, {
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-spacing section-padding bg-secondary"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-24 md:mb-40">
          <h2 className="section-title editorial-heading text-primary">
            Voices
            <span className="block text-accent">Heard</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className="review-card group p-10 md:p-12 rounded-lg border border-primary/10 hover:border-accent/30 transition-all duration-700 card-glow"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-accent" : "text-primary/20"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.203-.921 1.502 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.069-3.292a1 1 0 00-.364-1.118L2.979 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="body-large text-text/80 mb-8 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-primary">
                  {review.name}
                </span>
                <span className="font-body text-xs text-text/40">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;