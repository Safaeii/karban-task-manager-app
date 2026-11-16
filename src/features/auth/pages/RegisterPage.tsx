
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
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
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          ثبت‌نام در کاربان
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          برای ساخت حساب، اطلاعات خود را وارد کنید.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          {/* First Name */}
          <div>
            <label className="block text-sm mb-2">نام</label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="نام خود را وارد کنید"
              required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-2">نام خانوادگی</label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="نام خانوادگی خود را وارد کنید"
              required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm mb-2">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="نام کاربری خود را وارد کنید"
              required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@email.com"
              required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="حداقل ۶ کاراکتر"
              minLength={6}
              required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>

        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          قبلاً حساب ساخته‌ای؟

          <Link
            to="/login"
            className="text-blue-600 mr-1"
          >
            ورود
          </Link>
        </p>

      </div>
    </main>
  );
}

export default RegisterPage;
