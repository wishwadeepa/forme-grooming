export type Barber = {
    id: string;
    name: string;
    role: string;
    image: string;
    specialty: string;
    experience: string;
    bio: string;
};

export const barbers: Barber[] = [
    {
        id: "kavindu",
        name: "Kavindu Perera",
        role: "Founder · Head Barber",
        image: "/images/team/kavindu_perera.png",
        specialty: "Precision cuts & classic styling",
        experience: "8 years",
        bio: "Building confidence through considered cuts, attention to detail, and a personal approach to grooming.",
    },
    {
        id: "dilan",
        name: "Dilan Fernando",
        role: "Senior Barber",
        image: "/images/team/dilan_fernando.png",
        specialty: "Modern fades & textured cuts",
        experience: "6 years",
        bio: "A balance of contemporary styles and technical precision, with a focus on cuts that work beyond the chair.",
    },
    {
        id: "ashen",
        name: "Ashen Silva",
        role: "Barber",
        image: "/images/team/ashen_silva.png",
        specialty: "Scissor cuts & styling",
        experience: "4 years",
        bio: "Focused on shape, movement, and creating effortless styles that feel natural to each individual.",
    },
    {
        id: "ravindu",
        name: "Ravindu Jay",
        role: "Barber",
        image: "/images/team/Ravindu_jay.png",
        specialty: "Fades & detailed grooming",
        experience: "3 years",
        bio: "Sharp finishes, clean detailing, and a relaxed experience with a strong eye for the finer details.",
    },
];

export const getBarberById = (id: string) => {
    return barbers.find((barber) => barber.id === id);
};