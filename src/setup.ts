import fs from "fs";
import * as core from "@actions/core";
import {
  getOSInfo,
  getCurrentLoad,
  getHardwareInfo,
  getMemoryInfo,
} from "./sysinfo/sysinfo";
import { createJSONfile } from "./utils/fileOps";
import { State } from "./utils/state-helper";

export async function setup(): Promise<void> {
  try {
    // create empty JSON file
    let fileLocation = createJSONfile();

    // save file location to state
    core.saveState("fileLocation", fileLocation);

    // get Os info and write to JSON file
    let osInfo = await getOSInfo();
    await fs.promises.writeFile(fileLocation, osInfo);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  } finally {
    core.saveState(State.IsPre, "false");
  }
}
