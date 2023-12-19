import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'c94vm9i7',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// Função para inserir a compra no Sanity
async function insertPurchase(session) {
  const purchase = {
    _type: 'purchase',
    customerEmail: session.customer_email,
    totalPrice: session.amount_total / 100, // Convertendo para valor real
    items: session.display_items.map(item => ({
      _type: 'reference',
      _ref: item.custom.id, // Ajuste conforme seu schema de produto
    })),
  };

  try {
    await client.create(purchase);
    console.log('Compra inserida com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir compra:', err);
  }
}

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);