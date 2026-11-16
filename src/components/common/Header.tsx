
import {
  FiMenu,
  FiUser,
  FiLogOut,
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

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    navigate("/");
  }

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-40 w-full border-b border-[#E8EEF5] bg-white"
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-5 lg:px-6">

        {/* لوگو و منو */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="باز کردن منو"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#26364A] hover:bg-[#EFF6FD] md:hidden"
            >
              <FiMenu size={24} />
            </button>
          )}

          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="../../../public/karban-logo.png.png"
              alt="لوگوی کاربان"
              className="h-12 w-auto max-w-[130px] object-contain sm:h-16 sm:max-w-[180px] lg:h-20 lg:max-w-[220px]"
            />
          </Link>
        </div>

        {/* لینک‌های اصلی */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-[#52657B] lg:flex">
          <Link to="/#home" className="transition hover:text-[#7DA9D8]">
            خانه
          </Link>
          <Link to="/#features" className="transition hover:text-[#7DA9D8]">
            امکانات
          </Link>
          <Link to="/#about" className="transition hover:text-[#7DA9D8]">
            درباره ما
          </Link>
        </nav>

        {/* حساب کاربری */}
        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3">
          {user ? (
            <>
              <div className="hidden min-w-0 items-center gap-2 sm:flex">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FD] text-[#7DA9D8]">
                  <FiUser size={19} />
                </div>

                <span className="max-w-[110px] truncate text-xs font-semibold text-[#26364A] lg:max-w-[150px] lg:text-sm">
                  {profile?.username ?? user.email}
                </span>
              </div>

              <Link
                to="/dashboard"
                className="whitespace-nowrap rounded-xl bg-[#EFF6FD] px-2.5 py-2 text-[11px] font-semibold text-[#526F91] transition hover:bg-[#DCEBFA] sm:px-4 sm:text-sm"
              >
                پنل کاربری
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="خروج"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-[11px] font-semibold text-rose-500 transition hover:bg-rose-50 sm:px-3 sm:text-sm"
              >
                <FiLogOut size={16} />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#7DA9D8] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6796C9] sm:px-4 sm:text-sm"
            >
              <FiUser size={17} />
              ورود
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
