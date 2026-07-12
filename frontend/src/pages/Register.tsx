import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiZap,
  FiCheckCircle,
  FiCpu,
  FiTrendingUp,
} from "react-icons/fi";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        formData
      );

      alert(
        response.data.message ||
          "Registration successful!"
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      console.error(
        "REGISTRATION ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0B17] flex">
      {/* LEFT SIDE */}

      <div className="hidden lg:flex lg:w-[55%] min-h-screen relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />

        {/* LOGO */}

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-xl shadow-violet-900/40">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                CreatorOS
              </h1>

              <p className="text-xs text-slate-500">
                Creator workspace
              </p>
            </div>
          </div>
        </div>

        {/* HERO */}

        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-400/20 rounded-full text-violet-300 text-xs font-semibold">
            <FiZap />

            BUILT FOR MODERN CREATORS
          </span>

          <h2 className="text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mt-7">
            Create more.

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Manage smarter.
            </span>
          </h2>

          <p className="text-lg text-slate-400 leading-8 mt-6 max-w-lg">
            Build your creator command center and manage
            content, AI workflows, partnerships and revenue.
          </p>

          <div className="space-y-4 mt-10">
            {/* FEATURE 1 */}

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <FiCpu />
              </div>

              <div>
                <p className="text-white font-semibold">
                  AI-powered creation
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Generate engaging captions with AI.
                </p>
              </div>
            </div>

            {/* FEATURE 2 */}

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <FiTrendingUp />
              </div>

              <div>
                <p className="text-white font-semibold">
                  Creator business insights
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Track partnerships and revenue performance.
                </p>
              </div>
            </div>

            {/* FEATURE 3 */}

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <FiCheckCircle />
              </div>

              <div>
                <p className="text-white font-semibold">
                  One creator workspace
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Keep your creator workflow organized.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-slate-600">
          CreatorOS • AI-powered creator management
        </p>
      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-[45%] min-h-screen bg-[#F8F9FC] flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}

          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-black">
              C
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              CreatorOS
            </h1>
          </div>

          {/* TITLE */}

          <div>
            <p className="text-sm font-bold text-violet-600 tracking-wider">
              START CREATING
            </p>

            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-3">
              Create your account
            </h2>

            <p className="text-slate-500 mt-3">
              Set up your CreatorOS workspace in seconds.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* NAME */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full name
              </label>

              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="creator@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-12 py-3.5 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600 transition"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>
            </div>

            {/* REGISTER */}

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-violet-600 to-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                  Creating workspace...
                </>
              ) : (
                <>
                  Create CreatorOS Account

                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* LOGIN BUTTON */}

          <div className="text-center mt-7">
            <span className="text-slate-500">
              Already have an account?{" "}
            </span>

            <button
              type="button"
              onClick={goToLogin}
              className="text-violet-600 font-semibold hover:text-violet-700 cursor-pointer"
            >
              Sign in
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-400">
            <FiLock />

            Secure creator workspace
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;