import { ComicChapter } from '../types';
import capitanImg from '../assets/images/capitan_cifraflow_1787580423075.jpg';
import lordImg from '../assets/images/lord_inflacion_1787580436494.jpg';
import donaImg from '../assets/images/dona_tasa_1787580449607.jpg';
import doctorImg from '../assets/images/doctor_deuda_1787580463567.jpg';
import coderImg from '../assets/images/archetype_coder_1787580492146.jpg';
import streamerImg from '../assets/images/archetype_streamer_1787580477373.jpg';
import designerImg from '../assets/images/archetype_designer_1787580510377.jpg';
import baristaImg from '../assets/images/archetype_barista_1787580524640.jpg';

export const COMIC_CHAPTERS: ComicChapter[] = [
  {
    id: 'chapter_1',
    chapterNumber: 1,
    title: 'La Sombra de la Devaluación en Microciudad',
    subtitle: 'El surgimiento de Lord Inflación y la evaporación del poder de compra',
    synopsis: 'Microciudad solía ser un paraíso de jóvenes creadores, hasta que una niebla púrpura de sobreemisión monetaria y especulación de precios comenzó a asfixiar los bolsillos.',
    panels: [
      {
        image: lordImg,
        caption: 'En las sombras del Distrito Financiero Central, Lord Inflación activa sus gigantescas turbinas de emisión sin respaldo.',
        dialogue: [
          {
            speaker: 'Lord Inflación',
            text: '¡Impriman billetes día y noche! Que mañana el desayuno cueste el triple y los ahorros en efectivo se vuelvan polvo en sus manos. ¡Nadie escapará de mi vórtice devaluador!',
            isHero: false
          }
        ],
        economicLesson: 'La emisión monetaria inorgánica diluye el poder adquisitivo de la moneda. Guardar dinero bajo el colchón en épocas inflacionarias garantiza una pérdida silenciosa y constante de patrimonio real.'
      },
      {
        image: capitanImg,
        caption: 'En la cúspide de la Ciudadela CifraFlow, el Capitán despliega su manto de energía cuántica indexada a valor real.',
        dialogue: [
          {
            speaker: 'Capitán CifraFlow',
            text: '¡Alto ahí, devorador de poder adquisitivo! En Microciudad no acumulamos papel marchito: convertimos cada gota de flujo de caja en activos duros, tecnología y reservas antifrágiles.',
            isHero: true
          }
        ],
        economicLesson: 'La única defensa invulnerable contra la devaluación es transformar la liquidez en activos productivos y negocios con capacidad de fijación de precios frente a la inflación.'
      }
    ]
  },
  {
    id: 'chapter_2',
    chapterNumber: 2,
    title: 'La Telaraña del Pago Mínimo',
    subtitle: 'Doctor Deuda Tóxica y la trampa del consumo por apariencia',
    synopsis: 'Muchos jóvenes creativos son seducidos por créditos inmediatos con tasas ocultas para financiar lujos y apariencias digitales, cayendo en la esclavitud de los intereses eternos.',
    panels: [
      {
        image: doctorImg,
        caption: 'En su laboratorio clandestino de crédito predatorio, Doctor Deuda reparte tarjetas de crédito plastificadas con anzuelos de neón.',
        dialogue: [
          {
            speaker: 'Doctor Deuda',
            text: '¡Llévalo hoy y no te preocupes por el mañana! Paga solo el mínimo de la cuota durante 5 años con 90% de interés anual compuesto. ¡Tu futuro me pertenece!',
            isHero: false
          }
        ],
        economicLesson: 'Pagar únicamente el monto mínimo en las tarjetas de crédito financia solo el interés acumulado, manteniendo el capital intacto y multiplicando la deuda de forma exponencial.'
      },
      {
        image: donaImg,
        caption: 'Doña Tasa de Interés desciende con su escudo de amortización acelerada y presupuesto base cero.',
        dialogue: [
          {
            speaker: 'Doña Tasa',
            text: '¡Detén tu emboscada, usurero! La regla sagrada de Microciudad se cumple: primero construimos el Fondo de Emergencia de 6 meses y eliminamos la deuda tóxica antes de cualquier gasto superfluo.',
            isHero: true
          }
        ],
        economicLesson: 'Diferencia siempre la deuda tóxica (que financia pasivos que pierden valor) de la deuda apalancada productiva (que adquiere activos cuyo rendimiento supera ampliamente la tasa de interés).'
      }
    ]
  },
  {
    id: 'chapter_3',
    chapterNumber: 3,
    title: 'La Rebelión de los Emprendedores Digitales',
    subtitle: 'Los creadores de Microciudad forjan la red descentralizada de valor real',
    synopsis: 'Frente a las embestidas de los villanos del caos financiero, la juventud trabajadora de Microciudad se organiza combinando código, café de especialidad, diseño y creación de contenido.',
    panels: [
      {
        image: coderImg,
        caption: 'En el distrito tecnológico, la programadora ciberespacial programa contratos inteligentes y sistemas automatizados de micro-ahorro.',
        dialogue: [
          {
            speaker: 'Coder CifraFlow',
            text: 'He automatizado el débito en origen: el primer 20% de cada ingreso va directo al fondo indexado antes de que podamos gastarlo. ¡El sistema de ahorro es inquebrantable!',
            isHero: true
          }
        ],
        economicLesson: 'Págate a ti mismo primero. Automatizar el ahorro y la inversión al momento de recibir ingresos elimina la fricción psicológica de la tentación del gasto impulsivo.'
      },
      {
        image: baristaImg,
        caption: 'En el Distrito Comercial, el maestro barista transforma insumos locales en experiencias de alto valor agregado.',
        dialogue: [
          {
            speaker: 'Barista Emprendedor',
            text: 'Al optimizar nuestros costos fijos y reinvertir el margen en maquinaria de alta eficiencia, blindamos el negocio con un flujo de caja operativo neto positivo en cada jornada.',
            isHero: true
          }
        ],
        economicLesson: 'Un flujo de caja libre positivo y la optimización de los costos de inventario son el corazón de la soberanía financiera para cualquier negocio real.'
      }
    ]
  },
  {
    id: 'chapter_4',
    chapterNumber: 4,
    title: 'El Amanecer del Interés Compuesto',
    subtitle: 'La victoria de la antifragilidad y la Ciudadela del Futuro',
    synopsis: 'Con las herramientas de la educación financiera, el ahorro sistemático y la descorrelación de activos, Microciudad vence la oscuridad y construye su legado perpetuo.',
    panels: [
      {
        image: designerImg,
        caption: 'En los talleres de innovación, la diseñadora de futuros proyecta el mapa de metas financieras a 10 años.',
        dialogue: [
          {
            speaker: 'Diseñadora del Futuro',
            text: '¡Miren el gráfico del interés compuesto! El tiempo y la consistencia matemática multiplican nuestro esfuerzo más allá de cualquier crisis coyuntural.',
            isHero: true
          }
        ],
        economicLesson: 'El interés compuesto es la fuerza más poderosa de la economía: pequeños aportes constantes a lo largo del tiempo superan a grandes sumas invertidas tarde y sin disciplina.'
      },
      {
        image: capitanImg,
        caption: 'El Capitán CifraFlow y todo el escuadrón celebran desde el Obelisco Dorado de la Libertad Financiera.',
        dialogue: [
          {
            speaker: 'Capitán CifraFlow',
            text: '¡Ciudadanos de Microciudad! La verdadera riqueza no es el exceso, sino la libertad de decidir sobre nuestro tiempo con un patrimonio blindado y antifrágil. ¡La victoria es del CifraFlow!',
            isHero: true
          }
        ],
        economicLesson: 'La libertad financiera se alcanza cuando tus activos e ingresos pasivos cubren tus necesidades vitales, otorgándote soberanía total sobre tu proyecto de vida.'
      }
    ]
  }
];

