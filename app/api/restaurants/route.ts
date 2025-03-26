import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
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
          take: 3,
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
    })

    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const restaurant = await prisma.restaurant.create({
      data: {
        name: json.name,
        description: json.description || null,
        address: json.address,
        city: json.city,
        state: json.state,
        zipCode: json.zipCode,
        phone: json.phone,
        email: json.email || null,
        website: json.website || null,
        cuisine: Array.isArray(json.cuisine) ? json.cuisine : [],
        priceRange: json.priceRange || 'MODERATE',
        latitude: json.latitude || null,
        longitude: json.longitude || null,
        openingHours: json.openingHours || {},
        capacity: json.capacity || 0,
        indoorSeating: json.indoorSeating || false,
      },
    })

    return NextResponse.json(restaurant)
  } catch (error) {
    console.error('Error creating restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to create restaurant' },
      { status: 500 }
    )
  }
} 