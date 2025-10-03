import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Booking {
  id: string;
  booking_date: string;
  time_slot: string;
  status: string;
  created_at: string;
  destinations: {
    name: string;
    location: string;
  };
  profiles: {
    email: string;
    full_name: string | null;
  };
}

const BookingsManager = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          destinations (name, location),
          profiles (email, full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Booking status updated successfully" });
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Bookings</h2>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{booking.destinations.name}</CardTitle>
                  <CardDescription>{booking.destinations.location}</CardDescription>
                </div>
                <Badge variant={getStatusBadgeVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="font-semibold">Customer:</span>{" "}
                  {booking.profiles.full_name || booking.profiles.email}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {booking.profiles.email}
                </div>
                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(booking.booking_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Time Slot:</span> {booking.time_slot}
                </div>
                <div>
                  <span className="font-semibold">Booked on:</span>{" "}
                  {new Date(booking.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Select
                  value={booking.status}
                  onValueChange={(value) => updateBookingStatus(booking.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        {bookings.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No bookings yet
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsManager;
