import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import './styles.css'

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
  { slug: 'gelpinhos', name: 'Gelpinhos', image: '/brand/gelpinhos.png', description: 'Produtos alimentares com foco em qualidade, conveniência e sabor.', darkLogo: true },
  { slug: 'frigosto', name: 'Frigosto', image: '/brand/frigosto.png', description: 'Tradição e sabor em soluções alimentares para novos mercados.' },
  { slug: 'agroaguiar', name: 'AgroAguiar', image: '/brand/agroaguiar.jpeg', description: 'Agroindústria portuguesa orientada para produtos de origem e qualidade.' },
  { slug: 'costa-atlantico', name: 'Costa Atlântico', image: '/brand/costaatlantico-restored.png', description: 'Especialista em pescada e merluza. Marca em fase de formalização.', pending: true }
]

function Icon({ name }) {
  const paths = { search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>, menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>, close: <><path d="M6 6l12 12M18 6 6 18" /></>, arrow: <path d="M12 19V5m-6 6 6-6 6 6" /> }
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>
}

function Header({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const t = copy[language]
  const links = [['/', t.home], ['/sobre-nos', t.about], ['/miguel-bregieira', t.miguel], ['/industrias', t.industries], ['/blog', t.blog], ['/contactos', t.contact], ['/area-reservada', t.reserved]]
  return <header className="site-header">
    <Link className="brand" to="/" aria-label="Relato - Página inicial"><img src="/brand/relato-logo-white.png" alt="Relato" /></Link>
    <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={to === '/area-reservada' ? 'reserved-link' : ''}>{label}{to === '/area-reservada' && <small>{t.comingSoon}</small>}</NavLink>)}</nav>
    <div className="header-actions">
      <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label={t.search}><Icon name="search" /></button>
      <div className="language-picker"><button type="button" onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><span className="flag" aria-hidden="true">{languages.find((item) => item.code === language).flag}</span>{languages.find((item) => item.code === language).label}<span>⌄</span></button>{languageOpen && <div className="language-menu">{languages.map((item) => <button key={item.code} className={item.code === language ? 'selected' : ''} type="button" onClick={() => { setLanguage(item.code); setLanguageOpen(false) }}><span className="flag" aria-hidden="true">{item.flag}</span>{item.label}<small>{item.name}</small></button>)}</div>}</div>
      <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div>
    {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} t={t} />}
  </header>
}

function SearchPanel({ onClose, t }) {
  const [value, setValue] = useState('')
  const results = [['/sobre-nos', t.about], ['/miguel-bregieira', t.miguel], ['/industrias', t.industries], ['/blog', t.blog], ['/contactos', t.contact]].filter((item) => item[1].toLowerCase().includes(value.toLowerCase()))
  return <div className="search-panel" role="dialog" aria-modal="true" aria-label={t.search}><div className="search-inner"><div className="search-field"><Icon name="search" /><input autoFocus value={value} onChange={(event) => setValue(event.target.value)} placeholder={`${t.search}...`} /><button type="button" onClick={onClose}><Icon name="close" /></button></div><div className="search-results">{value && results.map(([to, label]) => <Link key={to} to={to} onClick={onClose}>{label}<span>↗</span></Link>)}</div></div></div>
}

function Footer({ t }) {
  const links = [['/', t.home], ['/sobre-nos', t.about], ['/miguel-bregieira', t.miguel], ['/industrias', t.industries], ['/blog', t.blog], ['/contactos', t.contact]]
  return <footer className="site-footer"><div className="footer-grid">
    <div className="footer-brand"><img src="/brand/relato-logo-white.png" alt="Relato" /><p>Agenciamento de indústrias alimentares com serviços de apoio à exportação para o Brasil.</p></div>
    <div><h2>{t.footerMenu}</h2><div className="footer-links">{links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div></div>
    <div><h2>{t.footerContact}</h2><a href="tel:+351937040541">+351 937 040 541</a><a href="mailto:miguel.bregieira@gmail.com">miguel.bregieira@gmail.com</a><a href="https://www.relatotemporal.pt">www.relatotemporal.pt</a></div>
    <div className="footer-addresses"><h2>{t.footerAddress}</h2><a href="https://www.google.com/maps/search/?api=1&query=Avenida+5+de+Outubro+82A,+Faro,+Portugal" target="_blank" rel="noreferrer"><b>Faro</b>Avenida 5 de Outubro 82A<br />Faro · Portugal<span>Ver no mapa ↗</span></a><a href="https://www.google.com/maps/search/?api=1&query=Travessa+Mestre+Monica+12,+Gafanha+da+Nazare,+Portugal" target="_blank" rel="noreferrer"><b>Aveiro</b>Travessa Mestre Mónica 12<br />Gafanha da Nazaré · Portugal<span>Ver no mapa ↗</span></a></div>
  </div><div className="footer-bottom"><p>Relato Temporal - Unipessoal, Lda</p><p>Desenvolvido por <a href="http://gabrielcavalcantidev.com/" target="_blank" rel="noreferrer">CR Code</a> © 2026</p><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.backTop}><Icon name="arrow" /></button></div></footer>
}

