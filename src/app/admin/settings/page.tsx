
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFileLines, faDollarSign, faCog, faRocket } from "@fortawesome/free-solid-svg-icons";

const settingsLinks = [
    {
        href: '/admin/pages',
        icon: faFileLines,
        title: 'Page Management',
        description: 'Edit content for individual pages like Home, About, and Contact.'
    },
    {
        href: '/admin/settings/pricing',
        icon: faDollarSign,
        title: 'Pricing Plans',
        description: 'Update your subscription plans, features, and pricing.'
    },
    {
        href: '/admin/settings/site',
        icon: faCog,
        title: 'Global Site Settings',
        description: 'Manage site-wide settings like logos, metadata, and integrations.'
    },
    {
        href: '/admin/settings/optimization',
        icon: faRocket,
        title: 'System Optimization',
        description: 'Manage application cache, temporary files, and other optimizations.'
    }
]

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your application's global settings and page content.</p>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsLinks.map(link => (
                    <Card key={link.href} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <FontAwesomeIcon icon={link.icon} className="h-6 w-6 mt-1 text-primary" />
                                <div>
                                    <CardTitle>{link.title}</CardTitle>
                                    <CardDescription className="mt-1">{link.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={link.href}>
                                    Go to {link.title}
                                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-3 w-3" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </div>
    );
}
