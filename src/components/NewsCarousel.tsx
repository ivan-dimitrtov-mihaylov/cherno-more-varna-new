"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const newsItems = {
  BG: [
    {
      title: "ХОТЕЛ С ИСТОРИЯ",
      description: "Хотел 'Черно море' е проектиран от арх. Симеон Димитров и открит на 24.05.1978 г. Хотелът е мащабен и амбициозен проект за времето си. Разположен на пешеходната алея в идеалния център на Варна, той винаги е бил тясно свързан с културния живот на града – основен партньор и място за настаняване при провеждането на големи мероприятия, фестивали, музикални събития, конференции и семинари. Хотел 'Черно море' е предпочитан избор от всички, които посещават Варна, Северното Черноморие и България.",
      image: "/images/varna-history.jpg",
      link: "/accommodation"
    },
    {
      title: "МЕСТОПОЛОЖЕНИЕ",
      description: "Хотел 'Черно Море' има уникална локация – едновременно в сърцето на града и на метри от плажа и морето. Разположен на главната пешеходна улица, той е в центъра на всичко, което се случва във Варна. В непосредствена близост се намират редица забележителности и емблематични за града места, музеи, галерии, магазини, заведения, клубове и известната Морска градина.",
      image: "/images/varna-dsc.jpg",
      link: "/accommodation"
    },
    {
      title: "НАСТАНЯВАНЕ",
      description: "Хотел 'Черно море' посреща своите гости в напълно реновираните си 199 стаи, разположени на 14 етажа, обзаведени стилно, елегантно и комфортно. Всяка стая е с тераса и прекрасен изглед към града и морето. На територията на целия комплекс гостите имат достъп до високоскоростна интернет връзка. На разположение е закрит охраняем паркинг срещу допълнително заплащане от 12 евро за лек автомобил на вечер.",
      image: "/images/suite.jpg",
      link: "/accommodation"
    }
  ],
  EN: [
    {
      title: "A HOTEL WITH HISTORY",
      description: "Hotel Cherno More was designed by architect Simeon Dimitrov and opened on May 24, 1978. The hotel is a large and ambitious project for its time. Located on the pedestrian alley in the ideal center of Varna, it has always been closely connected with the cultural life of the city – a key partner and accommodation venue for major events, festivals, music events, conferences and seminars. Hotel Cherno More is the preferred choice for all who visit Varna, the Northern Black Sea coast and Bulgaria.",
      image: "/images/varna-history.jpg",
      link: "/accommodation"
    },
    {
      title: "LOCATION",
      description: "Hotel Cherno More has a unique location – simultaneously in the heart of the city and just meters from the beach and the sea. Located on the main pedestrian street, it is at the center of everything happening in Varna. In the immediate vicinity are numerous attractions and emblematic places for the city, museums, galleries, shops, restaurants, clubs and the famous Sea Garden.",
      image: "/images/varna-dsc.jpg",
      link: "/accommodation"
    },
    {
      title: "ACCOMMODATION",
      description: "Hotel Cherno More welcomes its guests in its fully renovated 199 rooms, located on 14 floors, furnished stylishly, elegantly and comfortably. Each room has a terrace and a wonderful view of the city and the sea. Throughout the entire complex, guests have access to high-speed internet. A covered guarded parking is available for an additional fee of 12 euros per car per night.",
      image: "/images/suite.jpg",
      link: "/accommodation"
    }
  ],
  RU: [
    {
      title: "ОТЕЛЬ С ИСТОРИЕЙ",
      description: "Отель Черно Море был спроектирован архитектором Симеоном Димитровым и открыт 24 мая 1978 года. Отель является масштабным и амбициозным проектом для своего времени. Расположенный на пешеходной аллее в идеальном центре Варны, он всегда был тесно связан с культурной жизнью города – ключевой партнер и место размещения при проведении крупных мероприятий, фестивалей, музыкальных событий, конференций и семинаров. Отель Черно Море – предпочтительный выбор для всех, кто посещает Варну, Северное Черноморье и Болгарию.",
      image: "/images/varna-history.jpg",
      link: "/accommodation"
    },
    {
      title: "РАСПОЛОЖЕНИЕ",
      description: "Отель Черно Море имеет уникальное расположение – одновременно в самом сердце города и в нескольких метрах от пляжа и моря. Расположенный на главной пешеходной улице, он находится в центре всего, что происходит в Варне. В непосредственной близости находятся многочисленные достопримечательности и знаковые места города, музеи, галереи, магазины, рестораны, клубы и знаменитый Морской сад.",
      image: "/images/varna-dsc.jpg",
      link: "/accommodation"
    },
    {
      title: "РАЗМЕЩЕНИЕ",
      description: "Отель Черно Море принимает своих гостей в полностью отремонтированных 199 номерах, расположенных на 14 этажах, стильно, элегантно и комфортно обставленных. Каждый номер имеет террасу и прекрасный вид на город и море. На всей территории комплекса гости имеют доступ к высокоскоростному интернету. Доступна крытая охраняемая парковка за дополнительную плату в размере 12 евро за автомобиль за ночь.",
      image: "/images/suite.jpg",
      link: "/accommodation"
    }
  ],
  UA: [
    {
      title: "ГОТЕЛЬ З ІСТОРІЄЮ",
      description: "Готель Чорне Море був спроектований архітектором Симеоном Димитровим і відкритий 24 травня 1978 року. Готель є масштабним та амбітним проектом для свого часу. Розташований на пішохідній алеї в ідеальному центрі Варни, він завжди був тісно пов'язаний з культурним життям міста – ключовий партнер та місце розміщення під час проведення великих заходів, фестивалів, музичних подій, конференцій та семінарів. Готель Чорне Море – переважний вибір для всіх, хто відвідує Варну, Північне Причорномор'я та Болгарію.",
      image: "/images/varna-history.jpg",
      link: "/accommodation"
    },
    {
      title: "РОЗТАШУВАННЯ",
      description: "Готель Чорне Море має унікальне розташування – одночасно в самому серці міста та за кілька метрів від пляжу та моря. Розташований на головній пішохідній вулиці, він знаходиться в центрі всього, що відбувається у Варні. Безпосередньо поблизу знаходяться численні визначні пам'ятки та знакові місця міста, музеї, галереї, магазини, ресторани, клуби та знаменитий Морський сад.",
      image: "/images/varna-dsc.jpg",
      link: "/accommodation"
    },
    {
      title: "РОЗМІЩЕННЯ",
      description: "Готель Чорне Море приймає своїх гостей у повністю відремонтованих 199 номерах, розташованих на 14 поверхах, стильно, елегантно та комфортно обставлених. Кожен номер має терасу та прекрасний вид на місто та море. На всій території комплексу гості мають доступ до високошвидкісного інтернету. Доступна крита охоронювана парковка за додаткову плату у розмірі 12 євро за автомобіль за ніч.",
      image: "/images/suite.jpg",
      link: "/accommodation"
    }
  ],
  DE: [
    {
      title: "EIN HOTEL MIT GESCHICHTE",
      description: "Hotel Cherno More wurde vom Architekten Simeon Dimitrov entworfen und am 24. Mai 1978 eröffnet. Das Hotel ist ein großes und ambitioniertes Projekt für seine Zeit. In der Fußgängerzone im idealen Zentrum von Varna gelegen, war es immer eng mit dem kulturellen Leben der Stadt verbunden – ein wichtiger Partner und Unterkunftsort für große Veranstaltungen, Festivals, Musikveranstaltungen, Konferenzen und Seminare. Hotel Cherno More ist die bevorzugte Wahl für alle, die Varna, die nördliche Schwarzmeerküste und Bulgarien besuchen.",
      image: "/images/varna-history.jpg",
      link: "/accommodation"
    },
    {
      title: "LAGE",
      description: "Hotel Cherno More hat eine einzigartige Lage – gleichzeitig im Herzen der Stadt und nur wenige Meter vom Strand und dem Meer entfernt. In der Hauptfußgängerstraße gelegen, befindet es sich im Zentrum von allem, was in Varna passiert. In unmittelbarer Nähe befinden sich zahlreiche Sehenswürdigkeiten und Wahrzeichen der Stadt, Museen, Galerien, Geschäfte, Restaurants, Clubs und der berühmte Meeresgarten.",
      image: "/images/varna-dsc.jpg",
      link: "/accommodation"
    },
    {
      title: "UNTERKUNFT",
      description: "Hotel Cherno More begrüßt seine Gäste in seinen komplett renovierten 199 Zimmern auf 14 Etagen, stilvoll, elegant und komfortabel eingerichtet. Jedes Zimmer verfügt über eine Terrasse und einen wunderschönen Blick auf die Stadt und das Meer. Im gesamten Komplex haben die Gäste Zugang zu Hochgeschwindigkeits-Internet. Eine überdachte bewachte Parkgarage ist gegen eine zusätzliche Gebühr von 12 Euro pro Auto pro Nacht verfügbar.",
      image: "/images/suite.jpg",
      link: "/accommodation"
    }
  ]
};

