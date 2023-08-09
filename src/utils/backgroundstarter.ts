const spawn = require("child_process").spawn;
const fs = require("fs");

const path = process.cwd() + "/background.js";

const js_content = `
const fs = require("fs");

// read in a json file (or create one if it doesn't exist) and add a new entry to it of the current date and time

const background = () => {
  // get the current working directory

  const filePath = process.cwd() + "/background.json";
  console.log(filePath);

  let background = [];

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      background = JSON.parse(data);
    } catch (err) {
      console.error(
        "Failed to read or pars Reason:"
      );
      return; // Exit function if reading or parsing fails
    }
  }

  const date = new Date();
  const newBackground = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  background.push(newBackground);

  try {
    fs.writeFileSync(filePath, JSON.stringify(background, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write to Reason:");
  }
};

setInterval(background, 1000 * 60); // run once a minute

`;

export async function spawnBackgroundProcess(): Promise<number> {
  fs.writeFileSync(path, js_content, "utf8");

  const child = spawn("node", [path], {
    detached: true,
    stdio: "ignore",
  });

  const PID = child.pid;
  console.log(`Background process started with pid ${child.pid}`);
  child.unref();
  return PID;
}

spawnBackgroundProcess()
  .then((pid) => console.log(pid))
  .catch((err) => console.log(err));

// create a file called background.js in the current working directory
