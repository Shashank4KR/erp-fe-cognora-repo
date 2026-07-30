export type CalendarEventCreate = {
  title: string;
  description?: string | null;
  event_date: string;
  event_type: string;
  target_audience: string;
};

export type CalendarEventUpdate = {
  title?: string | null;
  description?: string | null;
  event_date?: string | null;
  event_type?: string | null;
  target_audience?: string | null;
};

export type CalendarEventResponse = {
  id: string;
  title: string;
  description?: string | null;
  event_date: string;
  event_type: string;
  target_audience: string;
};