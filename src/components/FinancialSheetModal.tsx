import React, { useState } from 'react';
import { X, FileText, PieChart, BookOpen, TrendingUp, TrendingDown, DollarSign, ShieldCheck } from 'lucide-react';
import { FinancialArchetype, FinancialAsset, DebtItem } from '../types';
import { soundEngine } from '../services/soundEngine';

interface FinancialSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  archetype: FinancialArchetype;
  cash: number;
  assets: FinancialAsset[];
  debts: DebtItem[];
  passiveIncome: number;
  totalExpenses: number;
  netCashflow: number;
  freedomRatio: number;
}

export const FinancialSheetModal: React.FC<FinancialSheetModalProps> = ({
  isOpen,
  onClose,
  archetype,
  cash,
  assets,
  debts,
  passiveIncome,
  totalExpenses,
  netCashflow,
  freedomRatio,
}) => {
  const [activeTab, setActiveTab] = useState<'income_statement' | 'balance_sheet' | 'rules'>('income_statement');

  if (!isOpen) return null;

  const totalSalary = archetype.monthlySalary;
  const totalRevenue = totalSalary + passiveIncome;

  const fixedLivingExpenses =
    archetype.fixedExpenses.rent +
    archetype.fixedExpenses.subscriptions +
    archetype.fixedExpenses.food +
    archetype.fixedExpenses.transport +
    archetype.fixedExpenses.other;

  const totalDebtService = debts.reduce((acc, d) => acc + d.monthlyPayment, 0);

  const totalAssetsMarketValue = cash + assets.reduce((acc, a) => acc + a.totalCost, 0);
  const totalLiabilitiesBalance = debts.reduce((acc, d) => acc + d.principal, 0);
  const netWorth = totalAssetsMarketValue - totalLiabilitiesBalance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#070a14] border border-cyan-500/40 rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,242,254,0.2)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wider">
                VISOR DE ESTADOS FINANCIEROS (FINANCIAL SHEET)
              </h2>
              <p className="text-xs text-slate-400">
                Auditoría Contable en Tiempo Real para: <span className="text-cyan-300 font-bold">{archetype.name}</span>
              </p>
            </div>
          </div>

          <button
            id="btn-close-financial-sheet"
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs Header (RF-06.1) */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4 overflow-x-auto no-scrollbar">
          <button
            id="tab-btn-income-statement"
            onClick={() => {
              soundEngine.playUiClick();
              setActiveTab('income_statement');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'income_statement'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>1. Estado de Resultados (Cashflow)</span>
          </button>

          <button
            id="tab-btn-balance-sheet"
            onClick={() => {
              soundEngine.playUiClick();
              setActiveTab('balance_sheet');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'balance_sheet'
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>2. Balance General (Activos vs Pasivos)</span>
          </button>

          <button
            id="tab-btn-rules"
            onClick={() => {
              soundEngine.playUiClick();
              setActiveTab('rules');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'rules'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>3. Reglas & Fundamentos Financieros</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto pr-1">
          {/* TAB 1: ESTADO DE RESULTADOS */}
          {activeTab === 'income_statement' && (
            <div className="flex flex-col gap-4">
              {/* Highlights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Ingresos Totales (Mensual)</span>
                  <span className="text-xl font-mono font-black text-emerald-400">${totalRevenue}</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Salario + Ingresos Pasivos</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Gastos Totales (Mensual)</span>
                  <span className="text-xl font-mono font-black text-rose-400">${totalExpenses}</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Vida Fija + Servicio de Deuda</span>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  netCashflow >= 0 ? 'bg-cyan-950/40 border-cyan-500/40' : 'bg-rose-950/40 border-rose-500/40'
                }`}>
                  <span className="text-[11px] text-slate-300 block mb-1">Flujo de Caja Neto</span>
                  <span className={`text-xl font-mono font-black ${netCashflow >= 0 ? 'text-cyan-300' : 'text-rose-300'}`}>
                    {netCashflow >= 0 ? `+$${netCashflow}` : `-$${Math.abs(netCashflow)}`}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">Superávit disponible para invertir</span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ingresos Breakdown */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5 font-mono">
                      <TrendingUp className="w-4 h-4" /> FUENTES DE INGRESO
                    </span>
                    <span className="text-xs font-mono font-bold text-white">${totalRevenue}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                      <span className="text-slate-300">Salario Base ({archetype.role})</span>
                      <span className="font-mono font-semibold text-white">${totalSalary}</span>
                    </div>

                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-cyan-400 mb-1">Flujo de Activos Productivos:</div>
                      {assets.length === 0 ? (
                        <div className="text-[11px] text-slate-500 italic">No posees activos en cartera aún.</div>
                      ) : (
                        assets.map(asset => (
                          <div key={asset.id} className="flex justify-between py-1 text-slate-300">
                            <span>• {asset.name}</span>
                            <span className="font-mono font-bold text-emerald-400">+${asset.monthlyCashflow}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Gastos Breakdown */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5 font-mono">
                      <TrendingDown className="w-4 h-4" /> ESTRUCTURA DE GASTOS
                    </span>
                    <span className="text-xs font-mono font-bold text-white">${totalExpenses}</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Alquiler / Hospedaje</span>
                      <span className="font-mono text-slate-200">${archetype.fixedExpenses.rent}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Suscripciones Digitales & Software</span>
                      <span className="font-mono text-slate-200">${archetype.fixedExpenses.subscriptions}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Alimentación & Supermercado</span>
                      <span className="font-mono text-slate-200">${archetype.fixedExpenses.food}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Transporte & Movilidad</span>
                      <span className="font-mono text-slate-200">${archetype.fixedExpenses.transport}</span>
                    </div>
                    <div className="flex justify-between py-1 text-slate-300">
                      <span>Otros Gastos Personales</span>
                      <span className="font-mono text-slate-200">${archetype.fixedExpenses.other}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-[11px] font-bold text-amber-400 mb-1">Servicio de Deudas (Cuotas):</div>
                      {debts.length === 0 ? (
                        <div className="text-[11px] text-slate-500 italic">¡Cero deudas activas! Flujo libre.</div>
                      ) : (
                        debts.map(debt => (
                          <div key={debt.id} className="flex justify-between py-1 text-slate-300">
                            <span>• {debt.title} ({(debt.interestRateMonthly * 100).toFixed(0)}% mes)</span>
                            <span className="font-mono font-bold text-rose-400">${debt.monthlyPayment}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ratio de Libertad */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-cyan-300 font-mono">
                    RATIO DE LIBERTAD FINANCIERA: {freedomRatio.toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-400">
                    Mide el porcentaje de tus gastos totales que son cubiertos exclusivamente por tus ingresos pasivos sin depender de tu salario.
                  </p>
                </div>
                <div className="w-full sm:w-48 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, freedomRatio)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BALANCE GENERAL */}
          {activeTab === 'balance_sheet' && (
            <div className="flex flex-col gap-4">
              {/* Net Worth Summary */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400 block">Patrimonio Neto (Net Worth) = Activos - Pasivos</span>
                  <span className="text-2xl font-black font-mono text-cyan-300">${netWorth.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block">Activos Totales:</span>
                    <span className="text-emerald-400 font-bold">${totalAssetsMarketValue.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Pasivos Totales:</span>
                    <span className="text-rose-400 font-bold">${totalLiabilitiesBalance.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Table Assets vs Liabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Activos Table */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold uppercase text-cyan-400 font-mono">
                      ACTIVOS (LO QUE PONE DINERO)
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      ${totalAssetsMarketValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-300">💵 Efectivo Líquido Disponible</span>
                      <span className="font-mono font-bold text-cyan-300">${cash.toLocaleString()}</span>
                    </div>

                    {assets.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">
                        No has adquirido activos productivos aún. Explora el Marketplace.
                      </p>
                    ) : (
                      assets.map(asset => (
                        <div key={asset.id} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-1">
                          <div className="flex justify-between font-bold text-slate-200">
                            <span>{asset.name}</span>
                            <span className="font-mono text-cyan-300">${asset.totalCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                            <span>Flujo: +${asset.monthlyCashflow}/mes</span>
                            <span className="text-emerald-400">ROI: {asset.annualRoi}%</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Pasivos Table */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold uppercase text-rose-400 font-mono">
                      PASIVOS (LO QUE SACA DINERO)
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-300">
                      ${totalLiabilitiesBalance.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {debts.length === 0 ? (
                      <p className="text-xs text-emerald-400 italic py-2">
                        ¡Felicidades! Estás 100% libre de deudas financieras.
                      </p>
                    ) : (
                      debts.map(debt => (
                        <div key={debt.id} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-1">
                          <div className="flex justify-between font-bold text-slate-200">
                            <span>{debt.title}</span>
                            <span className="font-mono text-rose-400">${debt.principal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                            <span>Cuota Mensual: ${debt.monthlyPayment}</span>
                            <span className="text-amber-400">Interés: {(debt.interestRateMonthly * 100).toFixed(0)}% mes</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REGLAS Y FUNDAMENTOS FINANCIEROS */}
          {activeTab === 'rules' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-cyan-500/30">
                <h4 className="font-bold text-cyan-300 mb-1 text-sm font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  1. Activos vs. Pasivos (La Regla de Oro)
                </h4>
                <p>
                  Un <strong className="text-white">Activo</strong> es cualquier bien o derecho que coloca dinero en tu bolsillo periódicamente (dividendos, alquileres, rentas de software). Un <strong className="text-white">Pasivo</strong> es cualquier compromiso u objeto de consumo que retira dinero de tu cuenta mes a mes.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/30">
                <h4 className="font-bold text-purple-300 mb-1 text-sm font-mono flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-400" />
                  2. Flujo de Caja Neto (Cashflow)
                </h4>
                <p>
                  Es la diferencia matemática entre tus <strong className="text-white">Ingresos Totales</strong> y tus <strong className="text-white">Gastos Totales</strong>. Un flujo positivo te otorga liquidez para invertir en nuevos activos; un flujo negativo te expone a las garras de Doctor Deuda.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-amber-500/30">
                <h4 className="font-bold text-amber-300 mb-1 text-sm font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  3. Deuda Buena vs. Deuda Mala (Apalancamiento)
                </h4>
                <p>
                  <strong className="text-emerald-400">Deuda Buena</strong> es el dinero prestado utilizado para financiar un activo que produce un rendimiento superior al coste de la tasa de interés. <strong className="text-rose-400">Deuda Mala</strong> es cualquier crédito utilizado para financiar consumo depreciable (viajes, ropa, cenas de lujo).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-rose-500/30">
                <h4 className="font-bold text-rose-300 mb-1 text-sm font-mono flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                  4. La Amenaza de Lord Inflación
                </h4>
                <p>
                  La inflación es el aumento sostenido del nivel de precios. El dinero en efectivo sin invertir pierde capacidad de compra. Para vencer a Lord Inflación, debes obtener rendimientos porcentuales mayores a la tasa de inflación real anual.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">CifraFlow Contabilidad v1.0 • Motor Síncrono</span>
          <button
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
};
