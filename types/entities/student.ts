export type StudentCreate = {
  user_id: string;
  admission_no: string;
  first_name?: string | null;
  last_name?: string | null;
  gender?: string | null;
  blood_group?: string | null;
  class_name?: string | null;
  class_id?: string | null;
  roll_no?: string | null;
  joining_date?: string | null;
  photo?: string | null;
};

export type StudentUpdate = {
  user_id?: string | null;
  admission_no?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  gender?: string | null;
  blood_group?: string | null;
  class_name?: string | null;
  class_id?: string | null;
  roll_no?: string | null;
  joining_date?: string | null;
  photo?: string | null;
};

export type StudentResponse = {
  id: string;
  user_id: string;
  admission_no: string;
  first_name?: string | null;
  last_name?: string | null;
  gender?: string | null;
  blood_group?: string | null;
  class_name?: string | null;
  class_id?: string | null;
  roll_no?: string | null;
  joining_date?: string | null;
  photo?: string | null;
};
