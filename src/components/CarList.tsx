import type { Car } from '@/lib/types'
import { CarCard } from '@/components/CarCard'

export function CarList({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => <CarCard key={car.id} car={car} />)}
    </div>
  )
}
