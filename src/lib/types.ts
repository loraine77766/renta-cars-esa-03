export type Car = {
  id: number;
  name: string;
  description: string;
  pricePerDay: number;
  originalPricePerDay?: number;
  imageUrl: string;
  imageUrls?: string[];
  features: string[];
  imageHint: string;
  details?: {
    additionalCharges: string[];
    included: string[];
    notIncluded: string[];
    pickupAndDropoff: string[];
    notes: string[];
  }
};

export type SavedRental = {
  carId: number;
  startDate: string;
  endDate: string;
};

export type ReservationDetails = {
    rentalDays: number;
    rentPrice: number;
    deposit: number;
    totalWithDiscount: number;
    totalWithoutDiscount: number;
    discountAmount: number;
    fuelLiters?: number;
    fuelCost?: number;
};

export type FuelCard = {
  liters: number;
  price: number;
  label: string;
};

export const FUEL_PRICE_PER_LITER = 3.10;

export const FUEL_CARDS = {
  flash: [
    { liters: 20, price: 62.00, label: '20 LT' },
  ],
  estacionarias: [
    { liters: 25, price: 77.50, label: '25 LT' },
    { liters: 40, price: 124.00, label: '40 LT' },
  ],
  premium: [
    { liters: 50, price: 155.00, label: '50 LT' },
    { liters: 85, price: 263.50, label: '85 LT' },
  ],
} as const;

export type FuelCardTier = keyof typeof FUEL_CARDS;

export function getFuelCardTier(rentalDays: number): FuelCardTier | null {
  if (rentalDays >= 10) return 'premium';
  if (rentalDays >= 5) return 'estacionarias';
  if (rentalDays >= 3) return 'flash';
  return null;
}

export function getAvailableFuelCards(rentalDays: number): FuelCard[] {
  const tier = getFuelCardTier(rentalDays);
  if (!tier) return [];
  return [...FUEL_CARDS[tier]];
}
