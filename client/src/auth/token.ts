export type UserRole = 'DOCTOR' | 'ADMIN'

export interface AuthUser {
  username: string
  role: UserRole
}

interface TokenClaims {
  sub: string
  role: UserRole
  exp: number
}

const TOKEN_STORAGE_KEY = 'clinic-queue.authToken'

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

// JWT uses base64url (- and _ instead of + and /, no padding) — plain atob() can't decode it directly.
function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  return atob(padded)
}

// Reads the token's payload without verifying its signature — verification happens server-side
// on every request; this is only used to know who's "probably" logged in for UI purposes.
export function decodeToken(token: string): AuthUser | null {
  const payloadSegment = token.split('.')[1]
  if (!payloadSegment) {
    return null
  }

  try {
    const claims = JSON.parse(base64UrlDecode(payloadSegment)) as TokenClaims
    if (claims.exp * 1000 < Date.now()) {
      return null
    }
    return { username: claims.sub, role: claims.role }
  } catch {
    return null
  }
}
