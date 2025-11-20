'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { DroneIncident } from '@/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface HeatMapProps {
  data: DroneIncident[];
}

function MapBounds({ data }: { data: DroneIncident[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (data.length > 0) {
      const bounds = L.latLngBounds(
        data.map(incident => [incident.location.latitude, incident.location.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Default to US center
      map.setView([39.8283, -98.5795], 4);
    }
  }, [data, map]);

  return null;
}

export default function HeatMap({ data }: HeatMapProps) {
  const getColor = (severity: DroneIncident['severity']) => {
    switch (severity) {
      case 'fatal': return '#dc2626';
      case 'serious': return '#ea580c';
      case 'minor': return '#f59e0b';
      case 'none': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getRadius = (severity: DroneIncident['severity']) => {
    switch (severity) {
      case 'fatal': return 12;
      case 'serious': return 10;
      case 'minor': return 8;
      case 'none': return 6;
      default: return 5;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Incident Heat Map</h3>
      <div className="h-[600px] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBounds data={data} />
          {data.map(incident => (
            <CircleMarker
              key={incident.id}
              center={[incident.location.latitude, incident.location.longitude]}
              radius={getRadius(incident.severity)}
              pathOptions={{
                fillColor: getColor(incident.severity),
                color: getColor(incident.severity),
                fillOpacity: 0.6,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{incident.location.city}, {incident.location.state}</p>
                  <p>Date: {new Date(incident.date).toLocaleDateString()}</p>
                  <p>Aircraft: {incident.aircraftType.replace('_', ' ')}</p>
                  <p>Airspace: {incident.airspace}</p>
                  <p>Severity: {incident.severity}</p>
                  {incident.airport && (
                    <p>Airport: {incident.airport.name} ({incident.airport.code})</p>
                  )}
                  {incident.lawEnforcementInvolved && (
                    <p className="text-red-600 font-semibold">Law Enforcement Involved</p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span>Fatal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-600"></div>
          <span>Serious</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span>Minor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span>None</span>
        </div>
      </div>
    </div>
  );
}

