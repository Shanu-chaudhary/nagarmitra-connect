import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  HardHat, 
  CheckCircle, 
  Clock, 
  Camera, 
  MapPin,
  FileText,
  Upload
} from "lucide-react";

const WorkerDashboardPage = () => {
  const assignedTasks = [
    {
      id: "TASK001",
      title: "Fix Pothole on MG Road",
      location: "MG Road, Ward 12",
      priority: "High",
      assignedTime: "2 hours ago",
      deadline: "Today 6:00 PM",
      status: "Acknowledged",
      description: "Large pothole causing traffic issues"
    },
    {
      id: "TASK002",
      title: "Install Street Light",
      location: "Station Road, Ward 15",
      priority: "Medium",
      assignedTime: "1 day ago",
      deadline: "Tomorrow 5:00 PM",
      status: "In Progress",
      description: "New street light installation required"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Acknowledged": return "warning";
      case "In Progress": return "primary";
      case "Completed": return "success";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <HardHat className="h-8 w-8 text-primary" />
              Worker Dashboard
            </h1>
            <p className="text-muted-foreground">Your assigned tasks and work progress</p>
          </div>
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            Active Worker
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-sm text-muted-foreground">Pending Tasks</div>
            </CardContent>
          </Card>
          
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Completed This Week</div>
            </CardContent>
          </Card>
          
          <Card className="government-card">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Tasks */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle>My Assigned Tasks</CardTitle>
            <CardDescription>Complete tasks and upload proof of work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignedTasks.map((task) => (
              <div key={task.id} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      <Badge variant="outline">{task.id}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {task.location}
                      </span>
                      <Badge className={`status-${task.priority === 'High' ? 'danger' : 'warning'}`}>
                        {task.priority} Priority
                      </Badge>
                      <Badge className={`status-${getStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Assigned: {task.assignedTime}</span>
                      <span className="text-danger">Deadline: {task.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {task.status === "Acknowledged" && (
                    <Button variant="outline" size="sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Start Work
                    </Button>
                  )}
                  
                  {task.status === "In Progress" && (
                    <>
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Upload Before Photo
                      </Button>
                      <Button className="btn-government" size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Complete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Work Proof Upload */}
        <Card className="government-card">
          <CardHeader>
            <CardTitle>Upload Work Proof</CardTitle>
            <CardDescription>Upload before and after photos as proof of completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">Before Work Photo</p>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">After Work Photo</p>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboardPage;