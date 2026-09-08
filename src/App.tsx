import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BattleArena } from './components/BattleArena';
import { AccountingSimulator } from './components/AccountingSimulator';
import { HeroVillainGallery } from './components/HeroVillainGallery';
import { QuizModule } from './components/QuizModule';
import { ComicLoreViewer } from './components/ComicLoreViewer';
import { FinancialSheetModal } from './components/FinancialSheetModal';
import { ArchetypeSelectorModal } from './components/ArchetypeSelectorModal';
import { WelcomeIntroModal } from './components/WelcomeIntroModal';
import { ARCHETYPES } from './data/archetypes';
import { HEROES, VILLAINS } from './data/characters';
import { FinancialArchetype, FinancialAsset, DebtItem, HeroCharacter, VillainCharacter } from './types';
import { soundEngine } from './services/soundEngine';

export default function App() {
  // Navigation & Modals: default to gallery as requested ("galeria de villanos y heroes en la portada de primera pagina")
  const [currentTab, setCurrentTab] = useState<'gallery' | 'arena' | 'simulator' | 'quiz' | 'comic'>('gallery');
  const [isFinancialSheetOpen, setIsFinancialSheetOpen] = useState<boolean>(false);
  const [isArchetypeModalOpen, setIsArchetypeModalOpen] = useState<boolean>(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState<boolean>(false);

  // Sound and Voice State
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.isMuted);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(soundEngine.isVoiceEnabled);

  // Socio-economic Profile
  const [archetype, setArchetype] = useState<FinancialArchetype>(ARCHETYPES[0]);
  const [cash, setCash] = useState<number>(ARCHETYPES[0].initialCash);
  const [financialIq, setFinancialIq] = useState<number>(100);

  // Financial Assets & Debts
  const [assets, setAssets] = useState<FinancialAsset[]>([]);
  const [debts, setDebts] = useState<DebtItem[]>(
    ARCHETYPES[0].initialLiabilities.map((l, idx) => ({
      id: `debt-init-${idx}`,
      title: l.name,
      principal: l.totalAmount,
      interestRateMonthly: 0.10,
      monthlyPayment: l.monthlyPayment,
      isBankLoan: false,
    }))
  );

  // Selected Characters
  const [selectedHero, setSelectedHero] = useState<HeroCharacter>(HEROES[0]);
  const [selectedVillain, setSelectedVillain] = useState<VillainCharacter>(VILLAINS[0]);

  // Synchronous Contable Calculations (RF-02)
  const passiveIncome = assets.reduce((acc, a) => acc + a.monthlyCashflow, 0);

  const fixedExpensesTotal =
    archetype.fixedExpenses.rent +
    archetype.fixedExpenses.subscriptions +
    archetype.fixedExpenses.food +
    archetype.fixedExpenses.transport +
    archetype.fixedExpenses.other;

  const totalDebtService = debts.reduce((acc, d) => acc + d.monthlyPayment, 0);
  const totalExpenses = fixedExpensesTotal + totalDebtService;
  const totalRevenue = archetype.monthlySalary + passiveIncome;
  const netCashflow = totalRevenue - totalExpenses;
  const freedomRatio = totalExpenses > 0 ? (passiveIncome / totalExpenses) * 100 : 100;

  // Handle switching archetype
  const handleSelectArchetype = (newArchetype: FinancialArchetype) => {
    setArchetype(newArchetype);
    setCash(newArchetype.initialCash);
    setAssets([]);
    setDebts(
      newArchetype.initialLiabilities.map((l, idx) => ({
        id: `debt-arch-${newArchetype.id}-${idx}`,
        title: l.name,
        principal: l.totalAmount,
        interestRateMonthly: 0.10,
        monthlyPayment: l.monthlyPayment,
        isBankLoan: false,
      }))
    );
  };

  // Sound toggles
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleVoice = () => {
    const voice = soundEngine.toggleVoice();
    setIsVoiceEnabled(voice);
  };

  // Reset entire game
  const handleResetGame = () => {
    handleSelectArchetype(ARCHETYPES[0]);
    setSelectedHero(HEROES[0]);
    setSelectedVillain(VILLAINS[0]);
    setFinancialIq(100);
    setCurrentTab('arena');
  };

  // Asset Transactions (RF-03)
  const handleBuyAsset = (asset: FinancialAsset) => {
    setCash(prev => Math.max(0, prev - asset.downPayment));
    setAssets(prev => [...prev, { ...asset, isPurchased: true }]);
    if (asset.mortgageDebt > 0) {
      const monthlyMortgage = Math.round(asset.mortgageDebt * 0.05); // 5% monthly mortgage service
      setDebts(prev => [
        ...prev,
        {
          id: `mortgage-${asset.id}`,
          title: `Hipoteca / Apalancamiento: ${asset.name}`,
          principal: asset.mortgageDebt,
          interestRateMonthly: 0.05,
          monthlyPayment: monthlyMortgage,
          isBankLoan: true,
        },
      ]);
    }
    setFinancialIq(prev => prev + 15);
  };

  const handleSellAsset = (assetId: string) => {
    const assetToSell = assets.find(a => a.id === assetId);
    if (!assetToSell) return;
    setCash(prev => prev + assetToSell.downPayment);
    setAssets(prev => prev.filter(a => a.id !== assetId));
    setDebts(prev => prev.filter(d => d.id !== `mortgage-${assetId}`));
  };

  // Bank Loans & Amortization (RF-04)
  const handleTakeLoan = (amount: number) => {
    setCash(prev => prev + amount);
    const monthlyInterestCost = Math.round(amount * 0.10); // 10% monthly interest rate
    setDebts(prev => [
      ...prev,
      {
        id: `loan-${Date.now()}`,
        title: `Préstamo Bancario $${amount}`,
        principal: amount,
        interestRateMonthly: 0.10,
        monthlyPayment: monthlyInterestCost,
        isBankLoan: true,
      },
    ]);
  };

  const handleAmortizeDebt = (debtId: string, paymentAmount: number) => {
    setDebts(prevDebts => {
      const updated: DebtItem[] = [];
      for (const debt of prevDebts) {
        if (debt.id === debtId) {
          const newPrincipal = Math.max(0, debt.principal - paymentAmount);
          setCash(currCash => Math.max(0, currCash - paymentAmount));
          if (newPrincipal > 0) {
            updated.push({
              ...debt,
              principal: newPrincipal,
              monthlyPayment: Math.round(newPrincipal * debt.interestRateMonthly),
            });
          }
        } else {
          updated.push(debt);
        }
      }
      return updated;
    });
  };

  // Advance 1 Month Payday
  const handleAdvanceMonth = () => {
    setCash(prev => Math.max(0, prev + netCashflow));
  };

  return (
    <div className="min-h-screen bg-[#040510] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        archetype={archetype}
        onOpenArchetypeModal={() => setIsArchetypeModalOpen(true)}
        onOpenFinancialSheet={() => setIsFinancialSheetOpen(true)}
        onOpenIntroModal={() => setIsIntroModalOpen(true)}
        onResetGame={handleResetGame}
        cash={cash}
        netCashflow={netCashflow}
        financialIq={financialIq}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isVoiceEnabled={isVoiceEnabled}
        onToggleVoice={handleToggleVoice}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full p-3 sm:p-5">
        {currentTab === 'arena' && (
          <BattleArena
            hero={selectedHero}
            villain={selectedVillain}
            onSelectHero={setSelectedHero}
            onSelectVillain={setSelectedVillain}
            onRewardCash={(reward) => setCash(prev => prev + reward)}
            onIncrementIq={(pts) => setFinancialIq(prev => Math.max(0, prev + pts))}
            netCashflow={netCashflow}
          />
        )}

        {currentTab === 'gallery' && (
          <HeroVillainGallery
            selectedHero={selectedHero}
            selectedVillain={selectedVillain}
            onSelectHeroForBattle={(h) => {
              setSelectedHero(h);
              setCurrentTab('arena');
            }}
            onSelectVillainForBattle={(v) => {
              setSelectedVillain(v);
              setCurrentTab('arena');
            }}
            onStartBattleMatchup={(h, v) => {
              setSelectedHero(h);
              setSelectedVillain(v);
              setCurrentTab('arena');
            }}
          />
        )}

        {currentTab === 'simulator' && (
          <AccountingSimulator
            archetype={archetype}
            cash={cash}
            assets={assets}
            debts={debts}
            passiveIncome={passiveIncome}
            totalExpenses={totalExpenses}
            netCashflow={netCashflow}
            freedomRatio={freedomRatio}
            onBuyAsset={handleBuyAsset}
            onSellAsset={handleSellAsset}
            onTakeLoan={handleTakeLoan}
            onAmortizeDebt={handleAmortizeDebt}
            onAdvanceMonth={handleAdvanceMonth}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizModule
            financialIq={financialIq}
            onIncrementIq={(pts) => setFinancialIq(prev => prev + pts)}
            onRewardCash={(reward) => setCash(prev => prev + reward)}
          />
        )}

        {currentTab === 'comic' && <ComicLoreViewer />}
      </main>

      {/* Financial Sheet Modal (RF-06) */}
      <FinancialSheetModal
        isOpen={isFinancialSheetOpen}
        onClose={() => setIsFinancialSheetOpen(false)}
        archetype={archetype}
        cash={cash}
        assets={assets}
        debts={debts}
        passiveIncome={passiveIncome}
        totalExpenses={totalExpenses}
        netCashflow={netCashflow}
        freedomRatio={freedomRatio}
      />

      {/* Socio-Economic Archetype Modal (RF-01) */}
      <ArchetypeSelectorModal
        isOpen={isArchetypeModalOpen}
        onClose={() => setIsArchetypeModalOpen(false)}
        currentArchetype={archetype}
        onSelectArchetype={handleSelectArchetype}
      />

      {/* Welcoming Cinematic Intro Modal (RNF-04) */}
      <WelcomeIntroModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        onStartGame={() => {
          setIsIntroModalOpen(false);
          setCurrentTab('arena');
        }}
      />
    </div>
  );
}
