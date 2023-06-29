import * as core from "@actions/core";

export enum State {
  IsPost = "isPost",
  IsPre = "isPre",
}

export function IsPre(): boolean {
  let isPre = core.getState(State.IsPre);
  if (isPre.length === 0) {
    return true;
  }
  return false;
}

export function IsPost(): boolean {
  let isPost = core.getState(State.IsPost);
  if (isPost.length === 0) {
    return false;
  }
  return true;
}
