import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ContentCalendar from "../components/ContentCalendar";
import CaptionGenerator from "../components/CaptionGenerator";
import BrandDeals from "../components/BrandDeals";
import RevenueAnalytics from "../components/RevenueAnalytics";
import AssetManager from "../components/AssetManager";
import api from "../services/api";

interface BrandDeal {
  amount: number;
}

function Dashboard() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        contentResponse,
        dealsResponse,
        assetsResponse,
      ] = await Promise.all([
        api.get("/content", { headers }),
        api.get("/brand-deals", { headers }),
        api.get("/assets", { headers }),
      ]);

      const contents = contentResponse.data.data;
      const deals: BrandDeal[] =
        dealsResponse.data.data;
      const assets = assetsResponse.data.data;

      const revenue = deals.reduce(
        (total, deal) => total + deal.amount,
        0
      );

      setTotalPosts(contents.length);
      setTotalDeals(deals.length);
      setTotalRevenue(revenue);
      setTotalAssets(assets.length);
    } catch (error) {
      console.error(
        "Dashboard stats error:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div
      id="dashboard"
      className="flex min-h-screen bg-[#F8F9FC]"
    >
      <Sidebar />

      <main className="flex-1 min-w-0">
        <div className="max-w-[1600px] mx-auto p-8 lg:p-10">
          <Navbar />

          <section className="relative overflow-hidden mt-10 rounded-3xl bg-[#111124] text-white p-8 lg:p-10">
            <div className="absolute -top-32 -right-20 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl" />

            <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex px-3 py-1 rounded-full bg-violet-500/15 border border-violet-400/20 text-violet-300 text-xs font-semibold">
                ✦ AI POWERED WORKSPACE
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mt-5 leading-tight">
                Build your creator
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  business smarter.
                </span>
              </h2>

              <p className="text-slate-400 mt-5 text-lg leading-relaxed">
                Plan content, generate AI captions,
                manage partnerships and track your
                creator revenue from one workspace.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "caption-generator"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="mt-7 bg-white text-slate-950 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition shadow-xl"
              >
                ✨ Open AI Studio
              </button>
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Workspace overview
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your creator business at a glance
                </p>
              </div>

              <span className="text-sm text-slate-400">
                Live workspace data
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              <StatsCard
                title="Total Posts"
                value={totalPosts.toString()}
              />

              <StatsCard
                title="Brand Deals"
                value={totalDeals.toString()}
              />

              <StatsCard
                title="Total Revenue"
                value={`₹${totalRevenue.toLocaleString(
                  "en-IN"
                )}`}
              />

              <StatsCard
                title="Creator Assets"
                value={totalAssets.toString()}
              />
            </div>
          </section>

          <div className="mt-10 space-y-8">
            <div
              id="content-calendar"
              className="scroll-mt-8"
            >
              <ContentCalendar />
            </div>

            <div
              id="caption-generator"
              className="scroll-mt-8"
            >
              <CaptionGenerator />
            </div>

            <div
              id="brand-deals"
              className="scroll-mt-8"
            >
              <BrandDeals />
            </div>

            <div
              id="revenue-analytics"
              className="scroll-mt-8"
            >
              <RevenueAnalytics />
            </div>

            <div
              id="asset-manager"
              className="scroll-mt-8"
            >
              <AssetManager />
            </div>

            <footer className="py-8 text-center text-sm text-slate-400">
              CreatorOS • AI-powered creator management
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;