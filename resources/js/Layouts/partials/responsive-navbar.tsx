import { Link, router, usePage } from '@inertiajs/react';
import { ApplicationLogo } from '@/Components/application-logo';
import { PageProps } from '@/types';
import { ThemeToggle } from '@/Components/theme-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import React from 'react';
import { getFirstWord, strLimit } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { IconChevronDown, IconCirclePerson, IconLogout, IconSettings } from '@irsyadadl/paranoid';

const ResponsiveNavbar = () => {
    const { auth } = usePage<PageProps>().props;
    return (
        <nav className='block border-b px-4 py-2 sm:hidden'>
            <div className='flex items-center justify-between py-1'>
                <Link href='/'>
                    <ApplicationLogo className='w-8 fill-red-600' />
                </Link>
                <div className='flex items-center gap-x-1'>
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='focus:outline-none'>
                            <Button variant='secondary' className='bg-secondary/50 hover:bg-secondary/60 border'>
                                {auth.user?.id ? getFirstWord(auth.user?.name) : 'Menu'}
                                <IconChevronDown className='ml-2 h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-8 w-72'>
                            {auth.user && (
                                <>
                                    <DropdownMenuLabel>
                                        <div className='flex items-center font-normal'>
                                            <Avatar>
                                                <AvatarImage src={auth.user.name} alt={auth.user.name} />
                                                <AvatarFallback>{auth.user.name}</AvatarFallback>
                                            </Avatar>
                                            <div className='ml-3'>
                                                <strong className='font-semibold text-primary'>{auth.user.name}</strong>
                                                <div className='text-muted-foreground'>
                                                    {strLimit(auth.user.email, 28)}
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <DropdownMenuItem asChild>
                                <Link href={route('home')}>Home</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={route('about')}>About</Link>
                            </DropdownMenuItem>
                            {auth?.user ? (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={route('dashboard')}>Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='flex justify-between items-center' asChild>
                                        <Link href={route('profile.edit')}>
                                            Profile
                                            <IconSettings className='h-4 w-4' />
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={route('users.index')}>Users</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.post(route('logout'))}>
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link className='flex items-center' href={route('login')}>
                                            <IconLogout className='rotate-180 mr-2 h-4 w-4' />
                                            <span>Login</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link className='flex items-center' href={route('register')}>
                                            <IconCirclePerson className='mr-2 h-4 w-4' />
                                            <span>Register</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

export default ResponsiveNavbar;
