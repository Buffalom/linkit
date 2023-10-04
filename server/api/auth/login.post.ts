import { randomBytes } from 'crypto'
import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'

async function validatedBody(event: H3Event): { key: string; url: string } {
  const body = await readBody(event)

  if (typeof body !== 'object') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must be an object`,
    })
  }

  if (typeof body.password !== 'string') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must contain a 'password' property`,
    })
  }

  return body
}

function generateSessionKey(): string {
  return randomBytes(64).toString('hex')
}

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()

  const { password } = await validatedBody(event)

  if (!password || password !== config.APP_PASSWORD) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  const sessionKey = generateSessionKey()
  const maxAge = 60 * 60 * 24 * 365

  await kv.set(`session:${sessionKey}`, '1', { ex: maxAge })

  setCookie(event, 'session', sessionKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge,
  })

  return { ok: true }
})
