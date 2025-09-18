import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { 
  MapPin,
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  UserPlus,
  Users,
  FileText,
  Bell,
  BarChart3,
  Filter
} from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 

const HealthDepartmentDashboard = () => {
  const [priorityFilter, setPriorityFilter] = useState<"all" | "High" | "Medium" | "Low">("all");
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null);
  const [assignIssue, setAssignIssue] = useState<any | null>(null);
  const [activeSection, setActiveSection] = useState<"issues" | "workers" | "map" | "analytics">("issues");

  const departmentStats = [
    { label: "Total Issues", value: "89", icon: FileText, color: "primary", change: "+9%" },
    { label: "In Progress", value: "28", icon: Clock, color: "warning", change: "+3%" },
    { label: "Resolved Today", value: "18", icon: CheckCircle, color: "success", change: "+12%" },
    { label: "SLA Breaches", value: "5", icon: AlertTriangle, color: "danger", change: "-10%" },
  ];

  const [allIssues, setAllIssues] = useState([
    {
      id: "HIS001",
      title: "Garbage Collection Missed",
      location: "Ward 8, Residential Area",
      priority: "High",
      category: "Sanitation",
      submittedBy: "Amit Sharma",
      timeAgo: "1 hour ago",
      slaRemaining: "6 hours",
      status: "New",
      urgencyLevel: 85,
      description: "Garbage not collected for 2 days, foul smell reported.",
      attachments: {
        photos: [
          "https://images.unsplash.com/photo-1599859580165-c30b84a56686?w=800&auto=format&fit=crop&q=60"
        ],
        videos: [] as string[]
      }
    },
    {
      id: "HIS002",
      title: "Open Drain Causing Mosquito Breeding",
      location: "Ward 4, Near Market",
      priority: "Medium",
      category: "Public Health",
      submittedBy: "Sunita Devi",
      timeAgo: "3 hours ago",
      slaRemaining: "1 day",
      status: "Pending",
      worker: "Sanitation Team A",
      urgencyLevel: 60,
      description: "Stagnant water in open drain reported, risk of dengue.",
      attachments: { photos: [], videos: [] as string[] }
    },
    {
      id: "HIS003",
      title: "Overflowing Public Dustbin",
      location: "Ward 2, Bus Stand",
      priority: "Low",
      category: "Sanitation",
      submittedBy: "Rohit Gupta",
      timeAgo: "5 hours ago",
      slaRemaining: "18 hours",
      status: "In Progress",
      worker: "Sanitation Team B",
      urgencyLevel: 45,
      description: "Public dustbin overflowing, needs immediate clearance.",
      attachments: { photos: [], videos: [] as string[] }
    },
    {
      id: "HIS004",
      title: "Drain Cleaning Completed",
      location: "Ward 6, Market Area",
      priority: "Medium",
      category: "Sanitation",
      submittedBy: "Rajesh Kumar",
      timeAgo: "2 days ago",
      slaRemaining: "Completed",
      status: "Resolved",
      worker: "Sanitation Team C",
      urgencyLevel: 0,
      description: "Drain cleaning work completed successfully.",
      attachments: { photos: [], videos: [] as string[] }
    }
  ]);

  const [workers, setWorkers] = useState([
    { id: "HWK001", name: "Neha Kumari", role: "Sanitation Supervisor", currentLoad: 3, maxLoad: 6, rating: 4.7, availability: "Available", lastActive: "Online" },
    { id: "HWK002", name: "Imran Ali", role: "Public Health Inspector", currentLoad: 1, maxLoad: 4, rating: 4.5, availability: "Busy", lastActive: "1 hour ago" },
    { id: "HWK003", name: "Anita Verma", role: "Sanitation Worker", currentLoad: 2, maxLoad: 5, rating: 4.6, availability: "Available", lastActive: "Online" },
  ]);
  const [addWorkerOpen, setAddWorkerOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", role: "", maxLoad: 5 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "danger";
      case "Pending": return "warning";
      case "In Progress": return "primary";
      case "Resolved": return "success";
      default: return "secondary";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "Low":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      default:
        return "bg-secondary text-secondary-foreground";
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

  const [activeIssueTab, setActiveIssueTab] = useState<"new" | "pending" | "in-progress" | "resolved">("new");

  const getIssuesByStatus = (status: string) => {
    return allIssues.filter(issue => issue.status === status);
  };

  const filteredIssues = useMemo(() => {
    const statusIssues = getIssuesByStatus(
      activeIssueTab === "new" ? "New" :
      activeIssueTab === "pending" ? "Pending" :
      activeIssueTab === "in-progress" ? "In Progress" :
      "Resolved"
    );
    
    if (priorityFilter === "all") return statusIssues;
    return statusIssues.filter((i) => i.priority === priorityFilter);
  }, [allIssues, activeIssueTab, priorityFilter]);

  const handleAssignToWorker = (issueId: string, workerName: string) => {
    setAllIssues((prev) => prev.map((i) => i.id === issueId ? { ...i, worker: workerName, status: "Pending" } : i));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Health & Sanitation Department" userRole="Department Officer" />
      
      <div className="container mx-auto max-w-6xl p-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Department Overview</h2>
            <p className="text-muted-foreground">Manage sanitation and public health issues</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notifications (3)
            </Button>
            <Button className="btn-government" onClick={() => setAddWorkerOpen(true)}>
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

        {/* Body layout with in-page sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">Department</CardTitle>
                <CardDescription>Quick navigation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant={activeSection === "issues" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveSection("issues")}>
                  <FileText className="mr-2 h-4 w-4" /> Issue Management
                </Button>
                <Button variant={activeSection === "workers" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveSection("workers")}>
                  <Users className="mr-2 h-4 w-4" /> Worker Management
                </Button>
                <Button variant={activeSection === "map" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveSection("map")}>
                  <MapPin className="mr-2 h-4 w-4" /> Interactive Map
                </Button>
                <Button variant={activeSection === "analytics" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveSection("analytics")}>
                  <BarChart3 className="mr-2 h-4 w-4" /> Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-9">
            <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as any)} className="space-y-6">
              <TabsList className="hidden">
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
                    <CardTitle>Issue Management</CardTitle>
                    <CardDescription>Manage sanitation and health issues by status</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter {priorityFilter !== "all" && `(${priorityFilter})`}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                          All Priorities
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPriorityFilter("High")}>
                          High Priority
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPriorityFilter("Medium")}>
                          Medium Priority
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPriorityFilter("Low")}>
                          Low Priority
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeIssueTab} onValueChange={(value) => setActiveIssueTab(value as any)} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="new">New Issues ({getIssuesByStatus("New").length})</TabsTrigger>
                    <TabsTrigger value="pending">Pending ({getIssuesByStatus("Pending").length})</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress ({getIssuesByStatus("In Progress").length})</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved ({getIssuesByStatus("Resolved").length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeIssueTab} className="space-y-4">
                    <div className="space-y-4">
                      {filteredIssues.map((issue) => (
                    <div key={issue.id} className="border border-border rounded-lg p-4 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-foreground">{issue.title}</h3>
                            <Badge variant="outline">{issue.id}</Badge>
                            <Badge className={getPriorityBadgeClass(issue.priority)}>
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
                          <Button variant="outline" size="sm" onClick={() => setAssignIssue(issue)}>
                            Assign Worker
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedIssue(issue)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workers" className="space-y-6">
            <Card className="government-card">
              <CardHeader>
                <CardTitle>Worker Management</CardTitle>
                <CardDescription>Manage sanitation workforce and assignments</CardDescription>
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
                <CardDescription>View all sanitation issues in your area</CardDescription>
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
      </div>

      {/* View Details Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
        <DialogContent className="max-w-2xl">
          {selectedIssue && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between w-full">
                  <span>Issue Details</span>
                  <Badge variant="outline">{selectedIssue.id}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{selectedIssue.title}</h3>
                  <Badge className={getPriorityBadgeClass(selectedIssue.priority)}>{selectedIssue.priority}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <div className="font-medium">{selectedIssue.category}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div><Badge className={`status-${getStatusColor(selectedIssue.status)}`}>{selectedIssue.status}</Badge></div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <div className="font-medium">{selectedIssue.location}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Submitted By:</span>
                    <div className="font-medium">{selectedIssue.submittedBy}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">SLA Remaining:</span>
                    <div className="font-medium">{selectedIssue.slaRemaining}</div>
                  </div>
                  {selectedIssue.worker && (
                    <div>
                      <span className="text-muted-foreground">Assigned Worker:</span>
                      <div className="font-medium">{selectedIssue.worker}</div>
                    </div>
                  )}
                </div>
                {selectedIssue.description && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Description</div>
                    <div>{selectedIssue.description}</div>
                  </div>
                )}
                <Separator />
                {(selectedIssue.attachments?.photos?.length || 0) > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Photos</div>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedIssue.attachments.photos.map((src: string, idx: number) => (
                        <img key={idx} src={src} alt={`photo-${idx}`} className="w-full h-24 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                )}
                {(selectedIssue.attachments?.videos?.length || 0) > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Videos</div>
                    <div className="space-y-2">
                      {selectedIssue.attachments.videos.map((src: string, idx: number) => (
                        <video key={idx} src={src} controls className="w-full rounded" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Worker Dialog */}
      <Dialog open={!!assignIssue} onOpenChange={(open) => !open && setAssignIssue(null)}>
        <DialogContent className="max-w-xl">
          {assignIssue && (
            <>
              <DialogHeader>
                <DialogTitle>Assign Worker</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Select a worker to assign to issue <Badge variant="outline">{assignIssue.id}</Badge></div>
                <div className="grid grid-cols-1 gap-3">
                  {workers.map((w) => (
                    <div key={w.id} className="flex items-center justify-between border rounded p-3">
                      <div>
                        <div className="font-medium">{w.name}</div>
                        <div className="text-sm text-muted-foreground">{w.role} • Load {w.currentLoad}/{w.maxLoad}</div>
                      </div>
                      <Button size="sm" onClick={() => { handleAssignToWorker(assignIssue.id, w.name); setAssignIssue(null); }}>Assign</Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Worker Dialog */}
      <Dialog open={addWorkerOpen} onOpenChange={setAddWorkerOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Worker</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="hwname">Full Name</Label>
              <Input id="hwname" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} placeholder="Enter worker name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hwrole">Role</Label>
              <Input id="hwrole" value={newWorker.role} onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })} placeholder="e.g., Sanitation Worker" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hwmax">Max Load</Label>
              <Input id="hwmax" type="number" min={1} max={10} value={newWorker.maxLoad} onChange={(e) => setNewWorker({ ...newWorker, maxLoad: Number(e.target.value || 0) })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddWorkerOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!newWorker.name || !newWorker.role || newWorker.maxLoad <= 0) return;
              const id = `HWK${(Math.random()*100000).toFixed(0)}`;
              setWorkers((prev) => [
                ...prev,
                {
                  id,
                  name: newWorker.name,
                  role: newWorker.role,
                  currentLoad: 0,
                  maxLoad: newWorker.maxLoad,
                  rating: 4.5,
                  availability: "Available",
                  lastActive: "Online",
                }
              ]);
              setNewWorker({ name: "", role: "", maxLoad: 5 });
              setAddWorkerOpen(false);
            }}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthDepartmentDashboard;


