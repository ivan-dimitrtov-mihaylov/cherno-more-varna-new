/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, UtensilsCrossed, Cake, Briefcase, Coffee, Utensils, Phone, ShieldAlert, Users, FileText, ExternalLink } from "lucide-react";

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";
const RESTAURANT_PHONE = "+359 889 624 017";

const scheduleItems = [
  {
    title: "Закуска, Обяд и Вечеря",
    description: "В ресторант „Черно море“ се предлага закуска от 07:30 до 10:00 часа (включена в цената на настаняването), обяд а-ла-карт от 12:00 до 14:00 часа и вечеря на свободна консумация от 11:00 до 22:30 часа. Напитките кафе, чай и сок са включени в закуската.",
    image: "https://www.chernomorebg.com/upload/entertainment/women-bar-having-chat-dinking-cocktails.jpg",
    icon: <Utensils className="w-5 h-5" />,
  },
  {
    title: "Правила на Ресторанта",
    description: "За да осигурим максимален комфорт и безопасност за всички наши гости, молим да имате предвид, че на територията на ресторанта не е позволено внасянето на храна отвън, както и изнасянето ѝ извън него. Благодарим Ви за разбирането.",
    image: "/images/restaurant-rules.png",
    icon: <ShieldAlert className="w-5 h-5" />,
  },
  {
    title: "Рум Сервиз",
    description: "За Вашия максимален комфорт предлагаме денонощен рум сервиз. Можете да направите своята поръчка директно чрез телефона в стаята или чрез интерактивната телевизия.",
    image: "/images/suite.jpg",
    icon: <Phone className="w-5 h-5" />,
  },
];

const menuLinks = [
  { title: "А-ла-карт Меню", href: "https://www.chernomorebg.com/images/alacarte.pdf", icon: <FileText className="w-5 h-5" /> },
  { title: "Винена Листа", href: "https://www.chernomorebg.com/images/winelist.pdf", icon: <FileText className="w-5 h-5" /> },
  { title: "Напитки", href: "https://www.chernomorebg.com/images/alacarte_drinks.pdf", icon: <FileText className="w-5 h-5" /> },
];

const eventTypes = [
  {
    title: "Сватбени тържества",
    description: "Ресторант „Черно Море“ е идеалното място за вашия най-специален ден. С капацитет до 250 гости, панорамна гледка и екип от професионалисти, ние ще превърнем мечтата ви в реалност.",
    image: "/images/restaurant-1.jpg",
    icon: <Cake className="w-6 h-6" />,
  },
  {
    title: "Корпоративни събития",
    description: "Организирайте бизнес обеди, гала вечери и корпоративни тържества in изискана атмосфера. Предлагаме персонализирани менюта и пълно техническо оборудване.",
    image: "/images/chm6.jpg",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: "Кетъринг",
    description: "Нашият екип предлага висококачествен кетъринг за събития извън хотела. Ние ще донесем вкуса на „Черно Море“ навсякъде, където пожелаете.",
    image: "/images/restaurant-2.jpg",
    icon: <UtensilsCrossed className="w-6 h-6" />,
  },
];

export default function Restaurant() {
  const [activeMenu, setActiveMenu] = React.useState(0);

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${RESTAURANT_PHONE}`;
  };

  return (
    <div className="bg-brand-gray min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        {/* Capacity Badge */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Капацитет: 250 места</span>
        </div>
        <div className="absolute inset-0">
          <img src="/images/panorama.webp" alt="Restaurant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-zinc-900/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4 leading-tight font-sans italic">
              Вкусът на Черно Море
            </h1>
            <p className="text-zinc-300 text-xl md:text-2xl font-light max-w-2xl">
              Кулинарно пътешествие с панорамна гледка към морето. Свежи продукти, авторски рецепти и незабравима атмосфера.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleCallClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 font-semibold rounded-full transition-all"
              >
                <Phone className="w-4 h-4" />
                {RESTAURANT_PHONE}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Listing */}
      <section className="py-24 md:py-32 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {scheduleItems.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                  
                  {/* Image column */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-sm shadow-lg">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </motion.div>

                  {/* Text column */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                        {item.icon}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-sans text-zinc-900">{item.title}</h2>
                    </div>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Links Section */}
      <section className="bg-brand-gray border-t border-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-sans text-zinc-900 mb-4">Нашите Менюта</h2>
            <p className="text-zinc-500 font-light text-lg max-w-xl mx-auto">Разгледайте нашите а-ла-карт менюта, винена листа и селекция от напитки.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuLinks.map((menu, i) => (
              <motion.a
                key={i}
                href={menu.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 p-6 bg-white rounded-2xl border border-zinc-100 hover:border-brand-blue/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {menu.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-zinc-900 group-hover:text-brand-blue transition-colors">{menu.title}</h3>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">PDF Документ</span>
                </div>
                <ExternalLink className="w-5 h-5 text-zinc-300 group-hover:text-brand-blue transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Events Selection */}
      <section className="bg-brand-gray py-12 md:py-16 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-sans text-zinc-900 tracking-tight">Специални поводи.</h2>
          </motion.div>

          <div className="bg-white rounded-[3rem] p-6 md:p-10 flex flex-col lg:flex-row gap-12 md:gap-16 shadow-sm border border-zinc-100 min-h-[350px] items-center">
            {/* Left: Event Tabs */}
            <div className="w-full lg:w-[35%] space-y-2">
              {eventTypes.map((event, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMenu(i)}
                  className={`w-full group text-left transition-all duration-500 ${
                    activeMenu === i ? "opacity-100" : "opacity-30 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between py-6 border-b border-zinc-100">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-sans text-zinc-900 mb-2 tracking-tight group-hover:text-brand-blue transition-colors uppercase leading-tight">{event.title}</h3>
                      <AnimatePresence mode="wait">
                        {activeMenu === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-base text-zinc-500 font-light mt-4 max-w-sm leading-relaxed">
                              {event.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronRight className={`w-6 h-6 text-zinc-300 mt-2 transition-transform duration-500 ${activeMenu === i ? "-rotate-90 text-brand-blue" : "group-hover:translate-x-1"}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Media Display */}
            <div className="w-full lg:w-[65%]">
              <AnimatePresence mode="wait">
                {eventTypes.map((event, i) => i === activeMenu && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-video md:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl group/img border border-zinc-100"
                  >
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}