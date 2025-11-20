import { DroneIncident } from '@/types';

// Sample data - in production, this would come from an API or database
export const sampleIncidents: DroneIncident[] = [
  {
    id: '1',
    date: '2024-01-15',
    location: {
      city: 'Los Angeles',
      state: 'CA',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    aircraftType: 'commercial',
    airspace: 'B',
    airport: {
      name: 'Los Angeles International Airport',
      code: 'LAX',
      distance: 2.5,
    },
    lawEnforcementInvolved: true,
    severity: 'serious',
    description: 'Drone flew within 500 feet of commercial aircraft during approach',
  },
  {
    id: '2',
    date: '2024-02-20',
    location: {
      city: 'New York',
      state: 'NY',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    aircraftType: 'general_aviation',
    airspace: 'C',
    airport: {
      name: 'John F. Kennedy International Airport',
      code: 'JFK',
      distance: 5.0,
    },
    lawEnforcementInvolved: false,
    severity: 'minor',
  },
  {
    id: '3',
    date: '2024-03-10',
    location: {
      city: 'Chicago',
      state: 'IL',
      latitude: 41.8781,
      longitude: -87.6298,
    },
    aircraftType: 'rotorcraft',
    airspace: 'D',
    airport: {
      name: 'O\'Hare International Airport',
      code: 'ORD',
      distance: 3.2,
    },
    lawEnforcementInvolved: true,
    severity: 'serious',
  },
  {
    id: '4',
    date: '2024-04-05',
    location: {
      city: 'Miami',
      state: 'FL',
      latitude: 25.7617,
      longitude: -80.1918,
    },
    aircraftType: 'commercial',
    airspace: 'B',
    lawEnforcementInvolved: false,
    severity: 'minor',
  },
  {
    id: '5',
    date: '2024-05-12',
    location: {
      city: 'Seattle',
      state: 'WA',
      latitude: 47.6062,
      longitude: -122.3321,
    },
    aircraftType: 'general_aviation',
    airspace: 'E',
    airport: {
      name: 'Seattle-Tacoma International Airport',
      code: 'SEA',
      distance: 8.0,
    },
    lawEnforcementInvolved: true,
    severity: 'fatal',
  },
  {
    id: '6',
    date: '2024-06-18',
    location: {
      city: 'Denver',
      state: 'CO',
      latitude: 39.7392,
      longitude: -104.9903,
    },
    aircraftType: 'rotorcraft',
    airspace: 'C',
    airport: {
      name: 'Denver International Airport',
      code: 'DEN',
      distance: 4.5,
    },
    lawEnforcementInvolved: false,
    severity: 'minor',
  },
  {
    id: '7',
    date: '2024-07-22',
    location: {
      city: 'Atlanta',
      state: 'GA',
      latitude: 33.7490,
      longitude: -84.3880,
    },
    aircraftType: 'commercial',
    airspace: 'B',
    airport: {
      name: 'Hartsfield-Jackson Atlanta International Airport',
      code: 'ATL',
      distance: 1.8,
    },
    lawEnforcementInvolved: true,
    severity: 'serious',
  },
  {
    id: '8',
    date: '2024-08-30',
    location: {
      city: 'Dallas',
      state: 'TX',
      latitude: 32.7767,
      longitude: -96.7970,
    },
    aircraftType: 'general_aviation',
    airspace: 'D',
    lawEnforcementInvolved: false,
    severity: 'none',
  },
  {
    id: '9',
    date: '2024-09-14',
    location: {
      city: 'Phoenix',
      state: 'AZ',
      latitude: 33.4484,
      longitude: -112.0740,
    },
    aircraftType: 'rotorcraft',
    airspace: 'E',
    airport: {
      name: 'Phoenix Sky Harbor International Airport',
      code: 'PHX',
      distance: 6.2,
    },
    lawEnforcementInvolved: true,
    severity: 'minor',
  },
  {
    id: '10',
    date: '2024-10-01',
    location: {
      city: 'Boston',
      state: 'MA',
      latitude: 42.3601,
      longitude: -71.0589,
    },
    aircraftType: 'commercial',
    airspace: 'B',
    airport: {
      name: 'Logan International Airport',
      code: 'BOS',
      distance: 2.1,
    },
    lawEnforcementInvolved: true,
    severity: 'serious',
  },
];

// Generate more sample data for better visualization
function generateSampleData(count: number): DroneIncident[] {
  const states = [
    { name: 'CA', lat: 36.7783, lng: -119.4179 },
    { name: 'TX', lat: 31.9686, lng: -99.9018 },
    { name: 'FL', lat: 27.7663, lng: -81.6868 },
    { name: 'NY', lat: 42.1657, lng: -74.9481 },
    { name: 'IL', lat: 40.3495, lng: -88.9861 },
    { name: 'PA', lat: 40.5908, lng: -77.2098 },
    { name: 'OH', lat: 40.3888, lng: -82.7649 },
    { name: 'GA', lat: 33.0406, lng: -83.6431 },
    { name: 'NC', lat: 35.5397, lng: -79.8438 },
    { name: 'MI', lat: 43.3266, lng: -84.5361 },
  ];

  const aircraftTypes: DroneIncident['aircraftType'][] = ['commercial', 'general_aviation', 'rotorcraft', 'other'];
  const airspaceClasses: DroneIncident['airspace'][] = ['A', 'B', 'C', 'D', 'E', 'G', 'restricted', 'prohibited'];
  const severities: DroneIncident['severity'][] = ['fatal', 'serious', 'minor', 'none'];

  const incidents: DroneIncident[] = [];
  const startDate = new Date('2023-01-01');
  
  for (let i = 0; i < count; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const date = new Date(startDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * 730)); // 2 years
    
    const hasAirport = Math.random() > 0.3;
    const lawEnforcement = Math.random() > 0.5;
    
    incidents.push({
      id: `sample-${i + 1}`,
      date: date.toISOString().split('T')[0],
      location: {
        city: `City ${i + 1}`,
        state: state.name,
        latitude: state.lat + (Math.random() - 0.5) * 2,
        longitude: state.lng + (Math.random() - 0.5) * 2,
      },
      aircraftType: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
      airspace: airspaceClasses[Math.floor(Math.random() * airspaceClasses.length)],
      airport: hasAirport ? {
        name: `Airport ${i + 1}`,
        code: `AP${i + 1}`,
        distance: Math.random() * 10,
      } : undefined,
      lawEnforcementInvolved: lawEnforcement,
      severity: severities[Math.floor(Math.random() * severities.length)],
    });
  }
  
  return incidents;
}

export const allIncidents: DroneIncident[] = [
  ...sampleIncidents,
  ...generateSampleData(100),
];

