import si from "systeminformation";

// hardware info
export async function getHardwareInfo(): Promise<string> {
  let data = await si.system();
  return JSON.stringify(data);
}

// os info
export async function getOSInfo(): Promise<string> {
  let data = await si.osInfo();
  return JSON.stringify(data);
}

//cpu info
export async function getCPUInfo(): Promise<string> {
  let data = await si.cpu();
  return JSON.stringify(data);
}

// disk utilization
export async function getDiskInfo(): Promise<string> {
  let data = await si.diskLayout();
  return JSON.stringify(data);
}

// memory info
export async function getMemoryInfo(): Promise<string> {
  let data = await si.mem();
  return JSON.stringify(data);
}

// current load
export async function getCurrentLoad(): Promise<string> {
  let data = await si.currentLoad();
  let importantLoadInfo = {
    currentLoad: data.currentLoad,
    currentLoadUser: data.currentLoadUser,
    currentLoadSystem: data.currentLoadSystem,
  };
  return JSON.stringify(importantLoadInfo);
}
