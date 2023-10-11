import { randomBytes } from 'crypto'

export function generateKey(): string {
  return randomBytes(64).toString('hex')
}
