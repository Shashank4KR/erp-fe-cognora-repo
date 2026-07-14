export type SubjectResponse = {
  id: string;
  subject_code: string;
  subject_name: string;
  created_at?: string;
  updated_at?: string;
};

export type SubjectCreate = {
  subject_code: string;
  subject_name: string;
};

export type SubjectUpdate = {
  subject_code?: string;
  subject_name?: string;
};
