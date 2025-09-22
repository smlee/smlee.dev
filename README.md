This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Live Site

Visit the production site here:

https://smlee.dev

## Analytics

This project uses a modular analytics system with Google Analytics 4 (GA4).

### Configuration

To enable analytics, set the following environment variable in your `.env.local` file:

```
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Your GA4 Measurement ID
```

### Setting up Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/) and sign in
2. Create a new property (GA4)
3. Set up a web data stream for your site
4. Copy the Measurement ID (starts with G-)
5. Add the Measurement ID to your environment variables

### Usage

Analytics are automatically initialized in the root layout and will track page views by default.

To track custom events in your components:

```tsx
'use client';
import { useAnalytics } from '@/lib/analytics/hooks';

export default function MyComponent() {
  const { trackEvent, trackOutboundLink } = useAnalytics();
  
  const handleClick = () => {
    trackEvent({
      name: 'button_click',
      properties: {
        button: 'signup',
        location: 'hero'
      }
    });
  };
  
  return (
    <div>
      <button onClick={handleClick}>Sign Up</button>
      <a 
        href="https://example.com" 
        onClick={() => trackOutboundLink('https://example.com', 'Example Link')}
      >
        External Link
      </a>
    </div>
  );
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
