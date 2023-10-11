import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'
import { generateKey } from '~/server/utils/helpers'
import { validateMagicToken } from '~/server/utils/magic'

export default defineEventHandler(async (event: H3Event) => {
  const token = getRouterParam(event, 'token')

  if (token && (await validateMagicToken(token))) {
    const sessionToken = generateKey()
    const maxAge = 60 * 60 * 24 * 365

    await kv.set(`session:${sessionToken}`, '1', { ex: maxAge })

    setCookie(event, 'session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
    })
  } else {
    deleteCookie(event, 'session')
  }

  await sendRedirect(event, '/c/p', 302)
})
