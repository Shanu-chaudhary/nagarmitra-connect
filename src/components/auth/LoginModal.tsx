import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Shield, User, MapPin, Calendar } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    wardNo: "",
    pincode: "",
  });

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setShowOtp(true);
    }
  };

  const handleRegister = () => {
    // Registration logic will be implemented with Supabase
    console.log("Registration data:", { mobile, ...formData });
  };

  const handleLogin = () => {
    // Login logic will be implemented with Supabase
    console.log("Login with:", { mobile, otp });
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
                    disabled={otp.length !== 6}
                  >
                    Verify & Login
                  </Button>
                )}
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