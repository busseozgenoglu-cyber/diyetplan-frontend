import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Ad soyad zorunludur";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Geçerli bir e-posta girin";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Geçerli bir telefon numarası girin";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem("contact_info", JSON.stringify(form));
    navigate("/odeme");
  };

  const field = (name, label, icon, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
          data-testid={`contact-${name}`}
          type={type}
          className="survey-input pl-11"
          placeholder={placeholder}
          value={form[name]}
          onChange={(e) => { setForm((p) => ({ ...p, [name]: e.target.value })); setErrors((p) => ({ ...p, [name]: "" })); }}
          autoComplete={name === "full_name" ? "name" : name === "email" ? "email" : "tel"}
        />
      </div>
      {errors[name] && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3">
        <button
          data-testid="contact-back-btn"
          onClick={() => navigate("/sorular")}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "#F0F7F2" }}
        >
          <ArrowLeft size={18} style={{ color: "#749F82" }} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">İletişim Bilgileriniz</h1>
      </div>

      {/* Analysis done card */}
      <div className="mx-5 mb-5 p-4 rounded-3xl fade-in-up" style={{ background: "#E8EFE6" }}>
        <div className="flex items-start gap-3">
          <CheckCircle size={20} style={{ color: "#749F82" }} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold" style={{ color: "#2C4032" }}>Analiziniz tamamlandı</p>
            <p className="text-xs mt-0.5" style={{ color: "#4A6B5A" }}>
              Verdiğiniz cevaplara göre diyetisyen danışmanlığında size özel bir beslenme planı hazırlanabilir.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-5">
        <div className="space-y-4 flex-1 fade-in-up stagger-1">
          {field("full_name", "Ad Soyad", <User size={16} />, "text", "Adınız Soyadınız")}
          {field("email", "E-posta Adresi", <Mail size={16} />, "email", "ornek@email.com")}
          {field("phone", "Telefon Numarası", <Phone size={16} />, "tel", "05XX XXX XX XX")}
          <p className="text-xs text-gray-400 text-center pt-1">
            Diyet planınız bu bilgilere gönderilecektir. Bilgileriniz gizli tutulur.
          </p>
        </div>

        <div className="pb-8 pt-4">
          <button
            data-testid="contact-submit-btn"
            type="submit"
            className="btn-brand"
          >
            Ödeme Adımına Geç
          </button>
        </div>
      </form>
    </div>
  );
}
