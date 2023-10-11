import type { H3Event } from 'h3'
import type { LinkWithKey } from '~/types/Link'
import { requireAuth } from '~/server/utils/session'
import type { ApiResponse } from '~/types/ApiResponse'
import { getLink } from '~/server/utils/links'

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<LinkWithKey>> => {
    await requireAuth(event)

    const key = getRouterParam(event, 'key')

    const link = await getLink(key)

    if (!link) {
      throw createError({
        statusCode: 404,
        statusMessage: `Link not found`,
      })
    }

    return { data: link }
  }
)
