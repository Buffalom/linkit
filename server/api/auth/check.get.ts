import type { H3Event } from 'h3'
import { requireAuth } from '~/server/utils/session'

export default defineEventHandler(async (event: H3Event) => {
  await requireAuth(event)

  return { ok: true }
})
