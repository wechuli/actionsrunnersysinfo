import fs from "fs";
import path from "path";
import { Constants } from "./constants";

function getTempDir(): string {
  let tempDir = process.env[Constants.RUNNER_TEMP] || process.cwd();
  return tempDir;
}

// create empty JSON file and return the location
export function createJSONfile(tempDir = getTempDir()): string {
  let fileLocation = path.join(tempDir, Constants.FILE_NAME);
  fs.writeFileSync(fileLocation, "{}");
  return fileLocation;
}
