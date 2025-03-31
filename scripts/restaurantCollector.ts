import { PrismaClient, ParkingOptions } from '@prisma/client'
import OpenAI from 'openai'

const prisma = new PrismaClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function collectWynwoodRestaurants() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a Miami restaurant expert. Return data in valid JSON format that matches the Prisma schema exactly."
      }, {
        role: "user",
        content: `Provide detailed information about 5 popular restaurants in Wynwood, Miami. Include:
          - name
          - description (detailed but concise)
          - address (must be real Wynwood addresses)
          - city (Miami)
          - state (FL)
          - zipCode
          - phone (real phone numbers)
          - indoorSeating (boolean)
          - capacity (realistic number)
          - parking (array containing only: STREET, VALET, PRIVATE_LOT, GARAGE)
          - openingHours (JSON string with hours for each day)
          
          Focus on trendy, well-known Wynwood establishments like KYU, 1-800-Lucky, Zak the Baker, etc.`
      }]
    })

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error('No content received from OpenAI')
    }

    const restaurantData = JSON.parse(content)
    
    // Clear existing restaurants first
    await prisma.restaurant.deleteMany()
    
    // Save new restaurants
    for (const restaurant of restaurantData) {
      await prisma.restaurant.create({
        data: {
          name: restaurant.name,
          description: restaurant.description,
          address: restaurant.address,
          city: restaurant.city || 'Miami',
          state: restaurant.state || 'FL',
          zipCode: restaurant.zipCode,
          phone: restaurant.phone,
          indoorSeating: Boolean(restaurant.indoorSeating),
          capacity: Number(restaurant.capacity),
          parking: restaurant.parking as ParkingOptions[],
          openingHours: typeof restaurant.openingHours === 'string' 
            ? restaurant.openingHours 
            : JSON.stringify(restaurant.openingHours)
        }
      })
      console.log(`Added restaurant: ${restaurant.name}`)
    }

    console.log('Successfully collected and saved Wynwood restaurant data')
  } catch (error) {
    console.error('Error collecting restaurant data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the collector
collectWynwoodRestaurants() 