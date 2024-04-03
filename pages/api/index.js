import { handleEmailFire } from "../../components/email-helper";
export async function POST(request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const body = formData.get('body')
  await handleEmailFire({
    to: "hlloyd25@pcstudents.us",
    subject: `New Contact from ${name} at ${email}`,
    html: body
  });

  return new Response("Success!");
}