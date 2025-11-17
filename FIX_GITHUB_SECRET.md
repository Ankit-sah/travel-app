# Fix GitHub Secret Detection Issue

GitHub detected example Stripe keys in the documentation history. Here are two solutions:

## ✅ Solution 1: Allow on GitHub (Easiest - Recommended)

Since these are **example keys only** (not real secrets), you can allow GitHub to accept them:

1. **Click the link GitHub provided in the error:**
   ```
   https://github.com/Ankit-sah/travel-app/security/secret-scanning/unblock-secret/35bIXSsqTmosKT0U68Hon1pbqxf
   ```

2. **Or manually:**
   - Go to: https://github.com/Ankit-sah/travel-app/security/secret-scanning
   - Find the blocked secret
   - Click "Allow this secret" (since it's just example documentation)

3. **Then push again:**
   ```bash
   git push -u origin main
   ```

## ✅ Solution 2: Remove from Git History (More Secure)

If you want to completely remove the example keys from history:

### Option A: Use BFG Repo-Cleaner (Recommended)

```bash
# Install BFG
brew install bfg

# Download latest JAR
# Visit: https://rtyley.github.io/bfg-repo-cleaner/

# Replace the problematic strings
echo 'sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz==>sk_test_51EXAMPLEKEY1234567890abcdefghijklmnopqrstuvwxyz' > replacements.txt

# Run BFG
java -jar bfg.jar --replace-text replacements.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (⚠️ rewrites history)
git push --force-with-lease origin main
```

### Option B: Use git filter-repo

```bash
# Install git-filter-repo
brew install git-filter-repo

# Replace in all commits
git filter-repo --replace-text <(echo "sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz==>sk_test_51EXAMPLEKEY1234567890abcdefghijklmnopqrstuvwxyz")

# Force push
git push --force-with-lease origin main
```

## ✅ Solution 3: Squash and Rebase (Simple)

If you haven't pushed yet or can force push:

```bash
# Reset to before the problematic commits
git reset --soft HEAD~3

# Re-commit with the fixed file
git commit -m "docs: Add comprehensive Stripe setup guide with safe examples"

# Force push
git push --force-with-lease origin main
```

## ⚠️ Important Notes

- **The keys in documentation are FAKE** - they're just examples
- **Your real keys in `.env` are safe** - they're in `.gitignore` and not committed
- **Solution 1 is fine** for documentation examples, but Solution 2 is more secure

## Recommendation

Since these are just **example keys in documentation** (not real secrets), **Solution 1 is the quickest**. Your actual Stripe keys are safely in your local `.env` file which is never committed.

After allowing, just push:
```bash
git push -u origin main
```

