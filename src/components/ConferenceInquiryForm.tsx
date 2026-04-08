"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Check, Calendar, Users, Monitor, Utensils, Bed, Phone, Mail, User, Building } from "lucide-react";

const steps = [
  { id: 1, title: "Информация за събитието" },
  { id: 2, title: "Тип на събитието" },
  { id: 3, title: "Подреждане и брой гости" },
  { id: 4, title: "Техническо оборудване" },
  { id: 5, title: "Кетъринг услуги" },
  { id: 6, title: "Настаняване" },
  { id: 7, title: "Контактна информация" },
];

const eventTypes = [
  { id: "conference", label: "Конференция", icon: "🎤" },
  { id: "seminar", label: "Семинар", icon: "📚" },
  { id: "presentation", label: "Презентация", icon: "📊" },
  { id: "exhibition", label: "Изложение", icon: "🏛️" },
  { id: "gala", label: "Гала вечеря", icon: "🍽️" },
  { id: "cocktail", label: "Коктейл", icon: "🍸" },
  { id: "wedding", label: "Сватба", icon: "💒" },
  { id: "private", label: "Частно парти", icon: "🎉" },
  { id: "other", label: "Друго", icon: "✨" },
];

const hallSetups = [
  { id: "theater", label: "Киносалон", capacity: 550 },
  { id: "classroom", label: "Класна стая", capacity: 304 },
  { id: "ushape", label: "П-образно", capacity: 86 },
  { id: "boardroom", label: "Заседателна маса", capacity: 20 },
];

const halls = [
  { id: "chernomore", label: "Зала Черно Море", size: "213 кв.м", maxCapacity: 230 },
  { id: "varna", label: "Зала Варна", size: "144 кв.м", maxCapacity: 130 },
  { id: "galata", label: "Зала Галата", size: "59 кв.м", maxCapacity: 50 },
  { id: "odesos", label: "Зала Одесос", size: "63 кв.м", maxCapacity: 20 },
  { id: "bulgaria", label: "Зала България", size: "437 кв.м", maxCapacity: 550 },
];

const technicalEquipment = [
  { id: "projector", label: "Проектор" },
  { id: "screen", label: "Екран" },
  { id: "microphone", label: "Микрофон" },
  { id: "sound", label: "Озвучителна система" },
  { id: "laptop", label: "Лаптоп" },
  { id: "pointer", label: "Лазерен показалец" },
  { id: "flipchart", label: "Флипчарт" },
  { id: "wifi", label: "Безжичен интернет" },
];

const cateringOptions = [
  { id: "coffee", label: "Кафе пауза" },
  { id: "lunch", label: "Обяд" },
  { id: "dinner", label: "Вечеря" },
  { id: "cocktail_service", label: "Коктейл обслужване" },
  { id: "gala_dinner", label: "Гала вечеря" },
  { id: "none", label: "Не се нуждая" },
];

