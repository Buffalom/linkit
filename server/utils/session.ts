import { kv } from '@vercel/kv'
import type { H3Event } from 'h3'
import { generateKey } from '~/server/utils/helpers'

export interface Payload {
  email: string
}

export const PREFIX = 'session'
export const MAX_AGE = 60 * 60 * 24 * 365 // 1 year
export const COOKIE_NAME = 'session'

export async function createSessionToken(email: string) {
  const token = generateKey()

  await kv.set<Payload>(`${PREFIX}:${token}`, { email }, { ex: MAX_AGE })

  return token
}

export async function validateSessionToken(
  token: string
): Promise<false | Payload> {
  return (await kv.get<Payload>(`session:${token}`)) ?? false
}

export async function requireAuth(event: H3Event): Promise<Payload> {
  const token = getCookie(event, 'session')

  const payload = token ? await validateSessionToken(token) : false

  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  return payload
}
