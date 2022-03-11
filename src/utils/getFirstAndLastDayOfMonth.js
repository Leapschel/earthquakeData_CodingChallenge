export default function getFirstAndLastDayOfMonth(startDate) {
  const year = startDate.getFullYear();
  const month = startDate.getMonth();

  //month in date object starts with index 0
  //to get to the month following the month of startDate month + 2
  let monthOfEndDate = month + 2;
  let yearOfEndDate = year;
  //if startdate is in December, next month has index 1 for January
  if (monthOfEndDate > 12) {
    monthOfEndDate = 1;
    yearOfEndDate = year + 1;
  }
  const firstDayOfMonth = new Date(`${month + 1} 01, ${year} 00:00:00`);
  const lastDayOfMonth = new Date(
    `${monthOfEndDate} 01, ${yearOfEndDate} 00:00:00`
  );
  return [firstDayOfMonth, lastDayOfMonth];
}
