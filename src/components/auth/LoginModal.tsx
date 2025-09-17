import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Shield, User, MapPin, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    wardNo: "",
    pincode: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const dummyCredentials = [
    { mobile: "1234567890", otp: "123456", role: "Citizen" },
    { mobile: "2345678901", otp: "234567", role: "Department Officer" },
    { mobile: "3456789012", otp: "345678", role: "Field Worker" },
    { mobile: "4567890123", otp: "456789", role: "Municipal Authority" },
    { mobile: "5678901234", otp: "567890", role: "State Official" },
  ];

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setShowOtp(true);
      toast({
        title: "OTP Sent Successfully",
        description: `OTP sent to ${mobile}. Check dummy credentials below for testing.`,
      });
    }
  };

  const handleRegister = () => {
    // Registration logic will be implemented with Supabase
    console.log("Registration data:", { mobile, ...formData });
    toast({
      title: "Registration Successful",
      description: "Please use the login tab with dummy credentials for testing.",
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await login(mobile, otp);
      
      if (result.success && result.role) {
        toast({
          title: "Login Successful",
          description: `Welcome! Redirecting to ${result.role} dashboard...`,
        });
        
        onOpenChange(false);
        
        // Navigate to role-specific dashboard
        switch (result.role) {
          case 'citizen':
            navigate('/citizen');
            break;
          case 'department':
            navigate('/department');
            break;
          case 'worker':
            navigate('/worker');
            break;
          case 'municipal':
            navigate('/municipal');
            break;
          case 'state':
            navigate('/state');
            break;
          default:
            navigate('/');
        }
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Access NagarMitra
          </DialogTitle>
          <DialogDescription>
            Secure login with mobile number and OTP verification
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Login to Your Account</CardTitle>
                <CardDescription>
                  Enter your registered mobile number to receive OTP
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>

                {showOtp && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                )}

                {!showOtp ? (
                  <Button 
                    onClick={handleSendOtp} 
                    className="w-full btn-government"
                    disabled={mobile.length !== 10}
                  >
                    Send OTP
                  </Button>
                ) : (
                <Button 
                  onClick={handleLogin} 
                  className="w-full btn-government"
                  disabled={otp.length !== 6 || loading}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>
                )}
              </CardContent>
            </Card>

            {/* Dummy Credentials for Testing */}
            <Card className="mt-4 bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">🚀 Demo Credentials</CardTitle>
                <CardDescription className="text-xs">
                  Use these credentials to test different roles
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {dummyCredentials.map((cred, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-background/50 p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {cred.role}
                        </Badge>
                        <span className="font-mono">{cred.mobile}</span>
                      </div>
                      <span className="font-mono text-muted-foreground">OTP: {cred.otp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create New Account</CardTitle>
                <CardDescription>
                  Register as a new citizen to report civic issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-mobile">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-mobile"
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>

                {showOtp && (
                  <>
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="register-otp">OTP</Label>
                      <Input
                        id="register-otp"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            className="pl-10"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="Your complete address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ward">Ward Number</Label>
                        <Input
                          id="ward"
                          placeholder="Ward No."
                          value={formData.wardNo}
                          onChange={(e) => setFormData({...formData, wardNo: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          placeholder="Pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </>
                )}

                {!showOtp ? (
                  <Button 
                    onClick={handleSendOtp} 
                    className="w-full btn-government"
                    disabled={mobile.length !== 10}
                  >
                    Send OTP
                  </Button>
                ) : (
                  <Button 
                    onClick={handleRegister} 
                    className="w-full btn-government"
                    disabled={otp.length !== 6 || !formData.name || !formData.address}
                  >
                    Complete Registration
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;