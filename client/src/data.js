import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from "react-icons/gi"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"
import { MdOutlineVilla } from "react-icons/md"

const placesData = [
  {
    id: "1",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/65496d15-3f82-4ca2-a03b-fec4d8dfd975.jpeg?im_w=1200",
    title: "HOOUD Apartments",
    date: "Jun 1 - 8",
    price: "397",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/acea938f-0f1f-4082-a169-92dd2cf0bfa8.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/40c2d3c0-c998-4d89-b3e6-6be156e4a435.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/efd1a152-2980-4f9d-96ca-2ed0a3ed0e5f.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/bf915e65-bcb2-4ef2-bc58-5a186d31da72.jpeg?im_w=720",
    beds: "4 beds",
    property: "Apartment in Khawr Fakkan",
    location: "Khawr Fakkan, Sharjah, United Arab Emirates",
    desc: "This unique place has a style all its own. Experience five-star service at our luxury serviced apartments designed with space and convenience of home, allowing you to discover the local lifestyle at its best. A new adventure, and breathtaking views await you in Khor Fakkan. We are eager to make you feel at home with our unique touch of luxury!",
    offer1: "Kitchen",
    offer2: "Wifi",
    offer3: "Washer",
    offer4: "Elevator",
    checkIn: "Check-in after 2:00 PM",
    checkOut: "Checkout before 11:00 AM",
    maxGuests: "6 guests maximum",
    rate: "5.0",
    reviews: "7"
  },
  {
    id: "2",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-562016386866522114/original/f1b4cf3c-77f8-4fbe-aa1f-5980a046cbcf.jpeg?im_w=1200",
    title: "Breath-Taking Greek style Farmhouse w/Private Pool",
    date: "Jun 4 - 9",
    price: "398",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-562016386866522114/original/2d246698-13cc-480d-863f-1612164dd56e.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/miso/Hosting-562016386866522114/original/428f4d04-125f-4414-9fe5-7d537a203d6e.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-562016386866522114/original/716365f6-25b1-46b9-b0cc-86b4a9bc4ed3.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/c97405c3-7c93-4497-8f1c-23a5f3ac1fcb.jpg?im_w=720",
    beds: "8 beds",
    property: "Farm stay in Khawr Fakkan",
    location: "Khawr Fakkan, Sharjah, United Arab Emirates",
    desc: "This Cheerful place will hold your breath. Enjoy the charming and quite surrounding while be close to all the attractions that lovely Khor Fakkan has to offer. Steps to the Beach, Old Market, Hiking, Horse Barns. Restaurants, Cafes and Groceries are walking distance.",
    offer1: "Garden view",
    offer2: "Pets allowed",
    offer3: "Private outdoor pool",
    offer4: "Wifi",
    checkIn: "Check-in after 3:00 PM",
    checkOut: "Checkout before 11:00 AM",
    maxGuests: "16 guests maximum",
    rate: "4.0",
    reviews: "14"
  },
  {
    id: "3",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-760928079501749062/original/edef27f6-202e-425f-b018-17c1ee9e2f20.jpeg?im_w=1200",
    title: "AmazingView, Apartment in Dubai Marina.",
    date: "Jun 13 - 18",
    price: "84",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-760928079501749062/original/e5b8fc0d-7b83-4f2e-9cef-0982880facba.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/b6efaf03-7573-4b4c-9970-7b2a911a9394.jpg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-760928079501749062/original/7b1da2ea-e5c2-4f39-bd7e-e7e3445f7d7d.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/8caa0326-07f7-432a-afce-a9631a15e12a.jpg?im_w=1200",
    beds: "4 beds",
    property: "Condo in Dubai",
    location: "Dubai, United Arab Emirates",
    desc: "One of Dubai's most exclusive neighbourhoods, Dubai Marina is set on a two-mile stretch of pristine sand facing the Persian Gulf. As gleaming yachts bob gently and towering skyscrapers glitter in the desert sun, locals and visitors wander palm-lined promenades, shop in glamorous boutiques and dine al fresco by elegant fountains. It's here that.",
    offer1: "Canal view",
    offer2: "City skyline view",
    offer3: "Shared outdoor poo",
    offer4: "Free washer - In unit",
    checkIn: "Check-in after 3:00 PM",
    checkOut: "Checkout before 12:00 AM",
    maxGuests: "4 guests maximum",
    rate: "4.5",
    reviews: "10"
  },
  {
    id: "4",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-52384714/original/0ac6e146-f47b-477b-bd39-d81db3ee201f.jpeg?im_w=1200",
    title: "MARINA & SEAVIEW PREMIUM 2 BEDROOM NEXT TO BEACH",
    date: "Jun 6 - 13",
    price: "97",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-52384714/original/034f0656-5ef3-41ee-b80d-8df0b2969df8.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/miso/Hosting-52384714/original/569e7e19-14f5-4e0d-9c27-f525253a5bf7.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-52384714/original/a80a6812-8342-431d-aadd-10ec3472523f.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/miso/Hosting-52384714/original/1df7ffa4-2f99-44e3-93c9-fe4e736c55bd.jpeg?im_w=720",
    beds: "3 beds",
    property: "Apartment in Dubai",
    location: "Dubai, United Arab Emirates",
    desc: "This's a 6 guest MARINA & SEA VIEW 2 bedroom apartment Located in Dubai Marina on the 2nd tallest residential building in the world 101 floors (The Princess Tower). You will have access to 97th floor lounge with free WiFi. Barasti Beach club, Marina Harbor & Tram is in front of the building. We are 15 minutes walking distance from Media city, Jumeirah beach & Sky dive. Under the building we got restaurants, supermarkets, coffee shops, Car rentals, pharmacy, saloon & The famous Marina Walk.",
    offer1: "Marina view",
    offer2: "Beach access - Beachfront",
    offer3: "Dedicated workspace",
    offer4: "Harbor view",
    checkIn: "Check-in after 3:00 PM",
    checkOut: "Checkout before 12:00 AM",
    maxGuests: "6 guests maximum",
    rate: "4.77",
    reviews: "5"
  },
  {
    id: "5",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-795475206155791076/original/5cd0a30a-e83a-4915-92b8-d48ee05f42af.jpeg?im_w=1200",
    title: "Your Desert Farm Getaway! Pool & Horseriding",
    date: "Jun 1 - 6",
    price: "221",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-795475206155791076/original/368f2e52-7c5a-453c-bef4-6e6931e5082d.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/miso/Hosting-795475206155791076/original/a4542060-524c-472a-b5f8-c1f453683477.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-795475206155791076/original/f91785e5-a2ca-442e-a044-8a7e89c23ac4.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/miso/Hosting-795475206155791076/original/f273b1f8-bdfc-4324-8d37-7a20da4dc354.jpeg?im_w=720",
    beds: "1 bed",
    property: "Farm stay in Al Batayih",
    location: "Al Batayih, Sharjah, United Arab Emirates",
    desc: "Escape from the city to your own private desert farm retreat to enjoy fresh air and simple life. This spot is perfect for any family & friends gathering, there is bbq area and pool. Horses are available at the farm for horse-riding (desert hack) and trainer available at additional cost.",
    offer1: "Desert view",
    offer2: "Free parking on premises",
    offer3: "TV",
    offer4: "Kitchen",
    checkIn: "Check-in after 3:00 PM",
    checkOut: "Checkout before 11:00 AM",
    maxGuests: "16 guests maximum",
    rate: "4.83",
    reviews: "27"
  },
  {
    id: "6",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-743386721653199151/original/9696cc88-b8ce-4c7a-b72d-c30cba48ab15.jpeg?im_w=1200",
    title: "Skyview Host (bed in 10 bed dorm) Mixed room",
    date: "Jun 9 - 14",
    price: "39",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-743386721653199151/original/42f5d4b6-e88e-4597-8ac1-d2b5b4c64124.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/miso/Hosting-743386721653199151/original/b1ca7bb2-4538-485d-8fce-8e6b50b07b92.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-743386721653199151/original/1c7475db-c2f6-41bd-9463-ea3126817553.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/miso/Hosting-743386721653199151/original/e27ad73a-649a-4c6e-987d-86228dc1ca49.jpeg?im_w=720",
    beds: "5 beds",
    property: "Shared room in Dubai",
    location: "Dubai, United Arab Emirates",
    desc: "Dubai Marina is a man-made canal city, located in the heart of Dubai, built along a 3km stretch of the Arabian Gulf. It is one of the most exclusive areas in Dubai and a popular destination for both locals and tourists alike.",
    offer1: "Bay view",
    offer2: "City skyline view",
    offer3: "Beach access",
    offer4: "Fast wifi - 65 Mbps",
    checkIn: "Check-in: 2:00 PM - 10:00 PM",
    checkOut: "Checkout before 12:00 PM",
    maxGuests: "10 guests maximum",
    rate: "4.89",
    reviews: "19"
  },
  {
    id: "7",
    mainImg:
      "https://a0.muscache.com/im/pictures/prohost-api/Hosting-613569884064400373/original/1af17999-9689-4493-aab8-20e0df269c7f.jpeg?im_w=1200",
    title: "Bright and Opulent 2BR with Lovely Marina Views!",
    date: "Jun 12 - 17",
    price: "130",
    img1: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-613569884064400373/original/1f46a568-765d-4298-9ffe-47b37abe0d81.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-613569884064400373/original/d6f7d581-1cde-472c-973f-5cc9beff020e.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-613569884064400373/original/8909f926-92ec-4728-960e-db485a363cef.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-613569884064400373/original/b49c6a27-39d2-41cd-ab96-a62d4f6a4602.jpeg?im_w=720",
    beds: "2 beds",
    property: "Apartment in Dubai",
    location: "Dubai, United Arab Emirates",
    desc: "Come home to my spacious and stylish apartment in the trendiest neighborhood - Dubai Marina. Minutes away from excellent restaurants and cafes and a short ride to the beach and shopping malls (Marina Mall/Mall of the Emirates).",
    offer1: "Kitchen",
    offer2: "Bathtub",
    offer3: "Patio or balcony",
    offer4: "Air conditioning",
    checkIn: "Check-in after 3:00 PM",
    checkOut: "Checkout before 11:00 AM",
    maxGuests: "4 guests maximum",
    rate: "4.58",
    reviews: "8"
  },
  {
    id: "8",
    mainImg:
      "https://a0.muscache.com/im/pictures/miso/Hosting-780802292790710535/original/c275b009-d679-4abb-a698-531bf05d21ef.jpeg?im_w=1200",
    title: "Out of Mood! Luxury Stay!",
    date: "Jun 2 - 7",
    price: "78",
    img1: "https://a0.muscache.com/im/pictures/miso/Hosting-780802292790710535/original/c67c7e81-fcdf-4c7a-af54-754560c99b75.jpeg?im_w=720",
    img2: "https://a0.muscache.com/im/pictures/miso/Hosting-780802292790710535/original/1e908b28-9eb6-4a47-a204-d30089870734.jpeg?im_w=720",
    img3: "https://a0.muscache.com/im/pictures/miso/Hosting-780802292790710535/original/24da60f4-8b9a-4e76-a794-9592767e387b.jpeg?im_w=720",
    img4: "https://a0.muscache.com/im/pictures/miso/Hosting-780802292790710535/original/6aa6cb9b-0e7b-4aa7-be87-ac717f5e7709.jpeg?im_w=720",
    beds: "1 beds",
    property: "Apartment in Abu Dhabi",
    location: "Abu Dhabi, United Arab Emirates",
    desc: "This unique place has a style all its own. Experience five-star service at our luxury serviced apartments designed with space and convenience of home, allowing you to discover the local lifestyle at its best. A new adventure, and breathtaking views await you in Khor Fakkan. We are eager to make you feel at home with our unique touch of luxury!",
    offer1: "65 HDTV with Netflix",
    offer2: "Wifi",
    offer3: "Canal view",
    offer4: "Security cameras on property",
    checkIn: "Check-in: 3:00 PM - 10:00 PM",
    checkOut: "Checkout before 11:00 AM",
    maxGuests: "2 guests maximum",
    rate: "5.0",
    reviews: "32"
  }
]

