# Travel App - Next.js Travel Booking Platform

A production-ready Next.js 14 travel booking application built with TypeScript, Tailwind CSS, shadcn/ui, Prisma, and MongoDB. This app replicates the structure of travel booking sites with a customizable color theme.

## 🚀 Features

- **Next.js 14 App Router** - Latest Next.js with server components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS with custom theme variables
- **shadcn/ui** - Beautiful, accessible UI components
- **Prisma ORM** - Type-safe database access with MongoDB
- **Server Actions** - Form submissions with server-side validation
- **ISR (Incremental Static Regeneration)** - Optimized performance with revalidation
- **SEO Optimized** - Metadata and route configuration for search engines

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database (local or Atlas)
- Git (for version control)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd travel-app
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/travel-app?retryWrites=true&w=majority"

# Site Configuration
NEXT_PUBLIC_SITE_NAME="NBM Travel"
NEXT_PUBLIC_PRIMARY="#0B6E4F"
NEXT_PUBLIC_ACCENT="#F59E0B"
NEXT_PUBLIC_NEUTRAL_BG="#F7F7F8"
NEXT_PUBLIC_TEXT="#0F172A"
```

**Important:** Replace the `DATABASE_URL` with your actual MongoDB connection string.

### 3. Database Setup

Generate Prisma Client and push the schema:

```bash
npm run prisma:generate
npm run prisma:push
```

### 4. Seed the Database

Load sample data (packages, destinations):

```bash
npm run prisma:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customizing Colors

This app supports easy color customization through two methods:

### Method 1: Environment Variables (Recommended for Quick Changes)

Update your `.env` file:

```env
NEXT_PUBLIC_PRIMARY="#YOUR_PRIMARY_COLOR"     # Main brand color
NEXT_PUBLIC_ACCENT="#YOUR_ACCENT_COLOR"       # Secondary/accent color
NEXT_PUBLIC_NEUTRAL_BG="#YOUR_BACKGROUND"     # Background color
NEXT_PUBLIC_TEXT="#YOUR_TEXT_COLOR"           # Text color
```

**Note:** Environment variable changes require a server restart. The app will read these values, but the primary color theme is defined in CSS variables (see Method 2).

### Method 2: CSS Variables (Recommended for Complete Control)

Edit `app/globals.css` and update the HSL values in the `:root` selector:

```css
:root {
  /* Primary color - convert your hex to HSL */
  --primary: 164 70% 26%;  /* #0B6E4F */
  --primary-foreground: 0 0% 100%;

  /* Accent color */
  --accent: 43 96% 50%;    /* #F59E0B */
  --accent-foreground: 0 0% 100%;

  /* Background */
  --background: 240 7% 97%; /* #F7F7F8 */
  --foreground: 222 47% 11%; /* #0F172A */
}
```

**How to convert HEX to HSL:**
- Use online tools like [HEX to HSL Converter](https://www.hexcolortool.com/)
- Or use CSS color functions: `hsl(164, 70%, 26%)` = `164 70% 26%` (without commas/parens)

### Example: Changing to a Blue Theme

```css
:root {
  --primary: 221 83% 53%;     /* Blue #2563EB */
  --accent: 262 83% 58%;      /* Purple #7C3AED */
  --background: 210 40% 98%;  /* Light blue-gray */
  --foreground: 222 47% 11%;  /* Dark slate */
}
```

After changing colors, restart your dev server to see the changes.

## 📁 Project Structure

```
travel-app/
├── app/                    # Next.js App Router
│   ├── actions/           # Server actions (booking, contact)
│   ├── packages/          # Package pages
│   ├── destinations/      # Destination pages
│   ├── contact/           # Contact page
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & CSS variables
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── PackageCard.tsx
│   ├── PackageGrid.tsx
│   ├── BookingForm.tsx
│   └── ContactForm.tsx
├── lib/                   # Utilities
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Helper functions
│   └── validations.ts     # Zod schemas
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
└── public/                # Static assets
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:seed` - Seed database with sample data

## 🗄️ Database Models

### Package
- `id` (ObjectId)
- `slug` (unique string)
- `title` (string)
- `description` (string)
- `images` (string array)
- `price` (number)
- `duration` (number - days)
- `destinationId` (ObjectId)
- `highlights` (string array)
- `createdAt` (DateTime)

### Destination
- `id` (ObjectId)
- `name` (string)
- `slug` (unique string)
- `description` (string)
- `createdAt` (DateTime)

### Booking
- `id` (ObjectId)
- `packageId` (ObjectId)
- `name` (string)
- `email` (string)
- `phone` (optional string)
- `message` (optional string)
- `createdAt` (DateTime)

## 🔧 Configuration

### Adding New Packages

Packages can be added via:
1. **Prisma Studio**: `npx prisma studio`
2. **Direct database insertion** using Prisma Client
3. **Update seed script** (`prisma/seed.ts`) and re-run `npm run prisma:seed`

### Changing Site Name

Update `NEXT_PUBLIC_SITE_NAME` in `.env` or modify the default in:
- `app/layout.tsx` (metadata)
- `components/Header.tsx`
- `components/Footer.tsx`

## 📧 Email Integration (TODO)

Currently, the app logs emails to the console as stubs. To add real email functionality:

1. Install an email service (e.g., `nodemailer`, `sendgrid`, `resend`)
2. Update `app/actions/booking.ts` and `app/actions/contact.ts`
3. Add email service credentials to `.env`

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas cluster (or other hosted MongoDB)

### Steps

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel dashboard, add:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_PRIMARY`
   - `NEXT_PUBLIC_ACCENT`
   - `NEXT_PUBLIC_NEUTRAL_BG`
   - `NEXT_PUBLIC_TEXT`

4. **Deploy**
   - Vercel will automatically detect Next.js
   - On first deploy, add a build command: `npm run prisma:generate && npm run build`
   - Or add a `postinstall` script (already in package.json)

5. **Set up database**
   - Run migrations after deployment or use Vercel's deploy hooks
   - Seed via: Connect to your production DB and run `npm run prisma:seed`

### Vercel Build Settings

If needed, add to `vercel.json`:

```json
{
  "buildCommand": "npm run prisma:generate && npm run build",
  "installCommand": "npm install"
}
```

## 📝 TODO / Notes

- [ ] Replace placeholder images with actual travel photos
- [ ] Add real email service integration (currently stubbed)
- [ ] Add authentication for admin panel (optional)
- [ ] Add search/filter functionality for packages
- [ ] Add pagination for package listings
- [ ] Add image upload functionality
- [ ] Add analytics tracking
- [ ] Optimize images with Next.js Image component (already using, but add more sizes)

## 🐛 Troubleshooting

### Prisma Client not generated
```bash
npm run prisma:generate
```

### Database connection issues
- Verify `DATABASE_URL` is correct
- Check MongoDB network access (if using Atlas)
- Ensure IP is whitelisted in MongoDB Atlas

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Regenerate Prisma: `npm run prisma:generate`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.

