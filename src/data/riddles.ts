import { FinancialRiddle } from '../types';
import { ATTACK_RIDDLES } from './attackRiddles';

export { ATTACK_RIDDLES };

export const FINANCIAL_RIDDLES: FinancialRiddle[] = [
  {
    id: 'riddle_car_passive',
    title: 'El Auto Deportivo de Último Modelo',
    category: 'pasivos_vs_activos',
    question: 'Compraste un auto a crédito por $25,000 para salir los fines de semana. Pagas $400 de letra, $120 de seguro y $150 de combustible mensual. Desde el punto de vista contable de CifraFlow, ¿qué es este auto?',
    options: [
      {
        id: 'opt_1',
        text: 'Un Pasivo Disfrazado, porque drena $670 de tu bolsillo cada mes y se devalúa 20% al salir de la agencia.',
        isCorrect: true,
        explanation: '¡Correcto! En finanzas personales reales, un activo pone dinero en tu bolsillo y un pasivo saca dinero. Si el auto no genera ingresos comerciales, es un pasivo de consumo.'
      },
      {
        id: 'opt_2',
        text: 'Un Activo de Alto Rendimiento, porque eleva tu estatus social y valor neto aparente.',
        isCorrect: false,
        explanation: 'Falso. El estatus no paga facturas y los vehículos de uso personal sufren depreciación acelerada mes tras mes.'
      },
      {
        id: 'opt_3',
        text: 'Un Fondo de Emergencia con ruedas.',
        isCorrect: false,
        explanation: 'Incorrecto. La liquidez de un auto es baja y venderlo en una urgencia suele implicar perder dinero por ventas apresuradas.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_black_friday',
    title: 'La Trampa del Descuento Ilusorio',
    category: 'coste_oportunidad',
    question: 'Ves unos auriculares gamer de $300 rebajados a $180 (40% de descuento). No los necesitabas ni los tenías presupuestados. Si decides no comprarlos, ¿cuánto dinero ahorraste realmente?',
    options: [
      {
        id: 'opt_1',
        text: 'Ahorraste $180 de tu liquidez neta, ya que no gastar dinero que no planeabas usar conserva el 100% de tu capital.',
        isCorrect: true,
        explanation: '¡Exacto! No gastar $180 es un ahorro del 100% de ese capital. Comprar algo no presupuestado solo por tener descuento sigue siendo un gasto de $180, no un ahorro de $120.'
      },
      {
        id: 'opt_2',
        text: 'Ahorraste $120, que es la diferencia del descuento de la etiqueta.',
        isCorrect: false,
        explanation: '¡Falso! Para "ahorrar" los $120 de la etiqueta tendrías que haber desembolsado $180 de tu flujo de caja real.'
      },
      {
        id: 'opt_3',
        text: 'Ahorraste $300 completos de valor de mercado.',
        isCorrect: false,
        explanation: 'Incorrecto. Solo conservaste el dinero real que no salió de tu cuenta bancaria.'
      }
    ],
    points: 20
  },
  {
    id: 'riddle_mattress_cash',
    title: 'El Dinero bajo el Colchón vs. Lord Inflación',
    category: 'inflacion',
    question: 'Guardas $10,000 en efectivo en una caja fuerte durante 5 años en un país con una inflación promedio anual del 8%. ¿Qué ocurre con tu dinero?',
    options: [
      {
        id: 'opt_1',
        text: 'Sigues teniendo nominalmente $10,000, pero tu poder adquisitivo real habrá caído aproximadamente un 32%, comprando mucho menos que antes.',
        isCorrect: true,
        explanation: '¡Brillante deducción! La inflación actúa como un impuesto silencioso. El número de billetes es el mismo, pero su poder de compra se evapora ante el encarecimiento de bienes y servicios.'
      },
      {
        id: 'opt_2',
        text: 'Tu dinero gana valor porque los billetes antiguos se vuelven piezas de colección.',
        isCorrect: false,
        explanation: 'Totalmente incorrecto. El dinero fiduciario estándar pierde valor de compra año tras año debido a la inflación constante.'
      },
      {
        id: 'opt_3',
        text: 'No le pasa nada porque la caja fuerte es ignífuga y hermética.',
        isCorrect: false,
        explanation: 'Proteger el papel físico no protege contra la pérdida de poder de compra del dinero frente al mercado.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_good_debt',
    title: 'Deuda Buena vs. Deuda Mala',
    category: 'apalancamiento',
    question: 'Solicitas un crédito bancario con una cuota mensual de $200 para comprar una máquina expendedora que genera $380 de flujo neto mensual tras costos. ¿Qué tipo de deuda es?',
    options: [
      {
        id: 'opt_1',
        text: 'Deuda Buena (Apalancamiento Productivo), porque el activo adquirido genera $180 de flujo positivo neto mensual por encima de la cuota del préstamo.',
        isCorrect: true,
        explanation: '¡Excelente! La deuda buena es aquella pagada por un activo productivo y que además deja un beneficio neto positivo en tu flujo de caja.'
      },
      {
        id: 'opt_2',
        text: 'Deuda Tóxica, porque cualquier préstamo al banco es una pérdida automática.',
        isCorrect: false,
        explanation: 'Falso. El apalancamiento inteligente sobre activos productivos es una de las herramientas más potentes para construir riqueza con capital de terceros.'
      },
      {
        id: 'opt_3',
        text: 'Un gasto superfluo no amortizable.',
        isCorrect: false,
        explanation: 'Incorrecto. La máquina expendedora es un activo que produce ingresos recurrentes predecibles.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_compound_interest',
    title: 'El Secreto de la Bola de Nieve del Interés Compuesto',
    category: 'interes_compuesto',
    question: 'Si inviertes $200 al mes con un rendimiento anual del 10% reinvirtiendo todos los dividendos desde los 18 hasta los 40 años, ¿por qué tu dinero crece tan rápido en los últimos años?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque los intereses ganados en cada período se suman al capital principal, generando a su vez nuevos intereses sobre intereses en una curva exponencial.',
        isCorrect: true,
        explanation: '¡Exacto! Ese es el principio del interés compuesto que Albert Einstein llamaba la octava maravilla del mundo: los intereses generan más intereses.'
      },
      {
        id: 'opt_2',
        text: 'Porque el banco duplica tus depósitos cada cumpleaños.',
        isCorrect: false,
        explanation: 'Falso. Los bancos no regalan depósitos; el crecimiento proviene del rendimiento reinvertido.'
      },
      {
        id: 'opt_3',
        text: 'Porque la inflación deja de existir cuando eres mayor de 30 años.',
        isCorrect: false,
        explanation: 'Incorrecto. La inflación sigue existiendo, pero el interés compuesto la supera ampliamente.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_gasto_hormiga',
    title: 'El Drenaje Silencioso del Gasto Hormiga',
    category: 'coste_oportunidad',
    question: 'Compras un café de especialidad y un snack de $6 todos los días laborales (20 días al mes). Si en lugar de eso inviertes esos $120 al mes al 10% anual durante 10 años, ¿cuál es el verdadero impacto?',
    options: [
      {
        id: 'opt_1',
        text: 'Acumularías más de $24,500 gracias al ahorro y rendimiento compuesto, demostrando cómo los pequeños gastos drenan patrimonios enormes.',
        isCorrect: true,
        explanation: '¡Correcto! Los gastos hormiga parecen inofensivos a diario ($6), pero anualizados y multiplicados por el interés compuesto representan decenas de miles de dólares.'
      },
      {
        id: 'opt_2',
        text: 'Solo pierdes $60 al año porque el café es una necesidad biológica indispensable.',
        isCorrect: false,
        explanation: 'Falso. El coste total mensual es $120 ($1,440 anuales) y su coste de oportunidad compuesto es mucho mayor.'
      },
      {
        id: 'opt_3',
        text: 'No afecta en nada porque menos de $10 diarios no entra en un presupuesto formal.',
        isCorrect: false,
        explanation: 'Incorrecto. Cada dólar no presupuestado drena el fondo de inversión futuro.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_fondo_emergencia',
    title: 'El Escudo Defensivo del Fondo de Emergencia',
    category: 'pasivos_vs_activos',
    question: 'Si tus gastos fijos mensuales indispensables (comida, renta, transporte) son de $1,200, ¿cuánto dinero deberías mantener en tu Fondo de Emergencia líquido?',
    options: [
      {
        id: 'opt_1',
        text: 'Entre $3,600 y $7,200 (equivalente a 3 a 6 meses de gastos indispensables) en una cuenta de alta liquidez y bajo riesgo.',
        isCorrect: true,
        explanation: '¡Brillante! El fondo de emergencia debe cubrir entre 3 y 6 meses de costos de vida indispensables para evitar caer en deudas tóxicas ante imprevistos.'
      },
      {
        id: 'opt_2',
        text: '$50 en efectivo y el resto en criptomonedas de alta volatilidad.',
        isCorrect: false,
        explanation: 'Peligroso y erróneo. Los fondos de emergencia no deben exponerse a alta volatilidad ni pérdidas de capital a corto plazo.'
      },
      {
        id: 'opt_3',
        text: 'Cero dólares, porque es mejor usar la tarjeta de crédito ante cualquier urgencia.',
        isCorrect: false,
        explanation: 'Totalmente incorrecto. Usar tarjetas para urgencias sin fondo de respaldo genera espirales de deudas con altas tasas de interés.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_tarjeta_pago_minimo',
    title: 'La Trampa Mortal del Pago Mínimo',
    category: 'control_deuda',
    question: 'Tienes una deuda de $3,000 en tu tarjeta de crédito con una tasa anual del 36%. Si solo abonas el pago mínimo mensual exigido por el banco, ¿qué ocurrirá con tu deuda?',
    options: [
      {
        id: 'opt_1',
        text: 'Tardarás más de 12 a 15 años en liquidarla y terminarás pagando más del doble o triple en puros intereses bancarios.',
        isCorrect: true,
        explanation: '¡Exacto! El pago mínimo está diseñado matemáticamente para cubrir casi exclusivamente intereses y comisiones, amortizando una fracción ínfima del capital principal.'
      },
      {
        id: 'opt_2',
        text: 'La deuda desaparecerá en 12 meses porque el banco te bonifica por puntualidad.',
        isCorrect: false,
        explanation: '¡Falso! El banco no perdona deuda; al pagar solo el mínimo prolongas el cobro de intereses durante años.'
      },
      {
        id: 'opt_3',
        text: 'Tu límite de crédito se congelará sin cobrarte ningún recargo adicional.',
        isCorrect: false,
        explanation: 'Incorrecto. Los intereses compuestos del 36% anual siguen devengándose mes a mes.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_regla_72',
    title: 'El Reloj Matemático de la Regla del 72',
    category: 'interes_compuesto',
    question: 'Inviertes $5,000 en un portafolio diversificado que rinde un promedio del 9% anual constante. Según la Regla del 72, ¿en cuántos años se duplicará tu capital a $10,000?',
    options: [
      {
        id: 'opt_1',
        text: 'En exactamente 8 años (72 dividido entre 9 = 8 años).',
        isCorrect: true,
        explanation: '¡Matemática impecable! La regla del 72 es una fórmula rápida: divides 72 entre la tasa de rentabilidad anual para obtener los años necesarios para duplicar el dinero.'
      },
      {
        id: 'opt_2',
        text: 'En 18 años.',
        isCorrect: false,
        explanation: 'Incorrecto. 18 años sería con un rendimiento de solo el 4% anual.'
      },
      {
        id: 'opt_3',
        text: 'En 72 meses exactos.',
        isCorrect: false,
        explanation: 'Falso. El divisor opera con el porcentaje y el resultado se expresa en años.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_inflacion_estilo_vida',
    title: 'El Síndrome del Aumento de Sueldo (Lifestyle Creep)',
    category: 'psicologia_dinero',
    question: 'Recibes un aumento de sueldo de $800 al mes. De inmediato te mudas a un apartamento más caro y financias un coche nuevo, aumentando tus gastos fijos en $850. ¿Qué acaba de suceder?',
    options: [
      {
        id: 'opt_1',
        text: 'Caíste en la Inflación del Estilo de Vida: tus gastos crecieron más que tus ingresos, quedando más vulnerable financieramente que antes del aumento.',
        isCorrect: true,
        explanation: '¡Preciso! La trampa de la carrera de ratas consiste en elevar los pasivos al mismo ritmo o superior que los ingresos, impidiendo la acumulación de capital libre.'
      },
      {
        id: 'opt_2',
        text: 'Duplicaste tu patrimonio neto porque ahora tienes contratos de mayor valor.',
        isCorrect: false,
        explanation: 'Falso. Los compromisos de gastos fijos son obligaciones que reducen tu margen de ahorro, no activos.'
      },
      {
        id: 'opt_3',
        text: 'Mejoraste tu apalancamiento operativo personal.',
        isCorrect: false,
        explanation: 'Incorrecto. Aumentaste el costo de vida sin generar flujos de ingresos pasivos adicionales.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_fondos_indexados_vs_trading',
    title: 'Fondo Indexado Global vs. Especulación Diaria',
    category: 'estrategia_inversion',
    question: '¿Por qué más del 85% de los fondos de inversión activa y traders profesionales no logran superar el rendimiento del índice S&P 500 o MSCI World en plazos de 10 a 15 años?',
    options: [
      {
        id: 'opt_1',
        text: 'Por el peso acumulado de las altas comisiones de gestión, los costes de corretaje por operaciones constantes y la imposibilidad de predecir el mercado consistentemente.',
        isCorrect: true,
        explanation: '¡Brillante análisis! Las comisiones del 1.5%-2% y los impuestos por compraventa frecuente drenan el rendimiento compuesto, mientras los fondos indexados de bajo costo (0.05%-0.15%) capturan todo el crecimiento empresarial.'
      },
      {
        id: 'opt_2',
        text: 'Porque las computadoras de Wall Street no funcionan los días viernes.',
        isCorrect: false,
        explanation: 'Totalmente absurdo.'
      },
      {
        id: 'opt_3',
        text: 'Porque el índice bursátil está exento de todas las leyes económicas mundiales.',
        isCorrect: false,
        explanation: 'Falso. El índice representa a las corporaciones más productivas e innovadoras del planeta.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_diversificacion_fuentes',
    title: 'El Abismo del Empleo con Única Fuente de Ingreso',
    category: 'diversificacion',
    question: 'Si el 100% de tus ingresos proviene exclusivamente de un empleo por cuenta ajena, ¿cuál es tu nivel de riesgo financiero real ante un despido o quiebra de la empresa?',
    options: [
      {
        id: 'opt_1',
        text: 'Riesgo Crítico (100% dependiente), ya que un solo evento ajeno a tu control puede cortar instantáneamente todo tu flujo de caja.',
        isCorrect: true,
        explanation: '¡Exacto! Depender de una sola fuente de ingresos es como una mesa de una sola pata. Diversificar con consultorías, activos digitales, dividendos o micro-negocios es la verdadera seguridad laboral.'
      },
      {
        id: 'opt_2',
        text: 'Riesgo Cero, porque los contratos laborales están legalmente blindados para siempre.',
        isCorrect: false,
        explanation: 'Falso. Las empresas pueden reestructurarse, quebrar o automatizar puestos en cualquier momento.'
      },
      {
        id: 'opt_3',
        text: 'Riesgo Moderado, porque el gobierno garantiza el sueldo vitalicio a todos los empleados.',
        isCorrect: false,
        explanation: 'Incorrecto. Las prestaciones por desempleo son temporales y reducidas.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_costo_por_uso',
    title: 'La Ecuación del Costo por Uso',
    category: 'consumo_inteligente',
    question: '¿Qué compra representa una mejor decisión financiera: una laptop profesional de $1,200 usada 300 días al año durante 4 años para trabajar, o un traje de gala de $200 usado solo 1 noche?',
    options: [
      {
        id: 'opt_1',
        text: 'La laptop ($1/día de uso que además produce ingresos) frente al traje ($200 por una sola noche sin retorno productivo).',
        isCorrect: true,
        explanation: '¡Excelente cálculo! El costo por uso mide el verdadero rendimiento del desembolso. Las herramientas de alto uso y producción de ingresos son inversiones, mientras que los lujos de un solo uso tienen un costo unitario astronómico.'
      },
      {
        id: 'opt_2',
        text: 'El traje, porque $200 es menor que $1,200 en valor absoluto.',
        isCorrect: false,
        explanation: 'Falso. Mirar solo la cifra absoluta ignora la frecuencia de uso, la durabilidad y la generación de valor.'
      },
      {
        id: 'opt_3',
        text: 'Ninguno de los dos tiene valor económico cuantificable.',
        isCorrect: false,
        explanation: 'Incorrecto. Ambos tienen métricas de depreciación y amortización por uso claras.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_presupuesto_50_30_20',
    title: 'La Regla de Distribución de Oro 50 / 30 / 20',
    category: 'planificacion',
    question: 'Si ganas $2,500 netos al mes y aplicas la regla presupuestaria 50/30/20, ¿cuánto dinero debes destinar mensualmente a Ahorro e Inversión para tu libertad futura?',
    options: [
      {
        id: 'opt_1',
        text: '$500 (el 20% innegociable de $2,500), mientras $1,250 van a Necesidades Fijas y $750 a Deseos/Estilo de vida.',
        isCorrect: true,
        explanation: '¡Cálculo perfecto! El 20% ($500) destinado de forma sistemática y constante a fondos indexados o activos productivos construye una base patrimonial sólida a lo largo del tiempo.'
      },
      {
        id: 'opt_2',
        text: '$100 solamente, si sobra algo a fin de mes tras pagar salidas y fiestas.',
        isCorrect: false,
        explanation: 'Incorrecto. Esperar a "lo que sobre" a fin de mes es la causa número uno del fracaso del ahorro.'
      },
      {
        id: 'opt_3',
        text: '$1,250 a inversiones de alto riesgo especulativo.',
        isCorrect: false,
        explanation: 'Falso. Destinar el 50% a inversión sin cubrir las necesidades indispensables genera desbalance y asfixia en el corto plazo.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_tasa_nominal_vs_real',
    title: 'La Ilusión Óptica de la Tasa Nominal',
    category: 'inflacion',
    question: 'Un banco te ofrece un depósito a plazo fijo con una tasa de interés del 6% anual. La inflación del país en ese mismo año es del 7.5%. ¿Cuál es el resultado real de tu inversión?',
    options: [
      {
        id: 'opt_1',
        text: 'Tuviste una Tasa de Interés Real Negativa del -1.5%, perdiendo poder adquisitivo a pesar de ver más dinero nominal en tu cuenta.',
        isCorrect: true,
        explanation: '¡Deducción magistral! La ecuación de Fisher (Tasa Real ≈ Tasa Nominal - Inflación) demuestra que si la inflación supera el rendimiento de tu cuenta, estás empobreciéndote en términos reales.'
      },
      {
        id: 'opt_2',
        text: 'Ganaste un 6% neto libre de cualquier impacto económico.',
        isCorrect: false,
        explanation: '¡Falso! Ignorar la inflación es la trampa clásica que destruye el valor del dinero ahorrado en cuentas tradicionales.'
      },
      {
        id: 'opt_3',
        text: 'Duplicaste tu patrimonio gracias a la garantía bancaria.',
        isCorrect: false,
        explanation: 'Totalmente falso.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_mrr_escalabilidad',
    title: 'El Superpoder del Negocio de Software Escalable (MRR)',
    category: 'modelos_negocio',
    question: 'Un programador invierte 3 meses en crear una app SaaS y consigue 200 clientes que pagan $20 al mes. Si luego pasa a tener 1,000 clientes con el mismo costo de servidor de $80, ¿qué fenómeno económico describe esto?',
    options: [
      {
        id: 'opt_1',
        text: 'Apalancamiento de Coste Marginal Cercano a Cero y Economía de Escala en la Economía del Conocimiento.',
        isCorrect: true,
        explanation: '¡Excelente! En los negocios digitales de software, duplicar o quintuplicar las ventas no multiplica proporcionalmente los costos operativos, disparando el margen de beneficio neto hacia las nubes.'
      },
      {
        id: 'opt_2',
        text: 'Sobrecarga de trabajo que obligará a contratar 200 personas más.',
        isCorrect: false,
        explanation: 'Falso. El software automatizado atiende a miles de usuarios simultáneamente sin requerir mano de obra física proporcional.'
      },
      {
        id: 'opt_3',
        text: 'Devaluación acelerada del producto.',
        isCorrect: false,
        explanation: 'Incorrecto. Mayor base de usuarios e ingresos recurrentes aumentan drásticamente la valoración del negocio.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_cripto_fomo',
    title: 'El Canto de Sirena del FOMO Especulativo',
    category: 'gestion_riesgo',
    question: 'Un amigo te dice que compró una nueva moneda digital que subió 400% en 3 días y te insiste en meter todos tus ahorros de vida hoy mismo porque "va a ir a la luna". ¿Qué debes hacer según los principios de CifraFlow?',
    options: [
      {
        id: 'opt_1',
        text: 'Rechazar la euforia impulsiva (FOMO), nunca invertir dinero que no puedas permitirte perder y recordar que entrar tras una subida vertical suele terminar en comprar en el pico antes del desplome.',
        isCorrect: true,
        explanation: '¡Protección magistral de capital! El miedo a perderse algo (FOMO) y la avaricia son los mayores aliados de los villanos financieros. La disciplina de inversión exige análisis fundamental y diversificación, no apuestas a ciegas.'
      },
      {
        id: 'opt_2',
        text: 'Pedir un préstamo bancario de $20,000 y meterlo todo en la moneda recomendada.',
        isCorrect: false,
        explanation: '¡Peligro extremo! Endeudarse para especular en activos volátiles es la receta más rápida para la quiebra financiera.'
      },
      {
        id: 'opt_3',
        text: 'Vender tu fondo de emergencia de inmediato.',
        isCorrect: false,
        explanation: 'Totalmente erróneo. El fondo de emergencia nunca se toca para especular.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_mantenimiento_preventivo',
    title: 'Mantenimiento Preventivo vs. Colapso de Emergencia',
    category: 'preservacion_patrimonial',
    question: 'Tu máquina de trabajo (o vehículo) requiere un cambio de aceite y filtros de $70 cada 6 meses. Si decides ignorarlo para "ahorrar" dinero, el motor se funde a los 2 años costando $3,500 repararlo. ¿Cuál fue el balance financiero de no hacer el mantenimiento?',
    options: [
      {
        id: 'opt_1',
        text: 'Una pérdida neta catastrófica de $3,220 provocada por una falsa economía de corto plazo.',
        isCorrect: true,
        explanation: '¡Exacto! Omitir el mantenimiento preventivo no es ahorrar; es acumular una deuda oculta de deterioro que tarde o temprano explota cobrando intereses devastadores.'
      },
      {
        id: 'opt_2',
        text: 'Un ahorro de $280 limpios que aumentó tu liquidez disponible.',
        isCorrect: false,
        explanation: 'Falso. Ignorar el coste de reposición de $3,500 es una ilusión contable peligrosa.'
      },
      {
        id: 'opt_3',
        text: 'Un resultado neutral equilibrado.',
        isCorrect: false,
        explanation: 'Incorrecto. Destruyó el activo principal y drenó fondos de emergencia.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_apalancamiento_inmobiliario',
    title: 'El Inmueble con Flujo de Caja Positivo',
    category: 'apalancamiento',
    question: 'Compras un apartamento para alquilar. La cuota hipotecaria, impuestos y comunidad suman $650/mes. Lo alquilas a un inquilino calificado por $950/mes. ¿Quién está pagando la deuda y cuánto ganas?',
    options: [
      {
        id: 'opt_1',
        text: 'El inquilino paga el 100% de la hipoteca amortizando tu patrimonio, y además te deja $300/mes de flujo de caja libre positivo.',
        isCorrect: true,
        explanation: '¡Apalancamiento inmobiliario de libro! Este es el clásico ejemplo de activo rentable: el capital de un tercero paga tu deuda y genera un excedente de liquidez mensual a tu favor.'
      },
      {
        id: 'opt_2',
        text: 'Tú estás pagando $950 y el banco se queda con todo el beneficio.',
        isCorrect: false,
        explanation: 'Falso. El inquilino cubre los costos y el excedente pertenece al propietario.'
      },
      {
        id: 'opt_3',
        text: 'Es un pasivo porque los inmuebles nunca generan ingresos reales.',
        isCorrect: false,
        explanation: 'Incorrecto. Un inmueble alquilado con flujo de caja positivo es un activo generador de rentas.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_comisiones_ocultas',
    title: 'El Mordisco Silencioso del 2% en Comisiones Anuales',
    category: 'estrategia_inversion',
    question: 'Inviertes $50,000 durante 30 años al 8% de rentabilidad bruta anual. El Fondo A cobra 2.0% de comisión anual de gestión, mientras que el Fondo B (Indexado) cobra solo 0.1%. ¿Cuánto dinero de diferencia habrá en tu cuenta al final?',
    options: [
      {
        id: 'opt_1',
        text: 'El Fondo B tendrá más de $150,000 adicionales, porque ese 1.9% de comisión anual acumulado durante 30 años devora casi la mitad de las ganancias potenciales.',
        isCorrect: true,
        explanation: '¡Impactante pero real! El interés compuesto funciona en ambos sentidos. Una comisión del 2% parece pequeña, pero a lo largo de décadas drena cientos de miles de dólares en ganancias potenciales que no se reinvierten.'
      },
      {
        id: 'opt_2',
        text: 'Solo habrá una diferencia insignificante de unos $500.',
        isCorrect: false,
        explanation: 'Falso. Las comisiones porcentuales anuales se cobran sobre el capital total acumulado, no solo sobre las ganancias iniciales.'
      },
      {
        id: 'opt_3',
        text: 'El Fondo A tendrá más dinero porque cobra más y por tanto debe ser mejor.',
        isCorrect: false,
        explanation: 'Completamente falso. Múltiples estudios de Morningstar y SPIVA demuestran que mayores comisiones están inversamente correlacionadas con el rendimiento neto a largo plazo.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_liquidez_vs_solvencia',
    title: 'Rico en Papel, Asfixiado en Efectivo (Liquidez vs. Solvencia)',
    category: 'flujo_caja',
    question: 'Una persona tiene una casa valorada en $400,000 sin hipoteca, pero su cuenta bancaria tiene $50 y sus ingresos mensuales son $0. Llega una factura médica urgente de $3,000. ¿Cuál es su problema?',
    options: [
      {
        id: 'opt_1',
        text: 'Tiene Solvencia Patrimonial (patrimonio neto alto), pero Cero Liquidez Inmediata para afrontar compromisos a corto plazo sin tener que malvender su activo.',
        isCorrect: true,
        explanation: '¡Diagnóstico contable perfecto! El patrimonio inmovilizado no paga emergencias inmediatas. Por eso es vital combinar activos de largo plazo con reservas líquidas en fondos monetarios o cuentas a la vista.'
      },
      {
        id: 'opt_2',
        text: 'No tiene ningún problema porque puede cortar un pedazo de la pared de la casa y entregárselo al médico.',
        isCorrect: false,
        explanation: 'Absurdo. Los inmuebles no son divisibles en medios de pago inmediatos.'
      },
      {
        id: 'opt_3',
        text: 'Es un millonario inmune a cualquier necesidad económica.',
        isCorrect: false,
        explanation: 'Incorrecto. Sin flujo de caja y sin liquidez, la persona enfrenta crisis financieras severas.'
      }
    ],
    points: 25
  },
  {
    id: 'riddle_pagate_primero',
    title: 'El Mandamiento de Oro: Págate a Ti Mismo Primero',
    category: 'habitos_financieros',
    question: '¿Cuál es la diferencia fundamental entre el enfoque de la persona promedio y el enfoque de un maestro de CifraFlow al recibir su salario mensual?',
    options: [
      {
        id: 'opt_1',
        text: 'El promedio: Ingresos - Gastos = Lo que sobre para ahorrar. El maestro CifraFlow: Ingresos - Inversión Automática (20%) = Dinero disponible para gastos.',
        isCorrect: true,
        explanation: '¡Filosofía central de la riqueza! Automatizar la transferencia a inversión el mismo día que ingresa la nómina garantiza que tu futuro financiero esté asegurado antes de que el dinero pueda gastarse en caprichos superfluos.'
      },
      {
        id: 'opt_2',
        text: 'El promedio ahorra en criptomonedas y el maestro CifraFlow gasta todo el primer día del mes.',
        isCorrect: false,
        explanation: 'Totalmente incorrecto.'
      },
      {
        id: 'opt_3',
        text: 'No hay ninguna diferencia; todo depende únicamente del signo zodiacal del inversor.',
        isCorrect: false,
        explanation: 'Falso. La disciplina y los sistemas automáticos de ahorro determinan los resultados financieros.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_ley_gresham',
    title: 'Ataque Anti-Devaluación #1: La Ley Monetaria de Gresham',
    category: 'devaluacion',
    question: 'Cuando la moneda de un país sufre devaluación acelerada por emisión descontrolada de billetes, ¿qué predice la Ley de Gresham sobre el comportamiento del público sabio?',
    options: [
      {
        id: 'opt_1',
        text: '«La moneda mala expulsa a la buena»: la gente gasta rápidamente los billetes que pierden valor y atesora los activos reales (oro, monedas duras, acciones e inmuebles) para blindar su patrimonio.',
        isCorrect: true,
        explanation: '¡Magistral! La Ley de Gresham explica que nadie quiere conservar papel que se devalúa; los individuos racionales convierten el flujo circulante débil en activos refugio y reservas de valor sólidas.'
      },
      {
        id: 'opt_2',
        text: 'La gente entierra los billetes devaluados porque mientras más viejos más valiosos se vuelven.',
        isCorrect: false,
        explanation: 'Falso. El papel moneda fiduciario pierde valor rápidamente con la hiperinflación.'
      },
      {
        id: 'opt_3',
        text: 'Los precios bajan a cero automáticamente para compensar la devaluación.',
        isCorrect: false,
        explanation: 'Totalmente erróneo. La devaluación encarece los precios de todos los bienes de forma desorbitada.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_cobertura_activos',
    title: 'Ataque Anti-Devaluación #2: Cobertura con Activos Productivos Reales',
    category: 'devaluacion',
    question: 'Si la moneda local se devalúa un 50% frente a la moneda internacional de referencia, ¿qué activo protege mejor tu poder de compra real a largo plazo?',
    options: [
      {
        id: 'opt_1',
        text: 'Empresas globales que facturan en múltiples monedas sólidas, bienes raíces y propiedad intelectual con demanda inelástica internacional.',
        isCorrect: true,
        explanation: '¡Impacto Crítico Impecable! Los activos productivos globales ajustan sus precios y generan dividendos o ingresos en divisas fuertes, neutralizando la pérdida de valor de la moneda local.'
      },
      {
        id: 'opt_2',
        text: 'Guardar fajos de billetes locales en billetes de denominación pequeña.',
        isCorrect: false,
        explanation: '¡Peligro! El efectivo en moneda débil es el primer activo en ser aniquilado por la devaluación.'
      },
      {
        id: 'opt_3',
        text: 'Comprar ropa de moda a crédito con cuotas variables sin límite.',
        isCorrect: false,
        explanation: 'Incorrecto. La ropa se deprecia y las cuotas variables se disparan con la tasa de interés.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_hiperinflacion_dca',
    title: 'Ataque Anti-Devaluación #3: Dollar-Cost Averaging en Monedas Duras',
    category: 'devaluacion',
    question: 'Para combatir la devaluación constante de la moneda de tu país, ¿cuál es la estrategia sistemática más disciplinada para un trabajador promedio?',
    options: [
      {
        id: 'opt_1',
        text: 'Convertir un porcentaje fijo de cada cobro inmediatamente en instrumentos indexados globales o activos duros mes a mes sin intentar predecir el tipo de cambio diario.',
        isCorrect: true,
        explanation: '¡Ataque Certero! El Dollar-Cost Averaging (DCA) hacia activos y fondos indexados elimina el estrés del tipo de cambio y promedia un precio de adquisición óptimo protegiendo los ahorros.'
      },
      {
        id: 'opt_2',
        text: 'Esperar a que la moneda se devalúe al 100% para comprar en el peor momento histórico.',
        isCorrect: false,
        explanation: 'Falso. Esperar sin protegerse causa pérdidas devastadoras de poder adquisitivo.'
      },
      {
        id: 'opt_3',
        text: 'Gastar el sueldo entero en lotería y juegos de azar.',
        isCorrect: false,
        explanation: 'Absurdo y destructivo para las finanzas.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_precios_relativos',
    title: 'Ataque Anti-Devaluación #4: El Secreto de los Precios Relativos',
    category: 'devaluacion',
    question: 'En un entorno de devaluación monetaria del 100%, una barra de pan pasa de costar $1 a $2, pero una hora de consultoría digital que antes cobrabas a $30 ahora se cobra a $60. ¿Qué le ocurrió a tu valor productivo real?',
    options: [
      {
        id: 'opt_1',
        text: 'Tu capacidad adquisitiva se mantuvo intacta (1 hora de trabajo sigue comprando exactamente 30 barras de pan), demostrando que tu habilidad profesional es un activo indexado a la realidad económica.',
        isCorrect: true,
        explanation: '¡Excelente comprensión macroeconómica! Tu capital humano y habilidades de alto valor son el escudo anti-devaluación supremo: su precio se reajusta automáticamente al valor real del mercado.'
      },
      {
        id: 'opt_2',
        text: 'Te volviste el doble de pobre porque 60 es un número mayor que 30.',
        isCorrect: false,
        explanation: 'Falso. Mirar solo los números nominales sin calcular la relación de precios reales es el error de la ilusión monetaria.'
      },
      {
        id: 'opt_3',
        text: 'El pan perdió todas sus calorías nutricionales.',
        isCorrect: false,
        explanation: 'Totalmente ridículo.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_oro_reserva',
    title: 'Ataque Anti-Devaluación #5: El Oro Físico y la Escasez Geológica',
    category: 'devaluacion',
    question: '¿Por qué el oro ha servido como reserva contra la devaluación durante más de 3,000 años frente al papel moneda de los imperios?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque posee escasez geológica tangible y ningún gobierno ni banco central puede imprimir oro por decreto ni diluir su existencia a coste cero.',
        isCorrect: true,
        explanation: '¡Exacto! El oro no puede ser creado de la nada por voluntad política; su producción anual es limitada y costosa, sirviendo como ancla milenaria contra la emisión fiduciaria desmedida.'
      },
      {
        id: 'opt_2',
        text: 'Porque el oro brilla en la oscuridad y asusta a los inspectores de impuestos.',
        isCorrect: false,
        explanation: 'Falso y absurdo.'
      },
      {
        id: 'opt_3',
        text: 'Porque los bancos regalan lingotes de oro con cada tarjeta de crédito.',
        isCorrect: false,
        explanation: 'Totalmente incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_inmuebles_indexados',
    title: 'Ataque Anti-Devaluación #6: Inmuebles con Contratos Indexados',
    category: 'devaluacion',
    question: '¿De qué forma un inmueble de alquiler defiende el poder de compra del inversor durante ciclos de devaluación prolongada?',
    options: [
      {
        id: 'opt_1',
        text: 'El valor del suelo y reposición se ajusta con la inflación, y los contratos de arrendamiento actualizan el canon periódicamente preservando el flujo de caja real.',
        isCorrect: true,
        explanation: '¡Golpe Certero! Los bienes raíces generan rentas que se recalculan periódicamente para reflejar el nuevo nivel de precios, defendiendo el retorno real de la inversión.'
      },
      {
        id: 'opt_2',
        text: 'Porque las casas no pagan impuestos cuando hay devaluación.',
        isCorrect: false,
        explanation: 'Falso. Los impuestos siguen existiendo.'
      },
      {
        id: 'opt_3',
        text: 'Porque el inquilino paga con caramelos de chocolate.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_ilusion_monetaria',
    title: 'Ataque Anti-Devaluación #7: La Trampa de la Ilusión Monetaria',
    category: 'devaluacion',
    question: 'Recibes un aumento de sueldo nominal del 20%, pero en ese mismo año la inflación y devaluación del país fueron del 32%. ¿Qué le ocurrió a tu salario real?',
    options: [
      {
        id: 'opt_1',
        text: 'Sufriste una pérdida de poder de compra real del 12%; celebrar el aumento nominal sin restar la inflación es caer en la trampa de la ilusión monetaria.',
        isCorrect: true,
        explanation: '¡Magistral! La riqueza real no se mide por la cantidad de billetes en tu cuenta, sino por la canasta de bienes y servicios que esos billetes pueden adquirir.'
      },
      {
        id: 'opt_2',
        text: 'Ganaste un 20% más de poder de compra porque tu saldo numérico en el banco aumentó.',
        isCorrect: false,
        explanation: 'Error fatal de ilusión monetaria.'
      },
      {
        id: 'opt_3',
        text: 'La inflación solo afecta a quienes compran frutas importadas.',
        isCorrect: false,
        explanation: 'Falso. La inflación impacta toda la cadena de suministros y servicios.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_ecuacion_fisher',
    title: 'Ataque Anti-Devaluación #8: La Ecuación de Fisher (Tasa Real vs. Nominal)',
    category: 'devaluacion',
    question: 'Un banco comercial te ofrece un certificado de depósito al 14% anual. Si la tasa de inflación y devaluación esperada es del 19%, ¿cuál es tu Tasa de Interés Real?',
    options: [
      {
        id: 'opt_1',
        text: 'Tasa Real Negativa de -5% (14% - 19% = -5%); el banco te devuelve más billetes pero con un poder de compra notablemente menor.',
        isCorrect: true,
        explanation: '¡Brillante cálculo financiero! Según la Ecuación de Fisher (Tasa Real ≈ Tasa Nominal - Inflación), rendimientos nominales altos con inflación mayor son trampas de empobrecimiento silencioso.'
      },
      {
        id: 'opt_2',
        text: 'Tasa Real Positiva del +33% sumando ambos porcentajes.',
        isCorrect: false,
        explanation: 'Matemáticamente incorrecto.'
      },
      {
        id: 'opt_3',
        text: 'Cero por ciento porque el banco asume toda la pérdida.',
        isCorrect: false,
        explanation: 'Falso. El depositante asume la pérdida de poder adquisitivo.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_pricing_power',
    title: 'Ataque Anti-Devaluación #9: Empresas con Poder de Fijación de Precios',
    category: 'devaluacion',
    question: 'Warren Buffett afirma que el mayor escudo contra la devaluación e inflación es invertir en empresas con «Pricing Power» (Poder de Fijación de Precios). ¿Qué significa?',
    options: [
      {
        id: 'opt_1',
        text: 'Empresas con marcas tan fuertes y servicios indispensables que pueden trasladar los aumentos de costes al precio final sin que sus clientes dejen de comprar.',
        isCorrect: true,
        explanation: '¡Impacto Devastador! Compañías con fuertes ventajas competitivas (Moats) no absorben la pérdida inflacionaria: incrementan sus precios y expanden sus márgenes operativos.'
      },
      {
        id: 'opt_2',
        text: 'Empresas que nunca cambian sus precios en 100 años a pesar de perder dinero.',
        isCorrect: false,
        explanation: 'Eso llevaría a la empresa a la quiebra inmediata.'
      },
      {
        id: 'opt_3',
        text: 'Empresas que solo venden productos mediante rifas públicas.',
        isCorrect: false,
        explanation: 'Totalmente erróneo.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_deuda_fija',
    title: 'Ataque Anti-Devaluación #10: Licuación de Deuda a Tasa Fija',
    category: 'devaluacion',
    question: 'Si tomaste una hipoteca a tasa fija del 6% anual en moneda local para comprar un activo productivo y sobreviene una devaluación del 40% anual, ¿qué ocurre con la deuda?',
    options: [
      {
        id: 'opt_1',
        text: 'La deuda se «licúa» en términos reales: pagas cuotas fijas con dinero que vale mucho menos cada año, mientras el valor de tu propiedad se revaloriza con la inflación.',
        isCorrect: true,
        explanation: '¡Apalancamiento Magistral! La deuda a tasa fija en monedas inflacionarias transfiere riqueza del acreedor (el prestamista) al deudor que utilizó el capital para adquirir activos reales.'
      },
      {
        id: 'opt_2',
        text: 'El banco cancela la hipoteca y te cobra en lingotes de plomo.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'La propiedad desaparece del registro catastral.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_multidivisa',
    title: 'Ataque Anti-Devaluación #11: Diversificación Multidivisa y Cuentas Globales',
    category: 'devaluacion',
    question: '¿Por qué mantener el 100% del patrimonio en la moneda del país de residencia es considerado un grave error de concentración de riesgo?',
    options: [
      {
        id: 'opt_1',
        text: 'Quedas totalmente expuesto al riesgo soberano y a la política monetaria local; diversificar en divisas fuertes y cuentas internacionales dispersa el riesgo de colapso.',
        isCorrect: true,
        explanation: '¡Precisión Táctica! Ningún inversor prudente ata todo su destino a una única divisa sujeta a decisiones de política fiscal o devaluaciones abruptas.'
      },
      {
        id: 'opt_2',
        text: 'Porque las monedas extranjeras están prohibidas por la física cuántica.',
        isCorrect: false,
        explanation: 'Totalmente ridículo.'
      },
      {
        id: 'opt_3',
        text: 'Porque un billete extranjero pesa diez veces más que un billete local.',
        isCorrect: false,
        explanation: 'Falso.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_mrr_global',
    title: 'Ataque Anti-Devaluación #12: Ingresos Recurrentes Globales (SaaS & Digital)',
    category: 'devaluacion',
    question: '¿Por qué un creador o desarrollador que factura suscripciones en divisas internacionales a clientes mundiales es inmune a la devaluación local?',
    options: [
      {
        id: 'opt_1',
        text: 'Sus ingresos provienen de mercados internacionales fuertes y su coste marginal de distribución es cero, mientras que sus gastos locales en moneda débil se vuelven relativamente más baratos.',
        isCorrect: true,
        explanation: '¡Ataque Crítico! El arbitraje de ingresos duros globales vs. costes locales débiles es una de las mayores ventajas asimétricas de la era digital.'
      },
      {
        id: 'opt_2',
        text: 'Porque el software no utiliza electricidad ni servidores.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      },
      {
        id: 'opt_3',
        text: 'Porque el dinero digital no paga compras de comida.',
        isCorrect: false,
        explanation: 'Falso.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_commodities',
    title: 'Ataque Anti-Devaluación #13: Materias Primas y Recursos Estratégicos',
    category: 'devaluacion',
    question: 'En episodios de hiperdevaluación monetaria, ¿por qué los productores de energía, granos y minerales conservan su valor fundamental?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque satisfacen necesidades biológicas y energéticas elementales de la población humana que no pueden sustituirse con discursos ni decretos fiduciarios.',
        isCorrect: true,
        explanation: '¡Lógica Económica Fundamental! Los commodities son bienes de valor intrínseco de uso directo; la comida y la energía se cotizan en precios reales a nivel global.'
      },
      {
        id: 'opt_2',
        text: 'Porque los granos de trigo se transforman espontáneamente en diamantes.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque los gobiernos prohíben comer durante las crisis.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_dividend_aristocrats',
    title: 'Ataque Anti-Devaluación #14: Aristócratas del Dividendo Creciente',
    category: 'devaluacion',
    question: '¿Qué característica convierte a las empresas «Dividend Aristocrats» en un refugio anti-inflacionario comprobado?',
    options: [
      {
        id: 'opt_1',
        text: 'Han incrementado su dividendo en efectivo de manera ininterrumpida durante 25+ años consecutivos, superando históricamente la inflación año tras año.',
        isCorrect: true,
        explanation: '¡Impacto Histórico! Una empresa que aumenta sus dividendos cada año a un ritmo superior a la devaluación monetaria proporciona un flujo de caja creciente que protege el estilo de vida del inversor.'
      },
      {
        id: 'opt_2',
        text: 'Pertenecen exclusivamente a familias de la realeza europea medieval.',
        isCorrect: false,
        explanation: 'Falso. Es una designación del mercado de valores para empresas con historial excepcional de dividendos.'
      },
      {
        id: 'opt_3',
        text: 'No pagan dividendos nunca para ahorrar dinero.',
        isCorrect: false,
        explanation: 'Incorrecto; pagan dividendos crecientes año con año.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_velocidad_dinero',
    title: 'Ataque Anti-Devaluación #15: La Velocidad de Circulación del Dinero',
    category: 'devaluacion',
    question: 'En la hiperinflación de Weimar en 1923 o en crisis modernas, ¿por qué la pérdida de confianza acelera la devaluación exponencialmente?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque la gente se deshace de los billetes en minutos para comprar cualquier bien real, disparando la velocidad del dinero y haciendo colapsar su valor en horas.',
        isCorrect: true,
        explanation: '¡Teoría Cuantitativa del Dinero aplicada! Cuando la velocidad de circulación explota porque nadie desea retener papel moneda, la devaluación se retroalimenta sin control.'
      },
      {
        id: 'opt_2',
        text: 'Porque las personas guardan los billetes en cajas fuertes y nadie los toca.',
        isCorrect: false,
        explanation: 'Falso. Si nadie gasta dinero, la velocidad cae, no explota.'
      },
      {
        id: 'opt_3',
        text: 'Porque el papel de los billetes se disuelve con el agua de lluvia.',
        isCorrect: false,
        explanation: 'Ridículo.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_billetes_dilucion',
    title: 'Ataque Anti-Devaluación #16: Dilución Monetaria por Impresión de Ceros',
    category: 'devaluacion',
    question: 'Cuando un gobierno emite billetes con denominaciones de 500,000 o 1,000,000 de unidades, ¿qué significa esto matemáticamente para tu ahorro en efectivo?',
    options: [
      {
        id: 'opt_1',
        text: 'Cada nueva unidad emitida diluye tu porcentaje de participación sobre la riqueza total de la economía: tu ahorro en efectivo fue confiscado por dilución monetaria.',
        isCorrect: true,
        explanation: '¡Axioma Monetario Implacable! Imprimir billetes no crea fábricas, trigo ni tecnología; solo reparte la misma producción existente entre una masa monetaria más abultada, encareciendo todo.'
      },
      {
        id: 'opt_2',
        text: 'Todos los ciudadanos se convirtieron en millonarios con el doble de riqueza real.',
        isCorrect: false,
        explanation: 'Totalmente falso. Los precios suben en la misma o mayor proporción.'
      },
      {
        id: 'opt_3',
        text: 'Los cajeros automáticos se vuelven más inteligentes.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_arbitraje_geo',
    title: 'Ataque Anti-Devaluación #17: Arbitraje Geográfico Financiero',
    category: 'devaluacion',
    question: '¿En qué consiste la estrategia de Arbitraje Geográfico para una persona que trabaja en la economía del conocimiento?',
    options: [
      {
        id: 'opt_1',
        text: 'Prestar servicios profesionales o vender productos facturando en moneda dura internacional y residir en un entorno con bajo coste de vida, maximizando la tasa de ahorro real.',
        isCorrect: true,
        explanation: '¡Estrategia de CifraFlow Moderna! Permite ahorrar e invertir porcentajes de más del 50-70% del ingreso bruto en activos productivos globales.'
      },
      {
        id: 'opt_2',
        text: 'Comprar boletos de avión con tarjetas de crédito vencidas.',
        isCorrect: false,
        explanation: 'Falso e ilegal.'
      },
      {
        id: 'opt_3',
        text: 'Coleccionar mapas geográficos antiguos.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_fondos_globales',
    title: 'Ataque Anti-Devaluación #18: Fondos Indexados Globales (MSCI World / S&P 500)',
    category: 'devaluacion',
    question: '¿Por qué invertir en un ETF indexado a las principales 1,500 empresas del mundo es una de las mejores coberturas contra la devaluación?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque posees una parte del motor productivo global, respaldado por innovación, patentes, activos físicos y ventas en cientos de países con monedas sólidas.',
        isCorrect: true,
        explanation: '¡Blindaje Patrimonial Supremo! La economía mundial continúa innovando y produciendo bienes esenciales, superando con creces la pérdida de valor de cualquier moneda individual.'
      },
      {
        id: 'opt_2',
        text: 'Porque el fondo indexado está garantizado por la lotería nacional.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque las empresas mundiales no necesitan vender nada para ganar dinero.',
        isCorrect: false,
        explanation: 'Totalmente erróneo.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_liquidez_ociosa',
    title: 'Ataque Anti-Devaluación #19: El Coste Fatal de la Liquidez Ociosa',
    category: 'devaluacion',
    question: 'Dejas $15,000 en una cuenta corriente al 0% durante 6 años con una devaluación e inflación media del 12% anual. ¿Qué ocurrió con ese capital?',
    options: [
      {
        id: 'opt_1',
        text: 'Por la Regla del 72 (72 / 12 = 6 años), tu dinero perdió la mitad de su poder de compra real (50% de evaporación patrimonial) sin haber hecho un solo gasto.',
        isCorrect: true,
        explanation: '¡Matemática Financiera Cruda! No invertir la liquidez excedente en instrumentos con rendimiento es asumir una pérdida segura del 100% de la tasa de inflación acumulada.'
      },
      {
        id: 'opt_2',
        text: 'Tu dinero se duplicó porque el banco guarda los billetes con cuidado.',
        isCorrect: false,
        explanation: 'Falso. El dinero al 0% pierde poder adquisitivo.'
      },
      {
        id: 'opt_3',
        text: 'La cuenta corriente es inmune a las leyes de la matemática.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 30
  },
  {
    id: 'riddle_devaluacion_propiedad_intelectual',
    title: 'Ataque Anti-Devaluación #20: Propiedad Intelectual, Marcas y Regalías',
    category: 'devaluacion',
    question: '¿Por qué la propiedad intelectual (música, software, libros, patentes de invención) es un activo resistente a la devaluación?',
    options: [
      {
        id: 'opt_1',
        text: 'Son activos intangibles que se comercializan globalmente, generan regalías en múltiples monedas y sus precios de licencia se cotizan según el mercado internacional.',
        isCorrect: true,
        explanation: '¡Golpe al Villano! La creación de activos intelectuales protegidos por derechos de autor y patentes genera flujos pasivos transfronterizos no diluibles por bancos locales.'
      },
      {
        id: 'opt_2',
        text: 'Porque las patentes se imprimen en papel de oro macizo.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque las canciones solo se pueden escuchar en un solo país.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_inventario_activo',
    title: 'Ataque Anti-Devaluación #21: Transformar Liquidez en Inventario de Rotación',
    category: 'devaluacion',
    question: 'Un empresario sabe que el tipo de cambio oficial subirá 30% la próxima semana. ¿Qué movimiento de tesorería es el más inteligente?',
    options: [
      {
        id: 'opt_1',
        text: 'Adelantar compras de mercadería de alta rotación e insumos a precios actuales antes de que los proveedores aumenten sus listas de precios.',
        isCorrect: true,
        explanation: '¡Estrategia Comercial Práctica! El inventario físico de alta demanda mantiene su valor real de reposición y se venderá a los nuevos precios del mercado tras la devaluación.'
      },
      {
        id: 'opt_2',
        text: 'Quedarse con el efectivo en la caja registradora esperando que los precios bajen.',
        isCorrect: false,
        explanation: 'Falso. El efectivo en caja perderá 30% de su capacidad de compra de insumos.'
      },
      {
        id: 'opt_3',
        text: 'Regalar todo el stock a la competencia.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 35
  },
  {
    id: 'riddle_devaluacion_fiat_vs_hard_assets',
    title: 'Ataque Anti-Devaluación #22: Dinero Fiduciario vs. Activos No Diluibles',
    category: 'devaluacion',
    question: '¿Cuál es la regla fundamental de la historia monetaria sobre las monedas fiduciarias sin respaldo y los activos de oferta limitada?',
    options: [
      {
        id: 'opt_1',
        text: 'A largo plazo, todo papel moneda con oferta ilimitada tiende a perder valor frente a activos con escasez matemática o real (empresas líderes, suelo y reservas de valor).',
        isCorrect: true,
        explanation: '¡Postulado Definitivo de CifraFlow! La disciplina financiera consiste en usar el dinero como medio de intercambio temporal y trasladar el fruto del trabajo a activos productivos reales.'
      },
      {
        id: 'opt_2',
        text: 'El papel moneda fiduciario siempre dura millones de años sin perder un solo centavo.',
        isCorrect: false,
        explanation: 'Históricamente falso; todas las monedas fiduciarias han sufrido devaluaciones continuas.'
      },
      {
        id: 'opt_3',
        text: 'Los activos reales dejan de existir cuando los gobiernos cierran por vacaciones.',
        isCorrect: false,
        explanation: 'Totalmente ridículo.'
      }
    ],
    points: 35
  }
];


