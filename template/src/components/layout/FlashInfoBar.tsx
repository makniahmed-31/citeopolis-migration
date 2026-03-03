import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { FlashInfoBanner } from "@packages/flash-info";
import type { FlashInfoItem } from "@packages/flash-info";
import { useFeatures } from "@/lib/theme";

const GET_FLASH_INFOS = gql`
  query GetFlashInfos {
    flashInfoSearch {
      items {
        id
        modifiedDate
        title
        description
        url
      }
    }
  }
`;

/**
 * Renders the FlashInfoBanner when the site has the "flash-info" capability.
 * Returns null immediately when the feature is not enabled — no query is made.
 */
export default function FlashInfoBar() {
  const features = useFeatures();
  if (!features.includes("flash-info")) return null;
  return <FlashInfoBarContent />;
}

function FlashInfoBarContent() {
  const { data } = useQuery<{ flashInfoSearch: { items: FlashInfoItem[] } }>(
    GET_FLASH_INFOS,
  );
  const items = data?.flashInfoSearch?.items;
  if (!items?.length) return null;
  return <FlashInfoBanner flashInfos={items} />;
}
