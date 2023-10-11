import { kv } from '@vercel/kv'
import { notEmpty } from './helpers'
import type { Link, LinkWithKey } from '~/types/Link'

export type Payload = Link

export const PREFIX = 'link'

export async function createLink(
  key: string,
  url: string
): Promise<LinkWithKey> {
  const link = { url }

  await kv.set<Payload>(`${PREFIX}:${key}`, link)

  return {
    key,
    ...link,
  }
}

export async function getLinks(): Promise<Array<LinkWithKey>> {
  const linkKeys = (await kv.scan(0, { match: `${PREFIX}:*` }))[1]

  return (
    await Promise.all(
      linkKeys.map(async (key) => {
        const link = await kv.get<Payload>(key)

        if (!link) {
          return null
        }

        return {
          key: key.replace(`${PREFIX}:`, ''),
          ...link,
        }
      })
    )
  ).filter(notEmpty)
}

export async function getLink(
  key?: string | null
): Promise<LinkWithKey | null> {
  if (!key) {
    return null
  }

  const link = await kv.get<Payload>(`${PREFIX}:${key}`)

  if (!link) {
    return null
  }

  return {
    key,
    ...link,
  }
}

export async function markLinkAsVisited(key: string, link: Link) {
  await kv.set(`${PREFIX}:${key}`, {
    ...link,
    calls: (link.calls || 0) + 1,
    lastCall: new Date().toISOString(),
  })
}
