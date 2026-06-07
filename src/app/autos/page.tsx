import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { Car } from 'lucide-react';

export default function AutosPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Car className="h-4 w-4" /> Nuestra Flota
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Encuentra tu Auto Ideal
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explora nuestra flota de vehículos y encuentra el auto perfecto para tu viaje en Cuba.
          </p>
        </div>
      </section>
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <CarList cars={cars} />
        </div>
      </section>
    </div>
  );
}
