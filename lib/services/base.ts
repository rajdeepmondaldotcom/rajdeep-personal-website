/**
 * Base Service Classes
 * Provides consistent patterns for service implementations
 */

import { Result } from '@/lib/types/common'
import { container, ServiceIdentifiers } from '@/lib/container'
import { LoggerService, CacheService } from './container-setup'

/**
 * Base service with common functionality
 */
export abstract class BaseService {
  protected logger: LoggerService
  protected cache: CacheService

  constructor() {
    this.logger = container.get<LoggerService>(ServiceIdentifiers.LoggerService)
    this.cache = container.get<CacheService>(ServiceIdentifiers.CacheService)
  }

  /**
   * Execute operation with logging
   */
  protected async executeWithLogging<T>(
    operation: string,
    fn: () => Promise<T>
  ): Promise<Result<T>> {
    const startTime = Date.now()

    try {
      this.logger.log('info', `Starting operation: ${operation}`)
      const result = await fn()

      const duration = Date.now() - startTime
      this.logger.log('info', `Completed operation: ${operation}`, { duration })

      return { success: true, data: result }
    } catch (error) {
      const duration = Date.now() - startTime
      this.logger.log('error', `Failed operation: ${operation}`, { error, duration })

      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      }
    }
  }

  /**
   * Execute operation with caching
   */
  protected async executeWithCache<T>(
    cacheKey: string,
    ttl: number,
    fn: () => Promise<T>
  ): Promise<T> {
    const cached = this.cache.get<T>(cacheKey)
    if (cached !== undefined) {
      this.logger.log('info', `Cache hit: ${cacheKey}`)
      return cached
    }

    this.logger.log('info', `Cache miss: ${cacheKey}`)
    const result = await fn()

    this.cache.set(cacheKey, result, ttl)
    return result
  }

  /**
   * Invalidate cache entries by pattern
   */
  protected invalidateCacheByPattern(pattern: string): void {
    // This is a simplified implementation
    // In a real app, you'd want a cache that supports pattern-based invalidation
    this.logger.log('info', `Invalidating cache by pattern: ${pattern}`)
    // For now, just clear all cache
    this.cache.clear()
  }
}

/**
 * Repository pattern base class
 */
export abstract class BaseRepository<T> {
  protected abstract entityName: string

  /**
   * Find all entities
   */
  abstract findAll(): Promise<T[]>

  /**
   * Find entity by ID
   */
  abstract findById(id: string): Promise<T | null>

  /**
   * Save entity
   */
  abstract save(entity: T): Promise<T>

  /**
   * Delete entity
   */
  abstract delete(id: string): Promise<boolean>

  /**
   * Count entities
   */
  abstract count(): Promise<number>
}

/**
 * Query builder interface
 */
export interface QueryBuilder<T> {
  where(
    field: keyof T,
    operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'not in',
    value: unknown
  ): this
  orderBy(field: keyof T, direction: 'asc' | 'desc'): this
  limit(count: number): this
  offset(count: number): this
  execute(): Promise<T[]>
}

/**
 * Unit of Work pattern
 */
export class UnitOfWork {
  private operations: Array<() => Promise<void>> = []
  private completed = false

  /**
   * Add operation to unit of work
   */
  addOperation(operation: () => Promise<void>): void {
    if (this.completed) {
      throw new Error('Cannot add operations to completed unit of work')
    }
    this.operations.push(operation)
  }

  /**
   * Commit all operations
   */
  async commit(): Promise<void> {
    if (this.completed) {
      throw new Error('Unit of work already completed')
    }

    try {
      for (const operation of this.operations) {
        await operation()
      }
      this.completed = true
    } catch (error) {
      await this.rollback()
      throw error
    }
  }

  /**
   * Rollback operations
   */
  async rollback(): Promise<void> {
    // In a real implementation, this would undo the operations
    // For now, just mark as completed to prevent further operations
    this.completed = true
  }
}

/**
 * Specification pattern for complex queries
 */
export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean
  and(other: Specification<T>): Specification<T>
  or(other: Specification<T>): Specification<T>
  not(): Specification<T>
}

/**
 * Base specification implementation
 */
export abstract class BaseSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other)
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other)
  }

  not(): Specification<T> {
    return new NotSpecification(this)
  }
}

/**
 * Composite specifications
 */
class AndSpecification<T> extends BaseSpecification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super()
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate)
  }
}

class OrSpecification<T> extends BaseSpecification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super()
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
  }
}

class NotSpecification<T> extends BaseSpecification<T> {
  constructor(private spec: Specification<T>) {
    super()
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate)
  }
}
