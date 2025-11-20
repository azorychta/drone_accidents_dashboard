export type AircraftType = 'commercial' | 'general_aviation' | 'rotorcraft' | 'other';
export type AirspaceClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'G' | 'restricted' | 'prohibited' | 'unknown';
export type IncidentSeverity = 'fatal' | 'serious' | 'minor' | 'none';

export interface DroneIncident {
  id: string;
  date: string;
  location: {
    city: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  aircraftType: AircraftType;
  airspace: AirspaceClass;
  airport?: {
    name: string;
    code: string;
    distance: number; // in miles
  };
  lawEnforcementInvolved: boolean;
  severity: IncidentSeverity;
  description?: string;
}

export interface FilterState {
  aircraftTypes: AircraftType[];
  airspaceClasses: AirspaceClass[];
  lawEnforcement: boolean | null; // null = all, true = yes, false = no
  hasAirport: boolean | null; // null = all, true = yes, false = no
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

