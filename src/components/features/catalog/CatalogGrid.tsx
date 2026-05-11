import BikeCard from './BikeCard';
import type { Bike } from '@/types';

interface CatalogGridProps {
  bikes: Bike[];
}

export default function CatalogGrid({ bikes }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
}
