"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import StorySection from "@/components/StorySection";
import ReviewsSection from "@/components/ReviewsSection";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";
import { initMagneticButtons, initRippleEffect } from "@/lib/utils";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize micro-interactions
    initMagneticButtons();
    initRippleEffect();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-secondary">
      <Navigation />
      <HeroSection />
      <StatementSection />
      <MenuSection />
      <GallerySection />
      <StorySection />
      <ReviewsSection />
      <VisitSection />
      <Footer />
    </main>
  );
}