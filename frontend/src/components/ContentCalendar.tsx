import { useEffect, useState } from "react";
import {
  FiTrash2,
  FiCalendar,
  FiPlus,
  FiClock,
  FiYoutube,
  FiInstagram,
  FiLinkedin,
  FiFacebook,
} from "react-icons/fi";
import api from "../services/api";

interface Content {
  id: string;
  title: string;
  description?: string;
  platform: string;
  contentDate: string;
  status: string;
}

function ContentCalendar() {
  const [contents, setContents] = useState<Content[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "YouTube",
    contentDate: "",
  });

  const getToken = () => localStorage.getItem("token");

  const fetchContents = async () => {
    try {
      const response = await api.get("/content", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setContents(response.data.data);
    } catch (error) {
      console.error("Unable to fetch content", error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(
        "/content",
        {
          ...formData,
          status: "PLANNED",
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setFormData({
        title: "",
        description: "",
        platform: "YouTube",
        contentDate: "",
      });

      await fetchContents();

      alert("Content added successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to add content");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/content/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      await fetchContents();
    } catch (error) {
      console.error(error);
      alert("Unable to delete content");
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return <FiYoutube />;

      case "Instagram":
        return <FiInstagram />;

      case "LinkedIn":
        return <FiLinkedin />;

      case "Facebook":
        return <FiFacebook />;

      default:
        return <FiCalendar />;
    }
  };

  return (
    <section className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-7 lg:p-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl">
            <FiCalendar />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Content Calendar
            </h2>

            <p className="text-slate-500 mt-1">
              Plan and organize your upcoming creator content.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-violet-50 text-violet-700 rounded-full text-sm font-semibold">
          {contents.length} scheduled
        </div>
      </div>

      <div className="grid xl:grid-cols-[420px_1fr]">
        <div className="p-7 lg:p-8 bg-slate-50/70 border-r border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <FiPlus className="text-violet-600" />

            <h3 className="font-bold text-slate-900">
              Schedule new content
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Content title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Top AI tools for students"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Platform
              </label>

              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
              >
                <option>YouTube</option>
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Publish date
              </label>

              <input
                type="datetime-local"
                name="contentDate"
                value={formData.contentDate}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Add notes about this content..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-lg hover:shadow-violet-500/20 text-white py-3.5 rounded-xl font-semibold transition-all duration-300"
            >
              <FiPlus />
              Schedule Content
            </button>
          </form>
        </div>

        <div className="p-7 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Upcoming content
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your scheduled publishing queue
              </p>
            </div>
          </div>

          {contents.length === 0 ? (
            <div className="min-h-[350px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-8">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center text-2xl mb-4">
                <FiCalendar />
              </div>

              <h4 className="font-bold text-slate-800">
                No content scheduled
              </h4>

              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                Create your first content plan using the form.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
              {contents.map((content) => (
                <div
                  key={content.id}
                  className="group border border-slate-200 rounded-2xl p-5 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className="flex justify-between gap-5">
                    <div className="flex gap-4 min-w-0">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-xl">
                        {getPlatformIcon(content.platform)}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-lg">
                          {content.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-slate-500">
                          <span className="font-medium">
                            {content.platform}
                          </span>

                          <span>•</span>

                          <span className="flex items-center gap-1">
                            <FiClock />

                            {new Date(
                              content.contentDate
                            ).toLocaleString()}
                          </span>
                        </div>

                        {content.description && (
                          <p className="mt-3 text-slate-600 leading-relaxed">
                            {content.description}
                          </p>
                        )}

                        <span className="inline-flex mt-4 px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-bold tracking-wide">
                          {content.status}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(content.id)}
                      className="w-10 h-10 shrink-0 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition"
                      title="Delete content"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContentCalendar;