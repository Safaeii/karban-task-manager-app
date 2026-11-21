
interface PlaceholderPageProps {
  title: string;
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-[#E8EEF5] bg-white p-6"
    >
      <h1 className="text-xl font-bold text-[#26364A]">
        {title}
      </h1>

      <p className="mt-2 text-sm text-[#8493A5]">
        این صفحه به‌زودی تکمیل می‌شود.
      </p>
    </div>
  );
}

export default PlaceholderPage;
