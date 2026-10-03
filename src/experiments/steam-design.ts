import type { CSSProperties } from "react";
import saved from "./steam-growth-banners.config.json";

export interface SteamDesign {
  bannerSurface: string;
  stickerSurface: string;
  outline: string;
  radius: string;
  headingSize: string;
  bannerGap: number;
  tilt: number;
  speed: number;
  fade: number;
  stickerFan: number;
  shadow: number;
  stickerTempo: number;
  [key: string]: string | number;
}
export const savedSteamDesign: SteamDesign = saved;

export function steamDesignStyle(design: SteamDesign): CSSProperties {
  return {
    "--queue-surface": `var(--${design.bannerSurface})`,
    "--sticker-surface": `var(--${design.stickerSurface})`,
    "--component-outline": `var(--${design.outline})`,
    "--component-radius": `var(--corner-${design.radius})`,
    "--queue-heading-size": `var(--type-${design.headingSize})`,
    "--banner-gap": `var(--space-${design.bannerGap})`,
    "--queue-angle": `${-design.tilt}deg`,
    "--queue-slope": `${Math.tan((design.tilt * Math.PI) / 180) * 100}cqw`,
    "--queue-duration-desktop": `${1000 / design.speed}s`,
    "--queue-duration-mobile": `${760 / design.speed}s`,
    "--queue-fade": `${design.fade}%`,
    "--sticker-shadow-strength": design.shadow,
    "--sticker-bounce-duration": `${2.8 / design.stickerTempo}s`,
    "--sticker-turn-duration": `${6 / design.stickerTempo}s`,
    "--sticker-pulse-duration": `${3.2 / design.stickerTempo}s`,
  } as CSSProperties;
}
