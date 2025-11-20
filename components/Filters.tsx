'use client';

import { FilterState, AircraftType, AirspaceClass } from '@/types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const aircraftTypes: AircraftType[] = ['commercial', 'general_aviation', 'rotorcraft', 'other'];
  const airspaceClasses: AirspaceClass[] = ['A', 'B', 'C', 'D', 'E', 'G', 'restricted', 'prohibited'];

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleAircraftType = (type: AircraftType) => {
    const newTypes = filters.aircraftTypes.includes(type)
      ? filters.aircraftTypes.filter(t => t !== type)
      : [...filters.aircraftTypes, type];
    updateFilter('aircraftTypes', newTypes);
  };

  const toggleAirspace = (airspace: AirspaceClass) => {
    const newAirspace = filters.airspaceClasses.includes(airspace)
      ? filters.airspaceClasses.filter(a => a !== airspace)
      : [...filters.airspaceClasses, airspace];
    updateFilter('airspaceClasses', newAirspace);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
      
      {/* Aircraft Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aircraft Type
        </label>
        <div className="flex flex-wrap gap-2">
          {aircraftTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleAircraftType(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.aircraftTypes.includes(type)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Airspace Class */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Airspace Class
        </label>
        <div className="flex flex-wrap gap-2">
          {airspaceClasses.map(airspace => (
            <button
              key={airspace}
              onClick={() => toggleAirspace(airspace)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.airspaceClasses.includes(airspace)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {airspace}
            </button>
          ))}
        </div>
      </div>

      {/* Law Enforcement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Law Enforcement Involved
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter('lawEnforcement', null)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filters.lawEnforcement === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => updateFilter('lawEnforcement', true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filters.lawEnforcement === true
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => updateFilter('lawEnforcement', false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filters.lawEnforcement === false
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Airport Proximity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Airport Proximity
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter('hasAirport', null)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filters.hasAirport === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => updateFilter('hasAirport', true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filters.hasAirport === true
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Near Airport
          </button>
          <button
            onClick={() => updateFilter('hasAirport', false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filters.hasAirport === false
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No Airport
          </button>
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={filters.dateRange.start || ''}
            onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value || null })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="date"
            value={filters.dateRange.end || ''}
            onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value || null })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );
}

