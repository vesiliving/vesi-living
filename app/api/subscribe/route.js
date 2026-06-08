export async function POST(request) {
  const { name, email, orderNumber } = await request.json();

  if (!name || !email || !orderNumber) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: name,
      },
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return Response.json(
      { error: body.message || 'Failed to register. Please try again.' },
      { status: res.status }
    );
  }

  return Response.json({ success: true }, { status: 201 });
}
