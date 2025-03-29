'use client';

import { useState, useEffect } from 'react';

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
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching restaurants...');
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (!restaurants || restaurants.length === 0) {
    return <div>No restaurants found.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map(restaurant => (
        <div key={restaurant.id} className="border rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
          <p className="text-gray-600 mb-4">{restaurant.description}</p>
          
          <div className="mb-4">
            <p className="font-semibold">Cuisine:</p>
            <div className="flex gap-2 mt-1">
              {restaurant.cuisine.map((type, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Address:</p>
            <p>{restaurant.address}</p>
            <p>{`${restaurant.city}, ${restaurant.state} ${restaurant.zipCode}`}</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">Contact:</p>
            <p>{restaurant.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}