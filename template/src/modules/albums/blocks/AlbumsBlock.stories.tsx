import type { Meta, StoryObj } from "@storybook/react-vite";
import AlbumsBlock from "./AlbumsBlock";

const mockAlbums = [
  {
    id: "1",
    title: "Fête de la musique 2025",
    url: "/albums/fete-musique-2025",
    coverImage: { url: "https://picsum.photos/seed/album1/400/300", width: 400, height: 300, alt: "Fête de la musique" },
    count: 42,
  },
  {
    id: "2",
    title: "Inauguration bibliothèque",
    url: "/albums/inauguration-bibliotheque",
    coverImage: { url: "https://picsum.photos/seed/album2/400/300", width: 400, height: 300, alt: "Bibliothèque" },
    count: 28,
  },
  {
    id: "3",
    title: "Marché de Noël",
    url: "/albums/marche-noel",
    coverImage: { url: "https://picsum.photos/seed/album3/400/300", width: 400, height: 300, alt: "Marché de Noël" },
    count: 67,
  },
];

const meta: Meta<typeof AlbumsBlock> = {
  title: "Modules/Albums/AlbumsBlock",
  component: AlbumsBlock,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AlbumsBlock>;

export const Default: Story = {
  args: {
    albums: mockAlbums,
    listUrl: "/albums",
  },
};

export const WithoutLink: Story = {
  args: { albums: mockAlbums },
};

export const Empty: Story = {
  args: { albums: [] },
};
