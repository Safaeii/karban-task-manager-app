
function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          ثبت‌نام در کاربان
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          برای ساخت حساب کاربری اطلاعات زیر را وارد کنید.
        </p>

        <form className="space-y-4 mt-6">
          <div>
            <label className="block text-sm mb-2">ایمیل</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">رمز عبور</label>
            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-3"
          >
            ایجاد حساب کاربری
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
