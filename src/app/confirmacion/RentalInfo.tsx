'use client';

import type { Car } from "@/lib/types";
import { Check, X, Info, Clock } from "lucide-react";

interface RentalInfoProps {
  details: NonNullable<Car['details']>;
}

const InfoSection: React.FC<{ title: string; items: string[]; icon: React.ReactNode; iconClass: string }> = ({ title, items, icon, iconClass }) => (
  <div>
    <h4 className="flex items-center font-semibold text-primary mb-2">
      <span className={`mr-2 ${iconClass}`}>{icon}</span>
      {title}
    </h4>
    <ul className="space-y-1 text-sm text-gray-500 list-disc list-inside">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

export default function RentalInfo({ details }: RentalInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="font-headline text-2xl text-primary mb-6">Detalles Importantes</h2>
      <div className="space-y-6">
        <InfoSection
          title="Cargos Adicionales"
          items={details.additionalCharges}
          icon={<Info size={16}/>}
          iconClass="text-primary"
        />
        <InfoSection
          title="Incluido en el Precio"
          items={details.included}
          icon={<Check size={16}/>}
          iconClass="text-primary"
        />
        <InfoSection
          title="No Incluido en el Precio"
          items={details.notIncluded}
          icon={<X size={16}/>}
          iconClass="text-red-500"
        />
        <InfoSection
          title="Hora de Recogida y Entrega"
          items={details.pickupAndDropoff}
          icon={<Clock size={16}/>}
          iconClass="text-orange-500"
        />
        <InfoSection
          title="Informaciones"
          items={details.notes}
          icon={<Info size={16}/>}
          iconClass="text-gray-500"
        />
      </div>
    </div>
  );
}
