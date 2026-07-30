export type AlumniCreate = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  graduation_year: string;
  current_occupation?: string | null;
};

export type AlumniUpdate = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  graduation_year?: string | null;
  current_occupation?: string | null;
};

export type AlumniResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  graduation_year: string;
  current_occupation?: string | null;
};