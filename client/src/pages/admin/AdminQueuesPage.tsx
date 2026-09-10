import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import QueueList from '../../components/QueueList'
import type { Ticket } from '../../types/domain'

// Placeholder data until GET /api/admin/queues exists (CLQ-43).
const MOCK_QUEUES: { doctorName: string; tickets: Ticket[] }[] = [
  {
    doctorName: 'Dr. Anna Kowalska',
    tickets: [
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
    ],
  },
  {
    doctorName: 'Dr. Marek Nowak',
    tickets: [
      {
        id: '3',
        number: 5,
        doctorId: '2',
        patientName: 'Piotr Zieliński',
        patientPhone: '',
        selectionType: 'ANY',
        status: 'DONE',
        createdAt: '',
        calledAt: null,
      },
    ],
  },
]

function AdminQueuesPage() {
  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        All queues
      </Typography>
      <Stack spacing={4}>
        {MOCK_QUEUES.map((queue) => (
          <Box key={queue.doctorName}>
            <Typography variant="h6" gutterBottom>
              {queue.doctorName}
            </Typography>
            <QueueList tickets={queue.tickets} />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default AdminQueuesPage
