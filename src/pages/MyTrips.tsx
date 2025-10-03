import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Loader2, User, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
}

interface Booking {
  id: string;
  booking_date: string;
  time_slot: string;
  status: string;
  created_at: string;
  destinations: {
    name: string;
    location: string;
    image_url: string;
    duration: string;
  };
}

const MyTrips = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchProfile();
      fetchBookings();
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          destinations (name, location, image_url, duration)
        `)
        .eq("user_id", user.id)
        .order("booking_date", { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive"
    };
    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => 
    new Date(b.booking_date) >= new Date() && b.status !== "cancelled"
  );
  const pastBookings = bookings.filter(b => 
    new Date(b.booking_date) < new Date() && b.status !== "cancelled"
  );
  const cancelledBookings = bookings.filter(b => b.status === "cancelled");

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <MapPin className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Trips
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your bookings and explore your travel history
        </p>
      </section>

      {/* User Profile Card */}
      {profile && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Name:</span>
              <span>{profile.full_name || "Not set"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{profile.email}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <p className="text-muted-foreground">You haven't made any bookings yet</p>
            <Button onClick={() => navigate("/")}>Discover Destinations</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{upcomingBookings.length}</div>
                <p className="text-xs text-muted-foreground">Active bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pastBookings.length}</div>
                <p className="text-xs text-muted-foreground">Past experiences</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{cancelledBookings.length}</div>
                <p className="text-xs text-muted-foreground">Cancelled trips</p>
              </CardContent>
            </Card>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Bookings</h2>
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        {booking.destinations.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {booking.destinations.location}
                      </CardDescription>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Date:</span>
                        <span>{new Date(booking.booking_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Time:</span>
                        <span>{booking.time_slot}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-semibold">Duration:</span> {booking.destinations.duration}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Booked on:</span> {new Date(booking.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyTrips;
