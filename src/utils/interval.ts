import fs from "fs";
import * as core from "@actions/core";
import { getCurrentLoad, getMemoryInfo } from "../sysinfo/sysinfo";

interface fileFormat {
  osInfo: string;
  hardWareInfo: string;
}
async function interValCollector() {}

async function statsCollector(fileLocation: string): Promise<void> {
  try {
    let currentTimeInUTC = new Date().toUTCString();
    let currentCollection = {
      currentLoad: await getCurrentLoad(),
      memoryInfo: await getMemoryInfo(),
    };

    // read file and append new data
    let fileContents = fs.readFileSync(fileLocation, "utf8");
    let data = JSON.parse(fileContents);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
