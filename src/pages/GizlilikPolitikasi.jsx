import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function GizlilikPolitikasi() {
  const navigate = useNavigate();
  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F0F7F2" }}>
          <ArrowLeft size={18} style={{ color: "#749F82" }} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Gizlilik Politikası</h1>
      </div>
      <div className="px-5 py-6 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed pb-20">
        <p className="text-xs text-gray-400">Son güncelleme: Mart 2026</p>

        <h2 className="font-bold text-gray-900">1. Toplanan Veriler</h2>
        <p>Hizmetimizi kullanırken ad-soyad, e-posta adresi, telefon numarası ve sağlık/beslenme bilgilerinizi topluyoruz. Bu bilgiler yalnızca size kişisel diyet planı hazırlamak amacıyla kullanılmaktadır.</p>

        <h2 className="font-bold text-gray-900">2. Verilerin Kullanımı</h2>
        <p>Kişisel verileriniz; diyet planınızı hazırlamak, ödeme işlemlerini gerçekleştirmek ve sizinle iletişim kurmak amacıyla kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz, satılmaz.</p>

        <h2 className="font-bold text-gray-900">3. Ödeme Güvenliği</h2>
        <p>Kredi kartı ödemeleri PayTR altyapısı üzerinden gerçekleştirilir. Kart bilgileriniz tarafımızca saklanmaz.</p>

        <h2 className="font-bold text-gray-900">4. Veri Saklama</h2>
        <p>Verileriniz, hizmet ilişkimiz devam ettiği süre boyunca ve yasal yükümlülükler çerçevesinde saklanır.</p>

        <h2 className="font-bold text-gray-900">5. Haklarınız</h2>
        <p>KVKK kapsamında verilerinize erişim, düzeltme, silme ve itiraz haklarına sahipsiniz. Talepleriniz için bizimle iletişime geçebilirsiniz.</p>

        <h2 className="font-bold text-gray-900">6. İletişim</h2>
        <p>E-posta: ozalentrade@gmail.com</p>
      </div>
    </div>
  );
}
