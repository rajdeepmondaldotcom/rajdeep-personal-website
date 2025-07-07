interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Personal Website',
    description: `A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS. 
    Features include a blog, project showcase, and dark mode support. Deployed with automatic CI/CD pipeline.`,
    imgSrc: '/static/images/logo.png',
    href: 'https://github.com/rajdeepmondaldotcom/rajdeep-personal-website',
  },
  // Add more projects here as you build them
  // {
  //   title: 'Your Next Project',
  //   description: `Description of your next amazing project...`,
  //   imgSrc: '/static/images/project-image.jpg',
  //   href: 'https://github.com/rajdeepmondaldotcom/your-project',
  // },
]

export default projectsData
