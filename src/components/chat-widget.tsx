
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faHeadset, faPhone, faTimes, faPaperclip, faFile, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContactSettings } from '@/contexts/contact-settings-context';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useChat } from '@/contexts/chat-context';
import { Avatar, AvatarFallback } from './ui/avatar';
import { format } from 'date-fns';
import { Send, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type Attachment = {
  name: string;
  type: string;
  dataUrl: string;
};

export function ChatWidget() {
    const { user } = useAuth();
    const { settings: contactSettings } = useContactSettings();
    const { getConversation, sendMessage } = useChat();
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'main' | 'chat'>('main');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();

    const conversation = user ? getConversation(user.email) : [];

    useEffect(() => {
        if (isOpen && view === 'chat') {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation, isOpen, view]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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
        if ((message.trim() || attachment) && user) {
            sendMessage({
                conversationId: user.email,
                sender: 'user',
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
    
    const MainView = () => (
        <div className="p-4 space-y-3">
             <button onClick={() => setView('chat')} className="flex items-center w-full text-left gap-4 p-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white">
                <FontAwesomeIcon icon={faHeadset} className="h-6 w-6" />
                <div>
                    <p className="font-bold">Live Support</p>
                    <p className="text-xs">9am - 6pm  24X7 online</p>
                </div>
            </button>
            <a href={contactSettings.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-lg bg-black hover:bg-gray-800 transition-colors text-white">
                <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
                <div>
                    <p className="font-bold">Whatsapp</p>
                    <p className="text-xs">9am - 6pm  24X7 online</p>
                </div>
            </a>
            <a href={contactSettings.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white">
                <FontAwesomeIcon icon={faTelegram} className="h-6 w-6" />
                <div>
                    <p className="font-bold">TeleGram</p>
                    <p className="text-xs">9am - 6pm  24X7 online</p>
                </div>
            </a>
        </div>
    );

    const ChatView = () => (
        <div className="flex flex-col h-[400px]">
            <div className="p-4 flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                         {conversation.map((msg) => (
                            <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                                {msg.sender === 'admin' && <Avatar className="h-8 w-8"><AvatarFallback>A</AvatarFallback></Avatar>}
                                <div className={cn("max-w-[80%] p-3 rounded-lg text-sm", msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                    {msg.text && <p>{msg.text}</p>}
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
            </div>
            <div className="p-4 border-t">
                 {user ? (
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
                          <Input
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Type a message..."
                              autoComplete="off"
                          />
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
                              <FontAwesomeIcon icon={faPaperclip} className="h-5 w-5" />
                          </Button>
                          <Button
                              type="submit"
                              size="icon"
                              disabled={!message.trim() && !attachment}
                          >
                              <Send className="h-4 w-4" />
                          </Button>
                        </div>
                    </form>
                 ) : (
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-3">Please log in to start a chat.</p>
                        <Button asChild className="w-full">
                            <Link href="/login"><LogIn className="mr-2 h-4 w-4" /> Login or Sign Up</Link>
                        </Button>
                    </div>
                 )}
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className={cn(
                "w-[320px] bg-card rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}>
                <header className="bg-green-500 text-white p-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">How Can I help You</h3>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>Gorilla Tech Solution</span>
                        </div>
                    </div>
                     {view === 'chat' && (
                        <Button variant="ghost" size="sm" onClick={() => setView('main')}>Back</Button>
                    )}
                </header>
                {view === 'main' ? <MainView /> : <ChatView />}
            </div>
            
            <div className="flex justify-end mt-4">
                 <Button 
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon" 
                    className="rounded-full shadow-lg h-16 w-16 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-110"
                >
                    <FontAwesomeIcon icon={isOpen ? faTimes : faHeadset} className="h-8 w-8 transition-transform duration-300" />
                </Button>
            </div>
        </div>
    );
}
