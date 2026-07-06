import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { from_name, from_email, project_type, message } = req.body

  if (!from_name || !from_email || !project_type || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from:    `"${from_name}" <${process.env.GMAIL_USER}>`,
      replyTo: from_email,
      to:      process.env.GMAIL_USER,
      subject: `[Portfolio] New inquiry — ${project_type}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0d0d0d;color:#efefef;border-radius:12px;overflow:hidden">
          <div style="background:#FF7A2A;padding:28px 32px">
            <h1 style="margin:0;font-size:1.4rem;color:#fff">New Project Inquiry 🚀</h1>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;color:#aaa;width:130px">Name</td><td style="padding:10px 0;color:#fff;font-weight:600">${from_name}</td></tr>
              <tr><td style="padding:10px 0;color:#aaa">Email</td><td style="padding:10px 0"><a href="mailto:${from_email}" style="color:#FF7A2A">${from_email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#aaa">Project Type</td><td style="padding:10px 0;color:#fff">${project_type}</td></tr>
            </table>
            <hr style="border-color:rgba(255,255,255,.1);margin:20px 0"/>
            <p style="color:#aaa;margin:0 0 8px">Message</p>
            <p style="color:#fff;line-height:1.7;white-space:pre-wrap;margin:0">${message}</p>
          </div>
          <div style="padding:16px 32px;background:rgba(255,255,255,.04);font-size:.8rem;color:#555">
            Sent via Gurezma Studio portfolio contact form
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
}
