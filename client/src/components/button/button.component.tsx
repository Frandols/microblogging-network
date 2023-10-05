import { type ButtonHTMLAttributes, type FC } from 'react'
import styles from './button.component.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  disabled?: boolean
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary'
}

const Button: FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${
        loading || disabled ? styles.buttonDisabled : ''
      } ${styles[`button-${size}`]} ${className} ${
        styles[`button-${variant}`]
      }`}
      {...props}
    >
      {loading ? 'Loading...' : props.children}
    </button>
  )
}

export default Button
