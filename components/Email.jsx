import React, { useState } from 'react';

function EmailForm() {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState(''); // Adicione um estado para 'from'
  const [subject, setSubject] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        from,
        subject,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Email do destinatário"
        required
      />
      <input
        type="email"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="Seu email"
        required
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Assunto"
        required
      />
      <button type="submit">Enviar Email</button>
    </form>
  );
}

export default EmailForm;
