export type TeacherSubjectResponse = {
  id: string;
  teacher_id: string;
  subject_id: string;
  class_id: string;
  created_at: string;
};

export type TeacherSubjectCreate = {
  teacher_id: string;
  subject_id: string;
  class_id: string;
};
