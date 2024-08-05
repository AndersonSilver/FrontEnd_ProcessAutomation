// @/components/ui/Select.tsx
import React from 'react'
import styles from './styles.module.scss'

interface SelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={styles.option}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
