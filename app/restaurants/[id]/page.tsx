'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import { StarIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Mock data - replace with API call
const restaurant = {
  id: '1',
  name: 'Ocean View Restaurant',
  description: 'Fresh seafood with a view of the Atlantic',
  cuisine: ['Seafood', 'American'],
  priceRange: '$$',
  rating: 4.5,
  reviewCount: 128,
  address: '123 Ocean Drive, Miami Beach, FL',
  phone: '(305) 555-0123',
  website: 'https://oceanview.com',
  images: [
    '/restaurant-1.jpg',
    '/restaurant-2.jpg',
    '/restaurant-3.jpg',
  ],
  menu: {
    Appetizers: [
      {
        id: '1',
        name: 'Fresh Oysters',
        description: 'Half dozen fresh oysters served with mignonette sauce',
        price: 18,
        image: '/oysters.jpg',
      },
      // Add more items...
    ],
    'Main Course': [
      {
        id: '2',
        name: 'Grilled Sea Bass',
        description: 'Fresh sea bass with seasonal vegetables',
        price: 32,
        image: '/sea-bass.jpg',
      },
      // Add more items...
    ],
  },
  reviews: [
    {
      id: '1',
      user: 'John D.',
      rating: 5,
      date: '2024-03-01',
      comment: 'Amazing food and atmosphere!',
      images: ['/review-1.jpg'],
    },
    // Add more reviews...
  ],
  happyHour: {
    days: 'Monday - Friday',
    hours: '4:00 PM - 7:00 PM',
    deals: [
      '50% off appetizers',
      '$5 draft beers',
      '$8 signature cocktails',
    ],
  },
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [partySize, setPartySize] = useState(2)

  return (
    <div>
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant header */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{restaurant.name}</h1>
            <div className="mt-4">
              <div className="flex items-center">
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
              <p className="mt-2 text-base text-gray-500">{restaurant.description}</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-500">
                <MapPinIcon className="h-5 w-5 mr-2" />
                {restaurant.address}
              </div>
              <div className="flex items-center text-gray-500">
                <PhoneIcon className="h-5 w-5 mr-2" />
                {restaurant.phone}
              </div>
              <div className="flex items-center text-gray-500">
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                <a href={restaurant.website} className="text-orange-500 hover:text-orange-600">
                  {restaurant.website}
                </a>
              </div>
            </div>
          </div>

          {/* Reservation card */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900">Make a Reservation</h2>
              <form className="mt-4 space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  >
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    {/* Add more time slots */}
                  </select>
                </div>
                <div>
                  <label htmlFor="party-size" className="block text-sm font-medium text-gray-700">
                    Party Size
                  </label>
                  <select
                    id="party-size"
                    name="party-size"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Reserve Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tab.Group>
            <Tab.List className="flex space-x-8 border-b border-gray-200">
              {['Menu', 'Reviews', 'Happy Hour'].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      'border-b-2 py-4 px-1 text-sm font-medium',
                      selected
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-8">
              <Tab.Panel>
                {/* Menu */}
                <div className="space-y-12">
                  {Object.entries(restaurant.menu).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
                        {items.map((item) => (
                          <div key={item.id} className="group relative">
                            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover object-center"
                              />
                            </div>
                            <div className="mt-4">
                              <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {/* Reviews */}
                <div className="space-y-8">
                  {restaurant.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-8">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={`${
                                review.rating > rating ? 'text-orange-400' : 'text-gray-200'
                              } h-5 w-5 flex-shrink-0`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-500">{review.user}</p>
                        <time className="ml-4 text-sm text-gray-500">{review.date}</time>
                      </div>
                      <p className="mt-4 text-gray-600">{review.comment}</p>
                      {review.images.length > 0 && (
                        <div className="mt-4 flex space-x-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review ${index + 1}`}
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {/* Happy Hour */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900">Happy Hour</h3>
                  <div className="mt-4">
                    <p className="text-lg font-medium text-gray-900">{restaurant.happyHour.days}</p>
                    <p className="text-lg text-gray-600">{restaurant.happyHour.hours}</p>
                    <ul className="mt-4 space-y-2">
                      {restaurant.happyHour.deals.map((deal, index) => (
                        <li key={index} className="text-gray-600">
                          • {deal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </div>
  )
} 