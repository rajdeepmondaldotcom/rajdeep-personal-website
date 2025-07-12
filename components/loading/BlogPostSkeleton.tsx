import { Skeleton, SkeletonText } from '@/components/ui/skeleton'

/**
 * Blog Post Skeleton Component
 * Loading state for individual blog post items
 */
export const BlogPostSkeleton = () => {
  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base leading-6 font-medium">
              <Skeleton className="h-5 w-32" />
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl leading-8 font-bold tracking-tight">
                  <Skeleton className="h-8 w-3/4" />
                </h3>
                <div className="mt-2 flex flex-wrap">
                  <Skeleton className="mr-3 h-6 w-16" />
                  <Skeleton className="mr-3 h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              <div>
                <SkeletonText lines={3} />
              </div>
            </div>
            <div className="text-base leading-6 font-medium">
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

/**
 * Blog List Skeleton Component
 * Loading state for blog post lists
 */
export const BlogListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <Skeleton className="h-12 w-48" />
        <div className="relative max-w-lg">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <ul>
        {Array.from({ length: count }).map((_, index) => (
          <BlogPostSkeleton key={index} />
        ))}
      </ul>
    </div>
  )
}
