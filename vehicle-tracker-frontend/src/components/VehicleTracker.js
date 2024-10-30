import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRouteData } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Pause, Play, RotateCw } from 'lucide-react';

const vehicleIcon = new Icon({
  iconUrl: '/placeholder.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function AutoCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position);
  }, [map, position]);
  return null;
}

function VehicleTracker() {
  const [routeData, setRouteData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRouteData();
      if (response.data) {
        setRouteData(response.data);
      }
    };
    fetchData();
  }, []);

  const positions = routeData.map(point => [point.latitude, point.longitude]);

  useEffect(() => {
    let interval;
    if (isPlaying && positions.length > 0) {
      interval = setInterval(() => {
        setCurrentPosition(prev => (prev >= positions.length - 1 ? prev : prev + 1));
        setLastUpdate(new Date());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, positions]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentPosition(0);
    setIsPlaying(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader><CardTitle>Vehicle Tracker</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <MapContainer
          center={positions[0] || [0, 0]}
          zoom={15}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {positions[currentPosition] && (
            <Marker position={positions[currentPosition]} icon={vehicleIcon} />
          )}
          <Polyline positions={positions} color="blue" />
          {positions[currentPosition] && (
            <AutoCenter position={positions[currentPosition]} />
          )}
        </MapContainer>
        <div className="flex items-center justify-between">
          <Button onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</Button>
          <Button onClick={handleReset}><RotateCw /> Reset</Button>
          <span>Last Updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default VehicleTracker;
