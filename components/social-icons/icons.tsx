import { SVGProps } from 'react'

// Icons taken from: https://simpleicons.org/
// To add a new icon, add a new function here and add it to components in social-icons/index.tsx

/**
 * Renders the Facebook icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Facebook SVG icon.
 */
export function Facebook(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
    </svg>
  )
}

/**
 * Renders the Github icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Github SVG icon.
 */
export function Github(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
    </svg>
  )
}

/**
 * Renders the Linkedin icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Linkedin SVG icon.
 */
export function Linkedin(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Linkedin</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
    </svg>
  )
}

/**
 * Renders the Mail icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Mail SVG icon.
 */
export function Mail(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...svgProps}>
      <title>Mail</title>
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
  )
}

/**
 * Renders the Twitter icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Twitter SVG icon.
 */
export function Twitter(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Twitter</title>
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
    </svg>
  )
}

/**
 * Renders the X (formerly Twitter) icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The X SVG icon.
 */
export function X(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

/**
 * Renders the Youtube icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Youtube SVG icon.
 */
export function Youtube(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Youtube</title>
      <path d="M10,15 L10,5 L16,10 L10,15 Z M18.17,4.41 C17.96,3.67 17.33,3.04 16.59,2.83 C15.16,2.5 10,2.5 10,2.5 C10,2.5 4.84,2.5 3.41,2.83 C2.67,3.04 2.04,3.67 1.83,4.41 C1.5,5.84 1.5,10 1.5,10 C1.5,10 1.5,14.16 1.83,15.59 C2.04,16.33 2.67,16.96 3.41,17.17 C4.84,17.5 10,17.5 10,17.5 C10,17.5 15.16,17.5 16.59,17.17 C17.33,16.96 17.96,16.33 18.17,15.59 C18.5,14.16 18.5,10 18.5,10 C18.5,10 18.5,5.84 18.17,4.41 Z" />
    </svg>
  )
}

/**
 * Renders the Mastodon icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Mastodon SVG icon.
 */
export function Mastodon(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Mastodon</title>
      <path d="M21.25,10.12c0-2.3-1.12-3.48-1.12-3.48c-0.3-0.23-0.56-0.35-0.79-0.38c-0.45-0.07-0.93,0.03-1.39,0.28c-0.48,0.26-0.89,0.61-1.19,1.01c-0.29,0.4-0.46,0.85-0.49,1.32c-0.03,0.48-0.08,1.25-0.08,2.33c0,0.53,0,1.06,0,1.58c0,2.58-0.58,3.9-1.74,4.35c-1.15,0.45-2.67,0.27-4.48-0.81l-0.21-0.12l-0.13,0.1c-1.1,0.89-2.31,1.34-3.62,1.34c-0.5,0-0.93-0.12-1.3-0.35c-0.37-0.23-0.66-0.55-0.85-0.94c-0.19-0.39-0.29-0.85-0.29-1.36c0-0.5,0.09-1,0.28-1.48c0.19-0.49,0.47-0.91,0.84-1.28c0.37-0.37,0.8-0.65,1.28-0.85c0.49-0.2,1.01-0.29,1.54-0.29l0.99,0c0.39,0,0.73-0.13,1.03-0.4c0.3-0.27,0.44-0.63,0.44-1.07V3.53c0-0.27-0.06-0.52-0.17-0.74c-0.12-0.22-0.28-0.41-0.49-0.56c-0.41-0.3-0.92-0.45-1.52-0.45l-0.75,0c-0.44,0-0.86,0.07-1.25,0.23c-0.39,0.15-0.76,0.36-1.1,0.63L3.71,3.47L3.5,3.34C3.06,3.01,2.5,2.8,1.8,2.72c-0.71-0.08-1.42,0.13-2.03,0.6C-0.84,3.75-1.2,4.38-1.2,5.1c0,0.51,0.17,0.99,0.5,1.44c0.33,0.45,0.77,0.83,1.3,1.14c-0.33,0.46-0.56,0.95-0.67,1.47c-0.12,0.52-0.18,1.06-0.18,1.62c0,1.16,0.4,2.15,1.21,2.96c0.81,0.81,1.8,1.22,2.97,1.22c1.2,0,2.3-0.49,3.31-1.49l0.2-0.19l0.18,0.15c2.3,1.91,4.55,2.6,6.77,2.06c2.22-0.54,3.53-2.08,3.95-4.64c0.09-0.55,0.14-1.12,0.14-1.7c0-1.24-0.05-2.21-0.14-2.92C21.34,10.66,21.25,10.12,21.25,10.12z M18.96,15.86c-0.35,2.13-1.42,3.33-3.23,3.78c-1.81,0.45-3.69,0.04-5.63-1.2l-0.2-0.13L9.77,18.4c-0.89,0.73-1.8,1.1-2.73,1.1c-0.85,0-1.58-0.32-2.18-0.96c-0.6-0.64-0.9-1.45-0.9-2.42c0-0.49,0.06-0.96,0.17-1.42c0.12-0.46,0.32-0.88,0.6-1.26l0.23-0.31L4.5,13.06c-0.42,0.17-0.8,0.25-1.14,0.25l-0.99,0c-0.45,0-0.86-0.08-1.23-0.24c-0.37-0.16-0.69-0.38-0.94-0.66c-0.26-0.28-0.44-0.61-0.55-0.99c-0.11-0.38-0.16-0.78-0.16-1.18c0-0.49,0.14-0.9,0.41-1.24s0.63-0.58,1.08-0.71C2.39,4.28,3,4.2,3.57,4.29c0.57,0.09,1.06,0.28,1.47,0.57l0.18,0.13l0.14-0.13c0.31-0.24,0.64-0.43,0.98-0.56s0.7-0.2,1.07-0.2l0.75,0c0.47,0,0.85,0.1,1.14,0.29c0.29,0.19,0.44,0.43,0.44,0.71v7.14c0,0.64-0.23,1.18-0.69,1.63c-0.46,0.45-1.03,0.68-1.7,0.68l-0.99,0c-0.33,0-0.65,0.07-0.95,0.2c-0.3,0.13-0.56,0.32-0.79,0.56c-0.45,0.48-0.68,1.07-0.68,1.75c0,0.43,0.08,0.82,0.25,1.15c0.17,0.33,0.4,0.6,0.7,0.81c0.3,0.21,0.64,0.31,1.02,0.31c0.91,0,1.83-0.44,2.75-1.32l0.13-0.13l0.14,0.1c1.55,1.06,2.83,1.46,3.84,1.21c0.99-0.25,1.54-1.22,1.65-2.91c0.09-0.62,0.14-1.48,0.14-2.58c0-0.53,0-1.06-0.02-1.59c-0.03-0.4-0.15-0.8-0.36-1.15c-0.21-0.35-0.5-0.65-0.88-0.89c-0.38-0.24-0.8-0.42-1.26-0.54c0.23-0.28,0.43-0.62,0.58-1.01c0.15-0.39,0.23-0.82,0.23-1.26c0-0.53-0.08-0.98-0.23-1.35c-0.15-0.37-0.36-0.68-0.62-0.93c0.41-0.21,0.8-0.33,1.15-0.38c0.36-0.04,0.7,0.01,1.02,0.13c0.32,0.12,0.6,0.3,0.83,0.53c0,0,0.98,1.09,0.98,3.13C18.96,10.66,18.96,15.86,18.96,15.86z" />
    </svg>
  )
}

