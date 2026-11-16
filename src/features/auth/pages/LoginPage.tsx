
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.user) {
        navigate("/dashboard");
      }
    } catch {
      setErrorMessage("خطایی هنگام ورود رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          ورود به کاربان
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          برای ورود، اطلاعات حساب خود را وارد کنید.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">
              ایمیل
            </label>

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
            <label className="block text-sm mb-2">
              رمز عبور
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
              required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>

        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          حساب کاربری نداری؟

          <Link
            to="/register"
            className="text-blue-600 mr-1"
          >
            ثبت‌نام
          </Link>
        </p>

      </div>
    </main>
  );
}

export default LoginPage;
