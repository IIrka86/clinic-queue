import type { Doctor } from '../types/domain'
import { apiGet } from './client'

export function getDoctors(): Promise<Doctor[]> {
  return apiGet<Doctor[]>('/api/doctors')
}
