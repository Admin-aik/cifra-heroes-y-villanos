import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Code, 
  Mail, 
  Coffee, 
  Sun, 
  Sparkles, 
  PlusCircle, 
  Trash2, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  ShieldAlert, 
  CheckCircle,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FinancialArchetype, FinancialAsset, DebtItem } from '../types';
import { INITIAL_ASSET_CATALOG } from '../data/assetsAndDebts';
import { soundEngine } from '../services/soundEngine';

interface AccountingSimulatorProps {
  archetype: FinancialArchetype;
  cash: number;
  assets: FinancialAsset[];
  debts: DebtItem[];
  passiveIncome: number;
  totalExpenses: number;
  netCashflow: number;
  freedomRatio: number;
  onBuyAsset: (asset: FinancialAsset) => void;
  onSellAsset: (assetId: string) => void;
  onTakeLoan: (amount: number) => void;
  onAmortizeDebt: (debtId: string, amount: number) => void;
  onAdvanceMonth: () => void;
}

export const AccountingSimulator: React.FC<AccountingSimulatorProps> = ({
  archetype,
  cash,
  assets,
  debts,
  passiveIncome,
  totalExpenses,
  netCashflow,
  freedomRatio,
  onBuyAsset,
  onSellAsset,
  onTakeLoan,
  onAmortizeDebt,
  onAdvanceMonth,
}) => {
  const [activeCatalogTab, setActiveCatalogTab] = useState<'micro' | 'macro'>('micro');
  const [loanInputAmount, setLoanInputAmount] = useState<number>(1000);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getAssetIcon = (icon: string) => {
    switch (icon) {
      case 'Code': return <Code className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-fuchsia-400" />;
      case 'Mail': return <Mail className="w-5 h-5 text-amber-400" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-orange-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-blue-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const handlePurchase = (asset: FinancialAsset) => {
    if (cash < asset.downPayment) {
      soundEngine.playQuizError();
      showNotification(`Efectivo insuficiente. Necesitas $${asset.downPayment} para el pago inicial.`, 'error');
      return;
    }
    soundEngine.playCashRegister();
    onBuyAsset(asset);
    showNotification(`¡Activo [${asset.name}] adquirido exitosamente! +$${asset.monthlyCashflow}/mes.`, 'success');
  };

  const handleSell = (asset: FinancialAsset) => {
    soundEngine.playCashRegister();
    onSellAsset(asset.id);
    showNotification(`Activo [${asset.name}] vendido. Capital recuperado.`, 'success');
  };

  const handleApplyLoan = () => {
    if (loanInputAmount <= 0) return;
    soundEngine.playCashRegister();
    onTakeLoan(loanInputAmount);
    showNotification(`Préstamo bancario de $${loanInputAmount} aprobado. Se sumó un costo de servicio del 10% mensual ($${loanInputAmount * 0.10}/mes).`, 'success');
  };

  const handlePayDebt = (debt: DebtItem) => {
    if (cash < debt.principal) {
      // Partial payment
      if (cash <= 0) {
        soundEngine.playQuizError();
        showNotification('No tienes liquidez suficiente para amortizar esta deuda.', 'error');
        return;
      }
      const paymentAmount = cash;
      soundEngine.playShieldDeploy();
      onAmortizeDebt(debt.id, paymentAmount);
      showNotification(`Amortización parcial de $${paymentAmount} aplicada a ${debt.title}.`, 'success');
    } else {
      // Full payoff
      soundEngine.playShieldDeploy();
      onAmortizeDebt(debt.id, debt.principal);
      showNotification(`¡Deuda [${debt.title}] liquidada al 100%! Flujo liberado.`, 'success');
    }
  };

  const handleTriggerPayday = () => {
    soundEngine.playCashRegister();
    if (netCashflow > 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onAdvanceMonth();
    showNotification(`¡Mes liquidado! Salario cobrado, pasivos servidos y dividendos ingresados. Saldo neto ajustado.`, 'success');
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 py-2">
      {/* Top Banner & Payday Trigger */}
      <div className="bg-gradient-to-r from-[#090d1a] via-[#0d1428] to-[#090d1a] border border-cyan-500/30 rounded-3xl p-4 sm:p-6 shadow-[0_0_30px_rgba(0,242,254,0.1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold">
              MOTOR CONTABLE EN TIEMPO REAL
            </span>
            <span className="text-xs text-slate-400 font-mono">RF-02 & RF-03</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
            Simulador de Flujo de Caja & Portafolio de Activos
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Invierte tu capital en activos productivos para que tus ingresos pasivos superen tus gastos fijos y derrotes la inflación.
          </p>
        </div>

        {/* Advance Month Button */}
        <button
          id="btn-advance-month"
          onClick={handleTriggerPayday}
          className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all whitespace-nowrap"
        >
          <Calendar className="w-4 h-4" />
          <span>Cobrar Mes / Payday (+${netCashflow})</span>
        </button>
      </div>

      {/* Notifications bar */}
      {notification && (
        <div className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
          notification.type === 'success'
            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'bg-rose-950/80 border-rose-400 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#090d1a]/90 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Efectivo Disponible</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-cyan-300">
            ${cash.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Liquidez inmediata</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090d1a]/90 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Ingreso Pasivo</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
            +${passiveIncome}/mes
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">{assets.length} Activos productivos</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090d1a]/90 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Flujo de Caja Neto</span>
          <span className={`text-xl sm:text-2xl font-black font-mono ${netCashflow >= 0 ? 'text-cyan-300' : 'text-rose-400'}`}>
            {netCashflow >= 0 ? `+$${netCashflow}` : `-$${Math.abs(netCashflow)}`}/mes
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Tras todos los gastos</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090d1a]/90 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Ratio de Libertad</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-fuchsia-300">
            {freedomRatio.toFixed(1)}%
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Meta de Independencia: 100%</span>
        </div>
      </div>

      {/* Main Interactive Sections: Market vs Debt Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT 2 COLS: ASSETS MARKETPLACE */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-[#090d1a]/95 border border-slate-800 rounded-3xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  MERCADO DE ACTIVOS PRODUCTIVOS
                </h3>
                <p className="text-xs text-slate-400">
                  Adquiere activos digitales o bienes inmuebles para generar flujo mensual.
                </p>
              </div>

              {/* Tabs Micro vs Macro */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  id="tab-market-micro"
                  onClick={() => {
                    soundEngine.playUiClick();
                    setActiveCatalogTab('micro');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCatalogTab === 'micro'
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,242,254,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Micro-Activos Digitales
                </button>
                <button
                  id="tab-market-macro"
                  onClick={() => {
                    soundEngine.playUiClick();
                    setActiveCatalogTab('macro');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCatalogTab === 'macro'
                      ? 'bg-fuchsia-500 text-white shadow-[0_0_10px_rgba(217,70,239,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Macro-Activos & Bienes
                </button>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INITIAL_ASSET_CATALOG.filter(a => a.category === activeCatalogTab).map(asset => {
                const isOwned = assets.some(a => a.id === asset.id);
                const canAfford = cash >= asset.downPayment;

                return (
                  <div
                    key={asset.id}
                    className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                      isOwned
                        ? 'bg-cyan-950/20 border-cyan-500/40'
                        : canAfford
                        ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-400/50'
                        : 'bg-slate-950/50 border-slate-900 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                            {getAssetIcon(asset.icon)}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                              {asset.name}
                            </h4>
                            <span className="text-[10px] text-cyan-400 font-mono">
                              ROI: {asset.annualRoi}% Anual
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {asset.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono mb-3">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Pago Inicial (Down Payment):</span>
                          <span className="text-cyan-300 font-bold">${asset.downPayment}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Flujo Mensual Generado:</span>
                          <span className="text-emerald-400 font-bold">+${asset.monthlyCashflow}/mes</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isOwned ? (
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                            <CheckCircle className="w-3.5 h-3.5" /> En tu Portafolio
                          </span>
                          <button
                            onClick={() => handleSell(asset)}
                            className="px-3 py-1 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Vender
                          </button>
                        </div>
                      ) : (
                        <button
                          id={`btn-buy-asset-${asset.id}`}
                          onClick={() => handlePurchase(asset)}
                          disabled={!canAfford}
                          className={`w-full py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                            canAfford
                              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:scale-102'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Comprar por ${asset.downPayment}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COL: DEBT & BANK CREDIT MANAGEMENT */}
        <div className="flex flex-col gap-4">
          {/* Bank Loan Module */}
          <div className="bg-[#090d1a]/95 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-400" />
                CRÉDITO BANCARIO & APALANCAMIENTO
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                RF-04: Préstamos con tasa fija del 10% mensual para adquirir activos.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">
                Monto del Préstamo ($):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="500"
                  min="500"
                  max="20000"
                  value={loanInputAmount}
                  onChange={(e) => setLoanInputAmount(Math.max(500, Number(e.target.value)))}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  id="btn-apply-loan"
                  onClick={handleApplyLoan}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all whitespace-nowrap"
                >
                  Solicitar
                </button>
              </div>
              <span className="text-[10px] text-amber-400/90 block">
                * Costo mensual de servicio: ${(loanInputAmount * 0.10).toFixed(0)}/mes (10% interés).
              </span>
            </div>
          </div>

          {/* Active Liabilities & Amortization */}
          <div className="bg-[#090d1a]/95 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                <Banknote className="w-4 h-4 text-rose-400" />
                ESTRUCTURA DE DEUDAS ACTIVAS
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Amortiza tus pasivos para reducir costes mensuales y liberar flujo.
              </p>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {debts.length === 0 ? (
                <p className="text-xs text-emerald-400 font-semibold p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  ✨ ¡Estás 100% libre de deudas tóxicas!
                </p>
              ) : (
                debts.map(debt => (
                  <div key={debt.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-slate-200">{debt.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Saldo: <span className="text-rose-400 font-bold">${debt.principal}</span> | Cuota: <span className="text-amber-300 font-bold">${debt.monthlyPayment}/mes</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePayDebt(debt)}
                      className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold transition-all"
                    >
                      {cash >= debt.principal ? `Amortizar Todo ($${debt.principal})` : `Pagar con tu Efectivo ($${cash})`}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
