export interface AlbumCoverImage {
  url: string;
  alt: string;
}

export interface AlbumItemData {
  id?: string | null;
  title: string;
  url: string;
  coverImage?: AlbumCoverImage | null;
  count?: number | null;
}

export interface AlbumsBlockData {
  anchor?: string | null;
  listUrl?: string | null;
  albums?: AlbumItemData[] | null;
}
