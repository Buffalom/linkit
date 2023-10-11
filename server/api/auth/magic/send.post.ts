import type { H3Event } from 'h3'

async function validatedBody(event: H3Event): Promise<{ email: string }> {
  const body = await readBody(event)

  if (typeof body !== 'object') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must be an object`,
    })
  }

  if (typeof body.email !== 'string') {
    throw createError({
      statusCode: 422,
      statusMessage: `Request body must contain a 'email' property`,
    })
  }

  return body
}

export default defineEventHandler(async (event: H3Event) => {
  const { email } = await validatedBody(event)

  const magicToken = await createMagicToken(email)

  await sendMagicTokenLink(email, magicToken)

  return { ok: true }
})
