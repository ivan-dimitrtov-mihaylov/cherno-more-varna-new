"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Phone, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";
const RESTAURANT_PHONE = "+359 889 624 017";
const HOTEL_PHONE = "+359 52 303 030";

const translations = {
  BG: {
    bookNow: "Резервирай",
    callUs: "Обади ни се",
    restaurant: "Ресторант",
    hotel: "Хотел"
  },
  EN: {
    bookNow: "Book Now",
    callUs: "Call Us",
    restaurant: "Restaurant",
    hotel: "Hotel"
  },
  RU: {
    bookNow: "Забронировать",
    callUs: "Позвоните нам",
    restaurant: "Ресторан",
    hotel: "Отель"
  },
  UA: {
    bookNow: "Забронювати",
    callUs: "Зателефонуйте нам",
    restaurant: "Ресторан",
    hotel: "Готель"
  },
  DE: {
    bookNow: "Buchen",
    callUs: "Rufen Sie uns an",
    restaurant: "Restaurant",
    hotel: "Hotel"
  }
};

export default function FloatingCTA() {
  const { language } = useAppContext();
  const t = translations[language as keyof typeof translations] || translations.BG;
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = () => {
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded Options */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="flex flex-col gap-2 mb-2"
              >
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white text-zinc-900 rounded-xl shadow-lg border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-brand-blue" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{t.restaurant}</span>
                    <span>{RESTAURANT_PHONE}</span>
                  </div>
                </a>
                <a
                  href={`tel:${HOTEL_PHONE}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white text-zinc-900 rounded-xl shadow-lg border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-brand-blue" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{t.hotel}</span>
                    <span>{HOTEL_PHONE}</span>
                  </div>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main CTA Button */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="w-12 h-12 rounded-full bg-white text-zinc-600 shadow-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isExpanded ? handleBooking() : setIsExpanded(true)}
              className="flex items-center gap-2 px-6 py-4 bg-brand-blue hover:bg-brand-blue-light text-white rounded-full font-bold text-sm uppercase tracking-wider shadow-xl shadow-brand-blue/30 transition-all"
            >
              <Calendar className="w-4 h-4" />
              {isExpanded ? t.bookNow : t.bookNow}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
