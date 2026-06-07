'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import type { SavedRental } from '@/lib/types';
import { cars } from '@/lib/cars';
import { Trash2, Calendar, Car } from 'lucide-react';
import Image from 'next/image';
import { differenceInDays, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

export default function MisRentasPage() {
  const [savedRentals, setSavedRentals] = useLocalStorage<SavedRental[]>('savedRentals', []);

  const handleClearAll = () => {
    setSavedRentals([]);
  };

  const handleRemoveOne = (index: number) => {
    const newRentals = savedRentals.filter((_, i) => i !== index);
    setSavedRentals(newRentals);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">Mis Rentas Guardadas</h1>
        {savedRentals.length > 0 && (
          <button onClick={handleClearAll} className="inline-flex items-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded px-4 py-2 transition-colors">
            <Trash2 className="mr-2 h-4 w-4" />
            Limpiar todo
          </button>
        )}
      </div>

      {savedRentals.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Car className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-primary">No tienes rentas guardadas</h3>
          <p className="mt-1 text-sm text-gray-500">
            Cuando encuentres un auto que te guste, guárdalo para verlo aquí más tarde.
          </p>
          <div className="mt-6">
            <Link href="/autos" className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
              Ver autos
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedRentals.map((rental, index) => {
            const car = cars.find(c => c.id === rental.carId);
            if (!car) return null;

            const startDate = parseISO(rental.startDate);
            const endDate = parseISO(rental.endDate);
            const rentalDays = differenceInDays(endDate, startDate) || 1;
            const totalPrice = rentalDays * car.pricePerDay;

            const confirmationUrl = `/confirmacion?carId=${car.id}&from=${rental.startDate}&to=${rental.endDate}&pickupLocation=Aeropuerto%20-%20Terminal%203&dropoffLocation=Aeropuerto%20-%20Terminal%203&pickupTime=10:00&dropoffTime=10:00`;

            return (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={car.imageUrl} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-headline text-xl text-primary">{car.name}</h3>
                  <div className="flex flex-wrap gap-2 my-2">
                    {car.features.map(f => (
                      <span key={f} className="inline-block bg-gray-50 text-gray-400 text-xs px-2.5 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="px-4 pb-4 space-y-3 flex-grow">
                  <div className="space-y-2 text-sm bg-primary/10 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Recogida:</span>
                      <span className="font-semibold">{format(startDate, "PPP", { locale: es })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Devolución:</span>
                      <span className="font-semibold">{format(endDate, "PPP", { locale: es })}</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center font-bold text-lg text-primary">
                    <span className="font-headline">Precio Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 grid grid-cols-2 gap-2 border-t border-gray-200">
                  <button onClick={() => handleRemoveOne(index)} className="text-sm font-medium text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition-colors">
                    <Trash2 className="mr-2 h-4 w-4 inline" />
                    Eliminar
                  </button>
                  <Link href={confirmationUrl} className="text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded px-4 py-2 text-center transition-colors">
                    Rentar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
