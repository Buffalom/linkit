import nodemailer from 'nodemailer'

export interface Mail {
  to: string
  subject: string
  html: string
}

let transporter: nodemailer.Transporter

function initTransporter(apiKey: string) {
  if (transporter) {
    return
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.eu.sparkpostmail.com',
    port: 587,
    secureConnection: false,
    auth: {
      user: 'SMTP_Injection',
      pass: apiKey,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  })
}

export async function sendMail(mail: Mail) {
  const config = useRuntimeConfig()

  const completeMail: Mail & { from: string } = {
    ...mail,
    from: 'no-reply@mail.td2.ch',
  }

  if (config.SPARKPOST_API_KEY) {
    initTransporter(config.apiKey)

    const info = await transporter.sendMail(completeMail)

    console.log(`Message sent: ${info.messageId}`)
  } else {
    console.log('No SparkPost API key found. Mail not sent.')
    console.dir(completeMail)
  }
}
