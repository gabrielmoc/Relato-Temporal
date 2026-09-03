import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Relato - Página inicial">
          <img src="/brand/relato-logo-white.png" alt="Relato" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sobre">Sobre Nós</a>
          <a href="#miguel">Miguel Bregieira</a>
          <a href="#industrias">As Indústrias</a>
          <a href="#contactos">Contactos</a>
          <a className="reserved" href="#reservada">Área Reservada <span>Em breve</span></a>
        </nav>
      </header>
      <section className="hero" id="inicio">
        <p>Portugal <i /> Brasil</p>
        <h1>Bem-vindo à <strong>Relato.</strong></h1>
        <span>Agenciamento de indústrias alimentares com serviços de apoio à exportação para o Brasil.</span>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
