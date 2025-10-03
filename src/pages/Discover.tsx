import { useState } from "react";
import { Search, MapPin, Clock, Users, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import shoreTempleImg from "@/assets/shore-temple.jpg";
import arjunasPenanceImg from "@/assets/arjunas-penance.jpg";
import fiveRathasImg from "@/assets/five-rathas.jpg";

const destinations = [
  {
    id: 1,
    name: "Shore Temple",
    location: "Mahabalipuram",
    image: shoreTempleImg,
    description: "A UNESCO World Heritage site, the Shore Temple is a stunning example of Pallava architecture from the 8th century. Built with granite blocks, this temple complex stands majestically by the Bay of Bengal.",
    duration: "1.5 hours",
    bookings: 1247,
    rating: 4.8,
    timeSlots: ["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "2:00 PM - 3:30 PM", "4:00 PM - 5:30 PM"],
    highlights: [
      "Ancient Pallava architecture",
      "Scenic oceanfront location",
      "Certified local guide included",
      "Perfect for photography"
    ],
    faqs: [
      {
        question: "What is included in the tour?",
        answer: "The tour includes a certified local guide, entry tickets, and detailed historical insights about the Shore Temple's significance and architecture."
      },
      {
        question: "Is photography allowed?",
        answer: "Yes, photography is allowed throughout the site. The oceanfront backdrop makes for stunning photos, especially during sunrise and sunset."
      },
      {
        question: "What should I bring?",
        answer: "We recommend bringing sunscreen, a hat, comfortable walking shoes, and a water bottle. The temple complex requires some walking."
      }
    ]
  },
  {
    id: 2,
    name: "Arjuna's Penance",
    location: "Mahabalipuram",
    image: arjunasPenanceImg,
    description: "One of the largest rock reliefs in the world, Arjuna's Penance depicts epic scenes from Hindu mythology carved into a massive rock face. This 7th-century masterpiece showcases exceptional artistry.",
    duration: "1 hour",
    bookings: 892,
    rating: 4.7,
    timeSlots: ["9:00 AM - 10:00 AM", "10:30 AM - 11:30 AM", "2:00 PM - 3:00 PM", "3:30 PM - 4:30 PM"],
    highlights: [
      "World's largest rock relief",
      "Intricate mythological carvings",
      "Expert guide narration",
      "Historical significance"
    ],
    faqs: [
      {
        question: "How long is the guided tour?",
        answer: "The guided tour lasts approximately 1 hour, providing detailed explanations of the carvings and their mythological significance."
      },
      {
        question: "Is it suitable for all ages?",
        answer: "Yes, the site is accessible for all ages. The viewing area is relatively flat and comfortable for families."
      },
      {
        question: "Best time to visit?",
        answer: "Early morning (9 AM) or late afternoon (3:30 PM) are ideal to avoid the midday heat and get better lighting for photos."
      }
    ]
  },
  {
    id: 3,
    name: "Five Rathas",
    location: "Mahabalipuram",
    image: fiveRathasImg,
    description: "Also known as Pancha Rathas, these five monolithic temples are carved from single pieces of granite. Each ratha represents a different architectural style and is named after the Pandavas.",
    duration: "1.5 hours",
    bookings: 1056,
    rating: 4.9,
    timeSlots: ["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "1:30 PM - 3:00 PM", "3:30 PM - 5:00 PM"],
    highlights: [
      "Monolithic rock-cut temples",
      "Five unique architectural styles",
      "UNESCO World Heritage site",
      "Ancient sculpture gardens"
    ],
    faqs: [
      {
        question: "What makes Five Rathas special?",
        answer: "Each of the five rathas is carved from a single piece of rock and represents a different architectural style, showcasing the evolution of temple architecture."
      },
      {
        question: "Are all five rathas accessible?",
        answer: "Yes, all five rathas are easily accessible within the complex. The site is well-maintained with clear pathways."
      },
      {
        question: "Do I need to book in advance?",
        answer: "We recommend booking in advance, especially during weekends and holidays, to secure your preferred time slot."
      }
    ]
  }
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Together, Learn Together
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover authentic cultural experiences with our certified local guides
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search destinations, tours, experiences..."
            className="pl-12 h-14 text-lg rounded-full shadow-lg border-2 focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Destinations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Mahabalipuram Destinations</h2>
            <p className="text-muted-foreground">Fixed time slot guided tours</p>
          </div>
          <Badge variant="secondary" className="text-sm md:text-lg px-2 py-1 md:px-4 md:py-2">
            {filteredDestinations.length} Destinations
          </Badge>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="text-yellow-500 font-bold">★</span>
                  <span className="font-semibold">{destination.rating}</span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {destination.name}
                </CardTitle>
                <CardDescription>{destination.location}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{destination.bookings} bookings</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Highlights:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs">
                    {destination.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="text-primary">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedDestination(selectedDestination === destination.id ? null : destination.id)}
                >
                  {selectedDestination === destination.id ? "Hide Details" : "View Details"}
                </Button>

                {selectedDestination === destination.id && (
                  <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Available Time Slots:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {destination.timeSlots.map((slot, idx) => (
                          <Badge key={idx} variant="outline" className="justify-center py-2">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faqs">
                        <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {destination.faqs.map((faq, idx) => (
                              <div key={idx} className="space-y-1">
                                <h5 className="font-semibold text-sm">{faq.question}</h5>
                                <p className="text-xs text-muted-foreground">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Button variant="outline" className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Us to Book
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;
