
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your application's settings.</p>
            </div>
            
            <Tabs defaultValue="site">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="site">Site Setting</TabsTrigger>
                    <TabsTrigger value="core">Core Setting</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>
                
                <TabsContent value="site">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Settings</CardTitle>
                            <CardDescription>Manage your website's global settings and branding.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="siteName">Site Name</Label>
                                <Input id="siteName" placeholder="Your Site Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="faviconUrl">Favicon URL</Label>
                                <Input id="faviconUrl" placeholder="https://example.com/favicon.ico" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="headerLogoUrl">Header Logo URL</Label>
                                <Input id="headerLogoUrl" placeholder="https://example.com/header-logo.png" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footerLogoUrl">Footer Logo URL</Label>
                                <Input id="footerLogoUrl" placeholder="https://example.com/footer-logo.png" />
                            </div>
                             
                             <div>
                                <h3 className="text-lg font-medium text-foreground mb-4">Webmaster Verification</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="googleVerification">Google Verification ID</Label>
                                        <Input id="googleVerification" placeholder="Google verification code" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bingVerification">Bing Verification ID</Label>
                                        <Input id="bingVerification" placeholder="Bing verification code" />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="metaVerification">Meta Verification ID</Label>
                                        <Input id="metaVerification" placeholder="Meta verification code" />
                                    </div>
                                </div>
                             </div>

                             <div className="space-y-2">
                                <Label htmlFor="robotsTxt">robots.txt</Label>
                                <Textarea id="robotsTxt" rows={8} placeholder="User-agent: *&#10;Allow: /" />
                                <p className="text-sm text-muted-foreground">
                                    The content of your robots.txt file. This controls how search engines crawl your site.
                                </p>
                             </div>

                            <Button>Save Site Settings</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="core">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Settings</CardTitle>
                            <CardDescription>Manage core application configurations like database connections.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div>
                                <h3 className="text-lg font-medium text-foreground mb-4">Local Database Configuration</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="dbHost">Database Host</Label>
                                            <Input id="dbHost" placeholder="localhost" defaultValue="localhost" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dbPort">Database Port</Label>
                                            <Input id="dbPort" placeholder="3306" defaultValue="3306" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dbName">Database Name</Label>
                                        <Input id="dbName" placeholder="your_database_name" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="dbUser">Username</Label>
                                            <Input id="dbUser" placeholder="your_db_user" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dbPassword">Password</Label>
                                            <Input id="dbPassword" type="password" placeholder="••••••••" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button>Save Database Configuration</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="api">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>Manage API keys for third-party integrations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="geminiApiKey">Gemini AI API Key</Label>
                                    <Input id="geminiApiKey" type="password" placeholder="••••••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="chatGptApiKey">ChatGPT API Key</Label>
                                    <Input id="chatGptApiKey" type="password" placeholder="••••••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="grokApiKey">Grok API Key</Label>
                                    <Input id="grokApiKey" type="password" placeholder="••••••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="deepseekApiKey">Deepseek API Key</Label>
                                    <Input id="deepseekApiKey" type="password" placeholder="••••••••••••••••••••" />
                                </div>
                            </div>
                            <Button>Save API Keys</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
