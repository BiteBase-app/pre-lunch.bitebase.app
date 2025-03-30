import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to recursively scan directories and find all page components
function scanDirectory(dir: string, baseDir: string, basePath: string = ''): any[] {
  const routes: any[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      // Skip hidden files and directories (starting with .)
      if (item.startsWith('.')) continue;
      
      // Skip node_modules and other non-app directories
      if (stat.isDirectory() && ['node_modules', '.next', '.git'].includes(item)) continue;
      
      // Handle directories
      if (stat.isDirectory()) {
        // Allow special Next.js directories except internal ones
        if (['_app', '_document', '_error', 'api'].includes(item)) continue;
        
        // Create route path
        const routePath = path.join(basePath, item === 'app' ? '' : item);
        
        // Recursively scan subdirectories
        const children = scanDirectory(itemPath, baseDir, routePath);
        
        if (children.length > 0) {
          routes.push({
            path: '/' + routePath.replace(/\\/g, '/'),
            name: item,
            isDirectory: true,
            children
          });
        }
      } 
      // Handle page files and authentication patterns
      else if (/(page|layout)\.(tsx|jsx|ts|js)$/.test(item) || /^(signin|signout|auth)\.(tsx|jsx|ts|js)$/.test(item)) {
        // Don't add the page file itself, but mark that this directory is a route
        routes.push({
          path: '/' + basePath.replace(/\\/g, '/'),
          name: path.basename(basePath) || 'Home',
          isDirectory: false
        });
      }
    }
    
    return routes;
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    // Get the app directory path
    const appDir = path.join(process.cwd(), 'app');
    
    // Scan the app directory to find all routes
    const routes = scanDirectory(appDir, appDir);
    
    // Add some hardcoded routes that might not be detected
    const hardcodedRoutes = [
      { path: '/dashboard', name: 'Dashboard', isDirectory: false },
      { path: '/login', name: 'Login', isDirectory: false },
      { path: '/register', name: 'Register', isDirectory: false },
      { path: '/profile', name: 'Profile', isDirectory: false },
      { path: '/settings', name: 'Settings', isDirectory: false },
      { path: '/dev-landing', name: 'Development Landing Page', isDirectory: false }
    ];
    
    // Combine detected and hardcoded routes
    const allRoutes = [...routes, ...hardcodedRoutes];
    
    return NextResponse.json({ routes: allRoutes });
  } catch (error) {
    console.error('Error generating routes:', error);
    return NextResponse.json(
      { error: 'Failed to generate routes' },
      { status: 500 }
    );
  }
}