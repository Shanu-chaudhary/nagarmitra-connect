import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Remove lucide-react import, use inline SVGs or alternative icons if needed
import { DepartmentKey, useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Inline SVG icon components to avoid external icon deps
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Phone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.2a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.6.63A2 2 0 0 1 22 16.92z" />
  </svg>
);

const User = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21a8 8 0 1 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

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

  const { login, loginDepartment } = useAuth();
  const navigate = useNavigate();
  const [loginTab, setLoginTab] = useState<'citizen' | 'department' | 'worker'>('citizen');
  const [deptKey, setDeptKey] = useState<DepartmentKey>('roads');
  const [deptUserId, setDeptUserId] = useState('');
  const [deptPassword, setDeptPassword] = useState('');

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

  const handleDepartmentLogin = async () => {
    setLoading(true);
    try {
      const result = await loginDepartment(deptKey, deptUserId, deptPassword);
      if (result.success && result.role) {
        toast({ title: "Login Successful", description: "Welcome! Redirecting to department dashboard..." });
        onOpenChange(false);
        if (deptKey === 'municipal') navigate('/municipal');
        else if (deptKey === 'state') navigate('/state');
        else if (deptKey === 'sanitation') navigate('/department/health');
        else if (deptKey === 'water') navigate('/department/water');
        else navigate('/department');
      } else {
        toast({ title: "Login Failed", description: result.error || "Invalid credentials", variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Access NagarMitra
          </DialogTitle>
          <DialogDescription>
            Choose your login method
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
                <CardDescription>Select your login method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={loginTab === 'citizen' ? 'default' : 'outline'} onClick={() => setLoginTab('citizen')}>Citizen Login</Button>
                  <Button variant={loginTab === 'department' ? 'default' : 'outline'} onClick={() => setLoginTab('department')}>Department Login</Button>
                  <Button variant={loginTab === 'worker' ? 'default' : 'outline'} onClick={() => setLoginTab('worker')}>Worker Login</Button>
                </div>

                {loginTab !== 'department' && (
                  <>
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
                  </>
                )}

                {loginTab === 'department' && (
                  <>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={deptKey} onValueChange={(v) => setDeptKey(v as DepartmentKey)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                          <SelectItem value="sanitation">Health & Sanitation</SelectItem>
                          <SelectItem value="water">Water Department</SelectItem>
                          <SelectItem value="municipal">Municipal Department</SelectItem>
                          <SelectItem value="state">State Department</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deptUser">User ID</Label>
                      <Input id="deptUser" placeholder="Enter User ID" value={deptUserId} onChange={(e) => setDeptUserId(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deptPass">Password</Label>
                      <Input id="deptPass" type="password" placeholder="Enter Password" value={deptPassword} onChange={(e) => setDeptPassword(e.target.value)} />
                    </div>

                    <Button className="w-full btn-government" disabled={!deptUserId || !deptPassword || loading} onClick={handleDepartmentLogin}>
                      {loading ? 'Signing in...' : 'Login'}
                    </Button>
                  </>
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