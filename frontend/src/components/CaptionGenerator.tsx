import { useState } from "react";
import {
  FiCopy,
  FiEdit3,
  FiZap,
  FiCheck,
  FiCpu,
  FiArrowRight,
} from "react-icons/fi";
import api from "../services/api";

function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Exciting");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCaption = async () => {
    if (!topic.trim()) {
      alert("Please enter a content topic");
      return;
    }

    try {
      setLoading(true);
      setCaption("");
      setCopied(false);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/ai/caption",
        {
          topic,
          platform,
          tone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCaption(response.data.data.caption);
    } catch (error: any) {
      console.error("Caption generation error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to generate caption"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Unable to copy caption");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#111124] rounded-3xl border border-violet-500/10 shadow-xl">
      <div className="absolute -top-40 -right-32 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl" />

      <div className="absolute -bottom-48 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 p-7 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xl shadow-lg shadow-violet-500/20">
              <FiZap />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  AI Studio
                </h2>

                <span className="px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/20 text-violet-300 text-[10px] font-bold tracking-wider">
                  AI POWERED
                </span>
              </div>

              <p className="text-slate-400 mt-1">
                Turn your content ideas into engaging social captions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <FiCpu className="text-violet-400" />

            <span>Powered by Gemini AI</span>
          </div>
        </div>

        <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6">
          <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <FiEdit3 className="text-violet-400" />

              <h3 className="font-semibold text-white">
                Create with AI
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What's your content about?
              </label>

              <textarea
                placeholder="Example: Top 5 AI tools every student should use in 2026..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={6}
                className="w-full bg-[#0B0B17]/80 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 outline-none resize-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
              />

              <div className="flex justify-end mt-2">
                <span className="text-xs text-slate-600">
                  {topic.length} characters
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Platform
                </label>

                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#0B0B17] border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-violet-500 transition"
                >
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>LinkedIn</option>
                  <option>Facebook</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Content tone
                </label>

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-[#0B0B17] border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-violet-500 transition"
                >
                  <option>Exciting</option>
                  <option>Professional</option>
                  <option>Funny</option>
                  <option>Motivational</option>
                  <option>Educational</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={generateCaption}
              disabled={loading}
              className="group w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 disabled:opacity-60 text-white py-3.5 px-5 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-violet-900/40 transition-all duration-300"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                  AI is creating your caption...
                </>
              ) : (
                <>
                  <FiZap />

                  Generate with AI

                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl min-h-[480px] overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-violet-600 tracking-wider">
                  AI OUTPUT
                </p>

                <h3 className="font-bold text-slate-900 mt-1">
                  Generated Caption
                </h3>
              </div>

              {caption && (
                <button
                  type="button"
                  onClick={copyCaption}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    copied
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-700 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >
                  {copied ? <FiCheck /> : <FiCopy />}

                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>

            <div className="flex-1 p-6">
              {loading ? (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 text-2xl">
                      <FiCpu />
                    </div>

                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-500 rounded-full animate-ping" />
                  </div>

                  <h4 className="font-bold text-slate-800 mt-5">
                    Gemini is thinking...
                  </h4>

                  <p className="text-sm text-slate-500 mt-2">
                    Crafting a {tone.toLowerCase()} caption for {platform}.
                  </p>
                </div>
              ) : caption ? (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />

                    <span className="text-xs font-semibold text-emerald-600">
                      GENERATION COMPLETE
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap text-slate-700 leading-7">
                    {caption}
                  </p>
                </div>
              ) : (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600 flex items-center justify-center text-2xl">
                    <FiZap />
                  </div>

                  <h4 className="font-bold text-slate-800 mt-5">
                    Your AI caption appears here
                  </h4>

                  <p className="text-sm text-slate-500 mt-2 max-w-xs leading-6">
                    Enter your content idea, choose a platform and tone, then let AI do the creative work.
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>CreatorOS AI Studio</span>

              <span>
                {platform} • {tone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaptionGenerator;