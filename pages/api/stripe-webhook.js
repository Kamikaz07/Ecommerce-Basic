import Stripe from 'stripe';
import { buffer } from 'micro';
import { client } from '../../lib/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const purchaseDocument = {
        _type: 'purchase',
        customerEmail: session.customer_email, // Inserindo o e-mail do cliente
        totalPrice: session.amount_total, // O valor total é em centavos
        items: itemsRefs
      };

      // Inserir no Sanity
      await client.create(purchaseDocument);

      res.status(200).json({received: true});
    } else {
      res.status(400).end();
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}