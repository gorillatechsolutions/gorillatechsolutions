
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxOpen, faDollarSign, faArrowUp, faKey, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { useAuth, User } from "@/contexts/auth-context";
import { Separator } from "@/components/ui/separator";

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

const UserCredentialCard = ({ user }: { user: User }) => (
  <div className="rounded-md border bg-secondary/50 p-3 text-sm">
    <p className="font-semibold text-foreground">{user.name} <span className="text-muted-foreground capitalize">({user.role})</span></p>
    <div className="text-muted-foreground mt-1 space-y-1">
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Password:</strong> {user.password}</p>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  const { users } = useAuth();
  const adminUser = users.find(user => user.role === 'admin');
  const otherUsers = users.filter(user => user.role !== 'admin');

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faKey} className="h-4 w-4 text-muted-foreground" />
            User Credentials
          </CardTitle>
          <CardDescription>Use these credentials to test the application from different user perspectives.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {adminUser && (
            <>
              <div className="rounded-md border-2 border-primary/50 bg-primary/5 p-4">
                <h3 className="flex items-center gap-2 text-base font-semibold text-primary mb-2">
                  <FontAwesomeIcon icon={faUserShield} className="h-4 w-4" />
                  Administrator
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UserCredentialCard user={adminUser} />
                </div>
              </div>
              <Separator />
            </>
          )}

          <div>
             <h3 className="text-base font-semibold text-foreground mb-2">Demo Users</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherUsers.map(user => (
                  <UserCredentialCard key={user.email} user={user} />
              ))}
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}
