import type { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "@/components/booking/booking-flow";

export const metadata: Metadata = { title: "Book an appointment", description: "Choose a service and explore a sample appointment flow at FORME Grooming Studio, Colombo 05." };

export default function BookingPage() {
  return <Suspense fallback={<main id="main-content" className="booking-page"><p className="eyebrow">FORME / APPOINTMENTS</p></main>}><BookingFlow /></Suspense>;
}
