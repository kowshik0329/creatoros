import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiEdit3,
  FiBriefcase,
  FiTrendingUp,
  FiFolder,
  FiLogOut,
} from "react-icons/fi";

const menuItems = [
  {
    id: "dashboard",
    label: "Overview",
    icon: FiHome,
  },
  {
    id: "content-calendar",
    label: "Content",
    icon: FiCalendar,
  },
  {
    id: "caption-generator",
    label: "AI Studio",
    icon: FiEdit3,
  },
  {
    id: "brand-deals",
    label: "Brand Deals",
    icon: FiBriefcase,
  },
  {
    id: "revenue-analytics",
    label: "Revenue",
    icon: FiTrendingUp,
  },
  {
    id: "asset-manager",
    label: "Assets",
    icon: FiFolder,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const navigateTo = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <aside className="w-72 h-screen sticky top-0 shrink-0 bg-[#0B0B17] text-white flex flex-col p-5 overflow-y-auto">
      <div className="flex items-center gap-3 px-3 py-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl font-black">
          C
        </div>

        <div>
          <h1 className="text-xl font-bold">
            CreatorOS
          </h1>

          <p className="text-xs text-slate-500">
            Creator workspace
          </p>
        </div>
      </div>

      <p className="px-4 text-[11px] uppercase tracking-[0.2em] text-slate-600 font-semibold mb-3">
        Workspace
      </p>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-violet-600 transition-all"
            >
              <Icon className="text-lg" />

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 pt-5 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <FiLogOut />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;