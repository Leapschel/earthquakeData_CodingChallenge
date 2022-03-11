export default function getMedian(data) {
  const sortedEarthQuakes = data
    .filter((earthQuake) => earthQuake.magnitude)
    .map((earthQuake) => earthQuake.magnitude)
    .sort();
  const middleIndex = Math.floor(sortedEarthQuakes.length / 2);

  if (sortedEarthQuakes.length % 2)
    return sortedEarthQuakes[middleIndex].toFixed(2);

  return (
    (sortedEarthQuakes[middleIndex - 1] + sortedEarthQuakes[middleIndex]) /
    2.0
  ).toFixed(2);
}
