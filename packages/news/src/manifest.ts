const manifest = {
  slug: "news",
  blocks: {
    NewsBlock: () =>
      import("./blocks/block") as Promise<{
        default: React.ComponentType<Record<string, unknown>>;
      }>,
  },
};

export default manifest;
