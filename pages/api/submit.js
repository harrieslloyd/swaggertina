import { handleEmailFire } from "../../components/email-helper";
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};


// export default async function POST(request) {
//   console.log(request)
//   const formData = await request.formData()
//   const name = formData.get('name')
//   const email = formData.get('email')
//   const body = formData.get('body')
//   await handleEmailFire({
//     to: "hlloyd25@pcstudents.us",
//     subject: `New Contact from ${name} at ${email}`,
//     html: body
//   });

//   return new Response("Success!");
// }


export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
           await handleEmailFire({
            to: "hlloyd25@pcstudents.us",
            subject: `New Contact from ${fields.name} at ${fields.email}`,
            html: fields.body
          });
          res.status(200).json({ fields })
      });
}