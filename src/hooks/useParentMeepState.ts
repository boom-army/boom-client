import { atom } from "recoil";
import { Tweet } from "../generated/graphql";

export const parentMeepState = atom<Tweet | null>({
  key: "parentMeepState",
  default: null,
});
