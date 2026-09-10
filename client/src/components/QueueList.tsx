import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import type { Ticket } from '../types/domain'
import Badge from './Badge'

export interface QueueListProps {
  tickets: Ticket[]
}

// Table used by both the doctor dashboard and the admin overview (spec §7).
function QueueList({ tickets }: QueueListProps) {
  if (tickets.length === 0) {
    return <Typography color="text.secondary">No tickets yet.</Typography>
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.number}</TableCell>
              <TableCell>{ticket.patientName}</TableCell>
              <TableCell>
                <Badge status={ticket.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QueueList
