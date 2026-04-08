import React, { useState } from "react";
import { motion } from "motion/react";
import { Users, Maximize, ChevronRight, Monitor, LayoutGrid, BookOpen, Table2 } from "lucide-react";
import ConferenceInquiryForm from "../components/ConferenceInquiryForm";

const capacityIcons: Record<string, React.ReactNode> = {
  "Киносалон": <Monitor className="w-4 h-4" />,
  "П-образно": <LayoutGrid className="w-4 h-4" />,
  "Класна стая": <BookOpen className="w-4 h-4" />,
  "Заседателна маса": <Table2 className="w-4 h-4" />,
};

const halls = [
  {
    name: "Зала Черно Море",
    size: "213 кв.м",
    dimensions: "11.5 м / 18.5 м / 3.0 м",
    images: ["/images/conference/chm1.jpg", "/images/conference/chm2.jpg"],
    description: "С площ от 213 кв.м. елегантно проектираната зала Черно море може да посрещне едновременно до 230 гости на Вашето корпоративно събитие.",
    capacities: [
      { label: "Киносалон", value: 230 },
      { label: "П-образно", value: 40 },
      { label: "Класна стая", value: 132 },
    ]
  },
  {
    name: "Зала Варна",
    size: "144 кв.м",
    dimensions: "12.5 м / 11.5 м / 3.0 м",
    images: ["/images/conference/chm3.jpg", "/images/conference/chm4.jpg"],
    description: "С площ от 144 кв.м. зала Варна е перфектният избор за Вашата работна среща или корпоративно събитие с капацитет до 130 гости.",
    capacities: [
      { label: "Киносалон", value: 130 },
      { label: "П-образно", value: 32 },
      { label: "Класна стая", value: 80 },
    ]
  },
  {
    name: "Зала Галата",
    size: "59 кв.м",
    dimensions: "9 м / 6.5 м / 3.0 м",
    images: ["/images/conference/chm5.jpg", "/images/conference/chm6.jpg"],
    description: "С площ от 59 кв.м. зала Галата съчетава функционалност и уют. Подходяща е за семинари и обучения, както и за по-малки срещи и събития - максимален капацитет 50 гости.",
    capacities: [
      { label: "Киносалон", value: 50 },
      { label: "П-образно", value: 20 },
      { label: "Класна стая", value: 32 },
    ]
  },
  {
    name: "Зала Одесос",
    size: "63 кв.м",
    dimensions: "10.5 м / 6 м / 3.0 м",
    images: ["/images/conference/chm7.webp"],
    description: "Eлегантно облицована и комфортна, най-малката зала Одесос в Конферентния център предлага изключителни условия за малки мероприятия и съвещания.",
    capacities: [
      { label: "Заседателна маса", value: 20 },
    ]
  },
  {
    name: "Зала „България\"",
    size: "437 кв.м",
    dimensions: "N/A",
    images: ["/images/conference/bghall.webp"],
    description: "С площ от 437 кв.м., зала България е най-голямата и многофункционална зала в Конферентния център. Тя може да се използва като едно общо пространство с капацитет до 550 гости, подходящо за мащабни корпоративни събития и конференции. Залата разполага с възможност да бъде разделена на три самостоятелни части.",
    capacities: [
      { label: "Киносалон", value: 550 },
      { label: "П-образно", value: 86 },
      { label: "Класна стая", value: 304 },
    ],
    subHalls: [
      { name: "България част I", size: "144 кв.м", capacities: [{ label: "Киносалон", value: 178 }, { label: "П-образно", value: 46 }, { label: "Класна стая", value: 88 }] },
      { name: "България част II", size: "147 кв.м", capacities: [{ label: "Киносалон", value: 188 }, { label: "П-образно", value: 46 }, { label: "Класна стая", value: 96 }] },
      { name: "България част III", size: "144 кв.м", capacities: [{ label: "Киносалон", value: 164 }, { label: "П-образно", value: 42 }, { label: "Класна стая", value: 84 }] },
      { name: "България I+II или II+III", size: "291 кв.м", capacities: [{ label: "Киносалон", value: 350 }, { label: "П-образно", value: 54 }, { label: "Класна стая", value: 180 }] },
    ]
  }
];

