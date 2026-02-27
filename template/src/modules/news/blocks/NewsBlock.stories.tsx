import type { Meta, StoryObj } from "@storybook/react-vite";
import NewsBlock from "./NewsBlock";

const mockNews = [
  {
    id: "1",
    title: "Inauguration du nouveau centre sportif",
    url: "/actualites/centre-sportif",
    publicationDate: "2026-02-15",
    leadText: "La ville inaugure son nouveau complexe sportif de 3 000 m².",
    images: {
      ratio_3x2: { url: "https://picsum.photos/seed/news1/800/533", width: 800, height: 533, alt: "Centre sportif" },
    },
    categories: [{ title: "Sport" }],
  },
  {
    id: "2",
    title: "Réunion publique sur le PLU",
    url: "/actualites/plu",
    publicationDate: "2026-02-10",
    leadText: "Venez participer à la consultation publique sur le Plan Local d'Urbanisme.",
    images: {
      ratio_3x2: { url: "https://picsum.photos/seed/news2/800/533", width: 800, height: 533, alt: "Réunion" },
    },
    categories: [{ title: "Urbanisme" }],
  },
  {
    id: "3",
    title: "Budget participatif 2026 : votez pour vos projets",
    url: "/actualites/budget-participatif",
    publicationDate: "2026-02-05",
    images: null,
    categories: [{ title: "Démocratie" }],
  },
];

const meta: Meta<typeof NewsBlock> = {
  title: "Modules/News/NewsBlock",
  component: NewsBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NewsBlock>;

export const Default: Story = {
  args: {
    news: mockNews,
    listUrl: "/actualites",
  },
};

export const WithFocusedNews: Story = {
  args: {
    focusedNews: mockNews[0],
    news: mockNews.slice(1),
    listUrl: "/actualites",
    proposeUrl: "/proposer-une-actualite",
  },
};

export const BriefOnly: Story = {
  args: {
    briefNews: mockNews.map((n) => ({ id: n.id, title: n.title, url: n.url, publicationDate: n.publicationDate })),
    listUrl: "/actualites",
  },
};

export const Empty: Story = {
  args: { news: [] },
};
