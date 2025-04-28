import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import UserNav from './user-nav'; // We will create this next

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Placeholder for Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9.5 9.5 5 5" />
              <path d="m14.5 9.5-5 5" />
            </svg>
            <span className="font-bold sm:inline-block text-primary-foreground">
              Policy Insights AI
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {/* Add more nav links if needed */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {user ? (
              <UserNav user={user} />
            ) : (
              <Link href="/auth" passHref>
                <Button variant="outline" size="sm">
                  Iniciar Sesión / Registrarse
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
