export function isProtectedRoute(pathname: string): boolean {
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/auth' ||
                     pathname.startsWith('/verify') || pathname.startsWith('/forgot-password') ||
                     pathname.startsWith('/reset-password');

  const publicPages = ['/', '/about', '/how-it-works', '/products', '/contact', '/resources', '/terms', '/privacy'];
  const isPublicPage = publicPages.includes(pathname) || pathname.startsWith('/loans/');
  
  return !isAuthPage && !isPublicPage;
}
