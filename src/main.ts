import * as core from "@actions/core";
import { IsPost, IsPre, State } from "./utils/state-helper";
import { setup } from "./setup";
import { upload } from "./upload";

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

if (IsPre()) {
  setup();
} else if (!IsPre() && !IsPost()) {
  run();
} else {
  upload();
}
