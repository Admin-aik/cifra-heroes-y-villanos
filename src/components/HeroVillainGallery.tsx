import React, { useState } from 'react';
import { Volume2, Shield, Sword, Zap, Flame, Sparkles, Award, Target, AlertTriangle, CheckCircle, Play, ArrowRight } from 'lucide-react';
import { HEROES, VILLAINS } from '../data/characters';
import { HeroCharacter, VillainCharacter } from '../types';
import { soundEngine } from '../services/soundEngine';

interface HeroVillainGalleryProps {
  selectedHero?: HeroCharacter;
  selectedVillain?: VillainCharacter;
  onSelectHeroForBattle: (hero: HeroCharacter) => void;
  onSelectVillainForBattle: (villain: VillainCharacter) => void;
  onStartBattleMatchup?: (hero: HeroCharacter, villain: VillainCharacter) => void;
}

export const HeroVillainGallery: React.FC<HeroVillainGalleryProps> = ({
  selectedHero = HEROES[0],
  selectedVillain = VILLAINS[0],
  onSelectHeroForBattle,
  onSelectVillainForBattle,
  onStartBattleMatchup,
}) => {
  const [filter, setFilter] = useState<'all' | 'heroes' | 'villains'>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleSpeak = (id: string, text: string, role: 'hero' | 'villain', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingId(id);
    soundEngine.speak(text, role, () => {
      setSpeakingId(null);
    });
  };

  const handleLaunchBattle = (hero: HeroCharacter, villain: VillainCharacter) => {
    soundEngine.playUiClick();
    soundEngine.playLaserAttack();
    if (onStartBattleMatchup) {
      onStartBattleMatchup(hero, villain);
    } else {
      onSelectHeroForBattle(hero);
      onSelectVillainForBattle(villain);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 py-2">
      {/* 1. PORTADA HERO & VILLAIN CLASH BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1329] via-[#090d1a] to-[#040510] border-2 border-cyan-500/40 p-5 sm:p-8 shadow-[0_0_40px_rgba(0,242,254,0.15)]">
        {/* Glow ambient lights */}
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 text-xs font-mono font-black uppercase tracking-wider shadow-[0_0_12px_rgba(0,242,254,0.3)]">
              ⭐ PORTADA PRINCIPAL • CIFRAFLOW
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 text-xs font-mono font-bold">
              DUELO ECONÓMICO EN LA MICROCIUDAD
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-rose-400 tracking-tight">
              Galería de Héroes y Villanos
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Haz clic sobre cualquier <strong>Héroe</strong> o <strong>Villano</strong> para entrar inmediatamente a la <strong>Arena de Batalla 3D</strong>. Responde correctamente a los asertijos para fortalecerte con energía y sumar puntos, o debilítate si fallas.
            </p>
          </div>

          {/* DUAL MATCHUP SHOWCASE (HERO VS VILLAIN) */}
          <div className="w-full max-w-4xl mt-2 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            {/* Active Hero */}
            <div 
              onClick={() => {
                soundEngine.playUiClick();
                onSelectHeroForBattle(selectedHero);
              }}
              className="flex items-center gap-3 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/30 transition-all cursor-pointer group flex-1 w-full"
              title="Haz clic para entrar a batalla con este héroe"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-cyan-400 flex-shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:scale-105 transition-transform">
                <img src={selectedHero.avatar} alt={selectedHero.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  HÉROE SELECCIONADO
                </span>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-200 transition-colors">
                  {selectedHero.name}
                </h3>
                <span className="text-xs text-slate-300 line-clamp-1">
                  ⚡ {selectedHero.specialAbility}
                </span>
                <span className="text-[10px] text-cyan-300 font-semibold underline mt-0.5 block">
                  Clic para entrar a batalla →
                </span>
              </div>
            </div>

            {/* Clashing VS Emblem & Direct Start Button */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-rose-600 flex items-center justify-center font-black text-white text-base shadow-[0_0_20px_rgba(217,70,239,0.6)] animate-pulse">
                VS
              </div>
              <button
                id="btn-portada-launch-battle"
                onClick={() => handleLaunchBattle(selectedHero, selectedVillain)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.5)] active:scale-95 transition-all flex items-center gap-2"
                title="Entrar a la Arena de Batalla inmediatamente con este emparejamiento"
              >
                <Sword className="w-4 h-4" />
                <span>⚔️ ¡ENTRAR A LA BATALLA!</span>
              </button>
            </div>

            {/* Active Villain */}
            <div 
              onClick={() => {
                soundEngine.playUiClick();
                onSelectVillainForBattle(selectedVillain);
              }}
              className="flex items-center gap-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-400 hover:bg-rose-900/30 transition-all cursor-pointer group flex-1 w-full"
              title="Haz clic para entrar a batalla contra este villano"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-rose-500 flex-shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.3)] group-hover:scale-105 transition-transform">
                <img src={selectedVillain.avatar} alt={selectedVillain.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                  VILLANO OBJETIVO
                </span>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-rose-200 transition-colors">
                  {selectedVillain.name}
                </h3>
                <span className="text-xs text-rose-300 font-medium line-clamp-1">
                  ⚠️ {selectedVillain.threatLevel}
                </span>
                <span className="text-[10px] text-rose-300 font-semibold underline mt-0.5 block">
                  Clic para entrar a batalla →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER PILLS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#090d1a]/90 border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-md">
        <div>
          <span className="text-xs text-slate-400 font-mono block">CATÁLOGO COMPLETO</span>
          <span className="text-sm font-bold text-white">Selecciona tu combatiente para ir directo a la Arena</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => {
              soundEngine.playUiClick();
              setFilter('all');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({HEROES.length + VILLAINS.length})
          </button>
          <button
            onClick={() => {
              soundEngine.playUiClick();
              setFilter('heroes');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'heroes' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,242,254,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Héroes ({HEROES.length})
          </button>
          <button
            onClick={() => {
              soundEngine.playUiClick();
              setFilter('villains');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'villains' ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Villanos ({VILLAINS.length})
          </button>
        </div>
      </div>

      {/* 3. HEROES SECTION */}
      {(filter === 'all' || filter === 'heroes') && (
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 font-mono">
            <Shield className="w-4 h-4" /> GUARDIANES DEL CIFRAFLOW (HÉROES) • CLIC PARA LUCHAR
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HEROES.map((hero) => (
              <div
                key={hero.id}
                onClick={() => {
                  soundEngine.playUiClick();
                  onSelectHeroForBattle(hero);
                }}
                className="bg-[#090d1a]/95 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-3xl p-5 shadow-[0_0_25px_rgba(0,242,254,0.1)] hover:shadow-[0_0_35px_rgba(0,242,254,0.25)] transition-all flex flex-col justify-between cursor-pointer group relative"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400 flex-shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:scale-105 transition-transform">
                      <img src={hero.avatar} alt={hero.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                        {hero.codename}
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                        {hero.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{hero.description}</p>
                    </div>
                  </div>

                  {/* Philosophy & Special Ability */}
                  <div className="space-y-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs">
                      <span className="font-bold text-cyan-300 block mb-0.5 font-mono">⚡ Habilidad Especial:</span>
                      <span className="text-slate-300">{hero.specialAbility}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                      <span className="font-bold text-amber-300 block mb-0.5 font-mono">📜 Filosofía Patrimonial:</span>
                      <span className="text-slate-300 italic">"{hero.philosophy}"</span>
                    </div>
                  </div>

                  {/* Quote Box with Voice Button */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2 mb-4">
                    <p className="text-xs text-cyan-200 italic line-clamp-2">
                      "{hero.quote}"
                    </p>
                    <button
                      onClick={(e) => handleSpeak(hero.id, hero.quote, 'hero', e)}
                      className="p-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 hover:bg-cyan-900 text-xs font-bold flex-shrink-0"
                      title="Escuchar Voz en Español Latino"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playUiClick();
                    onSelectHeroForBattle(hero);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Sword className="w-4 h-4" />
                  <span>⚔️ Elegir a {hero.alias} e Ir a la Batalla</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. VILLAINS SECTION */}
      {(filter === 'all' || filter === 'villains') && (
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 font-mono">
            <Flame className="w-4 h-4" /> AMENAZAS AL PODER ADQUISITIVO (VILLANOS) • CLIC PARA ENFRENTAR
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VILLAINS.map((villain) => (
              <div
                key={villain.id}
                onClick={() => {
                  soundEngine.playUiClick();
                  onSelectVillainForBattle(villain);
                }}
                className="bg-[#090d1a]/95 border-2 border-rose-500/30 hover:border-rose-500 rounded-3xl p-5 shadow-[0_0_25px_rgba(244,63,94,0.1)] hover:shadow-[0_0_35px_rgba(244,63,94,0.25)] transition-all flex flex-col justify-between cursor-pointer group relative"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-rose-500 flex-shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.3)] group-hover:scale-105 transition-transform">
                      <img src={villain.avatar} alt={villain.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                        {villain.codename}
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-rose-300 transition-colors">
                        {villain.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{villain.description}</p>
                    </div>
                  </div>

                  {/* Threat level & Evil Plan */}
                  <div className="space-y-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs">
                      <span className="font-bold text-rose-300 block mb-0.5 font-mono">⚠️ Nivel de Peligro:</span>
                      <span className="text-rose-200 font-semibold">{villain.threatLevel}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                      <span className="font-bold text-purple-300 block mb-0.5 font-mono">🦹 Plan Macabro:</span>
                      <span className="text-slate-300">{villain.evilPlan}</span>
                    </div>
                  </div>

                  {/* Quote Box with Voice Button */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2 mb-4">
                    <p className="text-xs text-rose-200 italic line-clamp-2">
                      "{villain.quote}"
                    </p>
                    <button
                      onClick={(e) => handleSpeak(villain.id, villain.quote, 'villain', e)}
                      className="p-2 rounded-xl bg-rose-950 border border-rose-500 text-rose-300 hover:bg-rose-900 text-xs font-bold flex-shrink-0"
                      title="Escuchar Voz en Español Latino"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playUiClick();
                    onSelectVillainForBattle(villain);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  <span>🎯 Enfrentar a {villain.title} en la Batalla</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
