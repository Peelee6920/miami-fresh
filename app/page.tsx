'use client';

import { motion } from 'framer-motion';
import RestaurantList from '@/components/RestaurantList'
import { Suspense } from 'react'

async function getRestaurants() {
  try {
    const res = await fetch('/api/restaurants', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch restaurants')
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

function LoadingState() {
  return (
    <div className="text-center py-10">
      <p className="text-xl">Loading restaurants...</p>
    </div>
  )
}

export default async function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Miami Fresh
      </h1>
      <h2 className="text-2xl text-center mb-12 text-gray-600">
        Discover Wynwood's Finest Dining Experience
      </h2>
      <Suspense fallback={<LoadingState />}>
        {/* @ts-expect-error Async Server Component */}
        <RestaurantSection />
      </Suspense>
    </main>
  )
}

async function RestaurantSection() {
  const restaurants = await getRestaurants()
  
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl">No restaurants found</p>
      </div>
    )
  }

  return <RestaurantList restaurants={restaurants} />
} 