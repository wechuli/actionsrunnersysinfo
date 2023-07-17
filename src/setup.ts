import fs from "fs";
import * as core from "@actions/core";
import {
  getOSInfo,
  getCurrentLoad,
  getHardwareInfo,
  getMemoryInfo,
  getNetworkInfo,
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
    let hardWareInfo = await getHardwareInfo();
    let networkInfo = await getNetworkInfo();

    let currentCollection = {
      osInfo,
      hardWareInfo,
      networkInfo,
      timeSeries: [],
    };
    await fs.promises.writeFile(
      fileLocation,
      JSON.stringify(currentCollection)
    );
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  } finally {
    core.saveState(State.IsPre, "false");
  }
}
