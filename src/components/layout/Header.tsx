import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/nagarmitra-logo.png";
import { Shield, Menu } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
          <img 
      src={logo} 
      alt="NagarMitra Logo" 
      className="h-8 w-8 object-contain" 
    />

            <span className="text-2xl font-bold text-foreground">NagarMitra</span>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            Government of Jharkhand
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
          >
            Help & Support
          </Button>
          
          <Button
            className="btn-government"
            onClick={onLoginClick}
          >
            Login / Register
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;