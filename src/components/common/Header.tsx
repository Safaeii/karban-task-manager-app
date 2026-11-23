
import { useState } from "react";
import {
  FiMenu,
  FiUser,
  FiLogOut,
  FiX,
  FiChevronLeft,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";
import { signOut } from "../../features/auth/api/authApi";


interface HeaderProps {
  onMenuClick?: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [featuresMenuOpen, setFeaturesMenuOpen] = useState(false);

  
  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    setMobileMenuOpen(false);
    navigate("/");
  }

  const navLinks = [
    { label: "خانه", to: "/#home" },
    { label: "امکانات", to: "/#features" },
    { label: "درباره ما", to: "/about" },
  ];


  const features = [
  {
    label: "مدیریت زمان",
    to: "/features/time-management",
  },
  {
    label: "افزایش بهره‌وری",
    to: "/features/productivity",
  },
  {
    label: "پیگیری پیشرفت",
    to: "/features/progress",
  },
  {
    label: "نظم شخصی",
    to: "/features/personal-organization",
  },
  {
    label: "مدیریت تیمی",
    to: "/features/team-management",
    comingSoon: true,
  },
];

  const navLinkClass =
    "relative py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white";

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full bg-[#7DA9D8] shadow-md"
    >
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* لوگو */}
        <div className="flex shrink-0 items-center gap-3">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="باز کردن منو"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/15 md:hidden"
            >
              <FiMenu size={23} />
            </button>
          )}

          <Link
            to="/"
            className="flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/karban-logo.png.png"
              alt="لوگوی کاربان"
              className="h-12 w-auto max-w-[145px] object-contain sm:h-14 sm:max-w-[175px]"
            />
          </Link>
        </div>

{/* منوی دسکتاپ */}
<nav className="hidden items-center gap-8 lg:flex">
  {navLinks.map((link) => (
    link.label === "امکانات" ? (
      <div key={link.to} className="relative">
        <button
          type="button"
          onClick={() => setFeaturesMenuOpen((prev) => !prev)}
          className={`${navLinkClass} group inline-flex items-center gap-2`}
          aria-expanded={featuresMenuOpen}
        >
          امکانات
          <span
            className={`text-xs transition-transform duration-200 ${
              featuresMenuOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {featuresMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-[#E8EEF5] bg-white p-2 shadow-xl shadow-[#26364A]/10">

            {features.map((feature) => (
              <Link
                key={feature.to}
                to={feature.to}
                onClick={() => setFeaturesMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#26364A] transition-colors duration-200 hover:bg-[#DCEBFA] hover:text-[#527FAF]"
              >
                {feature.label}

                {feature.comingSoon && (
                  <span className="rounded-full bg-[#DCEBFA] px-2 py-1 text-[10px] font-medium text-[#527FAF]">
                    به‌زودی
                  </span>
                )}
              </Link>
            ))}

          </div>
        )}
      </div>
    ) : (
      <Link
        key={link.to}
        to={link.to}
        className={`${navLinkClass} group`}
      >
        {link.label}
        <span className="absolute bottom-0 right-0 h-0.5 w-0 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
      </Link>
    )
  ))}
</nav>

    
        {/* حساب کاربری */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white">
                  <FiUser size={19} />
                </div>

                <div className="hidden flex-col gap-0.5 xl:flex">
                  <span className="max-w-[130px] truncate text-sm font-bold text-white">
                    {profile?.username || "کاربر"}
                  </span>

                  <span className="text-[11px] text-white/75">
                    خوش آمدید
                  </span>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-[#344F70] transition hover:bg-[#EFF4FA] sm:px-4 sm:text-sm"
              >
                پنل کاربری
                <FiChevronLeft size={16} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="خروج از حساب"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/15"
              >
                <FiLogOut size={19} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 sm:block"
              >
                ورود
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#344F70] shadow-sm transition hover:bg-[#EFF4FA] sm:px-5 sm:text-sm"
              >
                شروع رایگان
              </Link>
            </>
          )}

          {/* دکمه منوی موبایل */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/15 lg:hidden"
          >
            {mobileMenuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {mobileMenuOpen && (
        <div className="border-t border-white/20 bg-[#7DA9D8] px-4 py-5 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#344F70]"
                >
                  پنل کاربری
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-right text-sm font-medium text-white transition hover:bg-white/15"
                >
                  <FiLogOut size={17} />
                  خروج از حساب
                </button>
              </>
            )}

            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                ورود به حساب
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
