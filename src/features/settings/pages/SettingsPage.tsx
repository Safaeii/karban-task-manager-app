
import { useState } from "react";
import {
  FiUser,
  FiMonitor,
  FiShield,
} from "react-icons/fi";
import ProfileSettings from "../components/ProfileSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import SecuritySettings from "../components/SecuritySettings";

type SettingsTab = "profile" | "appearance" | "security";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const tabs = [
    {
      id: "profile" as const,
      title: "حساب کاربری",
      icon: FiUser,
    },
    {
      id: "appearance" as const,
      title: "ظاهر برنامه",
      icon: FiMonitor,
    },
    {
      id: "security" as const,
      title: "امنیت حساب",
      icon: FiShield,
    },
  ];

  return (
    <main dir="rtl" className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#26364A]">
          تنظیمات
        </h1>
        <p className="mt-2 text-sm text-[#8493A5]">
          حساب کاربری و تنظیمات برنامه خود را مدیریت کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* منوی تنظیمات */}
        <aside className="h-fit rounded-2xl border border-[#E8EEF5] bg-white p-3">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#DCEBFA] text-[#4779AA]"
                      : "text-[#8493A5] hover:bg-[#F8FAFC] hover:text-[#26364A]"
                  }`}
                >
                  <Icon size={19} />
                  {tab.title}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* محتوای تنظیمات */}
        <section className="min-w-0 rounded-2xl border border-[#E8EEF5] bg-white p-5 sm:p-7">
          {activeTab === "profile" && <ProfileSettings />}

          {activeTab === "appearance" && <AppearanceSettings />}

          {activeTab === "security" && <SecuritySettings />}
        </section>
      </div>
    </main>
  );
}

export default SettingsPage;
