'use client'

import Image from './Image'
import AdaptiveLink from './Link'
import { motion } from 'framer-motion'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

const Card = ({ title, description, imgSrc, href }: CardProps) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl"
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {/* Gradient background effect */}
    <div className="from-primary-500/5 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 p-1 backdrop-blur-sm transition-all duration-300 hover:border-gray-300/50 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-900/80 dark:hover:border-gray-600/50">
      <div className={`${imgSrc && 'h-full'} overflow-hidden rounded-xl bg-white dark:bg-gray-900`}>
        {imgSrc &&
          (href ? (
            <AdaptiveLink href={href} aria-label={`Link to ${title}`}>
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  alt={title}
                  src={imgSrc}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  width={544}
                  height={272}
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </AdaptiveLink>
          ) : (
            <div className="relative aspect-[2/1] overflow-hidden">
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                width={544}
                height={272}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        <div className="space-y-3 p-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {href ? (
              <AdaptiveLink
                href={href}
                aria-label={`Link to ${title}`}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <span className="group-hover:from-primary-600 dark:group-hover:from-primary-400 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent transition-all duration-300 group-hover:to-purple-600 dark:from-gray-100 dark:to-gray-300 dark:group-hover:to-purple-400">
                  {title}
                </span>
              </AdaptiveLink>
            ) : (
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
                {title}
              </span>
            )}
          </h2>
          <p className="prose line-clamp-3 max-w-none text-gray-600 dark:text-gray-300">
            {description}
          </p>
          {href && (
            <AdaptiveLink
              href={href}
              aria-label={`Link to ${title}`}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 group/link inline-flex items-center gap-2 font-medium transition-all duration-200"
            >
              Learn more
              <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                →
              </span>
            </AdaptiveLink>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

export default Card
