"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Wifi, Wind, Coffee, Bath, Tv, Shield, Maximize2, Star, Eye } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";

const translations = {
  BG: {
    heroTitle: "199 стаи, 14 етажа",
    heroSubtitle: "Напълно реновирани и обзаведени със стил и внимание към детайла.",
    book: "Резервирай",
    perNight: "НОЩ",
    from: "от",
    amenities: "Удобства в стаята"
  },
  EN: {
    heroTitle: "199 rooms, 14 floors",
    heroSubtitle: "Fully renovated and furnished with style and attention to detail.",
    book: "Book Now",
    perNight: "NIGHT",
    from: "from",
    amenities: "Room Amenities"
  },
  RU: {
    heroTitle: "199 номеров, 14 этажей",
    heroSubtitle: "Полностью отремонтированы и обставлены со вкусом и вниманием к деталям.",
    book: "Забронировать",
    perNight: "НОЧЬ",
    from: "от",
    amenities: "Удобства в номере"
  },
  UA: {
    heroTitle: "199 номерів, 14 поверхів",
    heroSubtitle: "Повністю відремонтовані та мебльовані зі стилем та увагою до деталей.",
    book: "Забронювати",
    perNight: "НІЧ",
    from: "від",
    amenities: "Зручності у номері"
  },
  DE: {
    heroTitle: "199 Zimmer, 14 Etagen",
    heroSubtitle: "Vollständig renoviert und mit Stil und Liebe zum Detail eingerichtet.",
    book: "Buchen",
    perNight: "NACHT",
    from: "ab",
    amenities: "Zimmerausstattung"
  }
};

