/**
 * Dependency Injection Container
 * Provides inversion of control for better testability and modularity
 */

/**
 * Service identifier type
 */
export type ServiceIdentifier<T> = symbol | string | { new (...args: unknown[]): T }

/**
 * Service factory function
 */
export type ServiceFactory<T> = (container: Container) => T

/**
 * Service registration options
 */
export interface ServiceOptions {
  singleton?: boolean
  tags?: string[]
}

/**
 * Service descriptor
 */
interface ServiceDescriptor<T> {
  factory: ServiceFactory<T>
  options: ServiceOptions
  instance?: T
}

/**
 * Simple dependency injection container
 */
export class Container {
  private services = new Map<unknown, ServiceDescriptor<unknown>>()
  private aliases = new Map<string | symbol, unknown>()

  /**
   * Register a service
   */
  register<T>(
    identifier: ServiceIdentifier<T>,
    factory: ServiceFactory<T>,
    options: ServiceOptions = {}
  ): this {
    this.services.set(identifier, {
      factory,
      options: { singleton: true, ...options },
    })
    return this
  }

  /**
   * Register a service instance
   */
  registerInstance<T>(identifier: ServiceIdentifier<T>, instance: T): this {
    this.services.set(identifier, {
      factory: () => instance,
      options: { singleton: true },
      instance,
    })
    return this
  }

  /**
   * Create an alias for a service
   */
  alias(alias: string | symbol, identifier: ServiceIdentifier<unknown>): this {
    this.aliases.set(alias, identifier)
    return this
  }

  /**
   * Get a service from the container
   */
  get<T>(identifier: ServiceIdentifier<T> | string | symbol): T {
    const actualIdentifier = this.aliases.get(identifier as string | symbol) ?? identifier
    const descriptor = this.services.get(actualIdentifier) as ServiceDescriptor<T> | undefined

    if (!descriptor) {
      throw new Error(`Service not found: ${String(identifier)}`)
    }

    if (descriptor.options.singleton) {
      if (!descriptor.instance) {
        descriptor.instance = descriptor.factory(this)
      }
      return descriptor.instance
    }

    return descriptor.factory(this)
  }

  /**
   * Check if a service is registered
   */
  has(identifier: ServiceIdentifier<unknown> | string | symbol): boolean {
    const actualIdentifier = this.aliases.get(identifier as string | symbol) ?? identifier
    return this.services.has(actualIdentifier)
  }

  /**
   * Get services by tag
   */
  getByTag<T>(tag: string): T[] {
    const results: T[] = []

    for (const [identifier, descriptor] of this.services) {
      if (descriptor.options.tags?.includes(tag)) {
        results.push(this.get(identifier as ServiceIdentifier<T>))
      }
    }

    return results
  }

  /**
   * Create a child container
   */
  createChild(): Container {
    const child = new Container()
    child.services = new Map(this.services)
    child.aliases = new Map(this.aliases)
    return child
  }

  /**
   * Clear all services
   */
  clear(): void {
    this.services.clear()
    this.aliases.clear()
  }
}

/**
 * Default container instance
 */
export const container = new Container()

/**
 * Service identifiers
 */
export const ServiceIdentifiers = {
  PostService: Symbol('PostService'),
  AuthorService: Symbol('AuthorService'),
  TagService: Symbol('TagService'),
  CacheService: Symbol('CacheService'),
  LoggerService: Symbol('LoggerService'),
} as const
