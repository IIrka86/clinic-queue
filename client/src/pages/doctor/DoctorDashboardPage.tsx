import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '../../components/Button'
import QueueList from '../../components/QueueList'
import type { Ticket } from '../../types/domain'

// Placeholder data until GET /api/doctor/queue exists (CLQ-39).
const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    number: 12,
    doctorId: '1',
    patientName: 'Jan Kowalski',
    patientPhone: '',
    selectionType: 'SPECIFIC',
    status: 'CALLED',
    createdAt: '',
    calledAt: '',
  },
  {
    id: '2',
    number: 13,
    doctorId: '1',
    patientName: 'Ewa Wiśniewska',
    patientPhone: '',
    selectionType: 'ANY',
    status: 'WAITING',
    createdAt: '',
    calledAt: null,
  },
  {
    id: '3',
    number: 14,
    doctorId: '1',
    patientName: 'Piotr Zieliński',
    patientPhone: '',
    selectionType: 'ANY',
    status: 'WAITING',
    createdAt: '',
    calledAt: null,
  },
]

function DoctorDashboardPage() {
  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', p: 3 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
      >
        <Typography variant="h4">Today's queue</Typography>
        <Button>Call next</Button>
      </Stack>
      <QueueList tickets={MOCK_TICKETS} />
    </Box>
  )
}

export default DoctorDashboardPage
