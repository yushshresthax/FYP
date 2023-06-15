import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function MapWithMarker({publishLocation=()=>{}}) {
  const [position, setPosition] = useState(null);
  const [center, setCenter] = useState([51.505, -0.09]);
    const [loaded,setLoaded]=useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (_position) => {
        setCenter([_position.coords.latitude, _position.coords.longitude]);
        setPosition({lat:_position.coords.latitude,lng: _position.coords.longitude});
        setLoaded(true);
        publishLocation({lat:_position.coords.latitude,lng: _position.coords.longitude});

        console.log(center);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        console.log(e.latlng);
        setPosition(e.latlng);
        publishLocation(e.latlng);
      },
      locationfound(e) {
        setPosition(e.latlng);
        publishLocation(e.latlng);

      },
    });

    return position === null ? null : (
      <Marker position={position} draggable={true}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div>

        {loaded?<div style={{height:"300px"}}>

        <MapContainer center={center} zoom={18} style={{ height: '300px',width:"100%" }}  scrollWheelZoom={false} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker/>
        </MapContainer>
        </div>:<div>Loading Map</div>}
    </div>
  );
}

export default MapWithMarker;