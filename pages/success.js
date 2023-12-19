import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Importando useRouter
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const router = useRouter(); // Usando useRouter para obter o objeto router
  const { query } = router;   // Extraindo query do router

  const { cartItems, setCartItems, setTotalPrice, setTotalQuantities, totalPrice } = useStateContext();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (query.session_id) {
        const response = await fetch(`/api/retrieve-stripe-session?session_id=${query.session_id}`);
        const session = await response.json();
        setSession(session);
      }
    }

    fetchSession();

    // Limpar o carrinho
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [query.session_id]);

  const sendPurchaseDetails = async () => {
    if (session) {
      const to = session.customer_email;

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          from,
          subject: 'Detalhes da Sua Compra',
          text: `Você comprou os seguintes itens: ${cartItems.map(item => item.name).join(', ')} por um total de ${totalPrice}.`,
          html:`<h1>Você comprou os seguintes itens: ${cartItems.map(item => item.name).join(', ')} por um total de ${totalPrice}.<h1/>`,
        }),
      });
      
      const data = await response.json();
      console.log(data);
      conole.log(to);
    }
  };
  return (
    
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          {session && (
            <a className="email" href={`mailto:${session.customer_email}`}>
              {session.customer_email}
            </a>
          )}
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success