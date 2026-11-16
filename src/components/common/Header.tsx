
import {
  FiSearch,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";
import { signOut } from "../../features/auth/api/authApi";

function Header() {
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
      className="sticky top-0 z-30 w-full border-b border-[#E8EEF5] bg-white/95 px-3 backdrop-blur-lg sm:px-6"
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3">

        {/* Right: Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex shrink-0 items-center gap-1.5"
        >
        <img
  src="../../../public/karban-logo.png.png"
  alt="کاربان"
  className="h-14 w-auto max-w-[100px] object-contain sm:h-16 sm:max-w-[120px] md:h-20 md:max-w-[150px]"
/>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-7">
          <a
            href="#home"
            className="text-sm font-medium text-[#52657B] transition hover:text-[#7DA9D8]"
          >
            خانه
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-[#52657B] transition hover:text-[#7DA9D8]"
          >
            امکانات
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-[#52657B] transition hover:text-[#7DA9D8]"
          >
            درباره ما
          </a>
        </nav>

        {/* Left: Search + User */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Capsule Search */}
          <div className="relative w-[105px] sm:w-[160px] md:w-[190px] xl:w-[220px]">
            <FiSearch
              size={17}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8AA9C9]"
            />

            <input
              type="search"
              placeholder="جستجو..."
              aria-label="جستجو"
              className="h-10 w-full rounded-full border border-[#E4EFFB] bg-[#EFF6FD] pr-9 pl-3 text-xs text-[#26364A] outline-none transition-all placeholder:text-[#9AADC2] focus:border-[#A9C9EA] focus:bg-white focus:shadow-[0_0_0_4px_rgba(125,169,216,0.10)] sm:text-sm"
            />
          </div>

          {/* User Account */}
          {user ? (
            <div className="group relative shrink-0">
              <button
                type="button"
                aria-label="حساب کاربری"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4EFFB] bg-[#EFF6FD] text-[#7DA9D8] transition hover:bg-[#DCEBFA]"
              >
           <FiUser size={20} />
              </button>

              <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 rounded-2xl border border-[#E8EEF5] bg-white p-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <p className="truncate px-2 py-2 text-sm font-semibold text-[#26364A]">
                  {profile?.username ?? user.email}
                </p>

                <Link
                  to="/dashboard"
                  className="block rounded-xl px-3 py-2 text-sm text-[#52657B] transition hover:bg-[#F1F7FE]"
                >
                  پنل کاربری
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
                >
                  <FiLogOut size={16} />
                  خروج
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="ورود و ثبت‌نام"
              title="ورود و ثبت‌نام"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4EFFB] bg-[#EFF6FD] text-[#7DA9D8] transition hover:bg-[#DCEBFA]"
            >
              <FiUser size={20} />
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
