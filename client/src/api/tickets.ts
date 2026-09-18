import type { SelectionType } from '../types/domain'
import { apiPost } from './client'

export interface CreateTicketRequest {
  doctorId?: string
  selectionType: SelectionType
  patientName: string
  patientPhone: string
}

export interface CreateTicketResponse {
  id: string
  number: number
}

export function createTicket(request: CreateTicketRequest): Promise<CreateTicketResponse> {
  return apiPost<CreateTicketResponse>('/api/tickets', request)
}
