# Stripe Setup Guide

## Quick Setup

### 1. Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in
3. Navigate to **Developers → API keys**
4. Copy your **Secret key** (starts with `sk_test_` for test mode)

### 2. Add to `.env` File

```env
STRIPE_SECRET_KEY="sk_test_51..." # Your complete secret key
STRIPE_WEBHOOK_SECRET="whsec_..." # For webhooks (see below)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Verify Your Key

Your Stripe secret key should:

- ✅ Start with `sk_test_` (test mode) or `sk_live_` (production)
- ✅ Be around 100+ characters long
- ✅ Not have any spaces or line breaks
- ✅ Be copied completely (no truncation)

### Common Issues

#### ❌ "Invalid API Key provided"

**Possible causes:**

1. Key is incomplete or truncated
   - Solution: Copy the full key from Stripe Dashboard
2. Key has extra spaces or characters
   - Solution: Remove any quotes, spaces, or line breaks around the key
3. Using wrong key type
   - Solution: Use the **Secret key** (not Publishable key)
   - Secret keys start with `sk_test_` or `sk_live_`
   - Publishable keys start with `pk_test_` or `pk_live_`

4. Environment variable not loaded
   - Solution: Restart your dev server after adding to `.env`
   - Make sure `.env` file is in the project root
   - Check the file is named exactly `.env` (not `.env.local` unless you prefer)

#### ✅ Correct `.env` Format

```env
# ✅ Correct - No quotes needed, but they're fine too
STRIPE_SECRET_KEY=sk_test_51EXAMPLEKEY1234567890abcdefghijklmnopqrstuvwxyz

# ✅ Also correct - With quotes
STRIPE_SECRET_KEY="sk_test_51EXAMPLEKEY1234567890abcdefghijklmnopqrstuvwxyz"

# ❌ Wrong - Incomplete key
STRIPE_SECRET_KEY="sk_test_51..."

# ❌ Wrong - Using publishable key instead
STRIPE_SECRET_KEY="pk_test_51..."

# ❌ Wrong - Extra spaces
STRIPE_SECRET_KEY=" sk_test_51... "
```

### Testing Your Setup

1. **Check if key is loaded:**

   ```bash
   # In your terminal, verify the key is set
   echo $STRIPE_SECRET_KEY  # Should show your key (if using system env)
   ```

2. **Test with Stripe CLI:**

   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe

   # Login
   stripe login

   # Test your key
   stripe balance retrieve
   ```

3. **Test in the app:**
   - Try creating a booking
   - Check the console for any Stripe errors
   - If you see "Invalid API Key", double-check your `.env` file

### Getting Test Keys

1. **Test Mode Keys** (for development):
   - Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/test/apikeys)
   - Toggle "Test mode" (should be ON)
   - Copy the **Secret key**

2. **Live Keys** (for production):
   - Toggle "Test mode" OFF
   - Copy the **Secret key** (starts with `sk_live_`)
   - ⚠️ **Never commit live keys to git!**

### Webhook Setup (Optional for Local Testing)

For local development, use Stripe CLI:

```bash
# Install Stripe CLI (if not installed)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Start forwarding webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook secret from output
# It starts with whsec_...
# Add to .env as STRIPE_WEBHOOK_SECRET
```

### Production Webhook Setup

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your production URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Testing Payments

Use Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- Use any future expiry date, any 3-digit CVC, any ZIP

### Still Having Issues?

1. **Double-check your `.env` file:**
   - File is in project root
   - Named exactly `.env` (not `.env.example` or `.env.txt`)
   - Key is complete and correct
   - No extra spaces or characters

2. **Restart your dev server:**

   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```

3. **Verify key in Stripe Dashboard:**
   - Go to [API Keys](https://dashboard.stripe.com/apikeys)
   - Make sure you're in the correct mode (Test/Live)
   - Click "Reveal test key" to see the full key
   - Copy it again if needed

4. **Check server logs:**
   - Look for "⚠️ STRIPE_SECRET_KEY is not set" warning
   - Check for any error messages related to Stripe initialization

5. **Contact Support:**
   - If key is definitely correct but still not working
   - Check Stripe status: https://status.stripe.com
   - Contact Stripe support through dashboard
