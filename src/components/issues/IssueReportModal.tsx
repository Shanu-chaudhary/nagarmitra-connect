import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Camera, 
  Mic, 
  MapPin, 
  Upload, 
  Phone, 
  AlertTriangle,
  Clock,
  FileText,
  CheckCircle,
  MicIcon
} from "lucide-react";

interface IssueReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IssueReportModal = ({ open, onOpenChange }: IssueReportModalProps) => {
  const [reportMethod, setReportMethod] = useState("text");
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
    landmark: "",
    photos: [] as File[],
    voiceNote: null as File | null
  });
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [keepActiveFor10Days, setKeepActiveFor10Days] = useState(true);
  const [activeUntil, setActiveUntil] = useState<Date | null>(null);

  const categories = [
    { id: "road", label: "Road Issues", sla: "48 hours", department: "Roads & Infrastructure" },
    { id: "sanitation", label: "Sanitation", sla: "24 hours", department: "Sanitation Department" },
    { id: "streetlight", label: "Street Lighting", sla: "72 hours", department: "Electrical Department" },
    { id: "water", label: "Water Supply", sla: "12 hours", department: "Water Department" },
    { id: "drainage", label: "Drainage", sla: "36 hours", department: "Engineering Department" },
    { id: "traffic", label: "Traffic Issues", sla: "24 hours", department: "Traffic Department" },
    { id: "other", label: "Other", sla: "96 hours", department: "Municipal Office" }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = Array.from(event.target.files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 5) // Max 5 photos
      }));
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Voice recording logic would be implemented here
    setTimeout(() => {
      setIsRecording(false);
    }, 3000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleSubmit = () => {
    // Submit logic will be implemented with backend
    console.log("Submitting issue:", formData);
    if (keepActiveFor10Days) {
      const tenDaysMs = 10 * 24 * 60 * 60 * 1000;
      setActiveUntil(new Date(Date.now() + tenDaysMs));
    } else {
      setActiveUntil(null);
    }
    setStep(4); // Show success step
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Report Civic Issue
          </DialogTitle>
          <DialogDescription>
            Report issues through multiple channels - text, voice, or photo
          </DialogDescription>
        </DialogHeader>

        {step < 4 && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-8 h-0.5 ${
                      step > stepNum ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Reporting Method</h3>
              <Tabs value={reportMethod} onValueChange={setReportMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text">Text Description</TabsTrigger>
                  <TabsTrigger value="photo">Photo Upload</TabsTrigger>
                  <TabsTrigger value="voice">Voice Note</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the issue"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about the issue"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="photo" className="space-y-4">
                  <Card className="border-dashed border-2 border-border">
                    <CardContent className="p-6 text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Upload photos of the issue (Max 5 photos)
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Photos
                      </Button>
                    </CardContent>
                  </Card>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <Badge className="absolute top-1 right-1 text-xs">
                            {index + 1}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="voice" className="space-y-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className={`p-4 rounded-full ${isRecording ? 'bg-danger/10' : 'bg-primary/10'}`}>
                          <MicIcon className={`h-8 w-8 ${isRecording ? 'text-danger' : 'text-primary'}`} />
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">
                            {isRecording ? 'Recording...' : 'Record Voice Note'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Describe the issue in detail
                          </p>
                        </div>

                        <Button
                          className={isRecording ? 'bg-danger hover:bg-danger/90' : 'btn-government'}
                          onClick={startRecording}
                          disabled={isRecording}
                        >
                          {isRecording ? 'Recording...' : 'Start Recording'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">IVRS Alternative</p>
                          <p className="text-sm text-muted-foreground">
                            Call <strong>1800-XXX-XXXX</strong> to report via phone
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} className="btn-government">
                Next: Location & Category
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Issue Details</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category</Label>
                  <Select value={formData.category} onValueChange={(value) => 
                    setFormData(prev => ({...prev, category: value}))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{category.label}</span>
                            <Badge variant="outline" className="ml-2">
                              {category.sla}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedCategory && (
                    <div className="text-sm text-muted-foreground">
                      Will be assigned to: {selectedCategory.department}
                    </div>
                  )}
                </div>

                {/* Removed Priority Level selection for citizen */}

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter location or coordinates"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">Nearby Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    placeholder="Nearest landmark or building"
                    value={formData.landmark}
                    onChange={(e) => setFormData(prev => ({...prev, landmark: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                className="btn-government"
                disabled={!formData.category}
              >
                Next: Review & Submit
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Report</h3>
              
              <Card className="government-card">
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Issue Title</Label>
                      <p className="font-medium">{formData.title || "Photo/Voice Issue"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                      <p className="font-medium">{selectedCategory?.label}</p>
                    </div>
                    {/* Priority removed from review */}
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Expected Resolution</Label>
                      <p className="font-medium">{selectedCategory?.sla}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <p className="font-medium">{formData.location}</p>
                    {formData.landmark && (
                      <p className="text-sm text-muted-foreground">Near: {formData.landmark}</p>
                    )}
                  </div>

                  {formData.description && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                      <p>{formData.description}</p>
                    </div>
                  )}

                  {formData.photos.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Attachments</Label>
                      <p className="text-sm">{formData.photos.length} photo(s) attached</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <Label className="text-sm font-medium text-muted-foreground">Active Window</Label>
                    <div className="mt-2 flex items-center justify-between rounded border p-3 bg-muted/50">
                      <div>
                        <p className="font-medium">Keep active for 10 days after submission</p>
                        <p className="text-xs text-muted-foreground">Citizens can set whether the complaint remains active for 10 days.</p>
                      </div>
                      <Switch checked={keepActiveFor10Days} onCheckedChange={setKeepActiveFor10Days} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleSubmit} className="btn-government">
                Submit Issue Report
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-success/10">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Issue Reported Successfully!</h3>
              <p className="text-muted-foreground">
                Your complaint has been registered and assigned ID: <strong>CMP{Date.now().toString().slice(-6)}</strong>
              </p>
            </div>

            <Card className="government-card">
              <CardContent className="p-4 text-left">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <span className="text-sm font-medium">{selectedCategory?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expected Resolution:</span>
                    <span className="text-sm font-medium">{selectedCategory?.sla}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className="status-primary">Submitted</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Until:</span>
                    <span className="text-sm font-medium">{activeUntil ? activeUntil.toLocaleString() : 'Not set'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              {!activeUntil && (
                <Button variant="outline" onClick={() => {
                  const tenDaysMs = 10 * 24 * 60 * 60 * 1000;
                  setActiveUntil(new Date(Date.now() + tenDaysMs));
                }}>
                  Set Active for 10 Days
                </Button>
              )}
              <Button variant="outline" onClick={() => {
                setStep(1);
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  priority: "",
                  location: "",
                  landmark: "",
                  photos: [],
                  voiceNote: null
                });
                setKeepActiveFor10Days(true);
                setActiveUntil(null);
              }}>
                Report Another Issue
              </Button>
              <Button className="btn-government" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IssueReportModal;