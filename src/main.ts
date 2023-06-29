import * as core from "@actions/core";
import { IsPost, IsPre, State } from "./utils/state-helper";

console.log(core.getState(typeof State.IsPost));
console.log(IsPost());

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

if (IsPre()) {
  setup();
  core.saveState("isPre", "false");
} else if (!IsPre() && !IsPost()) {
  run();
  core.saveState("isPost", "true");
} else {
  upload();
}
