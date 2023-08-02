import si, { Systeminformation } from "systeminformation";

// hardware info
export async function getHardwareInfo(): Promise<Systeminformation.SystemData> {
  let data = await si.system();
  return data;
}

// network info
export async function getNetworkInfo(): Promise<
  | Systeminformation.NetworkInterfacesData
  | Systeminformation.NetworkInterfacesData[]
> {
  let data = await si.networkInterfaces();
  return data;
}

// os info
export async function getOSInfo(): Promise<Systeminformation.OsData> {
  let data = await si.osInfo();
  return data;
}

//cpu info
export async function getCPUInfo(): Promise<Systeminformation.CpuData> {
  let data = await si.cpu();
  return data;
}

// disk utilization
export async function getDiskInfo(): Promise<
  Systeminformation.DiskLayoutData[]
> {
  let data = await si.diskLayout();
  return data;
}

// memory info
export async function getMemoryInfo(): Promise<Systeminformation.MemData> {
  let data = await si.mem();
  return data;
}

export interface IImportantLoadInfo {
  currentLoad: number;
  currentLoadUser: number;
  currentLoadSystem: number;
}

// current load
export async function getCurrentLoad(): Promise<IImportantLoadInfo> {
  let data = await si.currentLoad();
  let importantLoadInfo = {
    currentLoad: data.currentLoad,
    currentLoadUser: data.currentLoadUser,
    currentLoadSystem: data.currentLoadSystem,
  };
  return importantLoadInfo;
}

// network stats
export async function getNetworkStats(): Promise<
  Systeminformation.NetworkStatsData[]
> {
  let data = await si.networkStats();
  return data;
}
