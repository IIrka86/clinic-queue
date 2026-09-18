import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { getDoctors } from '../../api/doctors'
import Button from '../../components/Button'
import Card from '../../components/Card'
import type { Doctor } from '../../types/domain'

function TakeTicketPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | 'any' | null>(null)

  useEffect(() => {
    let cancelled = false

    getDoctors()
      .then((data) => {
        if (!cancelled) setDoctors(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load the doctor list. Please try again later.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Take a ticket
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Choose a doctor or let us pick the next available one.
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          <Card selected={selectedId === 'any'} onClick={() => setSelectedId('any')}>
            <Typography sx={{ fontWeight: 600 }}>Any available doctor</Typography>
          </Card>
          {doctors.map((doctor) => (
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
      )}
      <Button fullWidth disabled={!selectedId} sx={{ mt: 3 }}>
        Continue
      </Button>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Name + phone form comes in CLQ-32.
      </Typography>
    </Box>
  )
}

export default TakeTicketPage
