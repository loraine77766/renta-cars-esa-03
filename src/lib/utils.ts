import { clsx, type ClassValue } from "clsx"
import { differenceInDays, parseISO, isValid } from "date-fns";
import { twMerge } from "tailwind-merge"
import type { ReservationDetails } from "./types";
import { FUEL_PRICE_PER_LITER } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReservationDetails(startDate: Date, endDate: Date, pricePerDay: number, fuelLiters?: number): ReservationDetails | null {
  if (!isValid(startDate) || !isValid(endDate) || endDate < startDate) {
    return null;
  }

  const rentalDays = differenceInDays(endDate, startDate);

  const fuelCost = fuelLiters ? fuelLiters * FUEL_PRICE_PER_LITER : 0;

  if (rentalDays <= 0) {
    const singleDayPrice = pricePerDay;
    const deposit = 250;
    const discountPercentage = 0.20;
    const discountedRentPrice = singleDayPrice * (1 - discountPercentage);
    const discountAmount = singleDayPrice - discountedRentPrice;
    const totalWithoutDiscount = singleDayPrice + deposit + fuelCost;
    const totalWithDiscount = discountedRentPrice + deposit + fuelCost;
    
    return {
      rentalDays: 1,
      rentPrice: singleDayPrice,
      deposit,
      totalWithDiscount,
      totalWithoutDiscount,
      discountAmount,
      fuelLiters,
      fuelCost
    };
  }

  const rentPrice = rentalDays * pricePerDay;
  const deposit = 250;
  const discountPercentage = 0.20;

  const totalWithoutDiscount = rentPrice + deposit + fuelCost;
  
  const discountedRentPrice = rentPrice * (1 - discountPercentage);
  const discountAmount = rentPrice - discountedRentPrice;
  
  const totalWithDiscount = discountedRentPrice + deposit + fuelCost;

  return {
    rentalDays,
    rentPrice,
    deposit,
    totalWithDiscount,
    totalWithoutDiscount,
    discountAmount,
    fuelLiters,
    fuelCost
  };
}
