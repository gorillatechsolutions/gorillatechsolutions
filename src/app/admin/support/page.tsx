
'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat, ChatMessage } from '@/contexts/chat-context';
import { useAuth, User } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Send, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function AdminSupportChatPage() {
    const { conversations, getConversation, sendMessage, markAsRead } = useChat();
    const { users } = useAuth();
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const activeConversation = selectedConversationId ? getConversation(selectedConversationId) : [];
    const conversationList = Object.keys(conversations).map(email => {
        const user = users.find(u => u.email === email);
        const lastMessage = conversations[email][conversations[email].length - 1];
        const unreadCount = conversations[email].filter(m => m.sender === 'user' && !m.read).length;
        return {
            id: email,
            user,
            lastMessage: lastMessage?.text || 'No messages yet.',
            timestamp: lastMessage?.timestamp,
            unreadCount
        };
    }).sort((a, b) => {
        if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
        if (b.unreadCount > 0 && a.unreadCount === 0) return 1;
        if (a.timestamp && b.timestamp) return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        if (a.timestamp) return -1;
        if (b.timestamp) return 1;
        return 0;
    });

    useEffect(() => {
        if (selectedConversationId) {
            markAsRead(selectedConversationId);
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedConversationId, activeConversation, markAsRead]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && selectedConversationId) {
            sendMessage({
                conversationId: selectedConversationId,
                sender: 'admin',
                text: message.trim(),
            });
            setMessage('');
        }
    };

    const handleSelectConversation = (id: string) => {
        setSelectedConversationId(id);
        markAsRead(id);
    };

    return (
        <div className="h-[calc(100vh-10rem)] flex gap-6">
            <Card className={cn("w-1/3 flex-col", selectedConversationId && "hidden md:flex")}>
                <CardHeader>
                    <CardTitle>Support Chats</CardTitle>
                    <CardDescription>All active user conversations.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                        {conversationList.map(({ id, user, lastMessage, unreadCount }) => (
                            <div key={id} onClick={() => handleSelectConversation(id)} className={cn("flex items-center gap-4 p-3 hover:bg-secondary cursor-pointer border-b", selectedConversationId === id && "bg-secondary")}>
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/100x100.png" alt={user?.name} data-ai-hint="person avatar" />
                                    <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 truncate">
                                    <p className="font-semibold">{user?.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
                                </div>
                                {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="flex-1 flex flex-col">
                {selectedConversationId ? (
                    <>
                        <CardHeader className="flex flex-row items-center gap-4 border-b">
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversationId(null)}>
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <Avatar>
                                <AvatarImage src="https://placehold.co/100x100.png" alt={users.find(u => u.email === selectedConversationId)?.name} data-ai-hint="person avatar" />
                                <AvatarFallback>{users.find(u => u.email === selectedConversationId)?.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{users.find(u => u.email === selectedConversationId)?.name}</CardTitle>
                                <CardDescription>{selectedConversationId}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-4 overflow-hidden">
                            <ScrollArea className="h-full pr-4">
                                <div className="space-y-4">
                                    {activeConversation.map((msg) => (
                                        <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'admin' ? 'justify-end' : 'justify-start')}>
                                            {msg.sender === 'user' && <Avatar className="h-8 w-8"><AvatarFallback>{users.find(u => u.email === selectedConversationId)?.name.charAt(0).toUpperCase()}</AvatarFallback></Avatar>}
                                            <div className={cn("max-w-[70%] p-3 rounded-lg", msg.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className="text-xs text-right opacity-70 mt-1">{format(new Date(msg.timestamp), 'p')}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <div className="p-4 border-t">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" />
                                <Button type="submit" size="icon" disabled={!message.trim()}><Send className="h-4 w-4" /></Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <p>Select a conversation to start chatting.</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