export default function ConferenceInquiryForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Event Info
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    // Step 2: Event Type
    eventType: "",
    eventTypeOther: "",
    // Step 3: Hall Setup
    selectedHall: "",
    hallSetup: "",
    guestCount: "",
    // Step 4: Technical Equipment
    technicalEquipment: [] as string[],
    // Step 5: Catering
    cateringServices: [] as string[],
    cateringNotes: "",
    // Step 6: Accommodation
    needsAccommodation: "",
    roomCount: "",
    checkInDate: "",
    checkOutDate: "",
    // Step 7: Contact Info
    name: "",
    company: "",
    phone: "",
    email: "",
    receiveNews: false,
    notes: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: string, value: string) => {
    setFormData((prev) => {
      const current = prev[field as keyof typeof prev] as string[];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to backend
    console.log("Form submitted:", formData);
    alert("Формата ще бъде изпратена след добавяне на backend функционалност.");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Информация за събитието</h3>
            <p className="text-sm text-zinc-500 mb-6">Моля, предоставете основна информация за вашето събитие.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Име на събитието
                </label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => updateFormData("eventName", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  placeholder="Въведете име на събитието"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Дата на събитието
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => updateFormData("eventDate", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Начален час
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => updateFormData("startTime", e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Краен час
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => updateFormData("endTime", e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Тип на вашето събитие</h3>
            <p className="text-sm text-zinc-500 mb-6">Изберете типа на събитието което планирате.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData("eventType", type.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    formData.eventType === type.id
                      ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
            
            {formData.eventType === "other" && (
              <div className="mt-4">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Моля, уточнете
                </label>
                <input
                  type="text"
                  value={formData.eventTypeOther}
                  onChange={(e) => updateFormData("eventTypeOther", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  placeholder="Въведете типа на събитието"
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Подреждане на зали и брой гости</h3>
            <p className="text-sm text-zinc-500 mb-6">Изберете зала и подреждане според вашите нужди.</p>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Изберете зала
              </label>
              <div className="space-y-2">
                {halls.map((hall) => (
                  <button
                    key={hall.id}
                    type="button"
                    onClick={() => updateFormData("selectedHall", hall.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      formData.selectedHall === hall.id
                        ? "border-brand-blue bg-brand-blue/5"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-zinc-900">{hall.label}</span>
                      <span className="text-sm text-zinc-500 ml-2">({hall.size})</span>
                    </div>
                    <span className="text-sm text-zinc-500">до {hall.maxCapacity} гости</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Подреждане на залата
              </label>
              <div className="grid grid-cols-2 gap-3">
                {hallSetups.map((setup) => (
                  <button
                    key={setup.id}
                    type="button"
                    onClick={() => updateFormData("hallSetup", setup.id)}
                    className={`p-3 rounded-xl border-2 text-sm transition-all ${
                      formData.hallSetup === setup.id
                        ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {setup.label} (до {setup.capacity})
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Брой гости
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => updateFormData("guestCount", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  placeholder="Въведете брой гости"
                  min="1"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Техническо оборудване</h3>
            <p className="text-sm text-zinc-500 mb-6">Изберете необходимото техническо оборудване.</p>
            
            <div className="grid grid-cols-2 gap-3">
              {technicalEquipment.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleArrayValue("technicalEquipment", item.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    formData.technicalEquipment.includes(item.id)
                      ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {formData.technicalEquipment.includes(item.id) && (
                    <Check className="w-4 h-4 ml-auto text-brand-blue" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Кетъринг услуги</h3>
            <p className="text-sm text-zinc-500 mb-6">Изберете желаните кетъринг услуги.</p>
            
            <div className="grid grid-cols-2 gap-3">
              {cateringOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleArrayValue("cateringServices", option.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    formData.cateringServices.includes(option.id)
                      ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span className="text-sm font-medium">{option.label}</span>
                  {formData.cateringServices.includes(option.id) && (
                    <Check className="w-4 h-4 ml-auto text-brand-blue" />
                  )}
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Допълнителни бележки за кетъринг
              </label>
              <textarea
                value={formData.cateringNotes}
                onChange={(e) => updateFormData("cateringNotes", e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all resize-none"
                rows={3}
                placeholder="Специални изисквания, диети, алергии..."
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Настаняване</h3>
            <p className="text-sm text-zinc-500 mb-6">Нуждаете ли се от настаняване за участниците?</p>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => updateFormData("needsAccommodation", "yes")}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  formData.needsAccommodation === "yes"
                    ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                <span className="text-lg font-medium">Да</span>
              </button>
              <button
                type="button"
                onClick={() => updateFormData("needsAccommodation", "no")}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  formData.needsAccommodation === "no"
                    ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                <span className="text-lg font-medium">Не</span>
              </button>
            </div>
            
            {formData.needsAccommodation === "yes" && (
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Брой стаи
                  </label>
                  <div className="relative">
                    <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="number"
                      value={formData.roomCount}
                      onChange={(e) => updateFormData("roomCount", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                      placeholder="Въведете брой стаи"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Настаняване
                    </label>
                    <input
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => updateFormData("checkInDate", e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Напускане
                    </label>
                    <input
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => updateFormData("checkOutDate", e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Контактна информация</h3>
            <p className="text-sm text-zinc-500 mb-6">Моля, предоставете вашите данни за контакт.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Име *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    placeholder="Вашето име"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Компания *
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    placeholder="Име на компанията"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Телефон *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    placeholder="+359 ..."
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Email адрес *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                    placeholder="example@mail.com"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                <input
                  type="checkbox"
                  id="receiveNews"
                  checked={formData.receiveNews}
                  onChange={(e) => updateFormData("receiveNews", e.target.checked)}
                  className="w-4 h-4 text-brand-blue border-zinc-300 rounded focus:ring-brand-blue"
                />
                <label htmlFor="receiveNews" className="text-sm text-zinc-600">
                  Съгласен съм да получавам новини и промоции от Хотел Черно Море
                </label>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Допълнителни бележки
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Допълнителна информация или специални изисквания..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
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
        className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Запитване за конферентна зала</h2>
            <p className="text-sm text-zinc-500">Стъпка {currentStep} от 7</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-1">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  step.id <= currentStep ? "bg-brand-blue" : "bg-zinc-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-zinc-200">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-brand-blue text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-brand-blue-light transition-all"
            >
              Напред
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-brand-blue text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-brand-blue-light transition-all"
            >
              Изпрати запитване
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
