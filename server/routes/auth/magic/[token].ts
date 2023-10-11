import type { H3Event } from 'h3'
import { useMagicToken } from '~/server/utils/magic'
import {
  MAX_AGE as maxSessionAge,
  COOKIE_NAME as sessionCookieName,
  createSessionToken,
} from '~/server/utils/session'

export default defineEventHandler(async (event: H3Event) => {
  const token = getRouterParam(event, 'token')

  const payload = token ? await useMagicToken(token) : false

  if (payload && payload.email) {
    const sessionToken = await createSessionToken(payload.email)

    setCookie(event, 'session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: maxSessionAge,
    })
  } else {
    deleteCookie(event, sessionCookieName)
  }

  await sendRedirect(event, '/c/p', 302)
})
