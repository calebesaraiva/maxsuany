import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Camera, CalendarHeart, Share2, Sparkles, Gem, HeartHandshake, ClipboardCheck } from 'lucide-react';
import galleryData from './data.json';
import './App.css';

const WHATSAPP_LINK = "https://wa.me/559991716408";

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12
    }
  }
};

const FloatingOrnaments = () => (
  <div className="floating-ornaments" aria-hidden="true">
    {[...Array(8)].map((_, index) => (
      <span key={index} className={`ornament ornament-${index + 1}`} />
    ))}
  </div>
);

const GoldDust = () => (
  <div className="gold-dust" aria-hidden="true">
    {[...Array(90)].map((_, index) => {
      const left = (index * 37) % 100;
      const start = (index * 19) % 100;
      const size = 2 + (index % 5);
      const duration = 11 + (index % 9);
      const delay = -(index * 0.73);
      const drift = index % 2 === 0 ? 42 + (index % 7) * 8 : -42 - (index % 7) * 8;

      return (
        <span
          key={index}
          className="dust"
          style={{
            '--left': `${left}%`,
            '--start': `${start}%`,
            '--size': `${size}px`,
            '--duration': `${duration}s`,
            '--delay': `${delay}s`,
            '--drift': `${drift}px`,
          }}
        />
      );
    })}
  </div>
);

