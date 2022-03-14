export default function getMedian(data) {
  if (!data.length) {
    return null;
  }
  const sortedEarthQuakes = data
    .filter((earthQuake) => earthQuake.magnitude)
    .map((earthQuake) => earthQuake.magnitude)
    .sort();

  if (!sortedEarthQuakes.length) {
    return null;
  }
  const middleIndex = Math.floor(sortedEarthQuakes.length / 2);

  if (sortedEarthQuakes.length % 2 || sortedEarthQuakes.length === 1)
    return sortedEarthQuakes[middleIndex].toFixed(2);

  return (
    (sortedEarthQuakes[middleIndex - 1] + sortedEarthQuakes[middleIndex]) /
    2.0
  ).toFixed(2);
}
