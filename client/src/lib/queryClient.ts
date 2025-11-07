import { QueryClient, QueryFunction } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export function getApiUrl(path: string): string {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return `${API_BASE_URL}${path}`;
}

let csrfToken: string | null = null;
let sessionCheckInterval: NodeJS.Timeout | null = null;

export function clearCsrfToken() {
  csrfToken = null;
}

async function getCsrfToken(): Promise<string> {
  if (csrfToken) return csrfToken;
  
  try {
    const res = await fetch(getApiUrl('/api/csrf-token'), {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      csrfToken = data.csrfToken;
      return csrfToken!;
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
  return '';
}

export async function preloadCsrfToken(): Promise<void> {
  if (!csrfToken) {
    await getCsrfToken();
  }
}

function handleAuthError(res: Response, errorMessage?: string) {
  clearCsrfToken();
  
  if (sessionCheckInterval) {
    clearInterval(sessionCheckInterval);
    sessionCheckInterval = null;
  }
  
  const currentPath = window.location.pathname;
  const isAuthPage = currentPath === '/login' || currentPath === '/signup' || currentPath === '/auth';
  
  if (!isAuthPage) {
    const message = errorMessage || (res.status === 401 
      ? 'Votre session a expiré. Veuillez vous reconnecter.' 
      : 'Accès refusé. Veuillez vous reconnecter.');
    
    sessionStorage.setItem('auth_redirect_message', message);
    sessionStorage.setItem('auth_redirect_from', currentPath);
    
    window.location.href = '/login';
  }
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = {};
      }
      
      const errorMessage = errorData?.error || '';
      handleAuthError(res, errorMessage);
      throw new Error(errorMessage || `${res.status}: Authentification requise`);
    }
    
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: Record<string, string> = data ? { "Content-Type": "application/json" } : {};

  if (method !== 'GET' && method !== 'HEAD') {
    const token = await getCsrfToken();
    if (token) {
      headers['X-CSRF-Token'] = token;
    }
  }

  const res = await fetch(getApiUrl(url), {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;

    const res = await fetch(getApiUrl(url), {
      credentials: "include",
    });

    if (res.status === 401 || res.status === 403) {
      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }
      
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = {};
      }
      
      const errorMessage = errorData?.error || '';
      handleAuthError(res, errorMessage);
      throw new Error(errorMessage || `${res.status}: Authentification requise`);
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

function shouldRetry(failureCount: number, error: Error): boolean {
  if (failureCount >= 3) return false;
  
  const errorMessage = error.message.toLowerCase();
  if (errorMessage.includes('401') || errorMessage.includes('403') || 
      errorMessage.includes('authentification')) {
    return false;
  }
  
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || 
      errorMessage.includes('timeout') || errorMessage.includes('502') || 
      errorMessage.includes('503') || errorMessage.includes('504')) {
    return true;
  }
  
  return false;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: shouldRetry,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    },
    mutations: {
      retry: shouldRetry,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    },
  },
});
