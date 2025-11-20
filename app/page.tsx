'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Filters from '@/components/Filters';
import PieChart from '@/components/PieChart';
import Histogram from '@/components/Histogram';
import { FilterState } from '@/types';
import { allIncidents } from '@/lib/data';

// Dynamically import HeatMap to avoid SSR issues with Leaflet
const HeatMap = dynamic(() => import('@/components/HeatMap'), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow-md p-6 h-[600px] flex items-center justify-center">Loading map...</div>
});

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    aircraftTypes: ['commercial', 'general_aviation', 'rotorcraft', 'other'],
    airspaceClasses: ['A', 'B', 'C', 'D', 'E', 'G', 'restricted', 'prohibited'],
    lawEnforcement: null,
    hasAirport: null,
    dateRange: {
      start: null,
      end: null,
    },
  });

  const filteredData = useMemo(() => {
    return allIncidents.filter(incident => {
      // Aircraft type filter
      if (!filters.aircraftTypes.includes(incident.aircraftType)) {
        return false;
      }

      // Airspace filter
      if (!filters.airspaceClasses.includes(incident.airspace)) {
        return false;
      }

      // Law enforcement filter
      if (filters.lawEnforcement !== null && incident.lawEnforcementInvolved !== filters.lawEnforcement) {
        return false;
      }

      // Airport filter
      if (filters.hasAirport !== null) {
        const hasAirport = !!incident.airport;
        if (filters.hasAirport !== hasAirport) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.start) {
        if (incident.date < filters.dateRange.start) {
          return false;
        }
      }
      if (filters.dateRange.end) {
        if (incident.date > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Drone Accidents Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive analysis of drone incidents across the United States
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Incidents</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{filteredData.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500">Law Enforcement</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {filteredData.filter(i => i.lawEnforcementInvolved).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500">Near Airports</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {filteredData.filter(i => i.airport).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500">Fatal Incidents</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {filteredData.filter(i => i.severity === 'fatal').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Filters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Charts and Map */}
          <div className="lg:col-span-3 space-y-6">
            {/* Heat Map */}
            <HeatMap data={filteredData} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PieChart 
                data={filteredData} 
                dataKey="aircraftType" 
                title="Incidents by Aircraft Type" 
              />
              <PieChart 
                data={filteredData} 
                dataKey="airspace" 
                title="Incidents by Airspace Class" 
              />
              <Histogram 
                data={filteredData} 
                title="Incidents by Month" 
                groupBy="month" 
              />
              <Histogram 
                data={filteredData} 
                title="Incidents by State (Top 15)" 
                groupBy="state" 
              />
              <Histogram 
                data={filteredData} 
                title="Incidents by Severity" 
                groupBy="severity" 
              />
              <PieChart 
                data={filteredData} 
                dataKey="severity" 
                title="Severity Distribution" 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Drone Accidents Dashboard - Data visualization and analysis tool
          </p>
        </div>
      </footer>
    </div>
  );
}
