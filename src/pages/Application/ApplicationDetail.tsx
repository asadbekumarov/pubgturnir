import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const res = await apiClient.get(`${API_URL}/web/v1/application/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-white p-10">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-red-400 p-10">Xatolik yuz berdi</div>;
  }

  const app = data?.data;

  return (
    <div className="bg-[#000102] min-h-screen text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Ariza Tafsilotlari</h1>
      {app ? (
        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
          <p><strong>Turnir:</strong> {app.tournament?.name}</p>
          <p><strong>Status:</strong> {app.status}</p>
          <p><strong>Ishtirokchi:</strong> {app.user}</p>
          <p><strong>Sana:</strong> {new Date(app.appliedAt).toLocaleString("uz-UZ")}</p>
          {/* boshqa kerakli maydonlarni ham chiqarishingiz mumkin */}
        </div>
      ) : (
        <p>Ma’lumot topilmadi</p>
      )}
    </div>
  );
}
