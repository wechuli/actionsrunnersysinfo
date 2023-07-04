import fs from "fs";
import path from "path";

// create empty JSON file
export function createJSONfile(): void {
  let fileLocation = process.env["RUNNER_TEMP"];
  console.log(fileLocation);
  if (fileLocation) {
    fileLocation = path.join(fileLocation, "sysinfo.json");
    fs.writeFileSync(fileLocation, "{}");
  }
}
