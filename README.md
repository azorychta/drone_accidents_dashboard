# Drone Accidents Dashboard

A comprehensive, fast, and cost-effective dashboard for visualizing drone accident data across the United States.

## Features

- **Interactive Filters**: Filter by aircraft type, airspace class, law enforcement involvement, airport proximity, and date range
- **Multiple Visualizations**:
  - Pie charts for aircraft type, airspace class, and severity distribution
  - Histograms for temporal trends, state distribution, and severity analysis
  - Interactive heat map showing incident locations across the US
- **Real-time Statistics**: Summary cards showing total incidents, law enforcement cases, airport proximity, and fatal incidents
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 16** - React framework with App Router for optimal performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Lightweight charting library
- **Leaflet** - Open-source mapping library (free, no API key required)
- **OpenStreetMap** - Free map tiles

## Performance & Cost

### Free Tier Options:
- **Vercel** (Recommended): Free hosting with excellent performance
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Global CDN
  - Serverless functions included
  
- **Netlify**: Alternative free hosting
  - 100GB bandwidth/month
  - Similar features to Vercel

### Database Options (when scaling):
- **Supabase** (PostgreSQL): Free tier with 500MB database, 2GB bandwidth
- **PlanetScale** (MySQL): Free tier with 5GB storage, 1 billion reads/month
- **Firebase Firestore**: Free tier with 1GB storage, 50K reads/day

### Current Setup:
- Uses in-memory data (sample data included)
- Can be easily upgraded to database-backed API
- All visualizations are client-side rendered for speed

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended - Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify (Alternative - Free)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

## Data Structure

The dashboard expects data in the following format:

```typescript
interface DroneIncident {
  id: string;
  date: string; // ISO date format
  location: {
    city: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  aircraftType: 'commercial' | 'general_aviation' | 'rotorcraft' | 'other';
  airspace: 'A' | 'B' | 'C' | 'D' | 'E' | 'G' | 'restricted' | 'prohibited' | 'unknown';
  airport?: {
    name: string;
    code: string;
    distance: number; // in miles
  };
  lawEnforcementInvolved: boolean;
  severity: 'fatal' | 'serious' | 'minor' | 'none';
  description?: string;
}
```

## Upgrading to Database

To connect to a database:

1. Update `/app/api/incidents/route.ts` to fetch from your database
2. Update `/lib/data.ts` or remove it if using API only
3. Add environment variables for database connection
4. Consider adding caching (Redis, Upstash) for better performance

## Performance Optimizations

- Client-side filtering and aggregation (fast for < 10K records)
- React useMemo for expensive computations
- Next.js automatic code splitting
- Leaflet map tiles cached by browser
- Static generation where possible

## Future Enhancements

- Real-time data updates
- Export functionality (CSV, PDF)
- Advanced analytics and predictions
- User authentication for private data
- Custom date range presets
- Incident detail modal
- Search functionality

## License

MIT
