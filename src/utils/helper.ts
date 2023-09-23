import { SCREEN_WIDTH } from "./variables";

const SCREEN_SIZE = 360;

export const ptp = (pixels: number): number => {
  return Math.floor((pixels * SCREEN_WIDTH) / SCREEN_SIZE);
};
