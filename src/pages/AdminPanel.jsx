import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, LogOut, Download, Search, Users, DollarSign, Clock, CheckCircle, XCircle, X, Building2, CreditCard, Send, Package } from "lucide-react";
import axios from "axios";
import { QUESTIONS } from "../data/questions";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("admin_token")}` };
}

function StatusBadge({ status }) {
  const styles = {
    paid: { background: "#E8EFE6", color: "#2C4032", label: "Ödendi" },
    paytr_paid: { background: "#E8EFE6", color: "#2C4032", label: "PayTR Ödendi" },
    failed: { background: "#FEE2E2", color: "#991B1B", label: "Başarısız" },
    pending: { background: "#FEF3C7", color: "#92400E", label: "Beklemede" },
    havale_bekliyor: { background: "#DBEAFE", color: "#1E40AF", label: "Havale Bekliyor" },
    shipped: { background: "#F3E8FF", color: "#6B21A8", label: "Gönderildi" },
  };
  const s = styles[status] || styles.pending;
  return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: s.background, color: s.color }}>
      {s.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex-1 min-w-0 p-4 rounded-2xl bg-white shadow-sm border border-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: color + "20" }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function SubmissionModal({ sub, onClose, onRefresh }) {
  const qMap = Object.fromEntries(QUESTIONS.map((q) => [String(q.id), q.text]));
  const answers = sub.answers || {};
  const categories = [...new Set(QUESTIONS.map((q) => q.category))];
  const [actionLoading, setActionLoading] = useState(false);

  const handleAction = async (endpoint, confirmMsg) => {
    if (!window.confirm(confirmMsg)) return;
    setActionLoading(true);
    try {
      await axios.post(`${API}/admin/${endpoint}/${sub.id}`, {}, { headers: authHeader() });
      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      alert("İşlem başarısız: " + (err.response?.data?.detail || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const isHavalePending = sub.status === "havale_bekliyor";
  const isPaid = sub.status === "paid" || sub.status === "paytr_paid";
  const isShipped = sub.status === "shipped";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)", maxWidth: "none" }} onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto pb-8 fade-in-up" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">{sub.full_name}</h3>
              <p className="text-xs text-gray-500">{sub.email} · {sub.phone}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F0F7F2" }}>
              <X size={16} style={{ color: "#749F82" }} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <StatusBadge status={sub.status} />
            <span className="text-xs text-gray-400">{new Date(sub.created_at).toLocaleDateString("tr-TR")}</span>
          </div>
        </div>

        <div className="px-5 pt-4 space-y-4">

          {/* Ödeme Yöntemi */}
          {sub.payment_method && (
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "#F9FAF9" }}>
              {sub.payment_method === "paytr" ? <CreditCard size={14} style={{ color: "#749F82" }} /> : <Building2 size={14} style={{ color: "#1E40AF" }} />}
              <span className="text-xs text-gray-600">{sub.payment_method === "paytr" ? "PayTR (Kredi Kartı)" : "Havale/EFT"}</span>
            </div>
          )}

          {/* Havale Bilgileri */}
          {isHavalePending && (
            <div className="p-4 rounded-2xl border-2" style={{ borderColor: "#DBEAFE", background: "#EFF6FF" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#1E40AF" }}>Havale Bildirimi</p>
              {sub.havale_sender_name && <p className="text-xs text-gray-600">Gönderen: <strong>{sub.havale_sender_name}</strong></p>}
              {sub.havale_sender_phone && <p className="text-xs text-gray-600">Tel: {sub.havale_sender_phone}</p>}
              {sub.havale_note && <p className="text-xs text-gray-600">Not: {sub.havale_note}</p>}
              
              {/* Havale Onay/Red Butonları */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAction("approve-havale", "Havaleyi onaylamak istediğinize emin misiniz?")}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white"
                  style={{ background: "#749F82" }}
                >
                  <CheckCircle size={13} /> Havaleyi Onayla
                </button>
                <button
                  onClick={() => handleAction("reject-havale", "Havaleyi reddetmek istediğinize emin misiniz?")}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white"
                  style={{ background: "#DC2626" }}
                >
                  <XCircle size={13} /> Reddet
                </button>
              </div>
            </div>
          )}

          {/* Sipariş Gönderildi Butonu */}
          {isPaid && !isShipped && (
            <button
              onClick={() => handleAction("mark-shipped", "Siparişi gönderildi olarak işaretlemek istediğinize emin misiniz?")}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: "#7C3AED" }}
            >
              <Send size={15} /> Sipariş Gönderildi Olarak İşaretle
            </button>
          )}

          {isShipped && (
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "#F3E8FF" }}>
              <Package size={14} style={{ color: "#6B21A8" }} />
              <span className="text-xs font-bold" style={{ color: "#6B21A8" }}>Diyet planı gönderildi ✓</span>
            </div>
          )}

          {/* Sorular & Cevaplar */}
          {categories.map((cat) => {
            const catQs = QUESTIONS.filter((q) => q.category === cat);
            const answered = catQs.filter((q) => answers[q.id] || answers[String(q.id)]);
            if (!answered.length) return null;
            return (
              <div key={cat}>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">{cat}</p>
                <div className="space-y-2">
                  {answered.map((q) => (
                    <div key={q.id} className="p-3 rounded-xl" style={{ background: "#F9FAF9" }}>
                      <p className="text-xs text-gray-500">{q.text}</p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">{answers[q.id] || answers[String(q.id)]}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [subRes, statRes] = await Promise.all([
        axios.get(`${API}/admin/submissions`, { headers: authHeader() }),
        axios.get(`${API}/admin/stats`, { headers: authHeader() }),
      ]);
      setSubmissions(subRes.data.items || (Array.isArray(subRes.data) ? subRes.data : []));
      setStats(statRes.data);
    } catch {
      localStorage.removeItem("admin_token");
      navigate("/admin/giris");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/giris");
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.append("status", filter);
      if (search) params.append("search", search);
      const res = await axios.get(`${API}/admin/export?${params}`, {
        headers: authHeader(), responseType: "blob",
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `basvurular${filter !== "all" ? "_" + filter : ""}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { alert("Dışa aktarma başarısız"); }
  };

  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search);
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  const filters = [
    ["all", "Tümü"],
    ["paid", "Ödendi"],
    ["paytr_paid", "PayTR"],
    ["havale_bekliyor", "Havale"],
    ["shipped", "Gönderildi"],
    ["pending", "Beklemede"],
    ["failed", "Başarısız"],
  ];

  return (
    <div className="app-container" style={{ minHeight: "100dvh", background: "#F9FAF9" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#749F82" }}>
              <Leaf size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Admin Paneli</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              style={{ background: "#E8EFE6", color: "#2C4032" }}
            >
              <Download size={13} />
              {filter !== "all" ? `CSV (${filters.find(f => f[0] === filter)?.[1]})` : "CSV"}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="flex gap-1.5"><span className="dot" /><span className="dot" /><span className="dot" /></div>
        </div>
      ) : (
        <div className="px-5 py-4 space-y-4">
          {/* Stats */}
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5 fade-in">
            <StatCard icon={Users} label="Toplam" value={stats.total || 0} color="#749F82" />
            <StatCard icon={CheckCircle} label="Ödendi" value={stats.paid || 0} color="#749F82" />
            <StatCard icon={Building2} label="Havale" value={stats.havale_bekliyor || 0} color="#2563EB" />
            <StatCard icon={Package} label="Gönderildi" value={stats.shipped || 0} color="#7C3AED" />
            <StatCard icon={Clock} label="Bekliyor" value={stats.pending || 0} color="#DDA15E" />
            <StatCard icon={DollarSign} label="Gelir" value={`₺${(stats.revenue || 0).toLocaleString("tr-TR")}`} color="#749F82" />
          </div>

          {/* Search + Filter */}
          <div className="space-y-2 fade-in-up">
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="survey-input pl-11"
                placeholder="Ad, e-posta veya telefon ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap"
                  style={{
                    background: filter === val ? "#749F82" : "#E8EFE6",
                    color: filter === val ? "#fff" : "#2C4032",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions List */}
          <div className="space-y-2 fade-in-up stagger-1">
            <p className="text-xs text-gray-500 font-medium">{filtered.length} başvuru</p>
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">Başvuru bulunamadı</div>
            ) : (
              filtered.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelected(sub)}
                  className="w-full text-left p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{sub.full_name}</p>
                      <p className="text-xs text-gray-500 truncate">{sub.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{sub.phone}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <StatusBadge status={sub.status} />
                      <p className="text-xs text-gray-400">
                        {new Date(sub.created_at).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {selected && <SubmissionModal sub={selected} onClose={() => setSelected(null)} onRefresh={fetchData} />}
    </div>
  );
}
