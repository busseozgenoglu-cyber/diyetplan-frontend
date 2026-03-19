import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, Clock, Leaf } from "lucide-react";

const SUCCESS_IMG = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const name = sessionStorage.getItem("contact_name") || "";
  const email = sessionStorage.getItem("contact_email") || "";

  useEffect(() => {
    if (window.fbq) { window.fbq("track", "Purchase", { currency: "TRY", value: 299 }); }
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      className="app-container flex flex-col items-center justify-between px-6 py-10 text-center"
      style={{ minHeight: "100dvh" }}
    >
      <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Success icon */}
        <div className="relative mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "#E8EFE6" }}
          >
            <CheckCircle size={48} style={{ color: "#749F82" }} />
          </div>
          <div
            className="absolute -right-1 -top-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#749F82" }}
          >
            <Leaf size={14} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Başvurunuz Alındı!</h1>

        {name && (
          <p className="text-base text-gray-600 mb-1">
            Teşekkürler, <span className="font-semibold" style={{ color: "#749F82" }}>{name}</span>
          </p>
        )}

        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          Diyetisyen danışmanlığında hazırlanan kişiye özel diyet planınız{" "}
          <strong className="text-gray-700">3 gün içerisinde</strong> e-posta adresinize gönderilecektir.
        </p>

        {/* Info Cards */}
        <div className="mt-8 w-full space-y-3">
          <div className="flex items-center gap-4 p-4 rounded-2xl text-left" style={{ background: "#F0F7F2" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E8EFE6" }}>
              <Mail size={18} style={{ color: "#749F82" }} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">E-posta Gönderilecek</p>
              <p className="text-xs text-gray-500">{email || "Kayıtlı e-posta adresinize"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl text-left" style={{ background: "#F0F7F2" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E8EFE6" }}>
              <Clock size={18} style={{ color: "#749F82" }} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">3 Gün İçinde Teslim</p>
              <p className="text-xs text-gray-500">Uzman diyetisyen ekibimiz planınızı hazırlıyor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`w-full space-y-3 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        <button
          data-testid="success-home-btn"
          onClick={() => { sessionStorage.clear(); navigate("/"); }}
          className="btn-brand"
        >
          <Leaf size={16} />
          Ana Sayfaya Dön
        </button>
        <p className="text-xs text-gray-400">
          Sorularınız için{" "}
          <span className="font-semibold" style={{ color: "#749F82" }}>
            destek@diyetplan.com
          </span>{" "}
          adresine yazabilirsiniz
        </p>
      </div>
    </div>
  );
}
