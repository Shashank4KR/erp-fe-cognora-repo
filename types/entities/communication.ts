export type AnnouncementCreate = {
  title: string;
  content: string;
  target_audience: string;
  priority?: string | null;
};

export type AnnouncementUpdate = {
  title?: string | null;
  content?: string | null;
  target_audience?: string | null;
  priority?: string | null;
};

export type AnnouncementResponse = {
  id: string;
  title: string;
  content: string;
  target_audience: string;
  priority?: string | null;
};

export type MessageCreate = {
  recipient_id: string;
  subject: string;
  body: string;
};

export type MessageResponse = {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  body: string;
};

export type CommunicationStatsResponse = {
  total_announcements: number;
  total_messages: number;
};