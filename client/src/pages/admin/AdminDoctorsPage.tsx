import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '../../components/Button'
import Card from '../../components/Card'
import type { Doctor } from '../../types/domain'

// Placeholder data until GET /api/admin/doctors exists (CLQ-42).
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
    active: false,
  },
]

function AdminDoctorsPage() {
  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 0 }}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 2,
        }}
      >
        <Typography variant="h4">Doctors</Typography>
        <Button>Add doctor</Button>
      </Stack>
      <Stack spacing={2}>
        {MOCK_DOCTORS.map((doctor) => (
          <Card key={doctor.id}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                rowGap: 1,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.specialization} · Room {doctor.room}
                </Typography>
              </Box>
              <Chip
                label={doctor.active ? 'Active' : 'Inactive'}
                color={doctor.active ? 'success' : 'default'}
                size="small"
              />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default AdminDoctorsPage
