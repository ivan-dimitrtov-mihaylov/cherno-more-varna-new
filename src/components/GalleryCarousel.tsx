"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const pages = [
  {
    top: [
      { image: "/images/panorama.webp" },
      { image: "/images/casino.webp" },
      { image: "/images/restaurant-1.jpg" },
    ],
    bottom: [
      { image: "/images/conference.jpeg" },
      { image: "/images/hotel-10.jpeg" },
      { image: "/images/varna-cover.jpg" },
      { image: "/images/varna-history.jpg" },
      { image: "/images/suite.jpg" },
    ],
  },
  {
    top: [
      { image: "/images/hotel-15.jpeg" },
      { image: "/images/martini-1.webp" },
      { image: "/images/restaurant-2.jpg" },
    ],
    bottom: [
      { image: "/images/conference/chm3.jpg" },
      { image: "/images/conference/chm5.jpg" },
      { image: "/images/conference/chm7.webp" },
      { image: "/images/conference/bghall.webp" },
      { image: "/images/hotel-11.jpeg" },
    ],
  },
  {
    top: [
      { image: "/images/rooms/presidential-suite.jpg" },
      { image: "/images/martini-2.webp" },
      { image: "/images/hotel-16.jpeg" },
    ],
    bottom: [
      { image: "/images/rooms/classic-single.jpg" },
      { image: "/images/rooms/classic-double.jpg" },
      { image: "/images/rooms/exclusive.jpg" },
      { image: "/images/varna-rosie.jpeg" },
      { image: "/images/varna-dsc.jpg" },
    ],
  },
  {
    top: [
      { image: "/images/restaurant-2.jpg" },
      { image: "/images/chm6.jpg" },
      { image: "/images/martini-1.webp" },
    ],
    bottom: [
      { image: "/images/catering/catering-1.jpg" },
      { image: "/images/catering/catering-2.jpg" },
      { image: "/images/catering/catering-4.jpg" },
      { image: "/images/catering/catering-6.jpg" },
      { image: "/images/catering/catering-7.jpg" },
    ],
  },
  {
    top: [
      { image: "/images/varna-cover.jpg" },
      { image: "/images/stairs.webp" },
      { image: "/images/hotel-10.jpeg" },
    ],
    bottom: [
      { image: "/images/conference/chm1.jpg" },
      { image: "/images/conference/chm2.jpg" },
      { image: "/images/conference/chm4.jpg" },
      { image: "/images/conference/chm6.jpg" },
      { image: "/images/conference/bghall.webp" },
    ],
  },
];

export default function GalleryCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const paginate = (newPage: number) => {
    if (newPage === currentPage) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const handleSwipe = (event: any, info: { offset: { x: number } }) => {
    const threshold = 100;
    if (info.offset.x < -threshold) {
      paginate((currentPage + 1) % pages.length);
    } else if (info.offset.x > threshold) {
      paginate((currentPage - 1 + pages.length) % pages.length);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
    }),
  };

  // Determine how many images to show based on screen size
  const topCount = isMobile ? 2 : 3;
  const bottomCount = isMobile ? 3 : 5;

  return (
    <section className="py-4 md:py-12 bg-brand-gray overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-2 md:px-6">
        <div className="relative min-h-[300px] md:min-h-[650px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.08 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleSwipe}
              whileTap={{ cursor: "grabbing" }}
              className="w-full space-y-4 md:space-y-8"
            >
              {/* Top Row */}
              <div className={`grid gap-1.5 md:gap-4 ${isMobile ? 'grid-cols-2' : 'md:grid-cols-3'}`}>
                {pages[currentPage].top.slice(0, topCount).map((item, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden group shadow-lg"
                  >
                    <img
                      src={item.image}
                      alt="Gallery"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className={`grid gap-1.5 md:gap-4 ${isMobile ? 'grid-cols-3' : 'md:grid-cols-5'}`}>
                {pages[currentPage].bottom.slice(0, bottomCount).map((item, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden group shadow-md"
                  >
                    <img
                      src={item.image}
                      alt="Gallery"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots – visible only on desktop */}
        <div className="hidden md:flex justify-center gap-3 mt-8 md:mt-12">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentPage === i
                  ? "w-12 bg-brand-blue"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}