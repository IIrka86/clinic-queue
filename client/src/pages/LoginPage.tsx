import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as requestLogin } from '../api/login'
import { useAuth } from '../auth/AuthContext'
import type { UserRole } from '../auth/token'
import Button from '../components/Button'
import Card from '../components/Card'

const ROLE_HOME_PATH: Record<UserRole, string> = {
  ADMIN: '/admin',
  DOCTOR: '/doctor',
}

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const { token } = await requestLogin(username, password)
      const user = login(token)
      navigate(user ? ROLE_HOME_PATH[user.role] : '/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Log in
      </Typography>
      <Card>
        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            fullWidth
            required
          />
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default LoginPage
