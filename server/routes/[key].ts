import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'
import { Link } from '~/types/Link'

export default defineEventHandler(async (event: H3Event) => {
  const key = getRouterParam(event, 'key')

  const link = await kv.hgetall<Link>(key)

  if (link?.url) {
    await sendRedirect(event, link.url, 302)

    await kv.hset(key, {
      calls: (link.calls || 0) + 1,
      latestCall: new Date().toISOString(),
    })

    return { link }
  }

  console.log(`Link with key '${key}' not found`)

  await sendRedirect(event, '/c/p', 302)

  return { link }
})
