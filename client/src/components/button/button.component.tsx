import { ButtonHTMLAttributes } from 'react'
import styles from './button.component.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={`${className} ${styles.button}`} {...props} />
}

export default Button
