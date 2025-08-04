import { AlertTriangle, BarChart3, Shield, Users } from 'lucide-react';
import type { ReactNode } from 'react';

type stateCardProps = {
  stats: {
    safe: number;
    safePercentage: number;
    total: number;
    [key: string]: number;
  };
};

type CardProps = {
  title: string;
  value: number | string;
  icon: ReactNode;
  bg: 'green' | 'red' | 'blue' | 'yellow' | 'purple';
};
const StatsCards = ({ stats }: stateCardProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mx-8">
    <Card
      title="דיווחים בטוחים"
      value={stats.safe}
      icon={<Shield className="text-green-600" />}
      bg="green"
    />
    <Card
      title="לא בטוחים"
      value={stats.unsafe}
      icon={<AlertTriangle className="text-red-600" />}
      bg="red"
    />
    <Card
      title="סה״כ היום"
      value={stats.total}
      icon={<Users className="text-blue-600" />}
      bg="blue"
    />
    <Card
      title="אחוז בטיחות"
      value={`${stats.safePercentage}%`}
      icon={<BarChart3 className="text-purple-600" />}
      bg="purple"
    />
  </div>
);

const Card = ({ title, value, icon, bg }: CardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-2 bg-${bg}-100 rounded-lg`}>{icon}</div>
      <div className="mr-4">
        <p className={`text-sm font-medium text-${bg}-600`}>{title}</p>
        <p className={`text-2xl font-bold text-${bg}-900`}>{value}</p>
      </div>
    </div>
  </div>
);

export default StatsCards;
