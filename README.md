# Miami Fresh 🌴

A modern restaurant discovery and reservation platform for Miami's vibrant dining scene. Built with Next.js, TypeScript, and PostgreSQL.

## Features

- Restaurant search and discovery
- Real-time reservations
- Wait time tracking
- Review and rating system
- Menu management with photos
- Happy hour information
- Maps and directions integration
- User authentication
- Restaurant owner dashboard

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, HeadlessUI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **State Management**: React Query
- **Maps**: Google Maps API

## Prerequisites

- Node.js 18 or later
- PostgreSQL 17 or later
- Google Maps API key (for maps integration)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/miami_fresh"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/miami-fresh.git
   cd miami-fresh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main models:

- Users
- Restaurants
- Reservations
- Reviews
- MenuItems
- HappyHours
- WaitTimes

For detailed schema information, check `prisma/schema.prisma`.

## API Routes

- `/api/restaurants` - Restaurant management
- `/api/reservations` - Reservation handling
- `/api/reviews` - Review system
- `/api/auth/*` - Authentication endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma team for the great ORM
- All contributors and users of the platform 