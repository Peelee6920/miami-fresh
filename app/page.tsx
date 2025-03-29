'use client';

import { motion } from 'framer-motion';
import RestaurantList from '@/components/RestaurantList'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h1 
          className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Miami Fresh
        </motion.h1>
        <motion.p 
          className="text-xl text-white mb-8 drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover Wynwood's Finest Dining Experiences
        </motion.p>
        <motion.div 
          className="w-24 h-1 bg-white mx-auto rounded-full opacity-50"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
      </motion.div>
      <RestaurantList />
    </motion.main>
  )
} 