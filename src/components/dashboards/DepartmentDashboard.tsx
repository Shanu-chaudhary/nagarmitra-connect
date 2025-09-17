import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  UserPlus,
  FileText,
  Bell,
  BarChart3,
  Filter
} from "lucide-react";

const DepartmentDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const departmentStats = [
    { label: "Total Issues", value: "127", icon: FileText, color: "primary", change: "+12%" },
    { label: "In Progress", value: "45", icon: Clock, color: "warning", change: "+5%" },
    { label: "Resolved Today", value: "23", icon: CheckCircle, color: "success", change: "+18%" },
    { label: "SLA Breaches", value: "8", icon: AlertTriangle, color: "danger", change: "-15%" },
  ];

  const recentIssues = [
    {
      id: "ISS001",
      title: "Pothole on MG Road",
      location: "Ward 12, MG Road",
      priority: "High",
      category: "Road Repair",
      submittedBy: "Rajesh Kumar",
      timeAgo: "2 hours ago",
      slaRemaining: "4 hours",
      status: "Pending Assignment",
      urgencyLevel: 90
    },
    {
      id: "ISS002",
      title: "Street Light Malfunction",
      location: "Ward 15, Station Road",
      priority: "Medium",
      category: "Electrical",
      submittedBy: "Priya Singh",
      timeAgo: "4 hours ago",
      slaRemaining: "1 day",
      status: "Assigned",
      worker: "Electrician Team A",
      urgencyLevel: 60
    },
    {
      id: "ISS003",
      title: "Garbage Collection Missed",
      location: "Ward 8, Residential Area",
      priority: "Medium",
      category: "Sanitation",
      submittedBy: "Amit Sharma",
      timeAgo: "6 hours ago",
      slaRemaining: "8 hours",
      status: "In Progress",
      worker: "Sanitation Team B",
      urgencyLevel: 75
    }
  ];

  const workers = [
    {
      id: "WRK001",
      name: "Ravi Prasad",
      role: "Senior Road Technician",
      currentLoad: 3,
      maxLoad: 5,
      rating: 4.8,
      availability: "Available",
      lastActive: "Online"
    },
    {
      id: "WRK002",
      name: "Sanjay Kumar",
      role: "Electrical Specialist",
      currentLoad: 2,
      maxLoad: 4,
      rating: 4.6,
      availability: "Busy",
      lastActive: "2 hours ago"
    },
    {
      id: "WRK003",
      name: "Deepak Singh",
      role: "Sanitation Supervisor",
      currentLoad: 4,
      maxLoad: 6,
      rating: 4.7,
      availability: "Available",
      lastActive: "Online"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Assignment": return "danger";
      case "Assigned": return "warning";
      case "In Progress": return "primary";
      case "Resolved": return "success";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "danger";
      case "Medium": return "warning";
      case "Low": return "success";
      default: return "secondary";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "success";
      case "Busy": return "warning";
      case "Offline": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Roads & Infrastructure Department</h1>
            <p className="text-muted-foreground">Manage civic issues and coordinate field operations</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notifications (5)
            </Button>
            <Button className="btn-government">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Worker
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentStats.map((stat, index) => (
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="issues">Issue Management</TabsTrigger>
            <TabsTrigger value="workers">Worker Management</TabsTrigger>
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-6">
            <Card className="government-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Issues</CardTitle>
                    <CardDescription>Prioritized list of issues requiring attention</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="border border-border rounded-lg p-4 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-foreground">{issue.title}</h3>
                            <Badge variant="outline">{issue.id}</Badge>
                            <Badge className={`status-${getPriorityColor(issue.priority)}`}>
                              {issue.priority}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {issue.location}
                            </span>
                            <span>Submitted by {issue.submittedBy}</span>
                            <span>{issue.timeAgo}</span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <Badge className={`status-${getStatusColor(issue.status)}`}>
                              {issue.status}
                            </Badge>
                            {issue.worker && (
                              <span className="text-sm text-muted-foreground">
                                Assigned to: {issue.worker}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">SLA Urgency</span>
                              <span className="font-medium">{issue.slaRemaining} remaining</span>
                            </div>
                            <Progress value={issue.urgencyLevel} className="h-2" />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Assign Worker
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workers" className="space-y-6">
            <Card className="government-card">
              <CardHeader>
                <CardTitle>Worker Management</CardTitle>
                <CardDescription>Manage your department's workforce and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workers.map((worker) => (
                    <Card key={worker.id} className="border border-border hover-lift">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-foreground">{worker.name}</h3>
                              <p className="text-sm text-muted-foreground">{worker.role}</p>
                            </div>
                            <Badge className={`status-${getAvailabilityColor(worker.availability)}`}>
                              {worker.availability}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Current Load</span>
                              <span>{worker.currentLoad}/{worker.maxLoad}</span>
                            </div>
                            <Progress value={(worker.currentLoad / worker.maxLoad) * 100} className="h-2" />
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center">
                              Rating: <span className="ml-1 font-medium text-warning">{worker.rating}★</span>
                            </span>
                            <span className="text-muted-foreground">{worker.lastActive}</span>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Assign Task
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="government-card">
              <CardHeader>
                <CardTitle>Department Jurisdiction Map</CardTitle>
                <CardDescription>View all issues in your department's area of responsibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Interactive Department Map</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Color-coded pins showing issue status and priority<br />
                      Click pins to view details and assign workers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="government-card">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Department efficiency and SLA compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Performance Charts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="government-card">
                <CardHeader>
                  <CardTitle>Issue Trends</CardTitle>
                  <CardDescription>Category-wise issue distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Trend Analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DepartmentDashboard;