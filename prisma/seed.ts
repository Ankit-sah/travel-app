import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.package.deleteMany();
  await prisma.destination.deleteMany();

  // Create destinations
  const paris = await prisma.destination.create({
    data: {
      name: "Paris",
      slug: "paris",
      description:
        "Experience the romance and culture of the City of Light with our curated Parisian adventures.",
    },
  });

  const tokyo = await prisma.destination.create({
    data: {
      name: "Tokyo",
      slug: "tokyo",
      description:
        "Discover the perfect blend of ancient traditions and modern innovation in Japan's vibrant capital.",
    },
  });

  const bali = await prisma.destination.create({
    data: {
      name: "Bali",
      slug: "bali",
      description:
        "Unwind in paradise with stunning beaches, lush landscapes, and rich cultural experiences.",
    },
  });

  // Create packages
  const packages = [
    {
      slug: "paris-romantic-getaway",
      title: "Paris Romantic Getaway",
      description:
        "A 5-day romantic journey through Paris featuring iconic landmarks, fine dining, and intimate experiences. Visit the Eiffel Tower, Louvre Museum, Notre-Dame, and enjoy sunset cruises on the Seine. Includes luxury hotel stays, breakfast, and guided tours.",
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      ],
      price: 2499.99,
      duration: 5,
      destinationId: paris.id,
      highlights: [
        "Eiffel Tower visit with skip-the-line access",
        "Louvre Museum guided tour",
        "Seine River sunset cruise",
        "4-star hotel in central Paris",
        "Daily breakfast included",
      ],
    },
    {
      slug: "paris-cultural-exploration",
      title: "Paris Cultural Exploration",
      description:
        "Immerse yourself in Parisian culture with this 7-day comprehensive tour. Explore world-class museums, charming neighborhoods, art galleries, and indulge in authentic French cuisine. Perfect for art lovers and culture enthusiasts.",
      images: [
        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
      ],
      price: 3199.99,
      duration: 7,
      destinationId: paris.id,
      highlights: [
        "Visit to Musée d'Orsay and Centre Pompidou",
        "Montmartre walking tour",
        "Cooking class with a local chef",
        "Versailles day trip",
        "Art gallery visits",
      ],
    },
    {
      slug: "tokyo-adventure",
      title: "Tokyo Adventure",
      description:
        "Experience the electric energy of Tokyo in this 6-day adventure. From ancient temples to futuristic districts, enjoy the best of traditional and modern Japan. Includes sushi-making classes, temple visits, and shopping in Harajuku.",
      images: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      ],
      price: 2899.99,
      duration: 6,
      destinationId: tokyo.id,
      highlights: [
        "Shibuya Crossing and Harajuku exploration",
        "Senso-ji Temple visit",
        "Sushi-making experience",
        "Day trip to Mount Fuji",
        "Traditional ryokan stay",
      ],
    },
    {
      slug: "bali-tropical-paradise",
      title: "Bali Tropical Paradise",
      description:
        "Relax and rejuvenate in Bali's tropical paradise. This 8-day retreat includes beach time, temple visits, rice terrace tours, spa treatments, and authentic Balinese cuisine. Perfect for those seeking peace and natural beauty.",
      images: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      ],
      price: 1899.99,
      duration: 8,
      destinationId: bali.id,
      highlights: [
        "Beachfront resort accommodation",
        "Ubud rice terrace tour",
        "Traditional Balinese spa day",
        "Temple visits (Uluwatu, Tanah Lot)",
        "Sunrise volcano trek",
      ],
    },
    {
      slug: "bali-wellness-retreat",
      title: "Bali Wellness Retreat",
      description:
        "A transformative 10-day wellness journey in Bali. Includes yoga sessions, meditation, organic food, spa treatments, and cultural workshops. Designed for holistic healing and personal growth.",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      ],
      price: 2299.99,
      duration: 10,
      destinationId: bali.id,
      highlights: [
        "Daily yoga and meditation sessions",
        "Organic farm-to-table meals",
        "Healing spa treatments",
        "Cultural immersion workshops",
        "Villa accommodation in Ubud",
      ],
    },
  ];

  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }

  console.log("✅ Seed data created successfully!");
  console.log(`   - 3 destinations created`);
  console.log(`   - ${packages.length} packages created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

