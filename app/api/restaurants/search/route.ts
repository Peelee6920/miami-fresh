import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PriceRange, VenueFeatures, ParkingOptions } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search parameters
    const query = searchParams.get('query');
    const cuisine = searchParams.get('cuisine');
    const priceRange = searchParams.get('priceRange') as PriceRange;
    const features = searchParams.getAll('features') as VenueFeatures[];
    const parking = searchParams.getAll('parking') as ParkingOptions[];
    const minCapacity = parseInt(searchParams.get('minCapacity') || '0');
    const hasOutdoor = searchParams.get('hasOutdoor') === 'true';
    const hasBar = searchParams.get('hasBar') === 'true';
    
    // Build the where clause for the query
    const where: any = {
      AND: [],
    };

    // Text search in name, description, and cuisine
    if (query) {
      where.AND.push({
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { cuisine: { has: query } },
        ],
      });
    }

    // Filter by cuisine
    if (cuisine) {
      where.AND.push({
        cuisine: {
          has: cuisine,
        },
      });
    }

    // Filter by price range
    if (priceRange) {
      where.AND.push({
        priceRange,
      });
    }

    // Filter by features
    if (features && features.length > 0) {
      where.AND.push({
        features: {
          hasEvery: features,
        },
      });
    }

    // Filter by parking options
    if (parking && parking.length > 0) {
      where.AND.push({
        parking: {
          hasEvery: parking,
        },
      });
    }

    // Filter by minimum capacity
    if (minCapacity > 0) {
      where.AND.push({
        capacity: {
          gte: minCapacity,
        },
      });
    }

    // Filter by outdoor seating
    if (hasOutdoor) {
      where.AND.push({
        outdoorSeating: {
          gt: 0,
        },
      });
    }

    // Filter by bar seating
    if (hasBar) {
      where.AND.push({
        barSeating: {
          gt: 0,
        },
      });
    }

    // If no AND conditions were added, remove the AND array
    if (where.AND.length === 0) {
      delete where.AND;
    }

    // Fetch restaurants with their related data
    const restaurants = await prisma.restaurant.findMany({
      where,
      include: {
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          take: 3, // Get only the 3 most recent reviews
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    // Calculate average rating for each restaurant
    const restaurantsWithRating = restaurants.map(restaurant => {
      const totalRating = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = restaurant.reviews.length > 0 
        ? totalRating / restaurant.reviews.length 
        : 0;

      return {
        ...restaurant,
        averageRating: parseFloat(averageRating.toFixed(1)),
      };
    });

    return NextResponse.json(restaurantsWithRating);
  } catch (error) {
    console.error('Error in restaurant search:', error);
    return NextResponse.json(
      { error: 'Failed to search restaurants' },
      { status: 500 }
    );
  }
} 