export default placesData

export const categories = [
  {
    label: "Serviced Apartment",
    icon: "https://cdn-icons-png.flaticon.com/128/88/88970.png",
  },
  {
    label: "Hotel Apartment",
    icon: "https://cdn-icons-png.flaticon.com/128/10365/10365182.png",
  },
  {
    label: "Villa",
    icon: "https://cdn-icons-png.flaticon.com/128/2935/2935898.png",
  },
  {
    label: "Hotel Room",
    icon: "https://cdn-icons-png.flaticon.com/128/5140/5140130.png",
  },
  {
    label: "Private Room",
    icon: "https://cdn-icons-png.flaticon.com/128/6934/6934759.png",
  },
  {
    label: "Campsite",
    icon: "https://cdn-icons-png.flaticon.com/128/7666/7666243.png",
  },
  {
    label: "Farmhouse",
    icon: "https://cdn-icons-png.flaticon.com/128/2134/2134519.png",
  },
  {
    label: "Unique Stays",
    icon: "https://cdn-icons-png.flaticon.com/128/67/67745.png",
  },
]

export const amenities = [
  {
    amenitie: "Wifi",
    icon: "https://cdn-icons-png.flaticon.com/128/2696/2696335.png",
  },
  {
    amenitie: "TV",
    icon: "https://cdn-icons-png.flaticon.com/128/3386/3386992.png",
  },
  {
    amenitie: "Washer",
    icon: "https://cdn-icons-png.flaticon.com/128/1010/1010385.png",
  },
  {
    amenitie: "Air conditioning",
    icon: "https://cdn-icons-png.flaticon.com/128/1530/1530297.png",
  },
  {
    amenitie: "Kitchen",
    icon: "https://cdn-icons-png.flaticon.com/128/1606/1606657.png",
  },
  {
    amenitie: "Exercise equipment",
    icon: "https://cdn-icons-png.flaticon.com/128/1414/1414446.png",
  },
  {
    amenitie: "Beach access",
    icon: "https://cdn-icons-png.flaticon.com/128/2664/2664589.png",
  },
  {
    amenitie: "Ski-in/Ski-out",
    icon: "https://cdn-icons-png.flaticon.com/128/1412/1412921.png",
  },
  {
    amenitie: "Piano",
    icon: "https://cdn-icons-png.flaticon.com/128/1286/1286652.png",
  },
  {
    amenitie: "Pool",
    icon: "https://cdn-icons-png.flaticon.com/128/2784/2784593.png",
  },
  {
    amenitie: "Elevator",
    icon: "https://cdn-icons-png.flaticon.com/128/637/637209.png",
  },
  {
    amenitie: "BBQ grill",
    icon: "https://cdn-icons-png.flaticon.com/128/823/823317.png",
  },
  {
    amenitie: "Dedicated workspace",
    icon: "https://cdn-icons-png.flaticon.com/128/1599/1599910.png",
  },
  {
    amenitie: "Hot tub",
    icon: "https://cdn-icons-png.flaticon.com/128/5139/5139174.png",
  },
  {
    amenitie: "Canal view",
    icon: "https://cdn-icons-png.flaticon.com/128/3152/3152754.png",
  },
  {
    amenitie: "Skyline view",
    icon: "https://cdn-icons-png.flaticon.com/128/1916/1916251.png",
  },
  {
    amenitie: "Free parking on premises",
    icon: "https://cdn-icons-png.flaticon.com/128/846/846296.png",
  },
]
