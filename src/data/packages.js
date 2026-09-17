export const packages = [
  {
    id: 'pkg-bali-escape',
    destinationId: 'bali',
    title: 'Bali Island Bliss & Culture Discovery',
    duration: '7 Days / 6 Nights',
    price: 899,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      '4-star boutique villa accommodation with daily breakfast',
      'Private air-conditioned chauffeur for all day excursions',
      'All temple entry fees and traditional dance performances',
      'Guided snorkeling tour at Nusa Penida with manta rays',
      'Authentic Balinese cooking class and market tour'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Seminyak Sunset Welcome', description: 'Arrive at Ngurah Rai Airport, private transfer to your villa. Relax by the pool before enjoying a welcome seafood dinner along Seminyak beach.' },
      { day: 2, title: 'Ubud Cultural Heart & Monkey Forest', description: 'Journey to Ubud. Visit the sacred Monkey Forest, explore Ubud Palace, and bargain for handicrafts in the vibrant traditional art market.' },
      { day: 3, title: 'Tegallalang Terraces & Waterfall Hike', description: 'Walk through the breathtaking emerald Tegallalang rice terraces, experience a jungle swing, and swim under the refreshing cascades of Tegenungan Waterfall.' },
      { day: 4, title: 'Mount Batur Sunrise & Hot Springs', description: 'Optional early sunrise trek to Mount Batur crater, followed by soothing volcanic hot springs and a tour of a local organic coffee plantation.' },
      { day: 5, title: 'Nusa Penida Island Speedboat Day', description: 'Speedboat cruise to Nusa Penida. Marvel at Kelingking T-Rex cliff, swim at Angel’s Billabong, and snorkel with majestic manta rays in Crystal Bay.' },
      { day: 6, title: 'Uluwatu Clifftop Temple & Kecak Dance', description: 'Spend the morning relaxing in Canggu. In the late afternoon, head to Uluwatu Temple perched on a 70m cliff for an exhilarating fire-lit Kecak dance.' },
      { day: 7, title: 'Souvenirs & Departure', description: 'Enjoy your final tropical breakfast, visit local souvenir artisans, and private transfer back to the airport for your flight home.' }
    ]
  },
  {
    id: 'pkg-paris-romance',
    destinationId: 'paris',
    title: 'Parisian Elegance & Loire Valley Splendor',
    duration: '6 Days / 5 Nights',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      '5-star hotel in Saint-Germain-des-Prés',
      'Skip-the-line VIP tickets to Eiffel Tower & Louvre',
      'Bateaux Mouches Seine River gourmet champagne dinner',
      'Day excursion to Palace of Versailles with royal gardens guide',
      'Private French pastry and macaron masterclass'
    ],
    itinerary: [
      { day: 1, title: 'Bonjour Paris & Seine Sunset Cruise', description: 'Check into your hotel in the historic Latin Quarter. Settle in and embark on a scenic evening Seine cruise with live accordion music and champagne.' },
      { day: 2, title: 'Louvre Treasures & Tuileries Gardens', description: 'Enjoy priority morning entry to the Louvre Museum to admire Mona Lisa and Venus de Milo. Stroll through the lush Tuileries to Place de la Concorde.' },
      { day: 3, title: 'Bohemian Montmartre & Eiffel Tower Summit', description: 'Ascend to the hilltop of Montmartre to see Sacré-Cœur and artist squares. In the evening, ascend the Eiffel Tower to witness Paris sparkle at midnight.' },
      { day: 4, title: 'Royal Splendor at Versailles', description: 'Take a private excursion to the Hall of Mirrors and royal fountain gardens at Château de Versailles. Lunch at the Queen’s Hamlet.' },
      { day: 5, title: 'Macaron Workshop & Fashion Le Marais', description: 'Learn the secret art of French macarons with a master chef. Spend your afternoon wandering art galleries, designer boutiques, and cafes in Le Marais.' },
      { day: 6, title: 'Au Revoir Paris', description: 'Enjoy a leisurely breakfast of warm croissants and espresso before your private airport transfer.' }
    ]
  },
  {
    id: 'pkg-santorini-sunset',
    destinationId: 'santorini',
    title: 'Santorini Caldera & Wine Odyssey',
    duration: '5 Days / 4 Nights',
    price: 1180,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Cliffside suite with private jacuzzi facing the caldera',
      'Semi-private catamaran cruise with Greek BBQ & open bar',
      'Wine tasting tour of 3 historic volcanic vineyards',
      'All island transfers and daily breakfast on your terrace',
      'Sunset photography session in Oia'
    ],
    itinerary: [
      { day: 1, title: 'Caldera Check-in & Fira Stroll', description: 'Arrive at Santorini airport, transferred to your clifftop cave suite. Relax in your private hot tub overlooking the shimmering blue volcano caldera.' },
      { day: 2, title: 'Catamaran Sailing & Volcanic Hot Springs', description: 'Board a luxury catamaran. Sail past Red Beach and White Beach, swim in sulfurous volcanic hot springs, and enjoy freshly grilled souvlaki on board.' },
      { day: 3, title: 'Ancient Akrotiri & Volcanic Vineyards', description: 'Explore the prehistoric bronze-age ruins of Akrotiri, preserved in volcanic ash. Later, visit cliffside wineries for a sommelier-led wine tasting of crisp Assyrtiko.' },
      { day: 4, title: 'The Iconic Oia Golden Sunset', description: 'Hike the scenic cliff path or take an open-top transfer to Oia. Wander through blue-domed alleys and secure prime sunset viewing over the Aegean.' },
      { day: 5, title: 'Morning Swim & Departure', description: 'A final dip in the infinity pool and a relaxed terrace breakfast before your transfer to the ferry port or airport.' }
    ]
  },
  {
    id: 'pkg-dubai-luxury',
    destinationId: 'dubai',
    title: 'Futuristic Dubai & Desert Safari Extravaganza',
    duration: '5 Days / 4 Nights',
    price: 980,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      '5-star hotel accommodation near Downtown Dubai',
      'At The Top - Burj Khalifa Level 148 VIP tickets',
      'Thrilling Red Dune desert safari with camel ride and BBQ dinner',
      'Dubai Marina private luxury yacht cruise at sunset',
      'Private round-trip airport transfers'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Downtown Dubai Fountains', description: 'Welcome to Dubai. Check into your luxury hotel. Spend your evening watching the choreographed Dubai Fountain show outside the Dubai Mall.' },
      { day: 2, title: 'Burj Khalifa & Modern Marvels', description: 'Ascend to the 148th floor of the world’s tallest tower for panoramic desert-and-sea views. Explore the Dubai Frame and the futuristic Museum of the Future.' },
      { day: 3, title: '4x4 Red Dunes Safari & Bedouin Camp', description: 'Afternoon dune bashing in powerful 4WD cruisers across golden sand dunes. Enjoy sandboarding, camel rides, henna art, and a feast under the desert stars.' },
      { day: 4, title: 'Old Souks, Abra Ride & Marina Yacht', description: 'Discover historical Dubai: Gold and Spice Souks, ride a traditional wooden Abra across Dubai Creek, followed by an evening yacht cruise in Dubai Marina.' },
      { day: 5, title: 'Farewell Dubai', description: 'Relax at Jumeirah Beach or do last-minute shopping at Mall of the Emirates before your private transfer to DXB airport.' }
    ]
  },
  {
    id: 'pkg-kyoto-zen',
    destinationId: 'kyoto',
    title: 'Kyoto Ancient Traditions & Bamboo Wonders',
    duration: '6 Days / 5 Nights',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Traditional Ryokan stay with private Onsen bath experience',
      'Multi-course Kaiseki dining experiences included',
      'Private certified English-speaking Kyoto heritage guide',
      'Authentic Tea Ceremony with a tea master in Gion',
      '7-Day JR Pass voucher for regional bullet trains'
    ],
    itinerary: [
      { day: 1, title: 'Bullet Train Arrival & Machiya Welcome', description: 'Arrive via Shinkansen into Kyoto station. Check into your tranquil traditional ryokan and enjoy a kaiseki banquet.' },
      { day: 2, title: 'Fushimi Inari Torii Path & Sake District', description: 'Hike through the 10,000 bright vermilion gates of Fushimi Inari-taisha at dawn, followed by sake tasting in the historic Fushimi brewery quarter.' },
      { day: 3, title: 'Arashiyama Bamboo Forest & Tenryu-ji', description: 'Walk through the towering Arashiyama bamboo path, cross the iconic Togetsukyo Bridge, and feed wild macaques at Iwatayama Monkey Park.' },
      { day: 4, title: 'Golden Pavilion & Zen Rock Gardens', description: 'Admire Kinkaku-ji (Golden Pavilion) reflected in its serene pond, then contemplate the mysterious raked dry gravel garden of Ryoan-ji.' },
      { day: 5, title: 'Gion Evening Walk & Tea Ceremony', description: 'Experience an authentic tea ceremony in an antique wooden teahouse. In the evening, explore the lantern-lit alleys of Gion in search of geiko and maiko.' },
      { day: 6, title: 'Nara Day Excursion & Farewell', description: 'Morning trip to Nara Park to bow to sacred free-roaming deer and view the colossal bronze Buddha at Todai-ji before journeying onwards.' }
    ]
  },
  {
    id: 'pkg-swiss-peaks',
    destinationId: 'swiss-alps',
    title: 'Swiss Alps Majesty: Matterhorn & Jungfrau',
    duration: '7 Days / 6 Nights',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'First-class Swiss Travel Pass for all trains, boats, and cable cars',
      '4-star alpine chalet hotels in Zermatt and Interlaken',
      'Gornergrat cogwheel train ticket with Matterhorn view',
      'Jungfraujoch Top of Europe excursion',
      'Traditional Swiss fondue and raclette dinner'
    ],
    itinerary: [
      { day: 1, title: 'Zurich to Zermatt Scenic Rail', description: 'Board the scenic Swiss train winding through dramatic mountain valleys to car-free Zermatt. First glimpse of the iconic Matterhorn.' },
      { day: 2, title: 'Gornergrat & Riffelsee Lake Reflection', description: 'Ride the highest open-air cogwheel railway up Gornergrat (3,089m). Walk to Riffelsee to capture the mirror reflection of the Matterhorn in the lake.' },
      { day: 3, title: 'Glacier Paradise & Alpine Village Walk', description: 'Take the cable car to Matterhorn Glacier Paradise and explore its ice palace. Evening Swiss cheese fondue dinner in historic Zermatt village.' },
      { day: 4, title: 'Scenic Train to Interlaken & Lake Brienz', description: 'Travel past turquoise alpine lakes to Interlaken. Cruise across the crystal glacial waters of Lake Brienz on a vintage steamboat.' },
      { day: 5, title: 'Jungfraujoch - Top of Europe', description: 'Ascend through the Eiger north face on the modern Eiger Express cable car to Jungfraujoch (3,454m), Europe’s highest railway station.' },
      { day: 6, title: 'Grindelwald First Cliff Walk', description: 'Cross the thrill-inducing First Cliff Walk suspended above sheer mountain precipices. Hike to the idyllic mountain lake Bachalpsee.' },
      { day: 7, title: 'Departure via Lucerne', description: 'Scenic train to Lucerne to stroll across the Chapel Bridge before departing to Zurich Airport.' }
    ]
  },
  {
    id: 'pkg-maldives-paradise',
    destinationId: 'maldives',
    title: 'Maldives Overwater Luxury Retreat',
    duration: '6 Days / 5 Nights',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      '5-star private overwater villa with ocean slide and plunge pool',
      'Round-trip scenic seaplane transfers from Malé',
      'All-inclusive gourmet dining and premium beverage plan',
      'Guided house reef snorkeling and manta ray safari',
      'Couple’s signature 90-minute overwater spa massage'
    ],
    itinerary: [
      { day: 1, title: 'Seaplane Arrival & Villa Welcome', description: 'Breathtaking seaplane flight over turquoise atolls. Check into your overwater villa and plunge straight into the crystal warm Indian Ocean.' },
      { day: 2, title: 'Snorkeling with Sea Turtles & Coral Reefs', description: 'Explore the vibrant house reef with a resident marine biologist. Spot green sea turtles, clownfish, and harmless reef sharks.' },
      { day: 3, title: 'Spa Sanctuary & Undersea Dining', description: 'Relax with a rejuvenating massage listening to gentle ocean waves. In the evening, dine surrounded by aquatic marine life in an underwater glass restaurant.' },
      { day: 4, title: 'Sunset Dolphin Catamaran Cruise', description: 'Board a luxury catamaran as spinner dolphins leap in the golden wake. Enjoy canapés and chilled champagne as twilight descends.' },
      { day: 5, title: 'Sandbank Picnic & Watersports', description: 'Boat trip to a secluded deserted sandbank for a private picnic lunch. Afternoon paddleboarding and kayaking in the shallow lagoon.' },
      { day: 6, title: 'Farewell Tropical Island', description: 'One last sunrise swim and floating breakfast in your pool before boarding your seaplane back to Malé.' }
    ]
  },
  {
    id: 'pkg-cape-wild',
    destinationId: 'cape-town',
    title: 'Cape Town Oceans, Winelands & Safari',
    duration: '7 Days / 6 Nights',
    price: 1050,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Waterfront luxury hotel accommodation',
      'Table Mountain revolving cable car priority pass',
      'Full-day Cape Peninsula tour with Boulders Beach penguins',
      'Stellenbosch & Franschhoek private wine tram tour',
      'Big Five private game drive safari experience'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & V&A Waterfront Harbor', description: 'Arrive in Cape Town. Settle into your hotel at Victoria & Alfred Waterfront. Savor fresh seafood as the sun sets behind Table Mountain.' },
      { day: 2, title: 'Table Mountain & Vibrant Bo-Kaap', description: 'Ride the 360-degree rotating cableway to the summit of Table Mountain. Stroll past colorful pastel houses in historic Bo-Kaap.' },
      { day: 3, title: 'Cape Peninsula & Boulders Beach Penguins', description: 'Drive the breathtaking Chapman’s Peak cliff road. Meet hundreds of wild African penguins waddling on the white sands of Boulders Beach.' },
      { day: 4, title: 'Franschhoek Wine Tram Odyssey', description: 'Board the charming open-air Wine Tram through the Franschhoek valley. Sample award-winning Chenin Blanc and Pinotage paired with artisanal cheeses.' },
      { day: 5, title: 'Big Five Safari Day Reserve', description: 'Early departure for an exhilarating open-vehicle game drive. Spot lions, elephants, rhinos, buffalos, and leopards in a pristine private reserve.' },
      { day: 6, title: 'Kirstenbosch Gardens & Sunset Lookout', description: 'Walk above the tree canopy on the Centenary Tree Canopy Walkway in Kirstenbosch Botanical Gardens. Sunset drinks at Camps Bay beach.' },
      { day: 7, title: 'Last Views & Departure', description: 'Enjoy breakfast with views of Lion’s Head before your private airport transfer.' }
    ]
  }
]
