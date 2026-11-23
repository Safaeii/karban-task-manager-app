
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

import { motion } from "framer-motion";

const tasks = [
  { title: "تکمیل طراحی صفحه اصلی", time: "۰۹:۳۰", done: true },
  { title: "بررسی وظایف روزانه", time: "۱۱:۰۰", done: true },
  { title: "مطالعه و یادگیری React", time: "۱۳:۰۰", done: false },
];

const dashboardImages = [
  {
    image: "/images/dashboard.png",
    title: "داشبورد کاربان",
  },
  {
    image: "/images/tasks.png",
    title: "مدیریت وظایف",
  },
  {
    image: "/images/statistics.png",
    title: "آمار و گزارش‌ها",
  },
];

function HeroDashboard() {
  return (
    <div className="flex w-full justify-center px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-full max-w-[950px] rounded-3xl border border-white/80 bg-white/65 p-4 shadow-[0_25px_80px_-25px_rgba(91,139,190,0.3)] backdrop-blur-2xl sm:p-7"
      >
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />

        {/* Dashboard Header */}
        <div className="relative mb-7 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs font-medium text-green-600">
                فضای کاری شما
              </span>
            </div>

            <h2 className="text-lg font-black text-[#26364A] sm:text-2xl">
              نمای کلی کارها
            </h2>

            <p className="mt-1 text-xs text-[#8493A5] sm:text-sm">
              امروز چه برنامه‌ای داری؟
            </p>
          </div>

          <button
            type="button"
            aria-label="اعلان‌ها"
            className="relative rounded-xl border border-[#E8EEF5] bg-white/90 p-3 text-[#7DA9D8] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <FiBell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
        </div>

        {/* Statistics Images */}
        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {dashboardImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="overflow-hidden rounded-2xl border border-white bg-white/85 p-2 shadow-sm sm:p-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[4/3] w-full rounded-xl object-cover object-top"
              />

              <p className="mt-3 text-center text-xs font-bold text-[#52657B] sm:text-sm">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Dashboard Content */}
        <div className="relative mt-5 grid grid-cols-1 gap-4 md:grid-cols-5">

          {/* Task List */}
          <div className="rounded-2xl border border-white bg-white/80 p-4 md:col-span-3 sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-bold text-[#26364A]">
                برنامه امروز
              </h3>

              <span className="rounded-lg bg-[#EFF6FD] px-3 py-1 text-xs text-[#719BC7]">
                ۳ وظیفه
              </span>
            </div>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.title}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        task.done
                          ? "bg-green-50 text-green-500"
                          : "bg-blue-50 text-[#7DA9D8]"
                      }`}
                    >
                      {task.done ? (
                        <FiCheckCircle size={16} />
                      ) : (
                        <FiClock size={16} />
                      )}
                    </span>

                    <span
                      className={`truncate text-xs sm:text-sm ${
                        task.done
                          ? "text-[#A0ACB9] line-through"
                          : "font-medium text-[#52657B]"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <span className="shrink-0 text-[11px] text-[#A0ACB9]">
                    {task.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-white bg-gradient-to-br from-[#EAF3FC] to-white p-4 md:col-span-2 sm:p-5">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-xl bg-white p-2 text-[#7DA9D8] shadow-sm">
                  <FiCalendar size={20} />
                </span>

                <span className="text-xs text-[#8493A5]">
                  پیشرفت روزانه
                </span>
              </div>

              <h3 className="text-3xl font-black text-[#26364A]">
                ۶۷٪
              </h3>

              <p className="mt-2 text-xs leading-6 text-[#8493A5]">
                عالی پیش می‌ری! به همین مسیر ادامه بده.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-[#8493A5]">
                <span>میزان پیشرفت</span>
                <span>۸ از ۱۲</span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-white">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "67%" }}
                  transition={{ duration: 1.4, delay: 0.5 }}
                  className="h-full rounded-full bg-[#7DA9D8]"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroDashboard;
