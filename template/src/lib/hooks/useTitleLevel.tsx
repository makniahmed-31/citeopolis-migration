import { createContext, useContext, type ReactNode } from "react";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const TitleLevelContext = createContext<TitleLevel>(1);

/**
 * Returns the heading tag for the current nesting level.
 * Mirrors the original lib/hooks/useTitleLevel.tsx pattern.
 */
export function useTitleLevel(): HeadingTag {
  const level = useContext(TitleLevelContext);
  return `h${Math.min(level, 6) as TitleLevel}` as HeadingTag;
}

interface SubtitleLevelProviderProps {
  level: TitleLevel;
  children: ReactNode;
}

export function SubtitleLevelProvider({ level, children }: SubtitleLevelProviderProps) {
  return <TitleLevelContext value={level}>{children}</TitleLevelContext>;
}
