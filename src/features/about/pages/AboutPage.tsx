
import {
  FiTarget,
  FiHeart,
  FiCheckCircle,
  FiLayers,
  FiArrowLeft,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function AboutPage() {
  const features = [
    {
      icon: FiLayers,
      title: "مدیریت وظایف",
      description: "تمام کارهای روزانه خود را در یک فضای منظم مدیریت کنید.",
    },
    {
      icon: FiTarget,
      title: "هدف‌گذاری",
      description: "برای کارهای خود اولویت تعیین کنید و با تمرکز پیش بروید.",
    },
    {
      icon: FiTrendingUp,
      title: "پیگیری پیشرفت",
      description: "وضعیت فعالیت‌ها و میزان پیشرفت خود را بررسی کنید.",
    },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#26364A]">
      {/* Hero */}
      <section className="bg-[#344F70] px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
            درباره کاربان
          </span>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-relaxed sm:text-5xl">
            کارهای بیشتر،
            <br />
            با آشفتگی کمتر.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-8 text-white/75 sm:text-base">
            کاربان طراحی شده تا مدیریت وظایف، برنامه‌ریزی روزانه
            و رسیدن به اهداف را ساده‌تر و منظم‌تر کند.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#344F70] transition hover:bg-[#EAF0F6]"
          >
            شروع رایگان
            <FiArrowLeft />
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-sm font-bold text-[#527C78]">
            داستان ما
          </span>

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            چرا کاربان ساخته شد؟
          </h2>

          <p className="mt-5 text-sm leading-9 text-[#8493A5] sm:text-base">
            وقتی تعداد کارها و مسئولیت‌ها زیاد می‌شود، مدیریت زمان
            و اولویت‌بندی دشوارتر خواهد شد. کاربان با این ایده شکل
            گرفت که همه بتوانند وظایف خود را در یک محیط ساده،
            کاربردی و منظم مدیریت کنند.
          </p>

          <p className="mt-4 text-sm leading-9 text-[#8493A5] sm:text-base">
            هدف ما ایجاد تجربه‌ای ساده برای برنامه‌ریزی بهتر،
            پیگیری فعالیت‌ها و افزایش تمرکز در زندگی روزمره است.
          </p>
        </div>

        <div className="rounded-3xl border border-[#E8EEF5] bg-white p-7 shadow-sm sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF4FA] text-[#344F70]">
            <FiHeart size={28} />
          </div>

          <h3 className="mt-6 text-xl font-bold">
            نظم، شروع پیشرفت است.
          </h3>

          <p className="mt-4 text-sm leading-8 text-[#8493A5]">
            ما باور داریم برای رسیدن به اهداف بزرگ، باید از
            مدیریت درست قدم‌های کوچک شروع کرد.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-sm font-bold text-[#527C78]">
            مأموریت ما
          </span>

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            مدیریت ساده‌تر، زندگی منظم‌تر
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-9 text-[#8493A5] sm:text-base">
            فراهم کردن ابزارهایی کاربردی برای برنامه‌ریزی،
            اولویت‌بندی و پیگیری وظایف؛ تا انرژی شما به جای
            نگرانی درباره کارها، صرف انجام آن‌ها شود.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <span className="text-sm font-bold text-[#527C78]">
            امکانات کاربان
          </span>

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            همه چیز برای مدیریت بهتر
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-[#E8EEF5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF4FA] text-[#344F70]">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-8 text-[#8493A5]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#7DA9D8] px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 text-center sm:grid-cols-2">
          <div>
            <FiCheckCircle className="mx-auto" size={30} />
            <h3 className="mt-4 text-lg font-bold">سادگی و کاربردی بودن</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              تجربه‌ای ساده و قابل استفاده برای همه.
            </p>
          </div>

          <div>
            <FiUsers className="mx-auto" size={30} />
            <h3 className="mt-4 text-lg font-bold">تمرکز بر کاربران</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              طراحی امکانات بر اساس نیازهای واقعی کاربران.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          آماده‌ای منظم‌تر پیش بری؟
        </h2>

        <p className="mt-4 text-sm text-[#8493A5]">
          همین امروز مدیریت کارهای خودت را شروع کن.
        </p>

        <Link
          to="/register"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#344F70] px-7 py-3 font-semibold text-white transition hover:bg-[#293F5A]"
        >
          ساخت حساب کاربری
          <FiArrowLeft />
        </Link>
      </section>
    </main>
  );
}

export default AboutPage;
