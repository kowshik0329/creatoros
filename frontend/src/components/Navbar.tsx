import { useState } from "react";
import {
  FiBell,
  FiSearch,
  FiX,
} from "react-icons/fi";

const sections = [
  {
    name: "Content Calendar",
    id: "content-calendar",
  },
  {
    name: "AI Studio",
    id: "caption-generator",
  },
  {
    name: "Brand Deals",
    id: "brand-deals",
  },
  {
    name: "Revenue Analytics",
    id: "revenue-analytics",
  },
  {
    name: "Asset Library",
    id: "asset-manager",
  },
];

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const result = sections.find((section) =>
      section.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (!result) {
      alert("Dashboard section not found");
      return;
    }

    document
      .getElementById(result.id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setShowSearch(false);
    setSearch("");
  };

  return (
    <header className="relative flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-violet-600 mb-1">
          CREATOR COMMAND CENTER
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, Kowshik 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your content, partnerships and creator business.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setShowSearch(!showSearch);
            setShowNotifications(false);
          }}
          className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-violet-600 transition"
        >
          <FiSearch />
        </button>

        <button
          type="button"
          onClick={() => {
            setShowNotifications(
              !showNotifications
            );

            setShowSearch(false);
          }}
          className="relative w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-violet-600 transition"
        >
          <FiBell />

          <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-2 pr-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold">
            K
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Kowshik
            </p>

            <p className="text-xs text-slate-500">
              Creator
            </p>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="absolute right-0 top-16 z-50 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">
              Search CreatorOS
            </h3>

            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="text-slate-400 hover:text-slate-900"
            >
              <FiX />
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search AI Studio, Revenue..."
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
              autoFocus
            />

            <button
              type="button"
              onClick={handleSearch}
              className="bg-violet-600 text-white px-4 rounded-xl"
            >
              <FiSearch />
            </button>
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="absolute right-0 top-16 z-50 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">
              Notifications
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              CreatorOS workspace updates
            </p>
          </div>

          <div className="p-4">
            <div className="bg-violet-50 rounded-xl p-4">
              <p className="font-semibold text-slate-900">
                Welcome to CreatorOS 🚀
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Your creator workspace is ready.
              </p>
            </div>

            <div className="mt-3 bg-emerald-50 rounded-xl p-4">
              <p className="font-semibold text-slate-900">
                AI Studio available ✨
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Generate creator captions using Gemini AI.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;