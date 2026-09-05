import { ServiceItem, PortfolioItem, Testimonial, FAQItem } from '../types';

export const ATELIER_INFO = {
  name: 'CENEIXE',
  slogan: 'Taller Artesanal de Costura & Sastrería',
  subheading: 'Precisión milimétrica, respeto por el tejido y acabados de alta costura para que cada prenda te quede impecable.',
  phone: '+51 1 234 5678',
  whatsapp: '+51 912 345 678',
  whatsappClean: '51912345678',
  email: 'contacto@ceneixe.pe',
  address: 'Av. Aviación 470, Gamarra, La Victoria 15033, Lima, Perú',
  schedule: {
    weekdays: 'Lunes a Viernes: 09:30 - 14:00 | 16:30 - 20:00',
    saturday: 'Sábados: 10:00 - 14:00 (Con cita previa)',
    sunday: 'Domingos y festivos: Cerrado'
  },
  stats: [
    { label: 'Años de experiencia', value: '+18' },
    { label: 'Prendas ajustadas', value: '+12.400' },
    { label: 'Garantía de ajuste', value: '100%' },
    { label: 'Servicio exprés', value: '24/48h' }
  ]
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'bajos-ajustes',
    title: 'Bajos y Bastillas',
    category: 'arreglos',
    description: 'Ajuste exacto de longitud en vaqueros con bajo original conservado, dobladillo invisible a mano en trajes y faldas.',
    timeEstimate: '2 a 3 días',
    basePrice: 12,
    popular: true,
    features: [
      'Bajo original en jeans (efecto desgastado idéntico)',
      'Dobladillo ciego a mano para lana y seda',
      'Aberturas laterales y falsos dobladillos'
    ]
  },
  {
    id: 'sastreria-trajes',
    title: 'Sastrería & Trajes',
    category: 'sastreria',
    description: 'Entallado integral de americanas, ajuste de hombros, estrechar mangas, entallar chalecos y caja de pantalón de traje.',
    timeEstimate: '4 a 6 días',
    basePrice: 35,
    popular: true,
    features: [
      'Entallado dorsal y costadillos',
      'Acortar mangas desde el hombro sin tocar botones',
      'Ajuste de tiro y cintura con pretina artesanal'
    ]
  },
  {
    id: 'vestidos-ceremonia',
    title: 'Alta Costura & Ceremonia',
    category: 'fiesta',
    description: 'Ajustes finos en vestidos de novia, invitada, fiesta y gala. Trabajo delicado sobre pedrería, gasas, tules y mikados.',
    timeEstimate: '5 a 8 días',
    basePrice: 45,
    popular: true,
    features: [
      'Entallar corpiños y ballenas interiores',
      'Ajuste de tirantes finos y escotes asimétricos',
      'Recorte de cola y varias capas de can-cán'
    ]
  },
  {
    id: 'cremalleras-forros',
    title: 'Cremalleras y Forros',
    category: 'arreglos',
    description: 'Sustitución de cremalleras invisibles, metálicas para abrigos o cazadoras de cuero, y cambio total o parcial de forros.',
    timeEstimate: '3 a 4 días',
    basePrice: 18,
    features: [
      'Cremalleras metálicas YKK de alta resistencia',
      'Cremalleras invisibles para vestidos y faldas',
      'Forros de satén o acetato transpirable'
    ]
  },
  {
    id: 'transformacion-upcycling',
    title: 'Transformación & Upcycling',
    category: 'transformacion',
    description: 'Modernización de prendas vintage o queridas: convertir abrigos antiguos en chalecos, faldas maxi en dos piezas, o siluetas oversize.',
    timeEstimate: '5 a 7 días',
    basePrice: 50,
    features: [
      'Modernización de cortes y solapas vintage',
      'Rediseño completo de prendas familiares',
      'Bordados y remallados decorativos'
    ]
  },
  {
    id: 'hogar-decoracion',
    title: 'Textil de Hogar & Cortinas',
    category: 'hogar',
    description: 'Confección y arreglo de caídas de cortinas, estores, cojines a medida y mantelería con dobladillo capuchón.',
    timeEstimate: '4 a 5 días',
    basePrice: 22,
    features: [
      'Ajuste de bajo en cortinas instaladas',
      'Cojines con vivo y cremallera oculta',
      'Cintas fruncidoras y ollados de acero'
    ]
  }
];

