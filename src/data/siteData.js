import { cloudinaryImage, cloudinaryVideo } from "../services/cloudinaryMedia";

export const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Booking", to: "/booking" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const salonPhoneNumbers = [
  { label: "Phone", value: "+971 589178814", href: "tel:+971589178814" },
  { label: "Phone", value: "+971 52 220 2609", href: "tel:+971522202609" },
];

export const salonInfo = {
  name: "Ivonne Orchard",
  footerDescription:
    "Modern salon care for busy Dubai clients, with elevated hair, nails, makeup, and bridal experiences backed by easy mobile booking and WhatsApp-friendly support.",
  phone: salonPhoneNumbers.map((number) => number.value).join(" / "),
  phoneHref: salonPhoneNumbers[0].href,
  whatsapp: "+971 52 220 2609",
  whatsappHref: "https://wa.me/971522202609",
  email: "aggiea018@gmail.com",
  emailHref: "mailto:aggiea018@gmail.com",
  location: "Dubai, United Arab Emirates",
  neighborhood: "Downtown Dubai Studio",
  address: "Downtown Dubai",
};

export const heroImage = {
  src: cloudinaryImage(
    "ivonne-orchard/images/salon/interior/interior-03-ultra-hd",
    "f_auto,q_auto,w_2200",
  ),
  srcSet: "",
  sizes: "100vw",
  alt: "Ivonne Orchard salon interior with chandelier lighting, mirrors, and styling chairs",
};

export const salonTourVideo = cloudinaryVideo("ivonne-orchard/videos/salon-tour");

export const homeValueHighlights = [
  {
    title: "Editorial-Level Finishes",
    description:
      "Every appointment is designed to look polished in real life and in photos, whether it is a weekday refresh or an event look.",
  },
  {
    title: "Warm, Planned Appointments",
    description:
      "We prep for your session before you arrive so the experience feels calm, organized, and intentionally paced.",
  },
  {
    title: "Beauty Care Across Categories",
    description:
      "Hair, nails, treatments, glam, and bridal styling live in one curated catalogue so planning a full look is easy.",
  },
];

export const homeStats = [
  { value: "2,500+", label: "appointments delivered" },
  { value: "4.9/5", label: "average repeat rating" },
  { value: "8+", label: "signature beauty rituals" },
];

export const bookingSteps = [
  "Pick a service and preferred time slot.",
  "Confirm your booking details on mobile.",
  "Receive a WhatsApp follow-up for fast support.",
];

export const bookingFlowSteps = [
  "Select Service",
  "Select Date & Time",
  "Your Details",
];

export const bookingTimeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
];

