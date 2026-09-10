import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import Badge from '../../components/Badge'
import TicketNumberDisplay from '../../components/TicketNumberDisplay'

function TicketTrackingPage() {
  const { ticketId } = useParams()

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
      <Typography color="text.secondary">Ticket {ticketId}</Typography>
      <TicketNumberDisplay number={14} />
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', my: 2 }}>
        <Badge status="WAITING" />
      </Stack>
      <Typography color="text.secondary">
        Live status and queue position will update automatically (CLQ-33, CLQ-37, CLQ-38).
      </Typography>
    </Box>
  )
}

export default TicketTrackingPage
