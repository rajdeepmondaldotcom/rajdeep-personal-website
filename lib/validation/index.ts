/**
 * Validation System
 * Provides comprehensive validation utilities and patterns
 */

import { Result } from '@/lib/types/common'

/**
 * Validation rule interface
 */
export interface ValidationRule<T> {
  validate(value: T): Result<T>
  message: string
}

/**
 * Validation error with details
 */
export interface ValidationError {
  field: string
  message: string
  code: string
  value?: unknown
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * Base validator class
 */
export abstract class Validator<T> {
  protected rules: Array<ValidationRule<unknown>> = []

  /**
   * Add validation rule
   */
  addRule(rule: ValidationRule<unknown>): this {
    this.rules.push(rule)
    return this
  }

  /**
   * Validate value
   */
  abstract validate(value: T): ValidationResult
}

/**
 * Field validator for object properties
 */
export class FieldValidator<T> extends Validator<T> {
  private fieldRules = new Map<keyof T, Array<ValidationRule<unknown>>>()

  /**
   * Add rule for specific field
   */
  field<K extends keyof T>(field: K, rule: ValidationRule<T[K]>): this {
    const rules = this.fieldRules.get(field) || []
    rules.push(rule as ValidationRule<unknown>)
    this.fieldRules.set(field, rules)
    return this
  }

  /**
   * Validate object
   */
  validate(value: T): ValidationResult {
    const errors: ValidationError[] = []

    // Validate each field
    for (const [field, rules] of this.fieldRules.entries()) {
      const fieldValue = value[field]

      for (const rule of rules) {
        const result = rule.validate(fieldValue)
        if (!result.success) {
          errors.push({
            field: String(field),
            message: rule.message,
            code: 'VALIDATION_ERROR',
            value: fieldValue,
          })
        }
      }
    }

    // Apply general rules
    for (const rule of this.rules) {
      const result = rule.validate(value)
      if (!result.success) {
        errors.push({
          field: 'root',
          message: rule.message,
          code: 'VALIDATION_ERROR',
          value,
        })
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}

/**
 * Common validation rules
 */
export class Rules {
  /**
   * Required field
   */
  static required<T>(message = 'This field is required'): ValidationRule<T> {
    return {
      validate: (value) => {
        const isValid =
          value !== null &&
          value !== undefined &&
          (typeof value !== 'string' || value.trim() !== '')

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message) }
      },
      message,
    }
  }

  /**
   * String length validation
   */
  static stringLength(min?: number, max?: number, message?: string): ValidationRule<string> {
    const defaultMessage =
      min && max
        ? `Must be between ${min} and ${max} characters`
        : min
          ? `Must be at least ${min} characters`
          : `Must be at most ${max} characters`

    return {
      validate: (value) => {
        const length = value?.length || 0
        const isValid = (!min || length >= min) && (!max || length <= max)

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message || defaultMessage) }
      },
      message: message || defaultMessage,
    }
  }

  /**
   * Email validation
   */
  static email(message = 'Invalid email address'): ValidationRule<string> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return {
      validate: (value) => {
        const isValid = emailRegex.test(value)

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message) }
      },
      message,
    }
  }

  /**
   * Pattern validation
   */
  static pattern(pattern: RegExp, message = 'Invalid format'): ValidationRule<string> {
    return {
      validate: (value) => {
        const isValid = pattern.test(value)

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message) }
      },
      message,
    }
  }

  /**
   * Number range validation
   */
  static numberRange(min?: number, max?: number, message?: string): ValidationRule<number> {
    const defaultMessage =
      min !== undefined && max !== undefined
        ? `Must be between ${min} and ${max}`
        : min !== undefined
          ? `Must be at least ${min}`
          : `Must be at most ${max}`

    return {
      validate: (value) => {
        const isValid = (min === undefined || value >= min) && (max === undefined || value <= max)

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message || defaultMessage) }
      },
      message: message || defaultMessage,
    }
  }

  /**
   * Array length validation
   */
  static arrayLength<T>(min?: number, max?: number, message?: string): ValidationRule<T[]> {
    const defaultMessage =
      min && max
        ? `Must contain between ${min} and ${max} items`
        : min
          ? `Must contain at least ${min} items`
          : `Must contain at most ${max} items`

    return {
      validate: (value) => {
        const length = value?.length || 0
        const isValid = (!min || length >= min) && (!max || length <= max)

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message || defaultMessage) }
      },
      message: message || defaultMessage,
    }
  }

  /**
   * Custom validation
   */
  static custom<T>(validator: (value: T) => boolean, message: string): ValidationRule<T> {
    return {
      validate: (value) => {
        const isValid = validator(value)

        return isValid
          ? { success: true, data: value }
          : { success: false, error: new Error(message) }
      },
      message,
    }
  }

  /**
   * URL validation
   */
  static url(message = 'Invalid URL'): ValidationRule<string> {
    return {
      validate: (value) => {
        try {
          new URL(value)
          return { success: true, data: value }
        } catch {
          return { success: false, error: new Error(message) }
        }
      },
      message,
    }
  }

  /**
   * Date validation
   */
  static date(options?: {
    min?: Date
    max?: Date
    message?: string
  }): ValidationRule<Date | string> {
    const { min, max, message } = options || {}
    const defaultMessage = message || 'Invalid date'

    return {
      validate: (value) => {
        const date = value instanceof Date ? value : new Date(value)
        const isValidDate = !isNaN(date.getTime())

        if (!isValidDate) {
          return { success: false, error: new Error(defaultMessage) }
        }

        if (min && date < min) {
          return { success: false, error: new Error(`Date must be after ${min.toISOString()}`) }
        }

        if (max && date > max) {
          return { success: false, error: new Error(`Date must be before ${max.toISOString()}`) }
        }

        return { success: true, data: value }
      },
      message: defaultMessage,
    }
  }
}

/**
 * Schema validator for complex objects
 */
export class SchemaValidator {
  /**
   * Create validator from schema
   */
  static create<T extends Record<string, unknown>>(schema: {
    [K in keyof T]: ValidationRule<T[K]> | Array<ValidationRule<T[K]>>
  }): FieldValidator<T> {
    const validator = new FieldValidator<T>()

    for (const [field, rules] of Object.entries(schema)) {
      const ruleArray = Array.isArray(rules) ? rules : [rules]

      for (const rule of ruleArray) {
        validator.field(field as keyof T, rule as ValidationRule<T[keyof T]>)
      }
    }

    return validator
  }
}

/**
 * Validation helper functions
 */
export const validate = {
  /**
   * Validate single value
   */
  value<T>(value: T, rules: ValidationRule<T>[]): ValidationResult {
    const errors: ValidationError[] = []

    for (const rule of rules) {
      const result = rule.validate(value)
      if (!result.success) {
        errors.push({
          field: 'value',
          message: rule.message,
          code: 'VALIDATION_ERROR',
          value,
        })
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  },

  /**
   * Validate object against schema
   */
  object<T extends Record<string, unknown>>(
    obj: T,
    schema: {
      [K in keyof T]: ValidationRule<T[K]> | Array<ValidationRule<T[K]>>
    }
  ): ValidationResult {
    const validator = SchemaValidator.create(schema)
    return validator.validate(obj)
  },

  /**
   * Combine multiple validation results
   */
  combine(...results: ValidationResult[]): ValidationResult {
    const errors = results.flatMap((result) => result.errors)

    return {
      isValid: errors.length === 0,
      errors,
    }
  },
}
