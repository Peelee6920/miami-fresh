# Miami Fresh 🌴

A modern web application for discovering and booking restaurants in Miami. Built with Next.js, TypeScript, and Prisma.

## Features

- Restaurant search with advanced filters
- Detailed restaurant profiles
- Reservation system
- Review and rating system
- User authentication
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- NextAuth.js

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables in `.env`

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/miami_fresh?schema=public"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

## License

MIT 