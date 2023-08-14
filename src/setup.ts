import fs from "fs";
import * as core from "@actions/core";
import {
  getOSInfo,
  getCurrentLoad,
  getHardwareInfo,
  getMemoryInfo,
  getNetworkInfo,
} from "./sysinfo/sysinfo";
import { statsCollectorAndWriter } from "./utils/interval";
import { createJSONfile, getFileLocation } from "./utils/fileOps";
import { spawnBackgroundProcess } from "./utils/backgroundstarter";
import { State } from "./utils/state-helper";
import { Constants } from "./utils/constants";

export async function setup(): Promise<void> {
  try {
    // create empty JSON file
    let fileLocation = getFileLocation();
    createJSONfile(fileLocation);

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
    const backgroundPID = await spawnBackgroundProcess(fileLocation);

    // save background PID to state
    core.saveState(Constants.BACKGROUNDPROCESS, backgroundPID.toString());
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  } finally {
    core.saveState(State.IsPre, "false");
  }
}
