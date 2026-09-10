import MuiCard from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import type { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
}

// Used for the doctor-selection list (spec §7) — selectable when onClick is passed.
function Card({ children, selected = false, onClick }: CardProps) {
  const content = <CardContent>{children}</CardContent>

  return (
    <MuiCard
      variant="outlined"
      sx={{
        borderColor: selected ? 'primary.main' : undefined,
        borderWidth: selected ? 2 : 1,
      }}
    >
      {onClick ? <CardActionArea onClick={onClick}>{content}</CardActionArea> : content}
    </MuiCard>
  )
}

export default Card
