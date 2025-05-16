import dog1 from '../images/pets/dog1.webp'
import dog2 from '../images/pets/dog2.jpg'
import dog3 from '../images/pets/dog3.jpg'
import cat1 from '../images/pets/cat1.jpg'
import cat2 from '../images/pets/cat2.jpg'
import cat3 from '../images/pets/cat3.jpg'

export const MyPets = [
  {
    id: 1,
    name: "Buddy",
    age: 3,
    weight: 12.5,
    height: 45,
    image: cat3,
    latestVaccine: "2024-03-15",
    lastBath: "2024-03-20",
    lastWalk: "2024-03-22",
    breed: "Golden Retriever",
    medicalHistory: [
      { date: "2024-02-10", description: "Deworming" },
      { date: "2023-12-05", description: "Rabies Vaccine" }
    ],
    upcomingVaccines: [
      { date: "2024-06-01", description: "Canine Influenza Vaccine" }
    ],
    owner: {
      name: "John Doe",
      contact: "+1234567890"
    }
  },
  {
    id: 2,
    name: "Luna",
    age: 2,
    weight: 8.0,
    height: 38,
    image: dog1,
    latestVaccine: "2024-03-12",
    lastBath: "2024-03-18",
    lastWalk: "2024-03-22",
    breed: "Beagle",
    medicalHistory: [
      { date: "2023-11-25", description: "Deworming" },
      { date: "2023-09-14", description: "Distemper Vaccine" }
    ],
    upcomingVaccines: [
      { date: "2024-06-10", description: "Bordetella Vaccine" }
    ],
    owner: {
      name: "Sarah Smith",
      contact: "+1234567891"
    }
  },
  {
    id: 3,
    name: "Max",
    age: 4,
    weight: 18.0,
    height: 50,
    image: dog2,
    latestVaccine: "2024-03-01",
    lastBath: "2024-03-10",
    lastWalk: "2024-03-20",
    breed: "German Shepherd",
    medicalHistory: [
      { date: "2024-01-15", description: "Deworming" },
      { date: "2023-12-05", description: "Rabies Vaccine" }
    ],
    upcomingVaccines: [
      { date: "2024-07-01", description: "Lyme Disease Vaccine" }
    ],
    owner: {
      name: "Michael Johnson",
      contact: "+1234567892"
    }
  },
  {
    id: 4,
    name: "Bella",
    age: 1,
    weight: 6.5,
    height: 35,
    image: dog3,
    latestVaccine: "2024-03-10",
    lastBath: "2024-03-16",
    lastWalk: "2024-03-19",
    breed: "French Bulldog",
    medicalHistory: [
      { date: "2023-11-22", description: "Deworming" },
      { date: "2023-09-28", description: "Kennel Cough Vaccine" }
    ],
    upcomingVaccines: [
      { date: "2024-06-25", description: "Parvovirus Booster" }
    ],
    owner: {
      name: "Emily Davis",
      contact: "+1234567893"
    }
  },
  {
    id: 5,
    name: "Charlie",
    age: 6,
    weight: 22.0,
    height: 60,
    image: cat1,
    latestVaccine: "2024-02-28",
    lastBath: "2024-03-15",
    lastWalk: "2024-03-21",
    breed: "Labrador Retriever",
    medicalHistory: [
      { date: "2024-01-10", description: "Deworming" },
      { date: "2023-12-05", description: "Rabies Vaccine" }
    ],
    upcomingVaccines: [
      { date: "2024-06-15", description: "DHPP Booster" }
    ],
    owner: {
      name: "Robert Lee",
      contact: "+1234567894"
    }
  },
  {
    id: 6,
    name: "Milo",
    age: 5,
    weight: 9.5,
    height: 42,
    image: cat2,
    latestVaccine: "2024-03-05",
    lastBath: "2024-03-12",
    lastWalk: "2024-03-19",
    breed: "Cocker Spaniel",
    medicalHistory: [
      { date: "2023-12-01", description: "Deworming" },
      { date: "2023-10-10", description: "Leptospirosis Vaccine" }
    ],
    upcomingVaccines: [
      { date: "2024-06-20", description: "Coronavirus Vaccine" }
    ],
    owner: {
      name: "Alice Brown",
      contact: "+1234567895"
    }
  }
];
