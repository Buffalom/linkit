import { kv } from '@vercel/kv'
import { generateKey } from '~/server/utils/helpers'
import { sendMail } from '~/server/utils/mail'

export interface Payload {
  email: string
}

const PREFIX = 'magic'

export async function createMagicToken(email: string) {
  const magicKey = generateKey()
  const maxAge = 60 * 60 // 1 hour

  await kv.hset<Payload>(`${PREFIX}:${magicKey}`, { email }, { ex: maxAge })

  return magicKey
}

export async function sendMagicTokenLink(email: string, token: string) {
  const config = useRuntimeConfig()

  const link = `${config.APP_URL}/auth/magic/${token}`

  await sendMail({
    to: email,
    subject: 'Magic Link',
    html: `<h1>Magic Link</h1>
    <p>Click on the following link to login.</p>
    <p><a href="${link}">${link}</a></p>`,
  })
}

export async function validateMagicToken(token: string) {
  const payload = await kv.hgetall<Payload>(`${PREFIX}:${token}`)

  if (!payload) {
    return false
  }

  await kv.del(`${PREFIX}:${token}`)

  return true
}
