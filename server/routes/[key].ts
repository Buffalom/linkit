import type { H3Event } from 'h3'
import { markLinkAsVisited } from '../utils/links'

export default defineEventHandler(async (event: H3Event) => {
  const key = getRouterParam(event, 'key')

  if (!key) {
    await sendRedirect(event, '/c/p', 302)
    return
  }

  const link = await getLink(key)

  if (!link) {
    console.log(`Link with key '${key}' not found`)
    await sendRedirect(event, '/c/p', 302)
    return
  }

  await sendRedirect(event, link.url, 302)

  await markLinkAsVisited(key, link)
})
