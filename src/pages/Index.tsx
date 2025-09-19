import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Clock, 
  Award,
  Globe,
  Zap,
  Heart,
  Target,
  BarChart3,
  Smartphone
} from "lucide-react";
import Header from "@/components/layout/Header";
import LoginModal from "@/components/auth/LoginModal";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";
import nagarmitraLogo from "@/assets/nagarmitra-logo.png";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const stats = [
    { 
      label: "Issues Resolved", 
      value: "15,247", 
      icon: CheckCircle, 
      color: "emerald",
      change: "+12%",
      description: "This month"
    },
    { 
      label: "Active Cases", 
      value: "1,832", 
      icon: FileText, 
      color: "blue",
      change: "-8%",
      description: "Decreasing trend"
    },
    { 
      label: "Departments", 
      value: "12", 
      icon: Users, 
      color: "purple",
      change: "100%",
      description: "Active coverage"
    },
    { 
      label: "Wards Covered", 
      value: "145", 
      icon: MapPin, 
      color: "orange",
      change: "+5",
      description: "New this year"
    },
  ];

  const features = [
    {
      title: "Multi-Channel Reporting",
      description: "Report via app, voice, photo upload, or IVRS call system with instant acknowledgment",
      icon: Smartphone,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      title: "Real-time Tracking",
      description: "Track your complaint status from submission to resolution with live updates",
      icon: MapPin,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      title: "Transparency Dashboard",
      description: "View department performance and resolution statistics with detailed analytics",
      icon: BarChart3,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50"
    },
    {
      title: "Multi-Role Access",
      description: "Separate dashboards for citizens, departments, workers, and officials",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    },
  ];

  const benefits = [
    {
      title: "Instant Response",
      description: "Get immediate acknowledgment within minutes",
      icon: Zap,
      color: "yellow"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance and monitoring",
      icon: Clock,
      color: "blue"
    },
    {
      title: "Quality Assurance",
      description: "Verified resolution with citizen feedback",
      icon: Award,
      color: "green"
    },
    {
      title: "Community Impact",
      description: "Building better neighborhoods together",
      icon: Heart,
      color: "red"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header onLoginClick={() => setShowLogin(true)} />
      
      {/* Premium Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <Badge className="px-6 py-3 text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 border border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Government of Jharkhand Initiative
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              NagarMitra
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Empowering citizens to report civic issues and track resolutions through a 
            <span className="font-semibold text-blue-600"> transparent, multi-role governance platform</span> 
            for better urban management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => setShowRoleSelect(true)}
            >
              Access Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-8 text-lg border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
            >
              Learn More
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <img src={nagarmitraLogo} alt="NagarMitra Logo" className="h-5 w-5" />
              <span className="text-sm font-medium">Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">50,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-sm"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Impact in Numbers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real-time statistics showcasing our commitment to civic excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`}></div>
                
                <CardContent className="relative p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  
                  <div className="text-base font-semibold text-slate-700 mb-3">
                    {stat.label}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                  
                  <div className="text-xs text-slate-500">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 border border-blue-200/50 mb-4">
              <Target className="h-4 w-4 mr-2" />
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Civic Management
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A complete solution for transparent, efficient civic issue resolution 
              with role-based access and real-time tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-50`}></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                
                <CardHeader className="relative text-center pb-4">
                  <div className="flex justify-center mb-6">
                    <div className={`p-5 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative">
                  <CardDescription className="text-center text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Why Choose NagarMitra?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the difference with our citizen-centric approach to civic governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br from-${benefit.color}-100 to-${benefit.color}-200 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className={`h-8 w-8 text-${benefit.color}-600`} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mr-4">
                <img src={nagarmitraLogo} alt="NagarMitra Logo" className="h-8 w-8" />
              </div>
              <span className="text-3xl font-bold text-white">NagarMitra</span>
            </div>
            
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              A digital initiative by Government of Jharkhand for transparent civic governance
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200 mb-6">
              <div className="flex items-center gap-2">
                <img src={nagarmitraLogo} alt="NagarMitra Logo" className="h-4 w-4" />
                <span className="text-sm font-medium">Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium">Multi-Role Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium">State-wide Coverage</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-200 text-sm">
                © 2025 Government of Jharkhand. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-600 text-blue-200 hover:bg-blue-800 hover:text-white"
                >
                  Privacy Policy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-600 text-blue-200 hover:bg-blue-800 hover:text-white"
                >
                  Terms of Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      <RoleSelectionModal open={showRoleSelect} onOpenChange={setShowRoleSelect} />
    </div>
  );
};

export default Index;