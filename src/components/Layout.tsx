"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight, Globe, Sun, Moon, Calendar } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import BookingModal from "./BookingModal";
import Footer from "./Footer";

const languages = ['BG', 'EN', 'RU', 'UA', 'DE'] as const;

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";

const navLinks = {
  BG: [
    { label: "Начало", path: "/" },
    { label: "Настаняване", path: BOOKING_URL, isExternal: true },
    { label: "Ресторант", path: "/restaurant" },
    { label: "Конференц-център", path: "/conference" },
    { label: "Казино", path: "/casino" },
    { label: "Оферти", path: "/offers" },
  ],
  EN: [
    { label: "Home", path: "/" },
    { label: "Accommodation", path: BOOKING_URL, isExternal: true },
    { label: "Restaurant", path: "/restaurant" },
    { label: "Conference", path: "/conference" },
    { label: "Casino", path: "/casino" },
    { label: "Offers", path: "/offers" },
  ],
  RU: [
    { label: "Главная", path: "/" },
    { label: "Размещение", path: BOOKING_URL, isExternal: true },
    { label: "Ресторант", path: "/restaurant" },
    { label: "Конференц-центр", path: "/conference" },
    { label: "Казино", path: "/casino" },
    { label: "Предложения", path: "/offers" },
  ],
  UA: [
    { label: "Головна", path: "/" },
    { label: "Розміщення", path: BOOKING_URL, isExternal: true },
    { label: "Ресторан", path: "/restaurant" },
    { label: "Конференц-центр", path: "/conference" },
    { label: "Казино", path: "/casino" },
    { label: "Пропозиції", path: "/offers" },
  ],
  DE: [
    { label: "Startseite", path: "/" },
    { label: "Unterkunft", path: BOOKING_URL, isExternal: true },
    { label: "Restaurant", path: "/restaurant" },
    { label: "Konferenzzentrum", path: "/conference" },
    { label: "Kasino", path: "/casino" },
    { label: "Angebote", path: "/offers" },
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useAppContext();

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-brand-gray font-sans selection:bg-brand-blue/10 relative">
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4 z-10">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="https://www.chernomorebg.com/images/cherno.png" alt="Hotel Cherno More" className="h-8 md:h-10 w-auto" />
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-brand-blue/90 dark:bg-brand-blue/90 backdrop-blur-md border border-brand-blue/30 dark:border-brand-blue/30 rounded-full px-4 py-2.5">
          {navLinks[language].map((item) => (
            item.isExternal ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white dark:text-white hover:text-white/80 dark:hover:text-white/80 transition-colors relative group px-3 py-1.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-white transition-all group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-white dark:text-white hover:text-white/80 dark:hover:text-white/80 transition-colors relative group px-3 py-1.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-white transition-all group-hover:w-full" />
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2 bg-brand-blue/90 dark:bg-brand-blue/90 backdrop-blur-md border border-brand-blue/30 dark:border-brand-blue/30 rounded-full px-4 py-2.5 z-10">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-brand-blue-light transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Резервирай
          </button>

          <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-white dark:text-white">
            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-white dark:text-white text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${language === lang ? 'bg-brand-blue/5 text-brand-blue dark:bg-brand-blue/20 dark:text-white' : 'text-zinc-600 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-white dark:text-white">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-900/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <img src="https://www.chernomorebg.com/images/cherno.png" alt="Hotel Cherno More" className="h-8" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
                  <X className="w-6 h-6 text-zinc-900" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                {navLinks[language].map((item) => (
                  item.isExternal ? (
                    <a 
                      key={item.path} 
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-2xl font-sans text-zinc-900 hover:text-brand-blue transition-colors border-b border-zinc-100 pb-4"
                    >
                      {item.label}
                      <ChevronRight className="w-5 h-5 text-zinc-300" />
                    </a>
                  ) : (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between text-2xl font-sans text-zinc-900 hover:text-brand-blue transition-colors border-b border-zinc-100 pb-4"
                    >
                      {item.label}
                      <ChevronRight className="w-5 h-5 text-zinc-300" />
                    </Link>
                  )
                ))}
              </nav>

              <div className="mt-12">
                <button 
                  onClick={() => { setIsBookingOpen(true); setIsMenuOpen(false); }}
                  className="w-full py-4 bg-brand-blue text-white font-bold uppercase tracking-widest rounded-xl hover:bg-brand-blue-light transition-all"
                >
                  Резервирай сега
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen">
        {children}
      </main>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Footer />
    </div>
  );
}
