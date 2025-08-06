
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxOpen, faDollarSign, faArrowUp, faDatabase, faCloudUploadAlt, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const kpiData = [
  { title: "Total Users", value: "1,257", change: "+12.5%", icon: faUsers, iconBg: "bg-blue-100", iconColor: "text-blue-500" },
  { title: "Total Products", value: "349", change: "+5.2%", icon: faBoxOpen, iconBg: "bg-green-100", iconColor: "text-green-500" },
  { title: "Total Revenue", value: "$45,890", change: "+20.1%", icon: faDollarSign, iconBg: "bg-amber-100", iconColor: "text-amber-500" },
];

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const userData = [
  { name: 'Jan', users: 200 },
  { name: 'Feb', users: 250 },
  { name: 'Mar', users: 220 },
  { name: 'Apr', users: 300 },
  { name: 'May', users: 280 },
  { name: 'Jun', users: 350 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${kpi.iconBg}`}>
                <FontAwesomeIcon icon={kpi.icon} className={`h-5 w-5 ${kpi.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3 text-green-500" />
                {kpi.change} vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card className="border-amber-500/50 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            Data Storage Information
          </CardTitle>
          <CardDescription className="text-amber-800">
            Your application is currently configured to use your browser's `localStorage` for data persistence. This is a temporary setup for prototyping.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-amber-900">
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faDatabase} className="h-6 w-6 mt-1 text-amber-700" />
            <div>
              <h3 className="font-semibold">Content & User Data</h3>
              <p className="text-amber-800/90">
                All content (posts, pages, users, etc.) is saved in `localStorage`. While your MySQL connection is configured, the next step is to migrate the data contexts to use it.
              </p>
            </div>
          </div>
           <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faCloudUploadAlt} className="h-6 w-6 mt-1 text-amber-700" />
            <div>
              <h3 className="font-semibold">File Storage</h3>
              <p className="text-amber-800/90">
                Uploaded files are temporarily stored as Data URIs in `localStorage`. For a production setup, you should integrate a cloud storage service like Firebase Storage or Amazon S3.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New User Signups</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
