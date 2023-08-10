const fs = require("fs");

const background = () => {
  const filePath = process.env.dataFilePath;
  let rawData = fs.readFileSync(filePath, "utf8");
  let parsedData = JSON.parse(rawData);

  const date = new Date();
  const newBackground = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  parsedData.timeSeries.push(newBackground);

  fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), "utf8");
};

setInterval(background, 1000 * 60); // run once a minute
