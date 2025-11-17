# Push to GitHub - Quick Guide

## Option 1: Manual (Recommended)

### Step 1: Create Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Repository name: `travel-app` (or any name you prefer)
4. Description: `Production-ready Next.js travel booking app with Stripe payments`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

### Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/travel-app.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/travel-app.git

# Rename branch to main (if needed, GitHub uses 'main' by default)
git branch -M main

# Push all commits
git push -u origin main
```

## Option 2: Using GitHub CLI (if installed)

```bash
# Install GitHub CLI first (if not installed)
brew install gh

# Login to GitHub
gh auth login

# Create and push repository
gh repo create travel-app --public --source=. --remote=origin --push
```

## Important Notes

✅ **Before pushing, make sure:**
- `.env` file is NOT committed (it's in `.gitignore` ✓)
- All sensitive data (API keys, database URLs) are in `.env` only
- `env.example.txt` is committed (for reference)

✅ **After pushing:**
- Never commit `.env` files
- Use environment variables in your deployment platform
- Keep your Stripe keys and database URLs secret

## Verification

After pushing, check:
1. Go to `https://github.com/YOUR_USERNAME/travel-app`
2. Verify all files are uploaded
3. Check that `.env` is NOT in the repository
4. README.md should be visible

