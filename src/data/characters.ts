import { HeroCharacter, VillainCharacter } from '../types';
import capitanImg from '../assets/images/capitan_cifraflow_1787580423075.jpg';
import donaImg from '../assets/images/dona_tasa_1787580449607.jpg';
import lordImg from '../assets/images/lord_inflacion_1787580436494.jpg';
import doctorImg from '../assets/images/doctor_deuda_1787580463567.jpg';
import coderImg from '../assets/images/archetype_coder_1787580492146.jpg';
import streamerImg from '../assets/images/archetype_streamer_1787580477373.jpg';
import designerImg from '../assets/images/archetype_designer_1787580510377.jpg';
import baristaImg from '../assets/images/archetype_barista_1787580524640.jpg';

export const HEROES: HeroCharacter[] = [
  {
    id: 'capitan_cifraflow',
    name: 'Capitán CifraFlow',
    codename: 'El Cyber-Pana Deflacionario',
    alias: 'Capitán CifraFlow',
    quote: '¡Tranquilos todos, mi gente! Con mi escudo holográfico ningún especulador inflará el precio del pan ni las baterías. ¡Ahorro o plomo cuántico!',
    avatar: capitanImg,
    themeColor: '#00f2fe',
    maxHp: 120,
    maxEnergy: 100,
    description: 'Guardián supremo de la microciudad. Utiliza energía cripto-deflacionaria y contratos limpios para aniquilar la especulación desmedida.',
    specialAbility: 'Deflación Cuántica: Reduce el poder de ataque del villano en 30% e incrementa el flujo de caja del turno.',
    philosophy: 'El dinero es energía que debe fluir hacia activos productivos, no evaporarse en burbujas de deuda ficticia.',
    attacks: [
      {
        id: 'atk_canon_deflacionario',
        name: 'Mega-Cañón Deflacionario Cuántico',
        category: 'attack',
        description: 'Dispara pulsos de plasma de tasa fija que desintegran la especulación de precios.',
        flavorText: '«¡Toma tu ráfaga de precios justos, chamo! ¡Desintegrando sobreprecios!»',
        costCF: 25,
        damage: 45,
        economicConcept: 'Deflación Controlada y Precios de Equilibrio',
        iconName: 'Zap'
      },
      {
        id: 'atk_guantelete_trueque',
        name: 'Guantelete de Trueque Directo',
        category: 'attack',
        description: 'Impactos sónicos pesados que cancelan comisiones bancarias abusivas.',
        flavorText: '«¡Pum! ¡De pana y sin intermediarios abusadores en el mercado libre!»',
        costCF: 18,
        damage: 35,
        economicConcept: 'Desintermediación y Liquidez P2P',
        iconName: 'ShieldAlert'
      },
      {
        id: 'atk_espada_laser_valor',
        name: 'Espada Láser de Valor Real',
        category: 'attack',
        description: 'Hoja de luz violeta capaz de rebanar contratos leoninos y burbujas crediticias.',
        flavorText: '«¡Corte directo a la burbuja! ¡Aquí nadie se pasa de listo con mi gente!»',
        costCF: 20,
        damage: 40,
        economicConcept: 'Valor Intrínseco vs. Valor Especulativo',
        iconName: 'Sword'
      }
    ],
    shields: [
      {
        id: 'def_fondo_emergencia',
        name: 'Escudo de Fondo de Emergencia (6 Meses)',
        category: 'shield',
        description: 'Despliega una barrera de liquidez blindada que absorbe 50 puntos de daño inflacionario.',
        flavorText: '«¡Tengo 6 meses de gastos respaldados en mi bóveda cuántica!»',
        costCF: 22,
        shield: 50,
        economicConcept: 'Colchón de Liquidez y Gestión de Riesgo',
        iconName: 'Shield'
      },
      {
        id: 'def_presupuesto_cero',
        name: 'Campo de Presupuesto Base Cero',
        category: 'shield',
        description: 'Asigna cada moneda a un propósito estratégico, bloqueando 35 de daño y curando 15 HP.',
        flavorText: '«¡Ni un solo centavo queda sin propósito! ¡Defensa presupuestaria total!»',
        costCF: 16,
        shield: 35,
        healHp: 15,
        economicConcept: 'Presupuesto Base Cero (Zero-Based Budgeting)',
        iconName: 'ShieldCheck'
      }
    ],
    superpowers: [
      {
        id: 'pow_interes_compuesto',
        name: 'Sobrecarga de Interés Compuesto 8vo Poder',
        category: 'power',
        description: 'Invoca la fuerza exponencial del tiempo: inflige 60 de daño masivo y restaura 30 CF de energía.',
        flavorText: '«¡La octava maravilla del multiverso económico está de nuestro lado!»',
        costCF: 40,
        damage: 60,
        healHp: 20,
        cashReward: 150,
        economicConcept: 'Crecimiento Exponencial e Interés Compuesto',
        iconName: 'Flame'
      },
      {
        id: 'pow_inyeccion_cashflow',
        name: 'Inyección de Flujo de Caja Pasivo',
        category: 'power',
        description: 'Convierte dividendos acumulados en un pulso curativo de +40 HP y +25 CF.',
        flavorText: '«¡Mis activos siguen trabajando mientras yo peleo en la arena!»',
        costCF: 30,
        healHp: 40,
        cashReward: 200,
        economicConcept: 'Ingresos Pasivos Automatizados',
        iconName: 'Coins'
      }
    ]
  },
  {
    id: 'dona_tasa',
    name: 'Doña Tasa de Interés',
    codename: 'La Guardiana del Interés Compuesto',
    alias: 'Doña Tasa',
    quote: '¡Ay mijo! El que pide prestado para comprar lujos termina siendo esclavo del banco. ¡Aquí te traigo un plazo fijo que te va a enderezar el futuro!',
    avatar: donaImg,
    themeColor: '#f59e0b',
    maxHp: 130,
    maxEnergy: 90,
    description: 'Sabia estratega de la microciudad. Armada con algoritmos de amortización rápida y tablas de rendimiento real.',
    specialAbility: 'Amortización Acelerada: Reduce el daño de los intereses del villano en 40% y genera bonos de liquidez.',
    philosophy: 'Paga tus deudas tóxicas primero, luego invierte sin descanso hasta que tus activos paguen tu estilo de vida.',
    attacks: [
      {
        id: 'atk_rayo_rendimiento',
        name: 'Rayo de Rendimiento Anual Real',
        category: 'attack',
        description: 'Dispara una descarga que descuenta la inflación del rendimiento nominal del enemigo.',
        flavorText: '«¡Aprende a calcular el rendimiento neto, novato!»',
        costCF: 20,
        damage: 42,
        economicConcept: 'Tasa de Interés Real vs. Nominal (Ecuación de Fisher)',
        iconName: 'Zap'
      },
      {
        id: 'atk_martillo_amortizacion',
        name: 'Martillo de Amortización Francesa',
        category: 'attack',
        description: 'Golpea directamente el capital principal adeudado, destruyendo los intereses acumulados.',
        flavorText: '«¡Directo al principal! ¡Menos intereses para los usureros!»',
        costCF: 25,
        damage: 48,
        economicConcept: 'Amortización de Capital vs. Servicio de Intereses',
        iconName: 'Hammer'
      }
    ],
    shields: [
      {
        id: 'def_barrera_tasa_fija',
        name: 'Barrera de Tasa Fija Blindada',
        category: 'shield',
        description: 'Inmuniza contra subidas repentinas de tasas de interés y bloquea 45 de daño.',
        flavorText: '«¡Firmé a tasa fija del 3% y no me muevo de ahí!»',
        costCF: 18,
        shield: 45,
        economicConcept: 'Deuda a Tasa Fija vs. Tasa Variable',
        iconName: 'ShieldCheck'
      }
    ],
    superpowers: [
      {
        id: 'pow_dividendos_revertidos',
        name: 'Torbellino de Dividendos Reinvertidos',
        category: 'power',
        description: 'Genera una espiral de crecimiento que cura 35 HP y asesta 55 de daño.',
        flavorText: '«¡Reinvirtiendo cada ganancia para crear una bola de nieve imparable!»',
        costCF: 35,
        damage: 55,
        healHp: 35,
        cashReward: 180,
        economicConcept: 'Efecto Bola de Nieve (Snowball Reinvestment)',
        iconName: 'TrendingUp'
      }
    ]
  },
  {
    id: 'alex_coder',
    name: 'Alex Byte (Coder)',
    codename: 'El Arquitecto de Micro-SaaS',
    alias: 'Alex Dev',
    quote: '¡Cada línea de código que escribo automatiza un ingreso recurrente mensual! ¡Cero pasivos innecesarios!',
    avatar: coderImg,
    themeColor: '#06b6d4',
    maxHp: 115,
    maxEnergy: 110,
    description: 'Ingeniero de software que convierte algoritmos en activos digitales de alto margen y bajo mantenimiento.',
    specialAbility: 'Despliegue Contínuo de Ingresos: Genera +15 CF adicionales por turno de forma pasiva.',
    philosophy: 'Construir una vez, vender infinitas veces a costo marginal cercano a cero.',
    attacks: [
      {
        id: 'atk_script_ingresos',
        name: 'Script de Monetización Automatizada',
        category: 'attack',
        description: 'Lanza una ráfaga de microtransacciones que debilita al villano con cobros recurrentes.',
        flavorText: '«¡Deploy a producción! +$50 por segundo.»',
        costCF: 20,
        damage: 38,
        economicConcept: 'Escalabilidad Digital y Coste Marginal Cero',
        iconName: 'Zap'
      },
      {
        id: 'atk_refactor_financiero',
        name: 'Refactorización de Gastos de Servidor',
        category: 'attack',
        description: 'Elimina redundancias presupuestarias infligiendo 44 de daño directo.',
        flavorText: '«¡Optimización de costos cloud al 70%!»',
        costCF: 22,
        damage: 44,
        economicConcept: 'Eficiencia Operativa y Control de Costos',
        iconName: 'Hammer'
      }
    ],
    shields: [
      {
        id: 'def_firewall_ahorro',
        name: 'Firewall de Cero Deuda Técnica',
        category: 'shield',
        description: 'Bloquea 40 de daño y previene drenajes de flujo de caja.',
        flavorText: '«¡Todo el tráfico especulativo queda bloqueado por el firewall!»',
        costCF: 16,
        shield: 40,
        economicConcept: 'Blindaje Patrimonial Digital',
        iconName: 'ShieldCheck'
      }
    ],
    superpowers: [
      {
        id: 'pow_saas_exit',
        name: 'Exit de Micro-SaaS a 5x Múltiplo',
        category: 'power',
        description: 'Vende una micro-aplicación generando $250 de liquidez instantánea y 50 de daño crítico.',
        flavorText: '«¡Venta cerrada! Liquidez masiva en la cuenta.»',
        costCF: 35,
        damage: 50,
        healHp: 25,
        cashReward: 250,
        economicConcept: 'Valoración y Venta de Activos Productivos',
        iconName: 'Coins'
      }
    ]
  },
  {
    id: 'valeria_streamer',
    name: 'Valeria Viral (Streamer)',
    codename: 'La Reina de los Activos Digitales',
    alias: 'Valeria Viral',
    quote: '¡Mi audiencia es mi comunidad y mis patrocinios pagan mis fondos indexados! ¡No compres lujos con préstamos!',
    avatar: streamerImg,
    themeColor: '#d946ef',
    maxHp: 110,
    maxEnergy: 105,
    description: 'Creadora de contenido que monetiza su marca personal invirtiendo el 60% de sus ganancias en bienes productivos.',
    specialAbility: 'Patrocinio Estratégico: Recupera 20 HP y 20 CF al activar habilidades de impacto.',
    philosophy: 'Apalancar la visibilidad para construir múltiples fuentes de ingresos diversificadas.',
    attacks: [
      {
        id: 'atk_campana_patrocinada',
        name: 'Campaña Viral de Alto Retorno',
        category: 'attack',
        description: 'Asesta un golpe publicitario de 40 de daño con patrocinio de marcas éticas.',
        flavorText: '«¡Trending topic en 5 minutos! ¡Ingresos por CPM por las nubes!»',
        costCF: 18,
        damage: 40,
        economicConcept: 'Monetización de Audiencias y Contratos B2B',
        iconName: 'Flame'
      }
    ],
    shields: [
      {
        id: 'def_diversificacion_canales',
        name: 'Diversificación Omnicanal',
        category: 'shield',
        description: 'Evita depender de una sola plataforma, otorgando 42 de blindaje.',
        flavorText: '«¡Si cae una red social, mis otros canales siguen facturando!»',
        costCF: 18,
        shield: 42,
        healHp: 10,
        economicConcept: 'Diversificación de Fuentes de Ingreso',
        iconName: 'Shield'
      }
    ],
    superpowers: [
      {
        id: 'pow_membresias_comunidad',
        name: 'Lanzamiento de Membresía de Comunidad',
        category: 'power',
        description: 'Convierte seguidores en suscriptores mensuales de pago, infligiendo 48 de daño y otorgando $220.',
        flavorText: '«¡Suscripciones recurrentes activadas! ¡Flujo constante garantizado!»',
        costCF: 35,
        damage: 48,
        healHp: 30,
        cashReward: 220,
        economicConcept: 'Modelos de Suscripción Recurrente (MRR)',
        iconName: 'Coins'
      }
    ]
  },
  {
    id: 'mateo_designer',
    name: 'Mateo Vector (Diseñador)',
    codename: 'El Maestro del Valor Percibido',
    alias: 'Mateo UX',
    quote: '¡El buen diseño multiplica el valor de cualquier producto por diez! ¡Calidad sobre deuda superficial!',
    avatar: designerImg,
    themeColor: '#8b5cf6',
    maxHp: 120,
    maxEnergy: 95,
    description: 'Especialista en UI/UX que empaqueta librerías de diseño digital que se venden solas en marketplaces.',
    specialAbility: 'Diseño de Conversión: Aumenta la eficacia de todos los ataques en 25%.',
    philosophy: 'Crear productos estéticos y funcionales que resuelvan problemas reales de usuarios.',
    attacks: [
      {
        id: 'atk_ui_kit_pro',
        name: 'Lanzamiento de UI Kit Premium',
        category: 'attack',
        description: 'Vende plantillas digitales en masa infligiendo 42 de daño con costes de entrega cero.',
        flavorText: '«¡Vectorizado perfecto y exportado! ¡Descargas a nivel global!»',
        costCF: 22,
        damage: 42,
        economicConcept: 'Propiedad Intelectual y Regalías Digitales',
        iconName: 'Sword'
      }
    ],
    shields: [
      {
        id: 'def_contrato_freelance',
        name: 'Cláusula de Anticipo del 50%',
        category: 'shield',
        description: 'Protege contra impagos de clientes otorgando 40 de escudo y curando 15 HP.',
        flavorText: '«¡No muevo un solo pixel sin el 50% de anticipo en cuenta!»',
        costCF: 16,
        shield: 40,
        healHp: 15,
        economicConcept: 'Gestión de Cobranzas y Flujo de Caja Profesional',
        iconName: 'ShieldCheck'
      }
    ],
    superpowers: [
      {
        id: 'pow_curso_diseno',
        name: 'Masterclass Digital Grabada',
        category: 'power',
        description: 'Curso evergreen que se vende automáticamente generando $210 de recompensa y 52 de daño.',
        flavorText: '«¡Educación de alto valor que genera regalías 24/7!»',
        costCF: 35,
        damage: 52,
        healHp: 20,
        cashReward: 210,
        economicConcept: 'Infoproductos y Escalabilidad Educativa',
        iconName: 'Coins'
      }
    ]
  },
  {
    id: 'sofia_barista',
    name: 'Sofía Brew (Barista)',
    codename: 'La Emprendedora de Micro-Franquicias',
    alias: 'Sofía Brew',
    quote: '¡El mejor café de especialidad con costes fijos controlados y márgenes del 75%! ¡Trabajo honesto y capitalización!',
    avatar: baristaImg,
    themeColor: '#ea580c',
    maxHp: 125,
    maxEnergy: 100,
    description: 'Emprendedora gastronómica que domina el costo unitario por taza de café y expande micro-stands rentables.',
    specialAbility: 'Margen de Contribución: Absorbe el 20% de todo daño entrante y lo convierte en energía de trueque.',
    philosophy: 'Márgenes altos y control riguroso de mermas para maximizar el flujo operativo diario.',
    attacks: [
      {
        id: 'atk_combo_especialidad',
        name: 'Prensa Francesa de Alto Margen',
        category: 'attack',
        description: 'Vende café premium con 80% de margen bruto infligiendo 40 de daño a los villanos.',
        flavorText: '«¡Grano de origen seleccionado! Calidad que los clientes pagan con gusto.»',
        costCF: 20,
        damage: 40,
        economicConcept: 'Margen Bruto Unitario y Propuesta de Valor',
        iconName: 'Hammer'
      }
    ],
    shields: [
      {
        id: 'def_control_mermas',
        name: 'Control Estricto de Inventario y Mermas',
        category: 'shield',
        description: 'Reduce desperdicios bloqueando 38 de daño y otorgando 15 HP.',
        flavorText: '«¡Cero desperdicio en cocina! Cada gramo está presupuestado.»',
        costCF: 15,
        shield: 38,
        healHp: 15,
        economicConcept: 'Gestión de Inventarios Just-in-Time',
        iconName: 'Shield'
      }
    ],
    superpowers: [
      {
        id: 'pow_micro_franquicia',
        name: 'Apertura de Segundo Stand Franquiciado',
        category: 'power',
        description: 'Multiplica la presencia física generando $240 de flujo y 55 de impacto comercial.',
        flavorText: '«¡Nuevo stand operando en la universidad! ¡Flujo duplicado!»',
        costCF: 38,
        damage: 55,
        healHp: 25,
        cashReward: 240,
        economicConcept: 'Modelo de Franquicias y Replicabilidad',
        iconName: 'Coins'
      }
    ]
  }
];

