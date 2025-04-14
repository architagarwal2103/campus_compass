import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import SearchBar from '../SearchBar';

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const title = prompt('Enter title for this location:');
      const description = prompt('Enter description:');
      if (title && description) {
        onAdd({ lat, lng, title, description });
      }
    }
  });
  return null;
}

function MapPage() {
  const [position, setPosition] = useState([20, 77]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await axios.get('http://localhost:5000/locations');
    setLocations(res.data);
  };

  const handleAddLocation = async (newLocation) => {
    const res = await axios.post('http://localhost:5000/locations', newLocation);
    setLocations([...locations, res.data]);
  };

  return (
    <div style={{ height: "100vh" }}>
      <SearchBar onSearchResult={(coords) => setPosition(coords)} />

      <MapContainer center={position} zoom={5} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={position} />
        <AddMarker onAdd={handleAddLocation} />

        {locations.map(loc => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <h3>{loc.title}</h3>
              <p>{loc.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPage;
