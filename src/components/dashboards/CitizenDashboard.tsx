import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardHeader from "@/components/layout/DashboardHeader";
import IssueReportModal from "@/components/issues/IssueReportModal";
import { 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Camera,
  Phone,
  FileText,
  TrendingUp
} from "lucide-react";

const CitizenDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showReportModal, setShowReportModal] = useState(false);

  const myComplaints = [
    {
      id: "CMP001",
      title: "Pothole on Main Road",
      category: "Road Issues",
      status: "In Progress",
      priority: "High",
      date: "2024-01-15",
      progress: 75,
      department: "Roads & Infrastructure",
      estimatedTime: "2 days remaining"
    },
    {
      id: "CMP002", 
      title: "Street Light Not Working",
      category: "Street Lighting",
      status: "Resolved",
      priority: "Medium",
      date: "2024-01-10",
      progress: 100,
      department: "Electrical Department",
      resolvedDate: "2024-01-14"
    },
    {
      id: "CMP003",
      title: "Garbage Collection Missed",
      category: "Sanitation",
      status: "Submitted",
      priority: "Medium",
      date: "2024-01-18",
      progress: 25,
      department: "Sanitation Department",
      estimatedTime: "3 days for assignment"
    }
  ];

  const stats = [
    { label: "Total Complaints", value: "3", icon: FileText, color: "primary" },
    { label: "Resolved", value: "1", icon: CheckCircle, color: "success" },
    { label: "In Progress", value: "1", icon: Clock, color: "warning" },
    { label: "Pending", value: "1", icon: AlertTriangle, color: "danger" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "success";
      case "In Progress": return "warning";
      case "Submitted": return "primary";
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Citizen Dashboard" userRole="Citizen" />
      
      <div className="container mx-auto max-w-6xl p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Issues</h2>
            <p className="text-muted-foreground">Manage and track your civic complaints</p>
          </div>
          <Button 
            onClick={() => setShowReportModal(true)}
            className="btn-government flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Report New Issue
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="government-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Report issues through multiple channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 hover-scale">
                <Camera className="h-6 w-6 text-primary" />
                <span>Upload Photo</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 hover-scale">
                <Phone className="h-6 w-6 text-primary" />
                <span>IVRS Call</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 hover-scale">
                <FileText className="h-6 w-6 text-primary" />
                <span>Text Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Complaints */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle>My Complaints</CardTitle>
            <CardDescription>Track the status of your reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myComplaints.map((complaint) => (
                <div key={complaint.id} className="border border-border rounded-lg p-4 hover-lift">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground">{complaint.title}</h3>
                        <Badge variant="outline">{complaint.id}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge className={`status-${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </Badge>
                        <Badge variant="outline" className={`text-${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority} Priority
                        </Badge>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {complaint.department}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {complaint.date}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{complaint.progress}%</span>
                        </div>
                        <Progress value={complaint.progress} className="h-2" />
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {complaint.status === "Resolved" 
                          ? `Resolved on ${complaint.resolvedDate}` 
                          : complaint.estimatedTime
                        }
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {complaint.status === "Resolved" && (
                        <Button variant="outline" size="sm" className="text-warning">
                          Rate Resolution
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locality Map & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="government-card">
            <CardHeader>
              <CardTitle>Locality Issues Map</CardTitle>
              <CardDescription>View issues in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map will show here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Green pins: Resolved issues<br />
                    Red pins: Pending issues
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="government-card">
            <CardHeader>
              <CardTitle>Ward Performance</CardTitle>
              <CardDescription>Resolution statistics for your ward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Resolution Time</span>
                  <span className="text-sm text-muted-foreground">4.2 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resolution Rate</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={87} className="w-20 h-2" />
                    <span className="text-sm text-success">87%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Most Common Issue</span>
                  <span className="text-sm text-muted-foreground">Road Issues</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Citizen Satisfaction</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">4.3/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issue Report Modal */}
      <IssueReportModal 
        open={showReportModal}
        onOpenChange={setShowReportModal}
      />
    </div>
  );
};

export default CitizenDashboard;