import rss from './rss.mjs'

/**
 * A post-build script that executes asynchronous tasks after the main build process.
 *
 * This function is intended to be run after the site has been successfully built.
 * It currently calls the `rss` function to generate the RSS feed.
 *
 * @returns {Promise<void>} A promise that resolves when all post-build tasks are complete.
 */
async function postbuild() {
  await rss()
}

postbuild()
