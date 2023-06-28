import core from "@actions/core";

export enum State {
  IsPost = "isPost",
  IsPre = "isPre",
}

export const IsPost = !!core.getState(State.IsPost);
export const IsPre = !core.getState(State.IsPre);
