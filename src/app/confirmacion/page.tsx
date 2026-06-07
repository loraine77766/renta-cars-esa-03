'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { isValid, parseISO } from 'date-fns';
import { Suspense, useEffect, useMemo } from 'react';

import { cars } from '@/lib/cars';
import ConfirmationDetails from '@/app/confirmacion/ConfirmationDetails';
import { calculateReservationDetails } from '@/lib/utils';
import type { ReservationDetails as ReservationDetailsType } from '@/lib/types';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = useMemo(() => ({
    carId: searchParams.get('carId'),
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    pickupLocation: searchParams.get('pickupLocation'),
    dropoffLocation: searchParams.get('dropoffLocation'),
    pickupTime: searchParams.get('pickupTime'),
    dropoffTime: searchParams.get('dropoffTime'),
    fuel: searchParams.get('fuel'),
  }), [searchParams]);

  const data = useMemo(() => {
    const { carId, from, to, pickupLocation, dropoffLocation, pickupTime, dropoffTime, fuel } = params;
    if (!carId || !from || !to || !pickupLocation || !dropoffLocation || !pickupTime || !dropoffTime)
      return { valid: false } as const;
    const car = cars.find(c => c.id === parseInt(carId, 10));
    if (!car) return { valid: false } as const;
    const startDate = parseISO(from);
    const endDate = parseISO(to);
    if (!isValid(startDate) || !isValid(endDate)) return { valid: false } as const;
    const fuelLiters = fuel ? parseInt(fuel, 10) : undefined;
    const reservationDetails = calculateReservationDetails(startDate, endDate, car.pricePerDay, fuelLiters);
    if (!reservationDetails) return { valid: false } as const;
    return { valid: true as const, car, startDate, endDate, pickupLocation, dropoffLocation, pickupTime, dropoffTime, reservationDetails };
  }, [params]);

  useEffect(() => {
    if (!data.valid) router.replace('/');
  }, [data.valid, router]);

  if (!data.valid) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfirmationDetails
        car={data.car}
        startDate={data.startDate}
        endDate={data.endDate}
        pickupLocation={data.pickupLocation}
        dropoffLocation={data.dropoffLocation}
        pickupTime={data.pickupTime}
        dropoffTime={data.dropoffTime}
        reservationDetails={data.reservationDetails}
      />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen items-center justify-center"><p>Cargando...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
