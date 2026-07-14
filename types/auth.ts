export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type Role = {
  id: string;
  role_name: string;
  description?: string | null;
};

export type ApiErrorDetail = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export type ApiErrorResponse = {
  detail: string | ApiErrorDetail[];
};

export type { UserResponse } from "@/types/entities/user";
