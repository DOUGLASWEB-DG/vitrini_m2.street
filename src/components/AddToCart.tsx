'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { generateWhatsAppLink } from '@/utils/whatsapp';

export default function AddToCart({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const sizes = ['P', 'M', 'G', 'GG']; // Podemos tornar isso dinâmico depois

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
      return;
    }
    
    addItem({
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      quantity: 1
    });
  };

  const cartTotalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="mt-8 flex flex-col gap-6">
      
      {/* Seletor de Tamanhos */}
      <div className="flex flex-col gap-3">
        <span className="font-strong text-[10px] text-gray-500 uppercase tracking-widest">Selecione o Tamanho</span>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 flex items-center justify-center font-strong text-xs transition-all duration-300
                ${selectedSize === size 
                  ? 'bg-[#C49B51] text-black scale-110 shadow-[0_0_15px_rgba(196,155,81,0.4)]' 
                  : 'bg-black border border-[#333] text-gray-400 hover:border-[#C49B51] hover:text-[#C49B51]'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {/* Botão Adicionar */}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#111] border border-[#333] text-white font-strong uppercase tracking-widest text-sm py-4 hover:border-[#C49B51] hover:text-[#C49B51] transition-colors"
        >
          Adicionar ao Carrinho
        </button>

        {/* Botão Finalizar no WhatsApp (Aparece se tiver itens) */}
        {cartTotalItems > 0 && (
          <a 
            href={generateWhatsAppLink(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-black font-strong uppercase tracking-widest text-sm py-4 text-center hover:bg-[#1ebd5b] hover:scale-[1.02] transition-all flex justify-center items-center gap-3"
          >
            Finalizar Compra no WhatsApp ({cartTotalItems})
          </a>
        )}
      </div>

    </div>
  );
}
