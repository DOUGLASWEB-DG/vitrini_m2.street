-- 1. Cria a tabela de produtos
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  price numeric NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Ativa segurança mas permite que qualquer pessoa (clientes) leia a tabela de produtos
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura Publica Produtos" ON public.products FOR SELECT USING (true);
-- Nota: A inserção/edição será feita pelo nosso backend usando a chave Admin (Service Role), que ignora essa restrição automaticamente.

-- 3. Cria o "Bucket" (pasta na nuvem) para hospedar as imagens
INSERT INTO storage.buckets (id, name, public) VALUES ('produtos', 'produtos', true);

-- 4. Permite que qualquer pessoa veja as imagens que estão dentro do bucket
CREATE POLICY "Leitura Publica Imagens" ON storage.objects FOR SELECT USING (bucket_id = 'produtos');
