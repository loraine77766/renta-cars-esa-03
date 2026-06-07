'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import jsPDF from 'jspdf';

import type { Car, ReservationDetails } from '@/lib/types';
import { FUEL_PRICE_PER_LITER } from '@/lib/types';
import { Loader2, MessageCircle, FileText } from 'lucide-react';

interface ConfirmationDetailsProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  dropoffTime: string;
  reservationDetails: ReservationDetails;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Requerido' }),
  lastName1: z.string().min(2, { message: 'Requerido' }),
  lastName2: z.string().default(''),
  birthDay: z.string().min(1, 'Día'),
  birthMonth: z.string().min(1, 'Mes'),
  birthYear: z.string().min(4, 'Año'),
  phone: z.string().min(5, { message: 'Requerido' }),
  country: z.string().min(2, { message: 'Requerido' }),
  passport: z.string().min(5, { message: 'Requerido' }),
  driversLicense: z.string().min(5, { message: 'Requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  flight: z.string().default(''),
  paymentOption: z.enum(['deposit', 'full_payment']).default('deposit'),
});

export default function ConfirmationDetails({ car, startDate, endDate, pickupLocation, dropoffLocation, pickupTime, dropoffTime, reservationDetails }: ConfirmationDetailsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmittingWhatsApp, setIsSubmittingWhatsApp] = useState(false);
  const [isSubmittingInvoice, setIsSubmittingInvoice] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setOrderId(res);
  }, []);

  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '', lastName1: '', lastName2: '', birthDay: '', birthMonth: '', birthYear: '',
      phone: '', country: '', passport: '', driversLicense: '', email: '', flight: '',
      paymentOption: 'deposit',
    },
  });

  if (!isMounted) return null;

  const formData = watch();
  const amountToPay = formData.paymentOption === 'full_payment'
    ? (reservationDetails?.totalWithDiscount || 0)
    : (reservationDetails?.totalWithoutDiscount || 0);

  const handleDownloadInvoice = async () => {
    const isValid = await trigger();
    if (!isValid) {
      setNotify({ type: 'error', message: 'Completa los campos obligatorios.' });
      return;
    }

    setIsSubmittingInvoice(true);

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pw = doc.internal.pageSize.getWidth();
      const ml = 20;
      const mr = pw - 20;

      const drawPrimary = (text: string, x: number, y: number, size: number, opts?: any) => {
        doc.setTextColor(37, 99, 235);
        doc.setFontSize(size);
        doc.text(text, x, y, opts);
      };
      const dark = (text: string, x: number, y: number, size: number, opts?: any) => {
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(size);
        doc.text(text, x, y, opts);
      };
      const gray = (text: string, x: number, y: number, size: number, opts?: any) => {
        doc.setTextColor(120, 120, 120);
        doc.setFontSize(size);
        doc.text(text, x, y, opts);
      };

      drawPrimary('FACTURA PROFORMA', ml, 30, 22);
      dark('Cuba Car Renta', ml, 38, 11);
      dark(`ID: ${orderId}`, mr, 30, 14, { align: 'right' });
      gray(`Fecha: ${format(new Date(), "dd/MM/yyyy")}`, mr, 38, 9, { align: 'right' });

      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(0.5);
      doc.line(ml, 43, mr, 43);
 
      drawPrimary('CONDUCTOR', ml, 55, 9);
      doc.setDrawColor(200, 200, 200);
      doc.line(ml, 57, 95, 57);

      const cv = [
        `Nombre: ${formData.name || ''} ${formData.lastName1 || ''} ${formData.lastName2 || ''}`,
        `WhatsApp: ${formData.phone || ''}`,
        `País: ${formData.country || ''}`,
        `Pasaporte: ${formData.passport || ''}`,
        `Licencia: ${formData.driversLicense || ''}`,
        `Email: ${formData.email || ''}`,
      ];
      cv.forEach((t, i) => dark(t, ml, 64 + i * 6, 8));

      const cx = pw / 2 + 8;
      drawPrimary('DETALLES RENTA', cx, 55, 9);
      doc.line(cx, 57, mr, 57);

      const dv = [
        `Vehículo: ${car.name}`,
        `Días: ${reservationDetails.rentalDays}`,
        `Recogida: ${format(startDate, "dd/MM/yy", { locale: es })} (${pickupLocation})`,
        `Devolución: ${format(endDate, "dd/MM/yy", { locale: es })} (${dropoffLocation})`,
      ];
      dv.forEach((t, i) => dark(t, cx, 64 + i * 6, 8));

      const dy = 100;
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(ml, dy, pw - 40, 70, 2, 2, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(ml, dy, pw - 40, 70, 2, 2, 'S');

      drawPrimary('DESGLOSE DE PAGO', ml + 6, dy + 10, 9);

      const items = [
        { label: `Costo Renta (${reservationDetails.rentalDays} días):`, value: `$${reservationDetails.rentPrice.toFixed(2)}` },
        { label: 'Depósito Garantía (Reembolsable):', value: '$250.00' },
      ];
      if (reservationDetails.fuelLiters) {
        items.push({ label: `Tarjeta Combustible (${reservationDetails.fuelLiters}L x $${FUEL_PRICE_PER_LITER.toFixed(2)}):`, value: `$${reservationDetails.fuelCost!.toFixed(2)}` });
      }
      items.forEach((item, i) => {
        dark(item.label, ml + 6, dy + 22 + i * 7, 8);
        dark(item.value, mr - 6, dy + 22 + i * 7, 8, { align: 'right' });
      });

      const lineY = dy + 22 + items.length * 7 + 1;
      doc.setDrawColor(200, 200, 200);
      doc.line(ml + 6, lineY, mr - 6, lineY);
      gray('Auto con depósito lleno. Recarga puntos Coupet Cuba (8AM-3PM).', ml + 6, lineY + 5, 6);

      if (formData.paymentOption === 'full_payment') {
        doc.setTextColor(220, 38, 38);
        doc.setFontSize(8);
        doc.text(`Descuento Pago Adelantado (20%): -$${reservationDetails.discountAmount.toFixed(2)}`, ml + 6, lineY + 12);
      }

      const totalY = dy + 62;
      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(0.8);
      doc.line(ml + 6, totalY - 2, mr - 6, totalY - 2);
      drawPrimary('TOTAL A PAGAR:', ml + 6, totalY + 5, 14);
      drawPrimary(`$${amountToPay.toFixed(2)}`, mr - 6, totalY + 5, 14, { align: 'right' });

      const ny = dy + 85;
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(ml, ny, pw - 40, 28, 2, 2, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(ml, ny, pw - 40, 28, 2, 2, 'S');

      dark('Notas:', ml + 5, ny + 7, 8);
      gray('Factura proforma emitida por Cuba Car Renta. El contrato final se firma en Cuba.', ml + 5, ny + 14, 7);
      gray('El depósito de $250 es reembolsable al entregar el auto en perfectas condiciones.', ml + 5, ny + 20, 7);
      gray(`Combustible: Auto entregado con depósito lleno. Tarjeta prepagada válida en puntos Coupet (8AM-3PM). $${FUEL_PRICE_PER_LITER.toFixed(2)}/L.`, ml + 5, ny + 26, 7);

      gray('Cuba Car Renta | +1 (587) 856-9144', pw / 2, 282, 7, { align: 'center' });

      doc.save(`Factura_${formData.name || 'Reserva'}_${orderId}.pdf`);
      setNotify({ type: 'success', message: 'Factura descargada correctamente.' });
    } catch (e) {
      console.error(e);
      setNotify({ type: 'error', message: 'Error al generar el PDF de la factura.' });
    } finally {
      setIsSubmittingInvoice(false);
    }
  };

  const handleWhatsApp = async () => {
    const isValid = await trigger();
    if (!isValid) {
      setNotify({ type: 'error', message: 'Completa los campos obligatorios antes de confirmar.' });
      return;
    }

    setIsSubmittingWhatsApp(true);
    try {
      const msg = `¡Hola! Mi ID de pedido es: ${orderId}. Quiero confirmar mi reserva de auto.`;
      const encodedMsg = encodeURIComponent(msg);
      const whatsappUrl = `https://wa.me/15878569144?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
      setNotify({ type: 'success', message: 'Abriendo WhatsApp para confirmar...' });
    } catch (e) {
      console.error(e);
      setNotify({ type: 'error', message: 'No se pudo abrir WhatsApp.' });
    } finally {
      setTimeout(() => setIsSubmittingWhatsApp(false), 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-4 pb-20">
      {notify && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${notify.type === 'success' ? 'bg-primary text-white' : 'bg-red-600 text-white'}`}>
          {notify.message}
          <button className="ml-3 text-white/80 hover:text-white" onClick={() => setNotify(null)}>×</button>
        </div>
      )}

      <h1 className="font-headline text-2xl md:text-4xl font-bold text-primary mb-2 text-center">Finaliza tu Reserva</h1>
      <p className="text-center text-sm text-gray-500 mb-8">Completa tus datos para confirmar tu renta en Cuba.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md border-2 border-primary/20 overflow-hidden">
            <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
              <h2 className="font-headline text-xl text-primary">Datos del Conductor</h2>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input {...register('name')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1. Apellido *</label>
                    <input {...register('lastName1')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.lastName1 && <p className="text-sm text-red-600 mt-1">{errors.lastName1.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2. Apellido</label>
                    <input {...register('lastName2')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nacimiento *</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input {...register('birthDay')} placeholder="Día" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                      <input {...register('birthMonth')} placeholder="Mes" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                      <input {...register('birthYear')} placeholder="Año" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    </div>
                    {errors.birthYear && <p className="text-sm text-red-600 mt-1">{errors.birthYear.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp *</label>
                    <input {...register('phone')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
                    <input {...register('country')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pasaporte *</label>
                    <input {...register('passport')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.passport && <p className="text-sm text-red-600 mt-1">{errors.passport.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Licencia *</label>
                    <input {...register('driversLicense')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.driversLicense && <p className="text-sm text-red-600 mt-1">{errors.driversLicense.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vuelo (Opcional)</label>
                    <input {...register('flight')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" {...register('email')} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Opción de Pago</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentOption === 'deposit' ? 'border-primary ring-2 ring-primary bg-primary/10' : 'border-gray-200'}`}>
                      <input type="radio" value="deposit" {...register('paymentOption')} className="sr-only" />
                      <h4 className="font-semibold text-sm">Pago Posterior</h4>
                      <p className="text-xs text-gray-500">Renta + Depósito al recibir.</p>
                    </label>
                    <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentOption === 'full_payment' ? 'border-primary ring-2 ring-primary bg-primary/10' : 'border-gray-200'}`}>
                      <input type="radio" value="full_payment" {...register('paymentOption')} className="sr-only" />
                      <h4 className="font-semibold text-sm">Pago Adelantado (-20%)</h4>
                      <p className="text-xs text-gray-500">Ahorra pagando hoy.</p>
                    </label>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button type="button" onClick={handleDownloadInvoice} disabled={isSubmittingInvoice} className="w-full py-5 text-lg font-bold bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center justify-center gap-3">
                    {isSubmittingInvoice ? <Loader2 className="h-6 w-6 animate-spin" /> : <FileText className="h-6 w-6" />}
                    Descargar Factura Proforma
                  </button>
                  <button type="button" onClick={handleWhatsApp} disabled={isSubmittingWhatsApp} className="w-full py-5 text-lg font-bold bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center justify-center gap-3">
                    {isSubmittingWhatsApp ? <Loader2 className="h-6 w-6 animate-spin" /> : <MessageCircle className="h-6 w-6" />}
                    Confirmar por WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border-2 border-primary/20 overflow-hidden lg:sticky lg:top-24 h-fit">
          <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
            <h2 className="font-headline text-lg text-primary">Resumen del Viaje</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative h-32 w-full">
              <Image src={car.imageUrl} alt={car.name} fill className="object-cover rounded-lg shadow-sm" />
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-bold text-primary">{car.name}</p>
              <p className="text-xs text-gray-500">{reservationDetails.rentalDays} días de renta</p>
              <p className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded w-fit">ID: {orderId}</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center text-xl font-bold text-primary">
              <span>Total:</span>
              <span className="font-mono text-2xl">${amountToPay.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
