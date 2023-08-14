import fs from "fs";
import * as core from "@actions/core";
import { Constants } from "./utils/constants";
import { getFileLocation } from "./utils/state-helper";

export function upload(): void {
  let fileLocation = getFileLocation();
  console.log(`File location: ${fileLocation}`);

  // check contents of file
  let fileContents = fs.readFileSync(fileLocation, "utf8");
  console.log(`File contents: ${fileContents}`);

  // get PID of background process
  let backgroundPID = core.getState(Constants.backgroundPID);
}
