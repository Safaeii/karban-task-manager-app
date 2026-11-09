import { NavLink } from "react-router-dom";
import { FiHome, FiCheckSquare, FiSettings ,FiTag, FiFolder  } from "react-icons/fi";



const menuItems = [
  {
    title: "داشبورد",
    path: "/",
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

function Sidebar() {
  return (
    <aside className=" w-full md:w-64 border-b md:border-b-0 md:border-r bg-white  min-h-screen md:shrink-0">
      <nav className=" p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
<NavLink
  to={item.path}
  key={item.path}
  className={({ isActive }) => {
    if (isActive) {
      return "shrink-0 md:w-full rounded-lg px-3 py-2 bg-blue-600 text-white flex items-center gap-3 min-h-11";
    }

    return "shrink-0 md:w-full rounded-lg px-3 py-2 text-gray-600 flex items-center gap-3 min-h-11";
  }}
>
  <Icon />
  {item.title}
</NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;

