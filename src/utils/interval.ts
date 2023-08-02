import fs from "fs";
import * as core from "@actions/core";
import { systemStatsCollector } from "../sysinfo/statsCollector";

export async function statsCollectorAndWriter(
  fileLocation: string
): Promise<void> {
  try {
    let systemsStats = await systemStatsCollector();
    let currentTimestamp = new Date().toUTCString();

    // read file and append new data
    let fileContents = fs.readFileSync(fileLocation, "utf8");
    let data = JSON.parse(fileContents);
    data.timeSeries.push({ currentTimestamp, systemsStats });

    // write file
    fs.writeFileSync(fileLocation, JSON.stringify(data));
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
