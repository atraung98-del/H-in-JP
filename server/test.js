const response = await fetch(
  "https://express.heartrails.com/api/json?method=getStations&prefecture=東京都"
);

const data = await response.json();

console.log(data);