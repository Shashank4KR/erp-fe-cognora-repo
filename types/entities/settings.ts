export type SettingsResponse = {
  site_name: string;
  logo_url?: string | null;
  academic_year: string;
  timezone: string;
};

export type SettingsUpdate = {
  site_name?: string | null;
  logo_url?: string | null;
  academic_year?: string | null;
  timezone?: string | null;
};