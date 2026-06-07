'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Car as CarType } from '@/lib/types';

interface CarCardProps {
  car: CarType;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={car.imageUrl}
          alt={car.name}
          data-ai-hint={car.imageHint}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium text-white bg-primary/70 px-3 py-1 rounded-full backdrop-blur-sm">Disponible</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <h3 className="font-headline text-xl font-bold text-white drop-shadow-lg">{car.name}</h3>
          <div className="flex items-baseline gap-1 bg-white shadow-sm px-3 py-1.5 rounded-lg">
            {car.originalPricePerDay && (
              <span className="text-xs text-gray-400 line-through">${car.originalPricePerDay}</span>
            )}
            <span className="font-headline text-lg font-bold text-primary">${car.pricePerDay}</span>
            <span className="text-xs text-gray-400">/día</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-400 line-clamp-2">{car.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {car.features.map((feature) => (
            <span key={feature} className="inline-block bg-gray-50 text-gray-400 text-xs px-2.5 py-1 rounded-full font-normal">{feature}</span>
          ))}
        </div>
        <Link
          href={`/reserva?carId=${car.id}`}
          className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-4 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          Rentar Ahora
        </Link>
      </div>
    </div>
  );
}
