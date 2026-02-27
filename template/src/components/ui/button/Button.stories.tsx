import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["contained", "outlined", "text"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: { variant: "contained", size: "md", children: "Bouton principal" },
};

export const Outlined: Story = {
  args: { variant: "outlined", size: "md", children: "Bouton secondaire" },
};

export const WithIcon: Story = {
  args: { variant: "contained", size: "lg", startIcon: "fa fa-plus", children: "Voir tout" },
};

export const Small: Story = {
  args: { variant: "outlined", size: "sm", children: "Petit bouton" },
};