export const galleryImages = [
  {
    title: "Protective Styles",
    group: "Braids",
    category: "Braids & installs",
    caption: "Lightweight braids and installs designed to move beautifully and last well.",
    size: "tall",
    image:
      "https://images.pexels.com/photos/8422334/pexels-photo-8422334.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Editorial portrait of a woman with intricate braided protective styling",
  },
  {
    title: "Bridal Looks",
    group: "Bridal",
    category: "Events",
    caption: "Soft glamour with clean skin, long-wear makeup, and elegant finishing touches.",
    image:
      "https://images.pexels.com/photos/32111039/pexels-photo-32111039.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Elegant bride wearing a detailed veil with polished bridal makeup",
  },
  {
    title: "Nail Finishes",
    group: "Nails",
    category: "Gloss & detail",
    caption: "Neat shaping, smooth cuticles, and color that feels elevated.",
    image:
      "https://images.pexels.com/photos/6135675/pexels-photo-6135675.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Fresh salon manicure with a glossy gel finish",
  },
  {
    title: "Natural Hair Care",
    group: "Hair",
    category: "Healthy texture",
    caption: "Treatments and styling choices that keep natural hair nourished and defined.",
    size: "wide",
    image:
      "https://images.pexels.com/photos/7755518/pexels-photo-7755518.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Healthy natural hair styling during a salon appointment",
  },
  {
    title: "Soft Blowouts",
    group: "Hair",
    category: "Signature styling",
    caption: "Bouncy movement, polished layers, and a soft finish for day-to-night wear.",
    image:
      "https://images.pexels.com/photos/14615063/pexels-photo-14615063.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Stylist blow drying a client's hair with a round brush in a salon",
  },
  {
    title: "Scalp Rituals",
    group: "Hair",
    category: "Care & reset",
    caption: "Steam and scalp therapy sessions that support stronger, healthier styling results.",
    image:
      "https://images.pexels.com/photos/8834050/pexels-photo-8834050.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Client enjoying a gentle salon hair wash and scalp massage",
  },
  {
    title: "Wig Installs",
    group: "Wigs",
    category: "Seamless finish",
    caption: "Natural-looking installs with carefully blended hairlines and customized styling.",
    size: "tall",
    image:
      "https://images.pexels.com/photos/6923437/pexels-photo-6923437.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Hairstylist fitting a curly black wig on a client in a salon",
  },
  {
    title: "Loc Styling",
    group: "Braids",
    category: "Texture care",
    caption: "Fresh retwists and styling patterns that keep locs intentional and camera-ready.",
    image:
      "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Freshly styled locs in a salon setting",
  },
  {
    title: "Soft Glam Beauty",
    group: "Makeup",
    category: "Makeup artistry",
    caption: "Light-catching makeup for dinners, content shoots, and milestone events.",
    size: "wide",
    image:
      "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Soft glam makeup application done by a beauty artist",
  },
];

export const salonInteriorImages = [
  {
    title: "Styling Stations",
    caption: "Mirrored styling stations with salon lighting and comfortable seating.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-01"),
    alt: "Ivonne Orchard salon styling station with mirrors and chairs",
  },
  {
    title: "Beauty Lounge",
    caption: "A compact, polished room set up for hair, nails, and beauty care.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-02"),
    alt: "Ivonne Orchard salon beauty lounge interior",
  },
  {
    title: "Salon Mirrors",
    caption: "Gold-framed mirrors and bright lighting for detailed finishing work.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-03"),
    alt: "Gold framed salon mirrors and styling chairs",
  },
  {
    title: "Nail & Hair Space",
    caption: "The main service area arranged for multi-category appointments.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-04"),
    alt: "Salon nail and hair service area",
  },
  {
    title: "Wash & Care Area",
    caption: "A dedicated care corner for wash, treatment, and reset appointments.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-05"),
    alt: "Salon wash and care area",
  },
  {
    title: "Pedicure Chair",
    caption: "Comfortable pedicure seating with tools close at hand.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-06"),
    alt: "Salon pedicure chair and nail polish wall",
  },
  {
    title: "Client Seating",
    caption: "A practical, calm setup for appointment-first visits.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-07"),
    alt: "Salon client seating and styling area",
  },
  {
    title: "Main Studio",
    caption: "The full studio view with styling chairs, mirrors, and chandelier lighting.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-08"),
    alt: "Full Ivonne Orchard salon studio interior",
  },
  {
    title: "Treatment Room",
    caption: "A clean treatment room detail from the salon interior.",
    image: cloudinaryImage("ivonne-orchard/images/salon/interior/interior-09"),
    alt: "Salon treatment room interior detail",
  },
  {
    title: "Original Salon View",
    caption: "An extra original view from the salon photo set.",
    image: cloudinaryImage("ivonne-orchard/images-source/image1"),
    alt: "Original Ivonne Orchard salon view",
  },
  {
    title: "Original Styling Station",
    caption: "An original salon styling-station photo from the uploaded media set.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0096"),
    alt: "Original Ivonne Orchard styling station photo",
  },
  {
    title: "Studio Detail",
    caption: "A close look at the studio setup from the original media folder.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0097"),
    alt: "Ivonne Orchard salon studio detail",
  },
  {
    title: "Original Nail Space",
    caption: "A second original salon angle showing the service space.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0100"),
    alt: "Original Ivonne Orchard nail and service space",
  },
  {
    title: "Original Care Corner",
    caption: "A care-area photo from the uploaded original salon set.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0103"),
    alt: "Original Ivonne Orchard care area",
  },
  {
    title: "Original Studio Seating",
    caption: "Client seating and salon details from the original media folder.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0106"),
    alt: "Original Ivonne Orchard studio seating",
  },
  {
    title: "Original Treatment Detail",
    caption: "An additional treatment-room detail from the uploaded images.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0107"),
    alt: "Original Ivonne Orchard treatment-room detail",
  },
  {
    title: "Salon Finish Area",
    caption: "Another original salon angle for clients browsing the space.",
    image: cloudinaryImage("ivonne-orchard/images-source/IMG-20260426-WA0108"),
    alt: "Ivonne Orchard salon finish area",
  },
];

