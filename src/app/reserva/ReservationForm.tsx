'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import type { Car, ReservationDetails } from '@/lib/types';
import { locations } from '@/lib/locations';
import { ShieldCheck, Fuel, FileText } from 'lucide-react';
import RentalInfo from '@/app/confirmacion/RentalInfo';
import { calculateReservationDetails } from '@/lib/utils';
import { FUEL_PRICE_PER_LITER, getAvailableFuelCards, getFuelCardTier, type FuelCard } from '@/lib/types';

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const date = new Date();
      date.setHours(i, j);
      slots.push(format(date, "HH:mm"));
    }
  }
  return slots;
};
const hours = generateTimeSlots();

const formSchema = z.object({
  pickupLocation: z.string().min(1, 'El lugar de recogida es obligatorio.'),
  pickupDate: z.string().min(1, 'La fecha de recogida es obligatoria.'),
  pickupTime: z.string().min(1, 'La hora de recogida es obligatoria.'),
  dropoffLocation: z.string().min(1, 'El lugar de devolución es obligatorio.'),
  dropoffDate: z.string().min(1, 'La fecha de devolución es obligatoria.'),
  dropoffTime: z.string().min(1, 'La hora de devolución es obligatoria.'),
}).refine(data => {
  if (!data.pickupDate || !data.dropoffDate) return true;
  return data.dropoffDate >= data.pickupDate;
}, {
  message: 'La fecha de devolución debe ser posterior o igual a la de recogida.',
  path: ['dropoffDate'],
});

