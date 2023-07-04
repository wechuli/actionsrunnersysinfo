import fs from "fs";
import path from "path";

function getTempDir(): string {
  let tempDir = process.env["RUNNER_TEMP"] || process.cwd();
  return tempDir;
}

// create empty JSON file and return the location
export function createJSONfile(tempDir = getTempDir()): string {
  let fileLocation = path.join(tempDir, "sysinfo.json");
  fs.writeFileSync(fileLocation, "{}");
  return fileLocation;
}
