import * as core from "@actions/core";
import { IsPost, IsPre, State } from "./utils/state-helper";

async function setup(): Promise<void> {
  try {
    console.log("I am the setup function");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  } finally {
    core.saveState(State.IsPre, "false");
  }
}
async function run(): Promise<void> {
  try {
    console.log("I am the main function");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  } finally {
    core.saveState(State.IsPost, "true");
  }
}
async function upload(): Promise<void> {
  console.log("I am the upload function");
}

if (IsPre()) {
  setup();
} else if (!IsPre() && !IsPost()) {
  run();
} else {
  upload();
}
