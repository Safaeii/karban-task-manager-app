
import {
  FiInstagram,
  FiSend,
  FiGithub,
  FiHeart,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      dir="rtl"
      className="w-full border-t border-[#E8EEF5] bg-white px-4 py-5 sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

        {/* Logo and Description */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link
            to="/"
            className="text-lg font-extrabold text-[#26364A] transition hover:text-[#7DA9D8]"
          >
            کاربان
          </Link>

          <p className="text-xs text-[#8493A5]">
            برنامه‌ریزی هوشمند، روزهایی پربازده‌تر
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 text-xs font-medium text-[#52657B] sm:gap-6">
          <Link to="/" className="transition hover:text-[#7DA9D8]">
            خانه
          </Link>

          <Link to="/dashboard" className="transition hover:text-[#7DA9D8]">
            داشبورد
          </Link>

          <Link to="/#about" className="transition hover:text-[#7DA9D8]">
            درباره ما
          </Link>
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="اینستاگرام"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FD] text-[#7DA9D8] transition hover:bg-[#DCEBFA]"
          >
            <FiInstagram size={17} />
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            aria-label="تلگرام"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FD] text-[#7DA9D8] transition hover:bg-[#DCEBFA]"
          >
            <FiSend size={17} />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="گیت‌هاب"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FD] text-[#7DA9D8] transition hover:bg-[#DCEBFA]"
          >
            <FiGithub size={17} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-4 max-w-7xl border-t border-[#E8EEF5] pt-3">
        <p className="flex flex-wrap items-center justify-center gap-1 text-center text-[11px] text-[#8493A5]">
          ساخته شده با
          <FiHeart size={12} className="text-rose-400" />
          برای مدیریت بهتر زمان شما
          <span className="mx-1">|</span>
          © ۱۴۰۵ کاربان
        </p>
      </div>
    </footer>
  );
}

export default Footer;
