"use client";

import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight, Building2, Megaphone } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const translations = {
  BG: {
    description: "Хотел Черно Море е символ на лукса и гостоприемството във Варна от 1978 година. Насладете се на панорамна гледка, изискана кухня и незабравими моменти.",
    quickLinks: "Бързи връзки",
    contact: "Контакти",
    reception: "Рецепция",
    marketing: "Отдел Маркетинг",
    rights: "Всички права запазени.",
    privacy: "Политика за поверителност",
    terms: "Условия за ползване"
  },
  EN: {
    description: "Hotel Cherno More has been a symbol of luxury and hospitality in Varna since 1978. Enjoy panoramic views, exquisite cuisine, and unforgettable moments.",
    quickLinks: "Quick Links",
    contact: "Contact",
    reception: "Reception",
    marketing: "Marketing Department",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use"
  },
  RU: {
    description: "Отель Черно Море является символом роскоши и гостеприимства в Варне с 1978 года. Наслаждайтесь панорамными видами, изысканной кухней и незабываемыми моментами.",
    quickLinks: "Быстрые ссылки",
    contact: "Контакты",
    reception: "Ресепшн",
    marketing: "Отдел маркетинга",
    rights: "Все права защищены.",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования"
  },
  UA: {
    description: "Готель Чорне Море є символом розкоші та гостинності у Варні з 1978 року. Насолоджуйтесь панорамними видами, вишуканою кухнею та незабутніми моментами.",
    quickLinks: "Швидкі посилання",
    contact: "Контакти",
    reception: "Рецепція",
    marketing: "Відділ маркетингу",
    rights: "Всі права захищені.",
    privacy: "Політика конфіденційності",
    terms: "Умови використання"
  },
  DE: {
    description: "Hotel Cherno More ist seit 1978 ein Symbol für Luxus und Gastfreundschaft in Varna. Genießen Sie Panoramablick, exquisite Küche und unvergessliche Momente.",
    quickLinks: "Schnelllinks",
    contact: "Kontakt",
    reception: "Rezeption",
    marketing: "Marketing-Abteilung",
    rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen"
  }
};

export default function Footer() {
  const { language } = useAppContext();
  const t = translations[language as keyof typeof translations] || translations.BG;

  const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";

  const navLinks = [
    { label: language === 'BG' ? 'Начало' : language === 'EN' ? 'Home' : language === 'RU' ? 'Главная' : language === 'UA' ? 'Головна' : 'Startseite', path: '/' },
    { label: language === 'BG' ? 'Настаняване' : language === 'EN' ? 'Accommodation' : language === 'RU' ? 'Размещение' : language === 'UA' ? 'Розміщення' : 'Unterkunft', path: BOOKING_URL, isExternal: true },
    { label: language === 'BG' ? 'Ресторант' : language === 'EN' ? 'Restaurant' : language === 'RU' ? 'Ресторант' : language === 'UA' ? 'Ресторан' : 'Restaurant', path: '/restaurant' },
    { label: language === 'BG' ? 'Конференции' : language === 'EN' ? 'Conference' : language === 'RU' ? 'Конференции' : language === 'UA' ? 'Конференції' : 'Konferenzen', path: '/conference' },
    { label: language === 'BG' ? 'Казино' : language === 'EN' ? 'Casino' : language === 'RU' ? 'Казино' : language === 'UA' ? 'Казино' : 'Kasino', path: '/casino' },
  ];

  return (
    <footer className="bg-brand-blue text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <img src="https://www.chernomorebg.com/images/cherno.png" alt="Hotel Cherno More" className="h-10 brightness-0 invert" />
            <p className="text-zinc-300 text-sm leading-relaxed font-light">{t.description}</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-sans mb-6">{t.quickLinks}</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.isExternal ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-zinc-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Reception */}
          <div>
            <h4 className="text-lg font-sans mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              {t.reception}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+359882907308" className="hover:text-white transition-colors">+359 882 907 308</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+35952612235" className="hover:text-white transition-colors">+359 52 612 235</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+35952612236" className="hover:text-white transition-colors">+359 52 612 236</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:reservations@chernomorebg.com" className="hover:text-white transition-colors">reservations@chernomorebg.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:reception@chernomorebg.com" className="hover:text-white transition-colors">reception@chernomorebg.com</a>
              </li>
            </ul>
          </div>

          {/* Marketing Department */}
          <div>
            <h4 className="text-lg font-sans mb-6 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-500" />
              {t.marketing}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+359884005995" className="hover:text-white transition-colors">+359 884 005 995</a>
                  <a href="tel:+35952612219" className="hover:text-white transition-colors">+359 52 61 22 19</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+359887433004" className="hover:text-white transition-colors">+359 887 433 004</a>
                  <a href="tel:+35952612220" className="hover:text-white transition-colors">+359 52 61 22 20</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+359884337351" className="hover:text-white transition-colors">+359 884 337 351</a>
                  <a href="tel:+35952612240" className="hover:text-white transition-colors">+359 52 61 22 40</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:chernomore@chernomorebg.com" className="hover:text-white transition-colors">chernomore@chernomorebg.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:reservations@chernomorebg.com" className="hover:text-white transition-colors">reservations@chernomorebg.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:marketing@chernomorebg.com" className="hover:text-white transition-colors">marketing@chernomorebg.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Hotel Cherno More. {t.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
