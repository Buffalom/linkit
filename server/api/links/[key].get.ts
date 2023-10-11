import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'
import { Link, LinkWithKey } from '~/types/Link'
import { requireAuth } from '~/server/utils/session'

export default defineEventHandler(async (event: H3Event) => {
  await requireAuth(event)

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