const roomTypesData = {
  BG: [
    { 
      id: 1, 
      name: "Единична Стая Класик", 
      size: "22 м²", 
      guests: "1 гост", 
      image: "/images/rooms/classic-single.jpg", 
      description: "Перфектният избор за соло пътешественици. Насладете се на уютна атмосфера с модерен дизайн и спираща дъха панорамна гледка към морето или града от Вашата собствена тераса.", 
      amenities: ["Спалня (120/190см)", "Индивидуален климатик", "Безплатен Wi-Fi", "LCD Телевизор", "Мини бар", "Сейф", "Термокана с кафе и чай", "Тераса с панорама"] 
    },
    { 
      id: 2, 
      name: "Двойна Стая Класик", 
      size: "25 м²", 
      guests: "2 гости", 
      image: "/images/rooms/classic-double.jpg", 
      description: "Елегантност и комфорт съчетани в едно. Стаята разполага с голямо двойно легло и всички необходими удобства за пълноценна почивка със специален акцент върху детайла.", 
      amenities: ["Спалня (160/200см)", "Индивидуален климатик", "Безплатен Wi-Fi", "LCD Телевизор", "Мини бар", "Сейф", "Термокана с кафе и чай", "Тераса с панорама"] 
    },
    { 
      id: 3, 
      name: "Двойна Стая Класик (Twin)", 
      size: "25 м²", 
      guests: "2 гости", 
      image: "/images/rooms/classic-twin.jpg", 
      description: "Функционална и светла стая с две отделни легла. Идеална за приятели или колеги, търсещи комфортно настаняване с панорамна тераса.", 
      amenities: ["Две отделни легла", "Индивидуален климатик", "Безплатен Wi-Fi", "LCD Телевизор", "Мини бар", "Сейф", "Термокана с кафе и чай", "Тераса с панорама"] 
    },
    { 
      id: 4, 
      name: "Двойна Стая Делукс", 
      size: "28 м²", 
      guests: "2-3 гости", 
      image: "/images/rooms/deluxe-double.jpg", 
      description: "Повече пространство и премиум усещане. Делукс стаите предлагат допълнителен комфорт и модерно обзавеждане, подходящи за по-дълъг престой.", 
      amenities: ["Голямо двойно легло", "Индивидуален климатик", "Безплатен Wi-Fi", "LCD Телевизор", "Кафе машина", "Мини бар", "Сейф", "Луксозна козметика"] 
    },
    { 
      id: 5, 
      name: "Двойна Стая Делукс (Twin)", 
      size: "28 м²", 
      guests: "2-3 гости", 
      image: "/images/rooms/deluxe-twin.jpg", 
      description: "Просторна стая с две отделни легла и зона за релакс. Дизайнът е вдъхновен от морския бриз и модерния градски стил.", 
      amenities: ["Две легла", "Индивидуален климатик", "Безплатен Wi-Fi", "LCD Телевизор", "Кафе машина", "Мини бар", "Сейф", "Луксозна козметика"] 
    },
    { 
      id: 6, 
      name: "Двойна Стая Ексклузив", 
      size: "32 м²", 
      guests: "2 гости", 
      image: "/images/rooms/exclusive.jpg", 
      description: "На върха на комфорта. Ексклузивните стаи предлагат най-високо ниво на обзавеждане, халати, чехли и специално внимание към всеки гост.", 
      amenities: ["King size легло", "Индивидуален климатик", "Безплатен Wi-Fi", "LCD Телевизор", "Кафе машина", "Мини бар", "Халати и чехли", "Сейф"] 
    },
    { 
      id: 7, 
      name: "Апартамент", 
      size: "52 м²", 
      guests: "2-3 гости", 
      image: "/images/rooms/suite.jpg", 
      description: "Вашият дом далеч от дома. Разполага с отделна дневна за почивка или работа и уютна спалня, осигуряващи максимално спокойствие.", 
      amenities: ["Отделна дневна", "King size легло", "Индивидуален климатик", "Мини бар", "Кафе машина", "Сейф", "Вана", "Панорамна тераса"] 
    },
    { 
      id: 8, 
      name: "Ексклузивен апартамент", 
      size: "65 м²", 
      guests: "2-4 гости", 
      image: "/images/rooms/exclusive-suite.jpg", 
      description: "Лукс и простор без компромиси. Ексклузивният апартамент предлага модерно интериорно решение с широка дневна и панорамна гледка към залива.", 
      amenities: ["Широка дневна", "King size легло", "Индивидуален климатик", "Кафе машина", "Мини бар", "Сейф", "Ютия и дъска", "Луксозна баня"] 
    },
    { 
      id: 9, 
      name: "Президентски апартамент", 
      size: "85 м²", 
      guests: "2-4 гости", 
      image: "/images/rooms/presidential-suite.jpg", 
      description: "Връхната точка на гостоприемството. Най-ексклузивното ни предложение с 65-инчов телевизор, кафе машина с капсули, халати и безкомпромисен лукс.", 
      amenities: ["King size (200/200см)", "LCD 65 инча", "Кафе машина", "Джакузи/Вана", "Дневна и спалня", "Халати и чехли", "Ютия и дъска", "VIP зареждане"] 
    },
  ],
  EN: [
    { 
      id: 1, 
      name: "Classic Single Room", 
      size: "22 m²", 
      guests: "1 guest", 
      image: "/images/rooms/classic-single.jpg", 
      description: "The perfect choice for solo travelers. Enjoy a cozy atmosphere with modern design and breathtaking panoramic views of the sea or city from your private terrace.", 
      amenities: ["Bed (120/190cm)", "Indiv. AC", "Free Wi-Fi", "LCD TV", "Mini Bar", "Safe", "Tea/Coffee Kettle", "Panoramic Terrace"] 
    },
    { 
      id: 2, 
      name: "Classic Double Room", 
      size: "25 m²", 
      guests: "2 guests", 
      image: "/images/rooms/classic-double.jpg", 
      description: "Elegance and comfort combined. The room features a large double bed and all necessary amenities for a fulfilling rest with a special focus on detail.", 
      amenities: ["Bed (160/200cm)", "Indiv. AC", "Free Wi-Fi", "LCD TV", "Mini Bar", "Safe", "Tea/Coffee Kettle", "Panoramic Terrace"] 
    },
    { 
      id: 3, 
      name: "Classic Twin Room", 
      size: "25 m²", 
      guests: "2 guests", 
      image: "/images/rooms/classic-twin.jpg", 
      description: "A functional and bright room with two separate beds. Ideal for friends or colleagues seeking comfortable accommodation with a panoramic terrace.", 
      amenities: ["Two separate beds", "Indiv. AC", "Free Wi-Fi", "LCD TV", "Mini Bar", "Safe", "Tea/Coffee Kettle", "Panoramic Terrace"] 
    },
    { 
      id: 4, 
      name: "Deluxe Double Room", 
      size: "28 m²", 
      guests: "2-3 guests", 
      image: "/images/rooms/deluxe-double.jpg", 
      description: "More space and a premium feel. Deluxe rooms offer additional comfort and modern furnishings, suitable for longer stays.", 
      amenities: ["Large double bed", "Indiv. AC", "Free Wi-Fi", "LCD TV", "Coffee Machine", "Mini Bar", "Safe", "Luxury Cosmetics"] 
    },
    { 
      id: 5, 
      name: "Deluxe Twin Room", 
      size: "28 m²", 
      guests: "2-3 guests", 
      image: "/images/rooms/deluxe-twin.jpg", 
      description: "A spacious room with two separate beds and a relaxation area. The design is inspired by the sea breeze and modern urban style.", 
      amenities: ["Two beds", "Indiv. AC", "Free Wi-Fi", "LCD TV", "Coffee Machine", "Mini Bar", "Safe", "Luxury Cosmetics"] 
    },
    { 
      id: 6, 
      name: "Exclusive Double Room", 
      size: "32 m²", 
      guests: "2 guests", 
      image: "/images/rooms/exclusive.jpg", 
      description: "At the peak of comfort. Exclusive rooms offer the highest level of furnishings, bathrobes, slippers, and special attention to every guest.", 
      amenities: ["King size bed", "Indiv. AC", "Free Wi-Fi", "LCD TV", "Coffee Machine", "Mini Bar", "Bathrobes & Slippers", "Safe"] 
    },
    { 
      id: 7, 
      name: "Suite", 
      size: "52 m²", 
      guests: "2-3 guests", 
      image: "/images/rooms/suite.jpg", 
      description: "Your home away from home. Features a separate living room for relaxation or work and a cozy bedroom, ensuring maximum tranquility.", 
      amenities: ["Separate living room", "King size bed", "Indiv. AC", "Mini Bar", "Coffee Machine", "Safe", "Bathtub", "Panoramic Terrace"] 
    },
    { 
      id: 8, 
      name: "Exclusive Suite", 
      size: "65 m²", 
      guests: "2-4 guests", 
      image: "/images/rooms/exclusive-suite.jpg", 
      description: "Luxury and space without compromise. The exclusive suite offers a modern interior solution with a wide living room and panoramic views of the bay.", 
      amenities: ["Wide living room", "King size bed", "Indiv. AC", "Coffee Machine", "Mini Bar", "Safe", "Iron & Board", "Luxury Bathroom"] 
    },
    { 
      id: 9, 
      name: "Presidential Suite", 
      size: "85 m²", 
      guests: "2-4 guests", 
      image: "/images/rooms/presidential-suite.jpg", 
      description: "The pinnacle of hospitality. Our most exclusive offering with a 65-inch TV, capsule coffee machine, bathrobes, and uncompromising luxury.", 
      amenities: ["King size (200/200cm)", "65-inch LCD", "Coffee Machine", "Jacuzzi/Bathtub", "Living & Bedroom", "Bathrobes & Slippers", "Iron & Board", "VIP Setup"] 
    },
  ],
  RU: [
    { id: 1, name: "Классический Одноместный Номер", size: "22 м²", guests: "1 гость", image: "/images/rooms/classic-single.jpg", description: "Одноместный номер с видом на море и всеми необходимыми удобствами.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар"] },
    { id: 2, name: "Классический Двухместный Номер", size: "25 м²", guests: "2 гостя", image: "/images/rooms/classic-double.jpg", description: "Двухместный номер с видом на море и удобной двуспальной кроватью.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар"] },
    { id: 3, name: "Классический Твин Номер", size: "25 м²", guests: "2 гостя", image: "/images/rooms/classic-twin.jpg", description: "Двухместный номер с двумя отдельными кроватями и видом на море.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар"] },
    { id: 4, name: "Делюкс Двухместный Номер", size: "28 м²", guests: "2-3 гостя", image: "/images/rooms/deluxe-double.jpg", description: "Просторный номер делюкс с двуспальной кроватью и панорамным видом.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар"] },
    { id: 5, name: "Делюкс Твин Номер", size: "28 м²", guests: "2-3 гостя", image: "/images/rooms/deluxe-twin.jpg", description: "Просторный номер делюкс с двумя отдельными кроватями и панорамным видом.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар"] },
    { id: 6, name: "Эксклюзивный Двухместный Номер", size: "32 м²", guests: "2 гостя", image: "/images/rooms/exclusive.jpg", description: "Эксклюзивный номер с высококлассной мебелью и видом на море.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар"] },
    { id: 7, name: "Апартаменты", size: "52 м²", guests: "2-3 гостя", image: "/images/rooms/suite.jpg", description: "Роскошные апартаменты с отдельной гостиной и спальней.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар", "Джакузи"] },
    { id: 8, name: "Эксклюзивные Апартаменты", size: "65 м²", guests: "2-4 гостя", image: "/images/rooms/exclusive-suite.jpg", description: "Эксклюзивные апартаменты с просторной гостиной, спальней и террасой.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар", "Джакузи"] },
    { id: 9, name: "Президентский Люкс", size: "85 м²", guests: "2-4 гостя", image: "/images/rooms/presidential-suite.jpg", description: "Самый роскошный люкс с двумя спальнями, гостиной и панорамной террасой.", amenities: ["Wi-Fi", "Кондиционер", "Терраса", "Мини-бар", "Джакузи"] },
  ],
  UA: [
    { id: 1, name: "Класичний Одномісний Номер", size: "22 м²", guests: "1 гість", image: "/images/rooms/classic-single.jpg", description: "Одномісний номер з видом на море та всіма необхідними зручностями.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар"] },
    { id: 2, name: "Класичний Двомісний Номер", size: "25 м²", guests: "2 гостя", image: "/images/rooms/classic-double.jpg", description: "Двомісний номер з видом на море та зручним двоспальним ліжком.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар"] },
    { id: 3, name: "Класичний Твін Номер", size: "25 м²", guests: "2 гостя", image: "/images/rooms/classic-twin.jpg", description: "Двомісний номер з двома окремими ліжками та видом на море.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар"] },
    { id: 4, name: "Делюкс Двомісний Номер", size: "28 м²", guests: "2-3 гостя", image: "/images/rooms/deluxe-double.jpg", description: "Просторий номер делюкс з двоспальним ліжком та панорамним видом.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар"] },
    { id: 5, name: "Делюкс Твін Номер", size: "28 м²", guests: "2-3 гостя", image: "/images/rooms/deluxe-twin.jpg", description: "Просторий номер делюкс з двома окремими ліжками та панорамним видом.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар"] },
    { id: 6, name: "Ексклюзивний Двомісний Номер", size: "32 м²", guests: "2 гостя", image: "/images/rooms/exclusive.jpg", description: "Ексклюзивний номер з висококласними меблями та видом на море.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар"] },
    { id: 7, name: "Апартаменти", size: "52 м²", guests: "2-3 гостя", image: "/images/rooms/suite.jpg", description: "Розкішні апартаменти з окремою вітальнею та спальнею.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар", "Джакузі"] },
    { id: 8, name: "Ексклюзивні Апартаменти", size: "65 м²", guests: "2-4 гостя", image: "/images/rooms/exclusive-suite.jpg", description: "Ексклюзивні апартаменти с просторою вітальнею, спальнею та терасою.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар", "Джакузі"] },
    { id: 9, name: "Президентський Люкс", size: "85 м²", guests: "2-4 гостя", image: "/images/rooms/presidential-suite.jpg", description: "Найрозкішніший люкс з двома спальнями, вітальнею та панорамною терасою.", amenities: ["Wi-Fi", "Кондиціонер", "Тераса", "Міні-бар", "Джакузі"] },
  ],
  DE: [
    { id: 1, name: "Classic Einzelzimmer", size: "22 m²", guests: "1 Gast", image: "/images/rooms/classic-single.jpg", description: "Einzelzimmer mit Meerblick und allen notwendigen Annehmlichkeiten.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar"] },
    { id: 2, name: "Classic Doppelzimmer", size: "25 m²", guests: "2 Gäste", image: "/images/rooms/classic-double.jpg", description: "Doppelzimmer with Sea View and all necessary amenities.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar"] },
    { id: 3, name: "Classic Twin Zimmer", size: "25 m²", guests: "2 Gäste", image: "/images/rooms/classic-twin.jpg", description: "Doppelzimmer mit zwei Einzelbetten und Meerblick.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar"] },
    { id: 4, name: "Deluxe Doppelzimmer", size: "28 m²", guests: "2-3 Gäste", image: "/images/rooms/deluxe-double.jpg", description: "Geräumiges Deluxe-Zimmer mit Doppelbett and Panoramablick.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar"] },
    { id: 5, name: "Deluxe Twin Zimmer", size: "28 m²", guests: "2-3 Gäste", image: "/images/rooms/deluxe-twin.jpg", description: "Geräumiges Deluxe-Zimmer with two separate beds and panoramic view.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar"] },
    { id: 6, name: "Exclusive Doppelzimmer", size: "32 m²", guests: "2 Gäste", image: "/images/rooms/exclusive.jpg", description: "Exklusives Zimmer mit hochwertiger Einrichtung und Meerblick.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar"] },
    { id: 7, name: "Suite", size: "52 m²", guests: "2-3 Gäste", image: "/images/rooms/suite.jpg", description: "Luxuriöse Suite with separate living room and bedroom.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar", "Jacuzzi"] },
    { id: 8, name: "Exclusive Suite", size: "65 m²", guests: "2-4 Gäste", image: "/images/rooms/exclusive-suite.jpg", description: "Exklusive Suite mit geräumigem Wohnzimmer, Schlafzimmer and terrace.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar", "Jacuzzi"] },
    { id: 9, name: "Präsidenten-Suite", size: "85 m²", guests: "2-4 Gäste", image: "/images/rooms/presidential-suite.jpg", description: "Die luxuriöseste Suite with two bedrooms, living room and panoramic terrace.", amenities: ["Wi-Fi", "Klimaanlage", "Terrasse", "Minibar", "Jacuzzi"] },
  ]
};

