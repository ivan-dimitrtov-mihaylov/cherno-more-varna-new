"use client";

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import GalleryCarousel from "../components/GalleryCarousel";
import NewsCarousel from "../components/NewsCarousel";

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";

const translations = {
  BG: {
    heroTitle: "Черно Море",
    heroSubtitle: "Където историята среща модерния лукс в сърцето на морската столица.",
    viewRooms: "Разгледай стаите",
    ourRooms: "Нашите Стаи",
    lifestyle: {
      restaurant: "ВКУСЪТ НА ЧЕРНО МОРЕ",
      casino: "ИЗПРОБВАЙ КЪСМЕТА СИ",
      conference: "ПРОФЕСИОНАЛНИ СЪБИТИЯ",
      rooms: "ИЗБЕРИ СВОЯТА СТАЯ",
      restaurantLink: "РЕСТОРАНТ ЧЕРНО МОРЕ",
      casinoLink: "КАЗИНО ЧЕРНО МОРЕ",
      conferenceLink: "КОНФЕРЕНТЕН ЦЕНТЪР",
      roomsLink: "НАСТАНЯВАНЕ"
    }
  },
  EN: {
    heroTitle: "Cherno More",
    heroSubtitle: "Where history meets modern luxury in the heart of the maritime capital.",
    viewRooms: "View Rooms",
    ourRooms: "Our Rooms",
    lifestyle: {
      restaurant: "THE TASTE OF CHERNO MORE",
      casino: "TRY YOUR LUCK",
      conference: "PROFESSIONAL EVENTS",
      rooms: "CHOOSE YOUR ROOM",
      restaurantLink: "RESTAURANT CHERNO MORE",
      casinoLink: "CASINO CHERNO MORE",
      conferenceLink: "CONFERENCE CENTER",
      roomsLink: "ACCOMMODATION"
    }
  },
  RU: {
    heroTitle: "Черно Море",
    heroSubtitle: "Где история встречается с современной роскошью в самом сердце морской столицы.",
    viewRooms: "Посмотреть номера",
    ourRooms: "Наши Номера",
    lifestyle: {
      restaurant: "ВКУС ЧЕРНОГО МОРЯ",
      casino: "ИСПЫТАЙ УДАЧУ",
      conference: "ПРОФЕССИОНАЛЬНЫЕ СОБЫТИЯ",
      rooms: "ВЫБЕРИТЕ СВОЙ НОМЕР",
      restaurantLink: "РЕСТОРАН ЧЕРНОЕ МОРЕ",
      casinoLink: "КАЗИНО ЧЕРНОЕ МОРЕ",
      conferenceLink: "КОНФЕРЕНЦ-ЦЕНТР",
      roomsLink: "РАЗМЕЩЕНИЕ"
    }
  },
  DE: {
    heroTitle: "Schwarzes Meer",
    heroSubtitle: "Wo Geschichte mit modernem Luxus in der Herzstätte der maritimen Hauptstadt trifft.",
    viewRooms: "Zimmer ansehen",
    ourRooms: "Unsere Zimmer",
    lifestyle: {
      restaurant: "DER GESCHMACK DES SCHWARZEN MEERES",
      casino: "VERSUCHEN SIE IHR GLÜCK",
      conference: "PROFESSIONELLE VERANSTALTUNGEN",
      rooms: "WÄHLEN SIE IHR ZIMMER",
      restaurantLink: "RESTAURANT SCHWARZES MEER",
      casinoLink: "KASINO SCHWARZES MEER",
      conferenceLink: "KONFERENZZENTRUM",
      roomsLink: "UNTERKUNFT"
    }
  }
};

