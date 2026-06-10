export async function POST(request) {
  console.log('BREVO_API_KEY:', process.env.BREVO_API_KEY);

  const { name, email, orderNumber, listType } = await request.json();

  if (!name || !email) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  // Require order number only for customer registrations
  if (listType === 'customer' && !orderNumber) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  let tag;
  if (listType === 'customer') tag = 'CUSTOMER';
  else if (listType === 'contact') tag = 'CONTACT';
  else tag = 'WAITLIST';

  const listIds = listType === 'waitlist' ? [3] : listType === 'contact' ? [5] : [4];

  const attributes = { FIRSTNAME: name };
  if (orderNumber) attributes.ORDER_NUMBER = orderNumber;

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes,
      listIds,
      tags: [tag],
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.log('Brevo error — status:', res.status, 'body:', JSON.stringify(body));
    return Response.json(
      { error: body.message || 'Failed to register. Please try again.' },
      { status: res.status }
    );
  }

  return Response.json({ success: true }, { status: 201 });
}
