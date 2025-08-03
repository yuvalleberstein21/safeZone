export interface Report {
  id: number;
  user_id: number;
  is_safe: boolean;
  latitude: number;
  longitude: number;
  reason: string;
  image_url?: string;
  area: string;
  shift_id?: number;
  timestamp: string;

  // מידע מה-join מול users
  username: string;
  user_name: string;
  role: 'employee' | 'manager' | 'admin';
  user_area: string;
}

export type ReportData = {
  is_safe: boolean;
  latitude: number | null;
  longitude: number | null;
  reason: string;
  area: string;
  timestamp: string;
};
