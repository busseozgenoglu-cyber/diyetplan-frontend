import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { QUESTIONS, TOTAL_QUESTIONS } from "../data/questions";

export default function QuestionFlow() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const s = sessionStorage.getItem("survey_index");
    return s ? parseInt(s) : 0;
  });
  const [answers, setAnswers] = useState(() => {
    const s = sessionStorage.getItem("survey_answers");
    return s ? JSON.parse(s) : {};
  });
  const [direction, setDirection] = useState("right");
  const [animKey, setAnimKey] = useState(0);
  const inputRef = useRef(null);

  const question = QUESTIONS[currentIndex];
  const currentAnswer = answers[question?.id] ?? "";
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  useEffect(() => {
    sessionStorage.setItem("survey_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    sessionStorage.setItem("survey_index", currentIndex.toString());
    if (inputRef.current) inputRef.current.focus();
  }, [currentIndex]);

  const setAnswer = (val) => {
    setAnswers((prev) => ({ ...prev, [question.id]: val }));
  };

  const goNext = () => {
    if (currentIndex >= TOTAL_QUESTIONS - 1) {
      navigate("/analiz");
      return;
    }
    setDirection("right");
    setAnimKey((k) => k + 1);
    setCurrentIndex((i) => i + 1);
  };

  const goBack = () => {
    if (currentIndex === 0) { navigate("/"); return; }
    setDirection("left");
    setAnimKey((k) => k + 1);
    setCurrentIndex((i) => i - 1);
  };

  const handleSingleChoice = (opt) => {
    setAnswer(opt);
    setTimeout(goNext, 220);
  };

  const canProceed = question?.optional || String(currentAnswer).trim() !== "";

  if (!question) return null;

  return (
    <div className="app-container flex flex-col" style={{ minHeight: "100dvh" }}>
      {/* Top Bar */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            data-testid="question-back-btn"
            onClick={goBack}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "#F0F7F2" }}
          >
            <ArrowLeft size={18} style={{ color: "#749F82" }} />
          </button>
          <div className="text-center">
            <span className="text-sm font-bold" style={{ color: "#749F82" }}>
              {currentIndex + 1}
            </span>
            <span className="text-sm text-gray-400"> / {TOTAL_QUESTIONS}</span>
          </div>
          <div
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "#E8EFE6", color: "#2C4032" }}
          >
            {question.category}
          </div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question Content */}
      <div
        key={animKey}
        className={`flex-1 px-5 pt-4 pb-4 overflow-y-auto ${direction === "right" ? "slide-right" : "slide-left"}`}
      >
        {/* Question icon + text */}
        <div className="mb-6">
          <span className="text-4xl">{question.icon}</span>
          <h2 className="mt-3 text-xl font-bold text-gray-900 leading-snug">
            {question.text}
          </h2>
          {question.optional && (
            <span className="text-xs text-gray-400 mt-1 inline-block">Opsiyonel — boş bırakabilirsiniz</span>
          )}
        </div>

        {/* Single Choice */}
        {question.type === "single_choice" && (
          <div className="space-y-2.5">
            {question.options.map((opt, i) => (
              <button
                key={opt}
                data-testid={`option-${i}`}
                onClick={() => handleSingleChoice(opt)}
                className={`option-card ${currentAnswer === opt ? "selected" : ""}`}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                  style={{
                    borderColor: currentAnswer === opt ? "#749F82" : "#D1D5DB",
                    background: currentAnswer === opt ? "#749F82" : "transparent",
                  }}
                >
                  {currentAnswer === opt && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="flex-1">{opt}</span>
              </button>
            ))}
          </div>
        )}

        {/* Text Input */}
        {question.type === "text" && (
          <div>
            <input
              ref={inputRef}
              data-testid="question-text-input"
              type="text"
              className="survey-input"
              placeholder={question.placeholder}
              value={currentAnswer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canProceed && goNext()}
              autoComplete="off"
            />
          </div>
        )}

        {/* Number Input */}
        {question.type === "number" && (
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              data-testid="question-number-input"
              type="number"
              className="survey-input"
              placeholder={question.placeholder}
              value={currentAnswer}
              min={question.min}
              max={question.max}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canProceed && goNext()}
            />
            {question.unit && (
              <span
                className="text-sm font-semibold px-3 py-2 rounded-xl flex-shrink-0"
                style={{ background: "#E8EFE6", color: "#749F82" }}
              >
                {question.unit}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {question.type !== "single_choice" && (
        <div className="px-5 pb-6 pt-3 flex-shrink-0 flex gap-3">
          <button
            data-testid="question-prev-btn"
            onClick={goBack}
            className="btn-secondary"
            style={{ width: "80px", flexShrink: 0 }}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            data-testid="question-next-btn"
            onClick={goNext}
            disabled={!canProceed}
            className="btn-brand"
            style={{ opacity: canProceed ? 1 : 0.45 }}
          >
            {currentIndex === TOTAL_QUESTIONS - 1 ? "Tamamla" : "Devam Et"}
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* For single choice - only a back button shown subtly */}
      {question.type === "single_choice" && (
        <div className="px-5 pb-6 pt-1 flex-shrink-0">
          <p className="text-center text-xs text-gray-400">
            Bir seçenek tıklaması ile otomatik ilerler
          </p>
        </div>
      )}
    </div>
  );
}
