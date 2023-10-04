import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'
import { Link, LinkWithKey } from '~/types/Link'

export default defineEventHandler(async (event: H3Event) => {
  const key = getRouterParam(event, 'key')

  const link = await kv.hgetall<Link>(key)

  if (!link) {
    throw createError({
      statusCode: 404,
      statusMessage: `Link not found`,
    })
  }

  const linkWithKey: LinkWithKey = {
    key,
    calls: 0,
    latestCall: null,
    ...link,
  }

  return { data: linkWithKey }
})
