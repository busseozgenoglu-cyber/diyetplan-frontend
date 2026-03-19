import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function IadePolitikasi() {
  const navigate = useNavigate();
  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F0F7F2" }}>
          <ArrowLeft size={18} style={{ color: "#749F82" }} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">İade ve İptal Politikası</h1>
      </div>
      <div className="px-5 py-6 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed pb-20">
        <p className="text-xs text-gray-400">Son güncelleme: Mart 2026</p>

        <h2 className="font-bold text-gray-900">Hizmet Hakkında</h2>
        <p>FitNova olarak sunduğumuz kişiye özel diyet planı, sizin için özel olarak hazırlanan dijital bir içeriktir.</p>

        <h2 className="font-bold text-gray-900">İptal Koşulları</h2>
        <p>Diyet planınız henüz hazırlanmamışsa ve ödemeniz onaylanmamışsa siparişinizi iptal edebilirsiniz. İptal talebinizi ozalentrade@gmail.com adresine iletiniz.</p>

        <h2 className="font-bold text-gray-900">İade Koşulları</h2>
        <p>6502 sayılı Tüketicinin Korunması Hakkında Kanun'un 49. maddesi gereğince, kişiye özel olarak hazırlanan ve teslim edilen dijital içeriklerde (diyet planı) cayma hakkı kullanılamamaktadır.</p>
        <p>Ancak aşağıdaki durumlarda iade değerlendirilebilir:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ödeme yapılmış ancak hizmet 5 iş günü içinde teslim edilmemişse</li>
          <li>Teknik bir hata nedeniyle çift ödeme yapılmışsa</li>
        </ul>

        <h2 className="font-bold text-gray-900">İade Süreci</h2>
        <p>İade talepleriniz ozalentrade@gmail.com adresine iletildiğinde 3 iş günü içinde değerlendirilir. Onaylanan iadeler 7-10 iş günü içinde kartınıza yansır.</p>

        <h2 className="font-bold text-gray-900">İletişim</h2>
        <p>Her türlü soru ve talebiniz için: ozalentrade@gmail.com</p>
      </div>
    </div>
  );
}
