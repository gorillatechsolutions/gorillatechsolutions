
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const credentialsSchema = z.object({
  gemini: z.string().optional(),
  openai: z.string().optional(),
  grok: z.string().optional(),
  deepseek: z.string().optional(),
});

type CredentialsFormValues = z.infer<typeof credentialsSchema>;

const PasswordInput = ({ field, show, onToggle }: { field: any; show: boolean; onToggle: () => void }) => (
    <div className="relative">
      <FormControl>
        <Input type={show ? 'text' : 'password'} {...field} />
      </FormControl>
      <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={onToggle}>
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
);

export default function CredentialsPage() {
  const { toast } = useToast();
  // In a real app, these values would be fetched and managed via a context or state management solution.
  const [showKeys, setShowKeys] = useState({
    gemini: false,
    openai: false,
    grok: false,
    deepseek: false,
  });

  const form = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      gemini: '',
      openai: '',
      grok: '',
      deepseek: '',
    },
  });

  const toggleShowKey = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const onSubmit = (values: CredentialsFormValues) => {
    // Here you would typically save these values to a secure backend or environment variables.
    // For this prototype, we'll just log them and show a toast.
    console.log('Saving credentials:', values);
    toast({
      title: 'Credentials Saved',
      description: 'Your API keys have been updated. (This is a demo and keys are not actually saved).',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Credentials</h1>
        <p className="text-muted-foreground">Manage API keys for various AI service providers.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Service Provider API Keys</CardTitle>
                    <CardDescription>Click on a provider to expand and manage its API key.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="w-full space-y-2">
                        <AccordionItem value="gemini">
                            <AccordionTrigger className="px-4 py-2 bg-secondary/50 rounded-md">
                                Google Gemini
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-6">
                                <FormField
                                    control={form.control}
                                    name="gemini"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gemini API Key</FormLabel>
                                        <PasswordInput field={field} show={showKeys.gemini} onToggle={() => toggleShowKey('gemini')} />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="openai">
                             <AccordionTrigger className="px-4 py-2 bg-secondary/50 rounded-md">
                                OpenAI
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-6">
                               <FormField
                                    control={form.control}
                                    name="openai"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>OpenAI API Key (for GPT models)</FormLabel>
                                        <PasswordInput field={field} show={showKeys.openai} onToggle={() => toggleShowKey('openai')} />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="grok">
                            <AccordionTrigger className="px-4 py-2 bg-secondary/50 rounded-md">Grok (xAI)</AccordionTrigger>
                            <AccordionContent className="p-4 pt-6">
                               <FormField
                                    control={form.control}
                                    name="grok"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grok API Key</FormLabel>
                                        <PasswordInput field={field} show={showKeys.grok} onToggle={() => toggleShowKey('grok')} />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="deepseek">
                            <AccordionTrigger className="px-4 py-2 bg-secondary/50 rounded-md">DeepSeek</AccordionTrigger>
                            <AccordionContent className="p-4 pt-6">
                               <FormField
                                    control={form.control}
                                    name="deepseek"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>DeepSeek API Key</FormLabel>
                                        <PasswordInput field={field} show={showKeys.deepseek} onToggle={() => toggleShowKey('deepseek')} />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

          <Button type="submit">Save Credentials</Button>
        </form>
      </Form>
    </div>
  );
}
