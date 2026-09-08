import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  RotateCcw, 
  Zap, 
  Shield, 
  Sword, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Coins, 
  Hammer, 
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Swords,
  Minimize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeroCharacter, VillainCharacter, BattleCard, BattleLogEntry, FinancialRiddle, DirectStrikePostulate } from '../types';
import { HEROES, VILLAINS } from '../data/characters';
import { FINANCIAL_RIDDLES, ATTACK_RIDDLES } from '../data/riddles';
import { DIRECT_STRIKE_POSTULATES } from '../data/directStrikes';
import { DEFENSIVE_SHIELD_POSTULATES } from '../data/defensiveShields';
import { soundEngine } from '../services/soundEngine';

interface BattleArenaProps {
  hero: HeroCharacter;
  villain: VillainCharacter;
  onSelectHero: (hero: HeroCharacter) => void;
  onSelectVillain: (villain: VillainCharacter) => void;
  onRewardCash: (amount: number) => void;
  onIncrementIq: (points: number) => void;
  netCashflow: number;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  hero,
  villain,
  onSelectHero,
  onSelectVillain,
  onRewardCash,
  onIncrementIq,
  netCashflow,
}) => {
  // Combat dynamic states
  const [heroHp, setHeroHp] = useState<number>(hero.maxHp);
  const [villainHp, setVillainHp] = useState<number>(villain.maxHp);
  const [heroShield, setHeroShield] = useState<number>(0);
  const [energyCF, setEnergyCF] = useState<number>(70);
  const [activeTab, setActiveTab] = useState<'attacks' | 'shields' | 'powers' | 'riddle'>('attacks');
  const [turnState, setTurnState] = useState<'player' | 'villain' | 'animating' | 'gameover'>('player');
  const [bannerMessage, setBannerMessage] = useState<string>('⚡ ¡PREPÁRATE PARA LA BATALLA! ⚡');
  const [floatingEffects, setFloatingEffects] = useState<{ id: string; target: 'hero' | 'villain'; text: string; color: string }[]>([]);
  const [attackRiddleIndex, setAttackRiddleIndex] = useState<number>(0);
  const [currentRiddle, setCurrentRiddle] = useState<FinancialRiddle>(ATTACK_RIDDLES[0] || FINANCIAL_RIDDLES[0]);
  const [riddleSelectedOption, setRiddleSelectedOption] = useState<string | null>(null);
  const [riddleResult, setRiddleResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<string>(hero.quote);
  const [isVillainShaking, setIsVillainShaking] = useState<boolean>(false);
  const [isHeroShaking, setIsHeroShaking] = useState<boolean>(false);

  // Dynamic Direct Strike Postulates State (32+ rich financial postulates)
  const [postulateIndex, setPostulateIndex] = useState<number>(0);
  const activePostulate = DIRECT_STRIKE_POSTULATES[postulateIndex % DIRECT_STRIKE_POSTULATES.length];

  // Dynamic Defensive Shield Postulates State (25+ rich defensive postulates)
  const [shieldPostulateIndex, setShieldPostulateIndex] = useState<number>(0);
  const activeShieldPostulate = DEFENSIVE_SHIELD_POSTULATES[shieldPostulateIndex % DEFENSIVE_SHIELD_POSTULATES.length];

  // Dynamic Anti-Devaluation Trivia Postulates State (22+ rich anti-devaluation postulates)
  const [devaluationPostulateIndex, setDevaluationPostulateIndex] = useState<number>(0);

  // Dynamic villain minimization calculation:
  // With each attack and loss of health, the villain shrinks progressively from 1.0 (100% full scale) down to 0.35 (35% miniature size)
  const villainHpRatio = Math.max(0, villainHp / (villain.maxHp || 100));
  const villainScale = Math.max(0.35, 0.35 + 0.65 * villainHpRatio);
  const villainMinimizationPct = Math.round((1 - villainScale) * 100);

  const handleRotatePostulate = () => {
    soundEngine.playUiClick();
    setPostulateIndex(prev => (prev + 1) % DIRECT_STRIKE_POSTULATES.length);
  };

  const handleRotateShieldPostulate = () => {
    soundEngine.playUiClick();
    setShieldPostulateIndex(prev => (prev + 1) % DEFENSIVE_SHIELD_POSTULATES.length);
  };

  // Battle Logs
  const [battleLogs, setBattleLogs] = useState<BattleLogEntry[]>([
    {
      id: 'log-1',
      turn: 1,
      sender: 'system',
      message: '¡La arena de combate financiero está lista! Elige tu héroe, asesta golpes, activa escudos o resuelve asertijos críticos.',
      type: 'info',
      timestamp: 'Ahora'
    },
    {
      id: 'log-2',
      turn: 1,
      sender: 'economic',
      message: '¡Cada respuesta afirmativa y correcta en los asertijos ejecutará un ataque pedagógico devastador!',
      type: 'info',
      timestamp: 'Ahora'
    }
  ]);

  // Reset HP when hero/villain switch
  useEffect(() => {
    setHeroHp(hero.maxHp);
    setHeroShield(0);
    setEnergyCF(70);
    setCurrentQuote(hero.quote);
    addBattleLog('system', `🔄 Avatar de Héroe cambiado a [${hero.name}] (${hero.codename}). Habilidad activa: ${hero.specialAbility}`, 'info');
  }, [hero]);

  useEffect(() => {
    setVillainHp(villain.maxHp);
    addBattleLog('system', `🦹 Contrincante seleccionado: [${villain.name}] (${villain.threatLevel})`, 'info');
  }, [villain]);

  const addBattleLog = (
    sender: 'hero' | 'villain' | 'system' | 'economic',
    message: string,
    type: 'attack' | 'defense' | 'power' | 'critical' | 'info'
  ) => {
    const newEntry: BattleLogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      turn: 1,
      sender,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setBattleLogs(prev => [newEntry, ...prev.slice(0, 20)]);
  };

  const triggerFloatingEffect = (target: 'hero' | 'villain', text: string, color: string) => {
    const effectId = `effect-${Date.now()}-${Math.random()}`;
    setFloatingEffects(prev => [...prev, { id: effectId, target, text, color }]);
    setTimeout(() => {
      setFloatingEffects(prev => prev.filter(e => e.id !== effectId));
    }, 1300);
  };

  const handleSpeakQuote = (quoteText: string, role: 'hero' | 'villain', onComplete?: () => void) => {
    setIsSpeaking(true);
    soundEngine.speak(quoteText, role, () => {
      setIsSpeaking(false);
      if (onComplete) onComplete();
    });
  };

  // 1. Direct Physical Strike with Dynamic Rotating Postulate
  const handleQuickStrike = () => {
    if (turnState !== 'player') return;
    const cost = activePostulate.costCF;
    if (energyCF < cost) {
      soundEngine.playQuizError();
      setBannerMessage(`⚠️ ¡ENERGÍA INSUFICIENTE PARA ${activePostulate.name.toUpperCase()} (${cost} CF)!`);
      setTimeout(() => setBannerMessage('⚡ ¡TU TURNO! ELIGE TU ACCIÓN ⚡'), 1500);
      return;
    }

    setTurnState('animating');
    setEnergyCF(prev => Math.max(0, prev - cost + (activePostulate.bonusCF || 0)));
    soundEngine.playLaserAttack();

    // Trigger visual hit
    setIsVillainShaking(true);
    setTimeout(() => setIsVillainShaking(false), 600);

    const dmg = activePostulate.damage;
    const newVillainHp = Math.max(0, villainHp - dmg);
    setVillainHp(newVillainHp);

    // Apply shield if postulate grants defensive shield (at least 20+ DEF)
    if (activePostulate.shield) {
      setHeroShield(prev => prev + activePostulate.shield!);
      triggerFloatingEffect('hero', `+${activePostulate.shield} DEF (${activePostulate.tag})`, 'text-cyan-300');
    }

    // Apply heal if postulate grants it (at least 20+ HP)
    if (activePostulate.healHp) {
      setHeroHp(prev => Math.min(hero.maxHp, prev + activePostulate.healHp!));
      triggerFloatingEffect('hero', `+${activePostulate.healHp} HP (${activePostulate.tag})`, 'text-emerald-400');
    }

    if (activePostulate.bonusCF) {
      triggerFloatingEffect('hero', `+${activePostulate.bonusCF} CF`, 'text-yellow-300');
    }

    const remainingMinimization = Math.round((1 - Math.max(0.35, 0.35 + 0.65 * (newVillainHp / (villain.maxHp || 100)))) * 100);
    triggerFloatingEffect('villain', `-${dmg} ${activePostulate.name} • 🔽 -${remainingMinimization}% TAMAÑO`, 'text-amber-300');
    setBannerMessage(`💥 ¡${activePostulate.name.toUpperCase()}: -${dmg} DMG ${activePostulate.shield ? `• +${activePostulate.shield} DEF` : ''} (VILLANO MINIMIZADO)!`);
    setCurrentQuote(activePostulate.flavorText);

    addBattleLog(
      'hero',
      `${hero.name} asestó [${activePostulate.name}] infligiendo ${dmg} de daño${activePostulate.shield ? ` y reforzando +${activePostulate.shield} de Escudo DEF` : ''}${activePostulate.healHp ? ` (+${activePostulate.healHp} HP)` : ''}, minimizando a ${villain.name} al ${100 - remainingMinimization}% de tamaño. Axioma aplicado: «${activePostulate.axiom}» ${activePostulate.bonusEffect ? `[${activePostulate.bonusEffect}]` : ''}`,
      'attack'
    );

    // Reward IQ points and cash for executing attack
    onIncrementIq(10);
    onRewardCash(35);

    // Automatically rotate to the next diverse postulate for the next turn
    setPostulateIndex(prev => (prev + 1) % DIRECT_STRIKE_POSTULATES.length);

    if (newVillainHp <= 0) {
      handleSpeakQuote(activePostulate.flavorText, 'hero', () => {
        handleVictory();
      });
      return;
    }

    // Play hero voice cleanly first, and ONLY once it finishes (or after a safety delay), transition to villain turn
    let turnTriggered = false;
    const triggerVillainTurnSafely = () => {
      if (!turnTriggered) {
        turnTriggered = true;
        setTimeout(() => {
          executeVillainTurn();
        }, 500);
      }
    };

    handleSpeakQuote(activePostulate.flavorText, 'hero', () => {
      triggerVillainTurnSafely();
    });

    // Fallback timer ensures battle does not stall if voice synthesis is disabled or muted
    setTimeout(() => {
      triggerVillainTurnSafely();
    }, 2800);
  };

  // 2. Direct Quick Shield / Dynamic Defensive Postulate Button
  const handleQuickShield = () => {
    if (turnState !== 'player') return;
    const cost = activeShieldPostulate.costCF;
    if (energyCF < cost) {
      soundEngine.playQuizError();
      setBannerMessage(`⚠️ ¡ENERGÍA INSUFICIENTE PARA ${activeShieldPostulate.name.toUpperCase()} (${cost} CF)!`);
      setTimeout(() => setBannerMessage('⚡ ¡TU TURNO! ELIGE TU ACCIÓN ⚡'), 1500);
      return;
    }

    setTurnState('animating');
    setEnergyCF(prev => prev - cost);
    soundEngine.playShieldDeploy();

    const shieldAmount = activeShieldPostulate.shield;
    const healAmount = activeShieldPostulate.healHp;
    setHeroShield(prev => prev + shieldAmount);
    setHeroHp(prev => Math.min(hero.maxHp, prev + healAmount));

    triggerFloatingEffect('hero', `+${shieldAmount} BLINDAJE & +${healAmount} HP`, 'text-cyan-300');
    setBannerMessage(`🛡️ ¡ESCUDO #${(shieldPostulateIndex % DEFENSIVE_SHIELD_POSTULATES.length) + 1}: ${activeShieldPostulate.name.toUpperCase()} (+${shieldAmount} DEF | +${healAmount} HP)!`);
    addBattleLog(
      'hero',
      `${hero.name} desplegó [${activeShieldPostulate.name}] (+${shieldAmount} DEF, +${healAmount} HP). Axioma: «${activeShieldPostulate.axiom}» ${activeShieldPostulate.bonusEffect ? `[${activeShieldPostulate.bonusEffect}]` : ''}`,
      'defense'
    );

    setCurrentQuote(activeShieldPostulate.flavorText);

    // Automatically rotate to the next diverse defensive postulate for the next click
    setShieldPostulateIndex(prev => (prev + 1) % DEFENSIVE_SHIELD_POSTULATES.length);

    let turnTriggered = false;
    const triggerVillainTurnSafely = () => {
      if (!turnTriggered) {
        turnTriggered = true;
        setTimeout(() => {
          executeVillainTurn();
        }, 500);
      }
    };

    handleSpeakQuote(activeShieldPostulate.flavorText, 'hero', () => {
      triggerVillainTurnSafely();
    });

    setTimeout(() => {
      triggerVillainTurnSafely();
    }, 2800);
  };

  // 3. Recharge Energy / Flow Concentration Button
  const handleRechargeEnergy = () => {
    if (turnState !== 'player') return;
    soundEngine.playCashRegister();
    const gain = 35;
    setEnergyCF(prev => Math.min(100, prev + gain));
    triggerFloatingEffect('hero', `+${gain} CF ENERGÍA`, 'text-yellow-300');
    setBannerMessage(`🔋 ¡FLUJO DE ENERGÍA RECARGADO (+${gain} CF)!`);
    addBattleLog('hero', `${hero.name} concentró su flujo de caja operativo recuperando +${gain} de Energía de Trueque.`, 'power');
  };

  // 4. Strategic Card execution logic
  const handlePlayCard = (card: BattleCard) => {
    if (turnState !== 'player') return;
    if (energyCF < card.costCF) {
      soundEngine.playQuizError();
      setBannerMessage('⚠️ ¡ENERGÍA DE TRUEQUE INSUFICIENTE!');
      setTimeout(() => setBannerMessage('⚡ ¡TU TURNO! ELIGE TU ACCIÓN ⚡'), 1500);
      return;
    }

    setTurnState('animating');
    setEnergyCF(prev => Math.max(0, prev - card.costCF));
    setCurrentQuote(card.flavorText);

    if (card.category === 'attack' && card.damage) {
      soundEngine.playLaserAttack();
      setIsVillainShaking(true);
      setTimeout(() => setIsVillainShaking(false), 600);

      const dmg = card.damage;
      const newVillainHp = Math.max(0, villainHp - dmg);
      setVillainHp(newVillainHp);
      const remainingMinimization = Math.round((1 - Math.max(0.35, 0.35 + 0.65 * (newVillainHp / (villain.maxHp || 100)))) * 100);
      triggerFloatingEffect('villain', `-${dmg} DMG • 🔽 -${remainingMinimization}% TAMAÑO`, 'text-rose-400');
      addBattleLog('hero', `${hero.name} desató [${card.name}] causando ${dmg} de daño y minimizando a ${villain.name} al ${100 - remainingMinimization}% de tamaño. Concepto: ${card.economicConcept}`, 'attack');
      setBannerMessage(`💥 ¡IMPACTO ECONÓMICO: -${dmg} HP (MINIMIZADO)!`);
      onIncrementIq(12);
      onRewardCash(30);

      if (newVillainHp <= 0) {
        handleSpeakQuote(card.flavorText, 'hero', () => {
          handleVictory();
        });
        return;
      }
    } else if (card.category === 'shield' && card.shield) {
      soundEngine.playShieldDeploy();
      setHeroShield(prev => prev + card.shield!);
      if (card.healHp) {
        setHeroHp(prev => Math.min(hero.maxHp, prev + card.healHp!));
        triggerFloatingEffect('hero', `+${card.healHp} HP`, 'text-emerald-400');
      }
      triggerFloatingEffect('hero', `+${card.shield} ESCUDO`, 'text-cyan-400');
      addBattleLog('hero', `${hero.name} activó [${card.name}] otorgando +${card.shield} de blindaje.`, 'defense');
      setBannerMessage(`🛡️ ¡ESCUDO ACTIVADO (+${card.shield})!`);
    } else if (card.category === 'power') {
      soundEngine.playCriticalHit();
      if (card.damage) {
        setIsVillainShaking(true);
        setTimeout(() => setIsVillainShaking(false), 800);
        const dmg = card.damage;
        const newVillainHp = Math.max(0, villainHp - dmg);
        setVillainHp(newVillainHp);
        const remainingMinimization = Math.round((1 - Math.max(0.35, 0.35 + 0.65 * (newVillainHp / (villain.maxHp || 100)))) * 100);
        triggerFloatingEffect('villain', `-${dmg} CRÍTICO • 🔽 -${remainingMinimization}% TAMAÑO`, 'text-amber-400');
      }
      if (card.healHp) {
        setHeroHp(prev => Math.min(hero.maxHp, prev + card.healHp!));
        triggerFloatingEffect('hero', `+${card.healHp} HP`, 'text-emerald-400');
      }
      if (card.cashReward) {
        onRewardCash(card.cashReward);
        soundEngine.playCashRegister();
        triggerFloatingEffect('hero', `+$${card.cashReward}`, 'text-amber-300');
      }
      addBattleLog('hero', `⚡ ¡SUPERPODER! ${hero.name} ejecutó [${card.name}]. Concepto: ${card.economicConcept}`, 'power');
      setBannerMessage('🔥 ¡SUPERPODER ECONÓMICO DESATADO!');

      if (card.damage && villainHp - card.damage <= 0) {
        handleSpeakQuote(card.flavorText, 'hero', () => {
          handleVictory();
        });
        return;
      }
    }

    // Speak hero action and cleanly trigger villain turn only after speech ends
    let turnTriggered = false;
    const triggerVillainTurnSafely = () => {
      if (!turnTriggered) {
        turnTriggered = true;
        setTimeout(() => {
          executeVillainTurn();
        }, 500);
      }
    };

    handleSpeakQuote(card.flavorText, 'hero', () => {
      triggerVillainTurnSafely();
    });

    setTimeout(() => {
      triggerVillainTurnSafely();
    }, 2800);
  };

  // Villain AI Response
  const executeVillainTurn = () => {
    setTurnState('villain');
    setBannerMessage(`⚠️ TURNO DE ${villain.name.toUpperCase()} ⚠️`);

    const randomAttack = villain.attacks[Math.floor(Math.random() * villain.attacks.length)];
    setCurrentQuote(randomAttack.taunt);

    soundEngine.playCriticalHit();
    setIsHeroShaking(true);
    setTimeout(() => setIsHeroShaking(false), 600);

    const rawDamage = randomAttack.damage;
    let finalDamage = rawDamage;
    let remainingShield = heroShield;

    if (heroShield > 0) {
      if (heroShield >= rawDamage) {
        remainingShield = heroShield - rawDamage;
        finalDamage = 0;
        setHeroShield(remainingShield);
        triggerFloatingEffect('hero', `ESCUDO BLOQUEÓ TODO (-0 HP)`, 'text-cyan-300');
      } else {
        finalDamage = rawDamage - heroShield;
        remainingShield = 0;
        setHeroShield(0);
        triggerFloatingEffect('hero', `ESCUDO ABSORBIÓ ${heroShield}`, 'text-cyan-400');
      }
    }

    if (finalDamage > 0) {
      const newHeroHp = Math.max(0, heroHp - finalDamage);
      setHeroHp(newHeroHp);
      triggerFloatingEffect('hero', `-${finalDamage} HP`, 'text-rose-500');

      if (newHeroHp <= 0) {
        handleSpeakQuote(randomAttack.taunt, 'villain', () => {
          handleDefeat();
        });
        return;
      }
    }

    addBattleLog('villain', `${villain.name} atacó con [${randomAttack.name}] causando ${rawDamage} de daño inflacionario.`, 'attack');

    // Cashflow effect & energy regeneration
    const regeneratedEnergy = Math.min(100, energyCF + 25 + (netCashflow > 0 ? 10 : 0));
    setEnergyCF(regeneratedEnergy);

    // Speak villain taunt and return turn to player only after villain finishes speaking
    let turnReturned = false;
    const returnTurnToPlayer = () => {
      if (!turnReturned) {
        turnReturned = true;
        setTurnState('player');
        setBannerMessage('⚡ ¡TU TURNO! ELIGE TU ACCIÓN ⚡');
      }
    };

    handleSpeakQuote(randomAttack.taunt, 'villain', () => {
      setTimeout(() => {
        returnTurnToPlayer();
      }, 400);
    });

    // Fallback safety timer
    setTimeout(() => {
      returnTurnToPlayer();
    }, 2800);
  };

  const handleVictory = () => {
    setTurnState('gameover');
    setBannerMessage(`🏆 ¡VICTORIA! ${villain.name.toUpperCase()} HA SIDO DERROTADO 🏆`);
    soundEngine.playVictoryFanfare();
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 }
    });
    onRewardCash(350);
    onIncrementIq(30);
    addBattleLog('system', `🎉 ¡Victoria heroica! Has protegido a Microciudad de la especulación de ${villain.name}. Ganaste +$350 y +30 IQ Financiero.`, 'critical');
    handleSpeakQuote(`¡Lo logramos! Con educación financiera y disciplina de flujo de caja, la inflación y la deuda no tienen poder sobre nosotros.`, 'hero');
  };

  const handleDefeat = () => {
    setTurnState('gameover');
    setBannerMessage('💀 ¡DERROTA! EL FLUJO DE CAJA FUE DEVORADO 💀');
    soundEngine.playQuizError();
    addBattleLog('system', `💔 Tu presupuesto colapsó ante el ataque de ${villain.name}. ¡Revisa tus escudos y activos en el Simulador Contable!`, 'critical');
  };

  const handleResetBattle = () => {
    soundEngine.playUiClick();
    setHeroHp(hero.maxHp);
    setVillainHp(villain.maxHp);
    setHeroShield(0);
    setEnergyCF(70);
    setTurnState('player');
    setRiddleSelectedOption(null);
    setRiddleResult(null);
    setBannerMessage('⚡ ¡PREPÁRATE PARA LA BATALLA! ⚡');
    setCurrentQuote(hero.quote);
    setBattleLogs([
      {
        id: `log-reset-${Date.now()}`,
        turn: 1,
        sender: 'system',
        message: '¡Batalla reiniciada con éxito! Selecciona tus cartas o asesta un asertijo táctico.',
        type: 'info',
        timestamp: 'Ahora'
      }
    ]);
  };

  // 40 Attack Riddles: Changes with each click of the button and speaks aloud in Venezuelan Latin American Spanish
  const handleNextAttackRiddle = () => {
    soundEngine.playUiClick();
    soundEngine.playLaserAttack();
    setActiveTab('riddle');

    const nextIdx = (attackRiddleIndex + 1) % ATTACK_RIDDLES.length;
    setAttackRiddleIndex(nextIdx);

    const nextRiddle = ATTACK_RIDDLES[nextIdx];
    setCurrentRiddle(nextRiddle);
    setRiddleSelectedOption(null);
    setRiddleResult(null);

    setBannerMessage(`⚡ ¡ASERTIJO DE ATAQUE #${nextIdx + 1} DE ${ATTACK_RIDDLES.length}! (-60 DMG)`);

    // Voice in Venezuelan Latin American Spanish - speaks out loud with each click
    const textToSpeak = `${nextRiddle.title}. ${nextRiddle.question}`;
    setCurrentQuote(textToSpeak);
    handleSpeakQuote(textToSpeak, 'hero');
  };

  // Solve tactical riddle inside battle: ATTACK THE OPPONENT ON CORRECT ANSWER!
  const handleAttackDevaluationTrivia = () => {
    handleNextAttackRiddle();
  };

  const handleAnswerRiddle = (optionId: string) => {
    if (riddleSelectedOption !== null) return;
    setRiddleSelectedOption(optionId);
    const selectedOpt = currentRiddle.options.find(o => o.id === optionId);
    if (!selectedOpt) return;

    const isDevalQuestion = currentRiddle.category === 'devaluacion' || currentRiddle.category === 'inflacion' || currentRiddle.id.includes('devaluacion');
    const isAttackRiddle = currentRiddle.id.startsWith('attack_riddle') || currentRiddle.title.includes('Asertijo de Ataque');
    const criticalDmg = isDevalQuestion ? 65 : isAttackRiddle ? 60 : 55;
    const cashReward = isDevalQuestion ? 160 : isAttackRiddle ? 150 : 120;
    const cfReward = isDevalQuestion ? 50 : 45;

    if (selectedOpt.isCorrect) {
      soundEngine.playQuizSuccess();
      soundEngine.playLaserAttack();
      soundEngine.playCriticalHit();

      // Speak feedback in Venezuelan Latin American Spanish voice
      const victorySpeech = `¡Impacto certero! ${selectedOpt.explanation}`;
      handleSpeakQuote(victorySpeech, 'hero');

      // Shake villain heavily
      setIsVillainShaking(true);
      setTimeout(() => setIsVillainShaking(false), 900);

      setRiddleResult({ isCorrect: true, explanation: selectedOpt.explanation });
      
      // FORTALECER AL HÉROE Y SUMAR PUNTOS
      const iqBonus = (currentRiddle.points || 15) + (isDevalQuestion ? 15 : 10);
      onIncrementIq(iqBonus);
      onRewardCash(cashReward);
      
      // Fortalecer la barra de energía CF (+50 CF)
      setEnergyCF(prev => Math.min(100, prev + cfReward));
      
      // Fortalecer escudo y salud del héroe (+25 DEF, +25 HP)
      setHeroShield(prev => Math.min(100, prev + 25));
      setHeroHp(prev => Math.min(hero.maxHp, prev + 25));

      const newVillainHp = Math.max(0, villainHp - criticalDmg);
      setVillainHp(newVillainHp);

      const remainingMinimization = Math.round((1 - Math.max(0.35, 0.35 + 0.65 * (newVillainHp / (villain.maxHp || 100)))) * 100);
      triggerFloatingEffect('hero', `⚡ ¡FORTALECIDO! +${cfReward} CF • +25 DEF • +25 HP • +${iqBonus} IQ`, 'text-emerald-400');
      triggerFloatingEffect('villain', `-${criticalDmg} ${isDevalQuestion ? '💥 ¡QUIEBRA DE DEVALUACIÓN!' : '⚔️ ¡GOLPE DE ASERTIJO!'} • 🔽 -${remainingMinimization}% TAMAÑO`, 'text-amber-300');
      setBannerMessage(isDevalQuestion 
        ? `🔥 ¡DEVALUACIÓN ANIQUILADA (-${criticalDmg} HP)! HÉROE FORTALECIDO (+${cfReward} CF, +PUNTOS IQ)` 
        : `🧠 ¡GOLPE CERTERO (-${criticalDmg} HP)! HÉROE FORTALECIDO (+${cfReward} CF, +${iqBonus} IQ)`
      );
      
      addBattleLog(
        'hero',
        `💥 ¡Respuesta Afirmativa y Correcta! ${hero.name} aplicó [${currentRiddle.title}] asestando un Golpe Crítico de -${criticalDmg} DMG a ${villain.name} y minimizando su tamaño al ${100 - remainingMinimization}%. ¡${hero.name} SE FORTALECIÓ (+${cfReward} CF a la barra de energía, +25 DEF, +25 HP) y sumó +${iqBonus} PUNTOS de IQ y +$${cashReward}!`,
        'critical'
      );

      if (newVillainHp <= 0) {
        handleVictory();
      } else {
        // Villain retaliates after educational strike
        setTimeout(() => {
          executeVillainTurn();
        }, 2200);
      }
    } else {
      soundEngine.playQuizError();
      const errorSpeech = `¡Respuesta errada! ${selectedOpt.explanation}`;
      handleSpeakQuote(errorSpeech, 'villain');

      // DEBILITAR AL HÉROE, DEBILITAR LA BARRA DE ENERGÍA Y RESTAR PUNTOS
      setIsHeroShaking(true);
      setTimeout(() => setIsHeroShaking(false), 900);

      // Debilitar barra de energía en -35 CF
      const energyDrain = 35;
      setEnergyCF(prev => Math.max(0, prev - energyDrain));

      // Restar puntos de IQ
      const iqPenalty = -15;
      onIncrementIq(iqPenalty);

      // Debilitar salud (-25 HP) y escudo (-20 DEF)
      setHeroShield(prev => Math.max(0, prev - 20));
      setHeroHp(prev => Math.max(1, prev - 25));

      triggerFloatingEffect('hero', `💔 ¡DEBILITADO! -${energyDrain} ENERGÍA CF • ${iqPenalty} PUNTOS IQ • -25 HP`, 'text-rose-400');
      setBannerMessage(`⚠️ ¡RESPUESTA ERRADA! BARRA DE ENERGÍA DEBILITADA (-${energyDrain} CF) Y ${iqPenalty} PUNTOS IQ RESTADOS`);

      setRiddleResult({ isCorrect: false, explanation: selectedOpt.explanation });
      addBattleLog(
        'villain',
        `❌ Respuesta errada en el postulado [${currentRiddle.title}]. ${hero.name} SE DEBILITÓ perdiendo -${energyDrain} CF en su barra de energía, sufriendo penalización de ${iqPenalty} PUNTOS de IQ y perdiendo -25 HP. ${villain.name} aprovecha tu confusión económica para atacar.`,
        'defense'
      );
      
      setTimeout(() => {
        executeVillainTurn();
      }, 2200);
    }
  };

  const handleNextRiddle = () => {
    handleNextAttackRiddle();
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'Sword': return <Sword className="w-5 h-5 text-fuchsia-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-cyan-300" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Coins': return <Coins className="w-5 h-5 text-yellow-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-300" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-orange-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 py-2">
      {/* 1. TOP CHARACTER & AVATAR SELECTOR BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* HERO SELECTOR / AVATARS CAROUSEL */}
        <div className="bg-[#090d1a]/95 border border-cyan-500/40 rounded-2xl p-3 flex flex-col gap-2 shadow-[0_0_25px_rgba(0,242,254,0.15)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] uppercase font-black text-cyan-300 tracking-wider">
                SELECCIONA TU HÉROE / AVATAR
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {HEROES.length} Avatares Disponibles
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {HEROES.map(h => {
              const isSelected = hero.id === h.id;
              return (
                <button
                  key={h.id}
                  id={`btn-select-hero-${h.id}`}
                  onClick={() => {
                    soundEngine.playUiClick();
                    onSelectHero(h);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-cyan-950 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.5)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/60 flex-shrink-0">
                    <img src={h.avatar} alt={h.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <div className={`text-xs font-extrabold whitespace-nowrap ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {h.alias}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono leading-none">
                      {h.maxHp} HP • {h.maxEnergy} CF
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* VILLAIN SELECTOR / AVATARS CAROUSEL */}
        <div className="bg-[#090d1a]/95 border border-rose-500/40 rounded-2xl p-3 flex flex-col gap-2 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-rose-400" />
              <span className="text-[11px] uppercase font-black text-rose-300 tracking-wider">
                SELECCIONA EL VILLANO A DERROTAR
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {VILLAINS.length} Villanos de Inflación y Deuda
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {VILLAINS.map(v => {
              const isSelected = villain.id === v.id;
              return (
                <button
                  key={v.id}
                  id={`btn-select-villain-${v.id}`}
                  onClick={() => {
                    soundEngine.playUiClick();
                    onSelectVillain(v);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-rose-950 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)] ring-1 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-rose-400/60 flex-shrink-0">
                    <img src={v.avatar} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <div className={`text-xs font-extrabold whitespace-nowrap ${isSelected ? 'text-rose-300' : 'text-slate-300'}`}>
                      {v.title}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono leading-none">
                      {v.maxHp} HP • {v.threatLevel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN BATTLE STAGE & HEALTH BARS */}
      <div className="relative bg-[#060814]/95 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Battle Status Bar */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold font-mono">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="text-base">💙</span>
              <span>{hero.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-400/40 text-xs text-cyan-300">
                {heroHp} / {hero.maxHp} HP
              </span>
              {heroShield > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 text-[10px] animate-pulse">
                  +{heroShield} Blindaje
                </span>
              )}
            </div>

            {/* Centered Banner Badge */}
            <div className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-900/60 via-slate-900 to-rose-900/60 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.4)] text-cyan-200 text-xs sm:text-sm font-black tracking-widest uppercase animate-pulse">
              {bannerMessage}
            </div>

            <div className="flex items-center gap-2 text-rose-300">
              <span className="px-2 py-0.5 rounded-md bg-rose-950 border border-rose-400/40 text-xs text-rose-300">
                {villainHp} / {villain.maxHp} HP
              </span>
              <span>{villain.name}</span>
              <span className="text-base">🦹</span>
            </div>
          </div>

          {/* Unified Gradient Duel Bar */}
          <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700 flex">
            {/* Hero Health */}
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-l-full transition-all duration-500 shadow-[0_0_12px_rgba(0,242,254,0.8)]"
              style={{ width: `${(heroHp / hero.maxHp) * 50}%` }}
            />
            <div className="w-1 bg-slate-950" />
            {/* Villain Health */}
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-rose-600 rounded-r-full transition-all duration-500 ml-auto shadow-[0_0_12px_rgba(244,63,94,0.8)]"
              style={{ width: `${(villainHp / villain.maxHp) * 50}%` }}
            />
          </div>

          {/* Subtrackers (Trade Energy CF vs Inflation Rate) */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 font-semibold px-1">
            <div className="flex items-center gap-1 text-cyan-400">
              <Zap className="w-3.5 h-3.5" />
              <span>ENERGÍA DE TRUEQUE: {energyCF} / 100 CF</span>
            </div>
            <div className="text-rose-400">
              <span>PODER INFLACIONARIO: {Math.round((villainHp / villain.maxHp) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* 3D Character Cards Arena Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 py-3 relative">
          {/* HERO 3D VIEWPORT (LEFT) */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative group">
              <motion.div
                animate={
                  isHeroShaking
                    ? { x: [-12, 12, -8, 8, 0], y: [0, -6, 0] }
                    : { y: [0, -6, 0], boxShadow: ['0 0 25px rgba(0,242,254,0.3)', '0 0 35px rgba(0,242,254,0.6)', '0 0 25px rgba(0,242,254,0.3)'] }
                }
                transition={{ duration: isHeroShaking ? 0.4 : 4, repeat: isHeroShaking ? 0 : Infinity, ease: 'easeInOut' }}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-cyan-400 relative bg-slate-950"
              >
                <img
                  src={hero.avatar}
                  alt={hero.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Damage/Heal Text Overlay */}
                <AnimatePresence>
                  {floatingEffects.filter(e => e.target === 'hero').map(effect => (
                    <motion.div
                      key={effect.id}
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -50, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className={`absolute inset-0 flex items-center justify-center text-center px-2 font-black text-xl sm:text-2xl font-mono ${effect.color} drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}
                    >
                      {effect.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Hero HUD Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-2 text-center">
                  <span className="text-[11px] text-cyan-300 font-bold font-mono">
                    HP: {heroHp}/{hero.maxHp}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Codename Pill Badge */}
            <div className="px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)] text-center">
              {hero.codename}
            </div>
          </div>

          {/* CENTER VS & TURN CONTROLLER */}
          <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-rose-500 p-1 shadow-[0_0_30px_rgba(217,70,239,0.5)] flex items-center justify-center"
            >
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-white font-black text-xl sm:text-2xl font-mono tracking-widest">
                VS
              </div>
            </motion.div>

            {/* Turn indicator badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-bold text-slate-300">
              <span className={`w-2.5 h-2.5 rounded-full ${
                turnState === 'player' ? 'bg-emerald-400 animate-ping' : 'bg-rose-500 animate-ping'
              }`} />
              <span className="uppercase tracking-wider font-mono">
                {turnState === 'player' ? '● TU TURNO' : turnState === 'villain' ? '● TURNO VILLANO' : '● ACCIÓN EN CURSO'}
              </span>
            </div>

            {/* Net Cashflow Boost hint */}
            <div className="text-[11px] text-center text-slate-400 font-mono">
              Flujo Pasivo: <span className="text-cyan-300 font-bold">+${netCashflow}/mes</span>
              <br />
              <span className="text-[10px] text-slate-500">(Regenera energía en cada turno)</span>
            </div>
          </div>

          {/* VILLAIN 3D VIEWPORT (RIGHT) - DYNAMICALLY MINIMIZED ON EACH ATTACK */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative group flex flex-col items-center justify-center min-h-[230px] sm:min-h-[260px]">
              <motion.div
                animate={
                  isVillainShaking
                    ? { 
                        x: [-14, 14, -10, 10, 0], 
                        y: [0, -8, 0],
                        scale: [villainScale * 0.65, villainScale * 0.82, villainScale],
                        rotate: [-6, 6, -3, 3, 0],
                        filter: ['brightness(1.8) contrast(1.3)', 'brightness(1.3)', 'brightness(1)'],
                      }
                    : { 
                        y: [0, -6, 0], 
                        scale: villainScale,
                        boxShadow: [
                          '0 0 25px rgba(244,63,94,0.3)', 
                          '0 0 35px rgba(244,63,94,0.6)', 
                          '0 0 25px rgba(244,63,94,0.3)'
                        ] 
                      }
                }
                transition={{ 
                  duration: isVillainShaking ? 0.45 : 4, 
                  repeat: isVillainShaking ? 0 : Infinity, 
                  ease: 'easeInOut',
                  scale: { duration: 0.4, ease: 'easeOut' }
                }}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-rose-500 relative bg-slate-950 origin-center transition-all"
              >
                <img
                  src={villain.avatar}
                  alt={villain.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Damage Text */}
                <AnimatePresence>
                  {floatingEffects.filter(e => e.target === 'villain').map(effect => (
                    <motion.div
                      key={effect.id}
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -50, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className={`absolute inset-0 flex items-center justify-center text-center px-2 font-black text-xl sm:text-2xl font-mono ${effect.color} drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}
                    >
                      {effect.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Villain HUD Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-2 text-center">
                  <span className="text-[11px] text-rose-300 font-bold font-mono">
                    HP: {villainHp}/{villain.maxHp}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Codename & Real-Time Minimization Pill Badges */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="px-4 py-1 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)] text-center">
                {villain.codename}
              </div>

              {/* Minimization Level Badge */}
              <div className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                villainScale < 0.95
                  ? 'bg-amber-950/90 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse'
                  : 'bg-slate-900/80 border-slate-700 text-slate-400'
              }`}>
                <Minimize2 className="w-3 h-3 text-amber-400" />
                <span>
                  {villainScale < 0.99
                    ? `🔽 MINIMIZADO: -${villainMinimizationPct}% (${Math.round(villainScale * 100)}% Tamaño)`
                    : '⚡ TAMAÑO COMPLETO (100%)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DYNAMIC FINANCIAL POSTULATE SHOWCASE HUD */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-amber-950 border border-amber-400/50 text-[10px] uppercase font-black tracking-wider text-amber-300">
                {activePostulate.tag}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Postulado #{(postulateIndex % DIRECT_STRIKE_POSTULATES.length) + 1} de {DIRECT_STRIKE_POSTULATES.length}
              </span>
              {activePostulate.bonusEffect && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-400/50 text-[10px] font-bold text-emerald-300 animate-pulse">
                  ✨ {activePostulate.bonusEffect}
                </span>
              )}
            </div>
            <div className="text-sm sm:text-base font-extrabold text-amber-100 flex items-center gap-1.5 flex-wrap">
              <span>{activePostulate.name}</span>
              <span className="text-xs font-mono font-bold text-rose-400">(-{activePostulate.damage} DMG)</span>
              {activePostulate.shield && (
                <span className="text-xs font-mono font-bold text-cyan-300">(+{activePostulate.shield} DEF)</span>
              )}
              {activePostulate.healHp && (
                <span className="text-xs font-mono font-bold text-emerald-300">(+{activePostulate.healHp} HP)</span>
              )}
              <span className="text-xs font-mono font-bold text-yellow-300">({activePostulate.costCF} CF)</span>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-snug mt-0.5">
              {activePostulate.axiom}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
            <button
              id="btn-rotate-postulate"
              onClick={handleRotatePostulate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/60 text-amber-300 hover:bg-amber-500/20 active:scale-95 text-xs font-bold whitespace-nowrap transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              title="Rotar al siguiente postulado de ataque financiero (32+ disponibles)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>🔄 Ataque #{(postulateIndex % DIRECT_STRIKE_POSTULATES.length) + 1}</span>
            </button>
            <button
              id="btn-rotate-shield-postulate"
              onClick={handleRotateShieldPostulate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-500/20 active:scale-95 text-xs font-bold whitespace-nowrap transition-all shadow-[0_0_10px_rgba(0,242,254,0.2)]"
              title="Rotar al siguiente postulado de escudo defensivo (25+ disponibles)"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>🛡️ Escudo #{(shieldPostulateIndex % DEFENSIVE_SHIELD_POSTULATES.length) + 1}</span>
            </button>
          </div>
        </div>

        {/* 4. QUICK COMBAT ACTION BAR: 40 ATTACK RIDDLES (ROTATES ON CLICK & SPEAKS), DIRECT PUNCH, SHIELD, AND RECHARGE */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2.5">
          {/* Main Button: 40 Asertijos de Ataque que se cambian con cada clic y se escuchan */}
          <button
            id="btn-attack-riddle-cycle"
            disabled={turnState !== 'player'}
            onClick={handleNextAttackRiddle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              turnState === 'player'
                ? activeTab === 'riddle'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 ring-2 ring-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.8)] scale-105'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white hover:from-emerald-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-1 ring-emerald-400/50'
                : 'bg-slate-800/60 border border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            title="Cambia al siguiente de los 40 Asertijos de Ataque en cada clic y se escucha narrado en voz español latino venezolano (-60 DMG)"
          >
            <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>🧠 Asertijo de Ataque #{attackRiddleIndex + 1}/40 (Clic: Cambiar y Escuchar • -60 DMG)</span>
          </button>

          {/* Quick Punch with Dynamic Rotating Postulate */}
          <button
            id="btn-quick-strike"
            disabled={turnState !== 'player' || energyCF < activePostulate.costCF}
            onClick={handleQuickStrike}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
              turnState === 'player' && energyCF >= activePostulate.costCF
                ? 'bg-gradient-to-r from-amber-600 via-rose-600 to-red-500 text-white hover:from-amber-500 hover:to-red-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 ring-1 ring-amber-300/40'
                : 'bg-slate-800/60 border border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sword className="w-4 h-4 text-amber-200" />
            <span>{activePostulate.name} (-{activePostulate.damage} DMG {activePostulate.shield ? `| +${activePostulate.shield} DEF` : ''} {activePostulate.healHp ? `| +${activePostulate.healHp} HP` : ''} | {activePostulate.costCF} CF)</span>
          </button>

          {/* Quick Shield Button with Dynamic Rotating Defensive Postulates */}
          <button
            id="btn-quick-shield"
            disabled={turnState !== 'player' || energyCF < activeShieldPostulate.costCF}
            onClick={handleQuickShield}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
              turnState === 'player' && energyCF >= activeShieldPostulate.costCF
                ? 'bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_rgba(0,242,254,0.4)] active:scale-95 ring-1 ring-cyan-300/40'
                : 'bg-slate-800/60 border border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            title={`Activa el postulado de defensa #${(shieldPostulateIndex % DEFENSIVE_SHIELD_POSTULATES.length) + 1} (${activeShieldPostulate.name}). Rotación continua en cada clic (25+ disponibles).`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-200" />
            <span>{activeShieldPostulate.name} (+{activeShieldPostulate.shield} DEF | +{activeShieldPostulate.healHp} HP | {activeShieldPostulate.costCF} CF)</span>
          </button>

          {/* Riddle Attack Quick Switcher */}
          <button
            id="btn-quick-riddle-strike"
            disabled={turnState !== 'player'}
            onClick={handleNextAttackRiddle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              activeTab === 'riddle'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.7)]'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
            }`}
            title="Cambiar al siguiente de los 40 Asertijos de Ataque y escuchar narración en voz venezolana"
          >
            <HelpCircle className="w-4 h-4" />
            <span>⚡ Siguiente Asertijo #{attackRiddleIndex + 1}/40 (-60 DMG)</span>
          </button>

          {/* Recharge Energy Button */}
          <button
            id="btn-recharge-cf"
            disabled={turnState !== 'player'}
            onClick={handleRechargeEnergy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-900 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-950/40 hover:border-yellow-400 transition-all active:scale-95 shadow-[0_0_12px_rgba(234,179,8,0.2)]"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>🔋 Recargar Energía (+35 CF)</span>
          </button>
        </div>

        {/* 4. DIALOGUE & SPEECH SYNTHESIS BOX */}
        <div className="mt-3 bg-[#090d1a]/90 border border-cyan-500/30 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
          <div className="flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <p className="text-xs sm:text-sm text-cyan-100 font-medium italic leading-relaxed">
              "{currentQuote}"
            </p>
          </div>

          <button
            id="btn-listen-voice"
            onClick={() => handleSpeakQuote(currentQuote, 'hero')}
            disabled={isSpeaking}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-300 hover:bg-cyan-900/90 text-xs font-bold shadow-[0_0_10px_rgba(0,242,254,0.3)] whitespace-nowrap active:scale-95 transition-all self-end sm:self-center"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'Narrando...' : 'Escuchar Voz'}</span>
          </button>
        </div>
      </div>

      {/* 5. ACTION DECK & BATTLE LOG SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT 2 COLS: TACTICAL DECK */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Action Tabs Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              id="deck-tab-attacks"
              onClick={() => {
                soundEngine.playUiClick();
                setActiveTab('attacks');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'attacks'
                  ? 'bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-400'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sword className="w-3.5 h-3.5" />
              <span>⚔️ Armas de Ataque ({hero.attacks.length})</span>
            </button>

            <button
              id="deck-tab-shields"
              onClick={() => {
                soundEngine.playUiClick();
                setActiveTab('shields');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'shields'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(0,242,254,0.5)] border border-cyan-400'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>🛡️ Escudos Defensivos ({hero.shields.length})</span>
            </button>

            <button
              id="deck-tab-powers"
              onClick={() => {
                soundEngine.playUiClick();
                setActiveTab('powers');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'powers'
                  ? 'bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-400'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ Poderes Especiales ({hero.superpowers.length})</span>
            </button>

            <button
              id="deck-tab-riddle"
              onClick={() => {
                if (activeTab === 'riddle') {
                  handleNextAttackRiddle();
                } else {
                  soundEngine.playUiClick();
                  setActiveTab('riddle');
                  const textToSpeak = `${currentRiddle.title}. ${currentRiddle.question}`;
                  handleSpeakQuote(textToSpeak, 'hero');
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'riddle'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>🧠 40 Asertijos de Ataque (#{attackRiddleIndex + 1}/40)</span>
            </button>
          </div>

          {/* Cards Content Container */}
          <div className="bg-[#090d1a]/95 border border-slate-800 rounded-2xl p-3 sm:p-4 min-h-[280px] flex flex-col justify-between">
            {activeTab !== 'riddle' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(activeTab === 'attacks'
                  ? hero.attacks
                  : activeTab === 'shields'
                  ? hero.shields
                  : hero.superpowers
                ).map(card => {
                  const canAfford = energyCF >= card.costCF && turnState === 'player';
                  return (
                    <motion.div
                      key={card.id}
                      whileHover={{ scale: canAfford ? 1.02 : 1 }}
                      whileTap={{ scale: canAfford ? 0.98 : 1 }}
                      onClick={() => canAfford && handlePlayCard(card)}
                      className={`relative rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                        canAfford
                          ? 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)]'
                          : 'bg-slate-950/60 border-slate-800/80 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                              {getCardIcon(card.iconName)}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                                {card.name}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {card.economicConcept}
                              </div>
                            </div>
                          </div>

                          {/* Damage / Shield pill */}
                          {card.damage && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold whitespace-nowrap">
                              -{card.damage} DMG
                            </span>
                          )}
                          {card.shield && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold whitespace-nowrap">
                              +{card.shield} DEF
                            </span>
                          )}
                          {card.healHp && !card.damage && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold whitespace-nowrap">
                              +{card.healHp} HP
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-300 leading-snug mb-2">
                          {card.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px]">
                        <p className="text-[10px] italic text-cyan-200/80 line-clamp-1">
                          {card.flavorText}
                        </p>
                        <span className="px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-mono font-bold whitespace-nowrap">
                          {card.costCF} CF
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Tactical Riddle Quiz Attack Inside Battle */
              <div className="flex flex-col gap-3">
                {/* Highlight banner if Anti-Devaluation Riddle */}
                {(currentRiddle.category === 'devaluacion' || currentRiddle.category === 'inflacion' || currentRiddle.id.includes('devaluacion')) && (
                  <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/90 via-orange-950/80 to-rose-950/90 border border-amber-400/70 flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black uppercase tracking-wider">
                      <Flame className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span>🔥 Postulado Monetario Anti-Devaluación (+20% Daño Crítico)</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-200 font-bold">
                      -65 DMG • +$160 • +50 CF
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-extrabold text-white block">
                          {currentRiddle.title}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-400/40 text-[9px] font-mono font-bold text-emerald-300">
                          #{attackRiddleIndex + 1} de {ATTACK_RIDDLES.length} Asertijos de Ataque
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        Categoría: {currentRiddle.category.replace(/_/g, ' ').toUpperCase()} • Audio: Voz Latino Venezolana
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-speak-riddle"
                      onClick={() => {
                        const riddleSpeech = `${currentRiddle.title}. ${currentRiddle.question}`;
                        handleSpeakQuote(riddleSpeech, 'hero');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1 active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                      title="Escuchar asertijo en voz español latino venezolano"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isSpeaking ? 'Narrando...' : '🔊 Escuchar'}</span>
                    </button>
                    <button
                      id="btn-switch-riddle"
                      onClick={handleNextAttackRiddle}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      title="Cambiar al siguiente de los 40 asertijos de ataque y escuchar narración por voz"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>🔄 Siguiente Asertijo ({attackRiddleIndex + 1}/40)</span>
                    </button>
                    <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                      Premio: -60 DMG • +$150 • +50 CF
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-medium">
                  {currentRiddle.question}
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {currentRiddle.options.map((opt) => {
                    const isSelected = riddleSelectedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        disabled={riddleSelectedOption !== null || turnState !== 'player'}
                        onClick={() => handleAnswerRiddle(opt.id)}
                        className={`text-left p-3 rounded-xl border text-xs leading-relaxed transition-all ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.5)] font-bold'
                              : 'bg-rose-950 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                            : turnState === 'player'
                            ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-400/60 hover:bg-slate-800/90 cursor-pointer active:scale-98'
                            : 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-cyan-400 flex-shrink-0 mt-0.5">
                            ➔
                          </span>
                          <span>{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {riddleResult && (
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                    riddleResult.isCorrect
                      ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-rose-950/90 border-rose-400 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                  }`}>
                    {riddleResult.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-sm mb-1">
                        {riddleResult.isCorrect ? '¡IMPACTO CRÍTICO CONCEDIDO!' : '¡RESPUESTA INCORRECTA!'}
                      </p>
                      <p className="text-slate-300 leading-normal">{riddleResult.explanation}</p>
                      <button
                        onClick={handleNextRiddle}
                        className="mt-2.5 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-600 transition-all flex items-center gap-1.5"
                      >
                        <span>Siguiente Asertijo de Ataque</span>
                        <span>➔</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COL: REGISTRO DE LA BATALLA */}
        <div className="bg-[#090d1a]/95 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <span className="text-xs font-black uppercase text-slate-300 tracking-wider font-mono">
                REGISTRO DE LA BATALLA
              </span>
              <button
                id="btn-reset-battle-log"
                onClick={handleResetBattle}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                title="Reiniciar Duelo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[330px] flex flex-col gap-2.5 pr-1 font-mono text-xs text-slate-300 no-scrollbar">
              {battleLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2.5 rounded-xl border leading-relaxed ${
                    log.sender === 'hero'
                      ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200'
                      : log.sender === 'villain'
                      ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                      : log.type === 'critical'
                      ? 'bg-amber-950/40 border-amber-400/50 text-amber-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-bold">
                      {log.sender === 'hero' ? `💙 ${hero.alias.toUpperCase()}` : log.sender === 'villain' ? `🦹 ${villain.name.toUpperCase()}` : '⚡ SISTEMA'}
                    </span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div>{log.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Victory / Defeat Action */}
          {turnState === 'gameover' && (
            <button
              id="btn-play-again"
              onClick={handleResetBattle}
              className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-rose-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(0,242,254,0.6)] hover:scale-102 transition-all active:scale-98"
            >
              ¡Jugar Otra Batalla y Revancha!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
