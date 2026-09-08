import React from 'react';
import { Volume2, VolumeX, Mic, MicOff, FileText, UserCheck, RefreshCw, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/images/cifraflow_logo_1787580408529.jpg';
import { FinancialArchetype } from '../types';
import { soundEngine } from '../services/soundEngine';

interface HeaderProps {
  currentTab: 'arena' | 'gallery' | 'simulator' | 'quiz' | 'comic';
  onSelectTab: (tab: 'arena' | 'gallery' | 'simulator' | 'quiz' | 'comic') => void;
  archetype: FinancialArchetype;
  onOpenArchetypeModal: () => void;
  onOpenFinancialSheet: () => void;
  onOpenIntroModal: () => void;
  onResetGame: () => void;
  cash: number;
  netCashflow: number;
  financialIq: number;
  isMuted: boolean;
  onToggleMute: () => void;
  isVoiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  archetype,
  onOpenArchetypeModal,
  onOpenFinancialSheet,
  onOpenIntroModal,
  onResetGame,
  cash,
  netCashflow,
  financialIq,
  isMuted,
  onToggleMute,
  isVoiceEnabled,
  onToggleVoice,
}) => {
  return (
    <header className="w-full bg-[#040510]/95 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 z-40 px-3 py-2.5 sm:px-6 shadow-[0_4px_25px_rgba(0,242,254,0.08)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Top brand row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <button
              id="btn-header-logo"
              onClick={onOpenIntroModal}
              className="relative group flex items-center gap-2.5 focus:outline-none text-left"
              title="Ver Lore e Introducción de CifraFlow"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-transform">
                <img
                  src={logoImg}
                  alt="CifraFlow Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-fuchsia-400 tracking-wider text-lg sm:text-xl font-mono">
                    CIFRAFLOW
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                    EDICIÓN HÉROES & VILLANOS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                  Simulación Financiera & Duelo Contable 3D en la Microciudad
                </p>
              </div>
            </button>
          </div>

          {/* Quick HUD Metrics & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Student Archetype button */}
            <button
              id="btn-switch-archetype"
              onClick={() => {
                soundEngine.playUiClick();
                onOpenArchetypeModal();
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/70 hover:border-cyan-400/60 transition-all text-left"
              title="Cambiar Arquetipo Socioeconómico"
            >
              <img
                src={archetype.avatar}
                alt={archetype.name}
                className="w-6 h-6 rounded-full object-cover border border-cyan-400/60"
              />
              <div className="hidden lg:block text-[11px]">
                <div className="text-slate-400 leading-tight">Perfil:</div>
                <div className="text-cyan-300 font-semibold leading-tight">{archetype.name}</div>
              </div>
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {/* Cash Liquidity Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono font-bold shadow-[0_0_10px_rgba(0,242,254,0.15)]">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>${cash.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              <span className="text-[10px] text-cyan-500 font-normal hidden sm:inline">Efectivo</span>
            </div>

            {/* Net Cashflow Pill */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
              netCashflow >= 0
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{netCashflow >= 0 ? `+$${netCashflow}` : `-$${Math.abs(netCashflow)}`}/mes</span>
            </div>

            {/* IQ Financiero */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>IQ: {financialIq} pts</span>
            </div>

            {/* Financial Sheet Viewer Modal Button */}
            <button
              id="btn-open-financial-sheet"
              onClick={() => {
                soundEngine.playUiClick();
                onOpenFinancialSheet();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/30 to-fuchsia-600/30 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 text-xs font-semibold shadow-[0_0_12px_rgba(0,242,254,0.2)] hover:scale-102 active:scale-98 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Estados Financieros</span>
              <span className="sm:hidden">Balance</span>
            </button>

            {/* Voice Narration Toggle */}
            <button
              id="btn-toggle-voice"
              onClick={() => {
                soundEngine.playUiClick();
                onToggleVoice();
              }}
              className={`p-2 rounded-xl border transition-all ${
                isVoiceEnabled
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={isVoiceEnabled ? 'Voz Narradora Activada' : 'Voz Narradora Desactivada'}
            >
              {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            {/* SFX Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={() => {
                soundEngine.playUiClick();
                onToggleMute();
              }}
              className={`p-2 rounded-xl border transition-all ${
                !isMuted
                  ? 'bg-fuchsia-500/20 border-fuchsia-400/50 text-fuchsia-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={!isMuted ? 'Efectos de Sonido Activados' : 'Sonido Silenciado'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Game */}
            <button
              id="btn-reset-game"
              onClick={() => {
                soundEngine.playUiClick();
                onResetGame();
              }}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 transition-all"
              title="Reiniciar Batalla y Balance"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (As seen in the screenshot) */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <button
            id="tab-gallery-btn"
            onClick={() => {
              soundEngine.playUiClick();
              onSelectTab('gallery');
            }}
            className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all border ${
              currentTab === 'gallery'
                ? 'bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-fuchsia-400">🦸</span>
            <span>PORTADA: GALERÍA DE HÉROES & VILLANOS</span>
          </button>

          <button
            id="tab-arena-btn"
            onClick={() => {
              soundEngine.playUiClick();
              onSelectTab('arena');
            }}
            className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all border ${
              currentTab === 'arena'
                ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-cyan-400">⚔️</span>
            <span>ARENA DE DUELO ECONÓMICO 3D</span>
          </button>

          <button
            id="tab-simulator-btn"
            onClick={() => {
              soundEngine.playUiClick();
              onSelectTab('simulator');
            }}
            className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all border ${
              currentTab === 'simulator'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-amber-400">📈</span>
            <span>SIMULADOR CONTABLE & ACTIVOS</span>
          </button>

          <button
            id="tab-quiz-btn"
            onClick={() => {
              soundEngine.playUiClick();
              onSelectTab('quiz');
            }}
            className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all border ${
              currentTab === 'quiz'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-emerald-400">🧩</span>
            <span>MICRO-EVALUACIONES & ASERTIJOS</span>
          </button>

          <button
            id="tab-comic-btn"
            onClick={() => {
              soundEngine.playUiClick();
              onSelectTab('comic');
            }}
            className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all border ${
              currentTab === 'comic'
                ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(126,34,206,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="text-purple-400">🎬</span>
            <span>CÓMIC ANIMADO: LORE & SUPERVIVENCIA</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
