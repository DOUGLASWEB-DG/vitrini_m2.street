import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Força o Next.js a buscar dados novos do banco sempre que a página for acessada
export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const categories = ['Camisas', 'Bermudas', 'Bonés'];

  return (
    <main className="min-h-screen pb-20 bg-[#050505] selection:bg-[#C49B51] selection:text-black font-body">
      {/* HEADER */}
      <header className="bg-black border-b border-[#1a1a1a] pt-16 pb-6 px-6 text-center flex flex-col items-center justify-center relative overflow-hidden sticky top-0 z-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C49B51] opacity-[0.03] blur-[80px] rounded-full pointer-events-none"></div>
        
        <h1 className="flex items-baseline tracking-tighter z-10 uppercase">
          <span className="text-white font-strong text-5xl sm:text-6xl">M²</span>
          <span className="text-[#C49B51] ml-3 font-squeeze italic text-5xl sm:text-7xl">Street</span>
        </h1>
        <p className="text-[#666666] mt-3 font-strong tracking-[0.2em] text-[8px] sm:text-[10px] uppercase z-10">
          Mais que estilo, é atitude.
        </p>

        <nav className="mt-8 z-10 flex gap-6 sm:gap-10 overflow-x-auto w-full justify-center scrollbar-hide px-4">
          {categories.map(cat => (
            <a key={cat} href={`#${cat.toLowerCase().replace('é','e')}`} className="text-lg sm:text-2xl font-squeeze tracking-[0.1em] uppercase text-gray-400 hover:text-[#C49B51] transition-all hover:-translate-y-0.5 px-2">
              {cat}
            </a>
          ))}
        </nav>
      </header>

      {/* ÁREA DO CATÁLOGO DINÂMICO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 space-y-24">
        {error && (
          <div className="text-center text-red-500 bg-red-900/20 p-4 border border-red-900">
            Erro ao carregar o banco de dados: {error.message}
          </div>
        )}

        {(!products || products.length === 0) && !error && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-squeeze tracking-widest uppercase text-gray-500">Vitrine Vazia</h2>
            <p className="text-gray-600 text-sm mt-2">Acesse o <Link href="/admin/login" className="text-[#C49B51] hover:underline">/admin</Link> para fazer o upload das suas fotos.</p>
          </div>
        )}

        {categories.map(category => {
          const categoryProducts = products?.filter(p => p.category === category) || [];
          if (categoryProducts.length === 0) return null;
          
          const sectionId = category.toLowerCase().replace('é', 'e');

          return (
            <section key={category} id={sectionId} className="scroll-mt-32">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-4xl sm:text-5xl font-squeeze uppercase tracking-[0.1em] text-[#E5E5E5] shrink-0">
                  {category}
                </h2>
                <div className="flex-grow h-[1px] bg-gradient-to-r from-[#222222] via-[#111111] to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {categoryProducts.map((product) => (
                  <article key={product.id} className="flex flex-col group relative">
                    <Link 
                      href={`/produto/${product.slug}`}
                      className={`relative w-full aspect-[4/5] bg-[#0A0A0A] overflow-hidden mb-5 block transition-all duration-500
                        ${!product.is_available ? 'opacity-60 grayscale-[70%]' : 'hover:shadow-[0_0_20px_rgba(196,155,81,0.1)]'}`}
                      style={{ pointerEvents: !product.is_available ? 'none' : 'auto' }}
                    >
                      {product.is_available && (
                        <>
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C49B51] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 m-3 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C49B51] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 m-3 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C49B51] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 m-3 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C49B51] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 m-3 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                        </>
                      )}

                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-700 ease-out
                          ${product.is_available ? 'opacity-90 group-hover:opacity-100 group-hover:scale-110' : 'opacity-70'}`}
                      />
                      
                      {!product.is_available && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
                          <span className="font-strong bg-[#111] text-[#E5E5E5] text-[10px] sm:text-xs px-6 py-2 uppercase tracking-[0.2em] border border-[#333] transform -rotate-12 shadow-2xl">
                            Esgotado
                          </span>
                        </div>
                      )}
                    </Link>
                    
                    <div className="flex flex-col flex-grow px-2">
                      <h3 className={`font-strong text-[11px] sm:text-xs leading-relaxed uppercase transition-colors
                        ${!product.is_available ? 'text-[#555]' : 'text-[#CCC] group-hover:text-[#C49B51]'}`}>
                        {product.name}
                      </h3>
                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <span className={`font-squeeze text-xl sm:text-2xl tracking-wider
                          ${!product.is_available ? 'text-[#444]' : 'text-[#C49B51]'}`}>
                          R$ {Number(product.price).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
