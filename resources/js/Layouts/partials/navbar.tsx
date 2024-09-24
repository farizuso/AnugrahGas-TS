import { Link, router, usePage } from '@inertiajs/react';
import NavLink from '@/Components/nav-link';
// import { ApplicationLogo } from '@/components/application-logo';
import { PageProps } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { ThemeToggle } from '@/Components/theme-toggle';
import ResponsiveNavbar from '@/Layouts/partials/responsive-navbar';
import React from 'react';
// import { IconChevronDown, IconSettings } from '@irsyadadl/paranoid';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { CiSettings } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";


export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    return (
        <>
            <ResponsiveNavbar />
            <nav className='relative z-10 hidden border-b py-3 sm:block'>
                <div className='mx-auto max-w-screen-2xl items-center sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-4'>
                            <Link href='/' className='mr-3'>
                                {/* <ApplicationLogo className='w-9 fill-foreground' /> */}
                            </Link>
                            <NavLink active={route().current('home')} href='/'>
                                Home
                            </NavLink>
                            <NavLink active={route().current('about')} href={route('about')}>
                                About
                            </NavLink>
                        </div>
                        {auth.user ? (
                            <div className='flex items-center gap-x-1'>
                                <ThemeToggle />
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className='size-6'>
                                            <AvatarImage 
                                            // src={auth.user.avatar} 
                                            />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='mr-8 w-60'>
                                        <DropdownMenuLabel>
                                            <div>{auth.user.name}</div>
                                            <div className='text-muted-foreground font-normal text-sm'>
                                                {auth.user.email}
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.get(route('dashboard'))}>
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className='justify-between'
                                            onClick={() => router.get(route('profile.edit'))}>
                                            <span>Settings</span>
                                            <CiSettings />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.get(route('users.index'))}>
                                            <span>Users</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.post(route('logout'))}>
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='secondary'
                                        className='bg-secondary/50 hover:bg-secondary/60 border'>
                                        Login
                                        <CiCircleChevDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='mr-8 w-40'>
                                    <DropdownMenuItem asChild>
                                        <Link href={route('login')}>Login</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={route('register')}>Register</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
