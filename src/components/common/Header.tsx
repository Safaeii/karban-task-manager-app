
import { FiMenu, FiSearch, FiBell, FiUser } from "react-icons/fi";

type HeaderProps = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white min-h-16 px-4 flex items-center md:px-6 border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between w-full">

        {/* بخش اول: منو و لوگو */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="باز و بسته کردن منو"
          >
            <FiMenu size={20} />
          </button>

          <h1 className="text-lg md:text-xl font-bold">
            کاربان
          </h1>
        </div>

        {/* بخش دوم: جستجو */}
        <div className="hidden md:flex items-center w-full max-w-sm relative">
          <FiSearch className="absolute right-3 text-gray-400" />

          <input
            type="text"
            placeholder="جستجوی وظایف..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* بخش سوم: اعلان و پروفایل */}
        <div className="flex items-center gap-3">

          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="اعلان‌ها"
          >
            <FiBell size={20} />
          </button>

            <div className="hidden sm:block">
              <p className="text-xs text-gray-500">
                خوش آمدید
              </p>
              <p className="text-sm font-semibold text-gray-800">
                مدیر کاربان
              </p>
            </div>
            
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FiUser size={20} />
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;
