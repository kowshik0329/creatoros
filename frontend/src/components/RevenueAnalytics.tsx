import { useEffect, useState } from "react";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiActivity,
  FiClock,
  FiDollarSign,
  FiPieChart,
  FiArrowUpRight,
} from "react-icons/fi";
import api from "../services/api";

interface BrandDeal {
  id: string;
  brandName: string;
  campaign: string;
  amount: number;
  status: string;
}

function RevenueAnalytics() {
  const [deals, setDeals] = useState<BrandDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/brand-deals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDeals(response.data.data);
      } catch (error) {
        console.error("Unable to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const totalRevenue = deals.reduce(
    (total, deal) => total + deal.amount,
    0
  );

  const completedRevenue = deals
    .filter((deal) => deal.status === "COMPLETED")
    .reduce((total, deal) => total + deal.amount, 0);

  const activeRevenue = deals
    .filter((deal) => deal.status === "ACTIVE")
    .reduce((total, deal) => total + deal.amount, 0);

  const pendingRevenue = deals
    .filter((deal) => deal.status === "PENDING")
    .reduce((total, deal) => total + deal.amount, 0);

  const getPercentage = (amount: number) => {
    if (totalRevenue === 0) {
      return 0;
    }

    return Math.round((amount / totalRevenue) * 100);
  };

  const analytics = [
    {
      label: "Completed",
      amount: completedRevenue,
      percentage: getPercentage(completedRevenue),
      icon: FiCheckCircle,
      iconStyle: "bg-emerald-50 text-emerald-600",
      barStyle: "bg-emerald-500",
    },
    {
      label: "Active",
      amount: activeRevenue,
      percentage: getPercentage(activeRevenue),
      icon: FiActivity,
      iconStyle: "bg-indigo-50 text-indigo-600",
      barStyle: "bg-indigo-500",
    },
    {
      label: "Pending",
      amount: pendingRevenue,
      percentage: getPercentage(pendingRevenue),
      icon: FiClock,
      iconStyle: "bg-amber-50 text-amber-600",
      barStyle: "bg-amber-500",
    },
  ];

  if (loading) {
    return (
      <section className="bg-white border border-slate-200 rounded-3xl p-8">
        <div className="min-h-[300px] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin" />

          <p className="text-slate-500 mt-4">
            Loading revenue analytics...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-7 lg:p-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
            <FiTrendingUp />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Revenue Analytics
            </h2>

            <p className="text-slate-500 mt-1">
              Understand your creator income and partnership pipeline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
          <FiActivity />
          Live financial overview
        </div>
      </div>

      <div className="p-7 lg:p-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="relative overflow-hidden bg-[#111124] rounded-2xl p-6 text-white">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-violet-600/30 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-violet-300">
                  <FiDollarSign />
                </div>

                <FiArrowUpRight className="text-slate-500 text-xl" />
              </div>

              <p className="text-sm text-slate-400 mt-6">
                Total Revenue
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h3>

              <p className="text-xs text-slate-500 mt-2">
                Across {deals.length} brand partnerships
              </p>
            </div>
          </div>

          {analytics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconStyle}`}
                  >
                    <Icon />
                  </div>

                  <span className="text-sm font-bold text-slate-400">
                    {item.percentage}%
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-6">
                  {item.label} Revenue
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  ₹{item.amount.toLocaleString("en-IN")}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6 mt-7">
          <div className="border border-slate-200 rounded-2xl p-6 lg:p-7">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Revenue Distribution
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Breakdown by partnership status
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <FiPieChart />
              </div>
            </div>

            {deals.length === 0 ? (
              <div className="min-h-[260px] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl">
                  <FiTrendingUp />
                </div>

                <h4 className="font-bold text-slate-800 mt-4">
                  No revenue data yet
                </h4>

                <p className="text-sm text-slate-500 mt-2">
                  Add brand deals to unlock revenue analytics.
                </p>
              </div>
            ) : (
              <div className="space-y-7">
                {analytics.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.iconStyle}`}
                          >
                            <Icon />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {item.label}
                            </p>

                            <p className="text-xs text-slate-400">
                              ₹{item.amount.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        <span className="font-bold text-slate-900">
                          {item.percentage}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`${item.barStyle} h-full rounded-full transition-all duration-700`}
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-7 text-white relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-52 h-52 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-xl">
                <FiTrendingUp />
              </div>

              <p className="text-violet-200 text-sm font-medium mt-7">
                Creator Revenue
              </p>

              <h3 className="text-3xl font-bold mt-2">
                Financial Snapshot
              </h3>

              <p className="text-violet-100/80 leading-7 mt-4">
                Track active opportunities, completed partnerships and pending deal value from one creator workspace.
              </p>

              <div className="mt-8 pt-6 border-t border-white/15">
                <div className="flex justify-between text-sm">
                  <span className="text-violet-200">
                    Deal pipeline
                  </span>

                  <span className="font-bold">
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm mt-4">
                  <span className="text-violet-200">
                    Partnerships
                  </span>

                  <span className="font-bold">
                    {deals.length}
                  </span>
                </div>

                <div className="flex justify-between text-sm mt-4">
                  <span className="text-violet-200">
                    Completed share
                  </span>

                  <span className="font-bold">
                    {getPercentage(completedRevenue)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RevenueAnalytics;