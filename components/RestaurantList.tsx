'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FaClock, FaCar } from 'react-icons/fa';
import Loading from './Loading';
import { GlowingEffect } from './ui/glowing-effect';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  cuisine: string[];
  indoorSeating: boolean;
  capacity: number;
  openingHours: string;
  menuItems: MenuItem[];
  imageUrl: string;
  parking: string[];
}

type OpeningHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

const parseOpeningHours = (hoursString: string | null): OpeningHours | null => {
  if (!hoursString) return null;
  try {
    return JSON.parse(hoursString);
  } catch (error) {
    console.error('Error parsing hours:', error);
    return null;
  }
};

export default function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl">No restaurants available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [showHours, setShowHours] = useState(false);

  // Parse the opening hours safely
  const hours = restaurant.openingHours ? JSON.parse(restaurant.openingHours) : null;

  return (
    <GlowingEffect>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        <p className="text-gray-500 mb-2">
          {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zipCode}
        </p>
        <p className="text-gray-500 mb-2">{restaurant.phone}</p>
        
        {/* Capacity */}
        <p className="text-sm text-gray-500 mb-2">
          Capacity: {restaurant.capacity} seats
        </p>

        {/* Indoor Seating */}
        <p className="text-sm text-gray-500 mb-2">
          {restaurant.indoorSeating ? "Indoor seating available" : "No indoor seating"}
        </p>

        {/* Parking */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Parking: {restaurant.parking.join(", ")}
          </p>
        </div>

        {/* Hours Section */}
        <div className="mt-4">
          <button
            onClick={() => setShowHours(!showHours)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showHours ? "Hide Hours" : "Show Hours"}
          </button>

          {showHours && hours && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 space-y-1"
            >
              {Object.entries(hours).map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="capitalize">{day}:</span>
                  <span className="text-gray-600">{time}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </GlowingEffect>
  );
}