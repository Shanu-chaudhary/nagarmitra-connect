import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  TrendingUp, 
  Building2, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  MapPin,
  Calendar,
  Search,
  Filter,
  Sparkles,
  Eye,
  Settings,
  Download,
  RefreshCw,
  Activity,
  Target,
  Zap,
  Star
} from "lucide-react";
import { useState } from "react";

const MunicipalDashboardPage = () => {
  const [activeSection, setActiveSection] = useState<"city" | "performance" | "escalations" | "analytics">("city");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const cityStats = [
    { label: "Total Issues", value: "1,247", change: "+8%", icon: Shield, color: "primary" },
    { label: "Resolved This Month", value: "892", change: "+15%", icon: CheckCircle, color: "success" },
    { label: "SLA Compliance", value: "87%", change: "+3%", icon: TrendingUp, color: "warning" },
    { label: "Active Departments", value: "12", change: "0%", icon: Building2, color: "accent" }
  ];

  const departments = [
    "Roads & Infrastructure", "Sanitation", "Water Department", "Electrical", 
    "Traffic", "Health", "Education", "Housing", "Environment", "Public Safety"
  ];

  const departmentPerformance = [
    { name: "Roads & Infrastructure", resolved: 245, pending: 32, slaCompliance: 89, rating: 4.2, color: "blue" },
    { name: "Sanitation", resolved: 198, pending: 28, slaCompliance: 92, rating: 4.5, color: "green" },
    { name: "Water Department", resolved: 167, pending: 15, slaCompliance: 95, rating: 4.7, color: "cyan" },
    { name: "Electrical", resolved: 134, pending: 22, slaCompliance: 85, rating: 4.1, color: "yellow" },
    { name: "Traffic", resolved: 89, pending: 18, slaCompliance: 88, rating: 4.3, color: "orange" },
    { name: "Health", resolved: 156, pending: 25, slaCompliance: 91, rating: 4.6, color: "red" },
    { name: "Education", resolved: 78, pending: 12, slaCompliance: 94, rating: 4.8, color: "purple" },
    { name: "Housing", resolved: 112, pending: 19, slaCompliance: 87, rating: 4.2, color: "indigo" },
    { name: "Environment", resolved: 95, pending: 14, slaCompliance: 93, rating: 4.4, color: "emerald" },
    { name: "Public Safety", resolved: 67, pending: 8, slaCompliance: 96, rating: 4.9, color: "rose" }
  ];

  const escalatedIssues = [
    {
      id: "ESC001",
      title: "Major Water Pipeline Burst",
      department: "Water Department",
      ward: "Ward 7",
      escalatedTime: "3 days ago",
      reason: "SLA Breach - 72 hours exceeded",
      severity: "Critical"
    },
    {
      id: "ESC002", 
      title: "Multiple Street Light Failures",
      department: "Electrical",
      ward: "Ward 12",
      escalatedTime: "2 days ago",
      reason: "Resource Shortage",
      severity: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <DashboardHeader title="Municipal Control Center" />

      {/* Hero Banner - Same as Citizen Dashboard */}
      <div className="bg-gradient-to-r from-emerald-50 via-sky-50 to-blue-50 border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                Municipal Authority
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                City-wide Oversight & Department Coordination
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Monitor all departments, track performance metrics, and coordinate 
                city-wide initiatives for efficient civic governance.
              </p>
          </div>
            <div className="flex items-center gap-3">
              <Button className="btn-government h-11 px-5">
                <Download className="h-4 w-4 mr-2" /> Generate Report
            </Button>
              <Button
                variant="outline"
                className="h-11 px-5"
              >
                <Settings className="h-4 w-4 mr-2" /> System Settings
            </Button>
            </div>
          </div>
          </div>
        </div>

      <div className="w-full px-6 pt-8">
        {/* City Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cityStats.map((stat, index) => (
            <Card key={index} className="government-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-success mr-1" />
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Search and Filter Bar with Gradient - Thinner Height */}
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border border-slate-200 rounded-xl p-4 mb-8 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                placeholder="Search issues, departments, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 bg-white/80 border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48 h-9 bg-white/80 border-slate-200 rounded-lg shadow-sm">
                  <Filter className="h-4 w-4 mr-2 text-slate-500" />
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32 h-9 bg-white/80 border-slate-200 rounded-lg shadow-sm">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-9 bg-white/80 border-slate-200 rounded-lg shadow-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9 px-3 bg-white/80 border-slate-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

      {/* Enhanced Sidebar Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full mt-5 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-slate-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-blue-700 text-white">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                Municipal Control
              </CardTitle>
              <CardDescription className="text-blue-100 text-sm">Navigate through dashboard sections</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4 flex-1">
              <div className="space-y-3">
                <Button 
                  variant={activeSection === "city" ? "default" : "ghost"} 
                  className={`w-full justify-start h-14 transition-all duration-300 rounded-xl ${
                    activeSection === "city" 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105" 
                      : "hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:scale-102"
                  }`} 
                  onClick={() => setActiveSection("city")}
                >
                  <div className={`p-2 rounded-lg mr-4 ${
                    activeSection === "city" ? "bg-white/20" : "bg-blue-100"
                  }`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">City-wide Issues</div>
                    <div className="text-xs opacity-75">View all city issues</div>
                  </div>
                </Button>
                
                <Button 
                  variant={activeSection === "performance" ? "default" : "ghost"} 
                  className={`w-full justify-start h-14 transition-all duration-300 rounded-xl ${
                    activeSection === "performance" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105" 
                      : "hover:bg-green-50 hover:text-green-600 hover:shadow-md hover:scale-102"
                  }`} 
                  onClick={() => setActiveSection("performance")}
                >
                  <div className={`p-2 rounded-lg mr-4 ${
                    activeSection === "performance" ? "bg-white/20" : "bg-green-100"
                  }`}>
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Department Performance</div>
                    <div className="text-xs opacity-75">Track department metrics</div>
                  </div>
                </Button>
                
                <Button 
                  variant={activeSection === "escalations" ? "default" : "ghost"} 
                  className={`w-full justify-start h-14 transition-all duration-300 rounded-xl ${
                    activeSection === "escalations" 
                      ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg transform scale-105" 
                      : "hover:bg-red-50 hover:text-red-600 hover:shadow-md hover:scale-102"
                  }`} 
                  onClick={() => setActiveSection("escalations")}
                >
                  <div className={`p-2 rounded-lg mr-4 ${
                    activeSection === "escalations" ? "bg-white/20" : "bg-red-100"
                  }`}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Escalated Issues</div>
                    <div className="text-xs opacity-75">Urgent matters</div>
                  </div>
                </Button>
                
                <Button 
                  variant={activeSection === "analytics" ? "default" : "ghost"} 
                  className={`w-full justify-start h-14 transition-all duration-300 rounded-xl ${
                    activeSection === "analytics" 
                      ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg transform scale-105" 
                      : "hover:bg-purple-50 hover:text-purple-600 hover:shadow-md hover:scale-102"
                  }`} 
                  onClick={() => setActiveSection("analytics")}
                >
                  <div className={`p-2 rounded-lg mr-4 ${
                    activeSection === "analytics" ? "bg-white/20" : "bg-purple-100"
                  }`}>
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Analytics</div>
                    <div className="text-xs opacity-75">Reports & insights</div>
                  </div>
                </Button>
              </div>
              
              {/* Quick Stats in Sidebar */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600">Active Issues</span>
                    <span className="font-semibold text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600">Resolved Today</span>
                    <span className="font-semibold text-green-600">89</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600">SLA Compliance</span>
                    <span className="font-semibold text-amber-600">87%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-9">
          <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as any)} className="space-y-6">
            <TabsList className="hidden">
              <TabsTrigger value="city">City-wide Issue Distribution</TabsTrigger>
              <TabsTrigger value="performance">Department Performance Overview</TabsTrigger>
              <TabsTrigger value="escalations">Escalated Issues</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="city">
        <Card className="government-card">
          <CardHeader>
            <CardTitle>City-wide Issue Distribution</CardTitle>
            <CardDescription>Interactive map showing issue density across all wards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">City-wide Interactive Map</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Heatmap showing issue density by ward<br />
                  Color-coded pins for different departments and priority levels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-6">
                {/* Performance Overview Cards with Gradients */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Top Performer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-700 mb-1">Public Safety</div>
                        <div className="text-sm text-emerald-600 font-medium">96% SLA Compliance</div>
                        <div className="text-xs text-emerald-500 mt-1">4.9★ Rating</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Needs Attention
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-700 mb-1">Electrical</div>
                        <div className="text-sm text-amber-600 font-medium">85% SLA Compliance</div>
                        <div className="text-xs text-amber-500 mt-1">4.1★ Rating</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Most Active
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-700 mb-1">Roads & Infrastructure</div>
                        <div className="text-sm text-blue-600 font-medium">245 Resolved</div>
                        <div className="text-xs text-blue-500 mt-1">32 Pending</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Department Performance Table with Gradients */}
                <Card className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-slate-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="h-6 w-6" />
                      Department Performance Matrix
                    </CardTitle>
                    <CardDescription className="text-blue-100">Comprehensive performance metrics across all municipal departments</CardDescription>
          </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
              {departmentPerformance.map((dept, index) => (
                        <div key={index} className={`bg-gradient-to-r from-${dept.color}-50 to-${dept.color}-100 border-${dept.color}-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-4 h-4 rounded-full bg-${dept.color}-500 shadow-lg`}></div>
                    <div>
                                <h3 className="font-bold text-slate-800 text-xl">{dept.name}</h3>
                                <div className="flex items-center space-x-6 text-sm text-slate-600 mt-2">
                                  <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    {dept.resolved} Resolved
                                  </span>
                                  <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
                                    <Clock className="h-4 w-4 text-amber-500" />
                                    {dept.pending} Pending
                                  </span>
                                  <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    {dept.rating}★ Rating
                                  </span>
                                </div>
                      </div>
                    </div>
                            <div className="flex items-center gap-3">
                              <Badge className={`px-4 py-2 text-sm font-semibold ${
                                dept.slaCompliance >= 90 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                                  : dept.slaCompliance >= 80 
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                                    : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                              }`}>
                      {dept.slaCompliance}% SLA
                    </Badge>
                              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-slate-300">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                  </div>
                  
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">SLA Compliance</span>
                                <span className="text-slate-900">{dept.slaCompliance}%</span>
                              </div>
                              <div className="bg-white/60 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                                  style={{ width: `${dept.slaCompliance}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">Resolution Rate</span>
                                <span className="text-slate-900">{Math.round((dept.resolved / (dept.resolved + dept.pending)) * 100)}%</span>
                              </div>
                              <div className="bg-white/60 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-1000 ease-out"
                                  style={{ width: `${Math.round((dept.resolved / (dept.resolved + dept.pending)) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">Performance Rating</span>
                                <span className="text-slate-900">{dept.rating}/5.0</span>
                              </div>
                              <div className="bg-white/60 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-400 to-violet-500 transition-all duration-1000 ease-out"
                                  style={{ width: `${(dept.rating / 5) * 100}%` }}
                                ></div>
                              </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
              </div>
            </TabsContent>

            <TabsContent value="escalations">
              <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-red-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <AlertCircle className="h-6 w-6" />
              Escalated Issues
            </CardTitle>
                  <CardDescription className="text-red-100">Issues requiring municipal intervention or state escalation</CardDescription>
          </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
              {escalatedIssues.map((issue) => (
                      <div key={issue.id} className={`bg-gradient-to-r ${
                        issue.severity === 'Critical' 
                          ? 'from-red-100 via-rose-50 to-pink-50 border-red-300' 
                          : 'from-amber-100 via-yellow-50 to-orange-50 border-amber-300'
                      } border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="flex justify-between items-start">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <h3 className="font-bold text-slate-800 text-lg">{issue.title}</h3>
                              <Badge variant="outline" className="bg-white/80 border-slate-300 text-slate-700">
                                {issue.id}
                              </Badge>
                              <Badge className={`px-4 py-2 text-sm font-semibold ${
                                issue.severity === 'Critical' 
                                  ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' 
                                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                              }`}>
                          {issue.severity}
                        </Badge>
                      </div>
                      
                            <div className="flex items-center space-x-6 text-sm">
                              <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-slate-700">
                                <Building2 className="h-4 w-4 text-blue-500" />
                                {issue.department}
                              </span>
                              <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-slate-700">
                                <MapPin className="h-4 w-4 text-green-500" />
                                {issue.ward}
                              </span>
                              <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-slate-700">
                                <Clock className="h-4 w-4 text-amber-500" />
                                Escalated: {issue.escalatedTime}
                              </span>
                      </div>
                      
                            <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                              <p className="text-sm font-medium text-slate-800">
                                <span className="text-red-600 font-semibold">Reason:</span> {issue.reason}
                      </p>
                            </div>
                    </div>

                          <div className="flex flex-col space-y-3 ml-6">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white/80 hover:bg-blue-50 border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-200"
                            >
                              <Users className="h-4 w-4 mr-2" />
                        Assign Resources
                      </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white/80 hover:bg-red-50 border-red-300 text-red-700 hover:text-red-800 transition-all duration-200"
                            >
                              <AlertCircle className="h-4 w-4 mr-2" />
                        Escalate to State
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
            </TabsContent>

            <TabsContent value="analytics">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle>Issue Trends</CardTitle>
              <CardDescription>Monthly resolution trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Trend Analytics Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="government-card">
            <CardHeader>
              <CardTitle>Ward Performance</CardTitle>
              <CardDescription>Issue distribution and resolution rates by ward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Ward Comparison Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MunicipalDashboardPage;