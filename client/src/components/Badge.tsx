import Chip from '@mui/material/Chip'
import type { TicketStatus } from '../types/domain'

// Spec §7 calls for green ("you're up soon"), yellow ("waiting"), gray ("done").
// NO_SHOW isn't covered there — mapped to red since it's the one status staff
// need to notice, not just a variant of "done".
const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; color: 'warning' | 'success' | 'default' | 'error' }
> = {
  WAITING: { label: 'Waiting', color: 'warning' },
  CALLED: { label: 'Called', color: 'success' },
  IN_PROGRESS: { label: 'In progress', color: 'success' },
  DONE: { label: 'Done', color: 'default' },
  NO_SHOW: { label: 'No-show', color: 'error' },
}

export interface BadgeProps {
  status: TicketStatus
}

// Named "Badge" per spec §7; backed by MUI's Chip (a status pill), not MUI's
// own Badge component (a small counter overlay) — different concept, same name.
function Badge({ status }: BadgeProps) {
  const { label, color } = STATUS_CONFIG[status]
  return <Chip label={label} color={color} size="small" />
}

export default Badge
