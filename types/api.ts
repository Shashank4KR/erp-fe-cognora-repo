export type ApiErrorResponse = {
  detail: string | { loc: (string | number)[]; msg: string; type: string }[];
};

export type ApiSuccess<T> = {
  data: T;
};

export type PaginatedResponse<T> = {
  items: T[];
  total?: number;
};
