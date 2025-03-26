'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import { StarIcon } from '@heroicons/react/20/solid'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Mock data - replace with actual API call
const restaurants = [
  {
    id: '1',
    name: 'Ocean View Restaurant',
    description: 'Fresh seafood with a view of the Atlantic',
    cuisine: ['Seafood', 'American'],
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 128,
    imageUrl: '/restaurant-1.jpg',
    address: '123 Ocean Drive, Miami Beach, FL',
  },
  // Add more mock restaurants...
]

export default function RestaurantsPage() {
  const [filters, setFilters] = useState({
    cuisine: '',
    priceRange: '',
    rating: '',
  })

  return (
    <div>
      <Navigation />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Restaurants</h1>
          
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Filters
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>

              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span className="font-medium text-gray-900">Cuisine</span>
                  </button>
                </h3>
                {/* Add cuisine filter options */}
              </div>

              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span className="font-medium text-gray-900">Price Range</span>
                  </button>
                </h3>
                {/* Add price range filter options */}
              </div>

              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span className="font-medium text-gray-900">Rating</span>
                  </button>
                </h3>
                {/* Add rating filter options */}
              </div>
            </form>

            {/* Restaurant grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {restaurants.map((restaurant) => (
                  <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{restaurant.cuisine.join(', ')}</p>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`${
                              restaurant.rating > rating ? 'text-orange-400' : 'text-gray-200'
                            } h-5 w-5 flex-shrink-0`}
                            aria-hidden="true"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          ({restaurant.reviewCount} reviews)
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{restaurant.priceRange}</p>
                      <p className="mt-1 text-sm text-gray-500">{restaurant.address}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 