import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import DestinationsManager from "@/components/admin/DestinationsManager";
import BookingsManager from "@/components/admin/BookingsManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
      } else {
        setIsCheckingAccess(false);
      }
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading || isCheckingAccess) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage destinations, bookings, and time slots</p>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="destinations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations" className="space-y-6">
          <DestinationsManager />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <BookingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
