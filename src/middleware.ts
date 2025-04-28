
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let isSupabaseConfigValid = true;

  // Validate URL: Check existence, type, emptiness, and placeholder value.
  if (!supabaseUrl || typeof supabaseUrl !== 'string' || supabaseUrl.trim() === '' || supabaseUrl === 'YOUR_SUPABASE_URL') {
      console.error('Middleware Error: Missing or placeholder Supabase URL. Check NEXT_PUBLIC_SUPABASE_URL in .env.');
      isSupabaseConfigValid = false;
  } else {
      // Validate URL structure only if it's not missing/placeholder
      try {
          new URL(supabaseUrl);
      } catch (e) {
          console.error(`Middleware Error: Invalid Supabase URL ('${supabaseUrl}'). Check NEXT_PUBLIC_SUPABASE_URL.`);
          isSupabaseConfigValid = false;
      }
  }

  // Validate Anon Key: Check existence, type, emptiness, and placeholder value.
  if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string' || supabaseAnonKey.trim() === '' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
      console.error('Middleware Error: Missing or placeholder Supabase Anon Key. Check NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.');
      isSupabaseConfigValid = false;
  }

  if (!isSupabaseConfigValid) {
      // Configuration is invalid, proceed without attempting Supabase client creation.
      console.warn("Middleware: Proceeding without Supabase session handling due to invalid/missing configuration in .env.");
      return response; // Allow request to continue, pages should handle missing auth context
  }


  // Proceed with Supabase client creation only if config is valid
  const supabase = createServerClient(
    supabaseUrl, // Already validated
    supabaseAnonKey, // Already validated
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          // Clone the response to modify cookies
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          // Clone the response to modify cookies
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  try {
      await supabase.auth.getUser()
    const url = request.nextUrl.pathname;
    if (
      url === '/auth' ||
      url === '/auth/callback' ||
      url === '/auth/auth-code-error'
    )
    return response
  } catch (error) {
      console.error("Middleware Error: Failed to get user session:", error instanceof Error ? error.message : String(error));
      // Allow the request to proceed even if session fetch fails.
  }

  return response
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

