import {
  FiArrowUpRight,
  FiActivity,
} from "react-icons/fi";

interface StatsCardProps {
  title: string;
  value: string;
}

function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="group bg-white border border-slate-200/80 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
          <FiActivity className="text-xl" />
        </div>

        <FiArrowUpRight className="text-slate-300 group-hover:text-violet-600 transition text-xl" />
      </div>

      <p className="text-sm text-slate-500 font-medium mt-6">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
        {value}
      </h3>

      <div className="mt-5 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="w-2/3 h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
      </div>
    </div>
  );
}

export default StatsCard;