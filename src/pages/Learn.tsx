import { useState } from "react";
import { GraduationCap, MapPin, Clock, Users, Phone, Building2, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import marketVisitImg from "@/assets/market-visit.jpg";
import riponBuildingImg from "@/assets/ripon-building.jpg";

const classPrograms = [
  { class: "6th", color: "from-blue-500 to-cyan-500" },
  { class: "7th", color: "from-cyan-500 to-teal-500" },
  { class: "8th", color: "from-teal-500 to-green-500" },
  { class: "9th", color: "from-green-500 to-lime-500" },
  { class: "10th", color: "from-lime-500 to-yellow-500" },
  { class: "11th", color: "from-yellow-500 to-orange-500" },
  { class: "12th", color: "from-orange-500 to-red-500" },
];

const programs = {
  chennai: [
    {
      id: 1,
      title: "Chennai Heritage & Skills Circuit",
      duration: "1 Day",
      locations: ["Pallavaram Market", "Ripon Building", "Fort St. George"],
      description: "An immersive one-day experience combining practical life skills with Indian history. Students will learn negotiation skills at Pallavaram Market and explore India's independence history at Ripon Building.",
      image: marketVisitImg,
      skills: ["Negotiation Skills", "Historical Understanding", "Cultural Awareness", "Communication"],
      subjects: ["History", "Social Studies", "Economics"],
      suitableFor: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
      itinerary: [
        { time: "8:00 AM", activity: "Departure from school" },
        { time: "9:00 AM", activity: "Pallavaram Market - Negotiation skills workshop" },
        { time: "12:00 PM", activity: "Lunch break" },
        { time: "1:00 PM", activity: "Ripon Building - Indian Independence history tour" },
        { time: "3:00 PM", activity: "Fort St. George - Colonial history exploration" },
        { time: "5:00 PM", activity: "Return to school" },
      ]
    },
    {
      id: 2,
      title: "Chennai Innovation Trail",
      duration: "1 Day",
      locations: ["Tech Park", "IIT Madras", "Innovation Center"],
      description: "Experience Chennai's innovation ecosystem with visits to leading tech companies and educational institutions.",
      image: riponBuildingImg,
      skills: ["Innovation Thinking", "Technology Awareness", "Problem Solving", "Career Guidance"],
      subjects: ["Science", "Technology", "Computer Science"],
      suitableFor: ["9th", "10th", "11th", "12th"],
      itinerary: [
        { time: "8:00 AM", activity: "School pickup" },
        { time: "9:30 AM", activity: "Tech Park tour and interaction with professionals" },
        { time: "12:00 PM", activity: "Lunch at campus cafeteria" },
        { time: "1:30 PM", activity: "IIT Madras - Research lab visits" },
        { time: "3:30 PM", activity: "Innovation Center - Hands-on workshop" },
        { time: "5:30 PM", activity: "Return journey" },
      ]
    }
  ],
  industry: [
    {
      id: 3,
      title: "Manufacturing Industry Visit",
      duration: "Half Day",
      locations: ["Automotive Plant", "Quality Control Lab"],
      description: "Get hands-on exposure to manufacturing processes and quality management in a real industrial setting.",
      image: marketVisitImg,
      skills: ["Process Understanding", "Quality Management", "Safety Protocols", "Industrial Awareness"],
      subjects: ["Physics", "Chemistry", "Engineering"],
      suitableFor: ["10th", "11th", "12th"],
      itinerary: [
        { time: "9:00 AM", activity: "Industry arrival and safety briefing" },
        { time: "9:30 AM", activity: "Production floor tour" },
        { time: "11:00 AM", activity: "Quality control lab demonstration" },
        { time: "12:00 PM", activity: "Q&A session with engineers" },
        { time: "1:00 PM", activity: "Departure" },
      ]
    }
  ],
  entrepreneurship: [
    {
      id: 4,
      title: "Startup Ecosystem Exposure",
      duration: "1 Day",
      locations: ["Incubation Center", "Co-working Space", "Startup Office"],
      description: "Explore the world of startups and entrepreneurship with visits to incubation centers and interactions with young entrepreneurs.",
      image: riponBuildingImg,
      skills: ["Entrepreneurial Mindset", "Business Planning", "Networking", "Innovation"],
      subjects: ["Business Studies", "Economics", "Entrepreneurship"],
      suitableFor: ["9th", "10th", "11th", "12th"],
      itinerary: [
        { time: "9:00 AM", activity: "Incubation center tour" },
        { time: "10:30 AM", activity: "Interaction with startup founders" },
        { time: "12:00 PM", activity: "Lunch with entrepreneurs" },
        { time: "1:30 PM", activity: "Co-working space experience" },
        { time: "3:00 PM", activity: "Workshop on idea generation" },
        { time: "5:00 PM", activity: "Wrap-up and departure" },
      ]
    }
  ]
};

const Learn = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

  const getFilteredPrograms = () => {
    if (!selectedClass) return [];
    
    const allPrograms = [
      ...programs.chennai,
      ...programs.industry,
      ...programs.entrepreneurship
    ];
    
    return allPrograms.filter(program => 
      program.suitableFor.includes(selectedClass)
    );
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <GraduationCap className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Curriculum-Based Field Trips
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experiential learning programs for classes 6th to 12th, designed to complement classroom education
        </p>
        <Badge variant="outline" className="text-base px-6 py-2">
          B2B Programs - Contact us for bookings
        </Badge>
      </section>

      {/* Class Selection */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Select Your Class</h2>
          <p className="text-muted-foreground">Choose a class to view available programs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {classPrograms.map((item) => (
            <Card
              key={item.class}
              className={`cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                selectedClass === item.class 
                  ? "ring-4 ring-primary shadow-2xl scale-105" 
                  : "hover:shadow-xl"
              }`}
              onClick={() => setSelectedClass(item.class)}
              style={{ boxShadow: selectedClass === item.class ? "var(--shadow-hover)" : "var(--shadow-card)" }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-2`}>
                  <span className="text-2xl font-bold text-white">{item.class.replace(/[^0-9]/g, '')}</span>
                </div>
                <CardTitle>Class {item.class}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Programs Display */}
      {selectedClass && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Programs for Class {selectedClass}</h2>
              <p className="text-muted-foreground">Experiential learning experiences</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {getFilteredPrograms().length} Programs Available
            </Badge>
          </div>

          <Tabs defaultValue="chennai" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="chennai">Chennai Circuits</TabsTrigger>
              <TabsTrigger value="industry">Industry Visits</TabsTrigger>
              <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
            </TabsList>

            <TabsContent value="chennai" className="space-y-6">
              <div className="grid gap-8 md:grid-cols-2">
                {programs.chennai
                  .filter(program => program.suitableFor.includes(selectedClass))
                  .map((program) => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      selectedProgram={selectedProgram}
                      setSelectedProgram={setSelectedProgram}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="industry" className="space-y-6">
              <div className="grid gap-8 md:grid-cols-2">
                {programs.industry
                  .filter(program => program.suitableFor.includes(selectedClass))
                  .map((program) => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      selectedProgram={selectedProgram}
                      setSelectedProgram={setSelectedProgram}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="entrepreneurship" className="space-y-6">
              <div className="grid gap-8 md:grid-cols-2">
                {programs.entrepreneurship
                  .filter(program => program.suitableFor.includes(selectedClass))
                  .map((program) => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      selectedProgram={selectedProgram}
                      setSelectedProgram={setSelectedProgram}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white space-y-6">
        <Building2 className="h-16 w-16 mx-auto" />
        <h2 className="text-4xl font-bold">Partner With Us</h2>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          We work directly with schools to provide transformative educational experiences. Contact us to discuss custom programs for your students.
        </p>
        <Button size="lg" variant="secondary" className="text-lg px-8">
          <Phone className="h-5 w-5 mr-2" />
          Contact Our Team
        </Button>
      </section>
    </div>
  );
};

// Program Card Component
const ProgramCard = ({ program, selectedProgram, setSelectedProgram }: any) => {
  const isSelected = selectedProgram === program.id;

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
          {program.duration}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle>{program.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {program.locations.join(" • ")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{program.description}</p>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Skills Developed:
          </h4>
          <div className="flex flex-wrap gap-2">
            {program.skills.map((skill: string, idx: number) => (
              <Badge key={idx} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            Related Subjects:
          </h4>
          <div className="flex flex-wrap gap-2">
            {program.subjects.map((subject: string, idx: number) => (
              <Badge key={idx} variant="secondary">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button 
          className="w-full"
          variant={isSelected ? "secondary" : "default"}
          onClick={() => setSelectedProgram(isSelected ? null : program.id)}
        >
          {isSelected ? "Hide Itinerary" : "View Itinerary"}
        </Button>

        {isSelected && (
          <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Daily Itinerary:
              </h4>
              <div className="space-y-2">
                {program.itinerary.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <span className="font-semibold text-primary min-w-20">{item.time}</span>
                    <span className="text-muted-foreground">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="default" className="w-full bg-gradient-to-r from-primary to-secondary" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Contact Us to Book
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Learn;
