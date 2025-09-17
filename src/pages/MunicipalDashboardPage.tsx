import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Calendar
} from "lucide-react";

const MunicipalDashboardPage = () => {
  const cityStats = [
    { label: "Total Issues", value: "1,247", change: "+8%", icon: Shield, color: "primary" },
    { label: "Resolved This Month", value: "892", change: "+15%", icon: CheckCircle, color: "success" },
    { label: "SLA Compliance", value: "87%", change: "+3%", icon: TrendingUp, color: "warning" },
    { label: "Active Departments", value: "12", change: "0%", icon: Building2, color: "accent" }
  ];

  const departmentPerformance = [
    { name: "Roads & Infrastructure", resolved: 245, pending: 32, slaCompliance: 89, rating: 4.2 },
    { name: "Sanitation", resolved: 198, pending: 28, slaCompliance: 92, rating: 4.5 },
    { name: "Water Department", resolved: 167, pending: 15, slaCompliance: 95, rating: 4.7 },
    { name: "Electrical", resolved: 134, pending: 22, slaCompliance: 85, rating: 4.1 },
    { name: "Traffic", resolved: 89, pending: 18, slaCompliance: 88, rating: 4.3 }
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
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Municipal Control Center
            </h1>
            <p className="text-muted-foreground">City-wide oversight and department coordination</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="btn-government">
              <AlertCircle className="mr-2 h-4 w-4" />
              Escalate to State
            </Button>
          </div>
        </div>

        {/* City Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* City-wide Map */}
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

        {/* Department Performance */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle>Department Performance Overview</CardTitle>
            <CardDescription>Track efficiency and SLA compliance across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{dept.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Resolved: {dept.resolved}</span>
                        <span>Pending: {dept.pending}</span>
                        <span>Rating: {dept.rating}★</span>
                      </div>
                    </div>
                    <Badge className={`status-${dept.slaCompliance >= 90 ? 'success' : dept.slaCompliance >= 80 ? 'warning' : 'danger'}`}>
                      {dept.slaCompliance}% SLA
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SLA Compliance</span>
                      <span>{dept.slaCompliance}%</span>
                    </div>
                    <Progress value={dept.slaCompliance} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Escalated Issues */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-danger" />
              Escalated Issues
            </CardTitle>
            <CardDescription>Issues requiring municipal intervention or state escalation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {escalatedIssues.map((issue) => (
                <div key={issue.id} className="border border-border rounded-lg p-4 bg-danger/5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                        <Badge variant="outline">{issue.id}</Badge>
                        <Badge className={`status-${issue.severity === 'Critical' ? 'danger' : 'warning'}`}>
                          {issue.severity}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{issue.department}</span>
                        <span>{issue.ward}</span>
                        <span>Escalated: {issue.escalatedTime}</span>
                      </div>
                      
                      <p className="text-sm text-danger font-medium">
                        Reason: {issue.reason}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Assign Resources
                      </Button>
                      <Button variant="outline" size="sm" className="text-danger border-danger">
                        Escalate to State
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
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
      </div>
    </div>
  );
};

export default MunicipalDashboardPage;