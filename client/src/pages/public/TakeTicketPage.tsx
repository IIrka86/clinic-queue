import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import type { Doctor } from '../../types/domain'

// Placeholder data until GET /api/doctors exists (CLQ-27).
const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    firstName: 'Anna',
    lastName: 'Kowalska',
    specialization: 'General Practitioner',
    room: '101',
    active: true,
  },
  {
    id: '2',
    firstName: 'Marek',
    lastName: 'Nowak',
    specialization: 'General Practitioner',
    room: '102',
    active: true,
  },
]

function TakeTicketPage() {
  const [selectedId, setSelectedId] = useState<string | 'any' | null>(null)

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Take a ticket
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Choose a doctor or let us pick the next available one.
      </Typography>
      <Stack spacing={2}>
        <Card selected={selectedId === 'any'} onClick={() => setSelectedId('any')}>
          <Typography sx={{ fontWeight: 600 }}>Any available doctor</Typography>
        </Card>
        {MOCK_DOCTORS.map((doctor) => (
          <Card
            key={doctor.id}
            selected={selectedId === doctor.id}
            onClick={() => setSelectedId(doctor.id)}
          >
            <Typography sx={{ fontWeight: 600 }}>
              {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.specialization} · Room {doctor.room}
            </Typography>
          </Card>
        ))}
      </Stack>
      <Button fullWidth disabled={!selectedId} sx={{ mt: 3 }}>
        Continue
      </Button>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Name + phone form and ticket creation come in CLQ-32, CLQ-28.
      </Typography>
    </Box>
  )
}

export default TakeTicketPage
