import AdminAuthGuard from '@/components/AdminAuthGuard';
import { supabase } from '@/lib/supabase';
import { addProduct, deleteProduct, toggleAvailability } from './actions';
import { revalidatePath } from 'next/cache';

// Revalidar a página a cada request no painel (para forçar atualização dos dados na tabela)
export const revalidate = 0;

export default async function AdminDashboard() {
  // Buscar produtos direto do Supabase no Server Component
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <AdminAuthGuard>
      <main className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 font-body">
        <header className="flex justify-between items-center mb-10 border-b border-[#222] pb-6">
          <h1 className="text-2xl sm:text-3xl font-strong uppercase tracking-widest text-[#E5E5E5]">
            Painel <span className="text-[#C49B51]">Admin</span>
          </h1>
          <form action={async () => {
            'use server';
            // Para logout real seria no client, mas pra demo vamos apenas recarregar (o ideal era botão no Client Component).
            // Vamos deixar um link simples que o middleware pega.
          }}>
             <a href="/admin/login" className="text-xs text-gray-500 hover:text-[#C49B51] uppercase tracking-widest transition-colors">Voltar ao Login</a>
          </form>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA ESQUERDA: FORMULÁRIO DE UPLOAD */}
          <section className="lg:col-span-1 bg-[#0A0A0A] border border-[#222] p-6 shadow-2xl h-fit sticky top-6">
            <h2 className="font-strong uppercase tracking-widest text-[#C49B51] mb-6 border-b border-[#222] pb-2">
              Cadastrar Produto
            </h2>
            
            <form action={addProduct} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest">Foto do Produto</label>
                <input 
                  type="file" 
                  name="image" 
                  accept="image/jpeg, image/png, image/webp"
                  required
                  className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-strong file:uppercase file:bg-[#C49B51] file:text-black hover:file:bg-white cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest">Nome do Produto</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Ex: Camiseta Oversized Preta"
                  className="bg-black border border-[#222] p-3 text-sm focus:border-[#C49B51] focus:outline-none text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest">Preço (R$)</label>
                <input 
                  type="text" 
                  name="price" 
                  required
                  placeholder="Ex: 99,90"
                  className="bg-black border border-[#222] p-3 text-sm focus:border-[#C49B51] focus:outline-none text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest">Categoria</label>
                <select 
                  name="category" 
                  required
                  className="bg-black border border-[#222] p-3 text-sm focus:border-[#C49B51] focus:outline-none text-white"
                >
                  <option value="Camisas">Camisas</option>
                  <option value="Bermudas">Bermudas</option>
                  <option value="Bonés">Bonés</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-[#C49B51] text-black font-strong uppercase tracking-widest text-sm py-4 mt-2 hover:bg-white transition-colors">
                Salvar Produto
              </button>
            </form>
          </section>

          {/* COLUNA DIREITA: LISTA DE PRODUTOS */}
          <section className="lg:col-span-2 space-y-4">
            <h2 className="font-strong uppercase tracking-widest text-gray-400 mb-6">
              Estoque Atual ({products?.length || 0})
            </h2>

            {products?.length === 0 ? (
              <div className="text-center p-10 border border-dashed border-[#333] text-gray-500 font-squeeze text-2xl tracking-widest uppercase">
                Nenhum produto cadastrado ainda.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products?.map((product) => (
                  <div key={product.id} className="bg-[#0A0A0A] border border-[#222] p-4 flex gap-4 items-center">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className={`w-20 h-24 object-cover ${!product.is_available ? 'grayscale opacity-50' : ''}`} 
                    />
                    
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] text-[#C49B51] font-strong uppercase tracking-widest">{product.category}</span>
                      <h3 className="text-sm font-strong uppercase truncate mt-1 text-gray-200">{product.name}</h3>
                      <span className="text-xl font-squeeze text-white mt-1">R$ {product.price.toString().replace('.', ',')}</span>
                      
                      <div className="flex gap-3 mt-3">
                        <form action={toggleAvailability.bind(null, product.id, product.is_available)}>
                          <button type="submit" className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 border ${product.is_available ? 'border-[#333] text-gray-400 hover:text-white' : 'border-[#C49B51] text-[#C49B51]'}`}>
                            {product.is_available ? 'Marcar Esgotado' : 'Reativar Venda'}
                          </button>
                        </form>
                        
                        <form action={deleteProduct.bind(null, product.id, product.image_url)}>
                          <button type="submit" className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 border border-red-900/30 text-red-500 hover:bg-red-900 hover:text-white transition-colors">
                            Apagar
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </AdminAuthGuard>
  );
}
