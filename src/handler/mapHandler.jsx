import { getEarthQuakesAtDates } from "../API/usgsApi";

export function getGreatestEarthQuake(data) {
  return data
    .filter((element) => element.magnitude)
    .reduce((prev, current) => {
      return prev.magnitude > current.magnitude ? prev : current;
    });
}

export async function getEarthQuakesForDate(startDate, endDate) {
  const responseData = await getEarthQuakesAtDates(startDate, endDate);
  if (!responseData || !responseData.features.length) {
    return [];
  } else {
    let filteredData = mapEarthQuakeData(responseData);
    filteredData = filteredData ? filteredData : [];
    return filteredData;
  }
}

export async function getData() {
  const today = new Date();
  const firstDayOfMonth = new Date(
    `${today.getMonth() + 1} 01, ${today.getFullYear()} 00:00:00`
  );

  return await getEarthQuakesForDate(firstDayOfMonth, today);
}

const mapEarthQuakeData = (earthQuakeData) => {
  return earthQuakeData.features
    ?.filter((earthQuake) => {
      return (
        earthQuake.geometry?.coordinates[0] &&
        earthQuake.geometry?.coordinates[1]
      );
    })
    .map((earthQuake) => {
      return {
        longitude: earthQuake.geometry.coordinates[0],
        latitude: earthQuake.geometry.coordinates[1],
        magnitude: earthQuake.properties?.mag,
        id: earthQuake.id,
        place: earthQuake.properties?.place,
        time:  earthQuake.properties?.time
      };
    });
};
