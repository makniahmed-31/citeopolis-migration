export interface NewsImageData {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface NewsItemData {
  id: string;
  title?: string | null;
  url: string;
  publicationDate?: string | null;
  leadText?: string | null;
  images?: { ratio_3x2?: NewsImageData | null } | null;
  categories?: Array<{ title: string }> | null;
}

export interface BriefNewsItemData {
  id: string;
  title?: string | null;
  url: string;
  publicationDate?: string | null;
}

export interface NewsBlockData {
  anchor?: string | null;
  listUrl?: string | null;
  proposeUrl?: string | null;
  focusedNews?: NewsItemData | null;
  news?: NewsItemData[] | null;
  briefNews?: BriefNewsItemData[] | null;
}
