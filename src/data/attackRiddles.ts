import { FinancialRiddle } from '../types';

export const ATTACK_RIDDLES: FinancialRiddle[] = [
  {
    id: 'attack_riddle_1',
    title: 'Asertijo de Ataque #1: La Ley Monetaria de Gresham',
    category: 'devaluacion',
    question: 'Cuando un país sufre devaluación acelerada por emisión descontrolada de billetes, ¿qué predice la Ley de Gresham sobre el comportamiento del público sabio?',
    options: [
      {
        id: 'opt_1',
        text: '«La moneda mala expulsa a la buena»: la gente se desprende rápido de los billetes que pierden valor y atesora activos reales (oro, monedas duras, acciones e inmuebles) para blindar su patrimonio.',
        isCorrect: true,
        explanation: '¡Impacto Magistral! La Ley de Gresham enseña que nadie atesora papel que se devalúa; los agentes económicos racionales trasladan su liquidez a reservas de valor duraderas.'
      },
      {
        id: 'opt_2',
        text: 'La gente entierra el papel moneda devaluado porque con los años se vuelve una reliquia millonaria.',
        isCorrect: false,
        explanation: 'Falso. El papel moneda fiduciario pierde valor rápidamente ante la hiperinflación.'
      },
      {
        id: 'opt_3',
        text: 'Los precios en el supermercado bajan a cero de forma automática para balancear la devaluación.',
        isCorrect: false,
        explanation: 'Totalmente falso. La devaluación multiplica los precios nominales.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_2',
    title: 'Asertijo de Ataque #2: Cobertura con Activos Productivos Reales',
    category: 'activos_productivos',
    question: 'Si la moneda local se devalúa un 50% frente a la moneda de reserva global, ¿qué activo protege mejor tu poder adquisitivo real a largo plazo?',
    options: [
      {
        id: 'opt_1',
        text: 'Empresas productivas con presencia global que facturan en divisas fuertes, bienes raíces alquilados y derechos de propiedad intelectual.',
        isCorrect: true,
        explanation: '¡Golpe Crítico! Los activos productivos ajustan sus precios al ritmo de la inflación y generan flujos en monedas sólidas, neutralizando la pérdida de valor local.'
      },
      {
        id: 'opt_2',
        text: 'Atesorar fajos de billetes locales debajo del colchón en fajos pequeños.',
        isCorrect: false,
        explanation: 'Peligro absoluto. El efectivo en moneda débil es el primer activo en ser pulverizado por la devaluación.'
      },
      {
        id: 'opt_3',
        text: 'Contratar créditos al consumo con tarjetas de crédito a tasa variable.',
        isCorrect: false,
        explanation: 'Falso. Las tasas variables se disparan tras una devaluación y estrangulan el flujo de caja.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_3',
    title: 'Asertijo de Ataque #3: Dollar-Cost Averaging en Moneda Fuerte',
    category: 'estrategia_inversion',
    question: 'En lugar de intentar adivinar el piso o techo del tipo de cambio, ¿por qué la técnica del Dollar-Cost Averaging (DCA) es un ataque letal contra la especulación?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque invierte una cantidad fija en intervalos regulares, promediando el precio de compra y eliminando el estrés emocional y los sesgos psicológicos del mercado.',
        isCorrect: true,
        explanation: '¡Certero! El DCA disciplina al inversor, compra más unidades cuando los activos corrigen y reduce la volatilidad del portafolio en el tiempo.'
      },
      {
        id: 'opt_2',
        text: 'Porque garantiza que siempre compres en el punto exacto más bajo de la historia cada mes.',
        isCorrect: false,
        explanation: 'Incorrecto. Nadie puede predecir el punto mínimo exacto de forma consistente.'
      },
      {
        id: 'opt_3',
        text: 'Porque triplica la tasa de interés del banco central automáticamente.',
        isCorrect: false,
        explanation: 'Falso. El DCA es una estrategia de asignación periódica de capital, no una tasa bancaria.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_4',
    title: 'Asertijo de Ataque #4: El Secreto de los Precios Relativos',
    category: 'inflacion',
    question: 'Durante una escalada inflacionaria de precios, ¿qué fenómeno distorsiona las decisiones económicas de los consumidores desinformados?',
    options: [
      {
        id: 'opt_1',
        text: 'La pérdida de referencia en los precios relativos: no se sabe si un producto subió porque es escaso o simplemente porque el valor del dinero se está evaporando.',
        isCorrect: true,
        explanation: '¡Impacto Pedagógico! La inflación destruye el sistema de señales de precios en la economía, provocando malas decisiones de consumo y compras precipitadas.'
      },
      {
        id: 'opt_2',
        text: 'Que los productos se vuelven invisibles en los estantes de las tiendas.',
        isCorrect: false,
        explanation: 'Absurdo.'
      },
      {
        id: 'opt_3',
        text: 'Que el banco central reembolsa la diferencia de precios a fin de año.',
        isCorrect: false,
        explanation: 'Falso. Ninguna entidad estatal compensa la inflación del bolsillo.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_5',
    title: 'Asertijo de Ataque #5: El Oro Físico y la Escasez Geológica',
    category: 'activos_refugio',
    question: '¿Por qué el oro físico ha sobrevivido durante más de 5,000 años frente al colapso de miles de monedas de papel impresas por imperios y gobiernos?',
    options: [
      {
        id: 'opt_1',
        text: 'Tiene escasez geológica inmutable, alta densidad de valor, no requiere mantenimiento y no depende de la promesa ni del balance financiero de ningún emisor.',
        isCorrect: true,
        explanation: '¡Escudo y Martillo! El oro carece de riesgo de contraparte: ningún político o banco central puede imprimir lingotes de oro por decreto gubernamental.'
      },
      {
        id: 'opt_2',
        text: 'Porque las monedas de oro tienen poderes mágicos de reproducción espontánea.',
        isCorrect: false,
        explanation: 'Falso. El oro es un metal precioso escaso en la corteza terrestre.'
      },
      {
        id: 'opt_3',
        text: 'Porque el oro solo se utiliza como adorno sin ninguna función monetaria histórica.',
        isCorrect: false,
        explanation: 'Históricamente falso; ha sido la reserva monetaria por excelencia de la humanidad.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_6',
    title: 'Asertijo de Ataque #6: Inmuebles con Contratos Indexados al IPC',
    category: 'bienes_raices',
    question: 'Si eres propietario de un inmueble alquilado en época de alta inflación, ¿cuál es la cláusula contractual esencial para evitar la pérdida de rentabilidad?',
    options: [
      {
        id: 'opt_1',
        text: 'Cláusula de ajuste trimestral o semestral indexada al índice de precios al consumidor (IPC) o a una canasta de monedas de reserva.',
        isCorrect: true,
        explanation: '¡Golpe al Villano Inflacionario! Un contrato que no se indexa al IPC condena al arrendador a recibir un pago mensual que compra cada mes menos alimentos y bienes.'
      },
      {
        id: 'opt_2',
        text: 'Cobrar el alquiler en cupones de descuento no transferibles.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      },
      {
        id: 'opt_3',
        text: 'Fijar el mismo monto en moneda local por 10 años consecutivos sin cambios.',
        isCorrect: false,
        explanation: 'Peligro mortal. En economías inflacionarias, un alquiler fijo se diluye casi por completo.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_7',
    title: 'Asertijo de Ataque #7: La Trampa de la Ilusión Monetaria',
    category: 'psicologia_dinero',
    question: 'Tu jefe te anuncia un aumento salarial del 15% este año, pero la inflación acumulada del mismo periodo fue del 25%. ¿Qué ocurrió realmente con tu riqueza?',
    options: [
      {
        id: 'opt_1',
        text: 'Caíste en la Ilusión Monetaria: nominalmente tienes más billetes, pero tu poder de compra real disminuyó aproximadamente un 10% frente al costo de vida.',
        isCorrect: true,
        explanation: '¡Demolición de la Ilusión! La inflación se come los incrementos salariales que no superan la tasa real de encarecimiento de la canasta básica.'
      },
      {
        id: 'opt_2',
        text: 'Eres un 15% más rico porque lo importante es la cantidad de cifras en la cuenta.',
        isCorrect: false,
        explanation: 'Falso. Lo que importa es lo que ese dinero puede comprar en bienes y servicios.'
      },
      {
        id: 'opt_3',
        text: 'El dinero se duplicó gracias a un bono gubernamental secreto.',
        isCorrect: false,
        explanation: 'Totalmente incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_8',
    title: 'Asertijo de Ataque #8: La Ecuación de Fisher (Tasa Real vs. Tasa Nominal)',
    category: 'macroeconomia',
    question: 'Un banco te ofrece un plazo fijo que paga un 40% anual de interés, pero la inflación proyectada es del 45% anual. Según la Ecuación de Fisher, ¿cuál es tu rendimiento real?',
    options: [
      {
        id: 'opt_1',
        text: 'Un rendimiento real negativo del -5% anual: al cabo de un año tu capital acumulado comprará menos bienes que al comenzar la inversión.',
        isCorrect: true,
        explanation: '¡Axioma Implacable! Tasa Real ≈ Tasa Nominal - Inflación. Una tasa del 40% frente al 45% de inflación significa que pierdes un 5% de poder adquisitivo neto.'
      },
      {
        id: 'opt_2',
        text: 'Un rendimiento positivo neto del 40%, porque el banco nunca pierde.',
        isCorrect: false,
        explanation: 'Falso. La tasa nominal no descuenta la pérdida de valor por inflación.'
      },
      {
        id: 'opt_3',
        text: 'Un 85% sumando ambas tasas como beneficio acumulado.',
        isCorrect: false,
        explanation: 'Error matemático grave.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_9',
    title: 'Asertijo de Ataque #9: Empresas con Foso Competitivo (Pricing Power)',
    category: 'acciones_inversion',
    question: 'Warren Buffett afirma que la mejor arma contra la inflación es poseer empresas con "Poder de Fijación de Precios" (Pricing Power). ¿Por qué?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque pueden trasladar los aumentos de costos a los precios finales de sus productos sin perder clientela ni cuota de mercado gracias a su fidelidad y ventajas competitivas.',
        isCorrect: true,
        explanation: '¡Impacto Quirúrgico! Negocios con marcas líderes, licencias esenciales o productos indispensables no sufren compresión de márgenes ante la subida de materias primas.'
      },
      {
        id: 'opt_2',
        text: 'Porque imprimen su propio dinero en el sótano de sus oficinas corporativas.',
        isCorrect: false,
        explanation: 'Totalmente absurdo.'
      },
      {
        id: 'opt_3',
        text: 'Porque nunca pagan impuestos en ningún país del planeta.',
        isCorrect: false,
        explanation: 'Falso. Su poder radica en la lealtad del cliente y la demanda inelástica de sus productos.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_10',
    title: 'Asertijo de Ataque #10: Licuación Estratégica de Deuda a Tasa Fija',
    category: 'apalancamiento',
    question: '¿En qué caso particular la inflación acelerada beneficia a quien tomó un préstamo a largo plazo para adquirir un activo productivo?',
    options: [
      {
        id: 'opt_1',
        text: 'Cuando la tasa del crédito es fija y muy baja: las cuotas mensuales se pagan con billetes cada vez más devaluados mientras el activo productivo sube de precio en el mercado.',
        isCorrect: true,
        explanation: '¡Apalancamiento Magistral! La deuda fija se "licúa" en términos reales frente a la subida de los ingresos y el valor del bien inmueble o maquinaria adquirida.'
      },
      {
        id: 'opt_2',
        text: 'Cuando el banco decide perdonar la deuda a todos sus clientes por amabilidad.',
        isCorrect: false,
        explanation: 'Falso. Los bancos ejecutan garantías si se deja de pagar la cuota pactada.'
      },
      {
        id: 'opt_3',
        text: 'Cuando la deuda está atada a tasas de usura variables sin límite.',
        isCorrect: false,
        explanation: 'Peligro. Las tasas variables aumentan exponencialmente y destruyen al deudor.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_11',
    title: 'Asertijo de Ataque #11: Cuentas Custodia Multidivisa en el Exterior',
    category: 'diversificacion',
    question: '¿Cuál es la ventaja de operar con cuentas de corretaje o custodia segregada en jurisdicciones triple A reconocidas internacionalmente?',
    options: [
      {
        id: 'opt_1',
        text: 'Protección contra el riesgo soberano local, acceso a mercados globales de acciones y bonos en moneda dura, y blindaje de los títulos a nombre del inversor individual.',
        isCorrect: true,
        explanation: '¡Muralla Defensiva! La diversificación jurisdiccional evita que contingencias bancarias locales o cepos cambiarios confisquen o congelen los ahorros de toda una vida.'
      },
      {
        id: 'opt_2',
        text: 'Que los cajeros automáticos del exterior regalan dinero en efectivo los fines de semana.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Que no es necesario declarar operaciones contables legítimas.',
        isCorrect: false,
        explanation: 'Incorrecto. La transparencia y el cumplimiento normativo son la base de la custodia segura.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_12',
    title: 'Asertijo de Ataque #12: Negocios de Coste Marginal Cero y Cobro Global',
    category: 'coste_marginal',
    question: '¿Por qué un producto de software SaaS o un curso digital alojado en la nube es un ataque letal contra la recesión y las devaluaciones locales?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque atender a un nuevo cliente cuesta casi cero dólares adicionales y puede venderse simultáneamente en 150 países en monedas duras sin inventario físico vulnerable.',
        isCorrect: true,
        explanation: '¡Golpe de Coste Marginal Cero! La escalabilidad digital infinita permite generar ingresos globales con márgenes brutos superiores al 85% sin coste de transporte.'
      },
      {
        id: 'opt_2',
        text: 'Porque los servidores de internet no necesitan energía eléctrica para funcionar.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque el software solo se puede usar una vez y luego se evapora.',
        isCorrect: false,
        explanation: 'Totalmente falso.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_13',
    title: 'Asertijo de Ataque #13: Materias Primas Críticas y Commodities Energéticos',
    category: 'commodities',
    question: 'En periodos de shocks de oferta geopolítica e inflación de costos, ¿por qué los productores de energía y materias primas suelen tener rendimientos superiores?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque suministran insumos indispensables para la supervivencia de la civilización y sus precios de venta suben directamente con el encarecimiento global.',
        isCorrect: true,
        explanation: '¡Fuerza Básica! La energía, los alimentos y los minerales no pueden ser sustituidos en el corto plazo; quien los produce captura los flujos directos del mercado.'
      },
      {
        id: 'opt_2',
        text: 'Porque las materias primas no obedecen a la ley de oferta y demanda.',
        isCorrect: false,
        explanation: 'Falso. Obedecen con rigurosidad matemática a la oferta y demanda física.'
      },
      {
        id: 'opt_3',
        text: 'Porque los barriles de petróleo son gratuitos de extraer.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_14',
    title: 'Asertijo de Ataque #14: Aristócratas del Dividendo Creciente',
    category: 'dividendos',
    question: '¿Qué es una empresa "Aristócrata del Dividendo" y por qué protege a los jubilados e inversores en periodos inflacionarios?',
    options: [
      {
        id: 'opt_1',
        text: 'Una compañía que ha incrementado su dividendo en efectivo cada año consecutivo durante más de 25 años, superando la inflación con flujos de caja reales.',
        isCorrect: true,
        explanation: '¡Flujo de Caja Imbatible! Los dividendos crecientes provienen de modelos de negocio probados en múltiples ciclos económicos y devaluaciones.'
      },
      {
        id: 'opt_2',
        text: 'Una empresa fundada únicamente por miembros de familias de la realeza europea.',
        isCorrect: false,
        explanation: 'Falso. Es una designación financiera técnica de Wall Street para empresas con balances extraordinarios.'
      },
      {
        id: 'opt_3',
        text: 'Una corporación que retiene el 100% de las ganancias y nunca paga a sus accionistas.',
        isCorrect: false,
        explanation: 'Al revés: pagan y elevan sus dividendos de forma ininterrumpida.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_15',
    title: 'Asertijo de Ataque #15: La Velocidad de Circulación del Dinero',
    category: 'teoria_monetaria',
    question: 'Según la Ecuación Cuantitativa de Fisher (M × V = P × Y), ¿qué ocurre cuando la población pierde la confianza en la moneda y gasta los billetes al instante?',
    options: [
      {
        id: 'opt_1',
        text: 'La velocidad de circulación (V) se dispara, acelerando la subida de precios (P) incluso si el banco central frena temporalmente la emisión de nuevos billetes.',
        isCorrect: true,
        explanation: '¡Impacto Teórico Magistral! Cuando el dinero se convierte en una "papa caliente" que nadie quiere conservar más de unas horas, la hiperinflación se autoalimenta.'
      },
      {
        id: 'opt_2',
        text: 'Los precios bajan automáticamente a la mitad porque el dinero se mueve muy rápido.',
        isCorrect: false,
        explanation: 'Totalmente falso.'
      },
      {
        id: 'opt_3',
        text: 'La velocidad del dinero se congela a cero absoluto.',
        isCorrect: false,
        explanation: 'Falso. Todo lo contrario: la velocidad se multiplica drásticamente.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_16',
    title: 'Asertijo de Ataque #16: Dilución Monetaria por Impresión de Billetes',
    category: 'emision_monetaria',
    question: 'Si una economía tiene 1,000 unidades de bienes y circulan $1,000 billetes, cada bien cuesta $1. Si el gobierno duplica los billetes a $2,000 sin producir un solo bien más, ¿qué pasa?',
    options: [
      {
        id: 'opt_1',
        text: 'El precio promedio de los bienes se duplica a $2: no se creó riqueza nueva, solo se diluyó el poder adquisitivo de los ahorristas que tenían dinero guardado.',
        isCorrect: true,
        explanation: '¡Verdad Matemática de CifraFlow! Imprimir billetes no crea pan, casas ni medicinas; solo diluye la proporción de riqueza que representa cada billete existente.'
      },
      {
        id: 'opt_2',
        text: 'La población es el doble de rica y tiene el doble de bienes disponibles en el mercado.',
        isCorrect: false,
        explanation: 'Falso. La riqueza real se mide en bienes y servicios producidos, no en papel pintado.'
      },
      {
        id: 'opt_3',
        text: 'Los precios se mantienen intactos por decreto oficial.',
        isCorrect: false,
        explanation: 'Falso. La ley económica de la oferta y la demanda prevalece sobre los decretos.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_17',
    title: 'Asertijo de Ataque #17: Arbitraje Geográfico y Salarios Globales',
    category: 'capital_humano',
    question: '¿En qué consiste la estrategia de "Arbitraje Geográfico" practicada por profesionales digitales ante la devaluación de sus países de residencia?',
    options: [
      {
        id: 'opt_1',
        text: 'Generar ingresos remotos en divisas fuertes (dólares, euros) mientras se reside en un país con costos de vida locales accesibles, multiplicando el poder de ahorro real.',
        isCorrect: true,
        explanation: '¡Ataque Asimétrico de Alto IQ! Cobrar en moneda fuerte y gastar en moneda local convierte la devaluación en una ventaja competitiva de acumulación de capital.'
      },
      {
        id: 'opt_2',
        text: 'Comprar boletos de avión con tarjetas clonadas para viajar sin pagar.',
        isCorrect: false,
        explanation: 'Ilegal y falso.'
      },
      {
        id: 'opt_3',
        text: 'Trabajar gratis en el extranjero para ganar puntos de experiencia.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_18',
    title: 'Asertijo de Ataque #18: Fondos Indexados Globales (S&P 500 y MSCI World)',
    category: 'fondos_indexados',
    question: '¿Por qué comprar un fondo indexado diversificado a nivel mundial supera a la mayoría de los fondos de inversión activos gestionados por bancos tradicionales?',
    options: [
      {
        id: 'opt_1',
        text: 'Cobra comisiones ultra bajas (0.05% a 0.15%), posee automáticamente las mayores empresas innovadoras del planeta y se beneficia del crecimiento económico global.',
        isCorrect: true,
        explanation: '¡Axioma de Bogle y Buffett! A 15-20 años, más del 90% de los gestores activos son derrotados por los fondos indexados debido al lastre de las altas comisiones.'
      },
      {
        id: 'opt_2',
        text: 'Porque el fondo indexado está asegurado con billetes de lotería premiados.',
        isCorrect: false,
        explanation: 'Absurdo.'
      },
      {
        id: 'opt_3',
        text: 'Porque los bancos regalan el dinero de los fondos indexados a quien lo pida.',
        isCorrect: false,
        explanation: 'Falso.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_19',
    title: 'Asertijo de Ataque #19: El Coste Devastador de la Liquidez Ociosa',
    category: 'coste_oportunidad',
    question: 'Una persona mantiene $50,000 en una cuenta corriente al 0% de interés durante 10 años con una inflación promedio anual del 5%. ¿Qué le sucedió a su capital?',
    options: [
      {
        id: 'opt_1',
        text: 'Perdió cerca del 40% de su poder adquisitivo real: nominalmente sigue viendo los mismos $50,000, pero hoy solo compra lo que compraban $30,000 una década atrás.',
        isCorrect: true,
        explanation: '¡El Ladrón Silencioso Derrotado! El dinero ocioso no rinde ni se protege; dejar capital en cuentas al 0% es una garantía matemática de empobrecimiento.'
      },
      {
        id: 'opt_2',
        text: 'Ganó un 50% extra de rendimiento gracias a la fidelidad bancaria.',
        isCorrect: false,
        explanation: 'Falso. La cuenta al 0% no generó ningún interés.'
      },
      {
        id: 'opt_3',
        text: 'El dinero se multiplicó por tres por arte de magia.',
        isCorrect: false,
        explanation: 'Totalmente falso.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_20',
    title: 'Asertijo de Ataque #20: Propiedad Intelectual, Marcas y Regalías',
    category: 'activos_intangibles',
    question: '¿Por qué los activos intangibles protegidos por patentes, software y derechos de autor son un escudo superior frente a shocks económicos?',
    options: [
      {
        id: 'opt_1',
        text: 'Se comercializan transfronterizamente, no tienen límites físicos de producción, sus precios de licencia se cotizan globalmente y generan regalías perpetuas.',
        isCorrect: true,
        explanation: '¡Flujo Inmune Desatado! La propiedad intelectual genera ingresos pasivos recurrentes sin sufrir mermas físicas, aranceles aduaneros ni devaluaciones geográficas.'
      },
      {
        id: 'opt_2',
        text: 'Porque las patentes se imprimen en papel de oro macizo.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque las canciones y el software solo se pueden consumir en un solo país.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_21',
    title: 'Asertijo de Ataque #21: Transformar Liquidez en Inventario de Rotación',
    category: 'comercio',
    question: 'Un comerciante sabe que el tipo de cambio oficial subirá drásticamente la próxima semana. ¿Cuál es el movimiento de tesorería más inteligente?',
    options: [
      {
        id: 'opt_1',
        text: 'Adelantar compras de mercadería de alta rotación e insumos no perecederos a precios actuales antes de que los distribuidores aumenten sus listas de precios.',
        isCorrect: true,
        explanation: '¡Estrategia Comercial Práctica! El stock físico de alta demanda retiene su valor de reposición real y se comercializará con los nuevos precios de reposición.'
      },
      {
        id: 'opt_2',
        text: 'Quedarse con el efectivo quieto en la caja fuerte esperando que las cosas bajen de precio.',
        isCorrect: false,
        explanation: 'Peligro. El efectivo en caja perderá gran parte de su poder de reposición de mercadería.'
      },
      {
        id: 'opt_3',
        text: 'Regalar todo el inventario a la competencia para no pagar bodega.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_22',
    title: 'Asertijo de Ataque #22: Dinero Fiduciario vs. Activos Reales No Diluibles',
    category: 'preservacion_patrimonial',
    question: '¿Cuál es la lección definitiva de la historia monetaria sobre las monedas fiduciarias sin respaldo y los activos escasos?',
    options: [
      {
        id: 'opt_1',
        text: 'A largo plazo, todo papel moneda con emisión discrecional ilimitada tiende a cero frente a activos con escasez matemática o geológica y capacidad productiva.',
        isCorrect: true,
        explanation: '¡Postulado Supremo de CifraFlow! El dinero es solo un vehículo temporal de cambio; la verdadera libertad financiera radica en poseer activos productivos duraderos.'
      },
      {
        id: 'opt_2',
        text: 'El papel moneda fiduciario dura millones de años sin perder valor jamás.',
        isCorrect: false,
        explanation: 'Históricamente falso; miles de monedas gubernamentales han desaparecido en la historia.'
      },
      {
        id: 'opt_3',
        text: 'Los activos reales se destruyen cuando el banco central imprime billetes.',
        isCorrect: false,
        explanation: 'Falso. Los activos reales permanecen y conservan su valor intrínseco.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_23',
    title: 'Asertijo de Ataque #23: Separación Patrimonial y Fideicomiso Ciego',
    category: 'blindaje_legal',
    question: '¿Por qué los empresarios e inversores avanzados separan sus activos operativos de su patrimonio familiar mediante personas jurídicas o fideicomisos?',
    options: [
      {
        id: 'opt_1',
        text: 'Aísla el patrimonio personal de contingencias laborales o comerciales del negocio, impidiendo que una demanda comercial afecte los ahorros y la vivienda familiar.',
        isCorrect: true,
        explanation: '¡Muralla Jurídica Inquebrantable! La separación patrimonial legal evita el contagio financiero y salvaguarda el bienestar de futuras generaciones.'
      },
      {
        id: 'opt_2',
        text: 'Para no tener que registrar ningún comprobante ante los registros públicos.',
        isCorrect: false,
        explanation: 'Falso. Los fideicomisos y sociedades son estructuras legales reguladas y transparentes.'
      },
      {
        id: 'opt_3',
        text: 'Para pagar deudas con monedas de chocolate.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_24',
    title: 'Asertijo de Ataque #24: Tasa de Descuento y Valor Presente Neto (VPN)',
    category: 'finanzas_corporativas',
    question: 'Si te ofrecen recibir $10,000 dentro de 5 años en un entorno con 10% de inflación y tasa libre de riesgo, ¿cuánto vale ese dinero hoy?',
    options: [
      {
        id: 'opt_1',
        text: 'Aproximadamente $6,209 hoy: el dinero en el futuro vale menos debido al costo de oportunidad y la inflación acumulada (Valor Presente Neto descontado).',
        isCorrect: true,
        explanation: '¡Matemática Financiera Pura! $1 hoy vale más que $1 mañana porque el dinero presente puede invertirse inmediatamente para generar rendimientos compuestos.'
      },
      {
        id: 'opt_2',
        text: 'Vale exactamente $10,000 porque un dólar siempre es un dólar sin importar el tiempo.',
        isCorrect: false,
        explanation: 'Falso. Ignora por completo el valor del dinero en el tiempo.'
      },
      {
        id: 'opt_3',
        text: 'Vale $50,000 porque los años multiplican el dinero automáticamente.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_25',
    title: 'Asertijo de Ataque #25: Bonos Reales Indexados a Inflación (TIPS)',
    category: 'renta_fija',
    question: '¿Cómo protegen los Bonos Soberanos Protegidos contra la Inflación (TIPS) a un inversor conservador en épocas de alza de precios descontrolada?',
    options: [
      {
        id: 'opt_1',
        text: 'Ajustan su capital principal de acuerdo a la variación del IPC, garantizando que tanto los cupones de interés como el principal mantengan su poder adquisitivo real.',
        isCorrect: true,
        explanation: '¡Renta Fija Soberana Blindada! Los TIPS aseguran una tasa de retorno real positiva sobre la inflación oficial del periodo.'
      },
      {
        id: 'opt_2',
        text: 'Le cobran al inversor una multa cada vez que el precio de los bienes sube.',
        isCorrect: false,
        explanation: 'Falso. Es al revés: pagan más al inversor.'
      },
      {
        id: 'opt_3',
        text: 'Transforman los bonos en billetes de monopolio.',
        isCorrect: false,
        explanation: 'Totalmente erróneo.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_26',
    title: 'Asertijo de Ataque #26: El Colchón de Tranquilidad y Cero Malventas',
    category: 'gestion_riesgo',
    question: '¿Por qué tener un fondo de reserva de 6 meses de gastos fijos en instrumentos líquidos de bajo riesgo te protege contra pérdidas en la bolsa de valores?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque ante cualquier emergencia médica o desempleo temporal no tienes que malvender tus acciones o fondos en plena caída de mercado para conseguir efectivo.',
        isCorrect: true,
        explanation: '¡Blindaje Psicológico y Estratégico! El fondo de emergencia da tiempo al mercado para recuperarse, evitando convertir pérdidas temporales en definitivas.'
      },
      {
        id: 'opt_2',
        text: 'Porque el fondo de emergencia triplica las acciones en Wall Street cada semana.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque elimina la necesidad de presupuestar gastos personales.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_27',
    title: 'Asertijo de Ataque #27: Amortización de Deuda Tóxica (Método Avalancha)',
    category: 'desendeudamiento',
    question: 'Tienes deudas en tarjeta de crédito al 45% anual y un préstamo personal al 18% anual. Según el Método de Avalancha Financiera, ¿qué deuda debes priorizar?',
    options: [
      {
        id: 'opt_1',
        text: 'La tarjeta de crédito al 45%: liquidar la tasa más alta primero ahorra la mayor cantidad de intereses netos y equivale a un rendimiento garantizado del 45%.',
        isCorrect: true,
        explanation: '¡Corte de Hemorragia! Matar primero la deuda con el interés más alto frena el drenaje del interés compuesto negativo en tu flujo de caja.'
      },
      {
        id: 'opt_2',
        text: 'Pagar solo los intereses mínimos de ambas y gastar el resto en fiestas.',
        isCorrect: false,
        explanation: 'Camino directo a la quiebra personal.'
      },
      {
        id: 'opt_3',
        text: 'La deuda del 18% porque el número 18 es más simpático.',
        isCorrect: false,
        explanation: 'Irracional e ineficiente.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_28',
    title: 'Asertijo de Ataque #28: Margen Operativo y Elasticidad de Demanda',
    category: 'modelos_negocio',
    question: 'Una empresa vende un producto con margen del 60% y demanda inelástica (medicinas, alimentos básicos). ¿Por qué es mucho más resistente a las crisis que una de margen del 5%?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque tiene un colchón financiero enorme para absorber alzas de energía o transporte sin entrar en pérdidas y sus clientes no pueden dejar de comprar su producto.',
        isCorrect: true,
        explanation: '¡Antifragilidad Empresarial! Los altos márgenes de contribución protegen la rentabilidad neta ante cualquier shock externo imprevisto.'
      },
      {
        id: 'opt_2',
        text: 'Porque las empresas con alto margen no pagan sueldos a sus empleados.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque venden únicamente a instituciones benéficas.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_29',
    title: 'Asertijo de Ataque #29: Descorrelación Antifrágil de Activos (Markowitz)',
    category: 'cartera_markowitz',
    question: '¿Qué postula la Teoría Moderna de Carteras del premio Nobel Harry Markowitz sobre combinar activos no correlacionados entre sí?',
    options: [
      {
        id: 'opt_1',
        text: 'Que combinar activos cuyos precios no se mueven en la misma dirección (como oro, acciones, bienes raíces y renta fija) reduce el riesgo total sin sacrificar el retorno esperado.',
        isCorrect: true,
        explanation: '¡El Único Almuerzo Gratis en Finanzas! La descorrelación suaviza la volatilidad de la cartera, permitiendo navegar cualquier tormenta económica con serenidad.'
      },
      {
        id: 'opt_2',
        text: 'Que es mejor invertir el 100% del dinero en una sola acción de moda recomendada en redes sociales.',
        isCorrect: false,
        explanation: 'Peligro supremo de ruina por concentración de riesgo.'
      },
      {
        id: 'opt_3',
        text: 'Que todas las acciones del mundo siempre caen y suben al mismo segundo exacto.',
        isCorrect: false,
        explanation: 'Falso.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_30',
    title: 'Asertijo de Ataque #30: Eficiencia Fiscal Lícita y Reinversión Compuesta',
    category: 'planificacion_fiscal',
    question: 'Si difieres legalmente el pago de impuestos sobre ganancias de capital reinvirtiendo dentro de tu fondo o sociedad, ¿cuál es el beneficio financiero real?',
    options: [
      {
        id: 'opt_1',
        text: 'El dinero que de otro modo se hubiera ido en impuestos continúa trabajando dentro del portafolio generando interés compuesto sobre el total no drenado.',
        isCorrect: true,
        explanation: '¡Acelerador Patrimonial! Diferir impuestos de forma legítima equivale a recibir un préstamo sin intereses del fisco para reinvertir en activos productivos.'
      },
      {
        id: 'opt_2',
        text: 'Que el gobierno te envía una medalla de oro al final del año fiscal.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Que no es necesario llevar libros contables en la empresa.',
        isCorrect: false,
        explanation: 'Incorrecto. La contabilidad ordenada es el pilar de la eficiencia fiscal.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_31',
    title: 'Asertijo de Ataque #31: Capital Humano y Habilidades Antifrágiles',
    category: 'capital_humano',
    question: '¿Por qué la inversión en habilidades de alta demanda técnica (programación, análisis financiero, ventas complejas) es el activo más inmune a la hiperinflación?',
    options: [
      {
        id: 'opt_1',
        text: 'Porque tu conocimiento y talento no pueden ser devaluados, confiscados ni embargados por decretos, y pueden renegociarse al valor de mercado en cualquier país del mundo.',
        isCorrect: true,
        explanation: '¡El Activo Definitivo! Como decía Benjamin Franklin: «Una inversión en conocimiento siempre paga el mejor interés». Tu cerebro es tu mayor fábrica de flujo.'
      },
      {
        id: 'opt_2',
        text: 'Porque los títulos universitarios se pueden cambiar por lingotes de plata en el banco.',
        isCorrect: false,
        explanation: 'Falso. Lo que vale es la habilidad práctica para resolver problemas reales del mercado.'
      },
      {
        id: 'opt_3',
        text: 'Porque elimina la necesidad de trabajar por el resto de tu vida.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_32',
    title: 'Asertijo de Ataque #32: Venta en Corto y Coberturas ante Burbujas',
    category: 'mercados_financieros',
    question: 'Cuando un activo sin fundamentos sube 1,000% impulsado por pura especulación y euforia irracional, ¿qué regla de prudencia protege al inversor sensato?',
    options: [
      {
        id: 'opt_1',
        text: 'No entrar por FOMO (miedo a quedarse afuera), tomar ganancias de activos sobrevalorados y mantener liquidez o coberturas defensivas para comprar cuando la burbuja estalle.',
        isCorrect: true,
        explanation: '¡Disciplina Contra la Euforia! «Sé temeroso cuando los demás son codiciosos, y sé codicioso cuando los demás son temerosos» (Warren Buffett).'
      },
      {
        id: 'opt_2',
        text: 'Hipotecar la casa para comprar en el pico más alto de la euforia masiva.',
        isCorrect: false,
        explanation: 'Fórmula clásica para la ruina económica de miles de familias.'
      },
      {
        id: 'opt_3',
        text: 'Asumir que los precios subirán hasta el infinito sin corregir jamás.',
        isCorrect: false,
        explanation: 'Toda burbuja especulativa histórica regresa inexorablemente a su media real.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_33',
    title: 'Asertijo de Ataque #33: El Ratio de Sharpe y Retorno Ajustado por Riesgo',
    category: 'evaluacion_riesgo',
    question: 'Dos inversiones rinden 20% anual. La inversión A tiene una volatilidad del 5% y la inversión B tiene caídas bruscas del 50%. ¿Cuál tiene mejor Ratio de Sharpe?',
    options: [
      {
        id: 'opt_1',
        text: 'La inversión A: entrega el mismo 20% con muchísimo menor riesgo y oscilaciones, ofreciendo un retorno por unidad de volatilidad muy superior.',
        isCorrect: true,
        explanation: '¡Eficiencia Pura de Capital! Ganar un 20% durmiendo tranquilo supera a ganar un 20% al borde del colapso nervioso por volatilidad extrema.'
      },
      {
        id: 'opt_2',
        text: 'La inversión B porque las montañas rusas emocionales son más divertidas.',
        isCorrect: false,
        explanation: 'Invertir no es un parque de atracciones; es un proceso de preservación y crecimiento de capital.'
      },
      {
        id: 'opt_3',
        text: 'Ambas son idénticas porque el riesgo no importa si al final hay ganancia.',
        isCorrect: false,
        explanation: 'Falso. Un shock inesperado en la inversión B puede liquidar todo el capital.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_34',
    title: 'Asertijo de Ataque #34: El Ciclo de Conversión de Efectivo (CCC)',
    category: 'capital_trabajo',
    question: '¿Por qué gigantes como Amazon o Walmart logran tener un Ciclo de Conversión de Efectivo negativo (cobran a clientes antes de pagar a proveedores)?',
    options: [
      {
        id: 'opt_1',
        text: 'Financian su crecimiento con el dinero de sus proveedores a tasa de interés cero, sin necesidad de solicitar costosos préstamos bancarios ni diluir su capital.',
        isCorrect: true,
        explanation: '¡Ingeniería de Flujo de Caja Maestro! Cobrar de contado al cliente y pagar a 60 o 90 días al proveedor genera un flujo de caja libre perpetuo para reinversión.'
      },
      {
        id: 'opt_2',
        text: 'Porque nunca pagan sus facturas a nadie en ningún momento.',
        isCorrect: false,
        explanation: 'Falso. Pagan con rigurosidad según los plazos contractuales acordados.'
      },
      {
        id: 'opt_3',
        text: 'Porque sus clientes pagan con 10 años de anticipación.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_35',
    title: 'Asertijo de Ataque #35: Liquidez Estratégica ("Pólvora Seca" en Crisis)',
    category: 'estrategia_liquidez',
    question: '¿Por qué los mejores inversores de la historia (como Buffett o Howard Marks) mantienen un 10-15% del portafolio en liquidez monetaria o deuda ultra corta?',
    options: [
      {
        id: 'opt_1',
        text: 'Es su «pólvora seca»: cuando ocurre un pánico financiero masivo y todos venden activos de calidad por desesperación, ellos tienen el efectivo para comprarlos a precio de liquidación.',
        isCorrect: true,
        explanation: '¡Oportunidad Asimétrica! El efectivo en épocas de bonanza parece aburrido, pero en las crisis es la llave que compra empresas extraordinarias a precios ridículos.'
      },
      {
        id: 'opt_2',
        text: 'Porque les da miedo la tecnología de las computadoras.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque la ley les prohíbe invertir más del 50% de su dinero.',
        isCorrect: false,
        explanation: 'Totalmente falso.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_36',
    title: 'Asertijo de Ataque #36: Efecto de Red Exponencial (Ley de Metcalfe)',
    category: 'efecto_red',
    question: 'Según la Ley de Metcalfe, el valor de una red crece con el cuadrado del número de sus usuarios (V ∝ n²). ¿Por qué esto protege a plataformas líderes?',
    options: [
      {
        id: 'opt_1',
        text: 'Crea un foso defensivo gigantesco: cada usuario adicional hace la red más valiosa para todos los demás, volviendo casi imposible que un competidor copie el servicio.',
        isCorrect: true,
        explanation: '¡Monopolio Natural Orgánico! Los efectos de red retienen a los clientes y permiten cobrar tarifas con márgenes descomunales sin perder tracción de mercado.'
      },
      {
        id: 'opt_2',
        text: 'Porque las leyes gubernamentales encarcelan a quien cree una aplicación similar.',
        isCorrect: false,
        explanation: 'Falso.'
      },
      {
        id: 'opt_3',
        text: 'Porque las computadoras de la red se vuelven dos veces más pesadas físicamente.',
        isCorrect: false,
        explanation: 'Absurdo.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_37',
    title: 'Asertijo de Ataque #37: El Presupuesto Base Cero Blindado',
    category: 'presupuesto',
    question: '¿Cuál es la regla sagrada del Presupuesto Base Cero y cómo elimina el despilfarro financiero en una empresa o familia?',
    options: [
      {
        id: 'opt_1',
        text: 'Ingresos - (Gastos Fijos + Ahorro/Inversión + Gastos Variables) = 0: cada unidad monetaria tiene un propósito asignado antes de que comience el mes.',
        isCorrect: true,
        explanation: '¡Control Absoluto del Flujo! En el presupuesto base cero no existe el dinero "suelto" o sin destino; el ahorro y la inversión se debitan antes del consumo.'
      },
      {
        id: 'opt_2',
        text: 'Gastar todo el dinero el primer día del mes hasta quedar en saldo cero bancario.',
        isCorrect: false,
        explanation: 'Fórmula segura para el endeudamiento y la angustia.'
      },
      {
        id: 'opt_3',
        text: 'No anotar ningún gasto y confiar ciegamente en la memoria.',
        isCorrect: false,
        explanation: 'Falso. Las fugas hormiga evaporan el 15-20% del ingreso si no se auditan.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_38',
    title: 'Asertijo de Ataque #38: Tokenización y Fraccionamiento de Activos Reales',
    category: 'innovacion_financiera',
    question: '¿Qué ventaja aporta fraccionar la propiedad de bienes raíces o infraestructura productiva a través de tecnología digital transparente?',
    options: [
      {
        id: 'opt_1',
        text: 'Permite a pequeños inversores acceder a rendimientos de activos institucionales de primer nivel desde montos mínimos ($50 o $100) con liquidez y trazabilidad.',
        isCorrect: true,
        explanation: '¡Democratización del Capital! El fraccionamiento derriba las barreras de entrada que históricamente reservaban los mejores activos solo a millonarios.'
      },
      {
        id: 'opt_2',
        text: 'Elimina los costos de los materiales de construcción del edificio.',
        isCorrect: false,
        explanation: 'Falso. El edificio físico requiere los mismos materiales y mantenimiento.'
      },
      {
        id: 'opt_3',
        text: 'Garantiza que el edificio nunca envejezca.',
        isCorrect: false,
        explanation: 'Incorrecto.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_39',
    title: 'Asertijo de Ataque #39: Prima de Riesgo País y Cobertura Soberana',
    category: 'analisis_macro',
    question: 'Si los bonos de un país en crisis pagan un 25% en dólares pero el riesgo de impago (default) es del 70%, ¿cómo debe actuar un inversor con alto IQ financiero?',
    options: [
      {
        id: 'opt_1',
        text: 'No dejarse seducir por la tasa astronómica: el rendimiento esperado probabilístico es negativo debido a la altísima probabilidad de pérdida total del capital principal.',
        isCorrect: true,
        explanation: '¡La Regla de Oro de Buffett! «Regla número 1: Nunca pierdas dinero. Regla número 2: Nunca olvides la regla número 1». Cuidar el principal siempre es lo primero.'
      },
      {
        id: 'opt_2',
        text: 'Invertir todos los ahorros de la familia porque un 25% en dólares suena irresistible.',
        isCorrect: false,
        explanation: 'Suicidio financiero común de quienes persiguen tasas sin evaluar el riesgo de impago.'
      },
      {
        id: 'opt_3',
        text: 'Suponer que el Fondo Monetario Internacional pagará las deudas personales de los inversores.',
        isCorrect: false,
        explanation: 'Falso.'
      }
    ],
    points: 35
  },
  {
    id: 'attack_riddle_40',
    title: 'Asertijo de Ataque #40: El Interés Compuesto Definitivo (La Octava Maravilla)',
    category: 'interes_compuesto',
    question: 'Einstein llamó al interés compuesto «la fuerza más poderosa del universo: quien lo entiende lo gana, quien no lo entiende lo paga». ¿Cuál es su combustible indispensable?',
    options: [
      {
        id: 'opt_1',
        text: 'El Tiempo y la Constancia: la reinversión sistemática de rendimientos produce una curva exponencial donde los mayores saltos patrimoniales ocurren en los últimos periodos.',
        isCorrect: true,
        explanation: '¡Axioma Supremo de CifraFlow! El interés compuesto premia la paciencia y la disciplina. Invertir temprano y dejar que los intereses generen más intereses conquista la libertad financiera definitiva.'
      },
      {
        id: 'opt_2',
        text: 'La suerte en la lotería y los consejos rápidos de gurús en internet.',
        isCorrect: false,
        explanation: 'Falso. El azar destruye el capital; el método compuesto lo multiplica con certeza matemática.'
      },
      {
        id: 'opt_3',
        text: 'Retirar todo el dinero acumulado cada 30 días para gastarlo de inmediato.',
        isCorrect: false,
        explanation: 'Falso. Retirar el rendimiento frena de golpe la magia de la curva exponencial.'
      }
    ],
    points: 40
  }
];
