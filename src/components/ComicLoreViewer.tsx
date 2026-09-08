import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Sliders,
  CheckCircle2,
  Clock,
  Radio
} from 'lucide-react';
import { COMIC_CHAPTERS } from '../data/comics';
import { ComicChapter } from '../types';
import { soundEngine } from '../services/soundEngine';

export const ComicLoreViewer: React.FC = () => {
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [currentPanelIdx, setCurrentPanelIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [activeSpeechPart, setActiveSpeechPart] = useState<'intro' | number | 'lesson' | null>('intro');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [playbackPace, setPlaybackPace] = useState<'slow' | 'natural' | 'brisk'>('natural');

  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  const currentChapter: ComicChapter = COMIC_CHAPTERS[selectedChapterIdx];
  const currentPanel = currentChapter?.panels[currentPanelIdx] || currentChapter?.panels[0];

  // Map pace to speed multiplier
  const getPaceMultiplier = () => {
    switch (playbackPace) {
      case 'slow': return 0.85;
      case 'brisk': return 1.15;
      case 'natural':
      default: return 1.0;
    }
  };

  // Function to run the full panel narration sequence with respectful, natural story pacing
  const startPanelNarrationSequence = (chapterIdx: number, panelIdx: number) => {
    isCancelledRef.current = false;
    soundEngine.stopVoice();
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    if (stepDelayTimeoutRef.current) {
      clearTimeout(stepDelayTimeoutRef.current);
      stepDelayTimeoutRef.current = null;
    }

    const chapter = COMIC_CHAPTERS[chapterIdx];
    if (!chapter) return;
    const panel = chapter.panels[panelIdx];
    if (!panel) return;

    setIsSpeaking(true);
    setActiveSpeechPart('intro');

    // 1. Narrate the scene introduction calmly
    const introText = `Capítulo ${chapter.chapterNumber}: ${chapter.title}. ${panel.caption}`;
    soundEngine.speak(introText, 'narrator', () => {
      if (isCancelledRef.current) return;

      // Natural pause (600ms) after scene introduction before characters speak
      stepDelayTimeoutRef.current = setTimeout(() => {
        if (isCancelledRef.current) return;

        // 2. Play dialogues in natural sequence with distinct character pacing
        const playDialogues = (dlgIndex: number) => {
          if (isCancelledRef.current) return;
          if (dlgIndex < panel.dialogue.length) {
            const dlg = panel.dialogue[dlgIndex];
            setActiveSpeechPart(dlgIndex);
            soundEngine.speak(`${dlg.speaker}: ${dlg.text}`, dlg.isHero ? 'hero' : 'villain', () => {
              if (isCancelledRef.current) return;

              // Breath pause between characters talking (700ms)
              stepDelayTimeoutRef.current = setTimeout(() => {
                if (isCancelledRef.current) return;
                playDialogues(dlgIndex + 1);
              }, 700);
            });
          } else {
            // 3. Play Economic Lesson with pedagogical presence
            stepDelayTimeoutRef.current = setTimeout(() => {
              if (isCancelledRef.current) return;
              setActiveSpeechPart('lesson');
              const lessonText = `Lección económica de Microciudad: ${panel.economicLesson}`;
              soundEngine.speak(lessonText, 'mentor', () => {
                if (isCancelledRef.current) return;
                setActiveSpeechPart(null);
                setIsSpeaking(false);

                // 4. Peaceful absorption pause (3.5 seconds) allowing the reader to enjoy and absorb before advancing
                if (isAutoPlaying) {
                  autoPlayTimeoutRef.current = setTimeout(() => {
                    if (isCancelledRef.current) return;
                    advanceToNextPanel();
                  }, 3500);
                }
              });
            }, 600);
          }
        };

        playDialogues(0);
      }, 600);
    });
  };

  const advanceToNextPanel = () => {
    soundEngine.playUiClick();
    if (currentPanelIdx < currentChapter.panels.length - 1) {
      setCurrentPanelIdx(prev => prev + 1);
    } else if (selectedChapterIdx < COMIC_CHAPTERS.length - 1) {
      setSelectedChapterIdx(prev => prev + 1);
      setCurrentPanelIdx(0);
    } else {
      // Loop back to Chapter 1 once full comic story completes
      setSelectedChapterIdx(0);
      setCurrentPanelIdx(0);
    }
  };

  const handlePrevPanel = () => {
    soundEngine.playUiClick();
    if (currentPanelIdx > 0) {
      setCurrentPanelIdx(prev => prev - 1);
    } else if (selectedChapterIdx > 0) {
      const prevChapIdx = selectedChapterIdx - 1;
      setSelectedChapterIdx(prevChapIdx);
      setCurrentPanelIdx(COMIC_CHAPTERS[prevChapIdx].panels.length - 1);
    }
  };

  // Sync speech rate whenever playbackPace changes
  useEffect(() => {
    soundEngine.setSpeechRateMultiplier(getPaceMultiplier());
  }, [playbackPace]);

  // Trigger sequence on mount and when chapter or panel changes if autoPlay is active
  useEffect(() => {
    if (isAutoPlaying) {
      startPanelNarrationSequence(selectedChapterIdx, currentPanelIdx);
    }

    return () => {
      isCancelledRef.current = true;
      soundEngine.stopVoice();
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      if (stepDelayTimeoutRef.current) clearTimeout(stepDelayTimeoutRef.current);
    };
  }, [selectedChapterIdx, currentPanelIdx, isAutoPlaying]);

  const handleToggleAutoPlay = () => {
    soundEngine.playUiClick();
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      isCancelledRef.current = true;
      soundEngine.stopVoice();
      setIsSpeaking(false);
      setActiveSpeechPart(null);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      if (stepDelayTimeoutRef.current) clearTimeout(stepDelayTimeoutRef.current);
    } else {
      setIsAutoPlaying(true);
      startPanelNarrationSequence(selectedChapterIdx, currentPanelIdx);
    }
  };

  const handleManualSpeakDialogue = (text: string, isHero: boolean, idx: number) => {
    isCancelledRef.current = true;
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (stepDelayTimeoutRef.current) clearTimeout(stepDelayTimeoutRef.current);
    soundEngine.stopVoice();
    setIsSpeaking(true);
    setActiveSpeechPart(idx);
    soundEngine.speak(text, isHero ? 'hero' : 'villain', () => {
      setIsSpeaking(false);
      setActiveSpeechPart(null);
    });
  };

  const handleManualSpeakLesson = () => {
    isCancelledRef.current = true;
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (stepDelayTimeoutRef.current) clearTimeout(stepDelayTimeoutRef.current);
    soundEngine.stopVoice();
    setIsSpeaking(true);
    setActiveSpeechPart('lesson');
    soundEngine.speak(`Lección económica: ${currentPanel.economicLesson}`, 'mentor', () => {
      setIsSpeaking(false);
      setActiveSpeechPart(null);
    });
  };

  // Calculate global story progress
  const totalPanelsAllChapters = COMIC_CHAPTERS.reduce((acc, c) => acc + c.panels.length, 0);
  const currentGlobalPanelIndex = COMIC_CHAPTERS.slice(0, selectedChapterIdx).reduce((acc, c) => acc + c.panels.length, 0) + currentPanelIdx + 1;
  const globalProgressPct = Math.round((currentGlobalPanelIndex / totalPanelsAllChapters) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 py-2">
      {/* Top Banner with Audio-Novela Controls and Natural Pacing Selector */}
      <div className="bg-[#090d1a]/95 border border-purple-500/30 rounded-3xl p-4 sm:p-6 shadow-[0_0_30px_rgba(126,34,206,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-purple-400" />
              CÓMIC COMPLETO Y AUDIO-NOVELA
            </span>
            <span className="text-xs text-slate-400 font-mono">LORE DE MICROCIUDAD</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
            Microciudad: Crónicas del CifraFlow
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Historia económica completa a su propio ritmo natural. Escucha la narración, los diálogos con sus voces e introspección pedagógica sin prisas.
          </p>
        </div>

        {/* Global Auto-Play Toggle & Pacing Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Pace Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => {
                soundEngine.playUiClick();
                setPlaybackPace('slow');
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                playbackPace === 'slow'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Ritmo pausado y relajado"
            >
              🐢 Pausado
            </button>
            <button
              onClick={() => {
                soundEngine.playUiClick();
                setPlaybackPace('natural');
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                playbackPace === 'natural'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Ritmo natural de audiolibro"
            >
              📖 Natural
            </button>
            <button
              onClick={() => {
                soundEngine.playUiClick();
                setPlaybackPace('brisk');
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                playbackPace === 'brisk'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Ritmo dinámico"
            >
              ⚡ Ágil
            </button>
          </div>

          {/* Auto-Play Toggle */}
          <button
            id="btn-toggle-comic-autoplay"
            onClick={handleToggleAutoPlay}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              isAutoPlaying
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-2 ring-emerald-300'
                : 'bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Activar o pausar la narración por voz y cambio automático de panel"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>Narrando Cuento</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Reanudar Cuento</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Chapter Selection Bar with Full Story Timeline */}
      <div className="bg-[#090d1a]/90 border border-slate-800/80 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {COMIC_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                soundEngine.playUiClick();
                setSelectedChapterIdx(idx);
                setCurrentPanelIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedChapterIdx === idx
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] ring-1 ring-purple-400'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Capítulo {ch.chapterNumber}</span>
            </button>
          ))}
        </div>

        {/* Story Progress Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span>Progreso del Cuento:</span>
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${globalProgressPct}%` }}
            />
          </div>
          <span className="text-emerald-400 font-bold">{globalProgressPct}%</span>
        </div>
      </div>

      {/* Main Comic Reader Stage */}
      <div className="bg-[#090d1a]/95 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col gap-5">
        {/* Chapter Title Header */}
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider font-mono">
                CAPÍTULO {currentChapter.chapterNumber}: PANEL {currentPanelIdx + 1} DE {currentChapter.panels.length}
              </span>
              {isAutoPlaying && isSpeaking && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold animate-pulse flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-400" />
                  NARRACIÓN EN VIVO
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-white mt-0.5">
              {currentChapter.title}
            </h3>
            <p className="text-xs text-slate-400">{currentChapter.subtitle}</p>
          </div>

          <button
            onClick={() => startPanelNarrationSequence(selectedChapterIdx, currentPanelIdx)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-400 text-purple-300 hover:bg-purple-900 text-xs font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)] active:scale-95 transition-all flex-shrink-0"
            title="Reiniciar narración completa de este panel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetir Audio Panel</span>
          </button>
        </div>

        {/* Visual Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Panel Artwork */}
          <div className={`relative rounded-3xl overflow-hidden border-2 shadow-[0_0_30px_rgba(126,34,206,0.3)] bg-slate-950 aspect-square max-h-[380px] mx-auto w-full transition-all ${
            activeSpeechPart === 'intro' ? 'border-purple-400 ring-2 ring-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.6)]' : 'border-purple-500/40'
          }`}>
            <img
              src={currentPanel.image}
              alt={currentPanel.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent p-4 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] uppercase font-bold text-purple-300 font-mono">Escenario:</span>
                {activeSpeechPart === 'intro' && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-200 font-mono animate-pulse">
                    Narrando escena...
                  </span>
                )}
              </div>
              <p className="font-semibold leading-relaxed">{currentPanel.caption}</p>
            </div>
          </div>

          {/* Dialogue & Educational Takeaway */}
          <div className="flex flex-col gap-4">
            {/* Dialogues with Active Speaking Indicators */}
            <div className="space-y-3">
              {currentPanel.dialogue.map((dlg, idx) => {
                const isCurrentlySpeakingThis = activeSpeechPart === idx;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex flex-col gap-2 transition-all duration-300 ${
                      dlg.isHero
                        ? isCurrentlySpeakingThis
                          ? 'bg-cyan-950/80 border-cyan-300 text-cyan-50 shadow-[0_0_25px_rgba(0,242,254,0.4)] ring-2 ring-cyan-400 scale-[1.02]'
                          : 'bg-cyan-950/40 border-cyan-400/40 text-cyan-100 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                        : isCurrentlySpeakingThis
                        ? 'bg-rose-950/80 border-rose-300 text-rose-50 shadow-[0_0_25px_rgba(244,63,94,0.4)] ring-2 ring-rose-400 scale-[1.02]'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-mono uppercase tracking-wider flex items-center gap-1.5">
                        <span>{dlg.isHero ? '🦸' : '🦹'}</span>
                        <span>{dlg.speaker}</span>
                        {isCurrentlySpeakingThis && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-bold animate-pulse">
                            Hablando...
                          </span>
                        )}
                      </span>
                      <button
                        onClick={() => handleManualSpeakDialogue(dlg.text, dlg.isHero, idx)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-95 ${
                          dlg.isHero
                            ? 'bg-cyan-900/80 text-cyan-300 hover:bg-cyan-800'
                            : 'bg-rose-900/80 text-rose-300 hover:bg-rose-800'
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Escuchar</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm italic leading-relaxed">
                      "{dlg.text}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Economic Lesson Box with Active Speaking Indicator */}
            <div className={`p-4 rounded-2xl border text-xs transition-all duration-300 ${
              activeSpeechPart === 'lesson'
                ? 'bg-amber-950/80 border-amber-300 text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.5)] ring-2 ring-amber-400 scale-[1.02]'
                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            }`}>
              <div className="font-bold flex items-center justify-between gap-1.5 mb-1 text-amber-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>LECCIÓN ECONÓMICA DE MICROCIUDAD:</span>
                  {activeSpeechPart === 'lesson' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black animate-pulse">
                      Explicando...
                    </span>
                  )}
                </div>
                <button
                  onClick={handleManualSpeakLesson}
                  className="px-2 py-0.5 rounded bg-amber-900/80 hover:bg-amber-800 text-amber-300 text-[10px] font-bold flex items-center gap-1 active:scale-95"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Escuchar Lección</span>
                </button>
              </div>
              <p className="leading-relaxed text-slate-200">
                {currentPanel.economicLesson}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handlePrevPanel}
            disabled={selectedChapterIdx === 0 && currentPanelIdx === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Panel Anterior</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Capítulo {currentChapter.chapterNumber} • {currentPanelIdx + 1} / {currentChapter.panels.length}
            </span>
            {isAutoPlaying && (
              <span className="text-[10px] text-emerald-400 font-mono font-bold hidden sm:inline-block">
                (Narrando y cambiando a ritmo natural)
              </span>
            )}
          </div>

          <button
            onClick={advanceToNextPanel}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all active:scale-95"
          >
            <span>Siguiente Panel</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


