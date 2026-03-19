import { useNavigate } from "react-router-dom";
import { CheckCircle, Leaf, Clock, Star } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80";
const NUTRITIONIST_IMG = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    sessionStorage.clear();
    navigate("/sorular");
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[340px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Sağlıklı beslenme"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white" />
        {/* Badge */}
        <div className="absolute top-5 left-0 right-0 flex justify-center">
          <div className="fade-in flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <Leaf size={14} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Diyetisyen Onaylı Program</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-2 pb-36">
        {/* Heading */}
        <div className="fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight mt-2">
            Kişiye Özel<br />
            <span style={{ color: "#749F82" }}>Diyet Programı</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed">
            Diyetisyen danışmanlığında hazırlanan kişiye özel beslenme planını oluşturmak için kısa bir analiz yapın.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 grid grid-cols-3 gap-3 fade-in-up stagger-1">
          {[
            { icon: CheckCircle, label: "Kişiye Özel", sub: "100% bireysel" },
            { icon: Star, label: "Uzman Onaylı", sub: "Diyetisyen" },
            { icon: Clock, label: "3 Günde Teslim", sub: "Hızlı teslimat" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl" style={{ background: "#F0F7F2" }}>
              <item.icon size={20} style={{ color: "#749F82" }} />
              <span className="mt-1 text-xs font-bold text-gray-800">{item.label}</span>
              <span className="text-xs text-gray-500">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Nutritionist Card */}
        <div className="mt-6 fade-in-up stagger-2 flex items-center gap-4 p-4 rounded-3xl border border-gray-100 shadow-sm bg-white">
          <img
            src={NUTRITIONIST_IMG}
            alt="Diyetisyen"
            className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2"
            style={{ borderColor: "#749F82" }}
          />
          <div>
            <p className="text-sm font-bold text-gray-900">Uzman Diyetisyen Ekibi</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Cevaplarınıza göre size özel, bilimsel temelli bir beslenme planı hazırlıyoruz.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-6 fade-in-up stagger-3">
          <p className="text-sm font-semibold text-gray-700 mb-3">Nasıl Çalışır?</p>
          <div className="space-y-3">
            {[
              { step: "1", text: "Kısa bir analiz formu dolduruyorsunuz" },
              { step: "2", text: "Uzman diyetisyen planınızı hazırlıyor" },
              { step: "3", text: "3 gün içinde e-posta ile alıyorsunuz" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ background: "#749F82" }}
                >
                  {item.step}
                </div>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Footer */}
      <div className="px-5 pb-32 pt-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <a href="/gizlilik" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Gizlilik Politikası</a>
          <span className="text-gray-200">|</span>
          <a href="/mesafeli-satis" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Mesafeli Satış Sözleşmesi</a>
        </div>
        <p className="text-xs text-gray-300">© 2026 FitNova · Tüm hakları saklıdır</p>
      </div>

      {/* Fixed CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-6 pb-6 pt-3"
        style={{ maxWidth: 480, background: "linear-gradient(to top, white 80%, transparent)" }}
      >
        <button
          data-testid="start-diet-plan-btn"
          className="btn-brand"
          onClick={handleStart}
        >
          <Leaf size={18} />
          Diyet Programını Oluştur
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">Ücretsiz analiz • 5 dakika sürer</p>
      </div>
    </div>
  );
}
