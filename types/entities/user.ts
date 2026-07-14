export type UserCreate = {
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  status: boolean;
  role_id: string;
};

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  status: boolean;
  last_login?: string | null;
  role_id: string;
  role?: {
    id: string;
    role_name: string;
    description?: string | null;
  } | null;
  created_at: string;
  updated_at?: string | null;
};
