import fs from "fs";
import * as core from "@actions/core";
import * as artifact from "@actions/artifact";
import { Constants } from "./utils/constants";
import { getFileLocation } from "./utils/state-helper";
import { getTempDir } from "./utils/fileOps";

export async function upload(): Promise<void> {
  let fileLocation = getFileLocation();
  const artifactClient = artifact.create();
  const artifactName = Constants.ARTIFACTNAME;
  const artifactFiles = [fileLocation];
  const rootDirectory = getTempDir();
  const options = {
    continueOnError: false,
  };

  const jobName = process.env.GITHUB_JOB;
  const randomWord = Math.random().toString(36).substring(7); // add random letters in case job is part of a matrix
  const fullArtifactName = `${jobName}-${artifactName}-${randomWord}`;

  const uploadResponse = await artifactClient.uploadArtifact(
    fullArtifactName,
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
