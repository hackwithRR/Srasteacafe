"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-primary text-secondary section-padding py-20 md:py-32"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-20">
          {/* Logo & Tagline */}
          <div>
            <Link href="/" className="block mb-6">
              <span className="font-display text-3xl md:text-4xl text-secondary hover:text-accent transition-colors duration-500">
                SRASHTEA
              </span>
            </Link>
            <p className="body-small text-secondary/70 max-w-xs">
              Crafted for conversations. Made for slow evenings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-6">
              Navigate
            </h4>
            <div className="space-y-4">
              {["Menu", "Gallery", "About", "Visit"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block body-small text-secondary/70 hover:text-accent transition-colors duration-300 underline-anim"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-6">
              Connect
            </h4>
            <div className="space-y-4">
              <a
                href="https://instagram.com/srastea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 body-small text-secondary/70 hover:text-accent transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.266.058 2.633.25 3.67.69.41.133.796.303 1.17.566.374.263.656.545.918.918.263.374.433.76.566 1.17.44.937.632 2.304.69 3.67.69 1.266-.058 2.633-.25 3.67-.69.41-.133.796-.303 1.17-.566.374-.263.656-.545.918-.918.263-.374.433-.76.566-1.17.44-.937.632-2.304.69-3.67.058-1.266.07-2.633.07-4.85s-.012-3.584-.07-4.85c-.058-1.266-.25-2.633-.69-3.67-.133-.41-.303-.796-.566-1.17-.374-.374-.76-.545-1.17-.566-.937-.44-2.304-.632-3.67-.69-1.266-.058-2.633-.07-4.85-.07s-3.584.012-4.85.07c-1.266.058-2.633.25-3.67.69-.41.133-.796.303-1.17.566-.374.263-.656.545-.918.918-.263.374-.433.76-.566 1.17-.44.937-.632 2.304-.69 3.67-.058 1.266-.07 2.633-.07 4.85s.012 3.584.07 4.85c.058 1.266.25 2.633.69 3.67.133.41.303.796.566 1.17.374.263.76.545 1.17.566.937.44 2.304.632 3.67.69 1.266.058 2.633.07 4.85.07zm0-2.163C8.741 0 8.332.014 7.052.042 5.77.07 4.625.17 3.63.37a6.958 6.958 0 0 0-2.066.643A6.958 6.958 0 0 0 .37 3.63C.17 4.625.07 5.77.042 7.052.014 8.332 0 8.741 0 12s.014 3.668.042 4.948c.028 1.282.128 2.427.33 3.322a6.958 6.958 0 0 0 .643 2.066 6.958 6.958 0 0 0 1.994 1.994 6.958 6.958 0 0 0 2.066.643c.995.202 2.14.302 3.422.33 1.282.028 1.691.042 4.948.042s3.668-.014 4.948-.042c1.282-.028 2.427-.128 3.322-.33a6.958 6.958 0 0 0 2.066-.643 6.958 6.958 0 0 0 1.994-1.994 6.958 6.958 0 0 0-.643-2.066c-.202-.995-.302-2.14-.33-3.422-.028-1.282-.042-1.691-.042-4.948s.014-3.668.042-4.948c.028-1.282.128-2.427.33-3.322a6.958 6.958 0 0 0-.643-2.066 6.958 6.958 0 0 0-1.994-1.994 6.958 6.958 0 0 0-2.066-.643c-.995-.202-2.14-.302-3.422-.33C15.668.014 15.259 0 12 0z" />
                  <path d="M12 5.837a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 0 0 0-12.326zm0 10.163a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
                Instagram
              </a>
              <a
                href="mailto:hello@srastea.com"
                className="block body-small text-secondary/70 hover:text-accent transition-colors duration-300 underline-anim"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-secondary/15 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-xs text-secondary/50">
            © 2024 SRASHTEA. All rights reserved.
          </p>
          <p className="font-body text-xs text-secondary/50">
            Designed with intention. Built for experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;