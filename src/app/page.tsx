'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Headphones, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock estático de produtos para remover a necessidade de backend (Supabase)
const MOCK_PRODUCTS = [
  { id: '1', name: 'Camisa Oversized Black', price: 149.90, category: 'Camisas', is_available: true, slug: 'camisa-oversized-black', image_url: '/Identidade visual M2 Street/img.png' },
  { id: '3', name: 'Camisa Oversized White', price: 149.90, category: 'Camisas', is_available: true, slug: 'camisa-oversized-white', image_url: '/Identidade visual M2 Street/img.png' },
  { id: '4', name: 'Bermuda Street Comfort Black', price: 159.90, category: 'Bermudas', is_available: true, slug: 'bermuda-street-comfort-black', image_url: '/Identidade visual M2 Street/img.png' },
  { id: '5', name: 'Bermuda Street Comfort White', price: 159.90, category: 'Bermudas', is_available: true, slug: 'bermuda-street-comfort-white', image_url: '/Identidade visual M2 Street/img.png' },
  { id: '6', name: 'Boné M2 Classic Blue', price: 89.90, category: 'Bonés', is_available: true, slug: 'bone-m2-classic-blue', image_url: '/Identidade visual M2 Street/img.png' },
  { id: '7', name: 'Boné M2 Classic Black', price: 89.90, category: 'Bonés', is_available: true, slug: 'bone-m2-classic-black', image_url: '/Identidade visual M2 Street/img.png' }
];

