import { PrismaClient, ParkingOptions } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  
  // Create KYU restaurant
  const kyu = await prisma.restaurant.create({
    data: {
      name: "KYU",
      description: "Modern Asian cuisine featuring wood-fired dishes and creative cocktails in an industrial-chic space.",
      address: "517 NW 26th St, Miami, FL 33127",
      indoorSeating: true,
      capacity: 145,
      parking: [ParkingOptions.STREET, ParkingOptions.VALET, ParkingOptions.PRIVATE_LOT],
      openingHours: JSON.stringify({
        monday: "11:30 AM - 11:00 PM",
        tuesday: "11:30 AM - 11:00 PM",
        wednesday: "11:30 AM - 11:00 PM",
        thursday: "11:30 AM - 11:00 PM",
        friday: "11:30 AM - 12:00 AM",
        saturday: "11:30 AM - 12:00 AM",
        sunday: "11:30 AM - 11:00 PM"
      }),
      menuItems: {
        create: [
          {
            name: "Korean Fried Chicken",
            description: "Crispy double-fried chicken with red chili butter sauce and braised spinach",
            price: 28.00,
            category: "Main"
          },
          {
            name: "Roasted Cauliflower",
            description: "Wood-fired cauliflower with goat cheese and shishito-herb vinaigrette",
            price: 18.00,
            category: "Appetizer"
          },
          {
            name: "Duck Breast Burnt Ends",
            description: "Smoked duck breast with sweet chili sauce and herbs",
            price: 32.00,
            category: "Main"
          }
        ]
      }
    }
  });

  console.log('Raw opening hours:', kyu.openingHours);

  // Create Kyu Wynwood restaurant
  const coyo = await prisma.restaurant.create({
    data: {
      name: "Coyo Taco",
      description: "Hip counter-serve spot for Mexican street food & margaritas with a hidden bar in the back.",
      address: "2300 NW 2nd Ave",
      city: "Miami",
      state: "FL",
      zipCode: "33127",
      phone: "(305) 573-8228",
      cuisine: ["Mexican", "Tacos"],
      indoorSeating: true,
      capacity: 40,
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5e8f5d44d7686f2c5f9f56a1/1624482151727-6IHYC1QCHDS7PS63B15G/kyu+miami+dining+room.jpg",
      openingHours: JSON.stringify({
        monday: "11:00-03:00",
        tuesday: "11:00-03:00",
        wednesday: "11:00-03:00",
        thursday: "11:00-03:00",
        friday: "11:00-05:00",
        saturday: "11:00-05:00",
        sunday: "11:00-03:00"
      }),
      parking: [ParkingOptions.STREET, ParkingOptions.VALET, ParkingOptions.PUBLIC_LOT],
      menuItems: {
        create: [
          {
            name: "Pollo al Carbon Tacos",
            description: "Chargrilled chicken, queso, cilantro",
            price: 12.00,
            category: "Tacos"
          },
          {
            name: "Guacamole & Chips",
            description: "Fresh guacamole with lime and cilantro",
            price: 9.00,
            category: "Appetizer"
          },
          {
            name: "Carnitas Burrito",
            description: "Braised pork, mexican rice, black beans, cilantro",
            price: 14.00,
            category: "Main"
          }
        ]
      }
    }
  });

  console.log('Raw opening hours:', coyo.openingHours);

  // Create Joey's restaurant
  const joeys = await prisma.restaurant.create({
    data: {
      name: "Joey's",
      description: "Sophisticated Italian eatery serving thin-crust pizzas & creative pasta dishes in an art-filled space.",
      address: "2506 NW 2nd Ave",
      city: "Miami",
      state: "FL",
      zipCode: "33127",
      phone: "(305) 438-0488",
      cuisine: ["Italian", "Pizza", "Pasta"],
      indoorSeating: true,
      capacity: 80,
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5e8f5d44d7686f2c5f9f56a1/1624482151727-6IHYC1QCHDS7PS63B15G/kyu+miami+dining+room.jpg",
      openingHours: JSON.stringify({
        monday: "11:30-22:30",
        tuesday: "11:30-22:30",
        wednesday: "11:30-22:30",
        thursday: "11:30-22:30",
        friday: "11:30-23:30",
        saturday: "11:30-23:30",
        sunday: "11:30-22:30"
      }),
      parking: [ParkingOptions.STREET, ParkingOptions.VALET, ParkingOptions.PUBLIC_LOT],
      menuItems: {
        create: [
          {
            name: "Margherita Pizza",
            description: "Fresh mozzarella, tomato sauce, basil",
            price: 16.00,
            category: "Pizza"
          },
          {
            name: "Spaghetti alle Vongole",
            description: "Fresh clams, white wine, garlic, olive oil",
            price: 24.00,
            category: "Pasta"
          },
          {
            name: "Burrata",
            description: "Creamy burrata, cherry tomatoes, arugula, balsamic",
            price: 18.00,
            category: "Appetizer"
          }
        ]
      }
    }
  });

  console.log('Raw opening hours:', joeys.openingHours);

  // Add Zak the Baker
  const zak = await prisma.restaurant.create({
    data: {
      name: "Zak the Baker",
      description: "Artisanal kosher bakery & cafe known for sourdough breads, pastries, and seasonal breakfast & lunch dishes.",
      address: "295 NW 26th St",
      city: "Miami",
      state: "FL",
      zipCode: "33127",
      phone: "(786) 294-0876",
      cuisine: ["Bakery", "Cafe", "Kosher"],
      indoorSeating: true,
      capacity: 45,
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5e8f5d44d7686f2c5f9f56a1/1624482151727-6IHYC1QCHDS7PS63B15G/kyu+miami+dining+room.jpg",
      openingHours: JSON.stringify({
        monday: "07:00-17:00",
        tuesday: "07:00-17:00",
        wednesday: "07:00-17:00",
        thursday: "07:00-17:00",
        friday: "07:00-17:00",
        saturday: "closed",
        sunday: "07:00-17:00"
      }),
      parking: [ParkingOptions.STREET, ParkingOptions.VALET, ParkingOptions.PUBLIC_LOT],
      menuItems: {
        create: [
          {
            name: "Sourdough Bread",
            description: "Traditional naturally leavened bread",
            price: 8.00,
            category: "Bakery"
          },
          {
            name: "Avocado Toast",
            description: "Fresh avocado, sourdough, olive oil, sea salt, chili flakes",
            price: 12.00,
            category: "Breakfast"
          },
          {
            name: "Tuna Sandwich",
            description: "House-made tuna salad, lettuce, tomato, red onion on sourdough",
            price: 14.00,
            category: "Lunch"
          },
          {
            name: "Chocolate Babka",
            description: "Traditional Jewish sweet bread with chocolate swirl",
            price: 10.00,
            category: "Pastry"
          }
        ]
      }
    }
  });

  console.log('Raw opening hours:', zak.openingHours);

  // Add 1-800-Lucky
  const lucky = await prisma.restaurant.create({
    data: {
      name: "1-800-Lucky",
      description: "Asian food hall featuring multiple vendors, offering everything from dim sum to poke bowls, plus a karaoke bar.",
      address: "143 NW 23rd St",
      city: "Miami",
      state: "FL",
      zipCode: "33127",
      phone: "(305) 768-9826",
      cuisine: ["Asian", "Food Hall", "Fusion"],
      indoorSeating: true,
      capacity: 200,
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5e8f5d44d7686f2c5f9f56a1/1624482151727-6IHYC1QCHDS7PS63B15G/kyu+miami+dining+room.jpg",
      openingHours: JSON.stringify({
        monday: "12:00-23:00",
        tuesday: "12:00-23:00",
        wednesday: "12:00-23:00",
        thursday: "12:00-23:00",
        friday: "12:00-02:00",
        saturday: "12:00-02:00",
        sunday: "12:00-23:00"
      }),
      parking: [ParkingOptions.STREET, ParkingOptions.VALET, ParkingOptions.PUBLIC_LOT],
      menuItems: {
        create: [
          {
            name: "Pork Tonkotsu Ramen",
            description: "Rich pork bone broth, chashu, soft egg, bamboo shoots",
            price: 16.00,
            category: "Ramen"
          },
          {
            name: "Spicy Tuna Roll",
            description: "Fresh tuna, spicy mayo, cucumber, tempura flakes",
            price: 15.00,
            category: "Sushi"
          },
          {
            name: "Dim Sum Platter",
            description: "Assorted dumplings including shrimp, pork, and vegetable",
            price: 18.00,
            category: "Dim Sum"
          },
          {
            name: "Matcha Ice Cream",
            description: "Premium green tea ice cream with mochi pieces",
            price: 8.00,
            category: "Dessert"
          }
        ]
      }
    }
  });

  console.log('Raw opening hours:', lucky.openingHours);

  console.log(`Created restaurants: KYU, Coyo Taco, Joey's, ${zak.name}, ${lucky.name}`);
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });