export const cn = (...classes: (string | undefined | boolean)[]): string => {
  return classes
    .filter((c) => typeof c === "string")
    .join(" ");
};

export const truncate = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