export default function Home() {
  const categories = ['Camisas', 'Bermudas', 'Bonés'];

  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const benefits = [
    { imgSrc: "/Identidade visual M2 Street/icon-street.png", title: "Estilo Urbano", desc: "Autenticidade." },
    { imgSrc: "/Identidade visual M2 Street/icon-frete.png", title: "Envio Premium", desc: "Todo o país." },
    { imgSrc: "/Identidade visual M2 Street/icon-compra-segura.png", title: "Compra Segura", desc: "Ambiente protegido." },
    { imgSrc: "/Identidade visual M2 Street/icon-contato.png", title: "Atendimento VIP", desc: "Suporte ativo." }
  ];

  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white font-body pb-20 selection:bg-m2-gold selection:text-black">
      
      {/* HERO SECTION - Premium Look */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background texture/overlay with a slow Ken Burns zoom effect */}
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('/Identidade%20visual%20M2%20Street/fundo-effect.png')] bg-cover bg-center opacity-90"
        ></motion.div>
        
        {/* Deep black gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/70 to-[#000000]"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center mt-16 sm:mt-0"
        >
          <motion.div variants={fadeInUp}>
            <img src="/Identidade visual M2 Street/logo.png" alt="M2 Street Logo" className="w-20 sm:w-24 h-auto mb-4 opacity-90 mx-auto" />
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="flex items-baseline mb-4">
            <span className="text-white font-strong text-5xl sm:text-8xl lg:text-9xl tracking-tighter">M²</span>
            <span className="text-m2-gold font-script text-5xl sm:text-8xl lg:text-9xl -ml-2 sm:-ml-4">Street</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="font-squeeze tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-xl text-[#A68B5B] uppercase mt-2 mb-8 max-w-[90%] leading-relaxed">
            Mais que estilo,<br className="sm:hidden" /> é <span className="text-m2-gold">atitude.</span>
          </motion.p>

          <motion.div variants={fadeInUp}>
            <a href="#catalogo" className="inline-block bg-[#D4AF37] text-[#000000] px-10 sm:px-12 py-4 sm:py-5 font-strong uppercase text-[10px] sm:text-xs tracking-[0.3em] hover:bg-[#E5E5E5] transition-colors duration-500 w-full sm:w-auto text-center active:scale-95">
              Explorar Coleção
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* BRAND BENEFITS / DIFFERENTIALS - Elegant Row */}
      <section className="border-y border-[#111111] bg-[#000000] py-12 sm:py-16 relative z-20 overflow-hidden">
        
        {/* Efeito Escada Rolante (bordas laterais) no fundo */}
        <motion.div 
          animate={{ backgroundPositionY: ["0%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0 opacity-[0.05] sm:opacity-[0.07] pointer-events-none mix-blend-luminosity"
          style={{ 
             backgroundImage: "url('/Identidade visual M2 Street/bordas laterais.png')",
             backgroundSize: "50% auto",
             backgroundRepeat: "repeat"
          }}
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* --- MOBILE: Falling Slide Animation --- */}
          <div className="sm:hidden relative h-[180px] flex items-center justify-center">
            <AnimatePresence>
              <motion.div 
                key={activeBenefit}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5 }}
                className="absolute flex flex-col items-center justify-center text-center"
              >
                <img 
                  src={benefits[activeBenefit].imgSrc} 
                  alt={benefits[activeBenefit].title} 
                  className={`object-contain mb-4 opacity-100 mix-blend-screen drop-shadow-lg ${
                    benefits[activeBenefit].imgSrc.includes('icon-street') 
                      ? 'w-24 h-24' 
                      : 'w-16 h-16'
                  }`} 
                />
                <h3 className="font-strong uppercase text-[11px] text-[#E5E5E5] tracking-widest">{benefits[activeBenefit].title}</h3>
                <p className="text-[#666] text-[10px] mt-1 font-body tracking-wider">{benefits[activeBenefit].desc}</p>
              </motion.div>
            </AnimatePresence>
            
            {/* Dots indicativos no celular */}
            <div className="absolute -bottom-4 flex gap-2">
               {benefits.map((_, idx) => (
                 <div key={idx} className={`h-[2px] transition-all duration-500 ${activeBenefit === idx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-[#333]'}`}></div>
               ))}
            </div>
          </div>

          {/* --- DESKTOP: Grid Normal --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="hidden sm:grid sm:grid-cols-4 gap-12"
          >
            {benefits.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center justify-end text-center">
                <img 
                  src={item.imgSrc} 
                  alt={item.title} 
                  className={`object-contain mb-6 opacity-100 mix-blend-screen drop-shadow-xl ${
                    item.imgSrc.includes('icon-street') 
                      ? 'sm:w-40 sm:h-40' 
                      : 'sm:w-32 sm:h-32'
                  }`} 
                />
                <h3 className="font-strong uppercase sm:text-sm text-[#E5E5E5] tracking-widest">{item.title}</h3>
                <p className="text-[#666] sm:text-xs mt-2 font-body tracking-wider">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* CATEGORY NAVIGATION */}
      <nav id="catalogo" className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-xl border-b border-[#111111] pt-4 pb-3 sm:pt-6 sm:pb-4 shadow-2xl">
        <div className="flex gap-6 sm:gap-10 w-full justify-center px-4 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.a 
              key={cat}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={`#${cat.toLowerCase().replace('é','e')}`} 
              className="text-sm sm:text-lg font-squeeze tracking-[0.15em] uppercase text-[#666666] hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors py-2"
            >
              {cat}
            </motion.a>
          ))}
        </div>
      </nav>

      {/* DYNAMIC CATALOG (Mocked) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-20 pb-20">
        
        {/* Wrapper dos produtos para ficar acima do fundo */}
        <div className="relative z-10 space-y-32">
        {categories.map((category, catIdx) => {
          const categoryProducts = MOCK_PRODUCTS.filter(p => p.category === category);
          if (categoryProducts.length === 0) return null;
          
          const sectionId = category.toLowerCase().replace('é', 'e');

          return (
            <section key={category} id={sectionId} className="scroll-mt-32 relative py-8">
              
              {/* Marca d'água da Frase repetida no fundo de cada categoria */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 0.08, y: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden"
              >
                <img 
                  src="/Identidade visual M2 Street/frase-ms.png" 
                  alt="M2 Street Vibe" 
                  className="w-full max-w-6xl object-contain" 
                />
              </motion.div>

              <div className="relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-6 mb-8 sm:mb-12"
                >
                  <h2 className="text-3xl sm:text-5xl font-squeeze uppercase tracking-[0.15em] text-[#E5E5E5] shrink-0">
                    {category}
                  </h2>
                  <div className="flex-grow h-[1px] bg-gradient-to-r from-[#A68B5B] via-[#111111] to-transparent opacity-30"></div>
                </motion.div>

                {/* Grid 2 colunas no celular (bloquinhos) */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-x-8 sm:gap-y-12"
                >
                  {categoryProducts.map((product) => (
                    <motion.article key={product.id} variants={fadeInUp} className="flex flex-col group relative bg-[#050505] sm:bg-transparent pb-3 sm:pb-0 border border-[#111] sm:border-none">
                      <div 
                        className={`relative w-full aspect-[4/5] bg-[#0A0A0A] overflow-hidden mb-3 sm:mb-5 block transition-all duration-700
                          ${!product.is_available ? 'opacity-50 grayscale' : 'sm:hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]'}`}
                      >
                        {product.is_available && (
                           <div className="absolute inset-0 border border-transparent sm:group-hover:border-m2-gold/20 transition-all duration-700 z-10 pointer-events-none"></div>
                        )}

                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          loading="lazy"
                          className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out
                            ${product.is_available ? 'opacity-90 sm:opacity-80 sm:group-hover:opacity-100 sm:group-hover:scale-110' : 'opacity-60'}`}
                        />
                        
                        {!product.is_available && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                            <span className="font-strong text-[#E5E5E5] text-[8px] sm:text-xs px-4 sm:px-6 py-2 uppercase tracking-[0.2em] border border-[#333] transform -rotate-12 shadow-2xl">
                              Esgotado
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col flex-grow px-2">
                        <h3 className={`font-strong text-[9px] sm:text-xs leading-relaxed uppercase tracking-wider transition-colors duration-300
                          ${!product.is_available ? 'text-[#444]' : 'text-[#CCC] sm:text-[#888] sm:group-hover:text-[#E5E5E5]'}`}>
                          {product.name}
                        </h3>
                        <div className="mt-auto pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                          <span className={`font-squeeze text-base sm:text-xl tracking-[0.1em]
                            ${!product.is_available ? 'text-[#333]' : 'text-[#D4AF37]'}`}>
                            R$ {Number(product.price).toFixed(2).replace('.', ',')}
                          </span>
                          
                          {product.is_available && (
                            <a 
                              href={`https://wa.me/5569992917694?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} (R$ ${Number(product.price).toFixed(2).replace('.', ',')}). Podemos fechar?`)}`}
                              target="_blank" 
                              rel="noreferrer"
                              className="opacity-100 sm:opacity-0 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 font-strong uppercase text-[9px] tracking-widest text-black bg-[#D4AF37] sm:bg-transparent sm:text-[#D4AF37] py-2 sm:py-0 sm:border-b sm:border-[#D4AF37] sm:pb-1 text-center w-full sm:w-auto active:scale-95"
                            >
                              Comprar
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>
          );
        })}
        </div>
      </div>

      {/* LOCATION & SOCIAL SECTION */}
      <section className="relative border-t border-[#111111] bg-[#000000] py-24 sm:py-32 overflow-hidden mt-20">
        
        {/* Fundo com efeito de Pan Horizontal (Esquerda para Direita) */}
        <motion.div 
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
             backgroundImage: "url('/Identidade visual M2 Street/fundo-effect.png')",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat"
          }}
        ></motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Informações e Redes Sociais */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col space-y-8"
            >
              <div>
                <h2 className="text-3xl sm:text-5xl font-squeeze uppercase tracking-[0.15em] text-[#E5E5E5] mb-4">
                  Experiência <span className="text-[#D4AF37]">Física</span>
                </h2>
                <div className="w-24 h-[1px] bg-[#D4AF37] mb-8"></div>
                <p className="font-body text-[#888] text-sm sm:text-base leading-relaxed max-w-md">
                  Sinta a qualidade de perto. Nosso showroom exclusivo está localizado dentro da renomada <strong className="text-[#E5E5E5]">América Barbearia</strong>. Um espaço pensado para quem respira atitude e estilo.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <a href="https://instagram.com/m2.street" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 bg-[#050505] border border-[#222] px-6 py-4 hover:border-[#D4AF37] transition-all duration-500 w-fit">
                  <span className="font-strong uppercase text-xs tracking-widest text-[#E5E5E5] group-hover:text-[#D4AF37] transition-colors">
                    Siga no Instagram
                  </span>
                  <span className="text-[#D4AF37] font-script text-xl -mt-2">@m2.street</span>
                </a>
              </div>
            </motion.div>

            {/* Mapa Brutalista (Filtro Escuro) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square sm:aspect-video lg:aspect-square w-full border border-[#222] bg-[#050505] p-2"
            >
              {/* O filtro CSS deixa o Google Maps escuro para combinar com a identidade */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3090435948956!2d-63.02429752402179!3d-9.903498690196883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93cc91938711a90b%3A0xaf3d3a153fdfd464!2sAm%C3%A9rica%20Barbearia!5e0!3m2!1spt-BR!2sbr!4v1715000000000!5m2!1spt-BR!2sbr" 
                className="w-full h-full filter invert-[90%] hue-rotate-180 grayscale-[80%] contrast-125 opacity-70 hover:opacity-100 transition-opacity duration-500"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-6 left-6 pointer-events-none">
                <span className="bg-black/80 backdrop-blur text-[#D4AF37] font-strong text-[10px] uppercase tracking-widest px-4 py-2 border border-[#D4AF37]/30">
                  Visite-nos
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER AREA */}
      <footer className="border-t border-[#111111] bg-[#000000] pt-24 pb-8 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          
          {/* Logo Secundária Principal do Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="w-full flex justify-center mb-24"
          >
            <img 
              src="/Identidade visual M2 Street/logo-secundaria.png" 
              alt="M2 Street Logo" 
              className="w-56 sm:w-80 md:w-[400px] h-auto object-contain opacity-90 drop-shadow-[0_0_20px_rgba(212,175,55,0.05)]" 
            />
          </motion.div>
          
          {/* Linha de Copyright e Assinatura */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[#111111] gap-6">
             <p className="text-[9px] sm:text-[10px] text-[#444] uppercase tracking-[0.3em] font-strong text-center sm:text-left leading-relaxed">
               © {new Date().getFullYear()} M² Street.<br className="sm:hidden" /> Todos os direitos reservados.
             </p>
             
             {/* Assinatura DrewaWeb Tech */}
             <a href="#" className="group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 opacity-60 hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#666] font-body group-hover:text-[#A68B5B] transition-colors">
                  Engineered & Designed by
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-strong tracking-[0.3em] text-[#E5E5E5] group-hover:text-white transition-colors">
                  Drewa<span className="text-[#D4AF37]">Web</span>
                </span>
             </a>
          </div>
        </div>

        {/* Efeito Premium: Logo Gigante sangrando no limite inferior da tela (Watermark) */}
        <div className="absolute -bottom-10 sm:-bottom-24 left-1/2 -translate-x-1/2 w-[120vw] sm:w-[80vw] pointer-events-none opacity-[0.02] flex justify-center items-end z-0">
           <img 
             src="/Identidade visual M2 Street/logo-secundaria.png" 
             alt="M2 Street Watermark" 
             className="w-full h-auto object-cover" 
           />
        </div>
      </footer>

    </main>
  );
}
