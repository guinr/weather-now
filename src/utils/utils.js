export const convertKelvinToCelsius = (temperature) => {
  return Math.round(temperature - 273.15);
}

export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

export const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
}