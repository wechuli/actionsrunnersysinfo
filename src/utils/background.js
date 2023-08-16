const fs = require("fs");
const { exec } = require("child_process");
// const si = require("systeminformation");

// async function getCurrentLoad() {
//   let data = await si.currentLoad();
//   let importantLoadInfo = {
//     currentLoad: data.currentLoad,
//     currentLoadUser: data.currentLoadUser,
//     currentLoadSystem: data.currentLoadSystem,
//   };
//   return importantLoadInfo;
// }

// async function getMemoryInfo() {
//   let data = await si.mem();
//   return data;
// }

// // disk utilization
// async function getDiskInfo() {
//   let data = await si.diskLayout();
//   return data;
// }

async function background() {
  const filePath = process.env.dataFilePath;
  let rawData = fs.readFileSync(filePath, "utf8");
  let parsedData = JSON.parse(rawData);

  exec("npm install systeminformation");
  const si = require("systeminformation");

  const date = new Date();

  // const currentLoad = await getCurrentLoad();
  // const memoryInfo = await getMemoryInfo();
  // const diskInfo = await getDiskInfo();
  const timeStamp = date.toLocaleTimeString();

  const backgroundStats = {
    time: timeStamp,
    // stats: {
    //   currentLoad,
    //   memoryInfo,
    //   diskInfo,
    // },
  };
  parsedData.timeSeries.push(backgroundStats);

  fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), "utf8");
}
background();
setInterval(background, 1000 * 60); // run once a minute
