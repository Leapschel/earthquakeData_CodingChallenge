import GoogleMapReact from "google-map-react";
import './Map.css';

export default function Map({ center, initialZoom, onChange, markers}) {
  // { height: "80vh", width: "60%", margin: "50px 50px 0px 50px", position: "absolute", bottom: "35px", left: "0"}
  return (
    <div style={{ left: "30px", height: "80vh", width:" 65%", position: "absolute"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS }}
        defaultCenter={center}
        defaultZoom={initialZoom}
        onChange={onChange}
      >
          {markers}
      </GoogleMapReact>
    </div>
  );
}
