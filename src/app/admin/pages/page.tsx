
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faAddressBook, faBalanceScale, faArrowRight, faHome, faConciergeBell, faPenToSquare, faMobileScreenButton, faBriefcase, faHandshake, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pageLinks = [
    {
        href: '/admin/pages/home',
        previewHref: '/',
        icon: faHome,
        title: 'Home Page',
        description: 'Edit the content of your public "Home" page, including the hero section and other key areas.'
    },
    {
        href: '/admin/pages/about',
        previewHref: '/about',
        icon: faFileLines,
        title: 'About Page',
        description: 'Edit the content of your public "About Us" page, including the story, values, and team sections.'
    },
    {
        href: '/admin/pages/services',
        previewHref: '/services',
        icon: faConciergeBell,
        title: 'Services Page',
        description: 'Manage the SEO metadata and hero section content for the "Our Services" page.'
    },
    {
        href: '/admin/pages/casestudies',
        previewHref: '/case-study',
        icon: faPenToSquare,
        title: 'Case Studies Page',
        description: 'Update the SEO metadata and headline for the main "Case Studies" listing page.'
    },
    {
        href: '/admin/pages/apps',
        previewHref: '/apps',
        icon: faMobileScreenButton,
        title: 'Apps Page',
        description: 'Control the SEO metadata and hero section for the main "Our Apps" listing page.'
    },
    {
        href: '/admin/pages/application',
        previewHref: '/application',
        icon: faBriefcase,
        title: 'Work With Us',
        description: 'Manage the content and SEO for the job application page.'
    },
    {
        href: '/admin/pages/invest-with-us',
        previewHref: '/invest-with-us',
        icon: faHandshake,
        title: 'Invest With Us',
        description: 'Update the content and SEO settings for the investor inquiry page.'
    },
    {
        href: '/admin/pages/contact',
        previewHref: '/contact',
        icon: faAddressBook,
        title: 'Contact Information',
        description: 'Update the contact details and SEO metadata for your contact page.'
    },
    {
        href: '/admin/pages/legal',
        previewHref: '/privacy-policy',
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

      <Card>
          <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Page</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pageLinks.map(link => (
                        <TableRow key={link.href}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={link.icon} className="h-5 w-5 text-muted-foreground" />
                                    <span>{link.title}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground max-w-md">{link.description}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={link.previewHref} target="_blank">
                                        <FontAwesomeIcon icon={faEye} className="mr-2 h-3 w-3" />
                                        Preview
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={link.href}>
                                        Edit Page <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-3 w-3" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  );
}
