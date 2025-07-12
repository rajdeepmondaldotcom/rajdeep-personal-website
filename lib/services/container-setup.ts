/**
 * Service Container Setup
 * Registers all services with the dependency injection container
 */

import { container, ServiceIdentifiers } from '@/lib/container'
import * as postService from './postService'
import * as authorService from './authorService'
import * as tagService from './tagService'

/**
 * Logger service interface
 */
export interface LoggerService {
  log(level: 'info' | 'warn' | 'error', message: string, data?: unknown): void
}

/**
 * Simple console logger implementation
 */
class ConsoleLogger implements LoggerService {
  log(level: 'info' | 'warn' | 'error', message: string, data?: unknown): void {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (data) {
      console[level](logMessage, data)
    } else {
      console[level](logMessage)
    }
  }
}

/**
 * Cache service interface
 */
export interface CacheService {
  get<T>(key: string): T | undefined
  set<T>(key: string, value: T, ttl?: number): void
  delete(key: string): void
  clear(): void
}

/**
 * In-memory cache implementation
 */
class InMemoryCache implements CacheService {
  private cache = new Map<string, { value: unknown; expires?: number }>()

  get<T>(key: string): T | undefined {
    const item = this.cache.get(key)
    if (!item) return undefined

    if (item.expires && Date.now() > item.expires) {
      this.cache.delete(key)
      return undefined
    }

    return item.value as T
  }

  set<T>(key: string, value: T, ttl?: number): void {
    const expires = ttl ? Date.now() + ttl * 1000 : undefined
    this.cache.set(key, { value, expires })
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}

/**
 * Initialize the service container
 */
export function initializeContainer(): void {
  // Register logger
  container.registerInstance<LoggerService>(ServiceIdentifiers.LoggerService, new ConsoleLogger())

  // Register cache
  container.registerInstance<CacheService>(ServiceIdentifiers.CacheService, new InMemoryCache())

  // Register post service functions
  container.register(ServiceIdentifiers.PostService, () => ({
    getAllPosts: postService.getAllPosts,
    getPostBySlug: postService.getPostBySlug,
    getPostsByTag: postService.getPostsByTag,
    getPostsByAuthor: postService.getPostsByAuthor,
    getPostNavigation: postService.getPostNavigation,
    getRelatedPosts: postService.getRelatedPosts,
  }))

  // Register author service functions
  container.register(ServiceIdentifiers.AuthorService, () => ({
    getAllAuthors: authorService.getAllAuthors,
    getAuthorBySlug: authorService.getAuthorBySlug,
    getDefaultAuthor: authorService.getDefaultAuthor,
    getAuthorWithPosts: authorService.getAuthorWithPosts,
    getAuthorsBySlugList: authorService.getAuthorsBySlugList,
    authorExists: authorService.authorExists,
    getAuthorDetailsForPost: authorService.getAuthorDetailsForPost,
  }))

  // Register tag service functions
  container.register(ServiceIdentifiers.TagService, () => ({
    getTagCounts: tagService.getTagCounts,
    getSortedTags: tagService.getSortedTags,
    formatTagTitle: tagService.formatTagTitle,
    getPaginatedPostsByTag: tagService.getPaginatedPostsByTag,
    getAllUniqueTags: tagService.getAllUniqueTags,
    tagExists: tagService.tagExists,
    getRelatedTags: tagService.getRelatedTags,
    getTagStatistics: tagService.getTagStatistics,
  }))
}

// Initialize on module load
initializeContainer()
