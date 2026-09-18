import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { createTicket } from '../../api/tickets'
import Button from '../../components/Button'
import Card from '../../components/Card'
import type { SelectionType } from '../../types/domain'

interface TicketSelectionState {
  selectionType: SelectionType
  doctorId?: string
}

function PatientDetailsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const selection = location.state as TicketSelectionState | null

  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!selection) {
    return <Navigate to="/" replace />
  }

  const { selectionType, doctorId } = selection

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const ticket = await createTicket({
        doctorId,
        selectionType,
        patientName,
        patientPhone,
      })
      navigate(`/tickets/${ticket.id}`, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the ticket. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Your details
      </Typography>
      <Card>
        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Phone number"
            value={patientPhone}
            onChange={(event) => setPatientPhone(event.target.value)}
            fullWidth
            required
          />
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Getting your ticket…' : 'Get my ticket'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default PatientDetailsPage
