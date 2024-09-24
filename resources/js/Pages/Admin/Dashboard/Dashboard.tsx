import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Card, CardContent } from '@/Components/ui/card';
import SectionTitle from '@/Components/section-title';


import { Banknote, ChevronRight, Package, Terminal } from "lucide-react";

const dashboard = () => {
    const { auth } = usePage<PageProps>().props;
    return (
        <AdminLayout>
            <Head title='Dashboard' />
            <Card>
                <SectionTitle title='Dashboard' description={`Hi ${auth.user.name}, you are now logged in.`} />
                <CardContent>
                    Hi {auth.user.name}, you are now logged in.
                    <div className='mb-2 text-muted-foreground'>// The page you are currently visiting is</div>
                    <div className='text-lime-600 dark:text-lime-400'>"resources/js/Pages/Dashboard.tsx"</div>
                </CardContent>
            </Card>
        </AdminLayout>
        
    
    );
};

export default dashboard;
