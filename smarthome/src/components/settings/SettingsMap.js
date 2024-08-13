import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { useDashContext } from '../../hooks/useDashContext.hook';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const SettingsMap = () => {
  const { loggedInUser } = useDashContext();

  const position1 = [
    loggedInUser?.geolocationData?.location?.latitude || 44.7971,
    loggedInUser?.geolocationData?.location?.longitude || 20.4944,
  ];
  const position2 = [44.7971, 20.4944];

  return (
    <MapContainer
      center={position1}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '5px' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position1}>
        <Popup>Your Location</Popup>
      </Marker>
      <Marker position={position2}>
        <Popup>Home</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SettingsMap;