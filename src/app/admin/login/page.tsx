'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('E-mail ou senha incorretos.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center font-body p-6">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1a1a1a] p-8 shadow-2xl relative overflow-hidden">
        
        {/* Detalhes de Design Premium */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C49B51] m-3 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C49B51] m-3 opacity-50"></div>

        <div className="text-center mb-10">
          <h1 className="text-[#E5E5E5] font-strong text-3xl tracking-widest uppercase">
            Acesso <span className="text-[#C49B51]">Admin</span>
          </h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-[0.2em]">Painel de Controle M² Street</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-900 text-red-500 text-xs p-3 text-center">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border border-[#222] text-white p-3 text-sm focus:border-[#C49B51] focus:outline-none transition-colors"
              placeholder="admin@m2street.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border border-[#222] text-white p-3 text-sm focus:border-[#C49B51] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#C49B51] text-black font-strong uppercase tracking-[0.2em] text-sm py-4 mt-4 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Autenticando...' : 'Entrar no Painel'}
          </button>
        </form>

      </div>
    </main>
  );
}
