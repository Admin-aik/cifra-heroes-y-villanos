import { FinancialAsset } from '../types';

export const INITIAL_ASSET_CATALOG: FinancialAsset[] = [
  // Micro-activos / Oportunidades Digitales
  {
    id: 'asset_saas_micro',
    name: 'Micro-SaaS de Plantillas Notion & UI',
    category: 'micro',
    description: 'Sistema automatizado de venta de kits de diseño y hojas de cálculo para creadores.',
    totalCost: 600,
    downPayment: 600,
    mortgageDebt: 0,
    monthlyCashflow: 110,
    annualRoi: 220,
    icon: 'Code'
  },
  {
    id: 'asset_vending_smart',
    name: 'Máquina Expendedora Smart IoT en Universidad',
    category: 'micro',
    description: 'Expendedora con telemetría de stock en tiempo real y pagos contactless en campus tecnológico.',
    totalCost: 1500,
    downPayment: 750,
    mortgageDebt: 750,
    monthlyCashflow: 180,
    annualRoi: 144,
    icon: 'Cpu'
  },
  {
    id: 'asset_newsletter_monetized',
    name: 'Newsletter Financiera Gen-Z Patrocinada',
    category: 'micro',
    description: 'Boletín semanal con 15,000 suscriptores y 3 patrocinadores fijos de apps fintech.',
    totalCost: 800,
    downPayment: 800,
    mortgageDebt: 0,
    monthlyCashflow: 160,
    annualRoi: 240,
    icon: 'Mail'
  },
  {
    id: 'asset_cloud_kitchen_franchise',
    name: 'Micro-Franquicia de Café de Especialidad Móvil',
    category: 'micro',
    description: 'Carrito de espresso automatizado en estación de metro con alto flujo peatonal.',
    totalCost: 2200,
    downPayment: 1100,
    mortgageDebt: 1100,
    monthlyCashflow: 290,
    annualRoi: 158,
    icon: 'Coffee'
  },

  // Macro-activos / Bienes Productivos
  {
    id: 'asset_duplex_rent',
    name: 'Dúplex Departamental para Renta Juvenil',
    category: 'macro',
    description: 'Propiedad inmobiliaria con 2 unidades alquiladas a estudiantes y teletrabajadores.',
    totalCost: 35000,
    downPayment: 5000,
    mortgageDebt: 30000,
    monthlyCashflow: 650,
    annualRoi: 156,
    icon: 'Building2'
  },
  {
    id: 'asset_solar_servers',
    name: 'Granja Solar para Servidores de IA',
    category: 'macro',
    description: 'Planta de energía renovable que vende electricidad y cómputo distribuido a empresas tech.',
    totalCost: 28000,
    downPayment: 4200,
    mortgageDebt: 23800,
    monthlyCashflow: 580,
    annualRoi: 165,
    icon: 'Sun'
  },
  {
    id: 'asset_coworking_hub',
    name: 'Espacio de Co-Working y Creación de Contenido',
    category: 'macro',
    description: 'Estudio compartido con cabinas de streaming y salas de podcast por suscripción mensual.',
    totalCost: 42000,
    downPayment: 6000,
    mortgageDebt: 36000,
    monthlyCashflow: 820,
    annualRoi: 164,
    icon: 'Sparkles'
  }
];
