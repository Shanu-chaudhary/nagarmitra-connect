import { useState } from "react";
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
import DashboardHeader from "@/components/layout/DashboardHeader";
import IssueReportModal from "@/components/issues/IssueReportModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Camera,
  Phone,
  FileText,
  TrendingUp,
  Star,
  ChevronRight,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  Megaphone,
  Vote,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-zindex-fix.css"; // <-- Add this line (see new file below)

const CitizenDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showReportModal, setShowReportModal] = useState(false);
  // Use LatLngExpression from leaflet for type safety
  const [mapCenter] = useState<LatLngExpression>([23.2599, 77.4126]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(
    null
  );
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "assistant" | "user"; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm your NagarMitra assistant. Ask me anything about reporting issues, tracking status or departments.",
    },
  ]);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingComplaint, setTrackingComplaint] = useState<any>(null);

  // Marker icons for different statuses
  const markerIcons: Record<string, L.Icon> = {
    Submitted: new L.Icon({
      iconUrl:
        "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
      className: "marker-submitted",
    }),
    "In Progress": new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
      className: "marker-inprogress",
    }),
    Resolved: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
      shadowSize: [41, 41],
      className: "marker-resolved",
    }),
  };

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
      estimatedTime: "2 days remaining",
      lat: 23.2599,
      lng: 77.4126,
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
      resolvedDate: "2024-01-14",
      lat: 23.2625,
      lng: 77.409,
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
      estimatedTime: "3 days for assignment",
      lat: 23.254,
      lng: 77.418,
    },
  ];

  const [similarIssues, setSimilarIssues] = useState([
    {
      id: "SIM001",
      title: "Broken manhole near market",
      category: "Drainage",
      votes: 12,
    },
    {
      id: "SIM002",
      title: "Overflowing garbage bin at Block A",
      category: "Sanitation",
      votes: 7,
    },
    {
      id: "SIM003",
      title: "Potholes on 2nd Cross Road",
      category: "Road Issues",
      votes: 19,
    },
  ]);

  const stats = [
    { label: "Total Complaints", value: "3", icon: FileText, color: "primary" },
    { label: "Resolved", value: "1", icon: CheckCircle, color: "success" },
    { label: "In Progress", value: "1", icon: Clock, color: "warning" },
    { label: "Pending", value: "1", icon: AlertTriangle, color: "danger" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      case "Submitted":
        return "primary";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const openFeedback = (complaintId: string) => {
    setSelectedComplaintId(complaintId);
    setFeedbackRating(0);
    setFeedbackComment("");
    setShowFeedbackModal(true);
  };

  const openTracking = (complaint: any) => {
    setTrackingComplaint(complaint);
    setTrackingOpen(true);
  };

  const submitFeedback = () => {
    console.log("Submitting feedback:", {
      complaintId: selectedComplaintId,
      rating: feedbackRating,
      comment: feedbackComment,
    });
    setShowFeedbackModal(false);
  };

  const upvoteSimilarIssue = (id: string) => {
    setSimilarIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, votes: issue.votes + 1 } : issue
      )
    );
  };

  const handleChatSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      {
        role: "assistant",
        content:
          "Thanks! I'll pass this to the team in a real integration. Meanwhile, you can report issues via the Report button or check your complaints below.",
      },
    ]);
    setChatInput("");
  };

  const trackingStages = [
    { key: "Acknowledged", description: "Complaint received and acknowledged" },
    { key: "Assigned", description: "Assigned to relevant department" },
    { key: "In Progress", description: "Work in progress" },
    {
      key: "Under Review",
      description: "Work completed, pending verification",
    },
    { key: "Resolved", description: "Complaint resolved" },
  ];

  const getCurrentStageIndex = (status: string) => {
    switch (status) {
      case "Submitted":
        return 0;
      case "In Progress":
        return 2;
      case "Resolved":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <DashboardHeader title="Citizen Dashboard" userRole="Citizen" />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-sky-50 to-blue-50 border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                Empowering Citizens
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Report, Track and Support Civic Improvements
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Easily register complaints, vote on similar issues, and share
                feedback after resolution. Your voice shapes a better city.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowReportModal(true)}
                className="btn-government h-11 px-5"
              >
                <Plus className="h-4 w-4 mr-2" /> Report New Issue
              </Button>
              <Button
                variant="outline"
                className="h-11 px-5"
                onClick={() => setShowHowItWorks(true)}
              >
                Learn How It Works
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl p-6 section-soft">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-border/80 hover:border-primary/40 transition-colors"
            >
              <div
                className={`absolute inset-x-0 -top-1 h-1 bg-${stat.color}`}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-extrabold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-${stat.color}/10 ring-1 ring-${stat.color}/20`}
                  >
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        {/* Quick Actions */}
        <Card className="government-card">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <div>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-sm">
                Start a report instantly
              </CardDescription>
            </div>

            {/* Report via Call Button */}
            <Button
              asChild
              className="h-12 w-48 rounded-lg bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <a href="tel:+1800123456" aria-label="Report via Call">
                <Phone className="h-5 w-5" />
                <span className="text-sm font-medium">Report via Call</span>
              </a>
            </Button>
          </CardHeader>
        </Card>

        {/* My Complaints */}
        <Card className="government-card mt-6">
          <CardHeader>
            <CardTitle>Your Issues</CardTitle>
            <CardDescription>
              Track the status of your reported issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border border-border rounded-xl p-4 hover-lift bg-card/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground text-lg">
                          {complaint.title}
                        </h3>
                        <Badge variant="outline">{complaint.id}</Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge
                          className={`status-${getStatusColor(
                            complaint.status
                          )}`}
                        >
                          {" "}
                          {complaint.status}{" "}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-${getPriorityColor(
                            complaint.priority
                          )}`}
                        >
                          {" "}
                          {complaint.priority} Priority{" "}
                        </Badge>
                        <span className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {complaint.department}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {complaint.date}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">
                            {complaint.progress}%
                          </span>
                        </div>
                        <Progress value={complaint.progress} className="h-2" />
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {complaint.status === "Resolved"
                          ? `Resolved on ${complaint.resolvedDate}`
                          : complaint.estimatedTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {complaint.status === "Resolved" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-warning"
                          onClick={() => openFeedback(complaint.id)}
                        >
                          Rate Resolution
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="btn-government"
                          onClick={() => openTracking(complaint)}
                        >
                          Follow Update
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
              <CardDescription>View issues in Bhopal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[32rem] rounded-xl overflow-hidden">
                <MapContainer
                  // Remove explicit type annotation from useState, just use mapCenter as LatLngExpression
                  center={mapCenter}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  dragging={true}
                  doubleClickZoom={true}
                  scrollWheelZoom={true}
                  touchZoom={true}
                  boxZoom={true}
                  keyboard={true}
                  zoomControl={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {myComplaints.map((complaint) =>
                    complaint.lat && complaint.lng ? (
                      <Marker
                        key={complaint.id}
                        position={[complaint.lat, complaint.lng]}
                        // Fix: explicitly type as L.Icon for the icon prop
                        icon={
                          markerIcons[
                            complaint.status as keyof typeof markerIcons
                          ] as L.Icon
                        }
                      >
                        <Popup>
                          <div>
                            <strong>{complaint.title}</strong>
                            <br />
                            Status: {complaint.status}
                            <br />
                            Department: {complaint.department}
                            <br />
                            <Button
                              size="sm"
                              className="mt-2 btn-government"
                              onClick={() => openTracking(complaint)}
                            >
                              Track
                            </Button>
                          </div>
                        </Popup>
                      </Marker>
                    ) : null
                  )}
                </MapContainer>
              </div>
              <div className="flex gap-4 mt-3 text-xs items-center">
                <span className="flex items-center gap-1">
                  <img
                    src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                    alt="Resolved"
                    className="w-4 h-6 inline"
                  />
                  <span className="text-success">Resolved</span>
                </span>
                <span className="flex items-center gap-1">
                  <img
                    src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png"
                    alt="In Progress"
                    className="w-4 h-6 inline"
                  />
                  <span className="text-warning">In Progress</span>
                </span>
                <span className="flex items-center gap-1">
                  <img
                    src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png"
                    alt="Submitted"
                    className="w-4 h-6 inline"
                  />
                  <span className="text-primary">Submitted</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="government-card">
            <CardHeader>
              <CardTitle>Ward Performance</CardTitle>
              <CardDescription>
                Resolution statistics for your ward
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Average Resolution Time
                  </span>
                  <span className="text-sm text-muted-foreground">
                    4.2 days
                  </span>
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
                  <span className="text-sm text-muted-foreground">
                    Road Issues
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Citizen Satisfaction
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">4.3/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Similar Issues Voting (moved below Map & Stats) */}
        <Card className="government-card mt-6">
          <CardHeader>
            <CardTitle>Similar Issues In Your Area</CardTitle>
            <CardDescription>
              See and support issues already reported by others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {similarIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between border border-border rounded-xl p-3 bg-card/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {issue.title}
                      </span>
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Already registered by someone else. You can add your
                      support.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="status-primary">
                      {issue.votes} votes
                    </Badge>
                    <Button
                      size="sm"
                      className="btn-government"
                      onClick={() => upvoteSimilarIssue(issue.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" /> Upvote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works Modal */}
      <Dialog open={showHowItWorks} onOpenChange={setShowHowItWorks}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Fixing civic issues is easy as 1-2-3
            </DialogTitle>
            <DialogDescription>
              Follow these simple steps to make your neighbourhood better.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-semibold mb-1">Post a complaint</h4>
              <p className="text-sm text-muted-foreground">
                Report potholes, garbage, bad roads and other civic issues in
                your area.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-semibold mb-1">Get community to vote-up</h4>
              <p className="text-sm text-muted-foreground">
                Votes prioritise your complaint. The more support, the higher
                the priority.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-semibold mb-1">
                Get your complaint resolved
              </h4>
              <p className="text-sm text-muted-foreground">
                Interact with authorities and representatives to get it
                resolved.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex items-start gap-3">
              <Megaphone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Multiple ways to report</p>
                <p className="text-sm text-muted-foreground">
                  Use text, photo or voice note to lodge your complaint.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Vote className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Support similar issues</p>
                <p className="text-sm text-muted-foreground">
                  Upvote issues already registered to boost visibility.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Share feedback</p>
                <p className="text-sm text-muted-foreground">
                  Rate the resolution and keep issues active for 10 days.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowHowItWorks(false)}>
              Close
            </Button>
            <Button
              className="btn-government"
              onClick={() => {
                setShowHowItWorks(false);
                setShowReportModal(true);
              }}
            >
              Report an Issue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tracking Modal */}
      <Dialog open={trackingOpen} onOpenChange={setTrackingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Issue Tracking</DialogTitle>
            <DialogDescription>
              {trackingComplaint
                ? `${trackingComplaint.id} • ${trackingComplaint.title}`
                : ""}
            </DialogDescription>
          </DialogHeader>
          {trackingComplaint && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">
                    {trackingComplaint.department}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Status</span>
                  <Badge
                    className={`status-${getStatusColor(
                      trackingComplaint.status
                    )}`}
                  >
                    {trackingComplaint.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                {trackingStages.map((stage, idx) => {
                  const current = getCurrentStageIndex(
                    trackingComplaint.status
                  );
                  const reached = idx <= current;
                  return (
                    <div key={stage.key} className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center text-xs border ${
                          reached
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            reached
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {stage.key}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Overall Progress
                  </span>
                  <span className="font-medium">
                    {trackingComplaint.progress}%
                  </span>
                </div>
                <Progress value={trackingComplaint.progress} className="h-2" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Feedback Modal (restored) */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Resolution</DialogTitle>
            <DialogDescription>
              Share your feedback with the department for complaint{" "}
              {selectedComplaintId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setFeedbackRating(r)}
                    className={`p-2 rounded hover:bg-muted ${
                      feedbackRating >= r
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                    aria-label={`Rate ${r} star${r > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        feedbackRating >= r ? "fill-warning text-warning" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Comments (optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Describe your experience with the resolution"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="btn-government"
                disabled={feedbackRating === 0}
                onClick={submitFeedback}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chatbot Floating Button */}
      <Button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg btn-government"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Chatbot Sidebar */}
      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" /> Citizen AI Assistant
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-2">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-lg p-3 text-sm ${
                  m.role === "assistant"
                    ? "bg-muted self-start"
                    : "bg-primary text-primary-foreground self-end ml-auto"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Type your question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChatSend();
              }}
            />
            <Button onClick={handleChatSend} className="btn-government">
              Send
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Issue Report Modal */}
      <IssueReportModal
        open={showReportModal}
        onOpenChange={setShowReportModal}
      />
    </div>
  );
};

export default CitizenDashboard;
