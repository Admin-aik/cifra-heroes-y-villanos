import React, { useState } from 'react';
import { Volume2, Play, Sparkles, Shield, Sword, X, Zap } from 'lucide-react';
import logoImg from '../assets/images/cifraflow_logo_1787580408529.jpg';
import capitanImg from '../assets/images/capitan_cifraflow_1787580423075.jpg';
import { soundEngine } from '../services/soundEngine';

interface WelcomeIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export const WelcomeIntroModal: React.FC<WelcomeIntroModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
}) => {
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  if (!isOpen) return null;

  const introSpeech = 
    "¡Bienvenido a CifraFlow! La plataforma de combate y educación financiera donde los jóvenes salvan su futuro económico. " +
    "En la Microciudad, villanos como Lord Inflación y Doctor Deuda Tóxica amenazan con devorar tus ahorros y atraparte en pasivos destructivos. " +
    "Junto al Capitán CifraFlow y Doña Tasa, dominarás el flujo de caja, adquirirás activos productivos y aprenderás a alcanzar tu independencia financiera. " +
    "¡Equipa tus armas de valor real y defiende tu patrimonio!";

  const handleNarrate = () => {
    setIsNarrating(true);
    soundEngine.speak(introSpeech, 'hero', () => {
      setIsNarrating(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#060814] border-2 border-cyan-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,242,254,0.3)] flex flex-col gap-6 overflow-hidden">
        {/* Glowing background halo */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.4)]">
              <img src={logoImg} alt="CifraFlow" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-fuchsia-400 tracking-widest font-mono">
                INTRODUCCIÓN CINEMATOGRÁFICA
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-fuchsia-400 font-mono">
                ¡BIENVENIDO A CIFRAFLOW!
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playUiClick();
              soundEngine.stopVoice();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Briefing Card */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400 flex-shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            <img src={capitanImg} alt="Capitán CifraFlow" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <p className="italic text-cyan-200 mb-2">
              "¡La economía de Microciudad está bajo asedio! Lord Inflación destruye el valor de la moneda y Doctor Deuda encadena a los creadores con pagos mínimos."
            </p>
            <p className="text-slate-400 text-xs">
              Aprende a gestionar tu Estado de Resultados, compra micro y macro activos en el simulador contable y asesta golpes deflacionarios en la Arena de Duelo 3D.
            </p>
          </div>
        </div>

        {/* Voice Narration Box */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-200 font-semibold">
              {isNarrating ? 'Narrando historia de Microciudad...' : 'Escucha la narración oficial por voz en español'}
            </span>
          </div>

          <button
            onClick={handleNarrate}
            disabled={isNarrating}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isNarrating ? 'Reproduciendo...' : 'Narrar Voz'}</span>
          </button>
        </div>

        {/* Start Game Action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              soundEngine.playUiClick();
              soundEngine.stopVoice();
              onStartGame();
            }}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(0,242,254,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>¡Entrar a la Arena Económica!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
