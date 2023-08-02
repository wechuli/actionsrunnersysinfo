import { Systeminformation } from "systeminformation";
import {
  getCurrentLoad,
  getMemoryInfo,
  IImportantLoadInfo,
} from "../sysinfo/sysinfo";

interface SystemStats {
  currentLoad: IImportantLoadInfo;
  memoryInfo: Systeminformation.MemData;
}

export async function systemStatsCollector(): Promise<SystemStats> {
  let currentCollection = {
    currentLoad: await getCurrentLoad(),
    memoryInfo: await getMemoryInfo(),
  };

  return currentCollection;
}
