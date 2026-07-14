export const formatCurrency = (value: number | string): string => {
  if (typeof value === "string") return value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-IN").format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
