import type { H3Event } from 'h3'
import { requireAuth } from '~/server/utils/session'
import { getLinks } from '~/server/utils/links'
import type { LinkWithKey } from '~/types/Link'
import type { ApiResponseCollection } from '~/types/ApiResponse'

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponseCollection<LinkWithKey>> => {
    await requireAuth(event)

    const links = await getLinks()

    return { data: links }
  }
)
