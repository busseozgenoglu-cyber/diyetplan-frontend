import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Lock, CheckCircle, Building2,
  Copy, Check, Send, User, Phone, MessageSquare, CreditCard
} from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HAVALE_INFO = {
  iban: "TR80 0011 1000 0000 0074 3659 61",
  name: "Aleyna Özgenoğlu",
  bank: "QNB Finansbank",
};

export default function PaymentScreen() {
  const navigate = useNavigate();

  const [step, setStep] = useState("secim"); // secim | havale | havale_form | havale_success | paytr | error
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState(() => sessionStorage.getItem("submission_id") || null);
  const [copiedField, setCopiedField] = useState(null);
  const [havaleForm, setHavaleForm] = useState({ sender_name: "", sender_phone: "", note: "" });
  const [havaleLoading, setHavaleLoading] = useState(false);
  const [paytrData, setPaytrData] = useState(null);
  const [paytrLoading, setPaytrLoading] = useState(false);


  const formRef = useRef(null);

  useEffect(() => {
    if (step === "paytr" && paytrData && formRef.current) {
      formRef.current.submit();
    }
  }, [step, paytrData]);

  const contact = (() => {
    try { return JSON.parse(sessionStorage.getItem("contact_info") || "{}"); } catch { return {}; }
  })();
  const answers = (() => {
    try { return JSON.parse(sessionStorage.getItem("survey_answers") || "{}"); } catch { return {}; }
  })();

  const ensureSubmission = async () => {
    let subId = submissionId || sessionStorage.getItem("submission_id");
    if (!subId) {
      try {
        const subRes = await axios.post(`${API}/submissions`, {
          answers: answers || {},
          full_name: contact.full_name || "Belirtilmedi",
          email: contact.email || "belirtilmedi@email.com",
          phone: contact.phone || "",
        });
        subId = subRes.data.id;
        setSubmissionId(subId);
        sessionStorage.setItem("submission_id", subId);
        sessionStorage.setItem("contact_name", contact.full_name || "");
        sessionStorage.setItem("contact_email", contact.email || "");
      } catch (err) {
        console.error("Submission create error:", err);
        throw new Error("Sunucuya bağlanılamadı. Backend çalışıyor mu kontrol edin.");
      }
    } else {
      setSubmissionId(subId);
    }
    return subId;
  };

  const copyToClipboard = (text, field) => {
    const cleanText = text.replace(/\s/g, "");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanText).then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      }).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = cleanText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      });
    }
  };

  const handleHavaleNotify = async () => {
    if (!havaleForm.sender_name.trim()) return;
    setHavaleLoading(true);
    setError("");
    try {
      const subId = await ensureSubmission();
      await axios.post(`${API}/payments/havale-notify`, {
        submission_id: subId,
        sender_name: havaleForm.sender_name,
        sender_phone: havaleForm.sender_phone || "",
        note: havaleForm.note || "",
      });
      setStep("havale_success");
    } catch (err) {
      console.error("Havale notify error:", err);
      const msg = err.response?.data?.detail || err.message || "Bildirim gönderilemedi.";
      setError(msg);
      setStep("error");
    } finally {
      setHavaleLoading(false);
    }
  };

  const handlePayTR = async () => {
    setPaytrLoading(true);
    setError("");
    try {
      const subId = await ensureSubmission();
      const userIp = "1.2.3.4";
      const res = await axios.post(`${API}/payments/paytr-token`, {
        submission_id: subId,
        user_ip: userIp,
      });
      setPaytrData(res.data.iframe_token);
      setStep("paytr");
    } catch (err) {
      console.error("PayTR error:", err);
      const msg = err.response?.data?.detail || err.message || "Ödeme başlatılamadı.";
      setError(msg);
      setStep("error");
    } finally {
      setPaytrLoading(false);
    }
  };

  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => {
            if (step === "secim") navigate("/iletisim");
            else if (step === "havale") setStep("secim");
            else if (step === "havale_form") setStep("havale");
            else if (step === "paytr") setStep("secim");
            else if (step === "error") setStep("secim");
          }}
          style={{
            background: "#F0F7F2",
            visibility: ["secim", "havale", "havale_form", "paytr", "error"].includes(step) ? "visible" : "hidden"
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={18} style={{ color: "#749F82" }} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Ödeme</h1>
          <div className="flex items-center gap-1 mt-0.5">
            <Lock size={11} style={{ color: "#749F82" }} />
            <span className="text-xs" style={{ color: "#749F82" }}>Güvenli ödeme</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ===== ÖDEME SEÇİMİ ===== */}
        {step === "secim" && (
          <div className="px-5 pb-8 space-y-4 fade-in-up">
            <div className="p-4 rounded-3xl" style={{ background: "#F0F7F2" }}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-900">Kişiye Özel Diyet Programı</p>
                  <p className="text-xs text-gray-500 mt-0.5">Diyetisyen danışmanlığı hizmeti</p>
                </div>
                <p className="text-2xl font-bold ml-3" style={{ color: "#749F82" }}>₺249,99</p>
              </div>
              {contact.full_name && (
                <div className="mt-3 pt-3 border-t border-green-100">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Alıcı:</span> {contact.full_name} · {contact.email}
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm font-semibold text-gray-700 text-center">Ödeme yöntemini seçin</p>

            {/* Kredi Kartı */}
            <button
              onClick={handlePayTR}
              disabled={paytrLoading}
              className="w-full p-4 rounded-3xl border-2 text-left transition-all"
              style={{ borderColor: "#749F82", background: "#F0F7F2" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#749F82" }}>
                  <CreditCard size={20} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">Kredi / Banka Kartı</p>
                  <p className="text-xs text-gray-500">PayTR güvencesiyle anında ödeme</p>
                </div>
                {paytrLoading ? (
                  <div className="flex gap-1">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                ) : (
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#E8EFE6", color: "#2C4032" }}>Önerilen</span>
                )}
              </div>
            </button>

            {/* Havale */}
            <button
              onClick={() => setStep("havale")}
              className="w-full p-4 rounded-3xl border-2 text-left transition-all"
              style={{ borderColor: "#E5E7EB", background: "#FAFAFA" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#FEF3C7" }}>
                  <Building2 size={20} style={{ color: "#D97706" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Havale / EFT</p>
                  <p className="text-xs text-gray-500">Banka havalesi ile ödeme</p>
                </div>
              </div>
            </button>

            <div className="space-y-2">
              {["Kişiye özel beslenme planı", "3 gün içinde e-posta ile teslim", "Uzman diyetisyen onaylı"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: "#749F82" }} />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PAYTR IFRAME ===== */}
        {step === "paytr" && paytrData && (
          <div className="px-5 pb-8 fade-in-up">
            <div className="p-3 rounded-2xl mb-4" style={{ background: "#F0F7F2" }}>
              <p className="text-xs text-gray-600 text-center">Güvenli ödeme sayfası — PayTR altyapısı</p>
            </div>
            <iframe
              src={`https://www.paytr.com/odeme/guvenli/${paytrData}`}
              id="paytriframe"
              frameBorder="0"
              scrolling="yes"
              style={{ width: "100%", height: "800px", borderRadius: "16px" }}
              title="PayTR Ödeme"
            />
          </div>
        )}

        {/* ===== HAVALE DETAILS ===== */}
        {step === "havale" && (
          <div className="px-5 pb-8 space-y-4 fade-in-up">
            <div className="p-4 rounded-3xl" style={{ background: "#FEF3C7" }}>
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={18} style={{ color: "#D97706" }} />
                <p className="text-sm font-bold text-gray-900">Havale / EFT Bilgileri</p>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Aşağıdaki hesaba <strong>₺249,99</strong> tutarında havale/EFT yapınız.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Banka</p>
                  <p className="text-sm font-bold text-gray-900">{HAVALE_INFO.bank}</p>
                </div>
                <div className="bg-white rounded-2xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1">IBAN</p>
                      <p className="text-sm font-bold text-gray-900 font-mono">{HAVALE_INFO.iban}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(HAVALE_INFO.iban, "iban")}
                      className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: copiedField === "iban" ? "#E8EFE6" : "#F3F4F6" }}
                    >
                      {copiedField === "iban" ? <Check size={15} style={{ color: "#749F82" }} /> : <Copy size={15} className="text-gray-500" />}
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Alıcı Adı</p>
                      <p className="text-sm font-bold text-gray-900">{HAVALE_INFO.name}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(HAVALE_INFO.name, "name")}
                      className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: copiedField === "name" ? "#E8EFE6" : "#F3F4F6" }}
                    >
                      {copiedField === "name" ? <Check size={15} style={{ color: "#749F82" }} /> : <Copy size={15} className="text-gray-500" />}
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Tutar</p>
                  <p className="text-lg font-bold" style={{ color: "#749F82" }}>₺249,99</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setHavaleForm({ sender_name: contact.full_name || "", sender_phone: contact.phone || "", note: "" });
                setStep("havale_form");
              }}
              className="btn-brand"
            >
              <Send size={16} />
              Havale Gönderdim - Bildir
            </button>
          </div>
        )}

        {/* ===== HAVALE FORM ===== */}
        {step === "havale_form" && (
          <div className="px-5 pb-8 space-y-4 fade-in-up">
            <div className="p-4 rounded-3xl" style={{ background: "#F0F7F2" }}>
              <p className="text-sm font-bold text-gray-900 mb-1">Havale Bildirimi</p>
              <p className="text-xs text-gray-500">Havale bilgilerinizi girin, ödemenizi en kısa sürede onaylayalım.</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <User size={13} /> Gönderen Adı Soyadı *
                </label>
                <input
                  type="text"
                  className="survey-input"
                  placeholder="Havaleyi gönderen kişi"
                  value={havaleForm.sender_name}
                  onChange={(e) => setHavaleForm(prev => ({ ...prev, sender_name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} /> Telefon
                </label>
                <input
                  type="tel"
                  className="survey-input"
                  placeholder="05XX XXX XX XX"
                  value={havaleForm.sender_phone}
                  onChange={(e) => setHavaleForm(prev => ({ ...prev, sender_phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={13} /> Not (opsiyonel)
                </label>
                <textarea
                  className="survey-input"
                  rows={3}
                  placeholder="Ek bilgi (gönderim saati, dekont no vs.)"
                  value={havaleForm.note}
                  onChange={(e) => setHavaleForm(prev => ({ ...prev, note: e.target.value }))}
                  style={{ resize: "none" }}
                />
              </div>
            </div>
            <button
              onClick={handleHavaleNotify}
              disabled={!havaleForm.sender_name.trim() || havaleLoading}
              className="btn-brand"
              style={{ opacity: !havaleForm.sender_name.trim() || havaleLoading ? 0.6 : 1 }}
            >
              {havaleLoading ? (
                <div className="flex gap-1.5">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              ) : (
                <><Send size={16} />Bildirimi Gönder</>
              )}
            </button>
          </div>
        )}

        {/* ===== SUCCESS ===== */}
        {step === "havale_success" && (
          <div className="px-5 py-12 text-center fade-in-up">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#E8EFE6" }}>
              <CheckCircle size={40} style={{ color: "#749F82" }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bildiriminiz Alındı!</h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Ödemeniz kontrol edildikten sonra kişiye özel diyet planınız{" "}
              <strong className="text-gray-700">3 gün içinde</strong> e-posta adresinize gönderilecektir.
            </p>
            <button onClick={() => { sessionStorage.clear(); navigate("/"); }} className="btn-brand">
              Ana Sayfaya Dön
            </button>
          </div>
        )}

        {/* ===== ERROR ===== */}
        {step === "error" && (
          <div className="px-5 py-12 text-center fade-in">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FEE2E2" }}>
              <span className="text-3xl">!</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Bir Hata Oluştu</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">{error}</p>
            <button onClick={() => { setStep("secim"); setError(""); }} className="btn-brand mx-auto" style={{ maxWidth: 280 }}>
              Tekrar Dene
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
