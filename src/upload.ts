import fs from "fs";
import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import { Constants } from "./utils/constants";
import { getFileLocation } from "./utils/state-helper";
import { getTempDir } from "./utils/fileOps";

export async function upload(): Promise<void> {
  let fileLocation = getFileLocation();
  // console.log(`File location: ${fileLocation}`);

  // // check contents of file
  // let fileContents = fs.readFileSync(fileLocation, "utf8");

  // // upload file as an artifact

  const artifactClient = artifact.create();
  const artifactName = core.getInput(Constants.ARTIFACTNAME);
  const artifactFiles = [fileLocation];
  const rootDirectory = getTempDir();
  const options = {
    continueOnError: false,
  };

  const uploadResponse = await artifactClient.uploadArtifact(
    artifactName,
    artifactFiles,
    rootDirectory,
    options
  );

  console.log(
    `Artifact ${uploadResponse.artifactName} was uploaded successfully`
  );
  // get PID of background process and kill it
  let backgroundPID = core.getState(Constants.BACKGROUNDPROCESS);
  process.kill(Number(backgroundPID));
}
