
import { useState } from "react";
import { FiLock, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "../../../shared/services/supabase";

function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (newPassword.length < 8) {
      setErrorMessage("رمز عبور جدید باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("تکرار رمز عبور با رمز جدید مطابقت ندارد.");
      return;
    }

    setSaving(true);

    try {
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user?.email) {
        throw new Error("اطلاعات حساب کاربری پیدا نشد.");
      }

      // بررسی رمز عبور فعلی
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: currentPassword,
        });

      if (signInError) {
        throw new Error("رمز عبور فعلی صحیح نیست.");
      }

      // تغییر رمز عبور
      const { error: updateError } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) throw updateError;

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage("رمز عبور با موفقیت تغییر کرد.");
    } catch (error) {
      console.error("Password update error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "تغییر رمز عبور با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#26364A]">
          امنیت حساب کاربری
        </h2>

        <p className="mt-2 text-sm text-[#8493A5]">
          برای حفظ امنیت حساب خود، رمز عبورت را تغییر بده.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] p-4">
        <FiLock className="mt-1 text-[#7DA9D8]" size={20} />

        <div>
          <p className="font-medium text-[#26364A]">
            امنیت بیشتر حساب
          </p>

          <p className="mt-1 text-sm text-[#8493A5]">
            از رمز عبوری قوی و غیرقابل حدس استفاده کن.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* رمز فعلی */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            رمز عبور فعلی
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="رمز عبور فعلی"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#E8EEF5] py-3 pr-4 pl-12 text-sm outline-none focus:border-[#7DA9D8]"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8493A5]"
              aria-label="نمایش یا مخفی کردن رمز فعلی"
            >
              {showCurrent ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* رمز جدید */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            رمز عبور جدید
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="حداقل ۸ کاراکتر"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-xl border border-[#E8EEF5] py-3 pr-4 pl-12 text-sm outline-none focus:border-[#7DA9D8]"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8493A5]"
              aria-label="نمایش یا مخفی کردن رمز جدید"
            >
              {showNew ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* تکرار رمز جدید */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#26364A]">
            تکرار رمز عبور جدید
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="رمز جدید را دوباره وارد کن"
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-[#E8EEF5] py-3 pr-4 pl-12 text-sm outline-none focus:border-[#7DA9D8]"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8493A5]"
              aria-label="نمایش یا مخفی کردن تکرار رمز"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {message && (
          <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {errorMessage && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7DA9D8] px-5 py-3 font-medium text-white transition hover:bg-[#6897C9] disabled:opacity-60 sm:w-auto"
        >
          <FiSave size={18} />
          {saving ? "در حال تغییر..." : "تغییر رمز عبور"}
        </button>
      </form>
    </div>
  );
}

export default SecuritySettings;
