const spawn = require("child_process").spawn;
const fs = require("fs");

const path = process.cwd() + "/background.js";

const js_content = `
const fs = require("fs");
const { execSync } = require("child_process");

async function background() {
  const filePath = process.env.dataFilePath;
  let rawData = fs.readFileSync(filePath, "utf8");
  let parsedData = JSON.parse(rawData);

  execSync("npm install systeminformation");
  const si = require("systeminformation");

  // cpu utilization
  async function getCurrentLoad() {
    let data = await si.currentLoad();
    let importantLoadInfo = {
      currentLoad: data.currentLoad,
      currentLoadUser: data.currentLoadUser,
      currentLoadSystem: data.currentLoadSystem,
    };
    return importantLoadInfo;
  }

  // memory utilization
  async function getMemoryInfo() {
    let data = await si.mem();
    return data;
  }

  // disk utilization
  async function getDiskInfo() {
    let data = await si.diskLayout();
    return data;
  }

  const date = new Date();

  const currentLoad = await getCurrentLoad();
  const memoryInfo = await getMemoryInfo();
  const diskInfo = await getDiskInfo();
  const timeStamp = date.toLocaleTimeString();

  const backgroundStats = {
    time: timeStamp,
    stats: {
      currentLoad,
      memoryInfo,
      diskInfo,
    },
  };
  parsedData.timeSeries.push(backgroundStats);

  fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), "utf8");
}
background();
setInterval(background, 1000 * 60); // run once a minute

`;

export async function spawnBackgroundProcess(
  dataFilePath: string
): Promise<number> {
  fs.writeFileSync(path, js_content, "utf8");

  const child = spawn("node", [path], {
    detached: true,
    stdio: "ignore",
    env: {
      ...process.env,
      dataFilePath,
    },
  });

  const PID = child.pid;
  console.log(`Background process started with pid ${child.pid}`);
  child.unref();
  return PID;
}
