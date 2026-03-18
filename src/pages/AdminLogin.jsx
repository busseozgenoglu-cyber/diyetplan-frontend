import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Lock, User } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, form);
      localStorage.setItem("admin_token", res.data.token);
      localStorage.setItem("admin_user", res.data.username);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.detail || "Giriş başarısız. Bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="app-container flex flex-col items-center justify-center px-6"
      style={{ minHeight: "100dvh", background: "#F0F7F2" }}
    >
      <div className="w-full fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mb-3 shadow-md"
            style={{ background: "#749F82" }}
          >
            <Leaf size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="text-sm text-gray-500 mt-1">Yönetici girişi yapın</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {error && (
            <div data-testid="admin-login-error" className="mb-4 p-3 rounded-2xl text-sm text-red-700 bg-red-50 border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kullanıcı Adı</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  data-testid="admin-username-input"
                  type="text"
                  className="survey-input pl-11"
                  placeholder="Kullanıcı adınız"
                  value={form.username}
                  onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Şifre</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  data-testid="admin-password-input"
                  type="password"
                  className="survey-input pl-11"
                  placeholder="Şifreniz"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              data-testid="admin-login-btn"
              type="submit"
              className="btn-brand mt-2"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
