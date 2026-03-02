import { News as NewsItem } from "@/generated/graphql/graphql";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import News from "./News";

const meta: Meta<typeof News> = {
  title: "Blocks/News",
  component: News,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof News>;

const newsData: NewsItem = {
  title: "Titre de l’actualité lorem ipsum dolor sit amet, consetet elis passam filis",
  images: {
    ratio_3x2: {
      url: "/assets/placeholder-720x480.png",
      width: 720,
      height: 480,
      alt: "Image d'exemple",
    },
  },
  url: "#",
  categories: [
    // @ts-expect-error Incomplete category
    {
      title: "Catégorie",
      relativeUrl: "#",
    },
  ],
};

export const Default: Story = {
  args: {
    listUrl: "#",
    proposeUrl: "#",
    tags: [
      { text: "Thématique", url: "#" },
      { text: "Thématique", url: "#" },
      { text: "Thématique", url: "#" },
      { text: "Thématique", url: "#" },
      { text: "Thématique", url: "#" },
    ],
    focusedNews: newsData,
    news: [newsData, newsData, newsData, newsData],
    briefNews: [newsData, newsData, newsData, newsData],
  },
};

export const TwoNews: Story = {
  args: {
    news: [newsData, newsData],
  },
};

export const ThreeNews: Story = {
  args: {
    news: [newsData, newsData, newsData],
  },
};
