"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { barbers } from "@/data/barbers/barbers";
import { services, formatPrice } from "@/data/services";

type Guest = { name: string; email: string; phone: string };
const labels = ["Service", "Barber", "Date & time", "Your details", "Review"];
const slots = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "18:30"];
const localDate = (date: Date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
const formatDate = (value: string) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("en-LK", { weekday: "long", day: "numeric", month: "long" }) : "—";

export default function BookingFlow() {
  const query = useSearchParams();
  const initialService = services.find((item) => item.name === query.get("service"))?.name ?? "";
  const [step, setStep] = useState(0);
  const [service, setService] = useState(initialService);
  const [barber, setBarber] = useState("any");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState<Guest>({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const dates = useMemo(() => Array.from({ length: 14 }, (_, index) => { const value = new Date(); value.setDate(value.getDate() + index + 1); return { value: localDate(value), day: String(value.getDate()).padStart(2, "0"), label: value.toLocaleDateString("en-LK", { weekday: "short" }) }; }), []);
  const chosen = services.find((item) => item.name === service);
  const barberName = barber === "any" ? "Any available barber" : barbers.find((item) => item.id === barber)?.name ?? "Any available barber";

  function continueFlow() {
    setError("");
    if (step === 0 && !service) return setError("Choose a service to continue.");
    if (step === 2 && (!date || !time)) return setError("Choose a date and time to continue.");
    if (step === 3) {
      if (!guest.name.trim() || !guest.email.trim() || !guest.phone.trim()) return setError("Please complete each field.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) return setError("Enter a valid email address.");
    }
    if (step === 4) return setConfirmed(true);
    setStep((value) => Math.min(4, value + 1));
  }

  if (confirmed) return <main id="main-content" className="booking-page"><section className="booking-confirmation"><span className="confirmation-mark">✓</span><span className="eyebrow">DEMO REQUEST COMPLETE</span><h1>Looking<br /><em>good.</em></h1><p>Thanks, {guest.name}. Your appointment details are ready for the studio. This is a frontend demo, so nothing has been sent or reserved.</p><div className="confirmation-summary"><span>{service}</span><span>{formatDate(date)} · {time}</span><span>{barberName}</span></div><Link href="/" className="button button-dark">Back to FORME <span>↗︎</span></Link></section></main>;

  return <main id="main-content" className="booking-page"><section className="booking-shell"><div><div className="booking-heading"><span className="eyebrow">FORME / APPOINTMENTS</span><h1>Make time for<br /><em>yourself.</em></h1><p>A few details, then we can take it from there.</p></div><div className="booking-panel"><div className="booking-progress" aria-label={`Step ${step + 1} of 5`}>{labels.map((label, index) => <div key={label} className={index === step ? "progress-step current" : index < step ? "progress-step completed" : "progress-step"}><span>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</span><small>{label}</small></div>)}</div><div className="booking-form-area"><div className="booking-step-title"><span className="eyebrow">STEP 0{step + 1} / 05</span><h2>{["Choose a service", "Choose your barber", "Pick a time", "A little about you", "Review your visit"][step]}</h2></div>
    {step === 0 && <div className="booking-services">{services.map((item) => <button key={item.name} type="button" className={service === item.name ? "booking-service chosen" : "booking-service"} onClick={() => setService(item.name)}><span><b>{item.name}</b><small>{item.duration} min</small></span><strong>{formatPrice(item.price)}</strong><i>{service === item.name ? "✓" : "+"}</i></button>)}</div>}
    {step === 1 && <div className="barber-options"><button className={barber === "any" ? "barber-option selected" : "barber-option"} onClick={() => setBarber("any")} type="button"><span className="any-avatar">F</span><span><b>Any available barber</b><small>First available with the right experience</small></span><i>{barber === "any" ? "✓" : "+"}</i></button>{barbers.map((person) => <button className={barber === person.id ? "barber-option selected" : "barber-option"} key={person.id} type="button" onClick={() => setBarber(person.id)}><span className="barber-avatar">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><span><b>{person.name}</b><small>{person.role} · {person.specialty}</small></span><i>{barber === person.id ? "✓" : "+"}</i></button>)}</div>}
    {step === 2 && <><div className="date-picker"><span className="eyebrow">NEXT 14 DAYS</span><div className="date-options">{dates.map((item) => <button type="button" className={date === item.value ? "date-option selected" : "date-option"} key={item.value} onClick={() => { setDate(item.value); setTime(""); }}><span>{item.label}</span><b>{item.day}</b></button>)}</div></div>{date && <div className="time-picker"><span className="eyebrow">SAMPLE TIMES · {formatDate(date)}</span><div className="time-options">{slots.map((slot) => <button type="button" className={time === slot ? "time-option selected" : "time-option"} key={slot} onClick={() => setTime(slot)}>{slot}</button>)}</div><p className="demo-note">Times shown are sample availability for this booking demonstration.</p></div>}</>}
    {step === 3 && <div className="details-fields"><label>Full name<input autoComplete="name" value={guest.name} onChange={(event) => setGuest({ ...guest, name: event.target.value })} placeholder="Your name" /></label><label>Email address<input autoComplete="email" type="email" value={guest.email} onChange={(event) => setGuest({ ...guest, email: event.target.value })} placeholder="you@example.com" /></label><label>Phone number<input autoComplete="tel" type="tel" value={guest.phone} onChange={(event) => setGuest({ ...guest, phone: event.target.value })} placeholder="+94 77 000 0000" /></label><p className="demo-note">Your details stay in this browser demo and are not submitted.</p></div>}
    {step === 4 && <div className="review-card"><span className="eyebrow">YOUR VISIT</span><div><span>Service</span><b>{chosen?.name}</b></div><div><span>Barber</span><b>{barberName}</b></div><div><span>Date & time</span><b>{formatDate(date)} · {time}</b></div><div><span>Guest</span><b>{guest.name} · {guest.phone}</b></div><div className="review-total"><span>Estimated total</span><b>{chosen ? formatPrice(chosen.price) : "—"}</b></div><p className="demo-note">This is a frontend demonstration. Confirming will not contact the studio or reserve a time.</p></div>}
    {error && <p className="form-error" role="alert">{error}</p>}<div className="booking-actions">{step > 0 && <button className="button button-quiet" type="button" onClick={() => { setError(""); setStep((value) => value - 1); }}>← Back</button>}<button className="button button-dark" type="button" onClick={continueFlow}>{step === 4 ? "Confirm demo request" : "Continue"} <span>↗︎</span></button></div></div></div></div><aside className="booking-aside"><span className="eyebrow">A NOTE ON BOOKING</span><p>This booking flow is a preview. Your selections stay on this page; no appointment is submitted or reserved.</p><div><span>STUDIO</span><b>No. 42, Havelock Road<br />Colombo 05, Sri Lanka</b></div><div><span>HOURS</span><b>Mon–Sat · 9:00–20:00<br />Sunday · 10:00–17:00</b></div></aside></section></main>;
}
