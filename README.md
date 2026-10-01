# M² Street | Catálogo Oficial  STREETWEAR

![DrewaWeb Standard](https://img.shields.io/badge/Engineered%20by-DrewaWeb-D4AF37?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Catálogo de produtos ultrarrápido e focado em alta conversão mobile para a marca **M² Street**, desenvolvido dentro do alto padrão de arquitetura da **DrewaWeb**. 

O projeto foi refatorado de um sistema Full Stack para uma Landing Page (Single Page Application) estática de altíssima performance, com foco na experiência de usuário (UX) em dispositivos móveis e fechamento de vendas via **WhatsApp Direto**.

---

## 🖤 Identidade Visual & UX (Brutalist Luxury)

*   **Paleta de Cores:** `Absolute Black (#000000)` e `Elegant Gold (#D4AF37)`.
*   **Animações Nativas:** Efeitos *Falling-slide*, Scroll Magnético (*Snap-scroll*) e Panning de fundo gerenciados via `Framer Motion`.
*   **Experiência Mobile-First:** Grid otimizado, remoção de hover desnecessário (botão "Comprar" visível), navegação intuitiva por gestos.
*   **Automação de Venda:** Botões de ação configurados para acionar o WhatsApp do lojista já com a mensagem e informações do produto selecionado preenchidas automaticamente.

---

## 🛠 Stack Tecnológico Oficial

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animações & Gestos:** [Framer Motion](https://www.framer.com/motion/)
*   **Ícones:** Lucide React
*   **Fontes:** Google Fonts (`Archivo Black`, `Bebas Neue`, `Montserrat`, `Yellowtail`)

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DOUGLASWEB-DG/vitrini_m2.street.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:** [http://localhost:3000](http://localhost:3000)

---

## 📦 Script de Deploy (Produção)

Este projeto foi otimizado para gerar páginas estáticas ultra rápidas sem dependência de banco de dados (`setup.sql` e Supabase foram removidos da raiz do front). Para gerar a build de produção (para plataformas como Netlify ou Vercel), execute:

```bash
npm run build
```

---

> **Design & Engineering by [DrewaWeb](#)**  
> *Transformando código em conversões e atitude.*
