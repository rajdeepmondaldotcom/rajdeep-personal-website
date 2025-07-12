#!/usr/bin/env node

/**
 * Favicon Generation Script for Rajdeep's Personal Website
 *
 * This script provides instructions for generating all necessary favicon files
 * from your logo.png file using online tools or ImageMagick.
 *
 * ONLINE METHOD (Recommended):
 * 1. Go to https://realfavicongenerator.net/
 * 2. Upload your /public/static/images/logo.png file
 * 3. Configure the settings as needed
 * 4. Download the generated files
 * 5. Replace all files in /public/static/favicons/ with the new ones
 *
 * MANUAL METHOD using ImageMagick (if installed):
 * Run the following commands from your project root:
 */

console.log(`
🎨 Favicon Generation Instructions for Rajdeep's Website

Your logo is located at: /public/static/images/logo.png

📋 METHOD 1: Online Generator (Recommended)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Visit: https://realfavicongenerator.net/
2. Upload: public/static/images/logo.png
3. Configure settings:
   - iOS: Keep default or adjust
   - Android: Use blue theme (#1E90FF)
   - Windows: Use blue theme (#1E90FF)
   - Safari: Keep default
4. Generate and download
5. Extract files to: public/static/favicons/

📋 METHOD 2: ImageMagick Commands
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you have ImageMagick installed, run these commands:

cd public/static/favicons

# Generate different sizes
magick ../images/logo.png -resize 16x16 favicon-16x16.png
magick ../images/logo.png -resize 32x32 favicon-32x32.png
magick ../images/logo.png -resize 96x96 android-chrome-96x96.png
magick ../images/logo.png -resize 192x192 android-chrome-192x192.png
magick ../images/logo.png -resize 512x512 android-chrome-512x512.png
magick ../images/logo.png -resize 180x180 apple-touch-icon.png
magick ../images/logo.png -resize 150x150 mstile-150x150.png

# Generate ICO file (favicon.ico)
magick ../images/logo.png -resize 16x16 temp16.png
magick ../images/logo.png -resize 32x32 temp32.png
magick ../images/logo.png -resize 48x48 temp48.png
magick temp16.png temp32.png temp48.png favicon.ico
rm temp16.png temp32.png temp48.png

# Generate SVG for Safari
magick ../images/logo.png -resize 512x512 -background none safari-pinned-tab.svg

📋 FILES TO GENERATE:
━━━━━━━━━━━━━━━━━━━━━━━

✅ favicon.ico (16x16, 32x32, 48x48 combined)
✅ favicon-16x16.png
✅ favicon-32x32.png
✅ android-chrome-96x96.png
✅ android-chrome-192x192.png
✅ android-chrome-512x512.png
✅ apple-touch-icon.png (180x180)
✅ mstile-150x150.png
✅ safari-pinned-tab.svg

🎯 Your logo will then be used everywhere:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Website header/navigation
• Browser tabs (favicon)
• Bookmarks
• Home screen icons (mobile)
• Windows tiles
• Safari pinned tabs
• Project cards
• Social media previews

After generating the files, run:
git add . && git commit -m "feat: update all logos and favicons"
`)

// Optional: If the user wants to run ImageMagick commands directly
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

function _generateFavicons() {
  const logoPath = path.join(__dirname, '../public/static/images/logo.png')
  const faviconDir = path.join(__dirname, '../public/static/favicons')

  if (!fs.existsSync(logoPath)) {
    console.error('❌ Logo file not found at:', logoPath)
    return
  }

  try {
    console.log('\n🔄 Attempting to generate favicons with ImageMagick...\n')

    // Change to favicon directory
    process.chdir(faviconDir)

    const commands = [
      'magick ../images/logo.png -resize 16x16 favicon-16x16.png',
      'magick ../images/logo.png -resize 32x32 favicon-32x32.png',
      'magick ../images/logo.png -resize 96x96 android-chrome-96x96.png',
      'magick ../images/logo.png -resize 192x192 android-chrome-192x192.png',
      'magick ../images/logo.png -resize 512x512 android-chrome-512x512.png',
      'magick ../images/logo.png -resize 180x180 apple-touch-icon.png',
      'magick ../images/logo.png -resize 150x150 mstile-150x150.png',
    ]

    commands.forEach((cmd) => {
      execSync(cmd, { stdio: 'inherit' })
      console.log('✅', cmd)
    })

    // Generate favicon.ico
    execSync('magick ../images/logo.png -resize 16x16 temp16.png', { stdio: 'inherit' })
    execSync('magick ../images/logo.png -resize 32x32 temp32.png', { stdio: 'inherit' })
    execSync('magick ../images/logo.png -resize 48x48 temp48.png', { stdio: 'inherit' })
    execSync('magick temp16.png temp32.png temp48.png favicon.ico', { stdio: 'inherit' })
    execSync('rm temp16.png temp32.png temp48.png', { stdio: 'inherit' })
    console.log('✅ Generated favicon.ico')

    console.log('\n🎉 All favicons generated successfully!')
    console.log("📝 Don't forget to commit the changes:")
    console.log('git add . && git commit -m "feat: update all logos and favicons"')
  } catch {
    console.log('\n⚠️  ImageMagick not found or error occurred.')
    console.log('Please use the online method instead: https://realfavicongenerator.net/')
  }
}

// Uncomment the line below if you want to automatically try ImageMagick
// generateFavicons()