const roomsData = {
  BG: [
    { id: "01", title: "Единична Стая Класик", desc: "Уют и спокойствие за вашия престой.", img: "/images/rooms/classic-single.jpg" },
    { id: "02", title: "Двойна Стая Класик", desc: "Класически стил и комфорт.", img: "/images/rooms/classic-double.jpg" },
    { id: "03", title: "Двойна Стая Класик (Twin)", desc: "Две отделни легла за вашия комфорт.", img: "/images/rooms/classic-twin.jpg" },
    { id: "04", title: "Двойна Стая Делукс", desc: "Просторна стая с елегантен дизайн.", img: "/images/rooms/deluxe-double.jpg" },
    { id: "05", title: "Двойна Стая Делукс (Twin)", desc: "Делукс комфорт с две отделни легла.", img: "/images/rooms/deluxe-twin.jpg" },
    { id: "06", title: "Двойна Стая Ексклузив", desc: "Ексклузивно изживяване с панорамна гледка.", img: "/images/rooms/exclusive.jpg" },
    { id: "07", title: "Апартамент", desc: "Луксозно настаняване за специални моменти.", img: "/images/rooms/suite.jpg" },
    { id: "08", title: "Ексклузивен Апартамент", desc: "Върховен лукс и елегантност.", img: "/images/rooms/exclusive-suite.jpg" },
    { id: "09", title: "Президентски Апартамент", desc: "Върховно гостоприемство.", img: "/images/rooms/presidential-suite.jpg" },
  ],
  EN: [
    { id: "01", title: "Single Room Classic", desc: "Cozy and peaceful for your stay.", img: "/images/rooms/classic-single.jpg" },
    { id: "02", title: "Double Room Classic", desc: "Classic style and comfort.", img: "/images/rooms/classic-double.jpg" },
    { id: "03", title: "Double Room Classic (Twin)", desc: "Two separate beds for your comfort.", img: "/images/rooms/classic-twin.jpg" },
    { id: "04", title: "Double Room Deluxe", desc: "Spacious room with elegant design.", img: "/images/rooms/deluxe-double.jpg" },
    { id: "05", title: "Double Room Deluxe (Twin)", desc: "Deluxe comfort with two separate beds.", img: "/images/rooms/deluxe-twin.jpg" },
    { id: "06", title: "Double Room Exclusive", desc: "Exclusive experience with panoramic views.", img: "/images/rooms/exclusive.jpg" },
    { id: "07", title: "Suite", desc: "Luxurious accommodation for special moments.", img: "/images/rooms/suite.jpg" },
    { id: "08", title: "Exclusive Suite", desc: "Ultimate luxury and elegance.", img: "/images/rooms/exclusive-suite.jpg" },
    { id: "09", title: "Presidential Suite", desc: "Ultimate hospitality.", img: "/images/rooms/presidential-suite.jpg" },
  ],
  RU: [
    { id: "01", title: "Одноместный Классик", desc: "Уют и спокойствие для вашего отдыха.", img: "/images/rooms/classic-single.jpg" },
    { id: "02", title: "Двухместный Классик", desc: "Классический стиль и комфорт.", img: "/images/rooms/classic-double.jpg" },
    { id: "03", title: "Двухместный Классик (Twin)", desc: "Две отдельные кровати для вашего комфорта.", img: "/images/rooms/classic-twin.jpg" },
    { id: "04", title: "Двухместный Делюкс", desc: "Просторный номер с элегантным дизайном.", img: "/images/rooms/deluxe-double.jpg" },
    { id: "05", title: "Двухместный Делюкс (Twin)", desc: "Комфорт делюкс с двумя отдельными кроватями.", img: "/images/rooms/deluxe-twin.jpg" },
    { id: "06", title: "Двухместный Эксклюзив", desc: "Эксклюзивный опыт с панорамным видом.", img: "/images/rooms/exclusive.jpg" },
    { id: "07", title: "Люкс", desc: "Роскошное размещение для особых моментов.", img: "/images/rooms/suite.jpg" },
    { id: "08", title: "Эксклюзивный Люкс", desc: "Высшая роскошь и элегантность.", img: "/images/rooms/exclusive-suite.jpg" },
    { id: "09", title: "Президентский Люкс", desc: "Высший уровень гостеприимства.", img: "/images/rooms/presidential-suite.jpg" },
  ],
  DE: [
    { id: "01", title: "Einzelzimmer Classic", desc: "Gemütlich und friedlich für Ihren Aufenthalt.", img: "/images/rooms/classic-single.jpg" },
    { id: "02", title: "Doppelzimmer Classic", desc: "Klassischer Stil und Komfort.", img: "/images/rooms/classic-double.jpg" },
    { id: "03", title: "Doppelzimmer Classic (Twin)", desc: "Zwei separate Betten für Ihren Komfort.", img: "/images/rooms/classic-twin.jpg" },
    { id: "04", title: "Doppelzimmer Deluxe", desc: "Geräumiges Zimmer mit elegantem Design.", img: "/images/rooms/deluxe-double.jpg" },
    { id: "05", title: "Doppelzimmer Deluxe (Twin)", desc: "Deluxe-Komfort mit zwei separaten Betten.", img: "/images/rooms/deluxe-twin.jpg" },
    { id: "06", title: "Doppelzimmer Exclusive", desc: "Exklusives Erlebnis mit Panoramablick.", img: "/images/rooms/exclusive.jpg" },
    { id: "07", title: "Suite", desc: "Luxuriöse Unterkunft für besondere Momente.", img: "/images/rooms/suite.jpg" },
    { id: "08", title: "Exclusive Suite", desc: "Ultimativer Luxus und Eleganz.", img: "/images/rooms/exclusive-suite.jpg" },
    { id: "09", title: "Präsidentensuite", desc: "Ultimative Gastfreundschaft.", img: "/images/rooms/presidential-suite.jpg" },
  ]
};

