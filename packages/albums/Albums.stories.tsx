import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Albums from "./Albums";

const meta: Meta<typeof Albums> = {
  title: "Blocks/Albums",
  component: Albums,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Albums>;

export const Default: Story = {
  args: {
    id: "albums-section",
    listUrl: "#",
    albums: [
      {
        title: "Titre de l’album lorem ipsum dolor sit amet, consetet elis passam filis",
        url: "#",
        images: {
          ratio_3x2: {
            url: "/assets/placeholder-720x480.png",
            width: 400,
            height: 300,
            alt: "Album cover",
          },
        },

        categories: [
          // @ts-expect-error Incomplete category
          {
            title: "Seasonal",
          },
        ],
        media: [
          {
            __typename: "AlbumPhoto",
          },
        ],
      },
      {
        title: "Titre de l’album lorem ipsum dolor sit amet, consetet elis passam filis",
        url: "#",
        images: {
          ratio_3x2: {
            url: "/assets/placeholder-720x480.png",
            width: 400,
            height: 300,
            alt: "Album cover",
          },
        },
        categories: [
          // @ts-expect-error Incomplete category
          {
            title: "City Life",
          },
        ],
        media: [
          {
            __typename: "AlbumVideo",
          },
        ],
      },
    ],
  },
};
