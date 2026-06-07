import { locations } from '@/lib/locations';
import { MapPin, Clock } from 'lucide-react';

export default function ContactanosPage() {
  const locationsByProvince: Record<string, typeof locations> = locations.reduce((acc, loc) => {
    const { province } = loc;
    if (!acc[province]) {
      acc[province] = [];
    }
    acc[province].push(loc);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        <h1 className="font-headline text-3xl md:text-4xl text-primary text-center">
          Nuestras Oficinas en Cuba
        </h1>
        <p className="text-center text-gray-500 pt-2 mb-8">
          Estos son nuestros puntos de recogida y entrega oficiales. También podemos coordinar la entrega en otras ubicaciones con un cargo adicional.
        </p>
        <div className="space-y-8">
          {Object.entries(locationsByProvince).map(([province, offices]) => (
            <div key={province}>
              <h2 className="font-headline text-2xl font-bold text-primary mb-4 border-b pb-2">{province}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offices.map(office => (
                  <div key={office.id} className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">{office.name}</h3>
                    <p className="text-sm text-gray-500 flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{office.address}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{office.hours}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
