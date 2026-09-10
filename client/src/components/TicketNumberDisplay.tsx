import Typography from '@mui/material/Typography'

export interface TicketNumberDisplayProps {
  number: number
}

// The focal point of the tracking page (spec §7) — large by design.
function TicketNumberDisplay({ number }: TicketNumberDisplayProps) {
  return (
    <Typography
      component="div"
      sx={{ fontSize: { xs: '4rem', sm: '6rem' }, fontWeight: 700, lineHeight: 1 }}
    >
      {number}
    </Typography>
  )
}

export default TicketNumberDisplay
