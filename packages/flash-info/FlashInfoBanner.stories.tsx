import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FlashInfoBanner, { FLASH_INFO_CLOSED_KEY } from "./FlashInfoBanner";

const meta: Meta<typeof FlashInfoBanner> = {
  title: "Components/FlashInfoBanner",
  component: FlashInfoBanner,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "neutral"],
      description: "Color variant of the banner",
    },
  },
  parameters: {
    localStorage: {
      [FLASH_INFO_CLOSED_KEY]: "[]",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FlashInfoBanner>;

export const Single: Story = {
  args: {
    flashInfos: [
      {
        id: 1,
        title: "Travaux rue de la République du 25 au 28 juin, circulation perturbée.",
        description:
          "Des travaux de réfection de la chaussée auront lieu cette semaine. Prévoir des ralentissements et privilégier les itinéraires alternatifs.",
        modifiedDate: "2023-10-01",
      },
    ],
  },
};

export const Clickable: Story = {
  args: {
    flashInfos: [
      {
        id: 1,
        title: "Route départementale D23 coupée à la circulation pour cause d’éboulement.",
        description:
          "Suite aux intempéries, un éboulement a eu lieu sur la D23 entre La Rivière et Montclaire. La route est fermée jusqu’à nouvel ordre. Déviations mises en place.",
        modifiedDate: "2023-10-01",
        url: "#",
      },
    ],
  },
};

export const Carousel: Story = {
  args: {
    flashInfos: [
      {
        id: 20,
        title: "Météo France place la commune en vigilance orange – orages violents attendus.",
        description:
          "Des orages localement forts sont prévus aujourd'hui dès 16h. Évitez les déplacements non essentiels et mettez à l'abri vos biens sensibles.",
        modifiedDate: "2023-10-01",
        url: "#",
      },
      {
        id: 21,
        title: "Interruption de l'eau potable le jeudi 27 juin de 9h à 12h dans le quartier Saint-Michel.",
        description:
          "Une maintenance du réseau d'eau est prévue. Merci de prendre vos dispositions. Le service sera rétabli en début d'après-midi.",
        modifiedDate: "2023-10-01",
      },
      {
        id: 22,
        title: "Réunion du Conseil municipal ouverte au public le 2 juillet à 18h.",
        description:
          "Une séance exceptionnelle aura lieu à la salle des fêtes. L'ordre du jour porte sur les aménagements du centre-ville. Venez nombreux !",
        modifiedDate: "2023-10-01",
      },
    ],
  },
};

export const ColorPrimary: Story = {
  args: {
    color: "primary",
    flashInfos: [
      {
        id: 1,
        title: "Travaux rue de la République du 25 au 28 juin, circulation perturbée.",
        description:
          "Des travaux de réfection de la chaussée auront lieu cette semaine. Prévoir des ralentissements et privilégier les itinéraires alternatifs.",
        modifiedDate: "2023-10-01",
      },
    ],
  },
};

export const ColorSecondary: Story = {
  args: {
    color: "secondary",
    flashInfos: [
      {
        id: 2,
        title: "Travaux rue de la République du 25 au 28 juin, circulation perturbée.",
        description:
          "Des travaux de réfection de la chaussée auront lieu cette semaine. Prévoir des ralentissements et privilégier les itinéraires alternatifs.",
        modifiedDate: "2023-10-01",
      },
    ],
  },
};

export const ColorTertiary: Story = {
  args: {
    color: "tertiary",
    flashInfos: [
      {
        id: 3,
        title: "Travaux rue de la République du 25 au 28 juin, circulation perturbée.",
        description:
          "Des travaux de réfection de la chaussée auront lieu cette semaine. Prévoir des ralentissements et privilégier les itinéraires alternatifs.",
        modifiedDate: "2023-10-01",
      },
    ],
  },
};

export const ColorNeutral: Story = {
  args: {
    color: "neutral",
    flashInfos: [
      {
        id: 4,
        title: "Travaux rue de la République du 25 au 28 juin, circulation perturbée.",
        description:
          "Des travaux de réfection de la chaussée auront lieu cette semaine. Prévoir des ralentissements et privilégier les itinéraires alternatifs.",
        modifiedDate: "2023-10-01",
      },
    ],
  },
};
