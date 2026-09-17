import { ApiError, apiPost } from './client'

export interface LoginResponse {
  token: string
}

export class InvalidCredentialsError extends Error {}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    return await apiPost<LoginResponse>('/api/auth/login', { username, password })
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      throw new InvalidCredentialsError('Invalid username or password')
    }
    throw err
  }
}
