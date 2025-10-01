import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import { Calendar, User, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Tournament = {
    id: string;
    name: string;
    type: string;
    scope: string;
    startTime: string;
    status: string;
};

type Application = {
    id: string;
    user: string;
    status: string;
    appliedAt: string;
    tournament: Tournament;
};

type ApiResponse = {
    success: boolean;
    data?: {
        items: Application[];
        total_count: number;
        has_more: boolean;
        page: number;
        items_per_page: number;
        total_pages: number;
    };
};

export default function ApplicationList() {
    const token = localStorage.getItem("token");
    const { data, isLoading, error } = useQuery<ApiResponse>({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/application`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });

    const applications = data?.data?.items || [];

    if (isLoading)
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-white">
                Yuklanmoqda...
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-red-400">
                Xatolik yuz berdi
            </div>
        );

    return (
        <div className="bg-[#000102] py-10 px-5 min-h-screen">
            <div className="max-w-5xl mx-auto text-white">
                <h1 className="text-3xl font-bold mb-5 text-center">Mening Arizalarim</h1>

                {applications.length === 0 ? (
                    <p className="text-gray-400 text-center">Arizalar mavjud emas</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {applications.map((app) => (
                            <Link
                                to={`/applications/${app.id}`}
                                key={app.id}
                                className="block bg-black/40 p-6 rounded-xl border border-white/10 hover:border-[#f3aa01] transition"
                            >
                                <h2 className="text-lg font-semibold mb-4">{app.tournament.name}</h2>

                                <div className="space-y-3 text-sm text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="text-[#f3aa01]" size={16} />
                                        <span>
                                            Boshlanish:{" "}
                                            {new Date(app.tournament.startTime).toLocaleDateString("uz-UZ", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <User className="text-blue-400" size={16} />
                                        <span>
                                            Ishtirokchi ID: <span className="font-mono">{app.user.slice(0, 8)}</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {app.status === "accepted" ? (
                                            <CheckCircle className="text-green-400" size={16} />
                                        ) : (
                                            <XCircle className="text-red-400" size={16} />
                                        )}
                                        <span>
                                            Holat:{" "}
                                            <span
                                                className={
                                                    app.status === "accepted"
                                                        ? "text-green-400 font-medium"
                                                        : "text-red-400 font-medium"
                                                }
                                            >
                                                {app.status}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <p className="mt-5 text-xs text-gray-500 border-t border-white/10 pt-3">
                                    Ariza topshirilgan sana: {new Date(app.appliedAt).toLocaleString("uz-UZ")}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
