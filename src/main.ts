import * as core from "@actions/core";
// import { IsPost, IsPre, State } from "./utils/state-helper";

// check if the action is running in pre or post mode

console.log(typeof core.getState("isPre"));

async function setup(): Promise<void> {
  console.log("I am the setup function");
}
async function upload(): Promise<void> {
  console.log("I am the upload function");
}
async function run(): Promise<void> {
  try {
    console.log("I am the main function");
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

// if isnot pre or post

// if (!IsPost && !IsPre) {
//   run();
//   core.saveState(State.IsPost, true);
// } else if (!IsPre) {
//   setup();
//   core.saveState(State.IsPost, false);
// } else if (IsPost) {
//   upload();
// }
