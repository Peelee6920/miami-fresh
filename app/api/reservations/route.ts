import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/options'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const restaurantId = searchParams.get('restaurantId')

    if (!userId && !restaurantId) {
      return NextResponse.json(
        { error: 'Either userId or restaurantId is required' },
        { status: 400 }
      )
    }

    const where = {
      ...(userId && { userId }),
      ...(restaurantId && { restaurantId }),
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        restaurant: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
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

    // Check if the requested time slot is available
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        restaurantId: json.restaurantId,
        date: json.date,
        time: json.time,
        NOT: {
          status: 'CANCELLED',
        },
      },
    })

    if (existingReservation) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.create({
      data: {
        date: json.date,
        time: json.time,
        partySize: json.partySize,
        notes: json.notes,
        userId: session.user.id,
        restaurantId: json.restaurantId,
      },
      include: {
        restaurant: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(reservation)
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation' },
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
    const { id, status } = json

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!reservation || reservation.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to update this reservation' },
        { status: 403 }
      )
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    )
  }
} 