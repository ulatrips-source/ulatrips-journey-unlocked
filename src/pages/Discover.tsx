import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Clock, Users, Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url: string;
  duration: string;
  time_slot: string;
}

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDestinations(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading destinations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="text-3xl font-bold">Available Destinations</h2>
            <p className="text-muted-foreground">Guided tours with fixed time slots</p>
          </div>
          <Badge variant="secondary" className="text-sm md:text-lg px-2 py-1 md:px-4 md:py-2">
            {filteredDestinations.length} Destinations
          </Badge>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredDestinations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? "No destinations found matching your search" : "No destinations available yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <Card 
                key={destination.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image_url}
                    alt={destination.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
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
                      <Clock className="h-4 w-4" />
                      <span>{destination.time_slot}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex-col gap-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    size="lg"
                    onClick={() => navigate(`/payment?destinationId=${destination.id}&destination=${encodeURIComponent(destination.name)}&location=${encodeURIComponent(destination.location)}&timeSlot=${encodeURIComponent(destination.time_slot)}&duration=${encodeURIComponent(destination.duration)}`)}
                  >
                    Book Now
                  </Button>

                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href="https://linktr.ee/ulatrips" target="_blank" rel="noopener noreferrer">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Us
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Discover;
