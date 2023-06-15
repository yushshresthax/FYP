import React, { useState, 
  // useEffect 
} from 'react';
import { MapContainer, TileLayer, Marker, Popup
  // useMapEvents 
} from 'react-leaflet';

function DonationDetailMap({ position }) {
  const [center, setCenter] = useState([position.lat, position.lng]);



  function LocationMarker() {

    return position === null ? null : (
      <Marker position={position} draggable={false}>
        <Popup>Donation location</Popup>
      </Marker>
    );
  }

  return (
    <div>

      <div style={{ height: "300px" }}>

        <MapContainer center={center} zoom={18} style={{ height: '300px', width: "100%" }} scrollWheelZoom={false} >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default DonationDetailMap;