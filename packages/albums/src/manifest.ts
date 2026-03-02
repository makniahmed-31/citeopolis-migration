const manifest = {
  slug: "albums",
  blocks: {
    AlbumsBlock: () =>
      import("./blocks/block") as Promise<{
        default: React.ComponentType<Record<string, unknown>>;
      }>,
  },
};

export default manifest;
