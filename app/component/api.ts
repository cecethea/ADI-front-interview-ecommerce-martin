import { get } from 'http';

async function getData() {
  const res = await fetch('https://dummyapi.online/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

async function getProduct(id: string) {
  const res = await fetch(`https://dummyapi.online/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

async function getByCategory(category: string) {
  const res = await getData();
  const data = res.filter(
    (product: any) => product.productCategory === category
  );
  return data;
}

export { getData, getProduct, getByCategory };
