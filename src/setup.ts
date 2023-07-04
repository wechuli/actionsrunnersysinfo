import fs from "fs";
import {
  getOSInfo,
  getCurrentLoad,
  getHardwareInfo,
  getMemoryInfo,
} from "./sysinfo/sysinfo";
import { createJSONfile } from "./utils/fileOps";
import * as core from "@actions/core";

export async function setup(): Promise<void> {
  // create empty JSON file
  let fileLocation = createJSONfile();

  // save file location to state
  core.saveState("fileLocation", fileLocation);

  // get Os info and write to JSON file
  let osInfo = await getOSInfo();
  await fs.promises.writeFile(fileLocation, osInfo);
}
