
export interface Message {
  id: string;
  recipientEmail: string;
  senderName: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
}
