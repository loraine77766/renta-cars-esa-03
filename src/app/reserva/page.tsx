'use client';

import { cars } from '@/lib/cars';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import ReservationForm from '@/app/reserva/ReservationForm';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen items-center justify-center"><p>Cargando...</p></div>}>
      <ReservationPageContent />
    </Suspense>
  )
}

function ReservationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');

  if (!carId) {
    redirect('/');
  }

  const car = cars.find(c => c.id === parseInt(carId, 10));

  if (!car) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.back()} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded px-3 py-2 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </button>
      </div>
      <ReservationForm car={car} />
    </div>
  );
}
