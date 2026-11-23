
import HeroDashboard from "../../landing/HeroDashboard";
import Features from "../components/Features";
import Aurora from "../components/Aurora";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

function LandingPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[var(--color-background)]"
    >
      {/* Hero Section */}
      <section
        id="home"
        className="relative isolate mx-auto flex max-w-7xl flex-col items-center overflow-hidden px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16"
      >
        {/* Aurora Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Aurora
            colorStops={["#EAF3FC", "#DCEBFA", "#A9C9EA"]}
            amplitude={0.9}
            blend={0.5}
            speed={0.3}
            brightness={1}
            opacity={0.6}
            layers={2}
            lightMode={true}
            mouseInteraction={false}
          />
        </div>

        {/* Floating Lights */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="floating-light right-[5%] top-[5%] h-72 w-72 bg-[#7DA9D8]/40 sm:h-96 sm:w-96" />

          <div className="floating-light floating-light-delay left-[3%] top-[20%] h-72 w-72 bg-[#A9C9EA]/50 sm:h-[420px] sm:w-[420px]" />

          <div className="floating-light right-[35%] top-[40%] h-64 w-64 bg-[#DCEBFA]/80 sm:h-80 sm:w-80" />

          <div className="floating-light floating-light-delay bottom-[5%] left-[35%] h-60 w-60 bg-[#7DA9D8]/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-3xl pt-4 text-center sm:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <span className="mb-5 inline-flex items-center rounded-full border border-[#DCEBFA] bg-white/85 px-5 py-2.5 text-sm font-medium text-[#719BC7] shadow-sm backdrop-blur-md">
              مدیریت هوشمند کارها
            </span>

            {/* Title */}
            <h1 className="mx-auto max-w-3xl text-3xl font-black leading-[1.45] tracking-tight text-[#26364A] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              کارهات رو مدیریت کن،
              <span className="block text-[#7DA9D8]">
                به اهدافت نزدیک‌تر شو
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#8493A5] sm:mt-6 sm:text-base md:text-lg">
              با کاربان وظایفت رو مدیریت کن، برای اهدافت برنامه‌ریزی کن
              و هر روز یک قدم به موفقیت نزدیک‌تر شو.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
              <Link
                to="/register"
                className="rounded-xl bg-[#7DA9D8] px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-200/60 transition duration-300 hover:-translate-y-1 hover:bg-[#6B99C9] hover:shadow-xl"
              >
                شروع رایگان
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-[#DCEBFA] bg-white/90 px-8 py-3.5 font-bold text-[#52657B] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-[#EFF6FD]"
              >
                ورود به حساب
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs text-[#8493A5] sm:mt-8 sm:gap-x-9 sm:text-sm">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-base text-[#7DA9D8]" />
                مدیریت آسان وظایف
              </span>

              <span className="flex items-center gap-2">
                <FiTarget className="text-base text-[#7DA9D8]" />
                تمرکز روی اهداف
              </span>

              <span className="flex items-center gap-2">
                <FiTrendingUp className="text-base text-[#7DA9D8]" />
                پیگیری پیشرفت
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative z-10 mt-10 w-full sm:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-14 sm:py-20"
      >
        <Features />
      </section>
    </main>
  );
}

export default LandingPage;
