const spawn = require("child_process").spawn;
const fs = require("fs");

const path = process.cwd() + "/background.js";

const js_content = `
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

// spawnBackgroundProcess()
//   .then((pid) => console.log(pid))
//   .catch((err) => console.log(err));

// create a file called background.js in the current working directory
