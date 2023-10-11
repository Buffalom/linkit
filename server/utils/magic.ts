import { kv } from '@vercel/kv'
import { generateKey } from '~/server/utils/helpers'
import { sendMail } from '~/server/utils/mail'

export interface Payload {
  email: string
}

export const PREFIX = 'magic'
export const MAX_AGE = 60 * 60 // 1 hour

export async function createMagicToken(email: string) {
  const token = generateKey()

  await kv.set<Payload>(`${PREFIX}:${token}`, { email }, { ex: MAX_AGE })

  return token
}

export async function sendMagicTokenLink(email: string, token: string) {
  const config = useRuntimeConfig()

  const link = `${config.public.APP_URL}/auth/magic/${token}`

  await sendMail({
    to: email,
    subject: 'Magic Link',
    html: `<h1>Magic Link</h1>
    <p>Click on the following link to login.</p>
    <p><a href="${link}">${link}</a></p>`,
  })
}

export async function useMagicToken(token: string): Promise<false | Payload> {
  const payload = await kv.get<Payload>(`${PREFIX}:${token}`)

  if (!payload) {
    return false
  }

  await kv.del(`${PREFIX}:${token}`)

  return payload
}
