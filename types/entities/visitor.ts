export type VisitorCreate = {
  name: string;
  phone: string;
  purpose: string;
  host_name: string;
};

export type VisitorUpdate = {
  name?: string | null;
  phone?: string | null;
  purpose?: string | null;
  host_name?: string | null;
};

export type VisitorResponse = {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  host_name: string;
  check_in_time?: string | null;
  check_out_time?: string | null;
};

export type CheckInVisitorPayload = {
  name: string;
  phone: string;
  purpose: string;
  host_name: string;
};