/**
 * Renders the Instagram icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Instagram SVG icon.
 */
export function Instagram(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Instagram</title>
      <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 16 6 A 1 1 0 0 0 15 7 A 1 1 0 0 0 16 8 A 1 1 0 0 0 17 7 A 1 1 0 0 0 16 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" />
    </svg>
  )
}

/**
 * Renders the Medium icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Medium SVG icon.
 */
export function Medium(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Medium</title>
      <path d="M5.4 6.34h2.72v8.32h-2.72V6.34zm5.5.9h2.46c.16 0 .3.02.42.05.13.04.24.1.33.19.09.09.16.2.22.33.05.13.08.28.08.45v6.5c0 .19-.03.35-.08.49s-.13.26-.22.36a.6.6 0 0 1-.33.19c-.12.03-.26.05-.42.05h-2.46V7.24zm8.38-1.57h2.86c.17 0 .32.02.47.06a.88.88 0 0 1 .4.2.9.9 0 0 1 .25.32c.07.13.1.27.1.4v2.73c0 .1-.01.2-.04.29-.03.09-.07.17-.12.24l-2.6 3.65h2.82v1.44H16.6V13l2.5-3.52V7.7h-2.22v-.93z" />
    </svg>
  )
}

/**
 * Renders the Bluesky icon as an SVG element.
 *
 * @param {SVGProps<SVGSVGElement>} svgProps - Standard SVG properties.
 * @returns {JSX.Element} The Bluesky SVG icon.
 */
export function Bluesky(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <title>Bluesky</title>
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565C.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479c.815 2.736 3.713 3.66 6.383 3.364q.204-.03.415-.056q-.207.033-.415.056c-3.912.58-7.387 2.005-2.83 7.078c5.013 5.19 6.87-1.113 7.823-4.308c.953 3.195 2.05 9.271 7.733 4.308c4.267-4.308 1.172-6.498-2.74-7.078a9 9 0 0 1-.415-.056q.21.026.415.056c2.67.297 5.568-.628 6.383-3.364c.246-.828.624-5.79.624-6.478c0-.69-.139-1.861-.902-2.206c-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8" />
    </svg>
  )
}
