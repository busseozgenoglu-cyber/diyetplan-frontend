import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function MesafeliSatis() {
  const navigate = useNavigate();
  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F0F7F2" }}>
          <ArrowLeft size={18} style={{ color: "#749F82" }} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Mesafeli Satış Sözleşmesi</h1>
      </div>
      <div className="px-5 py-6 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed pb-20">
        <p className="text-xs text-gray-400">Son güncelleme: Mart 2026</p>

        <h2 className="font-bold text-gray-900">SATICI BİLGİLERİ</h2>
        <p>Ad: Aleyna Özgenoğlu<br />E-posta: ozalentrade@gmail.com<br />Website: fitnova.ink</p>

        <h2 className="font-bold text-gray-900">MADDE 1 – KONU</h2>
        <p>İşbu sözleşme, alıcının satıcıya ait fitnova.ink web sitesi üzerinden elektronik ortamda sipariş verdiği kişiye özel diyet planı hizmetinin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri gereğince tarafların hak ve yükümlülüklerini kapsar.</p>

        <h2 className="font-bold text-gray-900">MADDE 2 – HİZMET BİLGİLERİ</h2>
        <p>Hizmet: Kişiye Özel Diyet Planı<br />Fiyat: 299 TL (KDV dahil)<br />Teslim: Sipariş ve ödeme onayının ardından 3 iş günü içinde e-posta ile</p>

        <h2 className="font-bold text-gray-900">MADDE 3 – ÖDEME</h2>
        <p>Ödeme kredi/banka kartı (PayTR) veya havale/EFT yöntemiyle yapılabilir.</p>

        <h2 className="font-bold text-gray-900">MADDE 4 – CAYMA HAKKI</h2>
        <p>6502 sayılı Kanun'un 49. maddesi gereğince, dijital içerik niteliğindeki kişiye özel hazırlanan diyet planı hizmetinde, hizmet teslim edildikten sonra cayma hakkı kullanılamaz. Hizmet teslim edilmeden önce siparişinizi iptal etmek için bizimle iletişime geçebilirsiniz.</p>

        <h2 className="font-bold text-gray-900">MADDE 5 – İADE</h2>
        <p>Kişiye özel hazırlanan beslenme programları dijital içerik niteliğinde olduğundan, teslim sonrası iade kabul edilmemektedir.</p>

        <h2 className="font-bold text-gray-900">MADDE 6 – UYUŞMAZLIK</h2>
        <p>Uyuşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.</p>
      </div>
    </div>
  );
}
