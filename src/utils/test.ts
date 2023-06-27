import si from "systeminformation";

si.cpu().then((data) => console.log(data));

// memory utilization
si.mem().then((data) => console.log(data));

// disk utilization

si.diskLayout().then((data) => console.log(data));

// check cpu usage

si.currentLoad().then((data) => console.log(data));