const LuxuryBackdrop = () => (
  <div className="luxury-backdrop" aria-hidden="true">
    <span className="silk-light silk-light-one" />
    <span className="silk-light silk-light-two" />
    <span className="halo halo-one" />
    <span className="halo halo-two" />
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('casamento');

  const tabs = [
    { id: 'casamento', label: 'Casamentos', folder: 'FT Casamento' },
    { id: 'aniversario', label: 'Aniversários', folder: 'FT Aniversario' },
    { id: 'corporativo', label: 'Corporativo', folder: 'FT Corporativos' },
    { id: 'formatura', label: 'Formatura', folder: 'FT Formatura' }
  ];

  const highlights = [
    { value: '18+', label: 'anos de experiência' },
    { value: '5 mil+', label: 'eventos conduzidos' },
    { value: '100%', label: 'atenção aos detalhes' }
  ];

  const services = [
    {
      icon: Sparkles,
      title: 'Planejamento sensível',
      text: 'Cada etapa é desenhada com escuta, organização e cuidado para traduzir a essência do evento.'
    },
    {
      icon: Gem,
      title: 'Experiência refinada',
      text: 'Detalhes visuais, condução elegante e presença discreta para transformar o momento em memória.'
    },
    {
      icon: HeartHandshake,
      title: 'Assessoria completa',
      text: 'Do primeiro alinhamento ao último brinde, tudo acontece com segurança, leveza e precisão.'
    }
  ];

  const extractNumber = (filename) => {
    if (!filename || typeof filename !== 'string') return 9999;
    const match = filename.match(/\d+/);
    return match ? parseInt(match[0], 10) : 9999;
  };

  const getImages = (categoryId) => {
    const files = galleryData?.[categoryId];
    if (!Array.isArray(files)) return [];
    return [...files].sort((a, b) => extractNumber(a) - extractNumber(b));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Maxsuany Cerimonial',
          text: 'Conheça o trabalho da Maxsuany Cerimonial!',
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erro ao compartilhar', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado! O menu de aplicativos requer acesso via HTTPS ou site publicado.');
      } catch (err) {
        console.error('Erro ao copiar', err);
      }
    }
  };

  return (
    <div className="app-container">
      <LuxuryBackdrop />
      <GoldDust />
      <FloatingOrnaments />
      <header>
        <div className="container header-content">
          <button className="logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
  <motion.img
    src="/assets/Logo-White.png"
    alt="Logotipo da Maxsuany Cerimonial"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
    style={{ display: 'block', height: '60px', width: 'auto' }}
  />
</button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Phone size={18} /> Fale conosco
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-container">
            <motion.div
              className="hero-text"
              variants={staggerGroup}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.span className="eyebrow" variants={fadeUp}>Cerimonial com afeto e precisão</motion.span>
              <motion.h2 variants={fadeUp}>
                Transformando Sonhos em Momentos Inesquecíveis
              </motion.h2>
              <motion.p variants={fadeUp}>
                Com dedicação exclusiva e atenção a cada detalhe, a Maxsuany Cerimonial atua na organização e assessoria de eventos. Nossa missão é garantir que seu dia especial seja perfeito, sem preocupações, refletindo exatamente a sua essência.
              </motion.p>
              <motion.a variants={fadeUp} href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <CalendarHeart size={18} /> Agende sua data
              </motion.a>
              <motion.div className="hero-signature" variants={fadeUp}>
                <span>Assessoria</span>
                <span>Produção</span>
                <span>Cerimonial</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="about-section">
          <div className="container about-container">
            <motion.div
              initial={{ opacity: 0, rotateY: -12, y: 36 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="about-img-wrapper"
            >
              <img src="/assets/home page secundario.jpeg" alt="Maxsuany Silva - Cerimonialista" />
            </motion.div>

            <motion.div
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="about-text"
            >
              <motion.span className="eyebrow" variants={fadeUp}>Sobre a Maxsuany</motion.span>
              <motion.h3 variants={fadeUp}>Nossa História</motion.h3>
              <motion.p variants={fadeUp}>
              Com <span className="highlight">18 anos de experiência</span>, a Maxsuany Cerimonial é gerenciada por <span className="highlight">Maxsuany Silva</span>, profissional formada em Pedagogia, Filosofia, especialista em Gestão Educacional, Docência e Mestre em Educação.
              </motion.p>
              <motion.p variants={fadeUp}>
              Conta com mais de <span className="highlight">5.000 eventos realizados</span> durante esse período.
              </motion.p>
              <motion.p variants={fadeUp}>
              Nossa visão é trabalhar com <span className="highlight">excelência, dedicação e compromisso</span> a cada dia para os nossos clientes e futuros clientes.
              </motion.p>

              <motion.div className="stats-row" variants={fadeUp}>
                {highlights.map((item) => (
                  <div className="stat-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="services-section">
          <div className="container">
            <motion.div
              className="section-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">Luxo está no cuidado</span>
              <h3>Uma condução impecável</h3>
              <p>Organização, elegância e presença para que cada celebração aconteça com naturalidade.</p>
            </motion.div>

            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    className="service-card"
                    key={service.title}
                    initial={{ opacity: 0, y: 34, rotateY: index === 1 ? 0 : index === 0 ? -7 : 7 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    whileHover={{ y: -10, rotateX: 5, rotateY: index === 1 ? 0 : index === 0 ? -4 : 4 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="service-icon">
                      <Icon size={28} />
                    </span>
                    <h4>{service.title}</h4>
                    <p>{service.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="tabs-section">
          <div className="container">
            <motion.div
              className="section-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">Momentos cuidadosamente conduzidos</span>
              <h3>Eventos que contam histórias</h3>
              <p>Um portfólio de celebrações criadas com presença, elegância e atenção aos pequenos detalhes.</p>
            </motion.div>
            <div className="tabs-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18, rotateX: -4 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -18, rotateX: 4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {getImages(activeTab).length > 0 ? (
                  <div className="grid-gallery">
                    {getImages(activeTab).map((img, idx) => (
                      <motion.div
                        key={idx}
                        className="gallery-item"
                        initial={{ opacity: 0, y: 26, rotateY: idx % 2 === 0 ? -8 : 8 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        whileHover={{ y: -10, rotateX: 5, rotateY: idx % 2 === 0 ? -5 : 5, scale: 1.015 }}
                        transition={{
                          duration: 0.55,
                          delay: idx * 0.06,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <img
                          src={`/assets/${tabs.find(t => t.id === activeTab)?.folder || ''}/${img}`}
                          alt={`${activeTab} foto ${idx + 1}`}
                          className="gallery-img"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-gallery">
                    <Camera size={48} color="var(--gold-dark)" />
                    <h3>Novas fotos em breve</h3>
                    <p>Espaço reservado para as próximas atualizações de {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.</p>
                  </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <Phone size={18} /> Solicitar orçamento
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <motion.div
              className="final-cta-card"
              initial={{ opacity: 0, y: 30, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow">Seu evento merece leveza</span>
              <h3>Vamos transformar sua data em uma experiência memorável?</h3>
              <p>A Maxsuany Cerimonial cuida dos bastidores para que você viva o momento com presença e tranquilidade.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ClipboardCheck size={18} /> Planejar meu evento
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
  <div className="container footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
    <button className="logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <motion.img
        src="/assets/Logo-White.png"
        alt="Logotipo da Maxsuany Cerimonial"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'block', height: '50px', width: 'auto' }}
      />
    </button>

    <div className="social-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.2, rotate: 10, color: '#25D366' }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ color: 'var(--white)' }}
      >
        <Phone size={28} />
      </motion.a>
      <motion.a
        href="https://www.instagram.com/maxsuany_cerimonial_/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.2, rotate: -10, color: '#E1306C' }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{ color: 'var(--white)' }}
      >
        <InstagramIcon size={28} />
      </motion.a>
      <motion.button
        onClick={handleShare}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.2, rotate: 10, color: '#007BFF' }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{ color: 'var(--white)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <Share2 size={28} />
      </motion.button>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;
