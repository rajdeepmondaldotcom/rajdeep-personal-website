'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  ref?: React.Ref<HTMLInputElement>
}

function Input({ className, type, label, error, icon, ref, ...props }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setHasValue(!!e.target.value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value)
    props.onChange?.(e)
  }

  return (
    <div className="relative">
      {label && (
        <motion.label
          className={cn(
            'pointer-events-none absolute left-3 transition-all duration-200',
            'text-gray-500 dark:text-gray-400',
            icon && 'left-10',
            (isFocused || hasValue) && '-top-2 left-2 bg-white px-1 text-xs dark:bg-gray-900'
          )}
          animate={{
            top: isFocused || hasValue ? -8 : 16,
            fontSize: isFocused || hasValue ? '0.75rem' : '0.875rem',
            color: isFocused ? '#6366f1' : undefined,
          }}
        >
          {label}
        </motion.label>
      )}

      {icon && <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">{icon}</div>}

      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border bg-white px-3 py-2 text-base',
          'transition-all duration-200 placeholder:text-gray-400',
          'focus:ring-primary-600/10 focus:border-primary-600 focus:ring-4 focus:outline-none',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
          'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
          'dark:focus:border-primary-400 dark:focus:ring-primary-400/10',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          icon && 'pl-10',
          label && 'pt-4',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
          !error && 'border-gray-300',
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Input }
