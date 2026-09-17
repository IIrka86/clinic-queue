import { API_BASE_URL } from '../config/env'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed with status ${response.status}`, response.status)
  }

  return (await response.json()) as T
}

export function apiGet<T>(path: string, options: RequestInit = {}): Promise<T> {
  return apiFetch<T>(path, { ...options, method: 'GET' })
}

export function apiPost<T>(path: string, body?: unknown, options: RequestInit = {}): Promise<T> {
  return apiFetch<T>(path, {
    ...options,
    method: 'POST',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}
