#!/bin/bash

# Script to push travel-app to GitHub
# Run this after creating a repository on GitHub

echo "🚀 Preparing to push travel-app to GitHub..."
echo ""

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' already exists:"
    git remote get-url origin
    echo ""
    read -p "Do you want to change it? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter new repository URL: " REPO_URL
        git remote set-url origin "$REPO_URL"
    fi
else
    echo "📝 Please enter your GitHub repository URL:"
    echo "   Example: https://github.com/YOUR_USERNAME/travel-app.git"
    echo "   Or SSH: git@github.com:YOUR_USERNAME/travel-app.git"
    read -p "Repository URL: " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ Repository URL is required!"
        exit 1
    fi
    
    git remote add origin "$REPO_URL"
    echo "✅ Remote added: $REPO_URL"
fi

echo ""
echo "📋 Current branch: $(git branch --show-current)"
read -p "Rename branch to 'main'? (GitHub default, recommended) (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git branch -M main
    echo "✅ Branch renamed to 'main'"
else
    echo "ℹ️  Keeping current branch name"
fi

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin $(git branch --show-current)

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🔗 Your repository is now available at:"
    echo "   https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')"
else
    echo ""
    echo "❌ Failed to push. Please check the error above."
    echo ""
    echo "Common issues:"
    echo "1. Make sure you've created the repository on GitHub first"
    echo "2. Check your authentication (username/password or SSH key)"
    echo "3. Verify the repository URL is correct"
fi

