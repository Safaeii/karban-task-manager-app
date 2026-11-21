
import {  useState } from "react";
import { FiUser, FiMail, FiSave } from "react-icons/fi";

import { useAuthContext } from "../../auth/hooks/useAuthContext";
import { supabase } from "../../../shared/services/supabase";

function ProfileSettings() {
  const { user, profile } = useAuthContext();

const [firstName, setFirstName] = useState(
  profile?.first_name ?? ""
);

const [lastName, setLastName] = useState(
  profile?.last_name ?? ""
);

const [username, setUsername] = useState(
  profile?.username ?? ""
);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user?.id) return;

    const userId = user.id;

    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          username: username.trim(),
        })
        .eq("id", userId);

      if (error) throw error;

      setMessage("اطلاعات پروفایل با موفقیت ذخیره شد.");
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMessage("ذخیره اطلاعات با مشکل مواجه شد.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#26364A]">
          اطلاعات حساب کاربری
        </h2>
        <p className="mt-2 text-sm text-[#8493A5]">
          اطلاعات شخصی خود را مشاهده و ویرایش کنید.
        </p>
      </div>

      {/* آواتار */}
      <div className="flex items-center gap-4 rounded-xl bg-[#F8FAFC] p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DCEBFA] text-[#4779AA]">
          <FiUser size={26} />
        </div>

        <div>
          <p className="font-bold text-[#26364A]">
            {profile?.first_name || "کاربر"}{" "}
            {profile?.last_name || ""}
          </p>

          <p className="mt-1 text-sm text-[#8493A5]">
            حساب کاربری کاربان
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* نام */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            نام
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام خود را وارد کنید"
            className="w-full rounded-xl border border-[#E8EEF5] px-4 py-3 text-sm outline-none focus:border-[#7DA9D8]"
            required
          />
        </div>

        {/* نام خانوادگی */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            نام خانوادگی
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی خود را وارد کنید"
            className="w-full rounded-xl border border-[#E8EEF5] px-4 py-3 text-sm outline-none focus:border-[#7DA9D8]"
            required
          />
        </div>

        {/* نام کاربری */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            نام کاربری
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری خود را وارد کنید"
            className="w-full rounded-xl border border-[#E8EEF5] px-4 py-3 text-sm outline-none focus:border-[#7DA9D8]"
            required
          />
        </div>

        {/* ایمیل */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            ایمیل
          </label>

          <div className="relative">
            <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8493A5]" />

            <input
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-[#E8EEF5] bg-[#F8FAFC] py-3 pr-11 pl-4 text-sm text-[#8493A5] outline-none"
            />
          </div>

          <p className="mt-2 text-xs text-[#8493A5]">
            ایمیل حساب در این بخش قابل تغییر نیست.
          </p>
        </div>

        {/* پیام‌ها */}
        {message && (
          <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {errorMessage && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {/* دکمه ذخیره */}
        <button
          type="submit"
          disabled={saving || !user?.id}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7DA9D8] px-5 py-3 font-medium text-white transition hover:bg-[#6897C9] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <FiSave size={18} />
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}

export default ProfileSettings;
