/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, ChevronRight, CheckCircle2, BedDouble, ExternalLink } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: string;
}

const roomOptions = [
  "Единична Стая Класик",
  "Двойна Стая Класик",
  "Двойна Стая Делукс",
  "Двойна Стая Ексклузив",
  "Апартамент",
  "Президентски Апартамент"
];

const BOOKING_URL = "https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786";

export default function BookingModal({ isOpen, onClose, initialRoom }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    room: initialRoom || roomOptions[0],
    guests: "2",
    name: "",
    email: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const resetAndClose = () => {
    setTimeout(() => {
      setStep(1);
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
          >
            {/* Sidebar / Left Decorative */}
            <div className="hidden md:flex md:w-1/3 bg-zinc-900 p-8 flex-col justify-between text-white relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
              <div>
                <h3 className="text-2xl font-sans mb-2">Резервация</h3>
                <p className="text-zinc-400 text-sm font-light">Вашият престой започва тук.</p>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${step >= s ? "bg-amber-500 border-amber-500 text-white" : "border-zinc-800 text-zinc-600"}`}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-xs uppercase tracking-widest font-bold ${step >= s ? "text-white" : "text-zinc-700"}`}>
                      {s === 1 ? "Дати" : s === 2 ? "Детайли" : "Контакти"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
                Хотел Черно Море © 2025
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 md:p-10 flex flex-col">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-xl font-bold text-zinc-900 mb-6">Изберете дати</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">Настаняване</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="date"
                              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                              value={bookingData.checkIn}
                              onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">Напускане</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input 
                              type="date"
                              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                              value={bookingData.checkOut}
                              onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">Брой гости</label>
                        <select 
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none"
                          value={bookingData.guests}
                          onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                        >
                          {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'гост' : 'гости'}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-xl font-bold text-zinc-900 mb-6">Изберете стая</h4>
                      <div className="space-y-2">
                        {roomOptions.map((room) => (
                          <button
                            key={room}
                            onClick={() => setBookingData({ ...bookingData, room })}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                              bookingData.room === room 
                                ? "bg-amber-50 border-amber-500 text-amber-900" 
                                : "bg-white border-zinc-100 text-zinc-600 hover:border-zinc-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <BedDouble className={`w-4 h-4 ${bookingData.room === room ? "text-amber-500" : "text-zinc-300"}`} />
                              <span className="text-sm font-medium">{room}</span>
                            </div>
                            {bookingData.room === room && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-xl font-bold text-zinc-900 mb-2">Вашите данни</h4>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-6">Финален преглед на резервацията</p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">Име и Фамилия</label>
                          <input 
                            required
                            type="text"
                            placeholder="Иван Иванов"
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none"
                            value={bookingData.name}
                            onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">Имейл</label>
                          <input 
                            required
                            type="email"
                            placeholder="example@mail.com"
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none"
                            value={bookingData.email}
                            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          />
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-2xl text-[11px] text-zinc-400 space-y-1">
                          <div className="flex justify-between"><span>Стая:</span> <span className="text-white">{bookingData.room}</span></div>
                          <div className="flex justify-between"><span>Период:</span> <span className="text-white">{bookingData.checkIn || '?'} — {bookingData.checkOut || '?'}</span></div>
                          <div className="flex justify-between"><span>Гости:</span> <span className="text-white">{bookingData.guests}</span></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-zinc-900 mb-2">Благодарим ви!</h4>
                      <p className="text-zinc-500 font-light max-w-xs mx-auto mb-4">
                        За да завършите резервацията си, моля продължете към нашата система за онлайн резервации.
                      </p>
                      <div className="p-4 bg-zinc-50 rounded-xl mb-8 w-full max-w-sm">
                        <div className="flex justify-between text-sm mb-2"><span className="text-zinc-500">Стая:</span> <span className="text-zinc-900 font-medium">{bookingData.room}</span></div>
                        <div className="flex justify-between text-sm mb-2"><span className="text-zinc-500">Период:</span> <span className="text-zinc-900">{bookingData.checkIn || '?'} — {bookingData.checkOut || '?'}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-zinc-500">Гости:</span> <span className="text-zinc-900">{bookingData.guests}</span></div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
                          className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-amber-500/20"
                        >
                          Продължи към резервация
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={resetAndClose}
                          className="px-8 py-4 border border-zinc-200 text-zinc-600 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-zinc-50 transition-all"
                        >
                          Затвори
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              {step < 4 && (
                <div className="flex items-center justify-between mt-10">
                  {step > 1 ? (
                    <button 
                      onClick={prevStep}
                      className="text-sm font-bold text-zinc-400 hover:text-zinc-900 transition-colors p-2"
                    >
                      Назад
                    </button>
                  ) : <div />}
                  
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-3 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-white rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-amber-500/20"
                  >
                    {step === 3 ? "Потвърди" : "Напред"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
