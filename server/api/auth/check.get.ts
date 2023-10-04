import { randomBytes } from 'crypto'
import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'

export default defineEventHandler(async (event: H3Event) => {
  const sessionKey = getCookie(event, 'session')

  const exists = await kv.exists(`session:${sessionKey}`)

  if (!exists) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`,
    })
  }

  return { ok: true }
})
