import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  if (req.method === 'POST') {
    const { to, from, subject, productName, price, quantity, otherDetails } = req.body;

    try {
      const textContent = `Você comprou o seguinte produto: ${productName}, Quantidade: ${quantity}, Preço: ${price}. ${otherDetails}`;
      const htmlContent = `<strong>Detalhes da Compra:</strong><br>Produto: ${productName}<br>Quantidade: ${quantity}<br>Preço: ${price}<br>${otherDetails}`;

      const msg = {
        to, 
        from: {
          name: 'Kami Web Store',
          email: 'rfaoo1@iscte-iul.pt',
        }, 
        subject,
        text: textContent,
        html: htmlContent,
      };

      await sgMail.send(msg);
      
      res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).json({ error: 'Erro ao enviar email' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
