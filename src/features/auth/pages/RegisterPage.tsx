
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiUser,
  FiAtSign,
  FiMail,
  FiLock,
  FiUserPlus,
  FiArrowLeft,
} from "react-icons/fi";

import { signUp } from "../api/authApi";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } = await signUp(email, password, {
        firstName,
        lastName,
        username,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.user) {
        setSuccessMessage("ثبت‌نام با موفقیت انجام شد.");
      }
    } catch {
      setErrorMessage("خطایی هنگام ثبت‌نام رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F3F7FC] px-4 py-10"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EAF3FC] via-[#F8FAFD] to-[#DCEBFA]" />

      {/* Background Lights */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#7DA9D8]/25 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#A9C9EA]/35 blur-[100px]" />

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="rounded-[28px] border border-white/80 bg-white/85 p-6 shadow-[0_20px_70px_rgba(73,115,165,0.12)] backdrop-blur-xl sm:p-9">

          {/* Header */}
          <div className="mb-7 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A9C9EA] to-[#6F9FCF] text-white shadow-lg shadow-blue-200/60">
              <FiUserPlus size={29} />
            </div>

            <h1 className="text-2xl font-black text-[#26364A]">
              ثبت‌نام در کاربان
            </h1>

            <p className="mt-3 text-center text-sm leading-7 text-[#8493A5]">
              به کاربان خوش اومدی!
              <br />
              حساب خودت رو بساز و برنامه‌هات رو منظم کن.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-semibold text-[#52657B]"
              >
                نام
              </label>

              <div className="relative">
                <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91AAC5]" size={19} />

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="نام خود را وارد کنید"
                  required
                  className="w-full rounded-xl border border-[#E1EAF4] bg-[#F8FAFD] py-3.5 pr-12 pl-4 text-sm text-[#26364A] outline-none transition placeholder:text-[#A6B3C2] focus:border-[#7DA9D8] focus:bg-white focus:ring-4 focus:ring-[#7DA9D8]/15"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-semibold text-[#52657B]"
              >
                نام خانوادگی
              </label>

              <div className="relative">
                <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91AAC5]" size={19} />

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="نام خانوادگی خود را وارد کنید"
                  required
                  className="w-full rounded-xl border border-[#E1EAF4] bg-[#F8FAFD] py-3.5 pr-12 pl-4 text-sm text-[#26364A] outline-none transition placeholder:text-[#A6B3C2] focus:border-[#7DA9D8] focus:bg-white focus:ring-4 focus:ring-[#7DA9D8]/15"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-[#52657B]"
              >
                نام کاربری
              </label>

              <div className="relative">
                <FiAtSign className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91AAC5]" size={19} />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="یک نام کاربری انتخاب کنید"
                  required
                  className="w-full rounded-xl border border-[#E1EAF4] bg-[#F8FAFD] py-3.5 pr-12 pl-4 text-sm text-[#26364A] outline-none transition placeholder:text-[#A6B3C2] focus:border-[#7DA9D8] focus:bg-white focus:ring-4 focus:ring-[#7DA9D8]/15"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#52657B]"
              >
                ایمیل
              </label>

              <div className="relative">
                <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91AAC5]" size={19} />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@email.com"
                  required
                  className="w-full rounded-xl border border-[#E1EAF4] bg-[#F8FAFD] py-3.5 pr-12 pl-4 text-sm text-[#26364A] outline-none transition placeholder:text-[#A6B3C2] focus:border-[#7DA9D8] focus:bg-white focus:ring-4 focus:ring-[#7DA9D8]/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#52657B]"
              >
                رمز عبور
              </label>

              <div className="relative">
                <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91AAC5]" size={19} />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="حداقل ۶ کاراکتر"
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-[#E1EAF4] bg-[#F8FAFD] py-3.5 pr-12 pl-4 text-sm text-[#26364A] outline-none transition placeholder:text-[#A6B3C2] focus:border-[#7DA9D8] focus:bg-white focus:ring-4 focus:ring-[#7DA9D8]/15"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600"
              >
                {errorMessage}
              </motion.p>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-green-100 bg-green-50 p-3 text-sm text-green-700"
              >
                {successMessage}
              </motion.p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#6F9FCF] to-[#7DA9D8] py-3.5 font-bold text-white shadow-lg shadow-blue-200/50 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200/70 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "در حال ثبت‌نام..." : "ساخت حساب کاربری"}

              {!loading && (
                <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-7 border-t border-[#EDF2F8] pt-6 text-center">
            <p className="text-sm text-[#8493A5]">
              قبلاً حساب ساخته‌ای؟

              <Link
                to="/login"
                className="mr-2 font-bold text-[#6F9FCF] transition hover:text-[#426F9F]"
              >
                ورود به حساب
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#91A3B8]">
          کاربان؛ همراه تو در مسیر رسیدن به اهدافت 💙
        </p>
      </motion.div>
    </main>
  );
}

export default RegisterPage;
