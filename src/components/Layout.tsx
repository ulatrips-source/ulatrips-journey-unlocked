import { Link, useLocation } from "react-router-dom";
import { Compass, GraduationCap, MapPin } from "lucide-react";
import logo from "@/assets/ulatrips-logo.jpeg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Compass, label: "Discover" },
    { path: "/learn", icon: GraduationCap, label: "Learn" },
    { path: "/mytrips", icon: MapPin, label: "My Trips" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="ULAtrips" className="h-16 w-16 rounded-full shadow-lg" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ULAtrips
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex items-center justify-around h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-primary scale-110"
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "fill-primary" : ""}`} />
                <span className={`text-xs font-medium ${isActive ? "font-bold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