export default function ReservationForm({ car }: { car: Car }) {
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: '',
      pickupTime: '10:00',
      dropoffLocation: '',
      dropoffTime: '10:00',
    }
  });

  const pickupDate = watch('pickupDate');
  const dropoffDate = watch('dropoffDate');

  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);
  const [fuelLiters, setFuelLiters] = useState(0);

  useEffect(() => {
    if (pickupDate && dropoffDate && dropoffDate >= pickupDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      setReservationDetails(calculateReservationDetails(start, end, car.pricePerDay, fuelLiters || undefined));
    } else {
      setReservationDetails(null);
    }
  }, [pickupDate, dropoffDate, car.pricePerDay, fuelLiters]);

  const isDateRangeValid = !!reservationDetails && reservationDetails.rentalDays > 0;
  const imageList = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/confirmacion?carId=${car.id}&from=${values.pickupDate}&to=${values.dropoffDate}&pickupLocation=${values.pickupLocation}&dropoffLocation=${values.dropoffLocation}&pickupTime=${values.pickupTime}&dropoffTime=${values.dropoffTime}&fuel=${fuelLiters}`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="font-headline text-2xl text-primary mb-6">Completa los Datos de tu Reserva</h2>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 flex gap-3">
            <span className="text-primary font-bold shrink-0">i</span>
            <div>
              <p className="font-bold text-primary text-sm">Nota importante</p>
              <p className="text-sm text-primary">Se pueden recoger autos en otros lugares con un cargo adicional.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-headline font-semibold text-primary">Recogida</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lugar de recogida *</label>
                  <select {...register('pickupLocation')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                    <option value="">Selecciona un lugar</option>
                    <option value="Lugar Personalizado (costo extra)">Lugar Personalizado (costo extra)</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={`${loc.name}, ${loc.province}`}>{loc.name}, {loc.province}</option>
                    ))}
                  </select>
                  {errors.pickupLocation && <p className="text-sm text-red-600 mt-1">{errors.pickupLocation.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input type="date" {...register('pickupDate')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.pickupDate && <p className="text-sm text-red-600 mt-1">{errors.pickupDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <select {...register('pickupTime')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                      {hours.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-headline font-semibold text-primary">Devolución</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lugar de devolución *</label>
                  <select {...register('dropoffLocation')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                    <option value="">Selecciona un lugar</option>
                    <option value="Lugar Personalizado (costo extra)">Lugar Personalizado (costo extra)</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={`${loc.name}, ${loc.province}`}>{loc.name}, {loc.province}</option>
                    ))}
                  </select>
                  {errors.dropoffLocation && <p className="text-sm text-red-600 mt-1">{errors.dropoffLocation.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input type="date" {...register('dropoffDate')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.dropoffDate && <p className="text-sm text-red-600 mt-1">{errors.dropoffDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <select {...register('dropoffTime')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                      {hours.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {isDateRangeValid && reservationDetails && (() => {
              const tier = getFuelCardTier(reservationDetails.rentalDays);
              const availableCards = tier ? getAvailableFuelCards(reservationDetails.rentalDays) : [];

              if (!tier) return null;

              const tierName = tier === 'flash' ? 'Flash' : tier === 'estacionarias' ? 'Estacionaria' : 'Premium';

              return (
                <div className="bg-primary/5 border border-primary/30 rounded-xl p-6">
                  <h3 className="font-headline font-semibold text-primary flex items-center gap-2 mb-4">
                    <Fuel className="h-5 w-5" />
                    Tarjeta de Combustible
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm mb-4">
                    <p className="font-semibold text-amber-700">Precio fijo: $3.10/L — Reserva {tierName}</p>
                    <p className="text-xs text-amber-600 mt-1">Válido en puntos Coupet de Cuba (8:00 AM - 3:00 PM). Solo una tarjeta por reserva.</p>
                  </div>
                  <div className="space-y-3">
                    {availableCards.map(card => (
                      <label key={card.liters} className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${fuelLiters === card.liters ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="fuelCard" checked={fuelLiters === card.liters} onChange={() => setFuelLiters(fuelLiters === card.liters ? 0 : card.liters)} className="sr-only" />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-lg">{card.label}</p>
                            <p className="text-sm text-gray-500">{card.liters} litros prepagados</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl text-primary">${card.price.toFixed(2)}</p>
                            <p className="text-xs text-gray-400">${FUEL_PRICE_PER_LITER.toFixed(2)}/L</p>
                          </div>
                        </div>
                      </label>
                    ))}
                    {fuelLiters > 0 && (
                      <button type="button" onClick={() => setFuelLiters(0)} className="text-sm text-red-500 hover:text-red-700 underline mt-2">
                        Quitar tarjeta de combustible
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
            <div className="flex justify-end pt-4">
              <button type="submit" disabled={!isDateRangeValid} className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Continuar a la Confirmación
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="font-headline text-2xl text-primary mb-6">Información Esencial de la Renta</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Depósito de Garantía de $250 (Reembolsable)</h4>
                <p className="text-sm text-gray-500">Para confirmar tu reserva, se requiere un pago por adelantado de $250. Este monto actúa como un depósito de garantía y es completamente reembolsable al finalizar el período de renta, siempre que el vehículo sea devuelto en las mismas condiciones en que fue entregado.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Fuel className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Combustible</h4>
                <p className="text-sm text-gray-500">El auto se entrega con el depósito lleno. Puedes pre-comprar combustible adicional en la sección de arriba. Recarga en puntos clave de Cuba (8:00 AM - 3:00 PM).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Contrato y Cobertura de Seguro</h4>
                <p className="text-sm text-gray-500">Al recoger el vehículo, firmarás un contrato de alquiler. En caso de accidente o daños al vehículo, los costos se cubrirán con el depósito de garantía. Es crucial revisar y entender los términos del contrato en el momento de la firma.</p>
              </div>
            </div>
          </div>
        </div>

        {car.details && <RentalInfo details={car.details} />}
      </div>

      <div className="space-y-8 lg:sticky lg:top-8 h-fit">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-56 w-full">
            <Image src={imageList[0]} alt={car.name} data-ai-hint={car.imageHint} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="font-headline text-2xl text-primary mb-2">{car.name}</h3>
            <div className="flex flex-wrap gap-2">
              {car.features.map(f => (
                <span key={f} className="inline-block bg-gray-50 text-gray-400 text-xs px-2.5 py-1 rounded-full">{f}</span>
              ))}
            </div>
          </div>
          {isDateRangeValid && reservationDetails && (
            <div className="p-6 pt-0 border-t border-gray-200">
              <hr className="mb-4" />
              <h4 className="font-headline text-lg font-semibold text-primary mb-2">Resumen del Costo ({reservationDetails.rentalDays} días)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Costo de Renta</span>
                  <span className="font-mono">${reservationDetails.rentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Depósito Reembolsable</span>
                  <span className="font-mono">${reservationDetails.deposit.toFixed(2)}</span>
                </div>
                {reservationDetails.fuelLiters ? (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Combustible ({reservationDetails.fuelLiters}L)</span>
                    <span className="font-mono">${reservationDetails.fuelCost!.toFixed(2)}</span>
                  </div>
                ) : null}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center text-xl font-bold text-primary">
                <span>Total a Pagar</span>
                <span className="font-mono">${reservationDetails.totalWithoutDiscount.toFixed(2)}</span>
              </div>
              <div className="text-right text-sm text-gray-500">(Renta + Depósito)</div>
              <div className="mt-4 bg-primary/5 border border-primary/30 rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-primary">¡Paga por adelantado y ahorra un 20%!</p>
                <p className="text-xs text-primary/80">Pagarías ${reservationDetails.totalWithDiscount.toFixed(2)} en total, ahorrando ${reservationDetails.discountAmount.toFixed(2)}.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
