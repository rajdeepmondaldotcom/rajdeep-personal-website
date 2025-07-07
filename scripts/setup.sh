#!/bin/bash

# Rajdeep Mondal Personal Website - Development Environment Setup Script
# This script helps set up the development environment for the personal website

echo "🚀 Setting up Rajdeep Mondal's Personal Website Development Environment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if ! node -e "process.exit(process.version.slice(1).split('.').map(x=>+x).some((v,i)=>v<+'$REQUIRED_VERSION'.split('.')[i])||0)"; then
    echo "❌ Node.js version $NODE_VERSION is installed, but version $REQUIRED_VERSION or higher is required."
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION is compatible"

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Installing Yarn..."
    npm install -g yarn
fi

echo "✅ Yarn is available"

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Set up pre-commit hooks
echo "🔧 Setting up pre-commit hooks..."
yarn prepare

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Local environment variables for development
# Copy this file and update the values as needed

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BASE_PATH=

# Analytics (Optional - Add your IDs)
# NEXT_UMAMI_ID=your-umami-id-here
# NEXT_PUBLIC_GOOGLE_ANALYTICS=your-google-analytics-id

# Comments (Optional - Giscus configuration)
# NEXT_PUBLIC_GISCUS_REPO=rajdeepmondaldotcom/rajdeep-personal-website
# NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repository-id
# NEXT_PUBLIC_GISCUS_CATEGORY=General
# NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id

# Newsletter (Optional)
# BUTTONDOWN_API_KEY=your-buttondown-api-key

# Development
NODE_ENV=development
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local file already exists"
fi

echo ""
echo "🎉 Setup complete! Your development environment is ready."
echo ""
echo "📋 Next steps:"
echo "   1. Run 'yarn dev' to start the development server"
echo "   2. Open http://localhost:3000 in your browser"
echo "   3. Start customizing your personal website!"
echo ""
echo "📚 Useful commands:"
echo "   yarn dev          - Start development server"
echo "   yarn build        - Build for production"
echo "   yarn lint         - Run linter"
echo "   yarn format       - Format code"
echo ""
echo "💡 Tip: Check the README.md for more detailed information" 