export type MessMenuCreate = {
  name: string;
  description?: string | null;
  items: string[];
  meal_type: string;
  price?: number | null;
};

export type MessMenuUpdate = {
  name?: string | null;
  description?: string | null;
  items?: string[] | null;
  meal_type?: string | null;
  price?: number | null;
};

export type MessMenuResponse = {
  id: string;
  name: string;
  description?: string | null;
  items: string[];
  meal_type: string;
  price?: number | null;
};

export type MealAttendancePayload = {
  student_id: string;
  menu_id: string;
  date: string;
};

export type MessCollectionCreate = {
  student_id: string;
  amount: number;
  payment_method: string;
  collected_by: string;
};

export type MessCollectionResponse = {
  id: string;
  student_id: string;
  amount: number;
  payment_method: string;
  collected_by: string;
};

export type MessExpenseCreate = {
  category: string;
  amount: number;
  description?: string | null;
  recorded_by: string;
};

export type MessExpenseResponse = {
  id: string;
  category: string;
  amount: number;
  description?: string | null;
  recorded_by: string;
};