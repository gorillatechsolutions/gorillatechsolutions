
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageSquare, X, Phone, Briefcase, Tag, LogIn } from 'lucide-react';
import Link from 'next/link';

const contactOptions = [
    {
        icon: <Phone className="h-6 w-6" />,
        title: "Callback Request",
        subtitle: "Let's have a conversation.",
        href: "/contact"
    },
    {
        icon: <Briefcase className="h-6 w-6" />,
        title: "Explore Services",
        subtitle: "See what we can do for you.",
        href: "/services"
    },
    {
        icon: <Tag className="h-6 w-6" />,
        title: "Get a Quote",
        subtitle: "Receive a custom proposal.",
        href: "/contact"
    }
]

export function ChatWidget() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Overlay */}
            <div 
                className={cn(
                    "fixed inset-0 bg-black/30 z-[-1] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />
            
            <div className="relative flex flex-col items-end">
                {/* Content Window */}
                <div className={cn(
                    "mb-4 w-[340px] transition-all duration-300 ease-in-out origin-bottom-right",
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}>
                    <div className="bg-card rounded-xl shadow-2xl p-4">
                        <div className="bg-primary/90 text-primary-foreground rounded-lg px-5 py-4 mb-4">
                            <h3 className="font-bold text-xl font-headline">Gorilla Tech Support</h3>
                            <p className="text-sm opacity-90">How can we help you today?</p>
                        </div>
                        <div className="space-y-3">
                           {user ? (
                                contactOptions.map(option => (
                                    <Link key={option.title} href={option.href} onClick={() => setIsOpen(false)}>
                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/80 hover:bg-accent/20 transition-colors">
                                            <div className="text-primary">{option.icon}</div>
                                            <div>
                                                <p className="font-semibold">{option.title}</p>
                                                <p className="text-sm text-muted-foreground">{option.subtitle}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                           ) : (
                                <div className="text-center p-4">
                                    <p className="text-muted-foreground mb-4">Please log in to chat with support.</p>
                                    <Button asChild className="w-full">
                                        <Link href="/login" onClick={() => setIsOpen(false)}>
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Login or Sign Up
                                        </Link>
                                    </Button>
                                </div>
                           )}
                        </div>
                    </div>
                </div>

                {/* Main floating button */}
                 <Button 
                    onClick={() => setIsOpen(!isOpen)} 
                    size="lg" 
                    className="rounded-full shadow-lg h-16 w-16 bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-110"
                >
                    <MessageSquare className={cn("h-8 w-8 transition-transform duration-300", isOpen && "rotate-90 scale-0")} />
                    <X className={cn("h-8 w-8 absolute transition-transform duration-300", !isOpen && "-rotate-90 scale-0")} />
                </Button>
            </div>
        </div>
    );
}
