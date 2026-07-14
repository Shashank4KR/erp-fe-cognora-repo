export type ParentCreate = {
  user_id: string;
  occupation?: string | null;
  phone?: string | null;
  address?: string | null;
};

export type ParentResponse = {
  id: string;
  user_id: string;
  occupation?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at?: string;
  updated_at?: string;
};
