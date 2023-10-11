import type { H3Event } from 'h3'
import type { LinkWithKey } from '~/types/Link'
import { requireAuth } from '~/server/utils/session'
import { createLink } from '~/server/utils/links'
import type { ApiResponse } from '~/types/ApiResponse'

async function validatedBody(
  event: H3Event
): Promise<{ key: string; url: string }> {
  const body = await readBody(event)

  if (typeof body !== 'object') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must be an object`,
    })
  }

  if (typeof body.key !== 'string') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must contain a 'key' property`,
    })
  }

  if (!/^[a-z0-9-_]{1,255}$/i.test(body.key)) {
    throw createError({
      statusCode: 422,
      statusMessage: `Key must be between 1 and 255 characters long and only contain letters, numbers, hyphens and underscores`,
    })
  }

  if (typeof body.url !== 'string') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must contain a 'url' property`,
    })
  }

  body.url = /^https?:\/\/.+$/.test(body.url) ? body.url : `https://${body.url}`

  return body
}

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<LinkWithKey>> => {
    await requireAuth(event)

    const { key, url } = await validatedBody(event)

    const link = await createLink(key, url)

    return { data: link }
  }
)