export const footerImage = {
  image: cloudinaryImage("ivonne-orchard/images/salon/footer/footer-spa"),
  alt: "Salon spa essentials arranged on a pink background",
};

export const logoImage = cloudinaryImage(
  "ivonne-orchard/images/ivonne-logo",
  "f_auto,q_auto,w_240",
);

export const staffProfiles = [
  {
    name: "Lead Stylist",
    initials: "LS",
    role: "Hair & Styling Lead",
    bio: "Leads consultations, styling plans, and polished finishes for everyday and occasion looks.",
    specialties: ["Silk press", "Blowouts", "Hair care"],
    image: cloudinaryImage("ivonne-orchard/images/salon/staff/staff-01"),
    alt: "Lead stylist portrait",
  },
  {
    name: "Braids Specialist",
    initials: "BS",
    role: "Braids Expert",
    bio: "Focuses on neat parting, comfortable installs, and protective styles that last well.",
    specialties: ["Knotless", "Cornrows", "Loc styling"],
    image: cloudinaryImage("ivonne-orchard/images/salon/staff/staff-02"),
    alt: "Braids specialist portrait",
  },
  {
    name: "Wig Artist",
    initials: "WA",
    role: "Wig Install Artist",
    bio: "Creates clean hairlines, secure installs, and customized styling for natural-looking finishes.",
    specialties: ["Wig installs", "Customization", "Styling"],
    image: cloudinaryImage("ivonne-orchard/images/salon/staff/staff-03"),
    alt: "Wig artist portrait",
  },
  {
    name: "Nail Technician",
    initials: "NT",
    role: "Nail Care Specialist",
    bio: "Handles shaping, prep, color, and detail work for neat manicures and elevated nail finishes.",
    specialties: ["Gel polish", "Nail art", "Manicure"],
    image: cloudinaryImage("ivonne-orchard/images/salon/staff/staff-04"),
    alt: "Salon coordinator portrait",
  },
];

export const homeTestimonials = [
  {
    name: "Aisha Al Mansoori",
    detail: "Downtown Dubai",
    review:
      "The booking process was quick on my phone and the silk press came out clean, glossy, and lasting through the whole week.",
    avatar:
      "https://images.pexels.com/photos/30371813/pexels-photo-30371813.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Aisha Al Mansoori smiling",
  },
  {
    name: "Leila Haddad",
    detail: "Dubai Marina",
    review:
      "I loved how easy it was to confirm my appointment on WhatsApp and the team was warm, calm, and very professional.",
    avatar:
      "https://images.pexels.com/photos/34221950/pexels-photo-34221950.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Leila Haddad after a salon visit",
  },
  {
    name: "Priya Nair",
    detail: "Business Bay",
    review:
      "Good prices, neat service, and a salon experience that feels reliable every time I visit.",
    avatar:
      "https://images.pexels.com/photos/8560506/pexels-photo-8560506.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Priya Nair with a polished beauty look",
  },
  {
    name: "Sara Khan",
    detail: "Jumeirah",
    review:
      "My knotless braids were light, neat, and exactly the length I asked for. The finish felt premium.",
    avatar:
      "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Sara Khan smiling after a salon visit",
  },
  {
    name: "Nour El-Sayed",
    detail: "Palm Jumeirah",
    review:
      "The contact page details helped me plan my visit fast, and the team kept me updated beautifully before arrival.",
    avatar:
      "https://images.pexels.com/photos/3775156/pexels-photo-3775156.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Nour El-Sayed in natural light",
  },
  {
    name: "Maria Santos",
    detail: "Al Barsha",
    review:
      "I booked soft glam for an event and the makeup looked expensive, soft, and photogenic from day to night.",
    avatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Maria Santos with a glam beauty look",
  },
  {
    name: "Fatima Al Zahra",
    detail: "City Walk",
    review:
      "The manicure and pedicure felt like an actual self-care ritual, not just a quick service. I will be back.",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Fatima Al Zahra smiling gently",
  },
  {
    name: "Amira Hassan",
    detail: "Arabian Ranches",
    review:
      "Their bridal prep was so organized. Everyone in our group looked cohesive and there was zero chaos on the morning.",
    avatar:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=240",
    avatarAlt: "Portrait of Amira Hassan looking elegant",
  },
];

