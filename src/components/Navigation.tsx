import { useState } from 'react';
import { Menu, X, Youtube, User, LogOut, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', href: '/', icon: Crown },
    { name: 'Videos', href: '/videos', icon: Youtube },
    { name: 'Blog', href: '/blog', icon: Settings },
    { name: 'Contact', href: '/contact', icon: User },
    { name: 'About', href: '/about', icon: LogOut },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: Settings }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="content-width mobile-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/uploads/944a798a-f32e-4ef1-be55-2610f6d9c0bb.png" 
              alt="Rajasthan Ri Bata Logo" 
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="font-royal text-base sm:text-lg lg:text-xl font-bold gradient-text">
                Rajasthan Ri Bata
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-body">
                Stories & Culture
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary font-body font-medium"
                onMouseEnter={() => {
                  // Preload page on hover for instant navigation
                  if (item.href !== '/') {
                    import(`../pages/${item.href.charAt(1).toUpperCase() + item.href.slice(2)}.tsx`).catch(() => {});
                  }
                }}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm lg:text-base">{item.name}</span>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-royal transition-all duration-200"></div>
              </Link>
            ))}
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/10"
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/20 shadow-royal">
            <div className="mobile-padding py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary font-body"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Sign In Button */}
              {!user && (
                <Link
                  to="/auth"
                  className="group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary font-body"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;