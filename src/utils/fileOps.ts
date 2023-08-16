import fs from "fs";
import path from "path";
import { Constants } from "./constants";

export function getTempDir(): string {
  let tempDir = process.env[Constants.RUNNER_TEMP] || process.cwd();
  return tempDir;
}

export function getFileLocation(): string {
  let fileLocation = path.join(getTempDir(), Constants.FILE_NAME);
  return fileLocation;
}

// create empty JSON file and return the location
export function createJSONfile(fileLocation=getFileLocation()): string {
  fs.writeFileSync(fileLocation, "{}");
  return fileLocation;
}