export default function NewsCarousel() {
  const { language } = useAppContext();
  const items = newsItems[language as keyof typeof newsItems] || newsItems.BG;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch/swipe handlers for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        goToNext();
      } else {
        // Swipe right - previous slide
        goToPrev();
      }
    }
  };

  // Auto-rotation disabled

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  // Detect if mobile (for arrow visibility and layout)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section 
      className="py-20 md:py-32 bg-brand-gray overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative min-h-[500px] flex items-center">
          {/* Left Arrow - positioned before text on desktop, hidden on mobile */}
          {!isMobile && (
            <button
              onClick={goToPrev}
              className="absolute left-0 z-10 w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors bg-white/50 rounded-full shadow-sm hover:bg-white"
              style={{ transform: 'translateX(-150%)' }} // Position before text column
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Column */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${currentIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-zinc-900 tracking-tight leading-tight">
                  {items[currentIndex].title}
                </h2>
                <p className="text-zinc-500 font-light text-lg leading-relaxed max-w-lg">
                  {items[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Image Column */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`image-${currentIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src={items[currentIndex].image}
                  alt={items[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow - positioned after image on desktop, hidden on mobile */}
          {!isMobile && (
            <button
              onClick={goToNext}
              className="absolute right-0 z-10 w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors bg-white/50 rounded-full shadow-sm hover:bg-white"
              style={{ transform: 'translateX(150%)' }} // Position after image column
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Mobile: Dots indicator only (no arrows) */}
        <div className="flex items-center justify-center gap-6 mt-16 lg:hidden">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-brand-blue w-6" : "bg-zinc-300 hover:bg-zinc-400"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Dots only */}
        <div className="flex items-center justify-center gap-6 mt-16 hidden lg:flex">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-brand-blue w-6" : "bg-zinc-300 hover:bg-zinc-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
