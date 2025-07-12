/**
 * Common Type Definitions
 * Reusable type patterns across the application
 */

/**
 * ID type for consistent entity identification
 */
export type ID = string

/**
 * Timestamp type for consistent date handling
 */
export type Timestamp = string | Date

/**
 * Generic result type for operations that can fail
 */
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E }

/**
 * Async result type
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined

/**
 * DeepPartial type for nested partial objects
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * DeepReadonly type for immutable objects
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/**
 * Extract keys of type T that have values of type V
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

/**
 * Omit multiple keys from type
 */
export type OmitMultiple<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Make certain keys required
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Make certain keys optional
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Union to intersection type helper
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never
