import { FinancialArchetype } from '../types';
import baristaImg from '../assets/images/archetype_barista_1787580524640.jpg';
import coderImg from '../assets/images/archetype_coder_1787580492146.jpg';
import designerImg from '../assets/images/archetype_designer_1787580510377.jpg';
import streamerImg from '../assets/images/archetype_streamer_1787580477373.jpg';

export const ARCHETYPES: FinancialArchetype[] = [
  {
    id: 'junior_dev',
    name: 'Dev Junior Full-Stack',
    role: 'Desarrollador de Software',
    age: '21 años',
    avatar: coderImg,
    description: 'Genera ingresos estables por código pero lidia con préstamos de laptop gaming y suscripciones a servidores en la nube.',
    monthlySalary: 1800,
    initialCash: 1200,
    fixedExpenses: {
      rent: 550,
      subscriptions: 90,
      food: 320,
      transport: 100,
      other: 140
    },
    initialLiabilities: [
      {
        name: 'Préstamo Equipamiento Tech',
        totalAmount: 1600,
        monthlyPayment: 160
      }
    ]
  },
  {
    id: 'streamer',
    name: 'Streamer & Creador',
    role: 'Content Creator Gen-Z',
    age: '19 años',
    avatar: streamerImg,
    description: 'Ingresos variables por patrocinios y bits. Gastos altos en periféricos RGB e iluminación de streaming.',
    monthlySalary: 1600,
    initialCash: 950,
    fixedExpenses: {
      rent: 500,
      subscriptions: 140,
      food: 300,
      transport: 80,
      other: 180
    },
    initialLiabilities: [
      {
        name: 'Tarjeta Crédito Setup Streaming',
        totalAmount: 1400,
        monthlyPayment: 140
      }
    ]
  },
  {
    id: 'ui_designer',
    name: 'Diseñadora UI/UX Freelance',
    role: 'Diseñadora Digital & Motion',
    age: '22 años',
    avatar: designerImg,
    description: 'Creativa con ingresos recurrentes por diseño de apps, pero atrapada en cuotas de tabletas gráficas profesionales.',
    monthlySalary: 1750,
    initialCash: 1100,
    fixedExpenses: {
      rent: 520,
      subscriptions: 110,
      food: 290,
      transport: 90,
      other: 150
    },
    initialLiabilities: [
      {
        name: 'Financiamiento Tableta Digitalizadora',
        totalAmount: 1200,
        monthlyPayment: 120
      }
    ]
  },
  {
    id: 'specialty_barista',
    name: 'Barista Cloud Kitchen',
    role: 'Emprendedor Gastronómico',
    age: '20 años',
    avatar: baristaImg,
    description: 'Domina el arte del café y comida rápida digital. Busca transformar sus propinas y salario en activos de franquicia.',
    monthlySalary: 1500,
    initialCash: 800,
    fixedExpenses: {
      rent: 480,
      subscriptions: 60,
      food: 260,
      transport: 120,
      other: 130
    },
    initialLiabilities: [
      {
        name: 'Micro-crédito Maquinaria Espresso',
        totalAmount: 1000,
        monthlyPayment: 100
      }
    ]
  }
];
