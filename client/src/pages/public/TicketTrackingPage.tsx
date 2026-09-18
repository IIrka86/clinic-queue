import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { TicketStatusResponse } from '../../api/tickets'
import { getTicketStatus } from '../../api/tickets'
import Badge from '../../components/Badge'
import TicketNumberDisplay from '../../components/TicketNumberDisplay'

function TicketTrackingPage() {
  const { ticketId } = useParams()
  const [ticket, setTicket] = useState<TicketStatusResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!ticketId) return

    let cancelled = false

    getTicketStatus(ticketId)
      .then((data) => {
        if (!cancelled) setTicket(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not find this ticket.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [ticketId])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !ticket) {
    return (
      <Box sx={{ maxWidth: 480, mx: 'auto', p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
        <Typography color="error">{error ?? 'Could not find this ticket.'}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
      <Typography color="text.secondary">Your ticket</Typography>
      <TicketNumberDisplay number={ticket.number} />
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', my: 2 }}>
        <Badge status={ticket.status} />
      </Stack>
      {ticket.status === 'WAITING' && (
        <Typography color="text.secondary">
          {ticket.queuePosition === 0
            ? "You're next!"
            : `${ticket.queuePosition} patient(s) ahead of you`}
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Live updates come in CLQ-37, CLQ-38.
      </Typography>
    </Box>
  )
}

export default TicketTrackingPage
