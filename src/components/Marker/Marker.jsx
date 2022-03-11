import React from "react";
import "./Marker.css";

export default function Marker({ key, diameter, name, onClick }) {
  return (
    <div
      className="marker"
      key={key}
      style={{ height: diameter, width: diameter }}
      title={name}
      onClick={() => onClick(key)}
    />
  );
}
