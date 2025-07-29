
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, User } from "@/contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faKey } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";

const UserCredentialCard = ({ user }: { user: User }) => (
  <div className="rounded-md border bg-card p-4 shadow-sm">
    <p className="font-semibold text-foreground">{user.name} <span className="text-muted-foreground capitalize">({user.role})</span></p>
    <div className="text-muted-foreground mt-2 space-y-1 text-sm">
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Password:</strong> {user.password}</p>
    </div>
  </div>
);

export default function AdminCredentialsPage() {
  const { users } = useAuth();
  const adminUser = users.find(user => user.role === 'admin');
  const otherUsers = users.filter(user => user.role !== 'admin');

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold text-foreground">User Credentials</h1>
        <p className="text-muted-foreground">Use these credentials to test the application from different user perspectives.</p>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserShield} className="h-5 w-5 text-primary" />
            Administrator
          </CardTitle>
          <CardDescription>This user has full access to the admin panel and all site settings.</CardDescription>
        </CardHeader>
        <CardContent>
          {adminUser && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <UserCredentialCard user={adminUser} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <FontAwesomeIcon icon={faKey} className="h-5 w-5 text-muted-foreground" />
            Demo Users
          </CardTitle>
          <CardDescription>These users represent various roles and can be used to test public-facing features.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherUsers.map(user => (
              <UserCredentialCard key={user.email} user={user} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
