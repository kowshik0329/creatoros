import { useEffect, useRef, useState } from "react";
import {
  FiTrash2,
  FiUploadCloud,
  FiFile,
  FiImage,
  FiVideo,
  FiFileText,
  FiExternalLink,
  FiFolder,
  FiCheckCircle,
} from "react-icons/fi";
import api from "../services/api";

interface Asset {
  id: string;
  originalName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
}

function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedSize, setSelectedSize] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getToken = () => localStorage.getItem("token");

  const fetchAssets = async () => {
    try {
      const response = await api.get("/assets", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setAssets(response.data.data);
    } catch (error) {
      console.error("Fetch assets error:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      await api.post("/assets/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFileName("");
      setSelectedSize(0);

      await fetchAssets();

      alert("Asset uploaded successfully!");
    } catch (error: any) {
      console.error("UPLOAD ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
          `Upload failed - ${
            error.response?.status || "Unknown error"
          }`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/assets/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      await fetchAssets();

      alert("Asset deleted successfully!");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to delete asset"
      );
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getAssetIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <FiImage />;
    }

    if (fileType.startsWith("video/")) {
      return <FiVideo />;
    }

    if (
      fileType.includes("pdf") ||
      fileType.includes("document")
    ) {
      return <FiFileText />;
    }

    return <FiFile />;
  };

  const totalStorage = assets.reduce(
    (total, asset) => total + asset.fileSize,
    0
  );

  const imageCount = assets.filter((asset) =>
    asset.fileType.startsWith("image/")
  ).length;

  const videoCount = assets.filter((asset) =>
    asset.fileType.startsWith("video/")
  ).length;

  return (
    <section className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-7 lg:p-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl">
            <FiFolder />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Asset Library
            </h2>

            <p className="text-slate-500 mt-1">
              Organize your creator files, media and documents.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-violet-50 text-violet-700 text-sm font-semibold">
          {assets.length} assets
        </div>
      </div>

      <div className="p-7 lg:p-8">
        <div className="grid md:grid-cols-3 gap-4 mb-7">
          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <FiFolder />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Total storage
                </p>

                <p className="font-bold text-slate-900 mt-1">
                  {formatFileSize(totalStorage)}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FiImage />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Images
                </p>

                <p className="font-bold text-slate-900 mt-1">
                  {imageCount} files
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <FiVideo />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Videos
                </p>

                <p className="font-bold text-slate-900 mt-1">
                  {videoCount} files
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#111124] rounded-2xl p-7 lg:p-8">
          <div className="absolute -right-20 -top-24 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl" />

          <div className="relative z-10 border-2 border-dashed border-white/15 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-violet-900/40">
              <FiUploadCloud />
            </div>

            <h3 className="text-xl font-bold text-white mt-5">
              Upload creator assets
            </h3>

            <p className="text-slate-400 mt-2">
              Add images, videos, PDFs and campaign documents.
            </p>

            <input
              ref={fileInputRef}
              id="creator-asset-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setFileName(file.name);
                  setSelectedSize(file.size);
                } else {
                  setFileName("");
                  setSelectedSize(0);
                }
              }}
              className="hidden"
            />

            <label
              htmlFor="creator-asset-upload"
              className="inline-flex mt-6 px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/15 transition cursor-pointer"
            >
              Choose a file
            </label>

            {fileName && (
              <div className="max-w-md mx-auto mt-5 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 text-left">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center">
                  <FiCheckCircle />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {fileName}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {formatFileSize(selectedSize)} • Ready to upload
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="mt-5 bg-gradient-to-r from-violet-600 to-indigo-600 disabled:opacity-60 text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-violet-900/40 transition-all"
            >
              {uploading
                ? "Uploading asset..."
                : "Upload to Library"}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Your Assets
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your creator media library
              </p>
            </div>

            <span className="text-sm text-slate-400">
              {assets.length} files
            </span>
          </div>

          {assets.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-2xl min-h-[280px] flex flex-col items-center justify-center text-center p-8">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl">
                <FiFolder />
              </div>

              <h4 className="font-bold text-slate-800 mt-5">
                Your library is empty
              </h4>

              <p className="text-sm text-slate-500 mt-2">
                Upload your first creator asset to get started.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="group border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
                >
                  <div className="h-36 bg-gradient-to-br from-slate-50 to-violet-50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white text-violet-600 shadow-sm flex items-center justify-center text-3xl">
                      {getAssetIcon(asset.fileType)}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 truncate">
                      {asset.originalName}
                    </h4>

                    <p className="text-xs text-slate-500 mt-2 truncate">
                      {asset.fileType}
                    </p>

                    <p className="text-xs font-semibold text-violet-600 mt-2">
                      {formatFileSize(asset.fileSize)}
                    </p>

                    <div className="flex gap-3 mt-5">
                      <a
                        href={`http://localhost:5000${asset.fileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                      >
                        <FiExternalLink />
                        View
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDelete(asset.id)}
                        className="w-11 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                        title="Delete asset"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
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

export default AssetManager;