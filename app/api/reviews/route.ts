import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/options'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('restaurantId')
    const userId = searchParams.get('userId')

    if (!restaurantId && !userId) {
      return NextResponse.json(
        { error: 'Either restaurantId or userId is required' },
        { status: 400 }
      )
    }

    const where = {
      ...(restaurantId && { restaurantId }),
      ...(userId && { userId }),
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        restaurant: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const json = await request.json()

    // Check if user has already reviewed this restaurant
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        restaurantId: json.restaurantId,
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this restaurant' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        rating: json.rating,
        comment: json.comment,
        images: json.images || [],
        userId: session.user.id,
        restaurantId: json.restaurantId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        restaurant: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const json = await request.json()
    const { id, rating, comment, images } = json

    const review = await prisma.review.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!review || review.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to update this review' },
        { status: 403 }
      )
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        rating,
        comment,
        images: images || [],
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Review ID is required' },
      { status: 400 }
    )
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!review || review.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this review' },
        { status: 403 }
      )
    }

    await prisma.review.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
} 