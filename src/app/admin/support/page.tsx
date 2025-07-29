
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat } from '@/contexts/chat-context';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Send, ArrowLeft, Paperclip, File as FileIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/hooks/use-toast';

type Attachment = {
  name: string;
  type: string;
  dataUrl: string;
};

export default function AdminSupportChatPage() {
    const { conversations, getConversation, sendMessage, markAsRead } = useChat();
    const { users } = useAuth();
    const { toast } = useToast();
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const conversationList = useMemo(() => {
        return Object.keys(conversations).map(email => {
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
    }, [conversations, users]);

    const activeConversation = useMemo(() => {
        return selectedConversationId ? getConversation(selectedConversationId) : [];
    }, [selectedConversationId, getConversation]);

    useEffect(() => {
        if (selectedConversationId) {
            markAsRead(selectedConversationId);
        }
    }, [selectedConversationId, markAsRead]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConversation]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) { // 1MB limit
                toast({
                    variant: 'destructive',
                    title: 'File too large',
                    description: 'Please upload a file smaller than 1MB.',
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setAttachment({
                    name: file.name,
                    type: file.type,
                    dataUrl: e.target?.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if ((message.trim() || attachment) && selectedConversationId) {
            sendMessage({
                conversationId: selectedConversationId,
                sender: 'admin',
                text: message.trim(),
                attachment: attachment || undefined,
            });
            setMessage('');
            setAttachment(null);
            if(fileInputRef.current) {
              fileInputRef.current.value = '';
            }
        }
    };

    const handleSelectConversation = (id: string) => {
        setSelectedConversationId(id);
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
                                                {msg.text && <p className="text-sm">{msg.text}</p>}
                                                {msg.attachment && (
                                                  <a href={msg.attachment.dataUrl} download={msg.attachment.name} className="flex items-center gap-2 mt-2 p-2 rounded-md bg-black/10 hover:bg-black/20">
                                                    <FontAwesomeIcon icon={faFile} className="h-4 w-4" />
                                                    <span className="text-xs font-medium truncate">{msg.attachment.name}</span>
                                                  </a>
                                                )}
                                                <p className="text-xs text-right opacity-70 mt-1">{format(new Date(msg.timestamp), 'p')}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <div className="p-4 border-t">
                            <form onSubmit={handleSendMessage} className="space-y-2">
                                {attachment && (
                                    <div className="flex items-center justify-between p-2 text-sm rounded-md bg-secondary">
                                        <span className="truncate">{attachment.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => {
                                                setAttachment(null);
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Paperclip className="h-5 w-5" />
                                    </Button>
                                    <Button type="submit" size="icon" disabled={!message.trim() && !attachment}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
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