export const PORTFOLIO_LIST: PortfolioItem[] = [
  {
    id: 'traje-italiano',
    title: 'Entallado y Limpieza de Espalda en Traje',
    category: 'sastreria',
    tag: 'Sastrería Masculina',
    description: 'Ajuste de chaqueta sastre italiana. Eliminación del exceso de tela en la zona lumbar, acortado de mangas respetando ojales praticables y ajuste de cintura del pantalón.',
    details: [
      'Tejido: Lana virgen Super 130s',
      'Intervención: Desmontaje de hombro y entalle de costadillos',
      'Acabado: Planchado con prensa de vapor sastre'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    clientNote: 'El traje me quedaba grande de hombro y con bolsa en la espalda. Ahora parece hecho completamente a medida.',
    completionTime: '4 días'
  },
  {
    id: 'vestido-invitada-seda',
    title: 'Ajuste de Escote y Cintura en Vestido de Gala',
    category: 'fiesta',
    tag: 'Alta Costura',
    description: 'Entallado milimétrico de corpiño en vestido de crepe de seda con escote halter. Levantado de hombro y subida de bajo con doblez ciego artesanal.',
    details: [
      'Tejido: Crepe de seda natural y forro de viscosa',
      'Intervención: Reducción de 4 cm en contorno torácico y ajuste de cremallera invisible',
      'Puntada: Manual invisible con hilo de seda'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
    clientNote: 'Impresionante trabajo con la seda. No se nota una sola puntada y no tirantea por ningún sitio.',
    completionTime: '5 días'
  },
  {
    id: 'abrigo-vintage-upcycling',
    title: 'Transformación de Abrigo Vintage de Paño',
    category: 'transformacion',
    tag: 'Rediseño & Upcycling',
    description: 'Modernización de un abrigo de lana de los años 80 perteneciente a la abuela de la clienta. Eliminación de hombreras desmesuradas, estrechado de mangas y cambio total de forro de seda.',
    details: [
      'Tejido: Paño de lana 100%',
      'Intervención: Modificación de sisa, botones nuevos de asta y forro contrastado',
      'Resultado: Silueta contemporánea manteniendo el alma de la prenda'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
    clientNote: 'Una reliquia familiar que ahora puedo usar a diario en invierno con un corte moderno.',
    completionTime: '6 días'
  },
  {
    id: 'denim-selvedge-reparacion',
    title: 'Bajo Original con Punto Cadena en Selvedge Denim',
    category: 'arreglos',
    tag: 'Denim & Diario',
    description: 'Subida de bajo en pantalón denim japonés de 14oz utilizando máquina de puntada cadeneta y preservando el orillo selvedge intacto.',
    details: [
      'Tejido: Denim japonés 14oz ring-spun',
      'Intervención: Corte limpio y terminación idéntica a fábrica',
      'Hilo: Hilo de algodón-poliéster tono tabaco original'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80',
    clientNote: 'Mantuvieron el bajo original exactamente como venía de fábrica. Impecable.',
    completionTime: '48 horas'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Rodríguez',
    role: 'Cliente habitual',
    service: 'Ajuste de vestido de fiesta',
    comment: 'Llevé un vestido muy delicado de seda para una boda de última hora. En CENEIXE me atendieron con un mimo absoluto en el probador y me lo entregaron en 48 horas con un planchado perfecto.',
    rating: 5,
    date: 'Hace 2 semanas'
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    role: 'Abogado',
    service: 'Sastrería en dos trajes',
    comment: 'Hacía tiempo que no encontraba un taller donde entendieran de verdad la caída del hombro y la limpieza del tiro en pantalones sastre. Son auténticos profesionales del oficio.',
    rating: 5,
    date: 'Hace 1 mes'
  },
  {
    id: '3',
    name: 'Marina Vázquez',
    role: 'Diseñadora de Interiores',
    service: 'Transformación de abrigo y cortinas',
    comment: 'El trato personalizado y la honestidad al aconsejarte qué arreglo merece la pena y cuál no es lo que les diferencia. Trabajo fino, limpio y puntual.',
    rating: 5,
    date: 'Hace 3 semanas'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'citas',
    question: '¿Es necesario pedir cita previa para acudir al taller?',
    answer: 'Para arreglos sencillos como bajos de pantalón o cambios de cremallera puedes acudir directamente en nuestro horario comercial. Sin embargo, para trajes de sastre, vestidos de fiesta, novias o transformaciones complejas, recomendamos reservar cita para dedicarte el tiempo exclusivo en nuestro probador.'
  },
  {
    category: 'proceso',
    question: '¿Qué debo llevar a la prueba de la prenda?',
    answer: 'Es fundamental traer el calzado exacto (altura de tacón o suela) con el que vas a usar el pantalón o vestido. En el caso de vestidos de fiesta o trajes, te aconsejamos también traer la ropa interior o camisa definitiva para asegurar un ajuste perfecto.'
  },
  {
    category: 'tiempos',
    question: '¿Tienen servicio exprés para emergencias?',
    answer: 'Sí. Disponemos de servicio exprés en 24h y 48h con un pequeño suplemento según la complejidad del trabajo y la carga del taller. Consúltanos en el momento de la entrega o por WhatsApp.'
  },
  {
    category: 'precios',
    question: '¿Cómo se presupuestan las prendas con tejidos delicados?',
    answer: 'Prendas con pedrería, lentejuelas, cuero o sedas naturales conllevan técnicas de descosido a mano y tiempos especiales. Te daremos siempre un presupuesto cerrado y detallado antes de realizar cualquier intervención.'
  },
  {
    category: 'proceso',
    question: '¿Qué garantía tienen los arreglos?',
    answer: 'Todas nuestras intervenciones cuentan con 100% de garantía de ajuste. Si tras llevarte la prenda notas que requiere un milímetro más de ajuste dentro de los 15 días posteriores, lo rectificamos sin coste adicional.'
  }
];
