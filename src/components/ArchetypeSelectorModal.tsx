import React from 'react';
import { X, UserCheck, DollarSign, TrendingDown, ArrowRight } from 'lucide-react';
import { ARCHETYPES } from '../data/archetypes';
import { FinancialArchetype } from '../types';
import { soundEngine } from '../services/soundEngine';

interface ArchetypeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArchetype: FinancialArchetype;
  onSelectArchetype: (archetype: FinancialArchetype) => void;
}

export const ArchetypeSelectorModal: React.FC<ArchetypeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentArchetype,
  onSelectArchetype,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#070a14] border border-cyan-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,242,254,0.25)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wider">
                PERFILADO SOCIOECONÓMICO DE LA JUVENTUD (RF-01)
              </h2>
              <p className="text-xs text-slate-400">
                Selecciona tu arquetipo inicial para definir salario, liquidez y pasivos base.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Archetypes Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 pr-1">
          {ARCHETYPES.map((arch) => {
            const isSelected = currentArchetype.id === arch.id;
            const totalFixedExp =
              arch.fixedExpenses.rent +
              arch.fixedExpenses.subscriptions +
              arch.fixedExpenses.food +
              arch.fixedExpenses.transport +
              arch.fixedExpenses.other;
            const totalDebtPayment = arch.initialLiabilities.reduce((acc, l) => acc + l.monthlyPayment, 0);
            const netCashflow = arch.monthlySalary - (totalFixedExp + totalDebtPayment);

            return (
              <div
                key={arch.id}
                onClick={() => {
                  soundEngine.playUiClick();
                  onSelectArchetype(arch);
                  onClose();
                }}
                className={`rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/60 flex-shrink-0 shadow-[0_0_12px_rgba(0,242,254,0.3)]">
                      <img src={arch.avatar} alt={arch.name} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <div className="text-[10px] text-cyan-400 uppercase font-bold font-mono tracking-wider">
                        {arch.role} • {arch.age}
                      </div>
                      <h4 className="text-base font-extrabold text-white">{arch.name}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{arch.description}</p>
                    </div>
                  </div>

                  {/* Financial metrics breakdown */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Salario:</span>
                      <span className="text-emerald-400 font-bold">${arch.monthlySalary}/m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Liquidez:</span>
                      <span className="text-cyan-300 font-bold">${arch.initialCash}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Flujo Inicial:</span>
                      <span className="text-cyan-400 font-bold">+${netCashflow}/m</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400">
                    Pasivo: <span className="text-rose-400 font-semibold">{arch.initialLiabilities[0]?.name || 'Ninguno'}</span>
                  </span>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <span>{isSelected ? 'Arquetipo Activo' : 'Seleccionar'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