export default function Home() {
  const { language } = useAppContext();
  const t = translations[language as keyof typeof translations] || translations.BG;
  const rooms = roomsData[language as keyof typeof roomsData] || roomsData.BG;
  const roomsScrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollRooms = (dir: 1 | -1) => {
    const el = roomsScrollRef.current;
    if (!el || isScrolling) return;
    const card = el.querySelector("[data-room-card]") as HTMLElement;
    if (!card) return;
    const gap = 24;
    const scrollAmount = (card.offsetWidth + gap);
    const maxScroll = el.scrollWidth - el.clientWidth;
    
    setIsScrolling(true);
    
    // Infinite looping logic
    let targetScroll = el.scrollLeft + dir * scrollAmount;
    
    if (dir === 1 && el.scrollLeft >= maxScroll - 4) {
      // At end, loop to beginning
      targetScroll = 0;
    } else if (dir === -1 && el.scrollLeft <= 4) {
      // At beginning, loop to end
      targetScroll = maxScroll;
    }
    
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
    
    setTimeout(() => setIsScrolling(false), 600);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-zinc-900">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://www.chernomorebg.com/images/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-zinc-900/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-7xl md:text-9xl tracking-tight mb-8 leading-tight font-sans italic">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl font-sans font-light opacity-90 max-w-2xl mx-auto mb-12 tracking-wide leading-relaxed">
            {t.heroSubtitle}
          </p>
          <Link
            to="/accommodation"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white/20 transition-all text-xs font-medium tracking-[0.2em] uppercase"
          >
            {t.viewRooms}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* 2. Rooms Showcase Section */}
      <section className="py-20 md:py-32 bg-brand-gray overflow-hidden border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex flex-col md:flex-row items-center justify-center mb-12">
            <h2 className="text-4xl md:text-6xl font-sans text-zinc-900 tracking-tight text-center">
              {t.ourRooms}
            </h2>
            <div className="flex items-center gap-4 mt-8 md:mt-0 md:absolute md:right-0">
              <button
                onClick={() => scrollRooms(-1)}
                className="w-12 h-12 rounded-full border border-zinc-900 text-zinc-900 flex items-center justify-center transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={() => scrollRooms(1)}
                className="w-12 h-12 rounded-full border border-zinc-900 text-zinc-900 flex items-center justify-center transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={roomsScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {rooms.map((room) => (
              <Link
                to="/accommodation"
                key={room.id}
                data-room-card
                className="group shrink-0 w-[300px] md:w-[380px] bg-zinc-100 dark:bg-brand-blue rounded-3xl overflow-hidden border border-zinc-200 dark:border-brand-blue/30 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={room.img} alt={room.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl font-sans mb-2">{room.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. News Section */}
      <NewsCarousel />

      {/* 4. Lifestyle & Collections Section */}
      <section className="relative z-10 w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 h-[70vh] lg:h-[90vh] group overflow-hidden">
            <img src="/images/panorama.webp" alt="Restaurant" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent flex flex-col items-center justify-end pb-20 px-6 text-center">
              <h2 className="text-white text-4xl md:text-6xl font-sans tracking-tight mb-8 uppercase italic">{t.lifestyle.restaurant}</h2>
              <Link to="/restaurant" className="flex items-center gap-4 text-white group/btn">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.lifestyle.restaurantLink}</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-zinc-900 transition-all duration-500">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2 h-[70vh] lg:h-[90vh] group overflow-hidden">
            <img src="/images/casino.webp" alt="Casino" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent flex flex-col items-center justify-end pb-20 px-6 text-center">
              <h2 className="text-white text-4xl md:text-6xl font-sans tracking-tight mb-8 uppercase italic">{t.lifestyle.casino}</h2>
              <Link to="/casino" className="flex items-center gap-4 text-white group/btn">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.lifestyle.casinoLink}</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-zinc-900 transition-all duration-500">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 h-[70vh] lg:h-[90vh] group overflow-hidden">
            <img src="/images/conference.jpeg" alt="Conference" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent flex flex-col items-center justify-end pb-20 px-6 text-center">
              <h2 className="text-white text-4xl md:text-6xl font-sans tracking-tight mb-8 uppercase italic">{t.lifestyle.conference}</h2>
              <Link to="/conference" className="flex items-center gap-4 text-white group/btn">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.lifestyle.conferenceLink}</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-zinc-900 transition-all duration-500">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2 h-[70vh] lg:h-[90vh] group overflow-hidden">
            <img src="/images/suite.jpg" alt="Rooms" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent flex flex-col items-center justify-end pb-20 px-6 text-center">
              <h2 className="text-white text-4xl md:text-6xl font-sans tracking-tight mb-8 uppercase italic">{t.lifestyle.rooms}</h2>
              <Link to="/accommodation" className="flex items-center gap-4 text-white group/btn">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.lifestyle.roomsLink}</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-zinc-900 transition-all duration-500">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section (moved before Footer) */}
      <GalleryCarousel />
    </>
  );
}
