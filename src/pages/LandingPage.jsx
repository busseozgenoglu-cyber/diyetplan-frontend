import { useNavigate } from "react-router-dom";
import { CheckCircle, Leaf, Shield, Zap, TrendingDown, Heart, Award } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_IMG = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80";
const NUTRITIONIST_IMG = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80";

function useCountdown(targetMinutes) {
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem("countdown_end");
    if (saved) return Math.max(0, Math.floor((parseInt(saved) - Date.now()) / 1000));
    const end = Date.now() + targetMinutes * 60 * 1000;
    localStorage.setItem("countdown_end", end.toString());
    return targetMinutes * 60;
  });
  useEffect(() => {
    const timer = setInterval(() => setTime(p => p <= 0 ? 0 : p - 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return { m: String(Math.floor(time/60)).padStart(2,"0"), s: String(time%60).padStart(2,"0"), expired: time===0 };
}

const REVIEWS = [
  { name: "Ayşe K.", city: "İstanbul", text: "3 haftada 4 kilo verdim! Gerçekten kişiye özel bir plan. Başka hiçbir diyette bu kadar hızlı sonuç almamıştım.", stars: 5, kg: "-4 kg", time: "3 hafta" },
  { name: "Fatma D.", city: "Ankara", text: "Çok detaylı ve uygulanabilir bir program. Alışveriş listesi bile var. Artık ne yiyeceğimi bilmiyorum diye düşünmüyorum.", stars: 5, kg: "-6 kg", time: "1 ay" },
  { name: "Merve S.", city: "İzmir", text: "Fiyatına göre inanılmaz içerik. Bir diyetisyen randevusu 500-600 TL iken burada 249 TL'ye çok daha detaylı plan alıyorsunuz.", stars: 5, kg: "-3 kg", time: "2 hafta" },
  { name: "Elif T.", city: "Bursa", text: "İlk başta şüpheliydim ama denedim ve şaşırdım. Planı tamamen benim sağlık durumuma göre hazırlamışlar.", stars: 5, kg: "-5 kg", time: "3 hafta" },
  { name: "Seda Y.", city: "Antalya", text: "Hamileyken aldığım kiloları vermeye çalışıyordum. Plan hem sağlıklı hem etkili. Teşekkürler!", stars: 5, kg: "-4.5 kg", time: "1 ay" },
  { name: "Zeynep A.", city: "Konya", text: "Sabah kahvaltısından gece atıştırmasına kadar her şey yazılı. Çok rahat uyguladım.", stars: 5, kg: "-7 kg", time: "5 hafta" },
  { name: "Hülya M.", city: "Adana", text: "Diyabet hastasıyım, ona göre özel bir plan hazırladılar. Kan şekerim de düzeldi, kilom da.", stars: 5, kg: "-3 kg", time: "3 hafta" },
  { name: "Cansu B.", city: "Trabzon", text: "3 günde geldi planım! Bu kadar hızlı olacağını beklemiyordum. İçerik de çok kapsamlı.", stars: 5, kg: "-5 kg", time: "4 hafta" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { m, s, expired } = useCountdown(30);
  const [showAll, setShowAll] = useState(false);
  const handleStart = () => { sessionStorage.clear(); navigate("/sorular"); };
  const visibleReviews = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <div className="app-container">
      <div className="relative h-[55vh] min-h-[340px] overflow-hidden">
        <img src={HERO_IMG} alt="Sağlıklı beslenme" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white" />
        <div className="absolute top-5 left-0 right-0 flex justify-center">
          <div className="fade-in flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <Leaf size={14} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">850+ Kişi Bu Ay Sipariş Verdi</span>
          </div>
        </div>
      </div>

      <div className="px-6 pt-2 pb-36">
        {!expired && (
          <div className="fade-in-up mb-4 p-3 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)" }}>
            <p className="text-white text-xs font-bold mb-1">KAMPANYA BİTİYOR — Fiyat artmadan sipariş ver!</p>
            <div className="flex items-center justify-center gap-2">
              <div className="bg-white/20 rounded-xl px-3 py-1"><span className="text-white text-2xl font-bold">{m}</span><span className="text-white/70 text-xs block">DAK</span></div>
              <span className="text-white text-2xl font-bold">:</span>
              <div className="bg-white/20 rounded-xl px-3 py-1"><span className="text-white text-2xl font-bold">{s}</span><span className="text-white/70 text-xs block">SAN</span></div>
            </div>
          </div>
        )}

        <div className="fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight mt-2">
            1 Aylık Kişiye Özel<br /><span style={{ color: "#749F82" }}>Diyet Listesi</span>
          </h1>
          <p className="mt-2 text-base text-gray-500 leading-relaxed">Sağlık durumunuza özel hazırlanan tam 1 aylık beslenme programı.</p>
        </div>

        <div className="mt-4 p-4 rounded-3xl fade-in-up stagger-1" style={{ background: "linear-gradient(135deg, #F0F7F2, #E8EFE6)", border: "2px solid #749F82" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 line-through">Normal fiyat: 1.249 TL</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-4xl font-bold" style={{ color: "#749F82" }}>249 TL</p>
                <span className="text-sm font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">%80 İNDİRİM</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">1 Aylık Tam Beslenme Programı</p>
            </div>
            <div className="text-right">
              <div className="flex gap-0.5 justify-end">{[1,2,3,4,5].map(i=><span key={i} className="text-yellow-400">★</span>)}</div>
              <p className="text-xs text-gray-500 mt-0.5">850+ sipariş</p>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-2xl flex items-center gap-3 fade-in-up" style={{ background: "#FFF8E1", border: "1px solid #FFD54F" }}>
          <Shield size={28} style={{ color: "#FF8C00", flexShrink: 0 }} />
          <div>
            <p className="text-sm font-bold text-gray-800">7 Gün Para İadesi Garantisi</p>
            <p className="text-xs text-gray-600">Memnun kalmazsanız hiç sormadan tam iade yapıyoruz.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 fade-in-up stagger-1">
          {[
            { icon: TrendingDown, label: "Hızlı Kilo Verme", sub: "Bilimsel yöntem" },
            { icon: Heart, label: "Sağlıklı Beslenme", sub: "Dengeli plan" },
            { icon: Zap, label: "3 Günde Teslim", sub: "E-posta ile" },
            { icon: Award, label: "Kişiye Özel", sub: "100% bireysel" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0F7F2" }}>
                <item.icon size={18} style={{ color: "#749F82" }} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-3xl bg-white border border-gray-100 shadow-sm fade-in-up stagger-2">
          <p className="text-sm font-bold text-gray-900 mb-3">Planınızda Neler Var?</p>
          <div className="space-y-2">
            {["Sabah, öğle, akşam ve ara öğün planı (30 gün)","Kişiye özel kalori ve makro hesabı","Haftalık alışveriş listesi","Yasak ve serbest yiyecekler listesi","Su tüketimi ve uyku önerileri","Pratik tarif önerileri"].map((item,i)=>(
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={14} style={{ color: "#749F82", flexShrink: 0 }} />
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 fade-in-up stagger-2 flex items-center gap-4 p-4 rounded-3xl border border-gray-100 shadow-sm bg-white">
          <img src={NUTRITIONIST_IMG} alt="Beslenme uzmanı" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2" style={{ borderColor: "#749F82" }} />
          <div>
            <p className="text-sm font-bold text-gray-900">Deneyimli Beslenme Ekibi</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Yanıtlarınıza göre size özel, uygulanabilir 1 aylık beslenme planı hazırlıyoruz.</p>
          </div>
        </div>

        <div className="mt-4 fade-in-up stagger-3">
          <p className="text-sm font-semibold text-gray-700 mb-3">Nasıl Çalışır?</p>
          <div className="space-y-3">
            {[
              { step:"1", text:"5 dakikada formu doldur", sub:"Sağlık durumun ve hedeflerin" },
              { step:"2", text:"Ekibimiz planını hazırlasın", sub:"Kişiye özel 1 aylık program" },
              { step:"3", text:"3 gün içinde e-postana gelsin", sub:"PDF olarak teslim" },
            ].map((item,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: "#749F82" }}>{item.step}</div>
                <div><p className="text-sm font-semibold text-gray-800">{item.text}</p><p className="text-xs text-gray-500">{item.sub}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">Müşteri Yorumları</p>
            <span className="text-xs text-gray-500">★★★★★ 4.9/5</span>
          </div>
          <div className="space-y-3">
            {visibleReviews.map((review,i)=>(
              <div key={i} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div><p className="text-xs font-bold text-gray-800">{review.name}</p><p className="text-xs text-gray-400">{review.city}</p></div>
                  <div className="text-right">
                    <div className="flex gap-0.5">{[...Array(review.stars)].map((_,j)=><span key={j} className="text-yellow-400 text-xs">★</span>)}</div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 inline-block" style={{ background:"#E8EFE6",color:"#2C4032" }}>{review.kg} / {review.time}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
          {!showAll && <button onClick={()=>setShowAll(true)} className="w-full mt-3 py-2.5 rounded-2xl text-xs font-semibold" style={{ background:"#F0F7F2",color:"#749F82" }}>Tüm yorumları gör ({REVIEWS.length})</button>}
        </div>

        <div className="mt-6 fade-in-up">
          <p className="text-sm font-bold text-gray-900 mb-3">Sık Sorulan Sorular</p>
          <div className="space-y-3">
            {[
              { q:"Plan gerçekten kişiye özel mi?", a:"Evet, doldurduğunuz form bilgilerine göre sizin için özel olarak hazırlanır." },
              { q:"Ne kadar sürede teslim alırım?", a:"Ödemeniz onaylandıktan sonra 3 iş günü içinde e-posta adresinize PDF olarak gönderilir." },
              { q:"Beğenmezsem ne olur?", a:"7 gün içinde para iadesi garantimiz var. Hiç sormadan iade yapıyoruz." },
              { q:"Diyabetim/tiroid sorunum varsa uygun mu?", a:"Formda sağlık durumunuzu belirtiyorsunuz, plana dahil ediyoruz." },
            ].map((item,i)=>(
              <div key={i} className="p-3 rounded-2xl bg-white border border-gray-100">
                <p className="text-xs font-bold text-gray-800 mb-1">{item.q}</p>
                <p className="text-xs text-gray-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-4 pt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">Bu hizmet tıbbi tavsiye niteliği taşımaz.</p>
          <p className="text-xs text-gray-400">Kişiye özel diyet planı oluşturma hizmeti – ücretlidir (249 TL)</p>
          <div className="flex items-center justify-center flex-wrap gap-3 pt-1">
            <a href="/gizlilik" className="text-xs text-gray-400">Gizlilik</a>
            <span className="text-gray-200">·</span>
            <a href="/kvkk" className="text-xs text-gray-400">KVKK</a>
            <span className="text-gray-200">·</span>
            <a href="/iade-politikasi" className="text-xs text-gray-400">İade Politikası</a>
            <span className="text-gray-200">·</span>
            <a href="/mesafeli-satis" className="text-xs text-gray-400">Mesafeli Satış</a>
          </div>
          <p className="text-xs text-gray-300">© 2026 FitNova · Tüm hakları saklıdır</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-6 pb-6 pt-3" style={{ maxWidth: 480, background: "linear-gradient(to top, white 80%, transparent)" }}>
        <button data-testid="start-diet-plan-btn" className="btn-brand" onClick={handleStart}>
          <Leaf size={18} />
          Hemen Planımı Oluştur — 249 TL
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">Para iade garantisi · 3 günde teslim · Güvenli ödeme</p>
      </div>
    </div>
  );
}
