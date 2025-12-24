import { Product, HeroContent, HowToBuy } from './types';

const BASE_URL = '/api';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products.php`);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}

export async function createProduct(formData: FormData) {
  const res = await fetch(`${BASE_URL}/products.php`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function updateProduct(id: number, formData: FormData) {
  formData.append('_method', 'PUT');
  formData.append('id', String(id));
  const res = await fetch(`${BASE_URL}/products.php`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${BASE_URL}/products.php?id=${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
}

export async function reorderProducts(order: number[]) {
  const body = new FormData();
  body.append('action', 'reorder');
  body.append('order', JSON.stringify(order));
  const res = await fetch(`${BASE_URL}/products.php`, { method: 'POST', body });
  if (!res.ok) throw new Error('Error al reordenar productos');
  return res.json();
}

export async function fetchPhone(): Promise<string> {
  const res = await fetch(`${BASE_URL}/settings.php`);
  if (!res.ok) throw new Error('Error al cargar teléfono');
  const data = await res.json();
  return data.phone ?? '';
}

export async function savePhone(phone: string) {
  const res = await fetch(`${BASE_URL}/settings.php`, {
    method: 'POST',
    body: new URLSearchParams({ phone })
  });
  if (!res.ok) throw new Error('Error al guardar teléfono');
  return res.json();
}

export async function fetchHero(): Promise<HeroContent> {
  const res = await fetch(`${BASE_URL}/hero.php`);
  if (!res.ok) throw new Error('Error al cargar hero');
  const data = await res.json();
  return { title: data.title || '', subtitle: data.subtitle || '', image: data.image || '' };
}

export async function saveHero(data: HeroContent, file?: File) {
  const body = new FormData();
  body.append('title', data.title);
  body.append('subtitle', data.subtitle);
  if (file) body.append('image', file);
  else body.append('image', data.image);
  const res = await fetch(`${BASE_URL}/hero.php`, { method: 'POST', body });
  if (!res.ok) throw new Error('Error al guardar hero');
  return res.json();
}

export async function fetchHowToBuy(): Promise<HowToBuy> {
  const res = await fetch(`${BASE_URL}/how_to_buy.php`);
  if (!res.ok) throw new Error('Error al cargar sección Cómo comprar');
  const data = await res.json();
  return { title: data.title || '', description: data.description || '', videoUrl: data.videoUrl || '' };
}

export async function saveHowToBuy(data: HowToBuy) {
  const body = new URLSearchParams({
    title: data.title,
    description: data.description,
    videoUrl: data.videoUrl,
  });
  const res = await fetch(`${BASE_URL}/how_to_buy.php`, { method: 'POST', body });
  if (!res.ok) throw new Error('Error al guardar sección Cómo comprar');
  return res.json();
}
