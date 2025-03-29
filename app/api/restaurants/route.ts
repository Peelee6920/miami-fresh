import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        address: {
          contains: 'Miami',
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        indoorSeating: true,
        capacity: true,
        parking: true,
        openingHours: true,
      },
    });

    // Log the data to see what's being returned
    console.log('API Response:', restaurants);

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Error fetching restaurants' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { url } = await request.json();
    
    const image = await prisma.image.create({
      data: {
        url,
        restaurantId: params.id
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json(
      { error: 'Failed to save image' },
      { status: 500 }
    );
  }
}