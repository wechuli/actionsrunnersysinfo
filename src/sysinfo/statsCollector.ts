import { getCurrentLoad, getMemoryInfo } from "../sysinfo/sysinfo";

export async function statsCollector(): Promise<object> {
  let currentTimeInUTC = new Date().toUTCString();
  let currentCollection = {
    currentLoad: await getCurrentLoad(),
    memoryInfo: await getMemoryInfo(),
  };

  return {
    [currentTimeInUTC]: currentCollection,
  };
}

statsCollector()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
