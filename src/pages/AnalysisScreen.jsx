import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const STEPS = [
  "Fiziksel verileriniz analiz ediliyor...",
  "Beslenme alışkanlıklarınız inceleniyor...",
  "Sağlık durumunuz değerlendiriliyor...",
  "Yaşam tarzınız göz önüne alınıyor...",
  "Kişisel profiliniz oluşturuluyor...",
  "Diyet planınız hazırlanıyor...",
];

export default function AnalysisScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 1, 100);
        return next;
      });
    }, 65);

    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 1200);

    const doneTimer = setTimeout(() => {
      setDone(true);
    }, 7000);

    const navTimer = setTimeout(() => {
      navigate("/iletisim");
    }, 8500);

    return () => {
      clearInterval(interval);
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className="app-container flex flex-col items-center justify-center px-8 text-center"
      style={{ minHeight: "100dvh" }}
    >
      {!done ? (
        <>
          {/* Circular Progress */}
          <div className="relative w-36 h-36 mb-8 fade-in">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E8EFE6" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#749F82"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: "#749F82" }}>
                {progress}%
              </span>
              <span className="text-xs text-gray-400">analiz</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Analiziniz Tamamlanıyor</h2>
          <p
            className="text-sm mb-8 transition-all duration-300"
            style={{ color: "#749F82" }}
            data-testid="analysis-step-text"
          >
            {STEPS[step]}
          </p>

          {/* Steps list */}
          <div className="w-full space-y-2.5">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                  i <= step ? "opacity-100" : "opacity-30"
                }`}
                style={{ background: i <= step ? "#F0F7F2" : "#F9FAF9" }}
              >
                <CheckCircle
                  size={16}
                  style={{ color: i < step ? "#749F82" : i === step ? "#DDA15E" : "#D1D5DB" }}
                />
                <span className="text-sm text-gray-700">{s}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="scale-in text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "#E8EFE6" }}
          >
            <CheckCircle size={40} style={{ color: "#749F82" }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analiziniz Tamamlandı!</h2>
          <p className="text-gray-500 text-sm">Yönlendiriliyorsunuz...</p>
        </div>
      )}
    </div>
  );
}
