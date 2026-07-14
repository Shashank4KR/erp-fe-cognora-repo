export type TimetableResponse = {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room_no: string | null;
  period_no: number | null;
  created_at: string;
  updated_at: string;
};

export type TimetableCreate = {
  class_id: string;
  subject_id: string;
  teacher_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room_no?: string | null;
  period_no?: number | null;
};

export type TimetableUpdate = {
  class_id?: string;
  subject_id?: string;
  teacher_id?: string;
  day_of_week?: string;
  start_time?: string;
  end_time?: string;
  room_no?: string | null;
  period_no?: number | null;
};
