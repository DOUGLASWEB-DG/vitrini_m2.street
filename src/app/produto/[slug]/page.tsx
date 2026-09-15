import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AddToCart from '@/components/AddToCart';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20 bg-[#050505] selection:bg-[#C49B51] selection:text-black font-body">
      <header className="p-6 border-b border-[#1a1a1a]">
        <Link href="/" className="text-gray-400 hover:text-[#C49B51] text-xs font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
          <span>←</span> Voltar para a vitrine
        </Link>
      </header>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row mt-10 gap-10 px-4">
        
        {/* Lado Esquerdo: Imagem Premium com Efeitos */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C49B51] m-4 z-10 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C49B51] m-4 z-10 opacity-50"></div>

          <div className={`relative w-full aspect-[4/5] bg-[#0A0A0A] overflow-hidden rounded-sm transition-all
            ${!product.is_available ? 'grayscale-[70%] opacity-70' : ''}`}>
            
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
            />

            {!product.is_available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                <span className="font-strong bg-[#111] text-[#E5E5E5] text-sm px-8 py-3 uppercase tracking-[0.4em] border border-[#333] transform -rotate-12 shadow-2xl">
                  Esgotado
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Informações */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-6">
          <span className="font-strong text-[10px] text-[#C49B51] uppercase tracking-[0.2em]">
            {product.category}
          </span>
          <h1 className="font-strong text-3xl sm:text-4xl text-[#E5E5E5] mt-4 leading-tight uppercase tracking-tight">
            {product.name}
          </h1>
          <p className="font-squeeze text-4xl sm:text-5xl text-[#C49B51] mt-6 tracking-wide">
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </p>
          
          <div className="mt-8 font-body text-gray-400 text-sm leading-relaxed border-t border-[#1a1a1a] pt-8">
            {product.description || 'Nenhuma descrição fornecida.'}
          </div>

          {product.is_available ? (
            <AddToCart product={product} />
          ) : (
            <div className="mt-10 p-6 border border-[#222] bg-[#0A0A0A] text-center">
              <p className="font-strong text-gray-500 uppercase tracking-widest text-[10px]">
                Este produto está esgotado no momento.
              </p>
            </div>
          )}
          
        </div>
      </div>
    </main>
  );
}
