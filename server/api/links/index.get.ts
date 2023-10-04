import type { H3Event } from 'h3'
import { kv } from '@vercel/kv'
import { Link, LinkWithKey } from '~/types/Link'

export default defineEventHandler(async (event: H3Event) => {
  const [_, linkKeys] = await kv.scan(0, { type: 'hash' })

  const links: Array<LinkWithKey> = await Promise.all(
    linkKeys.flatMap(async (key) => {
      const link = await kv.hgetall<Link>(key)

      if (!link) {
        return []
      }

      return [
        {
          key,
          calls: 0,
          latestCall: null,
          ...link,
        },
      ]
    })
  )

  return { data: links }
})
