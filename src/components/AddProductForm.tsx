'use client';

import { useState } from 'react';
import { addProduct } from '@/app/admin/actions';

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await addProduct(formData);
    
    if (result?.error) {
      alert("⚠️ Erro ao salvar:\n" + result.error);
    } else if (result?.success) {
      alert("✅ Produto salvo com sucesso!");
      (e.target as HTMLFormElement).reset();
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      <button type="submit" disabled={loading} className="w-full bg-[#C49B51] text-black font-strong uppercase tracking-widest text-sm py-4 mt-2 hover:bg-white transition-colors disabled:opacity-50">
        {loading ? 'Enviando foto...' : 'Salvar Produto'}
      </button>
    </form>
  );
}
