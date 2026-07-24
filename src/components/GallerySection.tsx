"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    alt: "Café interior with warm lighting",
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1501339820170-0a3a3a3a3a3a?q=80&w=1000&auto=format&fit=crop",
    alt: "Handcrafted coffee brewing",
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f83969285e7c?q=80&w=1000&auto=format&fit=crop",
    alt: "Fresh pastries on display",
    height: 350,
  },
  {
    src: "https://images.unsplash.com/photo-1529070532776-702b2d4f0e0a?q=80&w=1000&auto=format&fit=crop",
    alt: "Cozy corner seating",
    height: 450,
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    alt: "Signature ramen bowl",
    height: 380,
  },
  {
    src: "https://images.unsplash.com/photo-1501339820170-0a3a3a3a3a3b?q=80&w=1000&auto=format&fit=crop",
    alt: "Evening ambience",
    height: 420,
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f83969285e7d?q=80&w=1000&auto=format&fit=crop",
    alt: "Artisan burger",
    height: 520,
  },
  {
    src: "https://images.unsplash.com/photo-1529070532776-702b2d4f0e0b?q=80&w=1000&auto=format&fit=crop",
    alt: "Interior plants and natural light",
    height: 360,
  },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

      // Masonry items animation
      const items = sectionRef.current?.querySelectorAll(".masonry-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
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

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    } else {
      setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-spacing section-padding bg-secondary"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-24 md:mb-40">
          <h2 className="section-title editorial-heading text-primary">
            Moments
            <span className="block text-accent">Captured</span>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="masonry-item group cursor-pointer overflow-hidden rounded-lg shadow-lg break-inside-avoid relative transition-all duration-500 hover:shadow-2xl"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden">
                <div
                  className="w-full transition-transform duration-[2s] ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${image.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: `${image.height}px`,
                  }}
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10000] bg-dark/95 flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-secondary/10 backdrop-blur-sm rounded-full text-secondary hover:bg-accent/20 transition-all duration-300"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-secondary/10 backdrop-blur-sm rounded-full text-secondary hover:bg-accent/20 transition-all duration-300"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-16 right-0 text-secondary text-3xl hover:text-accent transition-colors"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;