import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Clock, Calendar, Loader2 } from "lucide-react";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const destinationId = searchParams.get("destinationId") || "";
  const destinationName = searchParams.get("destination") || "Unknown Destination";
  const location = searchParams.get("location") || "";
  const timeSlot = searchParams.get("timeSlot") || "12:00 PM - 1:00 PM";
  const duration = searchParams.get("duration") || "";
  
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Wait for auth to load before checking
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book a tour",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, loading, navigate, toast]);

  const handleBooking = async () => {
    if (!user || !destinationId) {
      toast({
        title: "Error",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          destination_id: destinationId,
          booking_date: bookingDate,
          time_slot: timeSlot,
          status: "pending",
        });

      if (error) throw error;

      toast({
        title: "Booking created!",
        description: "Your booking has been submitted. We'll contact you soon.",
      });
      navigate("/mytrips");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            <CardDescription>Review your tour details and select a date</CardDescription>
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

            <div className="space-y-2">
              <Label htmlFor="bookingDate">Select Tour Date</Label>
              <Input
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                size="lg"
                onClick={handleBooking}
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Booking
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                For payment and additional details, we'll contact you via email.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
