export type LeaveRequestCreate = {
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
};

export type LeaveRequestUpdate = {
  leave_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  reason?: string | null;
  status?: string | null;
};

export type LeaveRequestResponse = {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
};

export type LeaveBalanceResponse = {
  user_id: string;
  total_leaves: number;
  used_leaves: number;
  remaining_leaves: number;
};