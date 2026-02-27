import { Link as RouterLink, type LinkProps } from "@tanstack/react-router";

export default function Link(props: LinkProps) {
  return <RouterLink {...props} />;
}