const amenityIcons = {
  "Wi-Fi": <Wifi className="w-4 h-4" />,
  "Free Wi-Fi": <Wifi className="w-4 h-4" />,
  "Безплатен Wi-Fi": <Wifi className="w-4 h-4" />,
  "Климатик": <Wind className="w-4 h-4" />,
  "Air Conditioning": <Wind className="w-4 h-4" />,
  "Индивидуален климатик": <Wind className="w-4 h-4" />,
  "Indiv. AC": <Wind className="w-4 h-4" />,
  "Klimaanlage": <Wind className="w-4 h-4" />,
  "Кондиционер": <Wind className="w-4 h-4" />,
  "Кондиціонер": <Wind className="w-4 h-4" />,
  "Мини бар": <Coffee className="w-4 h-4" />,
  "Mini Bar": <Coffee className="w-4 h-4" />,
  "Minibar": <Coffee className="w-4 h-4" />,
  "Мини-бар": <Coffee className="w-4 h-4" />,
  "Міні-бар": <Coffee className="w-4 h-4" />,
  "Тераса": <Eye className="w-4 h-4" />,
  "Terrace": <Eye className="w-4 h-4" />,
  "Тераса с панорама": <Maximize2 className="w-4 h-4" />,
  "Panoramic Terrace": <Maximize2 className="w-4 h-4" />,
  "LCD Телевизор": <Tv className="w-4 h-4" />,
  "LCD TV": <Tv className="w-4 h-4" />,
  "LCD 65 инча": <Tv className="w-4 h-4" />,
  "65-inch LCD": <Tv className="w-4 h-4" />,
  "Сейф": <Shield className="w-4 h-4" />,
  "Safe": <Shield className="w-4 h-4" />,
  "Термокана с кафе и чай": <Coffee className="w-4 h-4" />,
  "Tea/Coffee Kettle": <Coffee className="w-4 h-4" />,
  "Кафе машина": <Coffee className="w-4 h-4" />,
  "Coffee Machine": <Coffee className="w-4 h-4" />,
  "Вана": <Bath className="w-4 h-4" />,
  "Bathtub": <Bath className="w-4 h-4" />,
  "Джакузи": <Bath className="w-4 h-4" />,
  "Jacuzzi": <Bath className="w-4 h-4" />,
  "Jacuzzi/Bathtub": <Bath className="w-4 h-4" />,
  "Джакузи/Вана": <Bath className="w-4 h-4" />,
  "Халати и чехли": <Bath className="w-4 h-4" />,
  "Bathrobes & Slippers": <Bath className="w-4 h-4" />,
  "Ютия и дъска": <Maximize2 className="w-4 h-4" />,
  "Iron & Board": <Maximize2 className="w-4 h-4" />,
};

