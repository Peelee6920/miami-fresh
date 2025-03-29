import { z } from 'zod'

// User validation schemas
export const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
})

// Restaurant validation schemas
export const restaurantSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000).optional(),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(100),
  state: z.string().length(2),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  phone: z.string().regex(/^\+?1?\d{9,15}$/),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  cuisine: z.array(z.string()),
  priceRange: z.enum(['INEXPENSIVE', 'MODERATE', 'EXPENSIVE', 'VERY_EXPENSIVE']),
  features: z.array(z.enum([
    'BAR',
    'LIVE_MUSIC',
    'OUTDOOR_SEATING',
    'PRIVATE_ROOM',
    'WHEELCHAIR_ACCESSIBLE',
    'WIFI',
    'TV',
    'PARKING'
  ])),
  parking: z.array(z.enum([
    'STREET',
    'VALET',
    'PRIVATE_LOT',
    'GARAGE'
  ])),
})

// Reservation validation schema
export const reservationSchema = z.object({
  date: z.string().datetime(),
  time: z.string().datetime(),
  partySize: z.number().int().min(1).max(20),
  notes: z.string().max(500).optional(),
  restaurantId: z.string().cuid(),
})

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000).optional(),
  images: z.array(z.string().url()).optional(),
  restaurantId: z.string().cuid(),
})

// Helper function to validate data
export async function validateData<T>(
  schema: z.ZodType<T>,
  data: unknown
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const validData = await schema.parseAsync(data)
    return { success: true, data: validData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: 'Validation failed' }
  }
} 