export default function Conference() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="bg-brand-gray min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/conference.jpeg" alt="Conference Center" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-zinc-900/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4 leading-tight font-sans italic">
              Конферентен Център
            </h1>
            <p className="text-zinc-300 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
              Конферентният център разполага с 4 мултифункционални зали. Три от тях са с възможност за различен тип подредба, а четвъртата е VIP зала за заседания. Залите предлагат висок стандарт на съвременно техническо оборудване.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Halls Listing */}
      <section className="py-24 md:py-32 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {halls.map((hall, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                  
                  {/* Images column */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 flex flex-col gap-4"
                  >
                    {hall.images.length === 1 ? (
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={hall.images[0]} alt={hall.name} className="w-full h-full object-cover rounded-sm hover:scale-105 transition-transform duration-700" />
                      </div>
                    ) : (
                      <>
                        <div className="aspect-[16/9] w-full overflow-hidden">
                          <img src={hall.images[0]} alt={`${hall.name} view 1`} className="w-full h-full object-cover rounded-sm hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="aspect-[21/9] w-full overflow-hidden">
                          <img src={hall.images[1]} alt={`${hall.name} view 2`} className="w-full h-full object-cover rounded-sm hover:scale-105 transition-transform duration-700" />
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Text column */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs tracking-widest uppercase text-zinc-500 font-semibold">{hall.size}</span>
                      <div className="h-px w-12 bg-zinc-300"></div>
                      {hall.dimensions !== "N/A" && (
                        <span className="text-xs tracking-widest uppercase text-zinc-500 font-semibold">Размери: {hall.dimensions}</span>
                      )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans text-zinc-900 mb-6">{hall.name}</h2>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg mb-10">
                      {hall.description}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
                      <div className="col-span-2 text-sm uppercase tracking-wider text-zinc-900 font-semibold mb-2">Капацитет и подредба</div>
                      {hall.capacities.map((cap, j) => (
                        <div key={j} className="flex items-center gap-3">
                          {capacityIcons[cap.label] || <Users className="w-5 h-5 text-zinc-500" />}
                          <span className="text-zinc-500 font-light">{cap.label}: <strong className="font-medium text-zinc-900">{cap.value}</strong></span>
                        </div>
                      ))}
                    </div>

                    {/* Sub-halls for Bulgaria */}
                    {hall.subHalls && (
                      <div className="mb-10 p-6 bg-brand-blue rounded-3xl border border-white/10 shadow-xl overflow-hidden">
                        <h3 className="text-sm uppercase tracking-wider text-white font-bold mb-6">Възможни конфигурации</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {hall.subHalls.map((sub, k) => (
                            <div key={k} className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-white/10 last:border-0">
                              <span className="text-base font-medium text-white">{sub.name} ({sub.size})</span>
                              <div className="flex flex-wrap gap-4">
                                {sub.capacities.map((cap, l) => (
                                  <span key={l} className="text-xs text-white/70 font-light flex items-center gap-1.5">
                                    {cap.label}: <strong className="font-semibold text-white">{cap.value}</strong>
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setIsInquiryOpen(true)}
                      className="self-start inline-flex items-center gap-3 px-8 py-4 bg-brand-blue hover:bg-brand-blue-light text-white rounded-none transition-colors group"
                    >
                      <span className="text-sm tracking-wider uppercase font-medium">Изпрати запитване</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-gray py-24">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-sans text-zinc-900 mb-6">Имате нужда от перфектното място?</h2>
            <p className="text-zinc-500 font-light text-lg mb-10">
              Свържете се с нас, за да обсъдим детайлите за Вашето събитие. Нашият екип ще се погрижи за всичко!
            </p>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-blue text-white uppercase tracking-widest text-sm rounded-full"
            >
              Изпрати запитване
            </button>
         </div>
      </section>

      <ConferenceInquiryForm isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
