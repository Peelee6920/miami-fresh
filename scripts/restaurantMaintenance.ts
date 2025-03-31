import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'
import cron from 'node-cron'

const prisma = new PrismaClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function verifyAndUpdateRestaurant(restaurant: any) {
  try {
    // Verify if restaurant still exists and get updated info
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a restaurant data verifier. Verify and update restaurant information."
      }, {
        role: "user",
        content: `Verify and update this restaurant information:
          Name: ${restaurant.name}
          Address: ${restaurant.address}`
      }]
    })

    const updatedInfo = JSON.parse(completion.choices[0].message.content)

    // Update database if needed
    await prisma.restaurant.update({
      where: { id: restaurant.id },
      data: updatedInfo
    })

  } catch (error) {
    console.error(`Error updating ${restaurant.name}:`, error)
  }
}

// Run maintenance weekly
cron.schedule('0 0 * * 0', async () => {
  const restaurants = await prisma.restaurant.findMany()
  for (const restaurant of restaurants) {
    await verifyAndUpdateRestaurant(restaurant)
  }
}) 