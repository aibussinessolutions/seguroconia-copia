'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; // 👈 IMPORTANTE
import Link from 'next/link';

interface UserNavProps {
  user: User;
}

export default function UserNav({ user }: UserNavProps) {
  const router = useRouter();
  const supabase = createClientComponentClient(); // 👈 CREAR SUPABASE CLIENT PARA EL CLIENTE

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to homepage after sign out
    router.refresh(); // Refresh to update server session state
  };

  const getInitials = (name?: string | null): string => {
    if (!name) return '?';
    const names = name.split(' ');
    const initials = names.map((n) => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  const userName = user.user_metadata?.full_name || user.email;
  const userEmail = user.email;
  const userAvatar = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={userName || 'User Avatar'} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard')}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Panel</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
