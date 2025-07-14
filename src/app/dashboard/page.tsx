
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity, ArrowUp, ArrowDown, ExternalLink, BookOpen, BarChart } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--accent))',
  },
};

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 7500 },
];

const topPages = [
    { path: '/', views: '2,831', change: 12.5 },
    { path: '/services', views: '1,984', change: 5.2 },
    { path: '/case-study/tripled-organic-traffic-ecommerce', views: '1,562', change: 8.9 },
    { path: '/about', views: '1,112', change: -2.1 },
    { path: '/contact', views: '978', change: 15.3 },
];

const trafficSources = [
    { source: 'Google', visitors: '10,432', change: 18.2, type: 'Organic' },
    { source: 'Facebook', visitors: '3,892', change: -5.6, type: 'Social' },
    { source: 'Direct', visitors: '2,104', change: 3.1, type: 'Direct' },
    { source: 'LinkedIn', visitors: '1,567', change: 25.8, type: 'Social' },
    { source: 'Referral', visitors: '876', change: -1.2, type: 'Referral' },
];

export default function DashboardPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of your site's analytics.</p>
            </header>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,350</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Website Visitors</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <AreaChart data={chartData} margin={{ left: -20, top: 10, right: 10 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
                                <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                        <CardDescription>Last 6 months performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[250px] w-full">
                            <RechartsBarChart data={salesData} margin={{ top: 10, right: 10, left: -20 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip cursor={false} />
                                <Legend />
                                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Top Pages</CardTitle>
                            <CardDescription>The most visited pages on your website.</CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <a href="#">View All <ExternalLink className="h-4 w-4" /></a>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Page Path</TableHead>
                                    <TableHead className="text-right">Pageviews</TableHead>
                                    <TableHead className="text-right">Change</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topPages.map((page) => (
                                    <TableRow key={page.path}>
                                        <TableCell>
                                            <div className="font-medium flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-muted-foreground"/>
                                                {page.path}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{page.views}</TableCell>
                                        <TableCell className={`text-right font-semibold ${page.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            <div className="flex items-center justify-end">
                                               {page.change > 0 ? <ArrowUp className="h-4 w-4 mr-1"/> : <ArrowDown className="h-4 w-4 mr-1"/>}
                                                {Math.abs(page.change)}%
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Traffic Sources</CardTitle>
                            <CardDescription>How visitors are finding your website.</CardDescription>
                        </div>
                         <Button asChild size="sm" className="ml-auto gap-1">
                            <a href="#">View All <ExternalLink className="h-4 w-4" /></a>
                        </Button>
                    </CardHeader>
                     <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trafficSources.map((source) => (
                                    <TableRow key={source.source}>
                                        <TableCell>
                                            <div className="font-medium flex items-center gap-2">
                                                <BarChart className="h-4 w-4 text-muted-foreground"/>
                                                {source.source}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{source.type}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{source.visitors}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