export default function Accommodation() {
  const { language } = useAppContext();
  const t = translations[language as keyof typeof translations];
  const roomTypes = roomTypesData[language as keyof typeof roomTypesData];
  const [selectedRoom, setSelectedRoom] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[60vh] md:h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hotel-10.jpeg" alt="Accommodation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4 font-sans font-bold">{t.heroTitle}</h1>
            <p className="text-zinc-200 text-lg md:text-2xl font-light max-w-2xl">{t.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-gray py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <button
              onClick={() => scrollTabs('left')}
              className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-600" />
            </button>
            <div ref={tabsRef} className="flex overflow-x-auto no-scrollbar gap-3 pb-2 flex-1 scroll-smooth">
              {roomTypes.map((room, i) => (
                <button 
                  key={room.id} 
                  onClick={() => setSelectedRoom(i)} 
                  className={`shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedRoom === i ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"}`}
                >
                  {room.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTabs('right')}
              className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="w-5 h-5 text-zinc-600" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedRoom} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden group shadow-2xl">
                <img 
                  src={roomTypes[selectedRoom].image} 
                  alt={roomTypes[selectedRoom].name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="px-5 py-2.5 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">{roomTypes[selectedRoom].size}</span>
                  <span className="px-5 py-2.5 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">{roomTypes[selectedRoom].guests}</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-sans text-zinc-900 mb-6 tracking-tight font-bold">{roomTypes[selectedRoom].name}</h2>
                <p className="text-zinc-500 text-lg leading-relaxed mb-8 font-light">{roomTypes[selectedRoom].description}</p>
                
                <div className="mb-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">{t.amenities}</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    {roomTypes[selectedRoom].amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-zinc-900">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm border border-zinc-100 dark:border-zinc-700">
                          {amenityIcons[amenity as keyof typeof amenityIcons] || <Star className="w-4 h-4" />}
                        </div>
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button 
                    onClick={handleBookClick} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold rounded-2xl transition-all shadow-xl shadow-brand-blue/30 active:scale-[0.98]"
                  >
                    {t.book}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}