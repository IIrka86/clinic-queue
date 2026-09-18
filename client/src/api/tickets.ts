import type { SelectionType, TicketStatus } from '../types/domain'
import { apiGet, apiPost } from './client'

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

export interface TicketStatusResponse {
  id: string
  number: number
  doctorId: string
  status: TicketStatus
  queuePosition: number
}

export function createTicket(request: CreateTicketRequest): Promise<CreateTicketResponse> {
  return apiPost<CreateTicketResponse>('/api/tickets', request)
}

export function getTicketStatus(id: string): Promise<TicketStatusResponse> {
  return apiGet<TicketStatusResponse>(`/api/tickets/${id}`)
}
