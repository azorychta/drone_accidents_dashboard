'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DroneIncident } from '@/types';

interface HistogramProps {
  data: DroneIncident[];
  title: string;
  groupBy: 'month' | 'state' | 'severity';
}

export default function Histogram({ data, title, groupBy }: HistogramProps) {
  let chartData: { name: string; count: number }[] = [];

  if (groupBy === 'month') {
    const monthCounts: Record<string, number> = {};
    data.forEach(incident => {
      const date = new Date(incident.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
    });
    chartData = Object.entries(monthCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } else if (groupBy === 'state') {
    const stateCounts: Record<string, number> = {};
    data.forEach(incident => {
      const state = incident.location.state;
      stateCounts[state] = (stateCounts[state] || 0) + 1;
    });
    chartData = Object.entries(stateCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15); // Top 15 states
  } else if (groupBy === 'severity') {
    const severityCounts: Record<string, number> = {};
    data.forEach(incident => {
      const severity = incident.severity;
      severityCounts[severity] = (severityCounts[severity] || 0) + 1;
    });
    chartData = Object.entries(severityCounts)
      .map(([name, count]) => ({ 
        name: name.charAt(0).toUpperCase() + name.slice(1), 
        count 
      }))
      .sort((a, b) => {
        const order = ['Fatal', 'Serious', 'Minor', 'None'];
        return order.indexOf(a.name) - order.indexOf(b.name);
      });
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={groupBy === 'month' ? -45 : 0}
            textAnchor={groupBy === 'month' ? 'end' : 'middle'}
            height={groupBy === 'month' ? 80 : 30}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

