

import HeroDashboard from "../../landing/HeroDashboard";
import Features from "../components/Features";
import Aurora from "../components/Aurora";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <>


      <main
        dir="rtl"
        className="min-h-screen overflow-hidden bg-[var(--color-background)]"
      >
        {/* Hero Section */}
        <section
          id="home"
          className="relative isolate mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center gap-10 overflow-hidden px-4 py-16"
        >
          {/* Aurora Background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <Aurora
              colorStops={["#DCEBFA", "#7DA9D8", "#A9C9EA"]}
              amplitude={1}
              blend={0.5}
              speed={0.4}
              brightness={1.1}
              opacity={0.7}
              layers={2}
              lightMode={true}
              mouseInteraction={false}
            />
          </div>

          {/* Dashboard Preview */}
          <div className="relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroDashboard />
            </motion.div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="mb-4 inline-block rounded-full border border-[#DCEBFA] bg-white/80 px-4 py-2 text-sm font-medium text-[#719BC7] backdrop-blur">
                مدیریت هوشمند کارها
              </span>

              <h1 className="text-3xl font-black leading-[1.8] text-[#26364A] sm:text-4xl md:text-5xl">
                برنامه‌هات رو منظم کن،
                <span className="text-[#7DA9D8]">
                  {" "}
                  با خیال راحت پیش برو
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-[#8493A5] sm:text-base">
                با کاربان وظایفت رو مدیریت کن، برای اهدافت برنامه‌ریزی کن
                و هر روز یک قدم به موفقیت نزدیک‌تر شو.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="rounded-xl bg-[#7DA9D8] px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-1 hover:bg-[#6B99C9]"
                >
                  شروع رایگان
                </Link>

                <Link
                  to="/login"
                  className="rounded-xl border border-[#DCEBFA] bg-white/90 px-8 py-3.5 font-bold text-[#52657B] transition hover:bg-[#EFF6FD]"
                >
                  ورود به حساب
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10">
          <Features />
        </section>
      </main>
    </>
  );
}

export default LandingPage;
