import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

const transporter =
nodemailer.createTransport({

  host:
    process.env.SMTP_HOST,

  port:
    Number(process.env.SMTP_PORT),

  secure: true,

  auth: {

    user:
      process.env.SMTP_USER,

    pass:
      process.env.SMTP_PASS,
  }

})

export async function POST(
  req: Request
) {

  try {

    const {
      name,
      email,
      phone,
      message
    } = await req.json()

    await transporter.sendMail({

      from:
        process.env.SMTP_USER,

      to:
        process.env.ADMIN_EMAIL,

      subject:
        "New Contact Enquiry",

      html: `

      <h2>New Contact Message</h2>

      <p><b>Name:</b> ${name}</p>

      <p><b>Email:</b> ${email}</p>

      <p><b>Phone:</b> ${phone}</p>

      <p><b>Message:</b> ${message}</p>

      `

    })

    return NextResponse.json({
      success: true
    })

 } catch (error) {

console.log(error)

return NextResponse.json(
{
success:false,
error
},
{
status:500
}
)

}

}