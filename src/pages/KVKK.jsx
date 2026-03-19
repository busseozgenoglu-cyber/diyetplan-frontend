import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function KVKK() {
  const navigate = useNavigate();
  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F0F7F2" }}>
          <ArrowLeft size={18} style={{ color: "#749F82" }} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">KVKK Aydınlatma Metni</h1>
      </div>
      <div className="px-5 py-6 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed pb-20">
        <p className="text-xs text-gray-400">Son güncelleme: Mart 2026</p>

        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, veri sorumlusu sıfatıyla kişisel verilerinizin işlenmesine ilişkin sizi aydınlatmak istiyoruz.</p>

        <h2 className="font-bold text-gray-900">Veri Sorumlusu</h2>
        <p>Aleyna Özgenoğlu – fitnova.ink – ozalentrade@gmail.com</p>

        <h2 className="font-bold text-gray-900">İşlenen Kişisel Veriler</h2>
        <p>Ad-soyad, e-posta, telefon numarası, yaş, cinsiyet, boy, kilo, sağlık bilgileri ve beslenme alışkanlıklarına ilişkin veriler.</p>

        <h2 className="font-bold text-gray-900">İşleme Amaçları</h2>
        <p>Kişiye özel diyet planı hazırlanması, ödeme işlemlerinin gerçekleştirilmesi, müşteri iletişiminin sağlanması.</p>

        <h2 className="font-bold text-gray-900">Hukuki Dayanak</h2>
        <p>KVKK Madde 5/2(c) – Sözleşmenin ifası, Madde 5/2(f) – Meşru menfaat.</p>

        <h2 className="font-bold text-gray-900">Veri Aktarımı</h2>
        <p>Verileriniz ödeme altyapısı sağlayıcısı PayTR ile paylaşılmaktadır. Üçüncü taraflara satılmaz veya reklam amacıyla kullanılmaz.</p>

        <h2 className="font-bold text-gray-900">Saklama Süresi</h2>
        <p>Verileriniz hizmet ilişkisi süresince ve yasal yükümlülükler çerçevesinde saklanır.</p>

        <h2 className="font-bold text-gray-900">Haklarınız</h2>
        <p>KVKK'nın 11. maddesi kapsamında; verilerinize erişme, düzeltme, silme, işlemenin kısıtlanmasını isteme ve itiraz etme haklarına sahipsiniz. Talepleriniz için: ozalentrade@gmail.com</p>
      </div>
    </div>
  );
}
