import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  HardHat, 
  Shield, 
  MapPin, 
  UserCheck,
  ArrowRight
} from "lucide-react";

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoleSelectionModal = ({ open, onOpenChange }: RoleSelectionModalProps) => {
  const roles = [
    {
      id: "citizen",
      title: "Citizen",
      description: "Report and track civic issues in your locality",
      icon: Users,
      color: "primary",
      features: ["Report issues", "Track complaints", "View locality map", "Rate resolutions"],
      badgeText: "Most Common"
    },
    {
      id: "department",
      title: "Department Officer",
      description: "Manage department issues and assign workers",
      icon: Building2,
      color: "warning",
      features: ["View department dashboard", "Assign workers", "Track SLA compliance", "Generate reports"],
      badgeText: "Admin Access"
    },
    {
      id: "worker",
      title: "Field Worker",
      description: "Execute assigned tasks and upload proof of work",
      icon: HardHat,
      color: "success",
      features: ["View assigned tasks", "Upload work proof", "Mark completion", "Real-time updates"],
      badgeText: "Field Access"
    },
    {
      id: "municipal",
      title: "Municipal Authority",
      description: "Oversee all departments and track city-wide progress",
      icon: Shield,
      color: "danger",
      features: ["City-wide analytics", "Department oversight", "Performance monitoring", "Policy insights"],
      badgeText: "High Level"
    },
    {
      id: "state",
      title: "State/District Official",
      description: "Handle escalated cases and inter-district coordination",
      icon: MapPin,
      color: "accent",
      features: ["Escalated cases", "Cross-district view", "Policy compliance", "Strategic insights"],
      badgeText: "Top Level"
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    // This will redirect to role-specific login or dashboard
    // For now, we'll just close the modal and log the selection
    console.log("Selected role:", roleId);
    onOpenChange(false);
    
    // Future: Navigate to role-specific dashboard or login
    // navigate(`/${roleId}/dashboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <UserCheck className="h-6 w-6 text-primary" />
            Select Your Role
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose your role to access the appropriate dashboard and features. 
            Each role has specific permissions and responsibilities within the NagarMitra platform.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className="government-card hover-lift cursor-pointer group relative overflow-hidden"
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className={`absolute top-4 right-4`}>
                <Badge variant="secondary" className="text-xs">
                  {role.badgeText}
                </Badge>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-3 rounded-full bg-${role.color}/10 group-hover:bg-${role.color}/20 transition-colors`}>
                    <role.icon className={`h-6 w-6 text-${role.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Key Features:
                  </div>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${role.color} mr-3 flex-shrink-0`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant="outline"
                  >
                    Access {role.title} Portal
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Secure Access</p>
              <p className="text-muted-foreground">
                All roles require proper authentication and authorization. 
                Access is granted based on your official position and verification status.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="px-8"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;