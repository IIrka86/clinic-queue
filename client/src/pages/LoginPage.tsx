import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import { login } from '../api/login'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const { token } = await login(username, password)
      // Token storage and role-based redirect are handled in CLQ-24, CLQ-25.
      console.log('Logged in, token:', token)
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
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Token storage and role-based redirect come in CLQ-24, CLQ-25.
      </Typography>
    </Box>
  )
}

export default LoginPage
