
import {
  FiCheckSquare,
  FiCalendar,
  FiBarChart2,
  FiArrowUpLeft,
  FiTarget,
  FiZap,
} from "react-icons/fi";

import { motion } from "framer-motion";

const features = [
  {
    icon: FiCheckSquare,
    number: "01",
    title: "مدیریت وظایف",
    description:
      "تمام کارهای روزانه‌ات رو در یک فضای منظم مدیریت کن و هیچ کاری رو فراموش نکن.",
    color: "bg-blue-50 text-[#7DA9D8]",
    glow: "group-hover:bg-blue-100",
  },
  {
    icon: FiCalendar,
    number: "02",
    title: "برنامه‌ریزی روزانه",
    description:
      "برای زمانت برنامه داشته باش، اولویت‌ها رو مشخص کن و با تمرکز بیشتری پیش برو.",
    color: "bg-indigo-50 text-indigo-400",
    glow: "group-hover:bg-indigo-100",
  },
  {
    icon: FiBarChart2,
    number: "03",
    title: "پیگیری پیشرفت",
    description:
      "میزان پیشرفت و کارهای انجام‌شده‌ات رو بررسی کن و مسیر رشدت رو ببین.",
    color: "bg-sky-50 text-sky-500",
    glow: "group-hover:bg-sky-100",
  },
];

const extraFeatures = [
  {
    icon: FiTarget,
    title: "تمرکز روی اهداف",
    description: "قدم‌های کوچک و منظم برای رسیدن به هدف‌های بزرگ.",
  },
  {
    icon: FiZap,
    title: "سادگی و سرعت",
    description: "مدیریت کارها بدون پیچیدگی و اتلاف وقت.",
  },
];

function Features() {
  return (
    <section
      id="features"
      dir="rtl"
      className="relative isolate mx-auto w-full max-w-7xl overflow-hidden px-4 py-24 sm:px-6"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-72 w-72 rounded-full bg-blue-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-indigo-100/50 blur-[100px]" />

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFA] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7DA9D8] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#7DA9D8]" />
          امکانات کاربان
        </span>

        <h2 className="mt-5 text-2xl font-black leading-relaxed text-[#26364A] sm:text-3xl md:text-4xl">
          همه‌چیز برای مدیریت بهتر زمان
        </h2>

        <p className="mt-4 text-sm leading-8 text-[#8493A5] sm:text-base">
          ابزارهای ساده و کاربردی برای اینکه هیچ کاری از برنامه‌ات جا نمونه.
        </p>
      </motion.div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white/70 p-7 shadow-[0_10px_40px_-20px_rgba(91,139,190,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#DCEBFA] hover:shadow-[0_25px_50px_-20px_rgba(91,139,190,0.25)]"
            >
              {/* Card Number */}
              <span className="absolute left-7 top-6 text-4xl font-black text-[#EAF3FC] transition-colors duration-300 group-hover:text-[#DCEBFA]">
                {feature.number}
              </span>

              {/* Icon */}
              <div
                className={`mb-7 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${feature.color} ${feature.glow}`}
              >
                <Icon size={28} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <h3 className="text-lg font-black text-[#26364A] transition-colors group-hover:text-[#719BC7]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-8 text-[#8493A5]">
                {feature.description}
              </p>

              {/* Bottom Decoration */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-medium text-[#A9B8C8]">
                  بیشتر بدانید
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F6FC] text-[#7DA9D8] transition-all duration-300 group-hover:bg-[#7DA9D8] group-hover:text-white">
                  <FiArrowUpLeft size={18} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Extra Features */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {extraFeatures.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-center gap-4 rounded-2xl border border-white bg-white/60 p-5 backdrop-blur-lg transition hover:bg-white/90"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FC] text-[#7DA9D8]">
                <Icon size={22} />
              </div>

              <div>
                <h3 className="font-bold text-[#26364A]">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs leading-6 text-[#8493A5]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
