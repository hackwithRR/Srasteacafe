"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    category: "Burgers",
    title: "Classic Burger",
    description: "Juicy grilled patty with fresh lettuce, tomatoes, and house sauce",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Coffee",
    title: "Cappuccino",
    description: "Rich espresso with velvety steamed milk and a perfect foam top",
    price: "₹120",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Coffee",
    title: "Caramel Cold Coffee",
    description: "Chilled coffee blended with caramel syrup and creamy milk",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Sandwiches",
    title: "Beg Cheese Sandwich",
    description: "Toasted bread with melted cheese and fresh vegetable fillings",
    price: "₹140",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Baked Goods",
    title: "Red Velvet Cookies",
    description: "Soft-baked cookies with rich cocoa and cream cheese chips",
    price: "₹80",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Milkshakes",
    title: "Oreo Milkshake",
    description: "Creamy vanilla shake blended with crushed Oreo cookies",
    price: "₹170",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Sandwiches",
    title: "Japanese Sandwich",
    description: "Soft milk bread layered with fresh fillings in authentic style",
    price: "₹160",
    image: "https://images.unsplash.com/photo-1550699026-4114bbf4fb49?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Wraps",
    title: "Pizza Wrap",
    description: "Filled with pizza sauce, cheese, and veggies, grilled to perfection",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Sandwiches",
    title: "Cheese Veg Sandwich",
    description: "Loaded with fresh veggies and melted cheese, served with coffee",
    price: "₹160",
    image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Baked Goods",
    title: "Jam Buns",
    description: "Soft, fluffy buns filled with sweet fruit jam",
    price: "₹70",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Tea",
    title: "Masala Tea",
    description: "Authentic spiced Indian tea brewed with aromatic masala",
    price: "₹60",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Baked Goods",
    title: "Choco Almond Buns",
    description: "Buttery buns topped with chocolate and crunchy almond flakes",
    price: "₹90",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Pastas",
    title: "Pink Sauce Pasta",
    description: "Creamy tomato-bechamel pasta with seasonal vegetables",
    price: "₹200",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Desserts",
    title: "Brownie with Icecream",
    description: "Warm fudgy brownie served with a scoop of vanilla ice cream",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1564355808539-22f7aa52f40a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Appetizers",
    title: "Mixed Veg Steamed Momos",
    description: "Soft dumplings stuffed with seasoned mixed vegetables",
    price: "₹130",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    category: "Breakfast",
    title: "Bread Omelette",
    description: "Fluffy omelette sandwiched between toasted buttered bread",
    price: "₹100",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop",
  },
];

const MenuSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".menu-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
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
      id="menu"
      ref={sectionRef}
      className="section-spacing section-padding bg-secondary"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-24 md:mb-40">
          <h2 className="section-title editorial-heading text-primary">
            Signature
            <span className="block text-accent">Creations</span>
          </h2>
        </div>

        {/* Menu Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
        >
          {menuItems.map((item, index) => (
            <div
              key={item.title}
              className="menu-card group relative overflow-hidden rounded-lg bg-secondary transition-all duration-700 hover:shadow-2xl card-glow"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              </div>

              {/* Floating Price Badge */}
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-secondary font-display text-lg px-4 py-2 rounded-full">
                {item.price}
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-primary mt-3 mb-4 group-hover:text-accent transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="body-small text-text/60 mb-6 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;