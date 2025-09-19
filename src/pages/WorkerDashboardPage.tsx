import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  HardHat, 
  CheckCircle, 
  Clock, 
  Camera, 
  MapPin,
  FileText,
	AlertTriangle,
	Calendar,
	User as UserIcon,
	Info
} from "lucide-react";

type Priority = "High" | "Medium" | "Low";

type Task = {
	id: string;
	title: string;
	description: string;
	location: string;
	deadline: string;
	citizen: string;
	priority: Priority;
	status: "Assigned" | "In Progress" | "Completed";
	beforeImage?: string; // object URL
	afterImage?: string; // object URL
	acknowledgedAt?: string;
	completedAt?: string;
};

const WorkerDashboardPage = () => {
	const [activeTab, setActiveTab] = useState<"new" | "inprogress" | "completed">("new");
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [detailsTask, setDetailsTask] = useState<Task | null>(null);

	// Initial demo tasks
	const [newTasks, setNewTasks] = useState<Task[]>([
		{
			id: "TASK1001",
			title: "Streetlight Repair",
			priority: "Medium",
			description:
				"The main streetlight in the colony has been non-functional for 3 days. Check bulb and wiring.",
			location: "Sector 2, Ward 15",
			deadline: "24/12/2024",
			citizen: "Sunita Devi",
			status: "Assigned"
		},
		{
			id: "TASK2001",
			title: "Garbage Overflow Cleanup",
			priority: "High",
			description: "Overflowing bin near market area. Immediate cleaning required.",
			location: "Market Road, Ward 8",
			deadline: "Today 5:00 PM",
			citizen: "Ravi Kumar",
			status: "Assigned"
		},
		{
			id: "TASK2002",
			title: "Water Pipe Leakage",
			priority: "High",
			description: "Leak detected causing water on the road. Needs repair.",
			location: "Near Community Hall, Ward 9",
			deadline: "Tomorrow 11:00 AM",
			citizen: "Priya Singh",
			status: "Assigned"
		},
		{
			id: "TASK2003",
			title: "Park Bench Repair",
			priority: "Low",
			description: "Broken bench slat in the central park. Replace slat and tighten screws.",
			location: "Central Park, Ward 3",
			deadline: "28/12/2024",
			citizen: "Neha Verma",
			status: "Assigned"
		}
	]);
	const [inProgressTasks, setInProgressTasks] = useState<Task[]>([
		{
			id: "TASK1002",
      title: "Fix Pothole on MG Road",
			priority: "High",
			description: "Large pothole causing traffic issues",
      location: "MG Road, Ward 12",
      deadline: "Today 6:00 PM",
			citizen: "Ajay Kumar",
			status: "In Progress",
			beforeImage: undefined
		},
		{
			id: "TASK2004",
			title: "Street Sign Replacement",
			priority: "Medium",
			description: "Damaged street name sign needs replacement.",
			location: "School Street, Ward 10",
			deadline: "Tomorrow 4:00 PM",
			citizen: "Suman Rao",
			status: "In Progress",
			beforeImage: undefined
		},
		{
			id: "TASK2005",
			title: "Drain Cleaning",
      priority: "Medium",
			description: "Clogged drain causing foul smell and overflow.",
			location: "Lane 5, Ward 6",
			deadline: "Today 7:00 PM",
			citizen: "Imran Ali",
			status: "In Progress",
			beforeImage: undefined
		}
	]);
	const [completedTasks, setCompletedTasks] = useState<Task[]>([
		{
			id: "TASK1999",
			title: "Tree Pruning",
			priority: "Low",
			description: "Overgrown branches near electric lines trimmed.",
			location: "Temple Road, Ward 2",
			deadline: "Yesterday",
			citizen: "Geeta Sharma",
			status: "Completed",
			beforeImage: "/placeholder.svg",
			afterImage: "/placeholder.svg",
			acknowledgedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toLocaleString(),
			completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toLocaleString()
		}
	]);

	// Camera capture handling
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [captureFor, setCaptureFor] = useState<{ type: "before" | "after"; taskId: string } | null>(null);

	const triggerCamera = (type: "before" | "after", taskId: string) => {
		setCaptureFor({ type, taskId });
		fileInputRef.current?.click();
	};

	const openDetails = (task: Task) => {
		setDetailsTask(task);
		setDetailsOpen(true);
	};

	const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !captureFor) return;
		const url = URL.createObjectURL(file);

		if (captureFor.type === "before") {
			// Acknowledge: attach before image and move task to In Progress
			setNewTasks((prev) => {
				const t = prev.find((x) => x.id === captureFor.taskId);
				if (!t) return prev;
				const remaining = prev.filter((x) => x.id !== captureFor.taskId);
				const moved: Task = {
					...t,
					beforeImage: url,
      status: "In Progress",
					acknowledgedAt: new Date().toLocaleString()
				};
				setInProgressTasks((cur) => [moved, ...cur]);
				setActiveTab("inprogress");
				return remaining;
			});
		} else {
			// After image on in-progress task
			setInProgressTasks((prev) =>
				prev.map((t) => (t.id === captureFor.taskId ? { ...t, afterImage: url } : t))
			);
		}

		// reset input
		e.currentTarget.value = "";
		setCaptureFor(null);
	};

	const markDone = (taskId: string) => {
		const task = inProgressTasks.find((t) => t.id === taskId);
		if (!task || !task.beforeImage || !task.afterImage) return;
		setInProgressTasks((prev) => prev.filter((t) => t.id !== taskId));
		setCompletedTasks((prev) => [
			{ ...task, status: "Completed", completedAt: new Date().toLocaleString() },
			...prev,
		]);
		setActiveTab("completed");
	};

  const getStatusColor = (status: string) => {
    switch (status) {
			case "Assigned":
				return "primary";
			case "In Progress":
				return "warning";
			case "Completed":
				return "success";
			default:
				return "secondary";
		}
	};

	const StatCard = ({ icon: Icon, value, label, color }: { icon: any; value: number | string; label: string; color: string }) => (
		<Card className="government-card text-center">
			<CardContent className="p-6">
				<Icon className={`h-8 w-8 text-${color} mx-auto mb-2`} />
				<div className="text-2xl font-bold text-foreground">{value}</div>
				<div className="text-sm text-muted-foreground">{label}</div>
			</CardContent>
		</Card>
	);

	const NewTaskCard = (t: Task) => (
		<Card key={t.id} className="border-border">
			<CardContent className="p-3 sm:p-4">
				<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
					<div className="space-y-2 flex-1">
						<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
							<h3 className="font-semibold text-foreground text-sm sm:text-base">{t.title}</h3>
							<div className="flex flex-wrap gap-2">
								<Badge variant="outline" className="text-xs">{t.id}</Badge>
								<Badge variant="secondary" className={`text-xs ${t.priority === "High" ? "bg-danger/10 text-danger border-danger/30" : "bg-warning/10 text-warning border-warning/30"}`}>
									{t.priority}
								</Badge>
								<Badge variant="outline" className={`rounded-full px-2 py-1 text-xs bg-muted/50 status-${getStatusColor(t.status)}`}>{t.status}</Badge>
							</div>
						</div>
						<p className="text-xs sm:text-sm text-muted-foreground">{t.description}</p>
						<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
							<span className="flex items-center"><MapPin className="h-3 w-3 mr-1 flex-shrink-0" /> <span className="truncate">{t.location}</span></span>
							<span className="flex items-center"><Calendar className="h-3 w-3 mr-1 flex-shrink-0" /> {t.deadline}</span>
							<span className="flex items-center"><UserIcon className="h-3 w-3 mr-1 flex-shrink-0" /> {t.citizen}</span>
						</div>
					</div>
				</div>

				<div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
					<Button className="btn-government text-xs sm:text-sm" size="sm" onClick={() => triggerCamera("before", t.id)}>
						<Camera className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
						<span className="hidden sm:inline">Acknowledge Task • Capture Before Photo</span>
						<span className="sm:hidden">Acknowledge & Photo</span>
					</Button>
					<Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => openDetails(t)}>
						<Info className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
						<span className="hidden sm:inline">View Details</span>
						<span className="sm:hidden">Details</span>
					</Button>
        </div>

				<div className="mt-3 rounded-md border border-danger/30 bg-danger/10 p-2 sm:p-3 text-danger text-xs sm:text-sm flex items-start gap-2">
					<AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
					<span>Warning: Deadline is tomorrow! Please complete soon.</span>
				</div>
            </CardContent>
          </Card>
	);

	const InProgressCard = (t: Task) => (
		<Card key={t.id} className="border-border">
			<CardContent className="p-3 sm:p-4">
				<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
					<div className="space-y-2 flex-1">
						<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
							<h3 className="font-semibold text-foreground text-sm sm:text-base">{t.title}</h3>
							<div className="flex flex-wrap gap-2">
								<Badge variant="outline" className="text-xs">{t.id}</Badge>
								<Badge className={`status-${getStatusColor(t.status)} text-xs`}>{t.status}</Badge>
							</div>
						</div>
						<p className="text-xs sm:text-sm text-muted-foreground">{t.description}</p>
						<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
							<span className="flex items-center"><MapPin className="h-3 w-3 mr-1 flex-shrink-0" /> <span className="truncate">{t.location}</span></span>
							<span className="flex items-center"><Calendar className="h-3 w-3 mr-1 flex-shrink-0" /> {t.deadline}</span>
							<span className="flex items-center"><UserIcon className="h-3 w-3 mr-1 flex-shrink-0" /> {t.citizen}</span>
						</div>
					</div>
					<Button variant="outline" size="sm" className="text-xs sm:text-sm self-start sm:self-auto" onClick={() => openDetails(t)}>
						<Info className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
						<span className="hidden sm:inline">View Details</span>
						<span className="sm:hidden">Details</span>
					</Button>
				</div>

				{/* Photo previews */}
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="border rounded-md p-2">
						<p className="text-xs text-muted-foreground mb-2">Before Photo</p>
						{t.beforeImage ? (
							<img src={t.beforeImage} alt="Before" className="w-full h-24 sm:h-32 object-cover rounded" />
						) : (
							<div className="h-24 sm:h-32 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">Not captured</div>
						)}
					</div>
					<div className="border rounded-md p-2">
						<p className="text-xs text-muted-foreground mb-2">After Photo</p>
						{t.afterImage ? (
							<img src={t.afterImage} alt="After" className="w-full h-24 sm:h-32 object-cover rounded" />
						) : (
							<div className="h-24 sm:h-32 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">Pending</div>
						)}
					</div>
				</div>

				<div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
					<Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => triggerCamera("after", t.id)}>
						<Camera className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
						<span className="hidden sm:inline">Capture After Photo</span>
						<span className="sm:hidden">After Photo</span>
					</Button>
					<Button size="sm" className="btn-government text-xs sm:text-sm" disabled={!t.beforeImage || !t.afterImage} onClick={() => markDone(t.id)}>
						<CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
						<span className="hidden sm:inline">Mark Done</span>
						<span className="sm:hidden">Done</span>
					</Button>
				</div>
            </CardContent>
          </Card>
	);

	const CompletedCard = (t: Task) => (
		<Card key={t.id} className="border-border">
          <CardHeader className="p-3 sm:p-6">
				<CardTitle className="text-base sm:text-lg">{t.title}</CardTitle>
				<CardDescription className="text-sm">{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<p className="text-xs sm:text-sm text-muted-foreground mb-2">Before</p>
						{t.beforeImage ? (
							<img src={t.beforeImage} alt="Before" className="w-full h-32 sm:h-48 object-cover rounded" />
						) : (
							<div className="h-32 sm:h-48 bg-muted rounded" />
						)}
					</div>
					<div>
						<p className="text-xs sm:text-sm text-muted-foreground mb-2">After</p>
						{t.afterImage ? (
							<img src={t.afterImage} alt="After" className="w-full h-32 sm:h-48 object-cover rounded" />
						) : (
							<div className="h-32 sm:h-48 bg-muted rounded" />
						)}
					</div>
                    </div>
                    
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
					<div className="flex items-center gap-2"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> <span className="truncate">{t.location}</span></div>
					<div className="flex items-center gap-2"><Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {t.deadline}</div>
					<div className="flex items-center gap-2"><UserIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {t.citizen}</div>
					<div className="flex items-center gap-2"><Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {t.completedAt}</div>
                    </div>

				<div className="flex justify-end">
					<Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => openDetails(t)}>
						<Info className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
						<span className="hidden sm:inline">View Details</span>
						<span className="sm:hidden">Details</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
			<DashboardHeader title="Worker Dashboard" userRole="Field Worker" />

			{/* Hero */}
			<div className="bg-gradient-to-r from-emerald-50 via-sky-50 to-blue-50 border-b border-border">
				<div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="flex items-center gap-3">
							<HardHat className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
							<div>
								<h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">My Tasks</h2>
								<p className="text-sm sm:text-base text-muted-foreground">Assigned work, progress and deadlines</p>
							</div>
						</div>
						<Badge variant="outline" className="bg-success/10 text-success border-success self-start sm:self-auto">Active Worker</Badge>
                    </div>
                  </div>
                </div>

			<div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6">
				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
					<StatCard icon={Clock} value={newTasks.length} label="New Tasks" color="warning" />
					<StatCard icon={FileText} value={inProgressTasks.length} label="In Progress" color="primary" />
					<StatCard icon={CheckCircle} value={completedTasks.length} label="Completed" color="success" />
				</div>

				{/* Tabs */}
				<div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-2">
					<div className="flex flex-wrap gap-2">
						<Button 
							variant={activeTab === "new" ? "default" : "outline"} 
							className={`${activeTab === "new" ? "btn-government" : ""} flex-1 sm:flex-none text-xs sm:text-sm`} 
							onClick={() => setActiveTab("new")}
						>
							New ({newTasks.length})
						</Button>
						<Button 
							variant={activeTab === "inprogress" ? "default" : "outline"} 
							className={`${activeTab === "inprogress" ? "btn-government" : ""} flex-1 sm:flex-none text-xs sm:text-sm`} 
							onClick={() => setActiveTab("inprogress")}
						>
							Progress ({inProgressTasks.length})
						</Button>
						<Button 
							variant={activeTab === "completed" ? "default" : "outline"} 
							className={`${activeTab === "completed" ? "btn-government" : ""} flex-1 sm:flex-none text-xs sm:text-sm`} 
							onClick={() => setActiveTab("completed")}
						>
							Done ({completedTasks.length})
						</Button>
					</div>
                </div>

				{/* Task Lists */}
				<div className="space-y-4">
					{activeTab === "new" && (newTasks.length ? newTasks.map(NewTaskCard) : <p className="text-sm text-muted-foreground">No new tasks.</p>)}
					{activeTab === "inprogress" && (inProgressTasks.length ? inProgressTasks.map(InProgressCard) : <p className="text-sm text-muted-foreground">No tasks in progress.</p>)}
					{activeTab === "completed" && (completedTasks.length ? completedTasks.map(CompletedCard) : <p className="text-sm text-muted-foreground">No completed tasks yet.</p>)}
              </div>

				{/* Hidden camera input for mobile capture */}
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					capture="environment"
					className="hidden"
					onChange={handleCapture}
				/>
              </div>
              
			{/* Task Details Dialog */}
			<Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
				<DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-sm sm:text-base">{detailsTask?.title}</DialogTitle>
						<DialogDescription className="text-xs sm:text-sm">{detailsTask?.id}</DialogDescription>
					</DialogHeader>
					{detailsTask && (
						<div className="space-y-4">
							<p className="text-xs sm:text-sm text-muted-foreground">{detailsTask.description}</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
								<div className="flex items-center gap-2"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> <span className="truncate">{detailsTask.location}</span></div>
								<div className="flex items-center gap-2"><Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {detailsTask.deadline}</div>
								<div className="flex items-center gap-2"><UserIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {detailsTask.citizen}</div>
								{detailsTask.acknowledgedAt && (<div className="flex items-center gap-2"><Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {detailsTask.acknowledgedAt}</div>)}
								{detailsTask.completedAt && (<div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> {detailsTask.completedAt}</div>)}
							</div>
							{(detailsTask.beforeImage || detailsTask.afterImage) && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<div>
										<p className="text-xs text-muted-foreground mb-1">Before</p>
										{detailsTask.beforeImage ? <img src={detailsTask.beforeImage} className="w-full h-24 sm:h-32 object-cover rounded" /> : <div className="h-24 sm:h-32 bg-muted rounded" />}
									</div>
									<div>
										<p className="text-xs text-muted-foreground mb-1">After</p>
										{detailsTask.afterImage ? <img src={detailsTask.afterImage} className="w-full h-24 sm:h-32 object-cover rounded" /> : <div className="h-24 sm:h-32 bg-muted rounded" />}
              </div>
            </div>
							)}
      </div>
					)}
				</DialogContent>
			</Dialog>
    </div>
  );
};

export default WorkerDashboardPage;