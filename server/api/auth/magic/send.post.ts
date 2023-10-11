import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'
import nodemailer from 'nodemailer'
import { generateKey } from '~/server/utils/helpers'

async function validatedBody(event: H3Event): Promise<{ email: string }> {
  const body = await readBody(event)

  if (typeof body !== 'object') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must be an object`,
    })
  }

  if (typeof body.email !== 'string') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must contain a 'email' property`,
    })
  }

  return body
}

async function sendMagicLinkEmail(
  email: string,
  magicLink: string,
  apiKey: string
) {
  // return new Promise((resolve, reject) => {
  console.log({
    email,
    magicLink,
    apiKey,
  })

  const transporter = nodemailer.createTransport({
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

  const info = await transporter.sendMail({
    from: 'no-reply@mail.td2.ch',
    to: email,
    subject: 'Hello ✔',
    html: '<b>Hello world?</b>',
  })

  console.log('Message sent: %s', info.messageId)
}

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()

  const { email } = await validatedBody(event)

  const magicKey = generateKey()
  const maxAge = 60 * 60 // 1 hour

  await kv.set(`magic:${magicKey}`, '1', { ex: maxAge })

  await sendMagicLinkEmail(email, magicKey, config.SPARKPOST_API_KEY)

  return { ok: true }
})
