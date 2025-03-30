import { ReactNode } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Bell, Search, ChevronDown, User, Cog, LogOut, Mail, HelpCircle } from 'lucide-react';

// Dynamic import for SideNav to avoid hydration issues
const SideNav = dynamic(() => import('@/components/sidenav'), { ssr: false });

// Loading fallbacks
const SideNavFallback = () => (
  <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex-shrink-0 animate-pulse bg-gray-100 dark:bg-gray-800"></div>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 w-full h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="px-4 h-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                BB
              </div>
              <span className="ml-2 font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden md:inline">
                BitrBase
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4 lg:mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">⌘K</kbd>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Notifications */}
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Menu */}
            <div className="relative ml-2">
              <button 
                className="flex items-center space-x-3 rounded-full pl-2 pr-3 py-1.5 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
              </button>
              
              {/* User Dropdown Menu - This would be toggled with JS */}
              {/* <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                  Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Cog className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                  Settings
                </Link>
                <Link href="/support" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <HelpCircle className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                  Help & Support
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign out
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Suspense fallback={<SideNavFallback />}>
          <SideNav />
        </Suspense>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-8 pl-0" style={{ paddingLeft: '240px' }}>
          <div className="px-6 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

