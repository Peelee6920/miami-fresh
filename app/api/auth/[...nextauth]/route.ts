import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menuItems: true
      }
    });

    const formattedRestaurants = restaurants.map(restaurant => ({
      ...restaurant,
      openingHours: JSON.parse(restaurant.openingHours as string)
    }));

    return NextResponse.json(formattedRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}