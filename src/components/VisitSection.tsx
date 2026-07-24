"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisitSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { x: -120, opacity: 0, scale: 0.92 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
      id="visit"
      ref={sectionRef}
      className="section-spacing section-padding bg-secondary"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-24 md:mb-40">
          <h2 className="section-title editorial-heading text-primary">
            Find Us
            <span className="block text-accent">Here</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Map */}
          <div ref={mapRef} className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0073204366426!2d77.5105983!3d12.954486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0a7d53b7359b4b%3A0x2d50d6a23d1d7312!2sSRASHTEA!5e0!3m2!1sen!2sin!4v1712160000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/10 to-transparent" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-12">
            {/* Opening Hours */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-primary mb-6">
                Opening Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-primary/10">
                  <span className="body-small text-text/60">Monday - Friday</span>
                  <span className="body-small text-primary font-medium">8:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-primary/10">
                  <span className="body-small text-text/60">Saturday - Sunday</span>
                  <span className="body-small text-primary font-medium">7:00 AM - 12:00 AM</span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-primary mb-6">
                Location
              </h3>
              <p className="body-large text-text/80 leading-relaxed">
                Opp to RNSIT, Channasandra<br />
                Banashankari 5th Stage, Rajarajeshwari Nagar<br />
                Bengaluru, Karnataka 560098
              </p>
            </div>

            {/* Parking */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-primary mb-6">
                Parking
              </h3>
              <p className="body-small text-text/60">
                Street parking available. Self-service café.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-primary mb-6">
                Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+919876543210"
                  className="block body-small text-text/60 hover:text-accent transition-colors"
                >
                  +91 98765 43210
                </a>
                <a
                  href="mailto:hello@srastea.com"
                  className="block body-small text-text/60 hover:text-accent transition-colors"
                >
                  hello@srastea.com
                </a>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <span className="font-display text-3xl text-accent block">4.9</span>
                <span className="font-body text-xs text-text/40">Google Rating</span>
              </div>
              <div className="w-px h-10 bg-primary/20" />
              <div className="text-center">
                <span className="font-display text-3xl text-accent block">500+</span>
                <span className="font-body text-xs text-text/40">Happy Guests</span>
              </div>
            </div>

            {/* Reserve CTA */}
            <a
              href="#visit"
              className="btn-primary inline-block mt-8"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;