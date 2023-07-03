import fs from "fs";

// create empty JSON file
export function createJSONfile(): void {
  let fileLocation = process.env["RUNNER_TEMP"];
  if (fileLocation) {
    fileLocation += "\\sysinfo.json";
    fs.writeFileSync(fileLocation, "{}");
  }
}
