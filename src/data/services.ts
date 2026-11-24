export type ServiceCategory = "Haircuts" | "Beard" | "Treatments";

export type Service = { name: string; category: ServiceCategory; description: string; price: number; duration: number };

export const services: Service[] = [
  { name: "Classic Haircut", category: "Haircuts", description: "A considered cut, tailored to your shape and daily routine.", price: 2000, duration: 40 },
  { name: "Signature Haircut", category: "Haircuts", description: "Our complete consultation, cut and considered finish.", price: 2500, duration: 50 },
  { name: "Skin Fade", category: "Haircuts", description: "A close, seamless fade with a clean, precise finish.", price: 2500, duration: 50 },
  { name: "Low Fade", category: "Haircuts", description: "Subtle graduation, shaped to sit naturally at the neckline.", price: 2500, duration: 50 },
  { name: "Mid Fade", category: "Haircuts", description: "Balanced contrast with detail blended through the sides.", price: 2500, duration: 50 },
  { name: "High Fade", category: "Haircuts", description: "A sharper silhouette with confident, clean graduation.", price: 2500, duration: 50 },
  { name: "Scissor Cut", category: "Haircuts", description: "Scissor-led shaping for natural movement and soft edges.", price: 2200, duration: 45 },
  { name: "Textured / Modern Cut", category: "Haircuts", description: "Personalised texture and shape with an easy, modern finish.", price: 2500, duration: 50 },
  { name: "Buzz Cut", category: "Haircuts", description: "An even, close cut finished with a clean outline.", price: 1500, duration: 25 },
  { name: "Kids Haircut (under 12)", category: "Haircuts", description: "A relaxed, thoughtful cut for younger guests.", price: 1500, duration: 30 },
  { name: "Beard Trim", category: "Beard", description: "A balanced trim that keeps your beard looking intentional.", price: 1000, duration: 20 },
  { name: "Beard Shape & Line-up", category: "Beard", description: "Defined lines and a shape that works with your features.", price: 1200, duration: 25 },
  { name: "Hot Towel Shave", category: "Beard", description: "A close, traditional shave with a warm towel finish.", price: 1500, duration: 30 },
  { name: "Hair & Beard Combo", category: "Beard", description: "A complete refresh: haircut, beard shaping and finish.", price: 3500, duration: 70 },
  { name: "Hair Wash", category: "Treatments", description: "A thorough cleanse to reset your hair and scalp.", price: 500, duration: 10 },
  { name: "Wash & Styling", category: "Treatments", description: "A fresh wash followed by a style shaped to your look.", price: 1200, duration: 25 },
  { name: "Hair Conditioning", category: "Treatments", description: "A restorative conditioning treatment for softer hair.", price: 1500, duration: 30 },
  { name: "Scalp Treatment", category: "Treatments", description: "A focused treatment that leaves your scalp refreshed.", price: 2000, duration: 40 },
];

export const formatPrice = (price: number) => `LKR ${price.toLocaleString("en-LK")}`;
