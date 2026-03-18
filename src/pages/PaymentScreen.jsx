import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Lock, CheckCircle, Building2,
  Copy, Check, Send, User, Phone, MessageSquare
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

  const [step, setStep] = useState("havale");
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState(() => sessionStorage.getItem("submission_id") || null);
  const [copiedField, setCopiedField] = useState(null);
  const [havaleForm, setHavaleForm] = useState({ sender_name: "", sender_phone: "", note: "" });
  const [havaleLoading, setHavaleLoading] = useState(false);

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
        // Fallback
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
        sender_email: contact.email || "",
        note: havaleForm.note || "",
      });
      setStep("havale_success");
    } catch (err) {
      console.error("Havale notify error:", err);
      const msg = err.response?.data?.detail
        || err.response?.data?.message
        || err.message
        || "Bildirim gönderilemedi. Lütfen tekrar deneyin.";
      setError(msg);
      setStep("error");
    } finally {
      setHavaleLoading(false);
    }
  };

  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0">
        <button
          data-testid="payment-back-btn"
          onClick={() => {
            if (step === "havale") navigate("/iletisim");
            else if (step === "havale_form") setStep("havale");
            else if (step === "error") setStep("havale");
          }}
          style={{
            background: "#F0F7F2",
            visibility: ["havale", "havale_form", "error"].includes(step) ? "visible" : "hidden"
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

        {/* ===== HAVALE DETAILS ===== */}
        {step === "havale" && (
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
                      className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
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
                      className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
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

            <div className="p-3 rounded-2xl border border-amber-200" style={{ background: "#FFFBEB" }}>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Önemli:</strong> Havale/EFT yaptıktan sonra aşağıdaki butona tıklayarak bildirim gönderiniz.
                Ödemeniz kontrol edildikten sonra diyet planınız hazırlanacaktır.
              </p>
            </div>

            <div className="space-y-2">
              {["Kişiye özel beslenme planı", "3 gün içinde e-posta ile teslim", "Uzman diyetisyen onaylı"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: "#749F82" }} />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setHavaleForm({
                  sender_name: contact.full_name || "",
                  sender_phone: contact.phone || "",
                  note: ""
                });
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
                <>
                  <Send size={16} />
                  Bildirimi Gönder
                </>
              )}
            </button>

            <button
              onClick={() => setStep("havale")}
              className="w-full text-center text-sm font-semibold py-2"
              style={{ color: "#749F82" }}
            >
              ← Havale Bilgilerine Dön
            </button>
          </div>
        )}

        {/* ===== SUCCESS ===== */}
        {step === "havale_success" && (
          <div className="px-5 py-12 text-center fade-in-up">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "#E8EFE6" }}
            >
              <CheckCircle size={40} style={{ color: "#749F82" }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bildiriminiz Alındı!</h3>
            <p className="text-sm text-gray-500 mb-2 leading-relaxed">
              Havale bildiriminiz başarıyla iletildi.
            </p>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Ödemeniz kontrol edildikten sonra kişiye özel diyet planınız{" "}
              <strong className="text-gray-700">3 gün içinde</strong> e-posta adresinize gönderilecektir.
            </p>

            <div className="p-4 rounded-2xl text-left mb-6" style={{ background: "#F0F7F2" }}>
              <p className="text-xs font-semibold text-gray-600 mb-2">Bildirim Özeti</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>Gönderen: <span className="font-semibold text-gray-700">{havaleForm.sender_name}</span></p>
                {havaleForm.sender_phone && <p>Telefon: <span className="font-semibold text-gray-700">{havaleForm.sender_phone}</span></p>}
                {contact.email && <p>E-posta: <span className="font-semibold text-gray-700">{contact.email}</span></p>}
                {havaleForm.note && <p>Not: <span className="text-gray-700">{havaleForm.note}</span></p>}
              </div>
            </div>

            <button
              onClick={() => { sessionStorage.clear(); navigate("/"); }}
              className="btn-brand"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        )}

        {/* ===== ERROR ===== */}
        {step === "error" && (
          <div className="px-5 py-12 text-center fade-in">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#FEE2E2" }}
            >
              <span className="text-3xl">!</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Bir Hata Oluştu</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">{error}</p>
            <button
              onClick={() => { setStep("havale"); setError(""); }}
              className="btn-brand mx-auto"
              style={{ maxWidth: 280 }}
            >
              Tekrar Dene
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
