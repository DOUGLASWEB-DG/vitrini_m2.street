'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const category = formData.get('category') as string;
  const image = formData.get('image') as File;
  
  if (!name || !price || !category || !image || image.size === 0) {
    return { error: 'Preencha todos os campos e selecione uma imagem.' };
  }

  const supabase = getSupabaseAdmin();
  
  // 1. Fazer upload da imagem pro Storage
  const fileExt = image.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('produtos')
    .upload(fileName, image);

  if (uploadError) {
    console.error("Erro no upload:", uploadError);
    return { error: `Erro no upload: ${uploadError.message}` };
  }

  // Pegar URL pública da imagem
  const { data: { publicUrl } } = supabase.storage.from('produtos').getPublicUrl(fileName);

  // Criar slug (nome-do-produto-idaleatorio)
  const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

  // 2. Inserir no banco de dados
  const { error: dbError } = await supabase.from('products').insert({
    name,
    slug,
    price: parseFloat(price.replace(',', '.')),
    category,
    image_url: publicUrl,
    is_available: true
  });

  if (dbError) {
    console.error("Erro no banco:", dbError);
    return { error: `Erro no banco: ${dbError.message}` };
  }

  // Atualizar a página inicial para mostrar o novo produto
  revalidatePath('/');
  revalidatePath('/admin');
  
  return { success: true };
}

export async function toggleAvailability(id: string, currentStatus: boolean) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('products').update({ is_available: !currentStatus }).eq('id', id);
  
  if (!error) {
    revalidatePath('/');
    revalidatePath('/admin');
  }
}

export async function deleteProduct(id: string, imageUrl: string) {
  const supabase = getSupabaseAdmin();
  
  // Extrair o nome do arquivo da URL (ex: https://.../storage/v1/object/public/produtos/12345.jpg -> 12345.jpg)
  const fileName = imageUrl.split('/').pop();
  
  if (fileName) {
    // Apagar imagem do bucket
    await supabase.storage.from('produtos').remove([fileName]);
  }
  
  // Apagar do banco de dados
  const { error } = await supabase.from('products').delete().eq('id', id);
  
  if (!error) {
    revalidatePath('/');
    revalidatePath('/admin');
  }
}
