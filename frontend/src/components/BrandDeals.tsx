import { useEffect, useState } from "react";
import {
  FiTrash2,
  FiBriefcase,
  FiPlus,
  FiDollarSign,
  FiActivity,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import api from "../services/api";

interface BrandDeal {
  id: string;
  brandName: string;
  campaign: string;
  amount: number;
  status: string;
}

function BrandDeals() {
  const [deals, setDeals] = useState<BrandDeal[]>([]);

  const [formData, setFormData] = useState({
    brandName: "",
    campaign: "",
    amount: "",
    status: "PENDING",
  });

  const getToken = () => localStorage.getItem("token");

  const fetchDeals = async () => {
    try {
      const response = await api.get("/brand-deals", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setDeals(response.data.data);
    } catch (error) {
      console.error("Unable to fetch brand deals", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
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
        "/brand-deals",
        {
          brandName: formData.brandName,
          campaign: formData.campaign,
          amount: Number(formData.amount),
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setFormData({
        brandName: "",
        campaign: "",
        amount: "",
        status: "PENDING",
      });

      await fetchDeals();

      alert("Brand deal added successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to add brand deal");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/brand-deals/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      await fetchDeals();
    } catch (error) {
      console.error(error);
      alert("Unable to delete brand deal");
    }
  };

  const totalValue = deals.reduce(
    (total, deal) => total + deal.amount,
    0
  );

  const activeDeals = deals.filter(
    (deal) => deal.status === "ACTIVE"
  ).length;

  const completedDeals = deals.filter(
    (deal) => deal.status === "COMPLETED"
  ).length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "COMPLETED":
        return "bg-violet-50 text-violet-700 border-violet-100";

      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <FiActivity />;

      case "COMPLETED":
        return <FiCheckCircle />;

      default:
        return <FiClock />;
    }
  };

  return (
    <section className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-7 lg:p-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
            <FiBriefcase />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Brand Partnerships
            </h2>

            <p className="text-slate-500 mt-1">
              Manage campaigns and track your creator deals.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">
          {deals.length} partnerships
        </div>
      </div>

      <div className="p-7 lg:p-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Partnership value
              </p>

              <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <FiDollarSign />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              ₹{totalValue.toLocaleString("en-IN")}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Total deal pipeline
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Active deals
              </p>

              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiActivity />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              {activeDeals}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Campaigns in progress
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FiCheckCircle />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              {completedDeals}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Successful partnerships
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-[380px_1fr] gap-7">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <FiPlus className="text-violet-600" />

              <h3 className="font-bold text-slate-900">
                Add partnership
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Brand name
                </label>

                <input
                  type="text"
                  name="brandName"
                  placeholder="e.g. Nike"
                  value={formData.brandName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Campaign
                </label>

                <input
                  type="text"
                  name="campaign"
                  placeholder="e.g. Summer Creator Campaign"
                  value={formData.campaign}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deal value
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="amount"
                    placeholder="25000"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deal status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                >
                  <option value="PENDING">Pending</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/20 transition-all"
              >
                <FiPlus />
                Add Brand Deal
              </button>
            </form>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">
                Partnership pipeline
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Track every brand collaboration in one place.
              </p>
            </div>

            {deals.length === 0 ? (
              <div className="min-h-[420px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl">
                  <FiBriefcase />
                </div>

                <h4 className="font-bold text-slate-800 mt-5">
                  No partnerships yet
                </h4>

                <p className="text-sm text-slate-500 mt-2">
                  Add your first creator brand deal.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4 font-semibold">
                        Brand
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Campaign
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Value
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Status
                      </th>

                      <th className="px-5 py-4 font-semibold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {deals.map((deal) => (
                      <tr
                        key={deal.id}
                        className="border-t border-slate-100 hover:bg-slate-50/70 transition"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold uppercase">
                              {deal.brandName.charAt(0)}
                            </div>

                            <span className="font-semibold text-slate-900">
                              {deal.brandName}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-slate-600">
                          {deal.campaign}
                        </td>

                        <td className="px-5 py-5 font-bold text-slate-900">
                          ₹{deal.amount.toLocaleString("en-IN")}
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusStyle(
                              deal.status
                            )}`}
                          >
                            {getStatusIcon(deal.status)}
                            {deal.status}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(deal.id)}
                            className="w-9 h-9 rounded-xl inline-flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                            title="Delete deal"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandDeals;