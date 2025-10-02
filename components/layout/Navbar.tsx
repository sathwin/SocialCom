'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { Heart, Calendar, User, LogOut, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, currentUser, logout } = useAppStore();

  const navItems = [
    { href: '/events', label: 'Browse Events', icon: Calendar },
    { href: '/dashboard', label: 'My Events', icon: Heart, authRequired: true },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              SocialCom
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.authRequired && !isLoggedIn) return null;
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1.5 text-sm font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-slate-600'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isLoggedIn ? (
              <>
                <Link href="/events/create">
                  <Button size="sm" variant="secondary">
                    Create Event
                  </Button>
                </Link>
                <Link href="/profile">
                  <button
                    className={cn(
                      'flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-100',
                      pathname === '/profile' ? 'bg-slate-100' : ''
                    )}
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      {currentUser?.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="hidden sm:inline">{currentUser?.name?.split(' ')[0]}</span>
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-600 hover:text-primary transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
                <Button size="sm">Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
