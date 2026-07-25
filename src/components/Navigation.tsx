"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion, AnimatePresence, type Variants, type TargetAndTransition } from "framer-motion";

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#story" },
    { label: "Visit", href: "#visit" },
  ];

  const mobileVariants: Variants = {
    closed: {
      x: "100%",
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
    open: {
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
  };

  const linkVariants: Variants = {
    closed: { x: 40, opacity: 0 },
    open: (i: number): TargetAndTransition => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.6 },
    }),
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "glass-nav scrolled py-3 md:py-4" : "py-4 md:py-6"
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="font-display text-xl md:text-3xl font-light text-primary transition-all duration-500 group-hover:text-accent">
              SRASHTEA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="underline-anim font-body text-sm tracking-widest uppercase text-text/70 hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Reserve CTA */}
          <a
            href="#visit"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-secondary font-body text-xs tracking-widest uppercase rounded-full hover:bg-primary/90 transition-all duration-500 hover:scale-105 active:scale-95"
          >
            Reserve
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-primary origin-center transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="block w-6 h-[1.5px] bg-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-primary origin-center transition-colors"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileVariants}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
              onClick={closeMobile}
            />

            {/* Drawer Panel */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-secondary p-10 pt-28 shadow-2xl"
              variants={mobileVariants}
            >
              <div className="flex flex-col gap-8">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    custom={i}
                    variants={linkVariants}
                    onClick={closeMobile}
                    className="font-display text-4xl text-primary hover:text-accent transition-colors duration-300"
                  >
                    {item.label}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <motion.a
                  href="#visit"
                  custom={navItems.length}
                  variants={linkVariants}
                  onClick={closeMobile}
                  className="mt-8 btn-primary text-center"
                >
                  Reserve Table
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
