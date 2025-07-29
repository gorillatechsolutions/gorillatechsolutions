
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useChat } from '@/contexts/chat-context';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Send, X, LogIn } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Link from 'next/link';

export function ChatWidget() {
    const { user } = useAuth();
    const { getConversation, sendMessage, getUnreadAdminMessageCount } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const unreadCount = user ? getUnreadAdminMessageCount(user.email) : 0;
    const conversation = user ? getConversation(user.email) : [];

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isOpen, conversation]);
    
    useEffect(() => {
        if (user && unreadCount > 0 && !isOpen) {
            // Potentially add a sound or more prominent notification here
        }
    }, [user, unreadCount, isOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && user) {
            sendMessage({
                conversationId: user.email,
                sender: 'user',
                text: message.trim(),
            });
            setMessage('');
        }
    };

    return (
        <>
            <div className={cn("fixed bottom-5 left-5 z-50 transition-transform duration-300", isOpen && "translate-y-[200%]")}>
                <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full shadow-lg h-16 w-16">
                    <FontAwesomeIcon icon={faConciergeBell} className="h-8 w-8" />
                    {user && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white border-2 border-background">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </div>

            <div className={cn(
                "fixed bottom-5 left-5 z-50 transition-all duration-300 ease-in-out",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}>
                <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
                        <CardTitle className="text-lg">Support Chat</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-primary/80">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-hidden">
                        <ScrollArea className="h-full pr-4">
                            <div className="space-y-4">
                                {conversation.map((msg) => (
                                    <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                                        {msg.sender === 'admin' && <Avatar className="h-8 w-8"><AvatarFallback>A</AvatarFallback></Avatar>}
                                        <div className={cn("max-w-[70%] p-3 rounded-lg", msg.sender === 'user' ? 'bg-secondary' : 'bg-accent text-accent-foreground')}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className="text-xs text-right opacity-70 mt-1">{format(new Date(msg.timestamp), 'p')}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        {user ? (
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
                                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" />
                                <Button type="submit" size="icon" disabled={!message.trim()}><Send className="h-4 w-4" /></Button>
                            </form>
                        ) : (
                            <div className="w-full text-center space-y-3">
                                <p className="text-sm text-muted-foreground">Please log in to send a message.</p>
                                <Button asChild className="w-full">
                                    <Link href="/login">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Login
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
