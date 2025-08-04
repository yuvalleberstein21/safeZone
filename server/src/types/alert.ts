export type AlertStatus = 'pending' | 'acknowledged';

export interface Alert {
  id: string;
  report_id: string;
  status: AlertStatus;
  acknowledged_at?: string;
  acknowledged_by?: string;
}