export const contactDetails = [
  ...salonPhoneNumbers.map((number, index) => ({
    label: `Phone ${index + 1}`,
    value: number.value,
    href: number.href,
  })),
  { label: "WhatsApp", value: salonInfo.whatsapp, href: salonInfo.whatsappHref },
  { label: "Email", value: salonInfo.email, href: salonInfo.emailHref },
  { label: "Location", value: `${salonInfo.address}, ${salonInfo.location}` },
];

export const businessHours = [
  { label: "Mon - Fri", value: "8:00 AM - 7:00 PM" },
  { label: "Saturday", value: "9:00 AM - 6:00 PM" },
  { label: "Sunday", value: "10:00 AM - 4:00 PM" },
];

export const contactSections = [
  { title: "Contact Details", items: contactDetails },
  { title: "Business Hours", items: businessHours },
];

export const servicePromises = [
  "Personalized consultations before the first tool touches your hair or skin.",
  "Clear AED pricing so clients can plan confidently before arrival.",
  "Polished finishes built for real life, events, and content moments.",
];

export const contactSupportChannels = [
  ...salonPhoneNumbers.map((number, index) => ({
    title: index === 0 ? "Call the front desk" : "Call the second line",
    detail: number.value,
    href: number.href,
    description:
      index === 0
        ? "Best for same-day availability, timing questions, and direct booking support."
        : "Use this alternate number if the main salon line is busy.",
  })),
  {
    title: "WhatsApp concierge",
    detail: "Quick replies on mobile",
    href: salonInfo.whatsappHref,
    description: "Perfect for sharing reference photos, asking about prep, or confirming arrival details.",
  },
  {
    title: "Email the salon",
    detail: salonInfo.email,
    href: salonInfo.emailHref,
    description: "Use for bridal, group bookings, collaborations, or advance planning.",
  },
];

export const visitHighlights = [
  {
    title: "Easy arrival planning",
    description:
      "Located in Dubai with a calm studio feel and appointment-first flow to keep waits short.",
  },
  {
    title: "Consultation-led service",
    description:
      "Every session starts with your desired finish, timing, and aftercare in mind so expectations stay aligned.",
  },
  {
    title: "Bridal and group support",
    description:
      "Need glam for a bridal suite or special event? We can coordinate timelines and beauty priorities in advance.",
  },
];

export const contactFaqs = [
  {
    question: "Do I need an appointment before visiting?",
    answer:
      "Appointments are strongly recommended for hair, makeup, and bridal services. Walk-ins are welcome when timing allows.",
  },
  {
    question: "Can I share reference photos before my appointment?",
    answer:
      "Yes. WhatsApp is the fastest channel for sharing hair, nail, and makeup inspiration ahead of your session.",
  },
  {
    question: "Do you handle bridal groups or multiple clients together?",
    answer:
      "Yes. Bridal parties and coordinated group appointments can be arranged through email or WhatsApp planning.",
  },
];
