'use client';

import BikeCard from './BikeCard';
import { motion, AnimatePresence } from 'framer-motion';
import type { Bike } from '@/types';

interface CatalogGridProps {
  bikes: Bike[];
}

export default function CatalogGrid({ bikes }: CatalogGridProps) {
  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {bikes.map((bike) => (
          <motion.div
            key={bike.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <BikeCard bike={bike} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
