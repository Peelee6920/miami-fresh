'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  openingHours: {
    [key: string]: string;
  };
  menuItems: MenuItem[];
  imageUrl: string;
  parking: string;
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

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedHours, setExpandedHours] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((restaurant: any) => ({
          ...restaurant,
          openingHours: typeof restaurant.openingHours === 'string' 
            ? JSON.parse(restaurant.openingHours) 
            : restaurant.openingHours
        }));
        setRestaurants(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      });
  }, []);

  const toggleHours = (restaurantId: string) => {
    setExpandedHours(expandedHours === restaurantId ? null : restaurantId);
  };

  const formatHours = (hours: { [key: string]: string }) => {
    return Object.entries(hours).map(([day, time]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      time
    }));
  };

  if (loading) return <Loading />;
  if (!restaurants.length) return <div className="text-white text-center text-xl">No restaurants found.</div>;

  return (
    <div className="space-y-6">
      {restaurants.map(restaurant => (
        <GlowingEffect key={restaurant.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:flex gap-6"
          >
            {/* Left side - Image */}
            <div className="md:w-1/3 h-64 md:h-auto relative rounded-lg overflow-hidden">
              {restaurant.imageUrl ? (
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/20 to-[#4ecdc4]/20 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Right side - Content */}
            <div className="md:w-2/3 pt-6 md:pt-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-[#ff6b6b]">
                    {restaurant.name}
                  </h2>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[#4ecdc4] font-medium">Open Now</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600">$$</span>
                  </div>
                </div>
                <button className="bg-[#ff6b6b] text-white px-6 py-2 rounded-full hover:bg-[#ff8787] transition-colors duration-300">
                  Reserve
                </button>
              </div>

              {/* Hours Section */}
              <div className="mt-4">
                <button
                  onClick={() => toggleHours(restaurant.id)}
                  className="flex items-center gap-2 text-[#4ecdc4] hover:text-[#3dbdb4] transition-colors"
                >
                  <FaClock className="w-4 h-4" />
                  <span className="font-medium">
                    {expandedHours === restaurant.id ? 'Hide Hours' : 'Show Hours'}
                  </span>
                </button>
                
                {expandedHours === restaurant.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2 text-sm"
                  >
                    {(() => {
                      const hours = parseOpeningHours(restaurant.openingHours);
                      if (!hours) {
                        return <p>Hours not available</p>;
                      }
                      return Object.entries(hours).map(([day, time]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize">{day}:</span>
                          <span>{time}</span>
                        </div>
                      ));
                    })()}
                  </motion.div>
                )}
              </div>

              {/* Parking Information */}
              <div className="mt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCar className="w-4 h-4 text-[#4ecdc4]" />
                  <span className="font-medium">Parking:</span>
                </div>
                <p className="mt-1 text-gray-600 ml-6">{restaurant.parking}</p>
              </div>

              {/* Features */}
              <div className="mt-4 space-y-2">
                {restaurant.indoorSeating && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#4ecdc4]">✓</span>
                    <span className="text-gray-700">Indoor seating available</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[#4ecdc4]">✓</span>
                  <span className="text-gray-700">Capacity: {restaurant.capacity} people</span>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                {restaurant.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.cuisine.map((type, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#4ecdc4]/10 rounded-full text-sm text-[#4ecdc4] font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-gray-600">{restaurant.address}</div>
                <div className="text-gray-600">{`${restaurant.city}, ${restaurant.state} ${restaurant.zipCode}`}</div>
                <div className="mt-1 text-[#ff6b6b] font-medium">{restaurant.phone}</div>
              </div>
            </div>
          </motion.div>
        </GlowingEffect>
      ))}
    </div>
  );
}