
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
                                <Label htmlFor="siteUrl">Site URL</Label>
                                <Input id="siteUrl" placeholder="https://example.com" />
                            </div>
                            <Button>Save Site Settings</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="core">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Settings</CardTitle>
                            <CardDescription>Manage core application configurations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>This section is under development.</p>
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