function Home({ t }) {
  return <><section className="hero"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-content"><p>{t.heroEyebrow}</p><h1>{t.heroTitle}<strong>{t.heroAccent}</strong></h1><span>{t.heroText}</span><Link to="/sobre-nos" className="text-cta">{t.explore}<b>↓</b></Link></div></section>
    <section className="home-intro"><p className="section-label">01 / Relato</p><h2>A ponte certa para novos mercados.</h2><div><p>Representamos indústrias alimentares que procuram entrar, crescer e construir relações sólidas no Brasil.</p><Link className="text-cta dark" to="/sobre-nos">{t.explore}<b>→</b></Link></div></section>
    <section className="industries-banner"><p className="section-label">02 / {t.industries}</p><h2>Origem, qualidade<br />e oportunidade.</h2><Link to="/industrias">Ver indústrias <b>→</b></Link></section></>
}

function StandardPage({ eyebrow, title, text, children }) { return <section className="standard-page"><p className="section-label">{eyebrow}</p><h1>{title}</h1><p className="page-lead">{text}</p>{children}</section> }
function AboutPage({ t }) { return <StandardPage eyebrow="01 / Relato" title={t.about} text="A Relato atua na aproximação entre produtores de excelência e oportunidades concretas no mercado brasileiro."><div className="feature-grid"><p>Uma presença comercial próxima, informada e comprometida com cada parceria.</p><p>Da estratégia de entrada à continuidade no mercado, acompanhamos cada relação com clareza.</p></div></StandardPage> }
function MiguelPage() {
  return <article className="profile-page">
    <section className="profile-intro">
      <div className="profile-title"><p className="section-label">02 / Perfil</p><h1>Miguel<br /><em>Bregieira</em></h1><p>Conhecimento especializado para relações comerciais que atravessam fronteiras.</p></div>
      <figure><img src="/brand/miguel.jpeg" alt="Miguel Bregieira" /><figcaption>Relato Temporal</figcaption></figure>
    </section>
    <section className="profile-biography">
      <p className="profile-pull">Uma trajetória construída entre a indústria alimentar portuguesa e o mercado brasileiro.</p>
      <div className="profile-text">
        <p>Miguel Bregieira iniciou o seu percurso profissional em Aveiro, uma das regiões mais tradicionais na produção de bacalhau em Portugal. Entrou cedo no setor dos pescados, adquirindo experiência em todas as etapas: aquisição de produtos da pesca, industrialização, desenvolvimento de produtos e estratégias comerciais.</p>
        <p>Com formação superior em Gestão de Empresas e Auditoria Financeira, pós-graduação em Direito Aduaneiro, MBA em Fiscalidade e mestrado em Negócios Internacionais, Miguel reúne uma combinação rara de conhecimento científico e experiência prática no setor em que atua.</p>
        <p>Esta especialização permite aos clientes da Relato contar com apoio na elaboração de processos de DIPOA para a libertação de produtos no Brasil, no desenvolvimento de marcas próprias para o mercado brasileiro e num conjunto alargado de serviços de apoio à exportação.</p>
      </div>
    </section>
  </article>
}
function IndustriesPage({ t }) {
  return <section className="industries-page"><div className="industries-heading"><p className="section-label">03 / Parceiros</p><h1>Nossas indústrias<br /><em>agenciadas.</em></h1><p>Representamos marcas que levam a qualidade da indústria alimentar portuguesa ao mercado brasileiro.</p></div><div className="industry-grid">{industryDirectory.map((industry) => <article className={["industry-card", industry.pending && 'pending', industry.darkLogo && 'dark-logo'].filter(Boolean).join(' ')} key={industry.name}><div className="industry-logo"><img src={industry.image} alt={industry.name} /></div><div className="industry-card-content"><h2>{industry.name}</h2><p>{industry.description}</p>{industry.pending && <span className="pending-badge">Em formalização</span>}<div className="industry-actions"><Link to={`/industrias/${industry.slug}/produtos`}>Produtos</Link><Link to={`/industrias/${industry.slug}/receitas`}>Receitas</Link><Link to={`/industrias/${industry.slug}/catalogo`}>Catálogo</Link></div></div></article>)}</div></section>
}
function IndustryContentPage() {
  const { industry: industrySlug, section } = useParams()
  const industry = industryDirectory.find((item) => item.slug === industrySlug)
  const sectionName = { produtos: 'Produtos', receitas: 'Receitas', catalogo: 'Catálogo' }[section]
  if (!industry || !sectionName) return <StandardPage eyebrow="03 / Indústrias" title="Página não encontrada" text="Este conteúdo não está disponível." />
  return <section className="industry-detail-page"><div className="industry-detail-hero"><Link className="back-link" to="/industrias">← Voltar às indústrias</Link><div className={industry.darkLogo ? 'detail-logo dark-logo' : 'detail-logo'}><img src={industry.image} alt={industry.name} /></div><p className="section-label">{industry.name}</p><h1>{sectionName}</h1><p>{industry.description}</p></div><div className="industry-detail-empty"><span>Em breve</span><h2>{sectionName} {industry.name}</h2><p>Esta área está preparada para receber os conteúdos oficiais da marca.</p></div></section>
}
function BlogPage({ t }) { return <StandardPage eyebrow="04 / Conteúdos" title={t.blog} text="Informação e perspetivas sobre o universo alimentar, exportação e o mercado brasileiro."><div className="empty-state"><span>Em breve</span><p>Os primeiros artigos estarão disponíveis nesta área.</p></div></StandardPage> }
function ContactPage({ t }) { return <StandardPage eyebrow="05 / Relato" title={t.contact} text="Entre em contacto para conversar sobre representação e oportunidades de mercado."><div className="contact-cards"><a href="tel:+351937040541"><small>Telefone</small>+351 937 040 541</a><a href="mailto:miguel.bregieira@gmail.com"><small>Email</small>miguel.bregieira@gmail.com</a></div><section className="locations" aria-label="Moradas Relato Temporal"><div className="location-card"><div><p className="section-label">Sede / Faro</p><h2>Avenida 5 de Outubro 82A</h2><p>Faro · Portugal</p></div><iframe title="Mapa da sede da Relato Temporal em Faro" src="https://www.google.com/maps?q=Avenida+5+de+Outubro+82A,+Faro,+Portugal&output=embed" loading="lazy" /></div><div className="location-card"><div><p className="section-label">Norte / Aveiro</p><h2>Travessa Mestre Mónica 12</h2><p>Gafanha da Nazaré · Portugal</p></div><iframe title="Mapa da Relato Temporal em Gafanha da Nazaré" src="https://www.google.com/maps?q=Travessa+Mestre+Monica+12,+Gafanha+da+Nazare,+Portugal&output=embed" loading="lazy" /></div></section></StandardPage> }
function ReservedPage({ t }) { return <StandardPage eyebrow="06 / Futuro" title={t.reserved} text={t.comingSoon}><div className="empty-state"><span>Em desenvolvimento</span><p>Esta área será preparada numa próxima fase do projeto.</p></div></StandardPage> }

function App() {
  const [language, setLanguage] = useState('pt')
  const t = copy[language]
  return <div className="app"><Header language={language} setLanguage={setLanguage} /><main><Routes><Route path="/" element={<Home t={t} />} /><Route path="/sobre-nos" element={<AboutPage t={t} />} /><Route path="/miguel-bregieira" element={<MiguelPage />} /><Route path="/industrias" element={<IndustriesPage t={t} />} /><Route path="/industrias/:industry/:section" element={<IndustryContentPage />} /><Route path="/blog" element={<BlogPage t={t} />} /><Route path="/contactos" element={<ContactPage t={t} />} /><Route path="/area-reservada" element={<ReservedPage t={t} />} /></Routes></main><Footer t={t} /></div>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
