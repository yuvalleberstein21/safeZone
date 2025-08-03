import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// כדי שה-marker יופיע נכון, צריך להגדיר אייקון
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapPickerProps = {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
};

const LocationMarker = ({
  onLocationSelect,
}: {
  onLocationSelect: (loc: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ onLocationSelect, initialLocation }: MapPickerProps) => {
  const [markerPos, setMarkerPos] = useState(initialLocation || null);

  const handleLocationSelect = (loc: { lat: number; lng: number }) => {
    setMarkerPos(loc);
    onLocationSelect(loc);
  };

  return (
    <MapContainer
      center={markerPos || { lat: 32.0853, lng: 34.7818 }}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerPos && <Marker position={markerPos} icon={markerIcon} />}
      <LocationMarker onLocationSelect={handleLocationSelect} />
    </MapContainer>
  );
};

export default MapPicker;
