import si from "systeminformation";

// si.cpu().then((data) => console.log(`Cpu data:${JSON.stringify(data)}`));

// memory utilization
si.mem().then((data) => console.log(`Memory data:${JSON.stringify(data)}`));

// disk utilization

// si.diskLayout().then((data) =>
//   console.log(`Disk data:${JSON.stringify(data)}`)
// );

// // check cpu usage

// si.currentLoad().then((data) =>
//   console.log(`Cpu usage:${JSON.stringify(data)}`)
// );

//system information
// si.system().then((data) => console.log(`System data:${JSON.stringify(data)}`));

// os information

si.osInfo().then((data) => console.log(`OS data:${JSON.stringify(data)}`));
