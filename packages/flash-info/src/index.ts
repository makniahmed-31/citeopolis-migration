export {
  default as FlashInfoBanner,
  FLASH_INFO_CLOSED_KEY,
} from "./FlashInfoBanner";
export { default as FlashInfoContent } from "./FlashInfoContent";
export type { FlashInfoItem } from "./types";

// import type { FlashInfoItem as TFlashInfoItem } from "./types";
// import React from "react";

// // Lazy wrappers
// export const FlashInfoBanner = React.lazy(() =>
//   import("./FlashInfoBanner").then((m) => ({ default: m.default })),
// );

// export const FlashInfoContent = React.lazy(() =>
//   import("./FlashInfoContent").then((m) => ({ default: m.default })),
// );

// export type FlashInfoItem = TFlashInfoItem;

// export const FLASH_INFO_CLOSED_KEY = "flash-info-closed";
