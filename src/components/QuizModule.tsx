import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Timer, 
  Award, 
  TrendingUp, 
  Sparkles, 
  RotateCcw,
  Zap,
  Volume2,
  VolumeX,
  Radio,
  Square,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINANCIAL_RIDDLES } from '../data/riddles';
import { FinancialRiddle } from '../types';
import { soundEngine } from '../services/soundEngine';

interface QuizModuleProps {
  financialIq: number;
  onIncrementIq: (points: number) => void;
  onRewardCash: (cash: number) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  financialIq,
  onIncrementIq,
  onRewardCash,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isBlitzMode, setIsBlitzMode] = useState<boolean>(false);
  const [blitzTimer, setBlitzTimer] = useState<number>(15);
  const [scoreStreak, setScoreStreak] = useState<number>(0);

  // Audio / Voice Narration States (same as comic)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [autoNarrate, setAutoNarrate] = useState<boolean>(false);

  const filteredRiddles = activeCategory === 'all'
    ? FINANCIAL_RIDDLES
    : FINANCIAL_RIDDLES.filter(r => r.category === activeCategory);

  const currentRiddle: FinancialRiddle = filteredRiddles[currentIdx % filteredRiddles.length] || FINANCIAL_RIDDLES[0];

  // Stop voice when component unmounts or question changes
  useEffect(() => {
    return () => {
      soundEngine.stopVoice();
    };
  }, []);

  const handleStopVoice = () => {
    soundEngine.stopVoice();
    setIsSpeaking(false);
    setSpeakingId(null);
  };

  const handleSpeakText = (
    text: string, 
    id: string, 
    role: 'hero' | 'villain' | 'mentor' | 'narrator' = 'mentor'
  ) => {
    if (isSpeaking && speakingId === id) {
      handleStopVoice();
      return;
    }

    handleStopVoice();
    setIsSpeaking(true);
    setSpeakingId(id);

    soundEngine.speak(text, role, () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    });
  };

  const handleNarrateFullQuestion = () => {
    const speechScript = `Desafío pedagógico: ${currentRiddle.title}. Pregunta: ${currentRiddle.question}. Opción uno: ${currentRiddle.options[0]?.text || ''}. Opción dos: ${currentRiddle.options[1]?.text || ''}. Opción tres: ${currentRiddle.options[2]?.text || ''}.`;
    handleSpeakText(speechScript, 'full_question', 'mentor');
  };

  // Blitz mode timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isBlitzMode && selectedOption === null && blitzTimer > 0) {
      interval = setInterval(() => {
        setBlitzTimer(prev => prev - 1);
      }, 1000);
    } else if (isBlitzMode && blitzTimer === 0 && selectedOption === null) {
      // Time up
      soundEngine.playQuizError();
      setSelectedOption('timeout');
      const timeUpExplanation = '¡Tiempo agotado! En modo Blitz debes tomar decisiones financieras en menos de 15 segundos.';
      setResult({
        isCorrect: false,
        explanation: timeUpExplanation
      });
      setScoreStreak(0);
      if (autoNarrate) {
        handleSpeakText(timeUpExplanation, 'result_explanation', 'villain');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBlitzMode, blitzTimer, selectedOption, autoNarrate]);

  // Auto-narrate on question change if enabled
  useEffect(() => {
    if (autoNarrate && selectedOption === null) {
      const speechScript = `${currentRiddle.title}. ${currentRiddle.question}`;
      handleSpeakText(speechScript, 'question_auto', 'mentor');
    }
  }, [currentIdx, autoNarrate]);

  const handleSelectOption = (optionId: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionId);
    handleStopVoice();

    const opt = currentRiddle.options.find(o => o.id === optionId);
    if (!opt) return;

    if (opt.isCorrect) {
      soundEngine.playQuizSuccess();
      setResult({ isCorrect: true, explanation: opt.explanation });
      onIncrementIq(currentRiddle.points);
      onRewardCash(80);
      setScoreStreak(prev => prev + 1);

      if (autoNarrate) {
        handleSpeakText(`¡Respuesta Correcta! ${opt.explanation}`, 'result_explanation', 'hero');
      }

      if (scoreStreak + 1 >= 3) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      soundEngine.playQuizError();
      setResult({ isCorrect: false, explanation: opt.explanation });
      setScoreStreak(0);

      if (autoNarrate) {
        handleSpeakText(`Respuesta Incorrecta. ${opt.explanation}`, 'result_explanation', 'villain');
      }
    }
  };

  const handleNextQuestion = () => {
    handleStopVoice();
    soundEngine.playUiClick();
    setSelectedOption(null);
    setResult(null);
    setBlitzTimer(15);
    setCurrentIdx(prev => (prev + 1) % filteredRiddles.length);
  };

  const handleRestartQuiz = () => {
    handleStopVoice();
    soundEngine.playUiClick();
    setSelectedOption(null);
    setResult(null);
    setCurrentIdx(0);
    setBlitzTimer(15);
    setScoreStreak(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 py-2">
      {/* Top Banner */}
      <div className="bg-[#090d1a]/95 border border-emerald-500/30 rounded-3xl p-4 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              MICRO-EVALUACIONES PEDAGÓGICAS (RF-05)
            </span>
            <span className="text-xs text-slate-400 font-mono">COEFICIENTE IQ CON AUDIO</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
            Asertijos & Decisiones de Alto Impacto
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Pon a prueba tu agilidad mental con narración de voz interactiva, detección de pasivos y análisis de valor real.
          </p>
        </div>

        {/* Stats & Audio / Blitz Mode Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Auto Narrator Toggle Button */}
          <button
            onClick={() => {
              soundEngine.playUiClick();
              if (autoNarrate) {
                handleStopVoice();
              }
              setAutoNarrate(!autoNarrate);
            }}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              autoNarrate
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Activar narración por voz automática de cada pregunta"
          >
            <Radio className={`w-3.5 h-3.5 ${autoNarrate ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{autoNarrate ? 'Voz Auto: ON' : 'Voz Auto: OFF'}</span>
          </button>

          <div className="p-2.5 px-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-mono">Racha Actual:</span>
            <span className="text-sm font-black text-emerald-400 font-mono">🔥 {scoreStreak}</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playUiClick();
              handleStopVoice();
              setIsBlitzMode(!isBlitzMode);
              setBlitzTimer(15);
              setSelectedOption(null);
              setResult(null);
            }}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              isBlitzMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{isBlitzMode ? `Blitz (${blitzTimer}s)` : 'Modo Blitz (15s)'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        {[
          { id: 'all', label: 'Todos los Temas' },
          { id: 'devaluacion', label: '🔥 Devaluación' },
          { id: 'pasivos_vs_activos', label: 'Pasivos vs Activos' },
          { id: 'coste_oportunidad', label: 'Coste de Oportunidad' },
          { id: 'inflacion', label: 'Inflación' },
          { id: 'apalancamiento', label: 'Apalancamiento' },
          { id: 'interes_compuesto', label: 'Interés Compuesto' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              handleStopVoice();
              soundEngine.playUiClick();
              setActiveCategory(cat.id);
              setCurrentIdx(0);
              setSelectedOption(null);
              setResult(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
              activeCategory === cat.id
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Riddle Question Card */}
      <div className="bg-[#090d1a]/95 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                DESAFÍO PEDAGÓGICO #{currentIdx + 1} DE {filteredRiddles.length}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {currentRiddle.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {/* Full Audio Narration Button (Like Comic) */}
            <button
              onClick={handleNarrateFullQuestion}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                isSpeaking && speakingId === 'full_question'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
                  : 'bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400'
              }`}
              title="Escuchar toda la pregunta y sus opciones narradas por voz"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking && speakingId === 'full_question' ? 'animate-bounce' : ''}`} />
              <span>{isSpeaking && speakingId === 'full_question' ? 'Detener Audio' : '🔊 Escuchar Desafío'}</span>
            </button>

            <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold">
              +{currentRiddle.points} IQ
            </span>
          </div>
        </div>

        {/* Question text with dedicated Speak button */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {currentRiddle.question}
            </p>
            <button
              onClick={() => handleSpeakText(currentRiddle.question, 'question_only', 'mentor')}
              className={`p-2 rounded-xl flex-shrink-0 transition-all ${
                isSpeaking && speakingId === 'question_only'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800'
              }`}
              title="Escuchar solo el enunciado de la pregunta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Options list with individual speech buttons */}
        <div className="space-y-3">
          {currentRiddle.options.map((option, optIdx) => {
            const isSelected = selectedOption === option.id;
            const optAudioId = `opt_${option.id}`;
            let optionStyles = 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-cyan-400/50 hover:bg-slate-800';

            if (selectedOption !== null) {
              if (option.isCorrect) {
                optionStyles = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)] font-semibold';
              } else if (isSelected && !option.isCorrect) {
                optionStyles = 'bg-rose-950/80 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
              } else {
                optionStyles = 'bg-slate-950/40 border-slate-900 text-slate-600';
              }
            }

            return (
              <div
                key={option.id}
                className={`w-full rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all flex items-center justify-between gap-3 p-3.5 sm:p-4 ${optionStyles}`}
              >
                <button
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(option.id)}
                  className="flex-1 text-left flex items-start gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-cyan-400 flex-shrink-0 mt-0.5">
                    {optIdx + 1}
                  </span>
                  <span className="flex-1">{option.text}</span>
                </button>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Speak single option button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakText(`Opción ${optIdx + 1}: ${option.text}`, optAudioId, 'mentor');
                    }}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      isSpeaking && speakingId === optAudioId
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-300'
                    }`}
                    title="Escuchar esta opción en voz alta"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  {selectedOption !== null && (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    ) : null
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback & Explanation box with voice narrator */}
        {result && (
          <div className={`p-4 rounded-2xl border flex flex-col gap-2.5 ${
            result.isCorrect
              ? 'bg-emerald-950/70 border-emerald-400/60 text-emerald-200'
              : 'bg-rose-950/70 border-rose-400/60 text-rose-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {result.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>¡Excelente Respuesta! +{currentRiddle.points} Puntos de IQ y +$80 Bonificación</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>Respuesta Incorrecta - Análisis Contable:</span>
                  </>
                )}
              </div>

              {/* Speak Explanation Button */}
              <button
                onClick={() => handleSpeakText(result.explanation, 'explanation_result', result.isCorrect ? 'hero' : 'villain')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isSpeaking && speakingId === 'explanation_result'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'bg-slate-900/90 text-cyan-300 hover:bg-slate-800 border border-cyan-500/40'
                }`}
                title="Escuchar la explicación pedagógica"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking && speakingId === 'explanation_result' ? 'Narrando...' : 'Escuchar Análisis'}</span>
              </button>
            </div>
            
            <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
              {result.explanation}
            </p>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-all font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Banco</span>
          </button>

          {selectedOption !== null && (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Siguiente Desafío</span>
              <span>➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

