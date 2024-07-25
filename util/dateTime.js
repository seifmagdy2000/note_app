function getTimeStamp() {
  const now = new Date();

  // Extract time components
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Extract date components
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[now.getDay()];
  const dayOfMonth = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  // Format the date and time
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
  const currentDateTime = `${formattedTime} on ${formattedDate}`;

  return currentDateTime;
}
module.exports = { getTimeStamp };
