'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Folder, File, ExternalLink } from 'lucide-react';

interface RouteInfo {
  path: string;
  name: string;
  isDirectory?: boolean;
  children?: RouteInfo[];
}

export default function DevLandingPage() {
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch routes from the API
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/routes');
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }
        
        const data = await response.json();
        setRoutes(data.routes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching routes:', error);
        // If API fails, fallback to hardcoded routes
        const fallbackRoutes = [
          { path: '/dashboard', name: 'Dashboard' },
          { path: '/login', name: 'Login' },
          { path: '/register', name: 'Register' },
          { path: '/profile', name: 'Profile' },
          { path: '/settings', name: 'Settings' },
          { path: '/dev-landing', name: 'Development Landing Page' }
        ];
        
        setRoutes(fallbackRoutes);
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">BiteBase Development Navigation</h1>
        <p className="opacity-90">
          This landing page provides easy access to all pages in the application during development.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Link 
              href={route.path} 
              key={route.path}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <File className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{route.name}</h2>
                  <p className="text-gray-500 text-sm">{route.path}</p>
                </div>
                <div className="ml-auto">
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> This is a development-only page. Add new routes here as they are created.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-xl font-semibold mb-4">How to Add New Routes</h2>
        <p className="text-gray-600 mb-4">
          To add a new route to this landing page, edit the <code className="bg-gray-100 px-2 py-1 rounded">app/dev-landing/page.tsx</code> file 
          and add your route to the <code className="bg-gray-100 px-2 py-1 rounded">commonRoutes</code> array.
        </p>
        <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto">
          <pre>
{`const commonRoutes = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/your-new-route', name: 'Your New Page' },
  // Add more routes here
];`}
          </pre>
        </div>
      </div>
    </div>
  );
}