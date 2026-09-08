export interface FinancialArchetype {
  id: string;
  name: string;
  role: string;
  age: string;
  avatar: string;
  description: string;
  monthlySalary: number;
  initialCash: number;
  fixedExpenses: {
    rent: number;
    subscriptions: number;
    food: number;
    transport: number;
    other: number;
  };
  initialLiabilities: {
    name: string;
    totalAmount: number;
    monthlyPayment: number;
  }[];
}

export interface HeroCharacter {
  id: string;
  name: string;
  codename: string;
  alias: string;
  quote: string;
  avatar: string;
  themeColor: string;
  maxHp: number;
  maxEnergy: number;
  description: string;
  specialAbility: string;
  philosophy: string;
  attacks: BattleCard[];
  shields: BattleCard[];
  superpowers: BattleCard[];
}

export interface VillainCharacter {
  id: string;
  name: string;
  codename: string;
  title: string;
  quote: string;
  avatar: string;
  themeColor: string;
  maxHp: number;
  inflationPower: number; // percentage (100% is full threat)
  description: string;
  threatLevel: string;
  evilPlan: string;
  attacks: {
    name: string;
    description: string;
    damage: number;
    inflationSurge: number;
    taunt: string;
  }[];
}

export interface BattleCard {
  id: string;
  name: string;
  category: 'attack' | 'shield' | 'power';
  description: string;
  flavorText: string;
  costCF: number;
  damage?: number;
  shield?: number;
  healHp?: number;
  cashReward?: number;
  economicConcept: string;
  iconName: string;
}

export interface FinancialAsset {
  id: string;
  name: string;
  category: 'micro' | 'macro';
  description: string;
  totalCost: number;
  downPayment: number;
  mortgageDebt: number;
  monthlyCashflow: number;
  annualRoi: number; // in percentage
  icon: string;
  isPurchased?: boolean;
}

export interface DebtItem {
  id: string;
  title: string;
  principal: number;
  interestRateMonthly: number; // e.g. 0.10 (10%)
  monthlyPayment: number;
  isBankLoan?: boolean;
}

export interface FinancialRiddle {
  id: string;
  title: string;
  category: 
    | 'pasivos_vs_activos'
    | 'coste_oportunidad'
    | 'inflacion'
    | 'apalancamiento'
    | 'interes_compuesto'
    | 'control_deuda'
    | 'psicologia_dinero'
    | 'estrategia_inversion'
    | 'diversificacion'
    | 'consumo_inteligente'
    | 'planificacion'
    | 'modelos_negocio'
    | 'gestion_riesgo'
    | 'preservacion_patrimonial'
    | 'flujo_caja'
    | 'habitos_financieros'
    | string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  points: number;
}

export interface BattleLogEntry {
  id: string;
  turn: number;
  sender: 'hero' | 'villain' | 'system' | 'economic';
  message: string;
  type: 'attack' | 'defense' | 'power' | 'critical' | 'info';
  timestamp: string;
}

export interface DirectStrikePostulate {
  id: string;
  name: string;
  axiom: string;
  description: string;
  flavorText: string;
  damage: number;
  costCF: number;
  shield?: number;
  bonusEffect?: string;
  healHp?: number;
  bonusCF?: number;
  tag: string;
  iconName: string;
}

export interface DefensiveShieldPostulate {
  id: string;
  name: string;
  axiom: string;
  description: string;
  flavorText: string;
  shield: number;
  healHp: number;
  costCF: number;
  bonusEffect?: string;
  tag: string;
  iconName: string;
}

export interface ComicChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  synopsis: string;
  panels: {
    image: string;
    caption: string;
    dialogue: {
      speaker: string;
      text: string;
      isHero: boolean;
    }[];
    economicLesson: string;
  }[];
}
