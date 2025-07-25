
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faAddressBook, faBalanceScale, faArrowRight, faHome, faConciergeBell, faPenToSquare, faMobileScreenButton, faBriefcase, faHandshake } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pageLinks = [
    {
        href: '/admin/pages/home',
        icon: faHome,
        title: 'Home Page',
        description: 'Edit the content of your public "Home" page, including the hero section and other key areas.'
    },
    {
        href: '/admin/pages/about',
        icon: faFileLines,
        title: 'About Page',
        description: 'Edit the content of your public "About Us" page, including the story, values, and team sections.'
    },
    {
        href: '/admin/pages/services',
        icon: faConciergeBell,
        title: 'Services Page',
        description: 'Manage the SEO metadata and hero section content for the "Our Services" page.'
    },
    {
        href: '/admin/pages/casestudies',
        icon: faPenToSquare,
        title: 'Case Studies Page',
        description: 'Update the SEO metadata and headline for the main "Case Studies" listing page.'
    },
    {
        href: '/admin/pages/apps',
        icon: faMobileScreenButton,
        title: 'Apps Page',
        description: 'Control the SEO metadata and hero section for the main "Our Apps" listing page.'
    },
    {
        href: '/admin/pages/application',
        icon: faBriefcase,
        title: 'Work With Us',
        description: 'Manage the content and SEO for the job application page.'
    },
    {
        href: '/admin/pages/invest-with-us',
        icon: faHandshake,
        title: 'Invest With Us',
        description: 'Update the content and SEO settings for the investor inquiry page.'
    },
    {
        href: '/admin/pages/contact',
        icon: faAddressBook,
        title: 'Contact Information',
        description: 'Update the contact details and SEO metadata for your contact page.'
    },
    {
        href: '/admin/pages/legal',
        icon: faBalanceScale,
        title: 'Legal Pages',
        description: 'Manage the content of your Privacy Policy and Terms & Conditions pages.'
    }
]

export default function AdminPagesOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Pages</h1>
        <p className="text-muted-foreground">Select a page below to edit its content and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageLinks.map(link => (
            <Card key={link.href} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                           <div className="bg-secondary p-3 rounded-lg">
                             <FontAwesomeIcon icon={link.icon} className="h-6 w-6 text-primary" />
                           </div>
                           <CardTitle>{link.title}</CardTitle>
                        </div>
                    </div>
                    <CardDescription className="pt-4">{link.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                    <Button asChild variant="outline">
                        <Link href={link.href}>
                            Edit Page <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-3 w-3" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
