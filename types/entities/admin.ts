export type AdminCreate = {
  user_id: string;
  admin_name: string;
  phone?: string | null;
};

export type AdminResponse = {
  id: string;
  user_id: string;
  admin_name: string;
  phone?: string | null;
  created_at?: string;
  updated_at?: string;
};
