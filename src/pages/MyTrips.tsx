import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const mockTrips = {
  upcoming: [
    {
      id: 1,
      destination: "Shore Temple",
      location: "Mahabalipuram",
      date: "2025-11-15",
      time: "9:00 AM - 10:30 AM",
      bookingId: "ULA-2025-1001",
      status: "confirmed",
      participants: 2,
      guide: "Rajesh Kumar"
    },
    {
      id: 2,
      destination: "Chennai Heritage Circuit",
      location: "Chennai",
      date: "2025-11-20",
      time: "8:00 AM - 5:00 PM",
      bookingId: "ULA-2025-1002",
      status: "confirmed",
      participants: 45,
      guide: "Priya Sharma",
      type: "School Trip"
    }
  ],
  past: [
    {
      id: 3,
      destination: "Arjuna's Penance",
      location: "Mahabalipuram",
      date: "2025-09-10",
      time: "10:30 AM - 11:30 AM",
      bookingId: "ULA-2025-0892",
      status: "completed",
      participants: 3,
      guide: "Anand Raj",
      rating: 4.8
    },
    {
      id: 4,
      destination: "Five Rathas",
      location: "Mahabalipuram",
      date: "2025-08-25",
      time: "11:00 AM - 12:30 PM",
      bookingId: "ULA-2025-0756",
      status: "completed",
      participants: 2,
      guide: "Lakshmi Iyer",
      rating: 5.0
    }
  ],
  cancelled: [
    {
      id: 5,
      destination: "Shore Temple",
      location: "Mahabalipuram",
      date: "2025-09-05",
      time: "2:00 PM - 3:30 PM",
      bookingId: "ULA-2025-0821",
      status: "cancelled",
      participants: 2,
      reason: "Weather conditions"
    }
  ]
};

const MyTrips = () => {
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
      completed: "secondary",
      cancelled: "destructive"
    };
    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    );
  };

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

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockTrips.upcoming.length}</div>
            <p className="text-xs text-muted-foreground">Active bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockTrips.past.length}</div>
            <p className="text-xs text-muted-foreground">Past experiences</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Travelers</CardTitle>
            <MapPin className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {[...mockTrips.upcoming, ...mockTrips.past].reduce((sum, trip) => sum + trip.participants, 0)}
            </div>
            <p className="text-xs text-muted-foreground">People traveled</p>
          </CardContent>
        </Card>
      </div>

      {/* Trips Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">
            Upcoming ({mockTrips.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({mockTrips.past.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({mockTrips.cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockTrips.upcoming.map((trip) => (
            <Card key={trip.id} className="hover:shadow-lg transition-shadow" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(trip.status)}
                      {trip.destination}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {trip.location}
                    </CardDescription>
                  </div>
                  {getStatusBadge(trip.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Date:</span>
                      <span>{new Date(trip.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Time:</span>
                      <span>{trip.time}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">Booking ID:</span> {trip.bookingId}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Participants:</span> {trip.participants}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Guide:</span> {trip.guide}
                    </div>
                    {trip.type && (
                      <Badge variant="outline">{trip.type}</Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="destructive" className="flex-1">Cancel Booking</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {mockTrips.past.map((trip) => (
            <Card key={trip.id} className="hover:shadow-lg transition-shadow" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(trip.status)}
                      {trip.destination}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {trip.location}
                    </CardDescription>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(trip.status)}
                    {trip.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{trip.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Date:</span>
                      <span>{new Date(trip.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Time:</span>
                      <span>{trip.time}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">Booking ID:</span> {trip.bookingId}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Participants:</span> {trip.participants}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Guide:</span> {trip.guide}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="default" className="flex-1 bg-gradient-to-r from-primary to-secondary">Book Again</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {mockTrips.cancelled.map((trip) => (
            <Card key={trip.id} className="hover:shadow-lg transition-shadow" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(trip.status)}
                      {trip.destination}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {trip.location}
                    </CardDescription>
                  </div>
                  {getStatusBadge(trip.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Date:</span>
                      <span>{new Date(trip.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Time:</span>
                      <span>{trip.time}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">Booking ID:</span> {trip.bookingId}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Reason:</span> {trip.reason}
                    </div>
                  </div>
                </div>

                <Button variant="default" className="w-full bg-gradient-to-r from-primary to-secondary">
                  Rebook This Trip
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTrips;
