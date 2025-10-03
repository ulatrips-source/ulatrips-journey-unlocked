import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Calendar } from "lucide-react";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const destinationName = searchParams.get("destination") || "Unknown Destination";
  const location = searchParams.get("location") || "";
  const timeSlot = searchParams.get("timeSlot") || "12:00 PM - 1:00 PM";
  const duration = searchParams.get("duration") || "";

  return (
    <div className="container py-8 space-y-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Discover
      </Button>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Complete Your Booking</CardTitle>
            <CardDescription>Review your tour details and proceed to payment</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Tour Details</h3>
              
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{destinationName}</p>
                    <p className="text-sm text-muted-foreground">{location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p className="text-sm">Time Slot: {timeSlot}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="text-sm">Duration: {duration}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-center text-muted-foreground mb-4">
                Payment processing is coming soon. For now, please contact us to complete your booking.
              </p>
              
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                size="lg"
                asChild
              >
                <a href="https://linktr.ee/ulatrips" target="_blank" rel="noopener noreferrer">
                  Contact Us to Complete Booking
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
