function formatDateAndTime() {
  //   const hoy = new Date().toLocaleString('en-US', {
  //     timeZone: 'America/Mexico_City',
  //   });

  const rawDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const time = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Mexico_City',
    hour12: false,
  });

  const year = rawDate.slice(-4);
  const month = rawDate.slice(0, -8);
  const day = rawDate.slice(3, -5);
  const date = `${year}-${month}-${day}`;

  //   console.log(year);
  //   console.log(month);
  //   console.log(day);

  //   console.log(date);
  //   console.log(time);
  const formattedDateandTime = { date, time, month, year };
  return formattedDateandTime;
}

module.exports = formatDateAndTime;
