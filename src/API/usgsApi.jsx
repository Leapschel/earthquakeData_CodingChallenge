import axios from "axios";

export async function getEarthQuakeDataFromAPI() {
  const response = await axios
    .get(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-09&endtime=2019-01-10`
    )
    .catch((error) => console.log(error));

  return response.data || [];
}

export async function getEarthQuakesAtDates(startDate, endDate) {
  const startDateDay = addLeadingZero(startDate.getDate());
  const startDateMonth = changeFormatOfDate(startDate.getMonth());
  const startDateYear = startDate.getFullYear();

  const endDateDay = endDate
    ? addLeadingZero(endDate.getDate())
    : addLeadingZero(startDate.getDate() + 1);
  const endDateMonth = endDate
    ? changeFormatOfDate(endDate.getMonth())
    : startDateMonth;
  const endDateYear = endDate ? endDate.getFullYear() : startDate.getFullYear();

  const apiRequest = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDateYear}-${startDateMonth}-${startDateDay}&endtime=${endDateYear}-${endDateMonth}-${endDateDay}`;
  const response = await axios.get(apiRequest).catch((error) => {
    console.log(error);
    return error;
  });

  return response.data;
}

//month of date object starts counting at 0; 0 represents january
function changeFormatOfDate(month) {
  const monthNumberRepresentation = month + 1;
  return addLeadingZero(monthNumberRepresentation);
}

//api requires leading zeros for day/month represention e.g. 01 for january
function addLeadingZero(date) {
  return date <= 9 ? "0" + date : date;
}
