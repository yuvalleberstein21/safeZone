export interface Report {
  id?: number;
  user_id: number;
  is_safe: boolean;
  timestamp?: string;
  latitude?: number;
  longitude?: number;
  reason?: string;
  image_url?: string;
  area?: string;
  shift_id?: number;
  created_at?: string;
  updated_at?: string;
}
