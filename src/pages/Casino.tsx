/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Clock, Shield, Sparkles, Trophy, Beer, Car, Users, Gamepad2 } from "lucide-react";

const liveGames = [
  { name: "Roulette", desc: "Класическа американска рулетка с професионални крупиета." },
  { name: "Black Jack", desc: "Най-популярната игра с карти в света." },
  { name: "Carribean Poker", desc: "Вълнуваща вариация на покера срещу казиното." },
  { name: "Three Card Poker", desc: "Бърза и динамична игра с три карти." },
  { name: "Casino Poker", desc: "Класическо казино преживяване за ценители." },
];

export default function Casino() {
  return (
    <div className="bg-brand-gray min-h-screen text-zinc-900">
      {/* Hero Section - Keeping layout, updating text */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/casino.webp" alt="Casino Sesame" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-zinc-900/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4 font-sans italic">
              Казино Сезам
            </h1>
            <p className="text-zinc-300 text-xl md:text-2xl font-light max-w-2xl">
              Лидер в хазартните забавления във Варна с над 20-годишна история и автентична атмосфера.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm mt-6">
              <Clock className="w-4 h-4 text-white" />
              Отворено 24/7
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 relative bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-sans mb-8 tracking-tight text-zinc-900">Традиция и Локация</h2>
              <p className="text-zinc-900 dark:text-white text-lg font-light leading-relaxed mb-6">
                Вече повече от 20 години Казино Сезам е лидер в сферата на хазартните забавления и посреща гости от цял свят в морската столица на България – град Варна.
              </p>
              <p className="text-zinc-900 dark:text-white text-lg font-light leading-relaxed mb-8">
                Със своята уникална локация в сърцето на града и на метри от морето, казино „Сезам“ впечатлява с класическата си и автентична казино атмосфера. Разположено на главната пешеходна улица, нашето казино е в центъра на всичко, което се случва във Варна.
              </p>
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                <Shield className="w-10 h-10 text-brand-blue shrink-0" />
                <p className="text-sm text-zinc-900 dark:text-white font-medium">Политиката за сигурност и дискретност гарантират вашето спокойствие.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-200 shadow-xl"
            >
              <img src="/images/martini-1.webp" alt="Casino Interior" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Games Section */}
      <section className="py-24 bg-brand-gray border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-sans mb-4 text-zinc-900">Маси за жива игра</h2>
            <p className="text-zinc-900 dark:text-white font-light">Класически игри с професионален персонал.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {liveGames.map((game, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white border border-zinc-200 rounded-2xl hover:border-brand-blue/30 transition-all group shadow-sm"
              >
                <Sparkles className="w-6 h-6 text-zinc-900 dark:text-white mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 text-zinc-900">{game.name}</h3>
                <p className="text-zinc-900 dark:text-white text-xs font-light leading-relaxed">{game.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Poker Club Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-zinc-800 rounded-[3rem] p-8 md:p-16 text-zinc-900 dark:text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue border border-brand-blue rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
                  Ново от 2019
                </div>
                <h2 className="text-4xl md:text-5xl font-sans mb-6 text-zinc-900 dark:text-white">Покер Клуб Сезам</h2>
                <p className="text-zinc-900 dark:text-white font-light text-lg leading-relaxed mb-8">
                  Любителите на покера могат да се насладят на Texas Hold‘em Poker и Omaha Hi Poker, както и да участват в различни организирани турнири в модерна и комфортна обстановка.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-brand-blue dark:text-white" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Турнири</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-blue dark:text-white" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Кеш игри</span>
                  </div>
                </div>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src="/images/martini-2.webp" alt="Poker Club" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slots Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm text-center">
                  <h4 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">100+</h4>
                  <p className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Автомата</p>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm text-center">
                  <h4 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">500+</h4>
                  <p className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Слот игри</p>
                </div>
                <div className="col-span-2 p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm flex items-center justify-center gap-6">
                  <Gamepad2 className="w-10 h-10 text-zinc-900 dark:text-white" />
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-zinc-900">Електронна Рулетка</h4>
                    <p className="text-zinc-500 text-sm font-light">Високотехнологично оборудване</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-sans mb-6 text-zinc-900">Слот Зала</h2>
              <p className="text-zinc-900 dark:text-white font-light text-lg leading-relaxed mb-6">
                Казиното предлага най-модерното и високотехнологично игрално оборудване. Гостите могат да се насладят на богато разнообразие от над 100 игрални автомата с различна тематика.
              </p>
              <p className="text-zinc-900 dark:text-white font-light text-lg leading-relaxed">
                Открийте хитовете в световната игрална индустрия, атрактивни мистерии и прогресивни джакпоти, които ви очакват денонощно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-brand-gray border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-sans mb-4 text-zinc-900">Ексклузивни услуги</h2>
            <p className="text-zinc-900 dark:text-white font-light">Повече от просто игра – пълно преживяване.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-3xl border border-zinc-200 shadow-sm text-center group hover:border-brand-blue/20 transition-all">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-900 dark:text-white group-hover:bg-zinc-900 dark:group-hover:bg-white/20 group-hover:text-white transition-all">
                <Car className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">Безплатен Паркинг</h4>
              <p className="text-zinc-900 dark:text-white text-sm font-light">Осигурено място за вашия автомобил по време на престоя ви в казиното.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl border border-zinc-200 shadow-sm text-center group hover:border-brand-blue/20 transition-all">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-900 dark:text-white group-hover:bg-zinc-900 dark:group-hover:bg-white/20 group-hover:text-white transition-all">
                <Beer className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">Храни и Напитки</h4>
              <p className="text-zinc-900 dark:text-white text-sm font-light">Безплатни храни и напитки за нашите активни играчи през целия престой.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl border border-zinc-200 shadow-sm text-center group hover:border-brand-blue/20 transition-all">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-900 dark:text-white group-hover:bg-zinc-900 dark:group-hover:bg-white/20 group-hover:text-white transition-all">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">Бонуси и Промоции</h4>
              <p className="text-zinc-900 dark:text-white text-sm font-light">Ежедневни промоции и специални бонуси за нашите лоялни клиенти.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}