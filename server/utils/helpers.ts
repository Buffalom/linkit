import { randomBytes } from 'crypto'

export function generateKey(): string {
  return randomBytes(64).toString('hex')
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}
