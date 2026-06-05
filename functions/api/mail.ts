import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  occupation: string;
  message: string;
  privacy: boolean;
}

export const onRequestPost: PagesFunction<{
  REAL_EMAIL: string;
  RESEND_API_KEY: string;
}> = async (context) => {
  const resend = new Resend(context.env.RESEND_API_KEY);

  const body = await context.request.json<ContactFormData>();

  const { name, email, occupation, message, privacy } = body;

  if (!name || !email || !occupation || !message || !privacy) {
    return new Response(
      JSON.stringify({ error: 'Tutti i campi sono obbligatori.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const { error } = await resend.emails.send({
    from: 'Factor Studio <noreply@factorstudio.it>',
    replyTo: context.env.REAL_EMAIL,
    to: context.env.REAL_EMAIL,
    subject: `Nuovo contatto da ${name}`,
    html: `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Occupazione:</strong> ${occupation}</p>
      <p><strong>Messaggio:</strong> ${message}</p>
    `,
  });

  if (error) {
    return new Response(
      JSON.stringify({ error: "Errore nell'invio della mail." }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