export const VILLAINS: VillainCharacter[] = [
  {
    id: 'lord_inflacion',
    name: 'Lord Inflación',
    codename: 'El Monstruo de la Devaluación',
    title: 'Lord Inflación',
    quote: '¡Jajaja! ¿Creíste que tus billetes guardados bajo el colchón estaban a salvo? ¡Cada segundo que pasa devoro el 10% de tu poder adquisitivo!',
    avatar: lordImg,
    themeColor: '#ef4444',
    maxHp: 150,
    inflationPower: 100,
    description: 'Entidad caótica que quema el poder de compra de la ciudadanía imprimiendo moneda sin respaldo y encareciendo la canasta básica.',
    threatLevel: 'NIVEL CRÍTICO: 14.8% MENSUAL',
    evilPlan: 'Convertir todos los ahorros de Microciudad en humo y hacer que una barra de pan cueste 1 millón de créditos.',
    attacks: [
      {
        name: 'Impresión Descontrolada de Billetes',
        description: 'Inunda el mercado con papel sin valor, devaluando el poder de compra.',
        damage: 28,
        inflationSurge: 15,
        taunt: '¡Imprimiendo billones de billetes sin respaldo! ¡Tu dinero ahora vale la mitad!'
      },
      {
        name: 'Llamarada de Subida de Precios en Gasolina',
        description: 'Aumenta los costos logísticos de toda la cadena de suministros.',
        damage: 34,
        inflationSurge: 20,
        taunt: '¡Subió el combustible! ¡Todo lo que compras ahora es 40% más caro!'
      },
      {
        name: 'Burbuja Especulativa de Vivienda',
        description: 'Dispara las rentas inmobiliarias para asfixiar el flujo de caja juvenil.',
        damage: 42,
        inflationSurge: 25,
        taunt: '¡Renta duplicada este mes! ¡Despídete de tu capacidad de ahorro!'
      }
    ]
  },
  {
    id: 'doctor_deuda',
    name: 'Doctor Deuda Tóxica',
    codename: 'El Devorador de Flujo',
    title: 'Doctor Deuda',
    quote: '¡Firma aquí en la letra pequeña! Solo pagarás el pago mínimo... ¡durante los próximos 45 años de tu vida! ¡Mwahahaha!',
    avatar: doctorImg,
    themeColor: '#10b981',
    maxHp: 140,
    inflationPower: 85,
    description: 'Científico oscuro que esclaviza ciudadanos mediante tarjetas de crédito con tasas usurarias del 80% anual y préstamos de consumo innecesario.',
    threatLevel: 'TASA USURARIA: 72% CAT ANUAL',
    evilPlan: 'Atrapar a toda la juventud en la rueda de hámster financiera obligándolos a pagar intereses de por vida.',
    attacks: [
      {
        name: 'Tentáculo de Pago Mínimo Eterno',
        description: 'Engaña al usuario para pagar solo intereses sin amortizar nunca el capital.',
        damage: 30,
        inflationSurge: 12,
        taunt: '¡Paga solo el mínimo, tonto! ¡Así tu deuda crecerá hasta el fin de los tiempos!'
      },
      {
        name: 'Comisión Oculta de Manejo de Cuenta',
        description: 'Drena saldo silenciosamente con cargos administrativos sorpresa.',
        damage: 25,
        inflationSurge: 18,
        taunt: '¡Cargos de mantenimiento no anunciados en la cláusula 34-B!'
      },
      {
        name: 'Préstamo Exprés para Vacaciones de Lujo',
        description: 'Incentiva el consumo de pasivos disfrazados de estatus social.',
        damage: 38,
        inflationSurge: 22,
        taunt: '¡Presume en redes hoy y paga cuotas asfixiantes por 5 años!'
      }
    ]
  }
];

