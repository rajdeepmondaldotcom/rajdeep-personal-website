import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names using clsx and tailwind-merge.
 * This utility ensures proper handling of Tailwind CSS class conflicts.
 *
 * @param {...ClassValue[]} inputs - Class names to merge (can be strings, objects, arrays, etc.)
 * @returns {string} The merged class name string with conflicts resolved
 *
 * @example
 * mergeClassNames('px-2 py-1', 'px-4', { 'text-red-500': true })
 * // Returns: 'py-1 px-4 text-red-500'
 */
export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Alias for convenience
export const cn = mergeClassNames
