
type StatsCardProps = {
  title: string;
  value: number;
  color: string;
};

function StatsCard({ title, value, color }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;
