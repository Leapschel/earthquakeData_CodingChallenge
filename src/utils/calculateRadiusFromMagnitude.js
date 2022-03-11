export default function convertMagnitudeToRadius(magnitude, zoom) {
  const inverseLog = Math.pow(10, magnitude);
  const mapMagnitudeToDiameter = Math.sqrt(inverseLog);
  return keepRelativeMarkerSizeOnZoom(mapMagnitudeToDiameter, zoom);
}

//on zoom in markers should have the same relative size
function keepRelativeMarkerSizeOnZoom(mapMagnitudeToDiameter, zoom) {
  return Math.round(mapMagnitudeToDiameter * 0.001 * Math.pow(2, zoom));
}
