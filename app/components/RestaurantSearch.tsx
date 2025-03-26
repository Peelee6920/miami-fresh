'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { PriceRange, VenueFeatures, ParkingOptions } from '@prisma/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function RestaurantSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | ''>('');
  const [selectedFeatures, setSelectedFeatures] = useState<VenueFeatures[]>([]);
  const [selectedParking, setSelectedParking] = useState<ParkingOptions[]>([]);
  const [minCapacity, setMinCapacity] = useState('');
  const [hasOutdoor, setHasOutdoor] = useState(false);
  const [hasBar, setHasBar] = useState(false);
  const [hasPrivateRoom, setHasPrivateRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    searchRestaurants();
  }, [debouncedQuery, selectedCuisine, selectedPriceRange, selectedFeatures, selectedParking, minCapacity, hasOutdoor, hasBar, hasPrivateRoom]);

  const searchRestaurants = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      if (debouncedQuery) params.append('query', debouncedQuery);
      if (selectedCuisine) params.append('cuisine', selectedCuisine);
      if (selectedPriceRange) params.append('priceRange', selectedPriceRange);
      selectedFeatures.forEach(feature => params.append('features', feature));
      selectedParking.forEach(option => params.append('parking', option));
      if (minCapacity) params.append('minCapacity', minCapacity);
      if (hasOutdoor) params.append('hasOutdoor', 'true');
      if (hasBar) params.append('hasBar', 'true');
      if (hasPrivateRoom) params.append('hasPrivateRoom', 'true');

      const response = await fetch(`/api/restaurants/search?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError('Failed to search restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('');
    setSelectedPriceRange('');
    setSelectedFeatures([]);
    setSelectedParking([]);
    setMinCapacity('');
    setHasOutdoor(false);
    setHasBar(false);
    setHasPrivateRoom(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Search input */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              placeholder="Search restaurants, cuisine, or location"
            />
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cuisine filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisine</label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            >
              <option value="">All Cuisines</option>
              <option value="AMERICAN">American</option>
              <option value="ITALIAN">Italian</option>
              <option value="JAPANESE">Japanese</option>
              <option value="CHINESE">Chinese</option>
              <option value="MEXICAN">Mexican</option>
              <option value="INDIAN">Indian</option>
              <option value="THAI">Thai</option>
              <option value="MEDITERRANEAN">Mediterranean</option>
              <option value="FRENCH">French</option>
              <option value="SPANISH">Spanish</option>
              <option value="KOREAN">Korean</option>
              <option value="VIETNAMESE">Vietnamese</option>
            </select>
          </div>

          {/* Price range filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value as PriceRange)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            >
              <option value="">Any Price</option>
              <option value="INEXPENSIVE">$</option>
              <option value="MODERATE">$$</option>
              <option value="EXPENSIVE">$$$</option>
              <option value="VERY_EXPENSIVE">$$$$</option>
            </select>
          </div>

          {/* Capacity filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Capacity</label>
            <input
              type="number"
              min="0"
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              placeholder="Enter minimum capacity"
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasOutdoor}
                onChange={(e) => setHasOutdoor(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Outdoor Seating</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasBar}
                onChange={(e) => setHasBar(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Bar Seating</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasPrivateRoom}
                onChange={(e) => setHasPrivateRoom(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Private Room</span>
            </label>
          </div>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
        {error && (
          <div className="text-red-600 text-center">{error}</div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant: any) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Restaurant card content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600 mt-2">{restaurant.description}</p>
                <div className="mt-4">
                  <span className="text-orange-500">★</span>
                  <span className="ml-1">{restaurant.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-2">({restaurant._count.reviews} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 