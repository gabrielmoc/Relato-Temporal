import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import './styles.css'

const financiamentoPmeText = '/brand/necessidade-financiamento-pme-portuguesa.pdf'
const noMeioDaTabelaText = '/brand/no-meio-da-tabela-exportacao-pescado.pdf'

const languages = [
  { code: 'pt', label: 'PT', flag: '🇵🇹', name: 'Português (Portugal)' },
  { code: 'en', label: 'EN', flag: '🇺🇸', name: 'English (United States)' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español (España)' }
]

const copy = {
  pt: { home: 'Início', about: 'Sobre Nós', miguel: 'Miguel Bregieira', industries: 'As Indústrias', blog: 'Blog', contact: 'Contactos', reserved: 'Área Reservada', search: 'Pesquisar', heroEyebrow: 'Portugal · Brasil', heroTitle: 'Bem-vindo à ', heroAccent: 'Relato.', heroText: 'Agenciamento de indústrias alimentares com serviços de apoio à exportação para o Brasil.', explore: 'Conheça a Relato', footerMenu: 'Navegação', footerContact: 'Contacto', footerAddress: 'Moradas', comingSoon: 'Em desenvolvimento', backTop: 'Voltar ao topo' },
  en: { home: 'Home', about: 'About Us', miguel: 'Miguel Bregieira', industries: 'Industries', blog: 'Blog', contact: 'Contact', reserved: 'Client Area', search: 'Search', heroEyebrow: 'Portugal · Brazil', heroTitle: 'Welcome to ', heroAccent: 'Relato.', heroText: 'Food industry representation with export support services for Brazil.', explore: 'Discover Relato', footerMenu: 'Navigation', footerContact: 'Contact', footerAddress: 'Addresses', comingSoon: 'In development', backTop: 'Back to top' },
  es: { home: 'Inicio', about: 'Nosotros', miguel: 'Miguel Bregieira', industries: 'Las Industrias', blog: 'Blog', contact: 'Contacto', reserved: 'Área Reservada', search: 'Buscar', heroEyebrow: 'Portugal · Brasil', heroTitle: 'Bienvenido a ', heroAccent: 'Relato.', heroText: 'Representación de industrias alimentarias con servicios de apoyo a la exportación para Brasil.', explore: 'Conozca Relato', footerMenu: 'Navegación', footerContact: 'Contacto', footerAddress: 'Direcciones', comingSoon: 'En desarrollo', backTop: 'Volver arriba' }
}

const industryDirectory = [
  { slug: 'guimarpeixe', name: 'Guimarpeixe', image: '/brand/guimarpeixe.svg', description: 'Seleção de peixes congelados e polvo de alta qualidade, diretamente de Portugal.' },
  { slug: 'superfish', name: 'Superfish', image: '/brand/superfish.png', description: 'Especialistas em bacalhau dessalgado e salgado seco, com qualidade reconhecida.' },
  { slug: 'gelpinhos', name: 'Gelpinhos', image: '/brand/gelpinhos.png', description: 'Produtos alimentares com foco em qualidade, conveniência e sabor.', blueLogo: true },
  { slug: 'frigosto', name: 'Frigosto', image: '/brand/frigosto.png', description: 'Tradição e sabor em soluções alimentares para novos mercados.' },
  { slug: 'agroaguiar', name: 'AgroAguiar', image: '/brand/agroaguiar.jpeg', description: 'Agroindústria portuguesa orientada para produtos de origem e qualidade.' },
  { slug: 'costa-atlantico', name: 'Costa Atlântico', image: '/brand/costaatlantico-restored.png', description: 'Especialista em pescada e merluza. Marca em fase de formalização.', pending: true }
]

const blogPosts = [
  { slug: 'financiamento-pme-portuguesa', category: 'Gestão e financiamento', title: 'Qual a necessidade de financiamento de uma PME portuguesa?', subtitle: 'Diagnóstico prático e monitorização da dívida.', author: 'José Miguel Boiça Bregieira', date: 'Julho 2012', cover: '/brand/blog-financiamento-pme.jpg', intro: 'Crescer, vender mais e manter liquidez são desafios que nem sempre avançam ao mesmo ritmo. Este estudo aborda as necessidades de fundo de maneio e a importância de acompanhar a dívida numa pequena ou média empresa.', fullText: financiamentoPmeText, sections: [{ heading: 'Financiar o ciclo da empresa', paragraphs: ['Uma empresa precisa de capital para financiar a sua estrutura e a sua atividade. Entre comprar matérias-primas, produzir, manter existências, entregar e receber do cliente, existe um ciclo operacional que consome recursos.', 'A necessidade de financiamento não é estática: varia com o volume de vendas, a rotação de stocks, os prazos concedidos aos clientes e as condições negociadas com fornecedores. Acompanhar estas variáveis permite tomar decisões antes de surgir pressão na tesouraria.'] }, { heading: 'A necessidade de fundo de maneio', paragraphs: ['O diagnóstico propõe uma leitura simples da posição de curto prazo: NFM = Clientes + Existências - Fornecedores. Quando o resultado é positivo, a empresa precisa de recursos adicionais para sustentar o intervalo entre pagar e receber.', 'A fórmula não substitui a análise de gestão, mas transforma informação contabilística num indicador útil para antecipar necessidades e discutir soluções de crédito, capitais próprios ou renegociação de prazos.'] }, { heading: 'Monitorizar para decidir melhor', paragraphs: ['Prazos médios de recebimento, pagamento e rotação de existências devem ser observados em conjunto. Uma melhoria comercial que aumente vendas pode, por exemplo, exigir mais stock e mais crédito a clientes, agravando temporariamente a necessidade de liquidez.', 'A monitorização contínua ajuda a equilibrar crescimento, risco e capacidade financeira. Para uma PME, esta disciplina é especialmente relevante: torna visíveis os efeitos das decisões do dia a dia e apoia uma relação mais transparente com os parceiros financeiros.'] }] },
  { slug: 'no-meio-da-tabela', category: 'Exportação e pescado', title: 'No meio da tabela', subtitle: 'Empresas ensaiam o aumento do fluxo exportador de pescado, mas a realidade ainda mantém o Brasil distante dos primeiros competidores do negócio mais rentável do planeta.', author: 'Ricardo Torres', date: 'Mercado brasileiro', cover: '/brand/blog-exportacao-pescado.jpg', intro: 'O Brasil reúne escala, costa marítima e procura crescente, mas ainda tem um longo caminho para transformar este potencial numa presença mais forte no comércio internacional de pescado.', fullText: noMeioDaTabelaText, quote: 'Um magnífico mercado de diamantes, de enorme magnitude. Mas em bruto: um mercado onde ainda quase tudo estava por fazer.', sections: [{ heading: 'Potencial que pede estrutura', paragraphs: ['A produção, o consumo e o comércio de pescado ganharam relevância mundial nas últimas décadas. Neste cenário, o mercado brasileiro tem dimensão para atrair investimento, novas marcas e parceiros internacionais.', 'O desafio está em converter recursos e procura interna em cadeias de valor capazes de competir. Logística, previsibilidade, tecnologia, transformação e distribuição são fatores que definem a passagem do potencial para o resultado.'] }, { heading: 'Exportar é mais do que vender', paragraphs: ['A presença internacional depende de estratégia e continuidade. Para as empresas do setor alimentar, exportar implica compreender normas, documentação, posicionamento de produto, canais de distribuição e os hábitos de consumo de cada mercado.', 'A relação entre Portugal e Brasil abre espaço para produtos diferenciados, conhecimento técnico e cooperação comercial. O processo, contudo, pede preparação para reduzir riscos e construir operações sustentáveis.'] }, { heading: 'Um ecossistema para crescer', paragraphs: ['O texto aponta para a necessidade de uma atuação organizada entre indústria, entidades públicas, formação e operadores de mercado. A criação de clusters e o reforço da especialização podem tornar o setor mais competitivo.', 'É neste espaço de ligação entre origens, indústrias e mercados que a representação comercial ganha valor: aproximar parceiros, traduzir exigências e ajudar cada projeto a chegar ao Brasil com maior clareza e consistência.'] }] }
]

const blogCategories = [
  { id: 'all', labels: { pt: 'Todas as publicações', en: 'All publications', es: 'Todas las publicaciones' } },
  { id: 'gestao-financeira', labels: { pt: 'Gestão Financeira', en: 'Financial Management', es: 'Gestión Financiera' } },
  { id: 'comercio-internacional', labels: { pt: 'Exportação e Comércio Internacional', en: 'Export and International Trade', es: 'Exportación y Comercio Internacional' } },
  { id: 'industria-alimentar', labels: { pt: 'Indústria Alimentar', en: 'Food Industry', es: 'Industria Alimentaria' } },
  { id: 'mercado-brasileiro', labels: { pt: 'Mercado Brasileiro', en: 'Brazilian Market', es: 'Mercado Brasileño' } }
]

const postCategories = {
  'financiamento-pme-portuguesa': ['gestao-financeira'],
  'no-meio-da-tabela': ['comercio-internacional', 'industria-alimentar', 'mercado-brasileiro']
}

const pageContent = {
  pt: { home: { introTitle: 'A ponte certa para novos mercados.', introText: 'Representamos indústrias alimentares que procuram entrar, crescer e construir relações sólidas no Brasil.', bannerTitle: 'Origem, qualidade\ne oportunidade.', bannerLink: 'Ver indústrias' }, about: { eyebrow: '01 / Relato', text: 'A Relato atua na aproximação entre produtores de excelência e oportunidades concretas no mercado brasileiro.', features: ['Uma presença comercial próxima, informada e comprometida com cada parceria.', 'Da estratégia de entrada à continuidade no mercado, acompanhamos cada relação com clareza.'] }, miguel: { eyebrow: '02 / Perfil', tagline: 'Conhecimento especializado para relações comerciais que atravessam fronteiras.', pull: 'Uma trajetória construída entre a indústria alimentar portuguesa e o mercado brasileiro.', paragraphs: ['Miguel Bregieira iniciou o seu percurso profissional em Aveiro, uma das regiões mais tradicionais na produção de bacalhau em Portugal. Entrou cedo no setor dos pescados, adquirindo experiência em todas as etapas: aquisição de produtos da pesca, industrialização, desenvolvimento de produtos e estratégias comerciais.', 'Com formação superior em Gestão de Empresas e Auditoria Financeira, pós-graduação em Direito Aduaneiro, MBA em Fiscalidade e mestrado em Negócios Internacionais, Miguel reúne uma combinação rara de conhecimento científico e experiência prática no setor em que atua.', 'Esta especialização permite aos clientes da Relato contar com apoio na elaboração de processos de DIPOA para a libertação de produtos no Brasil, no desenvolvimento de marcas próprias para o mercado brasileiro e num conjunto alargado de serviços de apoio à exportação.'] }, industries: { eyebrow: '03 / Parceiros', title: 'Nossas indústrias\nagenciadas.', text: 'Representamos marcas que levam a qualidade da indústria alimentar portuguesa ao mercado brasileiro.', back: '← Voltar às indústrias', comingSoon: 'Em breve', detailText: 'Esta área está preparada para receber os conteúdos oficiais da marca.', actions: { produtos: 'Produtos', receitas: 'Receitas', catalogo: 'Catálogo' } }, blog: { eyebrow: '04 / Conteúdos', title: 'Ideias que\nmovem mercados.', text: 'Perspetivas sobre gestão, indústria alimentar e as pontes comerciais entre Portugal e Brasil.', empty: 'Ainda não existem publicações nesta categoria.', read: 'Ler artigo', back: '← Voltar ao blog', publication: 'Publicação completa', pdfTitle: 'Leia o documento original', pdfText: 'Utilize os controlos do leitor para navegar entre páginas, pesquisar e ampliar o conteúdo.', download: 'Descarregar PDF', fallback: 'Se o leitor não carregar no seu navegador,', fallbackLink: 'abra o PDF numa nova janela' }, contact: { eyebrow: '05 / Relato', text: 'Entre em contacto para conversar sobre representação e oportunidades de mercado.', phone: 'Telefone', email: 'Email', faro: 'Sede / Faro', aveiro: 'Norte / Aveiro' }, reserved: { eyebrow: '06 / Futuro', text: 'Esta área será preparada numa próxima fase do projeto.' }, footer: 'Agenciamento de indústrias alimentares com serviços de apoio à exportação para o Brasil.' },
  en: { home: { introTitle: 'The right bridge to new markets.', introText: 'We represent food industries looking to enter, grow and build solid relationships in Brazil.', bannerTitle: 'Origin, quality\nand opportunity.', bannerLink: 'View industries' }, about: { eyebrow: '01 / Relato', text: 'Relato brings together outstanding producers and concrete opportunities in the Brazilian market.', features: ['A close, informed and committed commercial presence for every partnership.', 'From market-entry strategy to long-term continuity, we manage each relationship with clarity.'] }, miguel: { eyebrow: '02 / Profile', tagline: 'Specialist knowledge for commercial relationships that cross borders.', pull: 'A career built between Portugal’s food industry and the Brazilian market.', paragraphs: ['Miguel Bregieira began his professional journey in Aveiro, one of Portugal’s most traditional regions for cod production. He entered the seafood sector early, gaining experience across every stage: sourcing fishery products, industrialisation, product development and commercial strategy.', 'With degrees in Business Management and Financial Auditing, a postgraduate qualification in Customs Law, an MBA in Taxation and a master’s degree in International Business, Miguel combines academic knowledge with practical experience in his sector.', 'This expertise gives Relato clients support with DIPOA processes for releasing products in Brazil, developing own-label brands for the Brazilian market and a broad range of export-support services.'] }, industries: { eyebrow: '03 / Partners', title: 'Our represented\nindustries.', text: 'We represent brands that bring the quality of Portugal’s food industry to the Brazilian market.', back: '← Back to industries', comingSoon: 'Coming soon', detailText: 'This area is ready to receive the brand’s official content.', actions: { produtos: 'Products', receitas: 'Recipes', catalogo: 'Catalogue' } }, blog: { eyebrow: '04 / Insights', title: 'Ideas that\nmove markets.', text: 'Perspectives on management, the food industry and commercial bridges between Portugal and Brazil.', empty: 'There are no publications in this category yet.', read: 'Read article', back: '← Back to blog', publication: 'Full publication', pdfTitle: 'Read the original document', pdfText: 'Use the viewer controls to navigate pages, search and zoom in.', download: 'Download PDF', fallback: 'If the viewer does not load in your browser,', fallbackLink: 'open the PDF in a new window' }, contact: { eyebrow: '05 / Relato', text: 'Get in touch to discuss representation and market opportunities.', phone: 'Telephone', email: 'Email', faro: 'Head office / Faro', aveiro: 'North / Aveiro' }, reserved: { eyebrow: '06 / Future', text: 'This area will be developed in a future phase of the project.' }, footer: 'Food industry representation with export support services for Brazil.' },
  es: { home: { introTitle: 'El puente adecuado hacia nuevos mercados.', introText: 'Representamos industrias alimentarias que buscan entrar, crecer y construir relaciones sólidas en Brasil.', bannerTitle: 'Origen, calidad\ny oportunidad.', bannerLink: 'Ver industrias' }, about: { eyebrow: '01 / Relato', text: 'Relato acerca productores de excelencia y oportunidades concretas en el mercado brasileño.', features: ['Una presencia comercial cercana, informada y comprometida con cada alianza.', 'Desde la estrategia de entrada hasta la continuidad en el mercado, acompañamos cada relación con claridad.'] }, miguel: { eyebrow: '02 / Perfil', tagline: 'Conocimiento especializado para relaciones comerciales que cruzan fronteras.', pull: 'Una trayectoria construida entre la industria alimentaria portuguesa y el mercado brasileño.', paragraphs: ['Miguel Bregieira inició su trayectoria profesional en Aveiro, una de las regiones más tradicionales en la producción de bacalao de Portugal. Entró pronto en el sector pesquero, adquiriendo experiencia en todas las etapas: compra de productos de pesca, industrialización, desarrollo de productos y estrategias comerciales.', 'Con formación superior en Gestión de Empresas y Auditoría Financiera, posgrado en Derecho Aduanero, MBA en Fiscalidad y máster en Negocios Internacionales, Miguel reúne conocimientos académicos y experiencia práctica en su sector.', 'Esta especialización permite a los clientes de Relato contar con apoyo en procesos DIPOA para la liberación de productos en Brasil, el desarrollo de marcas propias para el mercado brasileño y una amplia gama de servicios de apoyo a la exportación.'] }, industries: { eyebrow: '03 / Socios', title: 'Nuestras industrias\nrepresentadas.', text: 'Representamos marcas que llevan la calidad de la industria alimentaria portuguesa al mercado brasileño.', back: '← Volver a las industrias', comingSoon: 'Próximamente', detailText: 'Esta área está preparada para recibir los contenidos oficiales de la marca.', actions: { produtos: 'Productos', receitas: 'Recetas', catalogo: 'Catálogo' } }, blog: { eyebrow: '04 / Contenidos', title: 'Ideas que\nmueven mercados.', text: 'Perspectivas sobre gestión, industria alimentaria y los puentes comerciales entre Portugal y Brasil.', empty: 'Todavía no hay publicaciones en esta categoría.', read: 'Leer artículo', back: '← Volver al blog', publication: 'Publicación completa', pdfTitle: 'Lea el documento original', pdfText: 'Utilice los controles del visor para navegar por las páginas, buscar y ampliar el contenido.', download: 'Descargar PDF', fallback: 'Si el visor no carga en su navegador,', fallbackLink: 'abra el PDF en una nueva ventana' }, contact: { eyebrow: '05 / Relato', text: 'Póngase en contacto para hablar de representación y oportunidades de mercado.', phone: 'Teléfono', email: 'Correo electrónico', faro: 'Sede / Faro', aveiro: 'Norte / Aveiro' }, reserved: { eyebrow: '06 / Futuro', text: 'Esta área se preparará en una próxima fase del proyecto.' }, footer: 'Representación de industrias alimentarias con servicios de apoyo a la exportación para Brasil.' }
}

const aboutContent = {
  pt: {
    eyebrow: '01 / Relato',
    lead: 'Agenciamento de indústrias alimentares para empresas que pretendem internacionalizar-se através da exportação para o Brasil.',
    facts: ['Em atividade desde 2013', 'Faro · Aveiro · Portugal'],
    storyLabel: 'A nossa forma de trabalhar',
    storyTitle: 'Conhecimento que abre mercados.',
    paragraphs: [
      'A Relato Temporal é uma empresa de agenciamento de indústrias alimentares que pretendem internacionalizar-se através da exportação para o Brasil, liderada pelo agente Miguel Bregieira. Iniciou a sua atividade em 2013 e tem atualmente escritórios em Faro e Aveiro, Portugal.',
      'A particularidade, a dimensão e a cultura do mercado brasileiro constituem uma grande barreira de entrada para empresas que têm como objetivo esse mercado. O conhecimento empírico, o savoir-faire, do nosso fundador Miguel Bregieira, com experiência no mercado brasileiro desde 2007, é uma chave de sucesso neste percurso.',
      'A descoberta e promoção de produtos formatados aos fatores críticos de sucesso dos consumidores brasileiros é também uma das principais preocupações desta empresa de representação, que proporciona um agenciamento de grande proximidade, praticamente familiar.',
      'Esta preocupação é facilitada pelo facto de os processos internos da própria equipa da Relato seguirem exatamente esses moldes. A equipa é formada por quase uma dezena de profissionais competentes e dedicados.',
      'Esta é, de resto, uma das razões do sucesso da Relato, que tem patrocinado a internacionalização de empresas com ganhos de forte implementação no mercado brasileiro.'
    ],
    servicesLabel: 'Além do agenciamento',
    servicesTitle: 'Apoio à exportação, de ponta a ponta.',
    services: ['Homologação da indústria no Brasil', 'Homologação de produtos', 'Estudos prévios de mercado', 'Consultadoria em marketing internacional']
  },
  en: {
    eyebrow: '01 / Relato',
    lead: 'Food-industry representation for businesses looking to internationalise through exports to Brazil.',
    facts: ['Active since 2013', 'Faro · Aveiro · Portugal'],
    storyLabel: 'How we work',
    storyTitle: 'Knowledge that opens markets.',
    paragraphs: [
      'Relato Temporal is a food-industry representation company for businesses looking to internationalise by exporting to Brazil. Led by agent Miguel Bregieira, it began operations in 2013 and now has offices in Faro and Aveiro, Portugal.',
      'The scale, distinctive character and culture of the Brazilian market create a significant barrier to entry. The empirical expertise, or savoir-faire, of founder Miguel Bregieira, who has worked in the Brazilian market since 2007, is key to navigating it successfully.',
      'Identifying and promoting products shaped around the Brazilian consumer’s critical success factors is a core concern of our representation work, allowing close, almost family-like support.',
      'This approach is reinforced by Relato’s own internal processes and a team of nearly ten skilled, committed professionals.',
      'It is one of the reasons for Relato’s success in supporting companies’ internationalisation and helping them establish a strong presence in Brazil.'
    ],
    servicesLabel: 'Beyond representation',
    servicesTitle: 'End-to-end export support.',
    services: ['Industrial approval in Brazil', 'Product approval', 'Preliminary market studies', 'International marketing consultancy']
  },
  es: {
    eyebrow: '01 / Relato',
    lead: 'Representación de industrias alimentarias para empresas que desean internacionalizarse mediante la exportación a Brasil.',
    facts: ['Desde 2013', 'Faro · Aveiro · Portugal'],
    storyLabel: 'Nuestra forma de trabajar',
    storyTitle: 'Conocimiento que abre mercados.',
    paragraphs: [
      'Relato Temporal es una empresa de representación de industrias alimentarias que desean internacionalizarse mediante la exportación a Brasil. Liderada por el agente Miguel Bregieira, inició su actividad en 2013 y actualmente cuenta con oficinas en Faro y Aveiro, Portugal.',
      'La particularidad, dimensión y cultura del mercado brasileño constituyen una importante barrera de entrada. El conocimiento empírico, o savoir-faire, de nuestro fundador Miguel Bregieira, con experiencia en Brasil desde 2007, es clave para alcanzar el éxito en ese mercado.',
      'La identificación y promoción de productos adaptados a los factores críticos de éxito para el consumidor brasileño es otra preocupación central de nuestra representación, que proporciona un acompañamiento cercano, casi familiar.',
      'Este enfoque se ve reforzado por los procesos internos de Relato y por un equipo de casi diez profesionales competentes y dedicados.',
      'Es una de las razones del éxito de Relato al apoyar la internacionalización de empresas y su sólida implantación en el mercado brasileño.'
    ],
    servicesLabel: 'Además de la representación',
    servicesTitle: 'Apoyo a la exportación de principio a fin.',
    services: ['Homologación industrial en Brasil', 'Homologación de productos', 'Estudios previos de mercado', 'Consultoría en marketing internacional']
  }
}

const industryTranslations = {
  guimarpeixe: { en: 'Selection of high-quality frozen fish and octopus, directly from Portugal.', es: 'Selección de pescado congelado y pulpo de alta calidad, directamente de Portugal.' },
  superfish: { en: 'Specialists in desalted and dry-salted cod, with recognised quality.', es: 'Especialistas en bacalao desalado y salado seco, con calidad reconocida.' },
  gelpinhos: { en: 'Food products focused on quality, convenience and flavour.', es: 'Productos alimentarios centrados en calidad, conveniencia y sabor.' },
  frigosto: { en: 'Tradition and flavour in food solutions for new markets.', es: 'Tradición y sabor en soluciones alimentarias para nuevos mercados.' },
  agroaguiar: { en: 'Portuguese agri-food industry focused on products of origin and quality.', es: 'Agroindustria portuguesa orientada a productos de origen y calidad.' },
  'costa-atlantico': { en: 'Specialist in hake and European hake. Brand currently being formalised.', es: 'Especialista en merluza. Marca en proceso de formalización.' }
}

const guimarpeixeProducts = {
  pt: {
    eyebrow: 'Guimarpeixe / Produtos',
    title: 'Guimarpeixe.',
    intro: 'Com rigorosos padrões de qualidade e um processo que valoriza a sustentabilidade, os nossos produtos são cuidadosamente selecionados para garantir a melhor experiência para o consumidor. Explore a linha completa e conheça cada produto em detalhe.',
    listLabel: 'A nossa seleção',
    catalogueLabel: 'Catálogo virtual',
    catalogueTitle: 'Conheça a linha completa.',
    catalogueText: 'Consulte o catálogo Guimarpeixe para ver formatos, referências e especificações dos produtos.',
    download: 'Abrir catálogo PDF',
    products: [
      { name: 'Posta de Cação', text: 'Cação é um peixe versátil e apreciado, disponível em diversos cortes, ideal para receitas que exigem sabor e textura delicada.' },
      { name: 'Lombo de Cação', text: 'Um corte selecionado de cação, preparado para valorizar receitas de sabor suave e textura delicada.' },
      { name: 'Cubo de Cação', text: 'Uma opção prática de cação, pensada para preparações versáteis e diferentes momentos de consumo.' },
      { name: 'Medalhão de Cação', text: 'Cortes de cação de apresentação cuidada, ideais para pratos que pedem consistência e qualidade.' },
      { name: 'Sardinha Portuguesa', text: 'Um clássico dos mares, conhecido pelo sabor marcante e versatilidade. Perfeita para grelhados, assados ou conservas, é uma excelente escolha para pratos tradicionais e contemporâneos.' }
    ]
  },
  en: {
    eyebrow: 'Guimarpeixe / Products',
    title: 'Guimarpeixe.',
    intro: 'With rigorous quality standards and a process that values sustainability, our products are carefully selected to ensure the best consumer experience. Explore the complete range and discover each product in detail.',
    listLabel: 'Our selection',
    catalogueLabel: 'Digital catalogue',
    catalogueTitle: 'Discover the complete range.',
    catalogueText: 'View the Guimarpeixe catalogue for formats, references and product specifications.',
    download: 'Open PDF catalogue',
    products: [
      { name: 'Dogfish steak', text: 'A versatile and appreciated fish, available in several cuts and ideal for recipes that call for delicate flavour and texture.' },
      { name: 'Dogfish loin', text: 'A selected dogfish cut, prepared to enhance recipes with a mild flavour and delicate texture.' },
      { name: 'Dogfish cubes', text: 'A practical dogfish option, designed for versatile preparations and different occasions.' },
      { name: 'Dogfish medallion', text: 'Carefully presented dogfish cuts, ideal for dishes that require consistency and quality.' },
      { name: 'Portuguese sardine', text: 'A classic from the sea, known for its distinctive flavour and versatility. Perfect grilled, roasted or preserved, it is an excellent choice for traditional and contemporary dishes.' }
    ]
  },
  es: {
    eyebrow: 'Guimarpeixe / Productos',
    title: 'Guimarpeixe.',
    intro: 'Con rigurosos estándares de calidad y un proceso que valora la sostenibilidad, nuestros productos se seleccionan cuidadosamente para garantizar la mejor experiencia al consumidor. Explore la gama completa y conozca cada producto en detalle.',
    listLabel: 'Nuestra selección',
    catalogueLabel: 'Catálogo virtual',
    catalogueTitle: 'Conozca la gama completa.',
    catalogueText: 'Consulte el catálogo Guimarpeixe para ver formatos, referencias y especificaciones de los productos.',
    download: 'Abrir catálogo PDF',
    products: [
      { name: 'Rodaja de cazón', text: 'Un pescado versátil y apreciado, disponible en varios cortes e ideal para recetas que exigen sabor y textura delicada.' },
      { name: 'Lomo de cazón', text: 'Un corte seleccionado de cazón, preparado para realzar recetas de sabor suave y textura delicada.' },
      { name: 'Cubos de cazón', text: 'Una opción práctica de cazón, pensada para preparaciones versátiles y diferentes ocasiones de consumo.' },
      { name: 'Medallón de cazón', text: 'Cortes de cazón de presentación cuidada, ideales para platos que requieren consistencia y calidad.' },
      { name: 'Sardina portuguesa', text: 'Un clásico del mar, conocido por su sabor intenso y versatilidad. Perfecta para la parrilla, al horno o en conserva, es una excelente elección para platos tradicionales y contemporáneos.' }
    ]
  }
}

const guimarpeixeProductImages = {
  0: '/brand/g1.webp',
  2: '/brand/g3.webp',
  3: '/brand/g4.webp',
  4: '/brand/g5.webp'
}

const superfishProducts = {
  pt: {
    eyebrow: 'Superfish / Produtos', title: 'Superfish.', intro: 'Uma ampla seleção de produtos salgados secos, com foco especial no bacalhau. Rigor, origem e formatos preparados para responder às exigências de cada mercado.', listLabel: 'Bacalhau salgado seco', listTitle: 'Uma seleção feita com rigor.', catalogueLabel: 'Catálogo virtual', catalogueTitle: 'Conheça a gama completa.', catalogueText: 'Consulte o catálogo Superfish para ver formatos, referências e especificações detalhadas.', download: 'Abrir catálogo PDF', description: 'Descrição do produto', origin: 'Origem', table: ['Formato', 'Peso', 'Embalagem', 'Paletização'], products: [
      { name: 'Bacalhau Inteiro', species: 'Gadus Morhua / Gadus Macrocephalus', origin: 'Islândia / Noruega / Pacífico', note: 'Espalmado granel', images: ['/brand/s1-1.webp', '/brand/s1-2.webp'], rows: [['Especial Jumbo 4-6', '4,5 kg+', '25 kg', '30 / Pal.'], ['Especial 7-9', '3 - 4,5 kg', '25 kg', '30 / Pal.'], ['Graúdo 10-12', '2 - 3 kg', '15/25 kg', '30 / Pal.'], ['Crescido 13-15', '1,4 - 2 kg', '15/25 kg', '30 / Pal.'], ['Crescido 16-20', '1 - 1,4 kg', '15/25 kg', '30 / Pal.'], ['Corrente 21-30', '700g - 1 kg', '15/25 kg', '30 / Pal.'], ['Corrente 31-40', '500g - 700 g', '15/25 kg', '30 / Pal.']] },
      { name: 'Bacalhau em Lombos', species: 'Gadus Morhua / Gadus Macrocephalus', origin: 'Islândia / Noruega / Pacífico', images: ['/brand/s2-1.webp', '/brand/s2-2.webp'], rows: [['Granel', '300 - 400 g', '5 kg', '54 / Pal.'], ['Granel', '400 g+', '5 kg', '54 / Pal.'], ['Bandeijinha 1 kg', '—', '5 Un.', '54 / Pal.'], ['Bandeijinha 600 g', '—', '10 Un.', '54 / Pal.']] },
      { name: 'Bacalhau em Postas', species: 'Gadus Morhua', origin: 'Islândia / Noruega / Pacífico', images: ['/brand/s3-1.webp', '/brand/s3-2.webp'], rows: [['Granel / Bandeijinha', 'Bacalhau em postas', '10 kg', '54 / Pal.']] },
      { name: 'Bacalhau Desfiado', species: 'Gadus Morhua', origin: 'Islândia / Noruega / Pacífico', images: ['/brand/s4.webp'], rows: [['Granel', '—', '10 kg', '60 / Pal.'], ['Bandeijinha / bolsa 400 g', '—', '20 Un.', '60 / Pal.'], ['Bolsa 1 kg', '—', '10 kg', '60 / Pal.'], ['Bolsa 5 kg', '—', '10 kg', '60 / Pal.']] },
      { name: 'Desfiado de Alaska Polak', species: 'Gadus Chalcogrammus', origin: 'Pacífico', images: ['/brand/s5.webp'], rows: [['Granel', '—', '10 kg', '60 / Pal.'], ['Bandeijinha / bolsa 400 g', '—', '20 Un.', '60 / Pal.'], ['Bolsa 1 kg', '—', '10 kg', '60 / Pal.'], ['Bolsa 5 kg', '—', '10 kg', '60 / Pal.']] }
    ]
  },
  en: {
    eyebrow: 'Superfish / Products', title: 'Superfish.', intro: 'A broad range of dry-salted products, with a special focus on cod. Rigour, origin and formats prepared for the requirements of every market.', listLabel: 'Dry-salted cod', listTitle: 'A range selected with rigour.', catalogueLabel: 'Digital catalogue', catalogueTitle: 'Discover the complete range.', catalogueText: 'View the Superfish catalogue for detailed formats, references and specifications.', download: 'Open PDF catalogue', description: 'Product description', origin: 'Origin', table: ['Format', 'Weight', 'Packaging', 'Palletisation'], products: [
      { name: 'Whole cod', species: 'Gadus Morhua / Gadus Macrocephalus', origin: 'Iceland / Norway / Pacific', note: 'Butterflied, bulk', images: ['/brand/s1-1.webp', '/brand/s1-2.webp'], rows: [['Special Jumbo 4-6', '4.5 kg+', '25 kg', '30 / Pal.'], ['Special 7-9', '3 - 4.5 kg', '25 kg', '30 / Pal.'], ['Large 10-12', '2 - 3 kg', '15/25 kg', '30 / Pal.'], ['Medium 13-15', '1.4 - 2 kg', '15/25 kg', '30 / Pal.'], ['Medium 16-20', '1 - 1.4 kg', '15/25 kg', '30 / Pal.'], ['Standard 21-30', '700g - 1 kg', '15/25 kg', '30 / Pal.'], ['Standard 31-40', '500g - 700 g', '15/25 kg', '30 / Pal.']] },
      { name: 'Cod loins', species: 'Gadus Morhua / Gadus Macrocephalus', origin: 'Iceland / Norway / Pacific', images: ['/brand/s2-1.webp', '/brand/s2-2.webp'], rows: [['Bulk', '300 - 400 g', '5 kg', '54 / Pal.'], ['Bulk', '400 g+', '5 kg', '54 / Pal.'], ['1 kg tray', '—', '5 units', '54 / Pal.'], ['600 g tray', '—', '10 units', '54 / Pal.']] },
      { name: 'Cod portions', species: 'Gadus Morhua', origin: 'Iceland / Norway / Pacific', images: ['/brand/s3-1.webp', '/brand/s3-2.webp'], rows: [['Bulk / tray', 'Cod portions', '10 kg', '54 / Pal.']] },
      { name: 'Shredded cod', species: 'Gadus Morhua', origin: 'Iceland / Norway / Pacific', images: ['/brand/s4.webp'], rows: [['Bulk', '—', '10 kg', '60 / Pal.'], ['400 g tray / bag', '—', '20 units', '60 / Pal.'], ['1 kg bag', '—', '10 kg', '60 / Pal.'], ['5 kg bag', '—', '10 kg', '60 / Pal.']] },
      { name: 'Alaska pollock shreds', species: 'Gadus Chalcogrammus', origin: 'Pacific', images: ['/brand/s5.webp'], rows: [['Bulk', '—', '10 kg', '60 / Pal.'], ['400 g tray / bag', '—', '20 units', '60 / Pal.'], ['1 kg bag', '—', '10 kg', '60 / Pal.'], ['5 kg bag', '—', '10 kg', '60 / Pal.']] }
    ]
  },
  es: {
    eyebrow: 'Superfish / Productos', title: 'Superfish.', intro: 'Una amplia selección de productos salados secos, con especial foco en el bacalao. Rigor, origen y formatos preparados para las exigencias de cada mercado.', listLabel: 'Bacalao salado seco', listTitle: 'Una selección hecha con rigor.', catalogueLabel: 'Catálogo virtual', catalogueTitle: 'Conozca la gama completa.', catalogueText: 'Consulte el catálogo Superfish para ver formatos, referencias y especificaciones detalladas.', download: 'Abrir catálogo PDF', description: 'Descripción del producto', origin: 'Origen', table: ['Formato', 'Peso', 'Embalaje', 'Paletización'], products: [
      { name: 'Bacalao entero', species: 'Gadus Morhua / Gadus Macrocephalus', origin: 'Islandia / Noruega / Pacífico', note: 'Abierto, a granel', images: ['/brand/s1-1.webp', '/brand/s1-2.webp'], rows: [['Especial Jumbo 4-6', '4,5 kg+', '25 kg', '30 / Pal.'], ['Especial 7-9', '3 - 4,5 kg', '25 kg', '30 / Pal.'], ['Grande 10-12', '2 - 3 kg', '15/25 kg', '30 / Pal.'], ['Mediano 13-15', '1,4 - 2 kg', '15/25 kg', '30 / Pal.'], ['Mediano 16-20', '1 - 1,4 kg', '15/25 kg', '30 / Pal.'], ['Corriente 21-30', '700g - 1 kg', '15/25 kg', '30 / Pal.'], ['Corriente 31-40', '500g - 700 g', '15/25 kg', '30 / Pal.']] },
      { name: 'Lomos de bacalao', species: 'Gadus Morhua / Gadus Macrocephalus', origin: 'Islandia / Noruega / Pacífico', images: ['/brand/s2-1.webp', '/brand/s2-2.webp'], rows: [['Granel', '300 - 400 g', '5 kg', '54 / Pal.'], ['Granel', '400 g+', '5 kg', '54 / Pal.'], ['Bandeja 1 kg', '—', '5 un.', '54 / Pal.'], ['Bandeja 600 g', '—', '10 un.', '54 / Pal.']] },
      { name: 'Bacalao en porciones', species: 'Gadus Morhua', origin: 'Islandia / Noruega / Pacífico', images: ['/brand/s3-1.webp', '/brand/s3-2.webp'], rows: [['Granel / bandeja', 'Bacalao en porciones', '10 kg', '54 / Pal.']] },
      { name: 'Bacalao desmigado', species: 'Gadus Morhua', origin: 'Islandia / Noruega / Pacífico', images: ['/brand/s4.webp'], rows: [['Granel', '—', '10 kg', '60 / Pal.'], ['Bandeja / bolsa 400 g', '—', '20 un.', '60 / Pal.'], ['Bolsa 1 kg', '—', '10 kg', '60 / Pal.'], ['Bolsa 5 kg', '—', '10 kg', '60 / Pal.']] },
      { name: 'Desmigado de abadejo de Alaska', species: 'Gadus Chalcogrammus', origin: 'Pacífico', images: ['/brand/s5.webp'], rows: [['Granel', '—', '10 kg', '60 / Pal.'], ['Bandeja / bolsa 400 g', '—', '20 un.', '60 / Pal.'], ['Bolsa 1 kg', '—', '10 kg', '60 / Pal.'], ['Bolsa 5 kg', '—', '10 kg', '60 / Pal.']] }
    ]
  }
}

const superfishRecipes = {
  pt: {
    eyebrow: 'Superfish / Receitas', title: 'Receitas de\nbacalhau.', lead: 'Sete sugestões para levar o bacalhau Superfish à mesa, entre sabores tradicionais e combinações contemporâneas.', difficulty: 'Dificuldade', time: 'Tempo de preparação', portions: 'Porções', minutes: 'min', recipes: [
      { slug: 'lombos-batata-doce', name: 'Lombos de Bacalhau Superfish, Esmagada de Batata Doce e Azeite de Coentros', difficulty: 'Média', time: '50', portions: '4', image: 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/F3FEA314-85C1-4CAD-B3E1-0BDEDF7B5769/Derivates/16b25966cdabc91ea1a555cf82789876afefa055.jpg' },
      { slug: 'salada-grao', name: 'Salada Fria de Bacalhau Superfish e Grão', difficulty: 'Média', time: '30', portions: '4', image: 'https://padariavianney.com.br/web/image/product.image/2181/image_1024/Salada%20de%20Gr%C3%A3o%20de%20Bico%20com%20Bacalhau%20?unique=731f0ba' },
      { slug: 'sopa-tomate-paloco', name: 'Sopa de Tomate e Paloco Superfish', difficulty: 'Média', time: '45', portions: '4', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85' },
      { slug: 'torricado', name: 'Torricado de Bacalhau Superfish', difficulty: 'Fácil', time: '15', portions: '4', image: 'https://images.impresa.pt/sic/2024-09-17-torricado-de-bacalhau-fb755869/1.91x1/mw-1920?outputFormat=jpeg' },
      { slug: 'bacalhau-amendoas', name: 'Bacalhau Superfish no Forno com Amêndoas', difficulty: 'Média', time: '70', portions: '4', image: 'https://media.timeout.com/images/106077952/750/422/image.jpg' },
      { slug: 'caldeirada', name: 'Caldeirada de Bacalhau Superfish', difficulty: 'Média', time: '40', portions: '4', image: 'https://feed.continente.pt/media/rpwc1jpo/caldeirada-de-bacalhau.jpg?anchor=center&format=webp&height=620&mode=crop&rnd=134110430718030000&width=826' },
      { slug: 'gomes-de-sa', name: 'Bacalhau Superfish à Gomes de Sá', difficulty: 'Fácil', time: '30', portions: '4', image: 'https://assets.afcdn.com/recipe/20150310/37263_w648h414c1cx1632cy1224.jpg' }
    ]
  },
  en: {
    eyebrow: 'Superfish / Recipes', title: 'Cod\nrecipes.', lead: 'Seven suggestions for bringing Superfish cod to the table, from traditional flavours to contemporary pairings.', difficulty: 'Difficulty', time: 'Preparation time', portions: 'Servings', minutes: 'min', recipes: [
      { slug: 'lombos-batata-doce', name: 'Superfish Cod Loins with Sweet Potato Mash and Coriander Oil', difficulty: 'Medium', time: '50', portions: '4', image: 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/F3FEA314-85C1-4CAD-B3E1-0BDEDF7B5769/Derivates/16b25966cdabc91ea1a555cf82789876afefa055.jpg' },
      { slug: 'salada-grao', name: 'Cold Superfish Cod and Chickpea Salad', difficulty: 'Medium', time: '30', portions: '4', image: 'https://padariavianney.com.br/web/image/product.image/2181/image_1024/Salada%20de%20Gr%C3%A3o%20de%20Bico%20com%20Bacalhau%20?unique=731f0ba' },
      { slug: 'sopa-tomate-paloco', name: 'Superfish Tomato and Pollock Soup', difficulty: 'Medium', time: '45', portions: '4', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85' },
      { slug: 'torricado', name: 'Superfish Cod Torricado', difficulty: 'Easy', time: '15', portions: '4', image: 'https://images.impresa.pt/sic/2024-09-17-torricado-de-bacalhau-fb755869/1.91x1/mw-1920?outputFormat=jpeg' },
      { slug: 'bacalhau-amendoas', name: 'Oven-baked Superfish Cod with Almonds', difficulty: 'Medium', time: '70', portions: '4', image: 'https://media.timeout.com/images/106077952/750/422/image.jpg' },
      { slug: 'caldeirada', name: 'Superfish Cod Stew', difficulty: 'Medium', time: '40', portions: '4', image: 'https://feed.continente.pt/media/rpwc1jpo/caldeirada-de-bacalhau.jpg?anchor=center&format=webp&height=620&mode=crop&rnd=134110430718030000&width=826' },
      { slug: 'gomes-de-sa', name: 'Superfish Cod Gomes de Sá Style', difficulty: 'Easy', time: '30', portions: '4', image: 'https://assets.afcdn.com/recipe/20150310/37263_w648h414c1cx1632cy1224.jpg' }
    ]
  },
  es: {
    eyebrow: 'Superfish / Recetas', title: 'Recetas de\nbacalao.', lead: 'Siete sugerencias para llevar el bacalao Superfish a la mesa, entre sabores tradicionales y combinaciones contemporáneas.', difficulty: 'Dificultad', time: 'Tiempo de preparación', portions: 'Porciones', minutes: 'min', recipes: [
      { slug: 'lombos-batata-doce', name: 'Lomos de Bacalao Superfish con Puré de Boniato y Aceite de Cilantro', difficulty: 'Media', time: '50', portions: '4', image: 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/F3FEA314-85C1-4CAD-B3E1-0BDEDF7B5769/Derivates/16b25966cdabc91ea1a555cf82789876afefa055.jpg' },
      { slug: 'salada-grao', name: 'Ensalada Fría de Bacalao Superfish y Garbanzos', difficulty: 'Media', time: '30', portions: '4', image: 'https://padariavianney.com.br/web/image/product.image/2181/image_1024/Salada%20de%20Gr%C3%A3o%20de%20Bico%20com%20Bacalhau%20?unique=731f0ba' },
      { slug: 'sopa-tomate-paloco', name: 'Sopa de Tomate y Abadejo Superfish', difficulty: 'Media', time: '45', portions: '4', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85' },
      { slug: 'torricado', name: 'Torricado de Bacalao Superfish', difficulty: 'Fácil', time: '15', portions: '4', image: 'https://images.impresa.pt/sic/2024-09-17-torricado-de-bacalhau-fb755869/1.91x1/mw-1920?outputFormat=jpeg' },
      { slug: 'bacalhau-amendoas', name: 'Bacalao Superfish al Horno con Almendras', difficulty: 'Media', time: '70', portions: '4', image: 'https://media.timeout.com/images/106077952/750/422/image.jpg' },
      { slug: 'caldeirada', name: 'Caldereta de Bacalao Superfish', difficulty: 'Media', time: '40', portions: '4', image: 'https://feed.continente.pt/media/rpwc1jpo/caldeirada-de-bacalhau.jpg?anchor=center&format=webp&height=620&mode=crop&rnd=134110430718030000&width=826' },
      { slug: 'gomes-de-sa', name: 'Bacalao Superfish a la Gomes de Sá', difficulty: 'Fácil', time: '30', portions: '4', image: 'https://assets.afcdn.com/recipe/20150310/37263_w648h414c1cx1632cy1224.jpg' }
    ]
  }
}

const superfishRecipeDetails = {
  back: '← Voltar às receitas', ingredients: 'Ingredientes', method: 'Modo de preparação',
  recipes: {
    'lombos-batata-doce': { ingredients: ['4 lombos de bacalhau Superfish', '4 batatas-doces laranja ou roxa, de tamanho médio', '½ ramo de coentro', '¼ de broa de milho triturada', '2 dentes de alho', 'Azeite a gosto', 'Tomilho a gosto', 'Alecrim a gosto', 'Sal e pimenta a gosto'], steps: ['Numa panela, adicione o azeite, os dentes de alho, o ramo de tomilho, o ramo de alecrim e a folha de louro. Leve ao fogo até atingir uma temperatura entre 70°C e 75°C.', 'Coloque os lombos de bacalhau no azeite e deixe confitar em temperatura constante por cerca de 20 a 30 minutos. Enquanto isso, embrulhe cada batata-doce em papel-alumínio, adicione um pouco de sal e azeite e feche. Leve ao forno a 180°C por cerca de 40 minutos. Retire do forno, abra o papel-alumínio com cuidado e retire a casca.', 'Coloque a polpa da batata numa panela e adicione manteiga e leite até obter uma textura de purê. Reserve.', 'Com a ajuda de um mixer, triture os coentros com o azeite usado para confitar e tempere com um pouco de sal.', 'Para servir, coloque um pouco do purê de batata no prato, disponha o lombo de bacalhau por cima, polvilhe com a broa de milho e regue com o azeite de coentro.'] },
    'salada-grao': { ingredients: ['450g de bacalhau desfiado Superfish', '350g de grão-de-bico cozido', '1 cebola', '1 ramo de salsa picada', '2 ovos cozidos', 'Azeitonas a gosto', 'Sal e pimenta a gosto', 'Azeite a gosto'], steps: ['Coloque uma panela com água para ferver. Assim que começar a ferver, adicione o bacalhau Superfish, desligue o fogo e tampe. Deixe descansar por cerca de 15 minutos.', 'Retire o bacalhau, coloque-o em uma tigela e reserve.', 'Adicione o grão-de-bico e a salsa, misturando tudo muito bem.', 'Tempere com sal, pimenta e um fio de azeite. Acrescente as azeitonas e misture novamente.', 'Sirva com rodelas de ovo cozido.'] },
    'sopa-tomate-paloco': { ingredients: ['1 cebola', '1 alho-poró', '2 dentes de alho', '0,5 dl de azeite', '400g de paloco desfiado demolhado Superfish', '½ lata de tomate pelado', '1,2 litros de água fria', '200g de batata', 'Sal a gosto', 'Coentro a gosto'], steps: ['Pique a cebola, o alho-poró e o alho e refogue-os no azeite. Adicione o paloco desfiado e deixe refogar.', 'Pique o tomate, adicione ao paloco e deixe cozinhar um pouco. Junte a água e tempere com sal.', 'Descasque as batatas, corte-as em cubos e junte à água quando começar a ferver. Cozinhe em fogo baixo por 20 minutos.', 'No final, ajuste os temperos, polvilhe com coentro picado e sirva.'] },
    torricado: { ingredients: ['2 lombos de bacalhau Superfish sem espinha', '1 folha de louro', '4 fatias de pão alentejano', '4 dentes de alho', 'Azeite a gosto', 'Coentro a gosto'], steps: ['Coloque uma panela com água no fogo e, assim que ferver, adicione os lombos de bacalhau e a folha de louro. Tampe, desligue o fogo e deixe descansar por 15 minutos.', 'Ao final, retire o bacalhau e desfie em lascas. Reserve.', 'Em uma tigela, misture azeite, 1 dente de alho picado e coentro picado. Misture bem e reserve.', 'Corte as fatias de pão em cubos, coloque em uma assadeira junto com os 3 dentes de alho e tempere com sal, pimenta e bastante azeite. Leve ao forno a 200°C até que fiquem bem torrados.', 'Para servir, disponha o bacalhau no prato e distribua o pão torrado ao redor.'] },
    'bacalhau-amendoas': { ingredients: ['4 postas de bacalhau Superfish sem espinha', '1 kg de batatas', '2 cebolas grandes', '3 dentes de alho', 'Azeite a gosto', '100g de amêndoas', '50g de pão', '3 colheres de sopa de salsa'], steps: ['Triture o pão com a salsa e tempere com sal.', 'Adicione as amêndoas laminadas e misture. Reserve.', 'Em uma assadeira, coloque as cebolas fatiadas e os dentes de alho. Por cima, adicione as batatas com casca. Leve ao forno a 180°C por 30 minutos.', 'Após 30 minutos, retire a assadeira do forno e coloque as postas de bacalhau.', 'Espalhe o pão triturado com a salsa e as amêndoas sobre o bacalhau.', 'Leve de volta ao forno por mais 30 minutos ou até o bacalhau estar cozido.'] },
    caldeirada: { ingredients: ['4 postas de bacalhau Superfish', '500g de batatas descascadas e cortadas em rodelas', '2 cebolas cortadas em rodelas', '3 dentes de alho picados', '1 pimentão vermelho', '2 folhas de louro', '1 ramo de salsa', '1 ramo de coentro', '500g de tomate em cubos', '1 colher de chá de páprica doce', '1 colher de chá de pimenta', '200ml de azeite', '1 copo de vinho branco', '100ml de água', 'Sal e pimenta a gosto'], steps: ['No fundo de uma panela, faça camadas com a cebola, alho, tomate, pimentão, salsa, coentro, folha de louro e as batatas em rodelas.', 'Adicione o vinho, as especiarias, azeite, água e tempere com sal e pimenta.', 'Coloque as postas de bacalhau por cima, leve a panela ao fogo e tampe. Deixe levantar fervura sem mexer.', 'Cozinhe por cerca de 20 a 25 minutos em fogo baixo.', 'Verifique se as batatas estão cozidas. Se sim, a caldeirada está pronta.', 'Sirva polvilhada com coentro e salsa picados.'] },
    'gomes-de-sa': { ingredients: ['700g de batatas descascadas, cortadas em rodelas e cozidas', '400g de postas de bacalhau Superfish', '800ml de água', '180ml de azeite', '600g de cebolas', '2 dentes de alho', '1 folha de louro', 'Salsa picada a gosto', 'Pimenta a gosto', 'Sal a gosto', 'Azeitonas pretas a gosto', '2 ovos cozidos'], steps: ['Em uma panela, refogue as cebolas e o alho com a folha de louro no azeite.', 'Em uma assadeira alta, faça uma camada de batatas, seguida de lascas de bacalhau e de cebola. Repita as camadas, finalizando com uma camada de cebola.', 'Leve ao forno a 180°C por 10 minutos, até dourar.', 'Sirva polvilhado com salsa picada e decorado com rodelas de ovo cozido e azeitonas pretas.'] }
  }
}

const guimarpeixeRecipes = {
  pt: {
    eyebrow: 'Guimarpeixe / Receitas', title: 'Receitas para\npartilhar.', lead: 'Ideias simples para levar os produtos Guimarpeixe à mesa, com sabor e praticidade.', difficulty: 'Dificuldade', time: 'Tempo de preparação', portions: 'Porções', minutes: 'min',
    recipes: [
      { slug: 'sardinhas-em-escabeche', name: 'Sardinhas em Escabeche', difficulty: 'Média', time: '60', portions: '4', image: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?auto=format&fit=crop&w=1400&q=85' },
      { slug: 'moqueca-de-cacao', name: 'Moqueca de Cação', difficulty: 'Média', time: '40', portions: '4', image: 'https://www.guiadasemana.com.br/contentFiles/image/2022/03/FEA/68367_shutterstock-1903614613.jpg' },
      { slug: 'medalhao-de-cacao-grelhado', name: 'Medalhão de Cação Grelhado', difficulty: 'Fácil', time: '15', portions: '2', image: 'https://resizer.otstatic.com/v3/photos/42386428-1' },
      { slug: 'cacao-grelhado', name: 'Cação Grelhado', difficulty: 'Fácil', time: '15', portions: '2', image: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?auto=format&fit=crop&w=1400&q=85' }
    ]
  },
  en: {
    eyebrow: 'Guimarpeixe / Recipes', title: 'Recipes to\nshare.', lead: 'Simple ideas for bringing Guimarpeixe products to the table with flavour and ease.', difficulty: 'Difficulty', time: 'Preparation time', portions: 'Servings', minutes: 'min',
    recipes: [
      { slug: 'sardinhas-em-escabeche', name: 'Sardines in Escabeche', difficulty: 'Medium', time: '60', portions: '4', image: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?auto=format&fit=crop&w=1400&q=85' },
      { slug: 'moqueca-de-cacao', name: 'Dogfish moqueca', difficulty: 'Medium', time: '40', portions: '4', image: 'https://www.guiadasemana.com.br/contentFiles/image/2022/03/FEA/68367_shutterstock-1903614613.jpg' },
      { slug: 'medalhao-de-cacao-grelhado', name: 'Grilled dogfish medallion', difficulty: 'Easy', time: '15', portions: '2', image: 'https://resizer.otstatic.com/v3/photos/42386428-1' },
      { slug: 'cacao-grelhado', name: 'Grilled dogfish', difficulty: 'Easy', time: '15', portions: '2', image: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?auto=format&fit=crop&w=1400&q=85' }
    ]
  },
  es: {
    eyebrow: 'Guimarpeixe / Recetas', title: 'Recetas para\ncompartir.', lead: 'Ideas sencillas para llevar los productos Guimarpeixe a la mesa, con sabor y practicidad.', difficulty: 'Dificultad', time: 'Tiempo de preparación', portions: 'Porciones', minutes: 'min',
    recipes: [
      { slug: 'sardinhas-em-escabeche', name: 'Sardinas en escabeche', difficulty: 'Media', time: '60', portions: '4', image: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?auto=format&fit=crop&w=1400&q=85' },
      { slug: 'moqueca-de-cacao', name: 'Moqueca de cazón', difficulty: 'Media', time: '40', portions: '4', image: 'https://www.guiadasemana.com.br/contentFiles/image/2022/03/FEA/68367_shutterstock-1903614613.jpg' },
      { slug: 'medalhao-de-cacao-grelhado', name: 'Medallón de cazón a la parrilla', difficulty: 'Fácil', time: '15', portions: '2', image: 'https://resizer.otstatic.com/v3/photos/42386428-1' },
      { slug: 'cacao-grelhado', name: 'Cazón a la parrilla', difficulty: 'Fácil', time: '15', portions: '2', image: 'https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc?auto=format&fit=crop&w=1400&q=85' }
    ]
  }
}

const recipeDetails = {
  pt: {
    back: '← Voltar às receitas', ingredients: 'Ingredientes', method: 'Modo de preparação',
    recipes: {
      'sardinhas-em-escabeche': { ingredients: ['Sal a gosto', '4 sardinhas', '½ pimento vermelho', '½ pimento verde', '4 fatias de broa', 'Azeite a gosto', '2 colheres de sopa de vinagre', '1 colher de café de pimentão doce', '3 folhas de louro', '½ cebola às rodelas', '2 alhos laminados', 'Água (o suficiente)'], steps: ['Limpe as sardinhas e tempere com sal e sumo de limão.', 'Numa panela, aqueça azeite e frite as sardinhas rapidamente. Reserve.', 'Na mesma panela, adicione cebola, alho, cenoura e pimentão. Refogue.', 'Acrescente vinagre, água, louro e temperos. Cozinhe por alguns minutos.', 'Coloque as sardinhas de volta na panela e cozinhe em lume brando por 10 a 15 minutos.'] },
      'moqueca-de-cacao': { ingredients: ['300g de cação', '¼ pimento vermelho', '¼ pimento verde', '½ tomate às rodelas', '1 cebola às rodelas', '100ml de vinho branco', '2 colheres de chá de óleo de palma', '1 malagueta', 'Sal a gosto', '90ml de leite de coco', 'Coentros a gosto', '100g de caju'], steps: ['Tempere o cação com limão, sal e pimenta. Reserve.', 'Numa panela, aqueça azeite e refogue cebola e alho.', 'Adicione pimento, tomate, coentros e leite de coco. Cozinhe até os legumes amolecerem.', 'Acrescente o cação e cozinhe por cerca de 15 a 20 minutos.'] },
      'medalhao-de-cacao-grelhado': { ingredients: ['1 medalhão de cação', '4 batatas às rodelas', '100g de brócolos', '1 limão', 'Pimenta a gosto', 'Sal a gosto', 'Azeite a gosto', '50g de manteiga'], steps: ['Tempere os medalhões de cação com sal, pimenta e sumo de limão.', 'Aqueça uma grelha ou frigideira com um pouco de azeite.', 'Grelhe os medalhões durante cerca de 3 a 4 minutos de cada lado, até dourarem.'] },
      'cacao-grelhado': { ingredients: ['4 batatas', '2 lombos de cação', '100g de brócolos', '1 limão', 'Pimenta a gosto', 'Sal a gosto', 'Azeite a gosto', 'Cação'], steps: ['Tempere o cação com sal, pimenta e limão.', 'Aqueça uma grelha ou frigideira com azeite.', 'Grelhe durante 5 a 7 minutos de cada lado, até estar cozinhado.'] }
    }
  },
  en: {
    back: '← Back to recipes', ingredients: 'Ingredients', method: 'Method',
    recipes: {
      'sardinhas-em-escabeche': { ingredients: ['Salt to taste', '4 sardines', '½ red pepper', '½ green pepper', '4 slices of cornbread', 'Olive oil to taste', '2 tablespoons vinegar', '1 teaspoon sweet paprika', '3 bay leaves', '½ sliced onion', '2 sliced garlic cloves', 'Water (as needed)'], steps: ['Clean the sardines and season with salt and lemon juice.', 'Heat olive oil in a pan and quickly fry the sardines. Set aside.', 'In the same pan, add onion, garlic, carrot and pepper. Sauté.', 'Add vinegar, water, bay leaves and seasonings. Cook for a few minutes.', 'Return the sardines to the pan and cook over a low heat for 10 to 15 minutes.'] },
      'moqueca-de-cacao': { ingredients: ['300g dogfish', '¼ red pepper', '¼ green pepper', '½ sliced tomato', '1 sliced onion', '100ml white wine', '2 teaspoons palm oil', '1 chilli pepper', 'Salt to taste', '90ml coconut milk', 'Coriander to taste', '100g cashew nuts'], steps: ['Season the dogfish with lemon, salt and pepper. Set aside.', 'Heat olive oil in a pan and sauté the onion and garlic.', 'Add pepper, tomato, coriander and coconut milk. Cook until the vegetables soften.', 'Add the dogfish and cook for around 15 to 20 minutes.'] },
      'medalhao-de-cacao-grelhado': { ingredients: ['1 dogfish medallion', '4 sliced potatoes', '100g broccoli', '1 lemon', 'Pepper to taste', 'Salt to taste', 'Olive oil to taste', '50g butter'], steps: ['Season the dogfish medallions with salt, pepper and lemon juice.', 'Heat a grill or frying pan with a little olive oil.', 'Grill the medallions for around 3 to 4 minutes on each side, until golden.'] },
      'cacao-grelhado': { ingredients: ['4 potatoes', '2 dogfish fillets', '100g broccoli', '1 lemon', 'Pepper to taste', 'Salt to taste', 'Olive oil to taste', 'Dogfish'], steps: ['Season the dogfish with salt, pepper and lemon.', 'Heat a grill or frying pan with olive oil.', 'Grill for 5 to 7 minutes on each side, until cooked through.'] }
    }
  },
  es: {
    back: '← Volver a recetas', ingredients: 'Ingredientes', method: 'Modo de preparación',
    recipes: {
      'sardinhas-em-escabeche': { ingredients: ['Sal al gusto', '4 sardinas', '½ pimiento rojo', '½ pimiento verde', '4 rebanadas de pan de maíz', 'Aceite de oliva al gusto', '2 cucharadas de vinagre', '1 cucharadita de pimentón dulce', '3 hojas de laurel', '½ cebolla en rodajas', '2 dientes de ajo laminados', 'Agua (la necesaria)'], steps: ['Limpie las sardinas y condimente con sal y zumo de limón.', 'Caliente aceite de oliva en una sartén y fría las sardinas rápidamente. Reserve.', 'En la misma sartén, añada cebolla, ajo, zanahoria y pimiento. Sofría.', 'Añada vinagre, agua, laurel y condimentos. Cocine unos minutos.', 'Vuelva a poner las sardinas en la sartén y cocine a fuego bajo durante 10 a 15 minutos.'] },
      'moqueca-de-cacao': { ingredients: ['300g de cazón', '¼ pimiento rojo', '¼ pimiento verde', '½ tomate en rodajas', '1 cebolla en rodajas', '100ml de vino blanco', '2 cucharaditas de aceite de palma', '1 guindilla', 'Sal al gusto', '90ml de leche de coco', 'Cilantro al gusto', '100g de anacardos'], steps: ['Condimente el cazón con limón, sal y pimienta. Reserve.', 'Caliente aceite de oliva en una sartén y sofría la cebolla y el ajo.', 'Añada pimiento, tomate, cilantro y leche de coco. Cocine hasta que las verduras se ablanden.', 'Añada el cazón y cocine durante unos 15 a 20 minutos.'] },
      'medalhao-de-cacao-grelhado': { ingredients: ['1 medallón de cazón', '4 patatas en rodajas', '100g de brócoli', '1 limón', 'Pimienta al gusto', 'Sal al gusto', 'Aceite de oliva al gusto', '50g de mantequilla'], steps: ['Condimente los medallones de cazón con sal, pimienta y zumo de limón.', 'Caliente una parrilla o sartén con un poco de aceite de oliva.', 'Asa los medallones durante 3 a 4 minutos por cada lado, hasta dorar.'] },
      'cacao-grelhado': { ingredients: ['4 patatas', '2 lomos de cazón', '100g de brócoli', '1 limón', 'Pimienta al gusto', 'Sal al gusto', 'Aceite de oliva al gusto', 'Cazón'], steps: ['Condimente el cazón con sal, pimienta y limón.', 'Caliente una parrilla o sartén con aceite de oliva.', 'Asa durante 5 a 7 minutos por cada lado, hasta que esté cocinado.'] }
    }
  }
}

const postTranslations = {
  'financiamento-pme-portuguesa': {
    en: { title: 'What financing does a Portuguese SME need?', subtitle: 'Practical diagnosis and debt monitoring.', date: 'July 2012', intro: 'Growing, increasing sales and maintaining liquidity do not always move at the same pace. This study addresses working-capital needs and the importance of monitoring debt in small and medium-sized businesses.', sections: [{ heading: 'Financing the business cycle', paragraphs: ['A company needs capital to finance its structure and operations. Between buying raw materials, producing, holding inventory, delivering and collecting from customers, there is an operating cycle that consumes resources.', 'Financing needs are not static: they vary with sales volume, inventory turnover, credit granted to customers and terms negotiated with suppliers. Tracking these variables supports decisions before cash pressure emerges.'] }, { heading: 'Working-capital requirements', paragraphs: ['The diagnosis proposes a simple reading of the short-term position: WCR = Customers + Inventory - Suppliers. When the result is positive, the company needs additional resources to bridge the gap between paying and collecting.', 'The formula does not replace management analysis, but turns accounting data into a useful indicator for anticipating needs and discussing credit solutions, equity or renegotiated terms.'] }, { heading: 'Monitoring to make better decisions', paragraphs: ['Average collection and payment periods and inventory turnover should be observed together. A commercial improvement that increases sales may, for example, demand more inventory and more customer credit, temporarily worsening liquidity needs.', 'Continuous monitoring helps balance growth, risk and financial capacity. For an SME, this discipline makes the effects of day-to-day decisions visible and supports a more transparent relationship with financial partners.'] }] },
    es: { title: '¿Qué financiación necesita una pyme portuguesa?', subtitle: 'Diagnóstico práctico y seguimiento de la deuda.', date: 'Julio de 2012', intro: 'Crecer, vender más y mantener liquidez no siempre avanzan al mismo ritmo. Este estudio aborda las necesidades de fondo de maniobra y la importancia de controlar la deuda en una pequeña o mediana empresa.', sections: [{ heading: 'Financiar el ciclo empresarial', paragraphs: ['Una empresa necesita capital para financiar su estructura y actividad. Entre comprar materias primas, producir, mantener existencias, entregar y cobrar al cliente, existe un ciclo operativo que consume recursos.', 'Las necesidades de financiación no son estáticas: varían con el volumen de ventas, la rotación de inventarios, el crédito concedido a clientes y las condiciones negociadas con proveedores. Seguir estas variables permite decidir antes de que aparezca presión de tesorería.'] }, { heading: 'Necesidades de fondo de maniobra', paragraphs: ['El diagnóstico propone una lectura sencilla de la posición a corto plazo: NFM = Clientes + Existencias - Proveedores. Cuando el resultado es positivo, la empresa necesita recursos adicionales para sostener el intervalo entre pagar y cobrar.', 'La fórmula no sustituye el análisis de gestión, pero convierte la información contable en un indicador útil para anticipar necesidades y debatir crédito, capital propio o renegociación de plazos.'] }, { heading: 'Supervisar para decidir mejor', paragraphs: ['Los plazos medios de cobro, pago y rotación de existencias deben observarse conjuntamente. Una mejora comercial que aumente las ventas puede requerir más inventario y más crédito a clientes, agravando temporalmente la necesidad de liquidez.', 'El seguimiento continuo ayuda a equilibrar crecimiento, riesgo y capacidad financiera. Para una pyme, esta disciplina hace visibles los efectos de las decisiones diarias y favorece una relación más transparente con socios financieros.'] }] }
  },
  'no-meio-da-tabela': {
    en: { title: 'Middle of the table', subtitle: 'Companies are testing higher seafood export flows, but reality still keeps Brazil away from the leading competitors in the planet’s most profitable business.', date: 'Brazilian market', intro: 'Brazil brings together scale, coastline and growing demand, yet still has a long way to turn this potential into a stronger position in international seafood trade.', quote: 'A magnificent market of enormous diamonds. But in the rough: a market where almost everything was still to be done.', sections: [{ heading: 'Potential that needs structure', paragraphs: ['Seafood production, consumption and trade have gained worldwide relevance in recent decades. In this scenario, the Brazilian market has the scale to attract investment, new brands and international partners.', 'The challenge is turning resources and domestic demand into value chains capable of competing. Logistics, predictability, technology, processing and distribution define the passage from potential to results.'] }, { heading: 'Exporting is more than selling', paragraphs: ['International presence depends on strategy and continuity. For food-industry businesses, exporting means understanding regulations, documentation, product positioning, distribution channels and consumption habits in each market.', 'The Portugal-Brazil relationship creates room for differentiated products, technical expertise and commercial cooperation. The process, however, requires preparation to reduce risk and build sustainable operations.'] }, { heading: 'An ecosystem for growth', paragraphs: ['The article points to the need for coordinated action between industry, public bodies, education and market operators. Creating clusters and reinforcing specialisation can make the sector more competitive.', 'This is where commercial representation adds value: bringing partners closer, translating requirements and helping every project reach Brazil with greater clarity and consistency.'] }] },
    es: { title: 'A mitad de la tabla', subtitle: 'Las empresas ensayan un mayor flujo exportador de pescado, pero la realidad todavía mantiene a Brasil lejos de los principales competidores del negocio más rentable del planeta.', date: 'Mercado brasileño', intro: 'Brasil reúne escala, litoral y demanda creciente, pero aún tiene un largo camino para transformar este potencial en una presencia más fuerte en el comercio internacional de pescado.', quote: 'Un magnífico mercado de diamantes de enorme magnitud. Pero en bruto: un mercado donde todavía casi todo estaba por hacer.', sections: [{ heading: 'Potencial que necesita estructura', paragraphs: ['La producción, el consumo y el comercio de pescado han ganado relevancia mundial en las últimas décadas. En este escenario, el mercado brasileño tiene dimensión para atraer inversión, nuevas marcas y socios internacionales.', 'El reto es convertir recursos y demanda interna en cadenas de valor capaces de competir. Logística, previsibilidad, tecnología, transformación y distribución definen el paso del potencial al resultado.'] }, { heading: 'Exportar es más que vender', paragraphs: ['La presencia internacional depende de estrategia y continuidad. Para las empresas alimentarias, exportar exige comprender normas, documentación, posicionamiento de producto, canales de distribución y hábitos de consumo de cada mercado.', 'La relación entre Portugal y Brasil abre espacio para productos diferenciados, conocimiento técnico y cooperación comercial. El proceso, sin embargo, exige preparación para reducir riesgos y construir operaciones sostenibles.'] }, { heading: 'Un ecosistema para crecer', paragraphs: ['El artículo señala la necesidad de una actuación organizada entre industria, entidades públicas, formación y operadores de mercado. La creación de clústeres y el refuerzo de la especialización pueden hacer el sector más competitivo.', 'Es en este espacio donde la representación comercial aporta valor: acercar socios, traducir exigencias y ayudar a cada proyecto a llegar a Brasil con mayor claridad y consistencia.'] }] }
  }
}

const getCategoryLabel = (category, language) => category.labels[language] || category.labels.pt
const getIndustry = (industry, language) => ({ ...industry, description: industryTranslations[industry.slug]?.[language] || industry.description })
const getPost = (post, language) => ({ ...post, ...(postTranslations[post.slug]?.[language] || {}) })

function Icon({ name }) {
  const paths = { search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>, menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>, close: <><path d="M6 6l12 12M18 6 6 18" /></>, arrow: <path d="M12 19V5m-6 6 6-6 6 6" /> }
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>
}

function ContactIcon({ type }) {
  const paths = {
    phone: <><path d="M6.5 3.5 9 7.7 7.4 9.5a14.4 14.4 0 0 0 7.1 7.1l1.8-1.6 4.2 2.5-1 3.4c-.2.7-.9 1.2-1.7 1.1C9.5 21.2 2.8 14.5 2 6.2c-.1-.8.4-1.5 1.1-1.7l3.4-1Z" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 7 8 6 8-6" /></>,
    pin: <><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[type]}</svg>
}

function IngredientIcon({ type }) {
  const paths = {
    lemon: <><circle cx="12" cy="12" r="7.5" /><path d="M6.7 6.8 17.3 17.2M12 4.5v15M4.5 12h15" /></>,
    fish: <><path d="M4 12c3.1-4.2 8.8-4.2 12 0-3.2 4.2-8.9 4.2-12 0Z" /><path d="m16 12 4-3v6l-4-3ZM9 11.5h.01" /></>,
    produce: <><path d="M6 18c0-6.5 4.3-10.5 11-12-1.3 6.5-5 10.4-11 12Z" /><path d="M7 17c2.8-3 5.2-5.3 8.5-7.5" /></>,
    starch: <><path d="M12 4c4.5 1.8 6.5 5.1 5.2 9.4-1 3.5-3.2 6-5.2 6.6-2-1-4.2-3.1-5.2-6.6C5.5 9.1 7.5 5.8 12 4Z" /><path d="M9.2 9.5c1.7.6 3.9.6 5.6 0M9.2 13c1.7.6 3.9.6 5.6 0" /></>,
    liquid: <><path d="M12 3.5S6.7 10 6.7 14.1a5.3 5.3 0 1 0 10.6 0C17.3 10 12 3.5 12 3.5Z" /><path d="M9.4 15.3c.5 1.1 1.4 1.7 2.6 1.8" /></>,
    seasoning: <><circle cx="12" cy="12" r="7" /><path d="M12 8v8M8 12h8" /></>
  }
  return <svg className="ingredient-icon" aria-hidden="true" viewBox="0 0 24 24">{paths[type]}</svg>
}

function getIngredientType(ingredient) {
  const value = ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (value.includes('limao') || value.includes('lemon')) return 'lemon'
  if (/(sard|cacao|dogfish|fish|bacalhau|cod|paloco|pollock)/.test(value)) return 'fish'
  if (/(piment|tomate|cebola|alho|brocol|coentr|salsa|caju|chilli|pepper|onion|garlic|carrot|vegetable|alhoporo)/.test(value)) return 'produce'
  if (/(batata|potato|broa|bread|pao|grao|chickpea)/.test(value)) return 'starch'
  if (/(azeite|oil|vinho|wine|vinagre|vinegar|leite|milk|agua|water)/.test(value)) return 'liquid'
  return 'seasoning'
}

function Header({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [blogMenuDismissed, setBlogMenuDismissed] = useState(false)
  const languagePickerRef = useRef(null)
  const t = copy[language]
  const links = [['/', t.home], ['/sobre-nos', t.about], ['/miguel-bregieira', t.miguel], ['/industrias', t.industries], ['/blog', t.blog], ['/contactos', t.contact], ['/area-reservada', t.reserved]]
  useEffect(() => {
    const closeLanguagePicker = (event) => {
      if (!languagePickerRef.current?.contains(event.target)) setLanguageOpen(false)
    }
    document.addEventListener('pointerdown', closeLanguagePicker)
    return () => document.removeEventListener('pointerdown', closeLanguagePicker)
  }, [])
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="Relato - Página inicial"><img src="/brand/relato-logo-white.png" alt="Relato" /></Link>
    <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">{links.map(([to, label]) => to === '/blog' ? <div className={blogMenuDismissed ? 'nav-dropdown is-dismissed' : 'nav-dropdown'} key={to} onMouseEnter={() => setBlogMenuDismissed(false)} onMouseLeave={() => setBlogMenuDismissed(true)}><NavLink to={to} onClick={() => { setMenuOpen(false); setBlogMenuDismissed(true) }}>{label}</NavLink><div className="nav-dropdown-menu">{blogCategories.map((category) => <Link key={category.id} to={category.id === 'all' ? '/blog' : `/blog?categoria=${category.id}`} onClick={() => { setMenuOpen(false); setBlogMenuDismissed(true) }}>{getCategoryLabel(category, language)}</Link>)}</div></div> : <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={to === '/area-reservada' ? 'reserved-link' : ''}>{label}{to === '/area-reservada' && <small>{t.comingSoon}</small>}</NavLink>)}</nav>
    <div className="header-actions">
      <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label={t.search}><Icon name="search" /></button>
      <div className="language-picker" ref={languagePickerRef}><button type="button" onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><span className="flag" aria-hidden="true">{languages.find((item) => item.code === language).flag}</span>{languages.find((item) => item.code === language).label}<span>⌄</span></button>{languageOpen && <div className="language-menu">{languages.map((item) => <button key={item.code} className={item.code === language ? 'selected' : ''} type="button" onClick={() => { setLanguage(item.code); setLanguageOpen(false) }}><span className="flag" aria-hidden="true">{item.flag}</span>{item.label}<small>{item.name}</small></button>)}</div>}</div>
      <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div>
    {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} t={t} language={language} />}
  </header>
}

function SearchPanel({ onClose, t, language }) {
  const [value, setValue] = useState('')
  const c = pageContent[language]
  const about = aboutContent[language]
  const guimarpeixe = guimarpeixeProducts[language]
  const recipes = guimarpeixeRecipes[language]
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])
  const resultTypes = language === 'en' ? { page: 'Page', profile: 'Profile', industry: 'Industry', publication: 'Publication', category: 'Category' } : language === 'es' ? { page: 'Página', profile: 'Perfil', industry: 'Industria', publication: 'Publicación', category: 'Categoría' } : { page: 'Página', profile: 'Perfil', industry: 'Indústria', publication: 'Publicação', category: 'Categoria' }
  const entries = [
    { to: '/', title: t.home, type: resultTypes.page, content: `${c.home.introTitle} ${c.home.introText} ${c.home.bannerTitle}` },
    { to: '/sobre-nos', title: t.about, type: resultTypes.page, content: `${about.lead} ${about.paragraphs.join(' ')} ${about.services.join(' ')}` },
    { to: '/miguel-bregieira', title: 'Miguel Bregieira', type: resultTypes.profile, content: `${c.miguel.tagline} ${c.miguel.pull} ${c.miguel.paragraphs.join(' ')}` },
    { to: '/industrias', title: t.industries, type: resultTypes.page, content: `${c.industries.title} ${c.industries.text}` },
    { to: '/contactos', title: t.contact, type: resultTypes.page, content: `${c.contact.text} Faro Aveiro Gafanha Nazaré Avenida 5 de Outubro Travessa Mestre Mónica` },
    { to: '/area-reservada', title: t.reserved, type: resultTypes.page, content: c.reserved.text },
    { to: '/industrias/guimarpeixe/produtos', title: `Guimarpeixe · ${guimarpeixe.listLabel}`, type: resultTypes.industry, content: `${guimarpeixe.intro} ${guimarpeixe.products.map((product) => `${product.name} ${product.text}`).join(' ')}` },
    { to: '/industrias/superfish/produtos', title: `Superfish · ${superfishProducts[language].listLabel}`, type: resultTypes.industry, content: `${superfishProducts[language].intro} ${superfishProducts[language].products.map((product) => `${product.name} ${product.species} ${product.origin} ${product.rows.flat().join(' ')}`).join(' ')}` },
    { to: '/industrias/superfish/receitas', title: `Superfish · ${superfishRecipes[language].eyebrow.split(' / ')[1]}`, type: resultTypes.industry, content: `${superfishRecipes[language].lead} ${superfishRecipes[language].recipes.map((recipe) => `${recipe.name} ${recipe.difficulty} ${recipe.time}`).join(' ')}` },
    { to: '/industrias/guimarpeixe/receitas', title: `Guimarpeixe · ${recipes.eyebrow.split(' / ')[1]}`, type: resultTypes.industry, content: `${recipes.lead} ${recipes.recipes.map((recipe) => `${recipe.name} ${recipe.difficulty} ${recipe.time}`).join(' ')}` },
    ...recipes.recipes.map((recipe) => ({ to: `/industrias/guimarpeixe/receitas/${recipe.slug}`, title: recipe.name, type: resultTypes.industry, content: `${recipe.difficulty} ${recipe.time} ${recipe.portions} ${recipeDetails[language].recipes[recipe.slug].ingredients.join(' ')} ${recipeDetails[language].recipes[recipe.slug].steps.join(' ')}` })),
    ...industryDirectory.map((industry) => { const item = getIndustry(industry, language); return { to: '/industrias', title: item.name, type: resultTypes.industry, content: `${item.name} ${item.description} ${Object.values(c.industries.actions).join(' ')}` } }),
    ...blogPosts.map((post) => { const item = getPost(post, language); return { to: `/blog/${item.slug}`, title: item.title, type: resultTypes.publication, content: `${item.subtitle} ${item.author} ${item.intro} ${item.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ')} ${postCategories[item.slug]?.map((id) => getCategoryLabel(blogCategories.find((category) => category.id === id), language)).join(' ')}` } }),
    ...blogCategories.filter((category) => category.id !== 'all').map((category) => ({ to: `/blog?categoria=${category.id}`, title: getCategoryLabel(category, language), type: resultTypes.category, content: `blog publicação ${getCategoryLabel(category, language)}` }))
  ]
  const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const query = normalize(value.trim())
  const results = query ? entries.filter((entry) => normalize(`${entry.title} ${entry.content}`).includes(query)) : []
  return <div className="search-panel" role="dialog" aria-modal="true" aria-label={t.search}><div className="search-inner"><div className="search-field"><Icon name="search" /><input autoFocus value={value} onChange={(event) => setValue(event.target.value)} placeholder={`${t.search}...`} /><button type="button" onClick={onClose}><Icon name="close" /></button></div><div className="search-results">{results.map((result) => <Link key={`${result.type}-${result.to}-${result.title}`} to={result.to} onClick={onClose}><span><small>{result.type}</small>{result.title}</span><b>↗</b></Link>)}{query && results.length === 0 && <p>{language === 'en' ? 'No results found.' : language === 'es' ? 'No se encontraron resultados.' : 'Nenhum resultado encontrado.'}</p>}</div></div></div>
}

function Footer({ t, language }) {
  const c = pageContent[language]
  const links = [['/', t.home], ['/sobre-nos', t.about], ['/miguel-bregieira', t.miguel], ['/industrias', t.industries], ['/blog', t.blog], ['/contactos', t.contact]]
  return <footer className="site-footer"><div className="footer-grid">
    <div className="footer-brand"><img src="/brand/relato-logo-white.png" alt="Relato" /><p>{c.footer}</p></div>
    <div><h2>{t.footerMenu}</h2><div className="footer-links">{links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div></div>
    <div><h2>{t.footerContact}</h2><a href="tel:+351937040541">+351 937 040 541</a><a href="mailto:miguel.bregieira@gmail.com">miguel.bregieira@gmail.com</a><a href="https://www.relatotemporal.pt">www.relatotemporal.pt</a></div>
    <div className="footer-addresses"><h2>{t.footerAddress}</h2><a href="https://www.google.com/maps/search/?api=1&query=Avenida+5+de+Outubro+82A,+Faro,+Portugal" target="_blank" rel="noreferrer"><b>Faro</b>Avenida 5 de Outubro 82A<br />Faro · Portugal<span>{language === 'en' ? 'View on map' : language === 'es' ? 'Ver en el mapa' : 'Ver no mapa'} ↗</span></a><a href="https://www.google.com/maps/search/?api=1&query=Travessa+Mestre+Monica+12,+Gafanha+da+Nazare,+Portugal" target="_blank" rel="noreferrer"><b>Aveiro</b>Travessa Mestre Mónica 12<br />Gafanha da Nazaré · Portugal<span>{language === 'en' ? 'View on map' : language === 'es' ? 'Ver en el mapa' : 'Ver no mapa'} ↗</span></a></div>
  </div><div className="footer-bottom"><p>Relato Temporal - Unipessoal, Lda</p><p>{language === 'en' ? 'Developed by ' : language === 'es' ? 'Desarrollado por ' : 'Desenvolvido por '}<a href="http://gabrielcavalcantidev.com/" target="_blank" rel="noreferrer">CR Code</a> © 2026</p><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.backTop}><Icon name="arrow" /></button></div></footer>
}

function Home({ t, language }) {
  const c = pageContent[language]
  const [showIntro, setShowIntro] = useState(true)
  const [introLeaving, setIntroLeaving] = useState(false)
  const finishIntro = () => setIntroLeaving(true)
  return <><section className="home-hero-slot">{showIntro && <section className={introLeaving ? 'home-video-intro is-leaving' : 'home-video-intro'} aria-label="Relato Temporal" onTransitionEnd={(event) => { if (event.propertyName === 'opacity') setShowIntro(false) }}><video autoPlay muted playsInline preload="auto" onEnded={finishIntro} onError={() => setShowIntro(false)}><source src="/brand/home.mp4" type="video/mp4" /></video></section>}<section className="hero"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-content"><p>{t.heroEyebrow}</p><h1>{t.heroTitle}<strong>{t.heroAccent}</strong></h1><span>{t.heroText}</span><Link to="/sobre-nos" className="text-cta">{t.explore}<b>↓</b></Link></div></section></section>
    <section className="home-intro"><p className="section-label">01 / Relato</p><h2>{c.home.introTitle}</h2><div><p>{c.home.introText}</p><Link className="text-cta dark" to="/sobre-nos">{t.explore}<b>→</b></Link></div></section>
    <section className="industries-banner"><p className="section-label">02 / {t.industries}</p><h2>{c.home.bannerTitle.split('\n').map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2><Link to="/industrias">{c.home.bannerLink} <b>→</b></Link></section></>
}

function StandardPage({ eyebrow, title, text, leadAside, children }) { return <section className="standard-page"><p className="section-label">{eyebrow}</p><h1>{title}</h1>{leadAside ? <div className="page-lead-row"><p className="page-lead">{text}</p>{leadAside}</div> : <p className="page-lead">{text}</p>}{children}</section> }
function AboutPage({ t, language }) {
  const about = aboutContent[language]
  return <StandardPage eyebrow={about.eyebrow} title={t.about} text={about.lead} leadAside={<div className="about-facts">{about.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}>
    <section className="about-story">
      <div className="about-story-heading"><p className="section-label">{about.storyLabel}</p><h2>{about.storyTitle}</h2></div>
      <div className="about-copy">{about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
    <section className="about-services">
      <div><p className="section-label">{about.servicesLabel}</p><h2>{about.servicesTitle}</h2></div>
      <ul>{about.services.map((service) => <li key={service}>{service}</li>)}</ul>
    </section>
  </StandardPage>
}
function MiguelPage({ language }) {
  const c = pageContent[language]
  return <article className="profile-page">
    <section className="profile-intro">
      <div className="profile-title"><p className="section-label">{c.miguel.eyebrow}</p><h1>Miguel<br /><em>Bregieira</em></h1><p>{c.miguel.tagline}</p></div>
      <figure><img src="/brand/miguel.jpeg" alt="Miguel Bregieira" /><figcaption>Relato Temporal</figcaption></figure>
    </section>
    <section className="profile-biography">
      <p className="profile-pull">{c.miguel.pull}</p>
      <div className="profile-text">
        {c.miguel.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  </article>
}
function IndustriesPage({ language }) {
  const c = pageContent[language]
  const guimarpeixe = guimarpeixeProducts[language]
  return <section className="industries-page"><div className="industries-heading"><p className="section-label">{c.industries.eyebrow}</p><h1>{c.industries.title.split('\n').map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}{index === 0 && <br />}</span>)}</h1><p>{c.industries.text}</p></div><div className="industry-grid">{industryDirectory.map((sourceIndustry) => { const industry = getIndustry(sourceIndustry, language); const catalogue = industry.slug === 'guimarpeixe' ? '/brand/Catalogo-Guimarpeixe.pdf' : industry.slug === 'superfish' ? '/brand/Catalogo-Superfish.pdf' : null; return <article className={["industry-card", industry.pending && 'pending', industry.blueLogo && 'blue-logo'].filter(Boolean).join(' ')} key={industry.name}><div className="industry-logo"><img src={industry.image} alt={industry.name} /></div><div className="industry-card-content"><h2>{industry.name}</h2><p>{industry.description}</p>{industry.pending && <span className="pending-badge">{language === 'pt' ? 'Em formalização' : language === 'en' ? 'Being formalised' : 'En formalización'}</span>}<div className="industry-actions"><Link to={`/industrias/${industry.slug}/produtos`}>{c.industries.actions.produtos}</Link><Link to={`/industrias/${industry.slug}/receitas`}>{c.industries.actions.receitas}</Link>{catalogue ? <a href={catalogue} target="_blank" rel="noreferrer">{industry.slug === 'guimarpeixe' ? guimarpeixe.catalogueLabel : c.industries.actions.catalogo}</a> : <Link to={`/industrias/${industry.slug}/catalogo`}>{c.industries.actions.catalogo}</Link>}</div></div></article> })}</div></section>
}
function GuimarpeixeProductsPage({ language }) {
  const c = pageContent[language]
  const products = guimarpeixeProducts[language]
  const recipesLink = language === 'en' ? 'Explore recipes' : language === 'es' ? 'Explorar recetas' : 'Explorar receitas'
  const recipesTitle = language === 'en' ? 'Bring more flavour to the table.' : language === 'es' ? 'Más sabor en la mesa.' : 'Mais sabor à mesa.'
  const recipesText = language === 'en' ? 'Discover simple ideas made with Guimarpeixe products.' : language === 'es' ? 'Descubra ideas sencillas elaboradas con productos Guimarpeixe.' : 'Descubra sugestões simples feitas com produtos Guimarpeixe.'
  return <article className="guimarpeixe-products"><section className="gp-products-hero"><Link className="back-link" to="/industrias">{c.industries.back}</Link><div className="gp-products-brand"><img src="/brand/guimarpeixe.svg" alt="Guimarpeixe" /></div><p className="section-label">{products.eyebrow}</p><h1>{products.title}</h1><p>{products.intro}</p></section><section className="gp-products-list"><header><p className="section-label">{products.listLabel}</p><h2>{language === 'en' ? 'Selected with care.' : language === 'es' ? 'Seleccionados con cuidado.' : 'Selecionados com rigor.'}</h2></header><div>{products.products.map((product, index) => { const image = guimarpeixeProductImages[index]; return <article className={image ? 'gp-product-card has-image' : 'gp-product-card'} key={product.name}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{product.name}</h3><p>{product.text}</p></div>{image && <img src={image} alt="" />}</article> })}</div></section><section className="gp-recipes-prompt"><div><p className="section-label">{language === 'en' ? 'Guimarpeixe recipes' : language === 'es' ? 'Recetas Guimarpeixe' : 'Receitas Guimarpeixe'}</p><h2>{recipesTitle}</h2><p>{recipesText}</p></div><Link to="/industrias/guimarpeixe/receitas">{recipesLink} <span>→</span></Link></section><section className="gp-catalogue"><div><p className="section-label">{products.catalogueLabel}</p><h2>{products.catalogueTitle}</h2><p>{products.catalogueText}</p></div><a href="/brand/Catalogo-Guimarpeixe.pdf" target="_blank" rel="noreferrer">{products.download} <span>↗</span></a></section></article>
}
function ProductCarousel({ images, alt }) {
  const [active, setActive] = useState(0)
  const hasMultiple = images.length > 1
  const move = (direction) => setActive((current) => (current + direction + images.length) % images.length)
  return <div className="superfish-carousel"><img src={images[active]} alt={alt} />{hasMultiple && <><button className="superfish-carousel-control previous" type="button" onClick={() => move(-1)} aria-label="Imagem anterior">←</button><button className="superfish-carousel-control next" type="button" onClick={() => move(1)} aria-label="Imagem seguinte">→</button><div className="superfish-carousel-dots">{images.map((image, index) => <button type="button" className={index === active ? 'active' : ''} key={image} onClick={() => setActive(index)} aria-label={`Ver imagem ${index + 1}`} />)}</div></>}</div>
}
function SuperfishProductsPage({ language }) {
  const c = pageContent[language]
  const content = superfishProducts[language]
  const recipesTitle = language === 'en' ? 'Bring cod to the table.' : language === 'es' ? 'Más bacalao en la mesa.' : 'Mais bacalhau à mesa.'
  const recipesText = language === 'en' ? 'Discover seven Superfish cod suggestions.' : language === 'es' ? 'Descubra siete sugerencias con bacalao Superfish.' : 'Descubra sete sugestões com bacalhau Superfish.'
  const recipesLink = language === 'en' ? 'Explore recipes' : language === 'es' ? 'Explorar recetas' : 'Explorar receitas'
  return <article className="superfish-products"><section className="superfish-products-hero"><Link className="back-link" to="/industrias">{c.industries.back}</Link><div className="gp-products-brand"><img src="/brand/superfish.png" alt="Superfish" /></div><p className="section-label">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></section><section className="superfish-products-list"><header><p className="section-label">{content.listLabel}</p><h2>{content.listTitle}</h2></header><div className="superfish-product-stack">{content.products.map((product, index) => <article className="superfish-product" key={product.name}><header><span>{String(index + 1).padStart(2, '0')}</span><h3>{product.name}</h3></header><div className="superfish-product-details"><div className="superfish-description"><p className="section-label">{content.description}</p><p>{product.species}</p><p><b>{content.origin}:</b> {product.origin}</p>{product.note && <p>{product.note}</p>}</div><div className="superfish-table-wrap"><table><thead><tr>{content.table.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{product.rows.map((row) => <tr key={row.join('-')}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div></div><ProductCarousel images={product.images} alt={product.name} /></article>)}</div></section><section className="gp-recipes-prompt superfish-recipes-prompt"><div><p className="section-label">{superfishRecipes[language].eyebrow}</p><h2>{recipesTitle}</h2><p>{recipesText}</p></div><Link to="/industrias/superfish/receitas">{recipesLink} <span>→</span></Link></section><section className="superfish-catalogue"><div><p className="section-label">{content.catalogueLabel}</p><h2>{content.catalogueTitle}</h2><p>{content.catalogueText}</p></div><a href="/brand/Catalogo-Superfish.pdf" target="_blank" rel="noreferrer">{content.download} <span>↗</span></a></section></article>
}
function SuperfishRecipesPage({ language }) {
  const content = superfishRecipes[language]
  return <article className="guimarpeixe-recipes superfish-recipes"><section className="gp-recipes-hero"><Link className="back-link" to="/industrias/superfish/produtos">{language === 'en' ? '← Back to products' : language === 'es' ? '← Volver a productos' : '← Voltar aos produtos'}</Link><div className="gp-products-brand"><img src="/brand/superfish.png" alt="Superfish" /></div><p className="section-label">{content.eyebrow}</p><h1>{content.title.split('\n').map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h1><p>{content.lead}</p></section><section className="gp-recipe-list">{content.recipes.map((recipe, index) => <Link className="gp-recipe-card superfish-recipe-card" to={`/industrias/superfish/receitas/${recipe.slug}`} key={recipe.slug}><div className="gp-recipe-image"><img src={recipe.image} alt={recipe.name} /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="gp-recipe-copy"><h2>{recipe.name}</h2><dl><div><dt>{content.difficulty}</dt><dd>{recipe.difficulty}</dd></div><div><dt>{content.time}</dt><dd>{recipe.time} {content.minutes}</dd></div><div><dt>{content.portions}</dt><dd>{recipe.portions}</dd></div></dl><span className="gp-recipe-open">{language === 'en' ? 'View recipe' : language === 'es' ? 'Ver receta' : 'Ver receita'} <b>→</b></span></div></Link>)}</section></article>
}
function SuperfishRecipeDetailPage({ language }) {
  const { recipe: slug } = useParams()
  const listing = superfishRecipes[language].recipes.find((item) => item.slug === slug)
  const details = superfishRecipeDetails.recipes[slug]
  const labels = superfishRecipes[language]
  if (!listing || !details) return <StandardPage eyebrow="Superfish" title={language === 'en' ? 'Recipe not found' : language === 'es' ? 'Receta no encontrada' : 'Receita não encontrada'} text={language === 'en' ? 'This recipe is not available.' : language === 'es' ? 'Esta receta no está disponible.' : 'Esta receita não está disponível.'} />
  const back = language === 'en' ? '← Back to recipes' : language === 'es' ? '← Volver a recetas' : superfishRecipeDetails.back
  const ingredients = language === 'en' ? 'Ingredients' : language === 'es' ? 'Ingredientes' : superfishRecipeDetails.ingredients
  const method = language === 'en' ? 'Method' : language === 'es' ? 'Modo de preparación' : superfishRecipeDetails.method
  return <article className="recipe-detail-page superfish-recipe-detail"><header className="recipe-detail-hero"><Link className="back-link" to="/industrias/superfish/receitas">{back}</Link><div className="recipe-detail-grid"><figure><img src={listing.image} alt={listing.name} /></figure><div className="recipe-detail-summary"><p className="section-label">Superfish / {labels.eyebrow.split(' / ')[1]}</p><span className="recipe-detail-number">{String(labels.recipes.findIndex((item) => item.slug === slug) + 1).padStart(2, '0')}</span><h1>{listing.name}</h1><dl><div><dt>{labels.difficulty}</dt><dd>{listing.difficulty}</dd></div><div><dt>{labels.time}</dt><dd>{listing.time} {labels.minutes}</dd></div><div><dt>{labels.portions}</dt><dd>{listing.portions}</dd></div></dl></div></div></header><section className="recipe-detail-body"><aside className="ingredient-panel"><p className="section-label">01 / {ingredients}</p><h2>{ingredients}</h2><ul>{details.ingredients.map((ingredient) => <li key={ingredient}><IngredientIcon type={getIngredientType(ingredient)} /><span>{ingredient}</span></li>)}</ul></aside><section className="recipe-method"><p className="section-label">02 / {method}</p><h2>{method}</h2><ol>{details.steps.map((step) => <li key={step}>{step}</li>)}</ol></section></section></article>
}
function GuimarpeixeRecipesPage({ language }) {
  const content = guimarpeixeRecipes[language]
  return <article className="guimarpeixe-recipes"><section className="gp-recipes-hero"><Link className="back-link" to="/industrias/guimarpeixe/produtos">{language === 'en' ? '← Back to products' : language === 'es' ? '← Volver a productos' : '← Voltar aos produtos'}</Link><div className="gp-products-brand"><img src="/brand/guimarpeixe.svg" alt="Guimarpeixe" /></div><p className="section-label">{content.eyebrow}</p><h1>{content.title.split('\n').map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h1><p>{content.lead}</p></section><section className="gp-recipe-list">{content.recipes.map((recipe, index) => <Link className="gp-recipe-card" to={`/industrias/guimarpeixe/receitas/${recipe.slug}`} key={recipe.slug}><div className="gp-recipe-image"><img src={recipe.image} alt={recipe.name} /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="gp-recipe-copy"><h2>{recipe.name}</h2><dl><div><dt>{content.difficulty}</dt><dd>{recipe.difficulty}</dd></div><div><dt>{content.time}</dt><dd>{recipe.time} {content.minutes}</dd></div><div><dt>{content.portions}</dt><dd>{recipe.portions}</dd></div></dl><span className="gp-recipe-open">{language === 'en' ? 'View recipe' : language === 'es' ? 'Ver receta' : 'Ver receita'} <b>→</b></span></div></Link>)}</section></article>
}
function GuimarpeixeRecipeDetailPage({ language }) {
  const { recipe: slug } = useParams()
  const listing = guimarpeixeRecipes[language].recipes.find((item) => item.slug === slug)
  const details = recipeDetails[language].recipes[slug]
  const copy = recipeDetails[language]
  const labels = guimarpeixeRecipes[language]
  if (!listing || !details) return <StandardPage eyebrow="Guimarpeixe" title={language === 'en' ? 'Recipe not found' : language === 'es' ? 'Receta no encontrada' : 'Receita não encontrada'} text={language === 'en' ? 'This recipe is not available.' : language === 'es' ? 'Esta receta no está disponible.' : 'Esta receita não está disponível.'} />
  return <article className="recipe-detail-page"><header className="recipe-detail-hero"><Link className="back-link" to="/industrias/guimarpeixe/receitas">{copy.back}</Link><div className="recipe-detail-grid"><figure><img src={listing.image} alt={listing.name} /></figure><div className="recipe-detail-summary"><p className="section-label">Guimarpeixe / {labels.eyebrow.split(' / ')[1]}</p><span className="recipe-detail-number">{String(labels.recipes.findIndex((item) => item.slug === slug) + 1).padStart(2, '0')}</span><h1>{listing.name}</h1><dl><div><dt>{labels.difficulty}</dt><dd>{listing.difficulty}</dd></div><div><dt>{labels.time}</dt><dd>{listing.time} {labels.minutes}</dd></div><div><dt>{labels.portions}</dt><dd>{listing.portions}</dd></div></dl></div></div></header><section className="recipe-detail-body"><aside className="ingredient-panel"><p className="section-label">01 / {copy.ingredients}</p><h2>{copy.ingredients}</h2><ul>{details.ingredients.map((ingredient) => <li key={ingredient}><IngredientIcon type={getIngredientType(ingredient)} /><span>{ingredient}</span></li>)}</ul></aside><section className="recipe-method"><p className="section-label">02 / {copy.method}</p><h2>{copy.method}</h2><ol>{details.steps.map((step) => <li key={step}>{step}</li>)}</ol></section></section></article>
}
function IndustryContentPage({ language }) {
  const { industry: industrySlug, section } = useParams()
  const sourceIndustry = industryDirectory.find((item) => item.slug === industrySlug)
  const c = pageContent[language]
  const industry = sourceIndustry && getIndustry(sourceIndustry, language)
  const sectionName = c.industries.actions[section]
  if (!industry || !sectionName) return <StandardPage eyebrow={c.industries.eyebrow} title={language === 'en' ? 'Page not found' : language === 'es' ? 'Página no encontrada' : 'Página não encontrada'} text={language === 'en' ? 'This content is not available.' : language === 'es' ? 'Este contenido no está disponible.' : 'Este conteúdo não está disponível.'} />
  if (industrySlug === 'guimarpeixe' && section === 'produtos') return <GuimarpeixeProductsPage language={language} />
  if (industrySlug === 'guimarpeixe' && section === 'receitas') return <GuimarpeixeRecipesPage language={language} />
  if (industrySlug === 'superfish' && section === 'produtos') return <SuperfishProductsPage language={language} />
  if (industrySlug === 'superfish' && section === 'receitas') return <SuperfishRecipesPage language={language} />
  return <section className="industry-detail-page"><div className="industry-detail-hero"><Link className="back-link" to="/industrias">{c.industries.back}</Link><div className={industry.blueLogo ? 'detail-logo blue-logo' : 'detail-logo'}><img src={industry.image} alt={industry.name} /></div><p className="section-label">{industry.name}</p><h1>{sectionName}</h1><p>{industry.description}</p></div><div className="industry-detail-empty"><span>{c.industries.comingSoon}</span><h2>{sectionName} {industry.name}</h2><p>{c.industries.detailText}</p></div></section>
}
function BlogPage({ language }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const c = pageContent[language]
  const selectedCategory = searchParams.get('categoria')
  const activeCategory = blogCategories.some((category) => category.id === selectedCategory) ? selectedCategory : 'all'
  const visiblePosts = activeCategory === 'all' ? blogPosts : blogPosts.filter((post) => postCategories[post.slug]?.includes(activeCategory))
  const selectCategory = (categoryId) => setSearchParams(categoryId === 'all' ? {} : { categoria: categoryId })
  return <section className="blog-page"><div className="blog-heading"><p className="section-label">{c.blog.eyebrow}</p><h1>{c.blog.title.split('\n').map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}{index === 0 && <br />}</span>)}</h1><p>{c.blog.text}</p></div><div className="blog-navigation"><div className="blog-category-list" aria-label="Categorias de publicações">{blogCategories.map((category) => <button className={activeCategory === category.id ? 'active' : ''} key={category.id} type="button" onClick={() => selectCategory(category.id)}>{getCategoryLabel(category, language)}</button>)}</div></div><div className="blog-grid">{visiblePosts.map((sourcePost) => { const post = getPost(sourcePost, language); const primaryCategory = blogCategories.find((category) => category.id === postCategories[post.slug][0]); return <article className="blog-card" key={post.slug}><Link className="blog-card-image" to={`/blog/${post.slug}`}><img src={post.cover} alt="" /></Link><div className="blog-card-content"><p className="section-label">{getCategoryLabel(primaryCategory, language)}</p><h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.subtitle}</p><div className="blog-card-footer"><span>{post.author}</span><Link to={`/blog/${post.slug}`}>{c.blog.read} <b>→</b></Link></div></div></article> })}</div>{visiblePosts.length === 0 && <p className="blog-empty">{c.blog.empty}</p>}</section>
}
function FullArticleText({ text, language }) {
  const c = pageContent[language]
  return <section className="pdf-document"><header><div><p className="section-label">{c.blog.publication}</p><h2>{c.blog.pdfTitle}</h2><p>{c.blog.pdfText}</p></div><a href={text} download>{c.blog.download} <b>↓</b></a></header><iframe title={c.blog.pdfTitle} src={`${text}#view=FitH`} loading="lazy" /><p className="pdf-document-fallback">{c.blog.fallback} <a href={text} target="_blank" rel="noreferrer">{c.blog.fallbackLink}</a>.</p></section>
}
function BlogPostPage({ language }) {
  const { slug } = useParams()
  const sourcePost = blogPosts.find((item) => item.slug === slug)
  const c = pageContent[language]
  if (!sourcePost) return <StandardPage eyebrow={c.blog.eyebrow} title={language === 'en' ? 'Article not found' : language === 'es' ? 'Artículo no encontrado' : 'Artigo não encontrado'} text={language === 'en' ? 'This content is not available.' : language === 'es' ? 'Este contenido no está disponible.' : 'Este conteúdo não está disponível.'} />
  const post = getPost(sourcePost, language)
  const primaryCategory = blogCategories.find((category) => category.id === postCategories[post.slug][0])
  return <article className="blog-post-page"><header className="blog-post-hero"><Link className="back-link" to="/blog">{c.blog.back}</Link><div className="blog-post-hero-grid"><div><p className="section-label">{getCategoryLabel(primaryCategory, language)}</p><h1>{post.title}</h1><p className="blog-post-subtitle">{post.subtitle}</p><div className="blog-post-meta"><span>{post.author}</span><span>{post.date}</span></div></div><figure><img src={post.cover} alt="" /></figure></div></header><div className="blog-post-content"><p className="blog-post-intro">{post.intro}</p>{post.quote && <blockquote>“{post.quote}”<cite>{language === 'en' ? 'Miguel Bregieira, quoted in the article' : language === 'es' ? 'Miguel Bregieira, citado en el artículo' : 'Miguel Bregieira, citado no artigo'}</cite></blockquote>}{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<FullArticleText text={post.fullText} language={language} /></div></article>
}
function ContactPage({ t, language }) {
  const c = pageContent[language]
  const ui = language === 'en' ? { direct: 'Direct line', write: 'Business enquiries', locations: 'Locations', locationTitle: 'Two points of contact in Portugal.' } : language === 'es' ? { direct: 'Línea directa', write: 'Consultas comerciales', locations: 'Ubicaciones', locationTitle: 'Dos puntos de contacto en Portugal.' } : { direct: 'Linha direta', write: 'Pedidos comerciais', locations: 'Moradas', locationTitle: 'Dois pontos de contacto em Portugal.' }
  return <section className="contact-page"><header className="contact-hero"><p className="section-label">{c.contact.eyebrow}</p><h1>{t.contact}</h1><p>{c.contact.text}</p></header><div className="contact-actions"><a className="contact-action" href="tel:+351937040541"><span className="contact-action-icon"><ContactIcon type="phone" /></span><span className="contact-action-copy"><small>{c.contact.phone}</small><strong>+351 937 040 541</strong><em>{ui.direct}</em></span><b>↗</b></a><a className="contact-action" href="mailto:miguel.bregieira@gmail.com"><span className="contact-action-icon"><ContactIcon type="email" /></span><span className="contact-action-copy"><small>{c.contact.email}</small><strong>miguel.bregieira@gmail.com</strong><em>{ui.write}</em></span><b>↗</b></a></div><section className="contact-locations" aria-label="Relato Temporal addresses"><header><div><p className="section-label">{ui.locations}</p><h2>{ui.locationTitle}</h2></div><span><ContactIcon type="pin" /></span></header><div className="locations"><div className="location-card"><div><p className="section-label">{c.contact.faro}</p><h2>Avenida 5 de Outubro 82A</h2><p>Faro · Portugal</p></div><iframe title="Relato Temporal map in Faro" src="https://www.google.com/maps?q=Avenida+5+de+Outubro+82A,+Faro,+Portugal&output=embed" loading="lazy" /></div><div className="location-card"><div><p className="section-label">{c.contact.aveiro}</p><h2>Travessa Mestre Mónica 12</h2><p>Gafanha da Nazaré · Portugal</p></div><iframe title="Relato Temporal map in Gafanha da Nazaré" src="https://www.google.com/maps?q=Travessa+Mestre+Monica+12,+Gafanha+da+Nazare,+Portugal&output=embed" loading="lazy" /></div></div></section></section>
}
function ReservedPage({ t, language }) { const c = pageContent[language]; return <StandardPage eyebrow={c.reserved.eyebrow} title={t.reserved} text={t.comingSoon}><div className="empty-state"><span>{t.comingSoon}</span><p>{c.reserved.text}</p></div></StandardPage> }

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname, search])
  return null
}

function App() {
  const [language, setLanguage] = useState('pt')
  const t = copy[language]
  return <div className="app"><ScrollToTop /><Header language={language} setLanguage={setLanguage} /><main><Routes><Route path="/" element={<Home t={t} language={language} />} /><Route path="/sobre-nos" element={<AboutPage t={t} language={language} />} /><Route path="/miguel-bregieira" element={<MiguelPage language={language} />} /><Route path="/industrias" element={<IndustriesPage language={language} />} /><Route path="/industrias/guimarpeixe/receitas/:recipe" element={<GuimarpeixeRecipeDetailPage language={language} />} /><Route path="/industrias/superfish/receitas/:recipe" element={<SuperfishRecipeDetailPage language={language} />} /><Route path="/industrias/:industry/:section" element={<IndustryContentPage language={language} />} /><Route path="/blog" element={<BlogPage language={language} />} /><Route path="/blog/:slug" element={<BlogPostPage language={language} />} /><Route path="/contactos" element={<ContactPage t={t} language={language} />} /><Route path="/area-reservada" element={<ReservedPage t={t} language={language} />} /></Routes></main><Footer t={t} language={language} /></div>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
