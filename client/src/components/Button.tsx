import MuiButton from '@mui/material/Button'
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {
  variant?: 'primary' | 'secondary'
}

// Large tap targets by default — front desk staff may work from a tablet (spec §7).
function Button({ variant = 'primary', size = 'large', ...props }: ButtonProps) {
  return variant === 'primary' ? (
    <MuiButton variant="contained" color="primary" size={size} {...props} />
  ) : (
    <MuiButton variant="outlined" color="secondary" size={size} {...props} />
  )
}

export default Button
