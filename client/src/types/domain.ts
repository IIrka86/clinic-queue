export type TicketStatus = 'WAITING' | 'CALLED' | 'IN_PROGRESS' | 'DONE' | 'NO_SHOW'

export type SelectionType = 'SPECIFIC' | 'ANY'

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialization: string
  room: string
  active: boolean
}

export interface Ticket {
  id: string
  number: number
  doctorId: string
  patientName: string
  patientPhone: string
  selectionType: SelectionType
  status: TicketStatus
  createdAt: string
  calledAt: string | null
}
