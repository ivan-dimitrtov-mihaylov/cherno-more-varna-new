/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight, Sun, Palmtree, Heart, CalendarDays, Gift, Plane } from "lucide-react";

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";

const offers = [
  {
    id: 1,
    badge: "Популярна",
    title: "Лятна ваканция",
    subtitle: "Май – Септември 2025",
    description: "Насладете се на 5 нощувки със закуска, безплатен плажен бар и SPA процедура. Идеално за семейства и двойки.",
    price: "от 449€",
    priceNote: "за двама / 5 нощувки",
    features: ["5 нощувки", "Закуска", "SPA процедура", "Плажен бар"],
    image: "/images/varna-cover.jpg",
    icon: <Sun className="w-6 h-6" />,
    color: "amber",
  },
  {
    id: 2,
    badge: "Ново",
    title: "Романтичен уикенд",
    subtitle: "Целогодишна",
    description: "Перфектният подарък за вашата половинка – 2 нощувки, вечеря за двама с гледка към морето и шампанско в стаята.",
    price: "от 279€",
    priceNote: "за двама / 2 нощувки",
    features: ["2 нощувки", "Романтична вечеря", "Шампанско", "Късен check-out"],
    image: "/images/martini-2.webp",
    icon: <Heart className="w-6 h-6" />,
    color: "rose",
  },
  {
    id: 3,
    badge: "Бизнес",
    title: "Конферентен пакет",
    subtitle: "Целогодишна",
    description: "Организирайте вашето корпоративно събитие с включена зала, техника, кафе паузи и преференциални цени за настаняване.",
    price: "от 65€",
    priceNote: "на човек / ден",
    features: ["Конферентна зала", "Техника", "2 кафе паузи", "Обяд"],
    image: "/images/chm6.jpg",
    icon: <CalendarDays className="w-6 h-6" />,
    color: "blue",
  },
  {
    id: 4,
    badge: "Сезонна",
    title: "Ранно записване",
    subtitle: "До 31 Март 2025",
    description: "Резервирайте лятната си почивка предварително и спечелете 20% отстъпка от стандартните цени за настаняване.",
    price: "-20%",
    priceNote: "от стандартна цена",
    features: ["20% отстъпка", "Гъвкаво анулиране", "Закуска включена", "Безплатен upgrade"],
    image: "/images/varna-history.jpg",
    icon: <Gift className="w-6 h-6" />,
    color: "emerald",
  },
  {
    id: 5,
    badge: "Луксозна",
    title: "Президентско преживяване",
    subtitle: "Целогодишна",
    description: "Отседнете в Президентския апартамент с VIP трансфер от летището, частна вечеря и персонален батлер на ваше разположение.",
    price: "от 899€",
    priceNote: "за двама / 3 нощувки",
    features: ["3 нощувки", "VIP трансфер", "Частна вечеря", "Батлер"],
    image: "/images/gallery-18.jpg",
    icon: <Plane className="w-6 h-6" />,
    color: "violet",
  },
];

const colorMap: Record<string, { badge: string; icon: string; border: string }> = {
  amber: { badge: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: "bg-amber-500/10 text-amber-400", border: "hover:border-amber-500/30" },
  rose: { badge: "bg-rose-500/10 text-rose-500 border-rose-500/20", icon: "bg-rose-500/10 text-rose-400", border: "hover:border-rose-500/30" },
  blue: { badge: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: "bg-blue-500/10 text-blue-400", border: "hover:border-blue-500/30" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: "bg-emerald-500/10 text-emerald-400", border: "hover:border-emerald-500/30" },
  violet: { badge: "bg-violet-500/10 text-violet-500 border-violet-500/20", icon: "bg-violet-500/10 text-violet-400", border: "hover:border-violet-500/30" },
};

export default function Offers() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/varna-rosie.jpeg" alt="Offers" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-zinc-900/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-3 font-sans italic">
              Оферти
            </h1>
            <p className="text-zinc-300 text-xl md:text-2xl font-light max-w-2xl">
              Открийте нашите специални пакети и се насладете на незабравимо преживяване на преференциални цени.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="bg-brand-gray py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offers.map((offer, i) => {
              const colors = colorMap[offer.color];
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white dark:bg-brand-blue rounded-3xl overflow-hidden shadow-sm border border-zinc-200 dark:border-brand-blue/30 transition-all group hover:shadow-xl`}
                >
                  {/* Image */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${colors.badge}`}>
                        {offer.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                        <span className="text-white font-bold text-lg">{offer.price}</span>
                        <span className="text-white/60 text-xs ml-2">{offer.priceNote}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
                        {offer.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{offer.title}</h3>
                        <p className="text-zinc-900 dark:text-white/60 text-sm">{offer.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-zinc-900 dark:text-white/80 font-light leading-relaxed mb-6">{offer.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {offer.features.map((f, j) => (
                        <span key={j} className="px-3 py-1.5 bg-zinc-50 dark:bg-white/10 text-zinc-900 dark:text-white rounded-lg text-sm border border-zinc-100 dark:border-white/20">
                          {f}
                        </span>
                      ))}
                    </div>

                    <button className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm group/btn hover:text-brand-blue dark:hover:text-white/80 transition-colors">
                      Научете повече
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-brand-gray py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Gift className="w-10 h-10 text-brand-blue mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-sans text-zinc-900 mb-6 tracking-tight">Не пропускайте оферта</h2>
            <p className="text-zinc-500 font-light text-lg mb-10 max-w-xl mx-auto">
              Свържете се с нас за персонализирано предложение или се обадете за повече информация за нашите актуални пакети.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+359889624017"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-blue hover:bg-brand-blue-light text-white font-semibold rounded-full transition-all shadow-lg shadow-brand-blue/20"
              >
                +359 889 624 017
                <ChevronRight className="w-5 h-5" />
              </a>
              <Link
                to="/accommodation"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 font-semibold rounded-full transition-all shadow-sm"
              >
                Разгледай стаите
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}