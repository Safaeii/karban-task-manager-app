
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiSettings,
  FiTag,
  FiFolder,
} from "react-icons/fi";

const menuItems = [
  {
    title: "داشبورد",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    title: "وظایف من",
    path: "/tasks",
    icon: FiCheckSquare,
  },
  {
    title: "دسته‌بندی‌ها",
    path: "/categories",
    icon: FiFolder,
  },
  {
    title: "برچسب‌ها",
    path: "/tags",
    icon: FiTag,
  },
  {
    title: "تنظیمات",
    path: "/settings",
    icon: FiSettings,
  },
];

type SidebarProps = {
  isOpen: boolean;
};

function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } md:block w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E8EEF5] bg-white md:min-h-screen md:shrink-0`}
    >
      <nav className="flex flex-row gap-2 overflow-x-auto p-4 md:flex-col">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors md:w-full ${
                  isActive
                    ? "bg-[#7DA9D8] text-white"
                    : "text-[#8493A5] hover:bg-[#F8FAFC] hover:text-[#26364A]"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
