import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/layout/DashboardHeader";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  MapPin,
  Users,
  Building2,
  Shield,
  Target,
  Award,
  Zap,
  Filter,
  Search,
  Download,
  Eye,
  Flag,
  TrendingDown,
  Activity,
  Globe,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  Area,
  AreaChart,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const StateDashboard = () => {
  const [activeSection, setActiveSection] = useState<
    "escalations" | "districts" | "analytics" | "policy"
  >("escalations");
  const [selectedEscalation, setSelectedEscalation] = useState<any | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "Critical" | "High" | "Medium">("all");
  const [timeFilter, setTimeFilter] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [newEscalationOpen, setNewEscalationOpen] = useState(false);
  const [newEscalation, setNewEscalation] = useState({
    title: "",
    district: "",
    municipality: "",
    category: "",
    priority: "High",
    description: "",
    impact: "Medium",
  });

  // State-level statistics
  const stateStats = [
    {
      label: "Total Escalations",
      value: "1,247",
      icon: Flag,
      color: "danger",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Critical Issues",
      value: "89",
      icon: AlertTriangle,
      color: "danger",
      change: "+8%",
      trend: "up",
    },
    {
      label: "Resolved This Month",
      value: "892",
      icon: CheckCircle,
      color: "success",
      change: "+15%",
      trend: "up",
    },
    {
      label: "SLA Compliance",
      value: "87%",
      icon: Shield,
      color: "warning",
      change: "+3%",
      trend: "up",
    },
    {
      label: "Active Districts",
      value: "24",
      icon: Building2,
      color: "primary",
      change: "0%",
      trend: "neutral",
    },
    {
      label: "Repeat Delays",
      value: "156",
      icon: AlertCircle,
      color: "danger",
      change: "-5%",
      trend: "down",
    },
  ];

  // Escalated issues data
  const [escalatedIssues, setEscalatedIssues] = useState([
    {
      id: "ESC001",
      title: "Water Crisis in Ranchi District",
      district: "Ranchi",
      municipality: "Ranchi Municipal Corporation",
      category: "Water Supply",
      priority: "Critical",
      escalatedBy: "District Commissioner",
      escalatedDate: "2024-01-15",
      originalIssueDate: "2024-01-10",
      daysOverdue: 12,
      status: "Under Review",
      description: "Severe water shortage affecting 50,000+ residents",
      impact: "High",
      repeatCount: 3,
      lastResolution: "2023-12-20",
    },
    {
      id: "ESC002",
      title: "Road Infrastructure Collapse",
      district: "Dhanbad",
      municipality: "Dhanbad Municipal Corporation",
      category: "Infrastructure",
      priority: "High",
      escalatedBy: "State Transport Minister",
      escalatedDate: "2024-01-14",
      originalIssueDate: "2024-01-05",
      daysOverdue: 8,
      status: "In Progress",
      description: "Major road collapse causing traffic chaos",
      impact: "Medium",
      repeatCount: 1,
      lastResolution: "2023-11-15",
    },
    {
      id: "ESC003",
      title: "Healthcare Facility Shortage",
      district: "Jamshedpur",
      municipality: "Jamshedpur Notified Area Committee",
      category: "Healthcare",
      priority: "High",
      escalatedBy: "Health Secretary",
      escalatedDate: "2024-01-12",
      originalIssueDate: "2024-01-01",
      daysOverdue: 6,
      status: "Pending",
      description: "Insufficient healthcare facilities for growing population",
      impact: "High",
      repeatCount: 2,
      lastResolution: "2023-10-30",
    },
    {
      id: "ESC004",
      title: "Sanitation Crisis",
      district: "Bokaro",
      municipality: "Bokaro Municipal Corporation",
      category: "Sanitation",
      priority: "Medium",
      escalatedBy: "Urban Development Secretary",
      escalatedDate: "2024-01-10",
      originalIssueDate: "2023-12-28",
      daysOverdue: 4,
      status: "Resolved",
      description: "Poor sanitation leading to health hazards",
      impact: "Medium",
      repeatCount: 0,
      lastResolution: "2024-01-14",
    },
  ]);

  // District performance data
  const districtPerformance = [
    {
      name: "Ranchi",
      totalIssues: 247,
      resolved: 189,
      pending: 45,
      escalated: 13,
      slaCompliance: 76,
      avgResolutionTime: 8.5,
      repeatDelays: 23,
      population: "1.2M",
      rating: 3.2,
    },
    {
      name: "Dhanbad",
      totalIssues: 198,
      resolved: 156,
      pending: 32,
      escalated: 10,
      slaCompliance: 79,
      avgResolutionTime: 7.2,
      repeatDelays: 18,
      population: "1.1M",
      rating: 3.5,
    },
    {
      name: "Jamshedpur",
      totalIssues: 234,
      resolved: 201,
      pending: 28,
      escalated: 5,
      slaCompliance: 86,
      avgResolutionTime: 6.8,
      repeatDelays: 12,
      population: "1.3M",
      rating: 4.1,
    },
    {
      name: "Bokaro",
      totalIssues: 156,
      resolved: 134,
      pending: 18,
      escalated: 4,
      slaCompliance: 86,
      avgResolutionTime: 5.9,
      repeatDelays: 8,
      population: "0.9M",
      rating: 4.3,
    },
    {
      name: "Deoghar",
      totalIssues: 123,
      resolved: 98,
      pending: 22,
      escalated: 3,
      slaCompliance: 80,
      avgResolutionTime: 7.8,
      repeatDelays: 15,
      population: "0.7M",
      rating: 3.8,
    },
  ];

  // Analytics data
  const escalationTrends = [
    { month: "Jan", critical: 12, high: 28, medium: 45, resolved: 78 },
    { month: "Feb", critical: 8, high: 32, medium: 52, resolved: 85 },
    { month: "Mar", critical: 15, high: 35, medium: 48, resolved: 92 },
    { month: "Apr", critical: 10, high: 30, medium: 55, resolved: 88 },
    { month: "May", critical: 18, high: 42, medium: 60, resolved: 95 },
    { month: "Jun", critical: 14, high: 38, medium: 58, resolved: 102 },
  ];

  const categoryBreakdown = [
    { category: "Water Supply", count: 45, percentage: 28 },
    { category: "Infrastructure", count: 38, percentage: 24 },
    { category: "Healthcare", count: 32, percentage: 20 },
    { category: "Sanitation", count: 25, percentage: 16 },
    { category: "Education", count: 20, percentage: 12 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredEscalations = useMemo(() => {
    let filtered = escalatedIssues;
    
    if (selectedDistrict !== "all") {
      filtered = filtered.filter(issue => issue.district === selectedDistrict);
    }
    
    if (priorityFilter !== "all") {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }
    
    return filtered;
  }, [escalatedIssues, selectedDistrict, priorityFilter]);

  const pieColors = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  const handleCreateEscalation = () => {
    if (!newEscalation.title || !newEscalation.district || !newEscalation.category) {
      return;
    }

    const escalation = {
      id: `ESC${String(escalatedIssues.length + 1).padStart(3, '0')}`,
      title: newEscalation.title,
      district: newEscalation.district,
      municipality: newEscalation.municipality || `${newEscalation.district} Municipal Corporation`,
      category: newEscalation.category,
      priority: newEscalation.priority,
      escalatedBy: "State Secretary",
      escalatedDate: new Date().toISOString().split('T')[0],
      originalIssueDate: new Date().toISOString().split('T')[0],
      daysOverdue: 0,
      status: "Under Review",
      description: newEscalation.description,
      impact: newEscalation.impact,
      repeatCount: 0,
      lastResolution: null,
    };

    setEscalatedIssues(prev => [escalation, ...prev]);
    setNewEscalation({
      title: "",
      district: "",
      municipality: "",
      category: "",
      priority: "High",
      description: "",
      impact: "Medium",
    });
    setNewEscalationOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <DashboardHeader title="State Dashboard" userRole="State Secretary" />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Jharkhand State Escalation Center</h1>
              <p className="text-xl text-blue-100">
                Monitor, analyze, and ensure accountability across all districts
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
               <Button 
                 className="bg-blue-600 hover:bg-blue-700"
                 onClick={() => setNewEscalationOpen(true)}
               >
                 <Flag className="mr-2 h-4 w-4" />
                 New Escalation
               </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stateStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <div className="flex items-center">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : stat.trend === "down" ? (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <div className="flex items-center">
                    <span className={`text-xs font-medium ${
                      stat.trend === "up" ? "text-green-600" : 
                      stat.trend === "down" ? "text-red-600" : 
                      "text-gray-600"
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card className="sticky top-20 h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
                <CardDescription>State-level oversight tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeSection === "escalations" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("escalations")}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Escalations
                </Button>
                <Button
                  variant={activeSection === "districts" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("districts")}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  District Comparison
                </Button>
                <Button
                  variant={activeSection === "analytics" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("analytics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button
                  variant={activeSection === "policy" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("policy")}
                >
                  <Target className="mr-2 h-4 w-4" />
                  Policy Insights
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as any)}>
              <TabsList className="hidden">
                <TabsTrigger value="escalations">Escalations</TabsTrigger>
                <TabsTrigger value="districts">Districts</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="policy">Policy</TabsTrigger>
              </TabsList>

              {/* Escalations Tab */}
              <TabsContent value="escalations" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl">Escalated Issues</CardTitle>
                        <CardDescription>
                          Monitor critical issues requiring state-level intervention
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Filter className="mr-2 h-4 w-4" />
                              Filter
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                              All Priorities
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("Critical")}>
                              Critical
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("High")}>
                              High
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriorityFilter("Medium")}>
                              Medium
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Building2 className="mr-2 h-4 w-4" />
                              {selectedDistrict === "all" ? "All Districts" : selectedDistrict}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedDistrict("all")}>
                              All Districts
                            </DropdownMenuItem>
                            {districtPerformance.map((district) => (
                              <DropdownMenuItem 
                                key={district.name}
                                onClick={() => setSelectedDistrict(district.name)}
                              >
                                {district.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredEscalations.map((issue) => (
                        <Card key={issue.id} className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-lg font-semibold">{issue.title}</h3>
                                  <Badge className={getPriorityColor(issue.priority)}>
                                    {issue.priority}
                                  </Badge>
                                  <Badge className={getStatusColor(issue.status)}>
                                    {issue.status}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                  <span className="flex items-center">
                                    <Building2 className="h-4 w-4 mr-1" />
                                    {issue.district}
                                  </span>
                                  <span>Escalated by {issue.escalatedBy}</span>
                                  <span className="text-red-600 font-medium">
                                    {issue.daysOverdue} days overdue
                                  </span>
                                  {issue.repeatCount > 0 && (
                                    <span className="text-orange-600 font-medium">
                                      Repeat #{issue.repeatCount}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedEscalation(issue)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button size="sm">
                                  <Zap className="h-4 w-4 mr-1" />
                                  Take Action
                                </Button>
                              </div>
                            </div>
                            <p className="text-slate-700 mb-3">{issue.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className={`text-sm font-medium ${getImpactColor(issue.impact)}`}>
                                  Impact: {issue.impact}
                                </span>
                                <span className="text-sm text-slate-500">
                                  Category: {issue.category}
                                </span>
                              </div>
                              <div className="text-sm text-slate-500">
                                Escalated: {issue.escalatedDate}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* District Comparison Tab */}
              <TabsContent value="districts" className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">District Performance Comparison</CardTitle>
                    <CardDescription>
                      Compare performance metrics across all districts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {districtPerformance.map((district, index) => (
                        <Card key={district.name} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-xl font-semibold">{district.name}</h3>
                                  <Badge variant="outline">Population: {district.population}</Badge>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span className="text-sm font-medium">{district.rating}/5</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Total Issues:</span>
                                    <div className="font-semibold">{district.totalIssues}</div>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Resolved:</span>
                                    <div className="font-semibold text-green-600">{district.resolved}</div>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Pending:</span>
                                    <div className="font-semibold text-orange-600">{district.pending}</div>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Escalated:</span>
                                    <div className="font-semibold text-red-600">{district.escalated}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">
                                  {district.slaCompliance}%
                                </div>
                                <div className="text-sm text-slate-600">SLA Compliance</div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Resolution Rate</span>
                                  <span>{Math.round((district.resolved / district.totalIssues) * 100)}%</span>
                                </div>
                                <Progress 
                                  value={(district.resolved / district.totalIssues) * 100} 
                                  className="h-2"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-slate-600">Avg Resolution Time:</span>
                                  <div className="font-semibold">{district.avgResolutionTime} days</div>
                                </div>
                                <div>
                                  <span className="text-slate-600">Repeat Delays:</span>
                                  <div className="font-semibold text-red-600">{district.repeatDelays}</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Escalation Trends</CardTitle>
                      <CardDescription>Monthly escalation patterns by priority</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={escalationTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="critical"
                              stackId="1"
                              stroke="#ef4444"
                              fill="#ef4444"
                              name="Critical"
                            />
                            <Area
                              type="monotone"
                              dataKey="high"
                              stackId="1"
                              stroke="#f59e0b"
                              fill="#f59e0b"
                              name="High"
                            />
                            <Area
                              type="monotone"
                              dataKey="medium"
                              stackId="1"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              name="Medium"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Issue Category Breakdown</CardTitle>
                      <CardDescription>Distribution of escalated issues by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryBreakdown}
                              dataKey="count"
                              nameKey="category"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label={({ category, percentage }) => `${category}: ${percentage}%`}
                            >
                              {categoryBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>District Performance Matrix</CardTitle>
                    <CardDescription>SLA compliance vs resolution time across districts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart data={districtPerformance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="avgResolutionTime" 
                            name="Resolution Time (days)"
                            type="number"
                            scale="linear"
                          />
                          <YAxis 
                            dataKey="slaCompliance" 
                            name="SLA Compliance (%)"
                            type="number"
                            scale="linear"
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value, name) => [value, name]}
                          />
                          <Scatter 
                            dataKey="repeatDelays" 
                            fill="#ef4444"
                            name="Repeat Delays"
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Policy Insights Tab */}
              <TabsContent value="policy" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Policy Recommendations</CardTitle>
                      <CardDescription>Data-driven insights for policy improvements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-900 mb-2">Water Infrastructure Investment</h4>
                        <p className="text-sm text-blue-800">
                          Based on 45 water-related escalations, recommend increased investment in 
                          water infrastructure for Ranchi and Dhanbad districts.
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-orange-900 mb-2">SLA Standardization</h4>
                        <p className="text-sm text-orange-800">
                          Implement standardized SLA timelines across all districts to improve 
                          consistency and accountability.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-900 mb-2">Performance Incentives</h4>
                        <p className="text-sm text-green-800">
                          Introduce performance-based incentives for districts with high SLA 
                          compliance and low repeat delays.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Accountability Metrics</CardTitle>
                      <CardDescription>Key performance indicators for governance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">Average Resolution Time</span>
                        <span className="text-2xl font-bold text-blue-600">7.2 days</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">Repeat Delay Rate</span>
                        <span className="text-2xl font-bold text-red-600">12.5%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">Citizen Satisfaction</span>
                        <span className="text-2xl font-bold text-green-600">4.1/5</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">Budget Utilization</span>
                        <span className="text-2xl font-bold text-purple-600">87%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Escalation Details Dialog */}
      <Dialog
        open={!!selectedEscalation}
        onOpenChange={(open) => !open && setSelectedEscalation(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedEscalation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Escalation Details</span>
                  <Badge className={getPriorityColor(selectedEscalation.priority)}>
                    {selectedEscalation.priority}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{selectedEscalation.title}</h3>
                    <p className="text-slate-600">{selectedEscalation.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">District:</span>
                      <span className="font-medium">{selectedEscalation.district}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Municipality:</span>
                      <span className="font-medium">{selectedEscalation.municipality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Category:</span>
                      <span className="font-medium">{selectedEscalation.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Escalated By:</span>
                      <span className="font-medium">{selectedEscalation.escalatedBy}</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedEscalation.daysOverdue}
                    </div>
                    <div className="text-sm text-red-800">Days Overdue</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedEscalation.repeatCount}
                    </div>
                    <div className="text-sm text-orange-800">Repeat Count</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedEscalation.impact}
                    </div>
                    <div className="text-sm text-blue-800">Impact Level</div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedEscalation(null)}>
                  Close
                </Button>
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Take Immediate Action
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
       </Dialog>

       {/* New Escalation Dialog */}
       <Dialog open={newEscalationOpen} onOpenChange={setNewEscalationOpen}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>Create New Escalation</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="title">Issue Title *</Label>
                 <Input
                   id="title"
                   value={newEscalation.title}
                   onChange={(e) => setNewEscalation(prev => ({ ...prev, title: e.target.value }))}
                   placeholder="Enter issue title"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="district">District *</Label>
                 <Input
                   id="district"
                   value={newEscalation.district}
                   onChange={(e) => setNewEscalation(prev => ({ ...prev, district: e.target.value }))}
                   placeholder="Enter district name"
                 />
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="municipality">Municipality</Label>
                 <Input
                   id="municipality"
                   value={newEscalation.municipality}
                   onChange={(e) => setNewEscalation(prev => ({ ...prev, municipality: e.target.value }))}
                   placeholder="Enter municipality name"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="category">Category *</Label>
                 <Input
                   id="category"
                   value={newEscalation.category}
                   onChange={(e) => setNewEscalation(prev => ({ ...prev, category: e.target.value }))}
                   placeholder="e.g., Water Supply, Infrastructure"
                 />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="priority">Priority</Label>
                 <select
                   id="priority"
                   value={newEscalation.priority}
                   onChange={(e) => setNewEscalation(prev => ({ ...prev, priority: e.target.value }))}
                   className="w-full p-2 border border-gray-300 rounded-md"
                 >
                   <option value="Critical">Critical</option>
                   <option value="High">High</option>
                   <option value="Medium">Medium</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="impact">Impact Level</Label>
                 <select
                   id="impact"
                   value={newEscalation.impact}
                   onChange={(e) => setNewEscalation(prev => ({ ...prev, impact: e.target.value }))}
                   className="w-full p-2 border border-gray-300 rounded-md"
                 >
                   <option value="High">High</option>
                   <option value="Medium">Medium</option>
                   <option value="Low">Low</option>
                 </select>
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
               <textarea
                 id="description"
                 value={newEscalation.description}
                 onChange={(e) => setNewEscalation(prev => ({ ...prev, description: e.target.value }))}
                 placeholder="Describe the issue in detail"
                 className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
               />
             </div>
           </div>
           <DialogFooter>
             <Button variant="outline" onClick={() => setNewEscalationOpen(false)}>
               Cancel
             </Button>
             <Button onClick={handleCreateEscalation}>
               <Flag className="mr-2 h-4 w-4" />
               Create Escalation
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     </div>
   );
 };
 
 export default StateDashboard;
