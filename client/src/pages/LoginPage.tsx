import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '../components/Button'
import Card from '../components/Card'

function LoginPage() {
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Log in
      </Typography>
      <Card>
        <Stack spacing={2}>
          <TextField label="Username" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button fullWidth>Log in</Button>
        </Stack>
      </Card>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Wired up to POST /api/auth/login in CLQ-21, CLQ-23.
      </Typography>
    </Box>
  )
}

export default LoginPage
