
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiCheck } from "react-icons/fi";

type Theme = "light" | "dark";

function AppearanceSettings() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("karban-theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("karban-theme", theme);
  }, [theme]);

  const themes = [
    {
      id: "light" as const,
      title: "حالت روشن",
      description: "ظاهر روشن و ساده برای استفاده روزانه",
      icon: FiSun,
    },
    {
      id: "dark" as const,
      title: "حالت تاریک",
      description: "ظاهر تاریک برای محیط‌های کم‌نور",
      icon: FiMoon,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#26364A]">
          ظاهر برنامه
        </h2>

        <p className="mt-2 text-sm text-[#8493A5]">
          حالت نمایش مورد علاقه خود را انتخاب کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {themes.map((item) => {
          const Icon = item.icon;
          const isActive = theme === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              className={`relative rounded-2xl border p-5 text-right transition ${
                isActive
                  ? "border-[#7DA9D8] bg-[#DCEBFA]/40"
                  : "border-[#E8EEF5] hover:border-[#B8CDE2]"
              }`}
            >
              {isActive && (
                <span className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#7DA9D8] text-white">
                  <FiCheck size={14} />
                </span>
              )}

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCEBFA] text-[#4779AA]">
                <Icon size={23} />
              </div>

              <h3 className="font-bold text-[#26364A]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-[#8493A5]">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#8493A5]">
        انتخاب شما به‌صورت خودکار ذخیره می‌شود.
      </div>
    </div>
  );
}

export default AppearanceSettings;
