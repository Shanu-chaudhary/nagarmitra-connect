import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, Users, FileText, Phone, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import LoginModal from "@/components/auth/LoginModal";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const stats = [
    { label: "Issues Resolved", value: "15,247", icon: CheckCircle, color: "success" },
    { label: "Active Cases", value: "1,832", icon: FileText, color: "warning" },
    { label: "Departments", value: "12", icon: Users, color: "primary" },
    { label: "Wards Covered", value: "145", icon: MapPin, color: "accent" },
  ];

  const features = [
    {
      title: "Multi-Channel Reporting",
      description: "Report via app, voice, photo upload, or IVRS call system",
      icon: Phone,
    },
    {
      title: "Real-time Tracking",
      description: "Track your complaint status from submission to resolution",
      icon: MapPin,
    },
    {
      title: "Transparency Dashboard",
      description: "View department performance and resolution statistics",
      icon: Shield,
    },
    {
      title: "Multi-Role Access",
      description: "Separate dashboards for citizens, departments, workers, and officials",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              Government of Jharkhand Initiative
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            <span className="bg-gradient-hero bg-clip-text text-transparent">NagarMitra</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            Empowering citizens to report civic issues and track resolutions through a transparent, 
            multi-role governance platform for better urban management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              className="btn-government px-8 py-4 text-lg font-semibold hover-lift"
              onClick={() => setShowRoleSelect(true)}
            >
              Access Platform
              <Shield className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-2 hover-scale"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="government-card text-center hover-lift">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Civic Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete solution for transparent, efficient civic issue resolution 
              with role-based access and real-time tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="government-card hover-lift">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center items-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <span className="text-2xl font-bold text-foreground">NagarMitra</span>
          </div>
          <p className="text-muted-foreground mb-4">
            A digital initiative by Government of Jharkhand for transparent civic governance
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Government of Jharkhand. All rights reserved.
          </p>
        </div>
      </footer>

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      <RoleSelectionModal open={showRoleSelect} onOpenChange={setShowRoleSelect} />
    </div>
  );
};

export default Index;