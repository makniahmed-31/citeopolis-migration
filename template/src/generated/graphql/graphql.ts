/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An unknown CSSValue compatible with CSSProperties. */
  CSSValue: { input: any; output: any; }
  /** An **ISO 8601** formatted date. */
  Date: { input: any; output: any; }
  /** A value formatted in the **ISO 8601** format. */
  DateTime: { input: any; output: any; }
  /** A type dedicated to render unsafe HTML content. */
  HTML: { input: string; output: string; }
  /** A JSON stringified object. */
  JSON: { input: any; output: any; }
  /**
   * Returns the whole `BlockInterface` tree from the content of a post.
   * This scalar returns: `[BlockInterface]`.
   * Some values are omitted from the returned data, for example `Breadcrumbs`, see the documentation.
   */
  StructuredContent: { input: (BlockInterface & { __typename: string })[]; output: (BlockInterface & { __typename: string })[]; }
  /** An **ISO 8601** formatted time. */
  Time: { input: any; output: any; }
  /** Returns an URL relative to the current context. */
  URL: { input: string; output: string; }
  /** A scalar that represents a file to be uploaded in the same HTTP request as specified by [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec). */
  Upload: { input: any; output: any; }
};

/** The placement of the floating action button. */
export enum AccessibilityButtonPlacement {
  /** Bottom left corner of the page. */
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  /** Bottom right corner of the page. */
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  /** Right side of the page (centered vertically). */
  RIGHT = 'RIGHT'
}

/** Accessibility parameters configuration. */
export type AccessibilityConfig = {
  __typename?: 'AccessibilityConfig';
  /** Whether accessibility features are enabled. */
  enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The placement of the accessibility button on the page. */
  placement?: Maybe<AccessibilityButtonPlacement>;
};

/** Content type that orchestrates accordion items. */
export type AccordionBlock = BlockInterface & {
  __typename?: 'AccordionBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** If enabled, multiple collapsibles can be opened at the same time. */
  multiple: Scalars['Boolean']['output'];
};

/** Content disclosure. */
export type AccordionItemBlock = BlockInterface & {
  __typename?: 'AccordionItemBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Whether the collapsible is open by default. */
  open: Scalars['Boolean']['output'];
  /** The title of the collapsible. */
  title?: Maybe<Scalars['String']['output']>;
  /** The level of the heading. From 1 to 6. */
  titleLevel: Scalars['Int']['output'];
};

/** The address type. */
export type Address = {
  __typename?: 'Address';
  /** City name. */
  city?: Maybe<Scalars['String']['output']>;
  /** Country code. */
  country?: Maybe<Scalars['String']['output']>;
  /** Street lines of the address. */
  street?: Maybe<Array<Scalars['String']['output']>>;
  /** Zip code. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** An address field that carries multiple inputs. */
export type AddressField = FieldInterface & {
  __typename?: 'AddressField';
  /** The address city input. */
  city?: Maybe<TextField>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The country select. */
  country?: Maybe<SelectField>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The required indicator of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The address country state. */
  state?: Maybe<TextField>;
  /** The first line of the address street. */
  street1?: Maybe<TextField>;
  /** The second line of the address street. */
  street2?: Maybe<TextField>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
  /** The address postal code. */
  zip?: Maybe<TextField>;
};

/** Defines the field to use to filter a list of addresses. */
export type AddressSearchFilterInput = {
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Response of an address search query. Contains paginated items. */
export type AddressSearchResponse = {
  __typename?: 'AddressSearchResponse';
  /** Search results. */
  items: Array<Address>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of news. */
  totalCount: Scalars['Int']['output'];
};

/** Detail of a album. */
export type Album = PostInterface & RouteInterface & {
  __typename?: 'Album';
  /** Navigation path to the album. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the album. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the album. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** List of photos and videos in the album. */
  media: Array<AlbumMedia>;
  /** Number of medias. */
  mediaCount: Scalars['Int']['output'];
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between album of the list view. */
  pager?: Maybe<ContentPager>;
  /** Number of photos. */
  photoCount: Scalars['Int']['output'];
  /** The publication date of the album. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the album. */
  status: PostStatus;
  /** The content of the album, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the album. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the album. */
  url?: Maybe<Scalars['URL']['output']>;
  /** Number of videos. */
  videoCount: Scalars['Int']['output'];
};


/** Detail of a album. */
export type AlbumCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Defines the field to use to filter a list of album. */
export type AlbumFilterInput = {
  /** Get albums by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The id of the album. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get albums by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Album list view configuration. */
export type AlbumList = RouteInterface & {
  __typename?: 'AlbumList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the album list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** A media element in the album. */
export type AlbumMedia = AlbumPhoto | AlbumVideo;

/** A photo included in an album. */
export type AlbumPhoto = {
  __typename?: 'AlbumPhoto';
  /** Alternative text for accessibility and SEO. */
  alt?: Maybe<Scalars['String']['output']>;
  /** A short caption describing the image. */
  caption?: Maybe<Scalars['String']['output']>;
  /** The copyright or attribution text for the image. */
  copyright?: Maybe<Scalars['String']['output']>;
  /** The height of the image in pixels. */
  height?: Maybe<Scalars['Int']['output']>;
  /** The image source URL. */
  src?: Maybe<Scalars['String']['output']>;
  /** The width of the image in pixels. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Response of a album search query. Contains paginated items. */
export type AlbumSearchResponse = {
  __typename?: 'AlbumSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Album>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of album. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of album. */
export type AlbumSortInput = {
  /** Sort albums by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort albums by title. */
  title?: InputMaybe<SortDirection>;
};

/** An externally hosted video associated with an album. */
export type AlbumVideo = {
  __typename?: 'AlbumVideo';
  /** A short caption describing the video. */
  caption?: Maybe<Scalars['String']['output']>;
  /** The copyright or attribution text for the video. */
  copyright?: Maybe<Scalars['String']['output']>;
  /** The name of the video service provider. */
  provider?: Maybe<Scalars['String']['output']>;
  /** The thumbnail issued by the service provider. */
  thumbnail?: Maybe<Image>;
  /** The URL of the external video. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Content type that displays albums. */
export type AlbumsBlock = BlockInterface & {
  __typename?: 'AlbumsBlock';
  /** List of albums to display. */
  albums: Array<Album>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The URL to the list view. */
  listUrl?: Maybe<Scalars['String']['output']>;
  /**
   * The title of the block.
   * @deprecated This block title should be defined in FE
   */
  title?: Maybe<Scalars['String']['output']>;
  /**
   * The level of the heading. From 1 to 6.
   * @deprecated This block title level should be always 2
   */
  titleLevel?: Maybe<Scalars['Int']['output']>;
};

/** An intrusive modal that displays important information. */
export type Alert = PostInterface & {
  __typename?: 'Alert';
  /** The action of the alert. Used in the popup variant. */
  action?: Maybe<Link>;
  /** Navigation path to the page. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Short description of the alert. */
  description?: Maybe<Scalars['String']['output']>;
  /** The end date. */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** ID of the page. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Short description of the page. Multiline. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between posts of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the post. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part of the page. */
  slug: Scalars['String']['output'];
  /** The start date. */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  /** The publication status of the page. */
  status: PostStatus;
  /** The content of the page, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the alert. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The URL of the page. */
  url?: Maybe<Scalars['URL']['output']>;
  /** Alert behavior variant. */
  variant: AlertVariant;
};


/** An intrusive modal that displays important information. */
export type AlertCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Response of an alert search query. Contains paginated items. */
export type AlertSearchResponse = {
  __typename?: 'AlertSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Alert>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of alerts. */
  totalCount: Scalars['Int']['output'];
};

/** The alert display variants. */
export enum AlertVariant {
  /** Shown as a dialog in the center of the page. */
  POPUP = 'POPUP',
  /** Shown as a sticky message at the bottom of the page. */
  STICKY = 'STICKY'
}

/** The ALTCHA field. See the [documentation](https://altcha.org/fr/docs/website-integration/). */
export type AltchaField = FieldInterface & {
  __typename?: 'AltchaField';
  /** Automatically verify without user interaction (possible values: off, onfocus, onload, onsubmit). */
  auto: Scalars['String']['output'];
  /** JSON-encoded challenge data. Avoids an unnecessary request. */
  challengejson?: Maybe<Scalars['String']['output']>;
  /** URL of the server to fetch the challenge from. */
  challengeurl: Scalars['String']['output'];
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Print log messages in the console. */
  debug: Scalars['Boolean']['output'];
  /** Artificial delay in milliseconds before verification (defaults to 0). */
  delay?: Maybe<Scalars['Int']['output']>;
  /** The description of the fieldset legend. */
  description?: Maybe<Scalars['String']['output']>;
  /** Challenge expiration duration in milliseconds. */
  expire?: Maybe<Scalars['Int']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** Causes the verification to always fail with a **mock** error. */
  mockerror: Scalars['Boolean']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/**
 * An article block with a text and a source.
 * *Used in newsletter.*
 */
export type ArticleBlock = BlockInterface & {
  __typename?: 'ArticleBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Description of the author. */
  authorDescription?: Maybe<Scalars['String']['output']>;
  /** Image of the author. */
  authorImage?: Maybe<Image>;
  /** Title of the author. */
  authorTitle?: Maybe<Scalars['String']['output']>;
  /** Content of the article. */
  html?: Maybe<Scalars['HTML']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Lead text of the article. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Title of the block. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Content type that displays an audio player. */
export type AudioBlock = BlockInterface & {
  __typename?: 'AudioBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Wether the audio should automatically play. */
  autoplay: Scalars['Boolean']['output'];
  /** The caption of the audio file. */
  caption?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Whether the audio should loop. */
  loop: Scalars['Boolean']['output'];
  /** The preload attribute value of the audio player. */
  preload?: Maybe<Scalars['String']['output']>;
  /** The URL of the audio file. */
  src: Scalars['String']['output'];
  /** Audio transcription. */
  transcription?: Maybe<Scalars['HTML']['output']>;
};

/** Content type for a banner that has an image and a text section. */
export type BannerBlock = BlockInterface & {
  __typename?: 'BannerBlock';
  /** Link displayed in the content part. */
  action?: Maybe<Link>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Color of the background of the text part. */
  backgroundColor?: Maybe<Scalars['CSSValue']['output']>;
  /** Description of the content part. */
  description?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** URL of the image in the image part. */
  image?: Maybe<Image>;
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The display mode of the block. */
  layout?: Maybe<BlockLayout>;
  /** Color of the text of the text part. */
  textColor?: Maybe<Scalars['CSSValue']['output']>;
  /** Title of the content part. */
  title?: Maybe<Scalars['String']['output']>;
  /** The display variants of the block. */
  variant?: Maybe<BannerBlockVariant>;
};

/** Display variants of a `BannerBlock`. */
export enum BannerBlockVariant {
  /** The image is on the left side of the text. */
  IMAGE_LEFT = 'IMAGE_LEFT',
  /** Render only the image, without the text. */
  IMAGE_ONLY = 'IMAGE_ONLY',
  /** The image is on the right side of the text. */
  IMAGE_RIGHT = 'IMAGE_RIGHT',
  /** Render only the text, without the image. */
  TEXT_ONLY = 'TEXT_ONLY'
}

/**
 * The administration bar configuration.
 * This bar should be shown if an administrator is logged in the BE.
 */
export type BarConfig = {
  __typename?: 'BarConfig';
  /** The currently connected user. */
  currentUser?: Maybe<User>;
  /** List of menu entries, horizontally stacked. */
  entries: Array<BarMenuEntry>;
  /** The icon displayed on the left hand side of the bar. */
  icon?: Maybe<Icon>;
  /** The user's logout url. */
  logoutUrl?: Maybe<Scalars['String']['output']>;
};

/** The administration bar is composed of menu entries. */
export type BarMenuEntry = {
  __typename?: 'BarMenuEntry';
  /** A menu item can contain other items. */
  children: Array<BarMenuEntry>;
  /** The icon of the menu item. */
  icon?: Maybe<Icon>;
  /** The level of the menu item in the tree. The greater the deeper. */
  level: Scalars['Int']['output'];
  /** An accessible title for the menu item. Can be displayed using the title attribute. */
  screenReaderTitle?: Maybe<Scalars['String']['output']>;
  /** Title of the item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. Can be absolute or relative. */
  url: Scalars['URL']['output'];
};

/** A block is an object, rendered from the CMS page content. */
export type BlockInterface = {
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** The display modes for a block, in the page content column. */
export enum BlockLayout {
  /** The block should render contained in the page content. */
  CONTAINED = 'CONTAINED',
  /** The block should extend to the full width of the page. */
  FULLWIDTH = 'FULLWIDTH'
}

/** The breadcrumbs contains a list of navigation items. */
export type Breadcrumbs = {
  __typename?: 'Breadcrumbs';
  /** The list of breadcrumbs items. */
  items: Array<Crumb>;
};

/** A button with a specific style variant. */
export type Button = LinkInterface & {
  __typename?: 'Button';
  /** The button's optional icon. */
  icon?: Maybe<Icon>;
  /** The button's target. */
  target?: Maybe<Scalars['String']['output']>;
  /** The text of the button. */
  text: Scalars['String']['output'];
  /** The url of the button. */
  url: Scalars['URL']['output'];
  /** The button's style variant. */
  variant: ButtonVariant;
};

/** Content type contained into a `ButtonsBlock`. */
export type ButtonBlock = BlockInterface & {
  __typename?: 'ButtonBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The rich text content of the button. */
  html?: Maybe<Scalars['HTML']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The links target. */
  target?: Maybe<Scalars['String']['output']>;
  /** Text alignment. */
  textAlign?: Maybe<Scalars['CSSValue']['output']>;
  /** The url of the link. */
  url: Scalars['String']['output'];
  /** Button block variant. */
  variant?: Maybe<ButtonBlockVariant>;
  /** The width of the button in %. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Variants of a button block. */
export enum ButtonBlockVariant {
  /** Primary variant. */
  PRIMARY = 'PRIMARY',
  /** Secondary variant. */
  SECONDARY = 'SECONDARY',
  /** Tertiary variant. */
  TERTIARY = 'TERTIARY'
}

/** Button style variants for the design system. */
export enum ButtonVariant {
  /** Primary button style variant. */
  PRIMARY = 'PRIMARY',
  /** Secondary button style variant. */
  SECONDARY = 'SECONDARY',
  /** Tertiary button style variant. */
  TERTIARY = 'TERTIARY'
}

/** Content type that contains multiple `ButtonBlock`. */
export type ButtonsBlock = BlockInterface & {
  __typename?: 'ButtonsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The content alignment of the buttons. Similar to the `justify-content` CSS property. */
  justifyContent?: Maybe<Scalars['CSSValue']['output']>;
  /** Button stacking direction. */
  orientation?: Maybe<Orientation>;
};

/** Union of all captcha field types. */
export type CaptchaField = AltchaField | HCaptchaField | ReCaptchaField;

/** A category from a category tree. Can be rendered in FE. */
export type Category = {
  __typename?: 'Category';
  /** List of ordered children categories. */
  children: Array<Category>;
  /** The short description. */
  description?: Maybe<Scalars['String']['output']>;
  /** Level of the category, 0 being the root level. */
  level: Scalars['Int']['output'];
  /** The category metadata. */
  metadata?: Maybe<Metadata>;
  /** The parent category. */
  parent?: Maybe<Category>;
  /** The relative URL of the category. */
  relativeUrl: Scalars['String']['output'];
  /** Title of the category. */
  title: Scalars['String']['output'];
};

/**
 * A group of checkboxes.
 * If `min` and `max` have the same value, it means an exact number of elements must be checked.
 */
export type CheckboxField = FieldInterface & {
  __typename?: 'CheckboxField';
  /** The available choices. */
  choices: Array<Choice>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** A choice is an option for a list of checkboxes or a list of radio buttons. */
export type Choice = {
  __typename?: 'Choice';
  /** If TRUE, the choice is checked by default. */
  defaultSelected?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the choice. */
  label?: Maybe<Scalars['String']['output']>;
  /** The identifier of the choice. */
  name?: Maybe<Scalars['String']['output']>;
  /** Value of the choice. */
  value?: Maybe<Scalars['String']['output']>;
};

/** The contact information of the client. */
export type ClientInfo = {
  __typename?: 'ClientInfo';
  /** Client headquarters address. */
  address?: Maybe<Address>;
  /** The hours when the client can be contacted. */
  openingHours?: Maybe<Array<Scalars['String']['output']>>;
  /** The phone number. */
  tel?: Maybe<Scalars['String']['output']>;
};

/** Content type for a column. */
export type ColumnBlock = BlockInterface & {
  __typename?: 'ColumnBlock';
  /** The vertical alignment of the column. Similar to the `align-self` CSS property. */
  align?: Maybe<Scalars['CSSValue']['output']>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The width of the column. In `%` or `px`. If `null`, uses normal CSS flow. */
  width?: Maybe<Scalars['String']['output']>;
};

/** Content type that groups multiple `ColumnBlock`. */
export type ColumnsBlock = BlockInterface & {
  __typename?: 'ColumnsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The number of columns. */
  columnCount: Scalars['Int']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Whether columns should be stacked on mobile devices. */
  isStackedOnMobile: Scalars['Boolean']['output'];
};

/** Detail of a comarquage. */
export type Comarquage = PostInterface & RouteInterface & {
  __typename?: 'Comarquage';
  /** Navigation path to the comarquage. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the comarquage. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Short description of the comarquage. Multiline. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between posts of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the post. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part of the comarquage. */
  slug: Scalars['String']['output'];
  /** The publication status of the comarquage. */
  status: PostStatus;
  /** The content of the comarquage, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the comarquage. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The URL of the comarquage. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** Detail of a comarquage. */
export type ComarquageCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Content type that displays a list of Comarquage related links. */
export type ComarquageBlock = BlockInterface & {
  __typename?: 'ComarquageBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of pages to display. */
  items: Array<Link>;
};

/** A comment is a user feedback on a post. */
export type Comment = {
  __typename?: 'Comment';
  /** The author of the comment. */
  author?: Maybe<User>;
  /** The text of the comment. */
  content?: Maybe<Scalars['HTML']['output']>;
  /** The id of the comment. */
  id: Scalars['ID']['output'];
  /** The last modification date of the comment. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** The parent of the comment, when nested. */
  parent?: Maybe<Comment>;
  /** The post to which the comment is linked. */
  post?: Maybe<PostInterface>;
  /** The publication date of the comment. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The replies to this comment. */
  replies?: Maybe<CommentSearchResponse>;
  /** Total number of nested replies. Use `replies.totalCount` to get the number of direct replies. */
  repliesCount: Scalars['Int']['output'];
  /** The status of the comment. */
  status?: Maybe<CommentStatus>;
};


/** A comment is a user feedback on a post. */
export type CommentRepliesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Global comment configuration. */
export type CommentConfig = {
  __typename?: 'CommentConfig';
  /** Comment form fields and configuration. */
  commentForm?: Maybe<CommentForm>;
  /** The page size of comments. */
  defaultPageSize?: Maybe<Scalars['Int']['output']>;
  /** If enabled, the user can reply to comments. */
  threadEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The maximum nested comments depth. */
  threadMaxDepth?: Maybe<Scalars['Int']['output']>;
};

/** A form to submit a comment or reply to a comment. */
export type CommentForm = FormInterface & {
  __typename?: 'CommentForm';
  /** The fields of the form. */
  formFields?: Maybe<CommentFormFields>;
  /** The id of the form, used in the submit process. */
  id: Scalars['ID']['output'];
  /** The entry name to pass the parent ID. */
  parentIdEntryName: Scalars['String']['output'];
  /** The entry name to pass the post ID. */
  postIdEntryName: Scalars['String']['output'];
  /** The submit action button of the form. */
  submitButton: FormAction;
  /** Title of the form. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The fields of the comment form. */
export type CommentFormFields = {
  __typename?: 'CommentFormFields';
  /** Captcha protection */
  captcha?: Maybe<CaptchaField>;
  /** Consent checkbox */
  consent?: Maybe<CheckboxField>;
  /** Comment content field */
  content?: Maybe<TextAreaField>;
  /** Author email field */
  email?: Maybe<EmailField>;
  /** Author username field */
  username?: Maybe<TextField>;
};

/** Response of a comment search query. Contains paginated items. */
export type CommentSearchResponse = {
  __typename?: 'CommentSearchResponse';
  /** Search results. */
  items: Array<Comment>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of comments. */
  totalCount: Scalars['Int']['output'];
  /** The total number of comments including all nested replies. */
  totalCountWithReplies: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of comments. */
export type CommentSortInput = {
  /** Sort comments by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
};

/** The statuses of a comment. */
export enum CommentStatus {
  /** Comment published and publicly visible. */
  APPROVED = 'APPROVED',
  /** Comment submitted by visitors, usually not visible unless approved. */
  PENDING = 'PENDING',
  /** Comment flagged as possibly unwanted or irrelevant. */
  SPAM = 'SPAM',
  /** Comment marked for deletion. */
  TRASH = 'TRASH'
}

/** A condition defines a set of rules that must be fulfilled in order to trigger its action. */
export type Condition = {
  __typename?: 'Condition';
  /** The action to execute. */
  action: ConditionAction;
  /** The conjunction of the rules. */
  operator: ConditionMatchType;
  /** The set of rules to test. */
  rules: Array<ConditionRule>;
};

/** Action to execute when the condition is fulfilled. */
export enum ConditionAction {
  /** Hide the field when the condition is fulfilled. */
  HIDE = 'HIDE',
  /** Show the field when the condition is fulfilled. */
  SHOW = 'SHOW'
}

/** Conjunction of the rules. */
export enum ConditionMatchType {
  /** All the rules must match. */
  AND = 'AND',
  /** At least one rule must match. */
  OR = 'OR'
}

/** A rule defines a comparison between a field value and a value. */
export type ConditionRule = {
  __typename?: 'ConditionRule';
  /** The field name affected by the condition. */
  field: Scalars['String']['output'];
  /** The comparison operator between the field's value and the rule value. */
  operator: ConditionRuleOperator;
  /** The rule value. */
  value: Scalars['String']['output'];
};

/** Comparison operator between a rule field value and the defined value. */
export enum ConditionRuleOperator {
  /** The field value must contain the rule value. */
  CONTAINS = 'CONTAINS',
  /** The field value must end with the rule value. */
  ENDS_WITH = 'ENDS_WITH',
  /** The field value must be greater than the rule value. */
  GREATER_THAN = 'GREATER_THAN',
  /** The field value must be equal to the rule value. */
  IS = 'IS',
  /** The field value must not be equal to the rule value. */
  IS_NOT = 'IS_NOT',
  /** The field value must be less than the rule value. */
  LESS_THAN = 'LESS_THAN',
  /** The field value must start with the rule value. */
  STARTS_WITH = 'STARTS_WITH'
}

/** A GDPR consent checkbox. */
export type ConsentField = FieldInterface & {
  __typename?: 'ConsentField';
  /** Label of the checkbox. */
  checkboxLabel?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** URL to the privacy policy page. */
  privacyPolicyUrl?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/**
 * A prev/next pagination between content elements.
 * This returns the previous and next elements in the default list view of the content.
 */
export type ContentPager = {
  __typename?: 'ContentPager';
  /** Link to the complete list view. */
  list?: Maybe<Link>;
  /** Next content in the navigation. */
  next?: Maybe<Link>;
  /** Previous content in the navigation. */
  prev?: Maybe<Link>;
};

/** Geographical coordinates. */
export type Coordinates = {
  __typename?: 'Coordinates';
  /** Latitude of the point. */
  latitude: Scalars['Float']['output'];
  /** Longitude of the point. */
  longitude: Scalars['Float']['output'];
};

/** An element of the breadcrumb. */
export type Crumb = {
  __typename?: 'Crumb';
  /** The siblings of the breadcrumb item. This should be applicable for the last item. */
  siblings: Array<Crumb>;
  /** The title of the breadcrumb item. */
  title: Scalars['String']['output'];
  /** The url of the breadcrumb item. */
  url: Scalars['URL']['output'];
};

/** Date field. */
export type DateField = FieldInterface & {
  __typename?: 'DateField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/**
 * Date range filter.
 * > Uses a `FilterRangeTypeInput` to send results.
 */
export type DateRangeFilter = FilterInterface & {
  __typename?: 'DateRangeFilter';
  /** Name of the targeted attribute. */
  attribute: Scalars['String']['output'];
  /** Label of the form field. */
  label?: Maybe<Scalars['String']['output']>;
};

/** Content type that displays a list of directories. */
export type DirectoriesListBlock = BlockInterface & {
  __typename?: 'DirectoriesListBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** List of directories to display. */
  directories: Array<Directory>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The level of the item headings. From 1 to 6. */
  itemTitleLevel: Scalars['Int']['output'];
};

/** Detail of a directory. */
export type Directory = LocationInterface & PostInterface & RouteInterface & {
  __typename?: 'Directory';
  /** Accessibility options for the directory. */
  accessibility?: Maybe<DirectoryAccessibility>;
  /** Sector of activity. */
  activitySector?: Maybe<Scalars['String']['output']>;
  /** Address of the location. */
  address?: Maybe<Address>;
  /** Navigation path to the directory. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Whether consent has been given to share user's identity. */
  consentGiven: Scalars['Boolean']['output'];
  /** Whether the contact person has given consent to share its identity. */
  contactConsentGiven: Scalars['Boolean']['output'];
  /** Email address of the contact person. */
  contactEmail?: Maybe<Scalars['String']['output']>;
  /** First name of the contact person. */
  contactFirstName?: Maybe<Scalars['String']['output']>;
  /** Last name of the contact person. */
  contactLastName?: Maybe<Scalars['String']['output']>;
  /** Email address. */
  email?: Maybe<Scalars['String']['output']>;
  /** First name. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** ID of the directory. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Last name. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Latitude of the point. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** Subtitle of the directory. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Longitude of the point. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** URL to the cartography view. */
  mapUrl?: Maybe<Scalars['URL']['output']>;
  /** Name of the mayor. */
  mayorName?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Surface area of the municipality. */
  municipalityArea?: Maybe<Scalars['String']['output']>;
  /** Population of the municipality. */
  municipalityPopulation?: Maybe<Scalars['Int']['output']>;
  /** List of office titles. */
  offices: Array<Scalars['String']['output']>;
  /** The hours when the entity can be contacted. */
  openingHours?: Maybe<Scalars['HTML']['output']>;
  /** Bottom navigation between directory of the list view. */
  pager?: Maybe<ContentPager>;
  /** List of phone numbers. */
  phones: Array<Phone>;
  /** The publication date of the directory. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** RNA number (Répertoire National des Associations). */
  rnaNumber?: Maybe<Scalars['String']['output']>;
  /** SIRET number (business identification in France). */
  siretNumber?: Maybe<Scalars['String']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** List of social networks. */
  socialLinks: Array<SocialLink>;
  /** The publication status of the directory. */
  status: PostStatus;
  /** The content of the directory, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the directory. */
  title?: Maybe<Scalars['String']['output']>;
  /** The type of the directory. This is a string because not known at compilation time. */
  type: Scalars['String']['output'];
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the directory. */
  url?: Maybe<Scalars['URL']['output']>;
  /** The rendering style of the directory. Inherited from the directory config. */
  viewMode: DirectoryViewMode;
  /** URL of the website. */
  website?: Maybe<Scalars['String']['output']>;
  /** Number of employees. */
  workforce?: Maybe<Scalars['Int']['output']>;
};


/** Detail of a directory. */
export type DirectoryCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Directory accessibility options. */
export type DirectoryAccessibility = {
  __typename?: 'DirectoryAccessibility';
  /** Hearing impairment accessibility. */
  hearingImpairment?: Maybe<DirectoryAccessibilityStatus>;
  /** Intellectual impairment accessibility. */
  intellectualImpairment?: Maybe<DirectoryAccessibilityStatus>;
  /** Mental impairment accessibility. */
  mentalImpairment?: Maybe<DirectoryAccessibilityStatus>;
  /** Reduced mobility accessibility. */
  reducedMobility?: Maybe<DirectoryAccessibilityStatus>;
  /** Sign language reception accessibility. */
  signLanguageReception?: Maybe<DirectoryAccessibilityStatus>;
  /** Strollers accessibility. */
  strollers?: Maybe<DirectoryAccessibilityStatus>;
  /** Visual impairment accessibility. */
  visualImpairment?: Maybe<DirectoryAccessibilityStatus>;
};

/** Accessibility support status. */
export enum DirectoryAccessibilityStatus {
  /** Not supported accessibility. */
  NOT_SUPPORTED = 'NOT_SUPPORTED',
  /** Supported accessibility. */
  SUPPORTED = 'SUPPORTED',
  /** Unknown accessibility. */
  UNKNOWN = 'UNKNOWN'
}

/** Defines the field to use to filter a list of directory. */
export type DirectoryFilterInput = {
  /** Get directory by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The ids of the directories. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get directory by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
  /** The types of the directories. */
  type?: InputMaybe<FilterEqualTypeInput>;
};

/** Directory list view configuration. */
export type DirectoryList = RouteInterface & {
  __typename?: 'DirectoryList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the directory list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** The rendering style of this list. */
  listMode: DirectoryListMode;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The type of the directory. This is a string because not known at comptime. */
  type: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
  /** The rendering style of a single directory. */
  viewMode: DirectoryViewMode;
};

/** The directory list display style. */
export enum DirectoryListMode {
  /** Render the directories as a grid. */
  GRID = 'GRID',
  /** Render the directories as a list. */
  LIST = 'LIST',
  /** Render the directories as an organigram (organized search). */
  ORGANIGRAM = 'ORGANIGRAM'
}

/** Directories map view configuration. */
export type DirectoryMap = RouteInterface & {
  __typename?: 'DirectoryMap';
  /** Default center point of the map, when there are no markers. */
  defaultCenter?: Maybe<Coordinates>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** Default zoom level of the map. */
  defaultZoom?: Maybe<Scalars['Float']['output']>;
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The available types. */
  types: Array<Scalars['String']['output']>;
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Response of a directory organigram query. */
export type DirectoryOrganigramResponse = {
  __typename?: 'DirectoryOrganigramResponse';
  /** Filters related to the current search results. */
  filters: Array<FilterInterface>;
  /** The list of directories found, organized into sections. */
  sections: Array<DirectoryOrganigramSection>;
  /** The total number of items (directories) across all results. */
  totalCount: Scalars['Int']['output'];
};

/** A section or node within the organigram. */
export type DirectoryOrganigramSection = {
  __typename?: 'DirectoryOrganigramSection';
  /** The sub-sections (if the organigram is hierarchical). */
  children: Array<DirectoryOrganigramSection>;
  /** Identifier of the section. */
  id: Scalars['ID']['output'];
  /** The list of directories belonging to this section. */
  items: Array<Directory>;
  /** Level of the section. */
  level: Scalars['Int']['output'];
  /** Title of the section/group (e.g., 'Management', 'Departments'). */
  title: Scalars['String']['output'];
  /** The total number of directories. */
  totalCount: Scalars['Int']['output'];
};

/** Response of a directory search query. Contains paginated items. */
export type DirectorySearchResponse = {
  __typename?: 'DirectorySearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Directory>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of directories. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of directory. */
export type DirectorySortInput = {
  /** Sort the directories by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort the directories by title. */
  title?: InputMaybe<SortDirection>;
};

/** The directory rendering style. */
export enum DirectoryViewMode {
  /** Render the directory entry like a structure. */
  LOCATION = 'LOCATION',
  /** Render the directory entry like a contact. */
  PERSON = 'PERSON'
}

/** Content type that renders, up to 4, rows of image+text items. */
export type DiscoverBlock = BlockInterface & {
  __typename?: 'DiscoverBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of content+image rows. */
  items: Array<DiscoverBlockItem>;
  /** The display mode of the block. */
  layout?: Maybe<BlockLayout>;
};

/** Content type that displays 2 columns: content and image. */
export type DiscoverBlockItem = {
  __typename?: 'DiscoverBlockItem';
  /** Button displayed in the content part. */
  action?: Maybe<Link>;
  /** URL of the image in the image part. */
  image: Image;
  /** The position of the image in the block. */
  imagePosition?: Maybe<DiscoverBlockPosition>;
  /** Surtitle of the content part. */
  leadText: Scalars['String']['output'];
  /** Title of the content part. */
  title: Scalars['String']['output'];
};

/** The position of the image. */
export enum DiscoverBlockPosition {
  /** Place the image on the left side of the content. */
  LEFT = 'LEFT',
  /** Place the image on the right side of the content. */
  RIGHT = 'RIGHT'
}

/** Content type that renders a list of downloadable documents. */
export type DownloadBlock = BlockInterface & {
  __typename?: 'DownloadBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The list of files. */
  files: Array<File>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** An email address. */
export type Email = {
  __typename?: 'Email';
  /** The address of the email. */
  address: Scalars['String']['output'];
  /** The name of the email. */
  label?: Maybe<Scalars['String']['output']>;
};

/** An email input, with an optional confirmation input. */
export type EmailField = FieldInterface & {
  __typename?: 'EmailField';
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The confirmation input, if enabled in BE. */
  confirmation?: Maybe<TextField>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** The email input. */
  email: TextField;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The pattern attribute of the input. */
  pattern?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Content type for an `oembed` element. */
export type EmbedBlock = BlockInterface & {
  __typename?: 'EmbedBlock';
  /** Whether the embedded content should be resized on smaller devices. */
  allowResponsive: Scalars['Boolean']['output'];
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The caption of the embedded content. */
  caption?: Maybe<Scalars['String']['output']>;
  /** The HTML code to embed. */
  html: Scalars['HTML']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The name of the oEmbed provider. */
  provider?: Maybe<Scalars['String']['output']>;
  /** Whether the embedded content can be resized. */
  responsive: Scalars['Boolean']['output'];
  /** The thumbnail issued by the service provider. */
  thumbnail?: Maybe<Image>;
  /** Transcription if the type is VIDEO. */
  transcription?: Maybe<Scalars['HTML']['output']>;
  /** The type of media to embed. */
  type?: Maybe<OEmbedResourceType>;
  /** The source URL of the embedded content. */
  url: Scalars['String']['output'];
  /** Duration of the video in seconds. */
  videoDuration?: Maybe<Scalars['Int']['output']>;
  /** List of available video formats from the service provider. */
  videoFormats: Array<EmbedBlockVideoFormat>;
};

/** Metadata of a format for an oEmbed video. */
export type EmbedBlockVideoFormat = {
  __typename?: 'EmbedBlockVideoFormat';
  /** Name of the format. */
  name: Scalars['String']['output'];
  /** Estimated size of the video in Bytes. */
  weight: Scalars['Int']['output'];
};

/** Detail of an event. */
export type Event = PostInterface & RouteInterface & {
  __typename?: 'Event';
  /** Accessibility options for the event. */
  accessibility?: Maybe<EventAccessibility>;
  /** Target audience for this event. */
  audience: Array<Scalars['String']['output']>;
  /** Navigation path to the event. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Email address.
   * @deprecated Use `emails` instead
   */
  email?: Maybe<Scalars['String']['output']>;
  /** A list of emails. */
  emails: Array<Email>;
  /** The end date. If periods are enabled, the latest date is reflected here. */
  endDate?: Maybe<Scalars['Date']['output']>;
  /** An iCal url, with the `webcal://` prefix. */
  iCalUrl: Scalars['URL']['output'];
  /** ID of the event. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the event. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** The locations where the event takes place. */
  locations: Array<LocationInterface>;
  /** URL to the cartography view. */
  mapUrl?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between events of the list view. */
  pager?: Maybe<ContentPager>;
  /** The list of all periods for the event, allowing for multiple dates and times. */
  periods?: Maybe<EventPeriodResponse>;
  /** List of phone numbers. */
  phones: Array<Phone>;
  /** The publication date of the event. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The label describing the recursion periods. */
  recurrenceSummary?: Maybe<Scalars['String']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** List of social networks. */
  socialLinks: Array<SocialLink>;
  /** The start date. If periods are enabled, the earliest date is reflected here. */
  startDate?: Maybe<Scalars['Date']['output']>;
  /** The publication status of the event. */
  status: PostStatus;
  /** The content of the event, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the event. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the event. */
  url?: Maybe<Scalars['URL']['output']>;
  /**
   * URL of the website.
   * @deprecated Use `websites` instead
   */
  website?: Maybe<Scalars['String']['output']>;
  /** A list of websites. */
  websites: Array<Link>;
};


/** Detail of an event. */
export type EventCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Detail of an event. */
export type EventPeriodsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<EventPeriodFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Event accessibility options. */
export type EventAccessibility = {
  __typename?: 'EventAccessibility';
  /** Hearing impairment accessibility support status. */
  hearingImpairment?: Maybe<EventAccessibilityStatus>;
  /** Intellectual impairment accessibility support status. */
  intellectualImpairment?: Maybe<EventAccessibilityStatus>;
  /** Mental impairment accessibility support status. */
  mentalImpairment?: Maybe<EventAccessibilityStatus>;
  /** Reduced mobility accessibility support status. */
  reducedMobility?: Maybe<EventAccessibilityStatus>;
  /** Sign language reception accessibility support status. */
  signLanguageReception?: Maybe<EventAccessibilityStatus>;
  /** Strollers accessibility support status. */
  strollers?: Maybe<EventAccessibilityStatus>;
  /** Visual impairment accessibility support status. */
  visualImpairment?: Maybe<EventAccessibilityStatus>;
};

/** Accessibility support status. */
export enum EventAccessibilityStatus {
  /** Not supported accessibility support status. */
  NOT_SUPPORTED = 'NOT_SUPPORTED',
  /** Supported accessibility support status. */
  SUPPORTED = 'SUPPORTED',
  /** Unknown accessibility support status. */
  UNKNOWN = 'UNKNOWN'
}

/** Defines the field to use to filter a list of events. */
export type EventFilterInput = {
  /** Get events by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The ids of the events. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get events by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Event list view configuration. */
export type EventList = RouteInterface & {
  __typename?: 'EventList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The date range filter. */
  dateFilter?: Maybe<FilterInterface>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the event list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the event proposition page. */
  proposeUrl?: Maybe<Scalars['String']['output']>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Event map view configuration. */
export type EventMap = RouteInterface & {
  __typename?: 'EventMap';
  /** Default center point of the map, when there are no markers. */
  defaultCenter?: Maybe<Coordinates>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** Default zoom level of the map. */
  defaultZoom?: Maybe<Scalars['Float']['output']>;
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the map page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/**
 * Represents a specific time slot or duration for an event,
 * which can have multiple occurrences.
 */
export type EventPeriod = {
  __typename?: 'EventPeriod';
  /** The end date of the period. */
  endDate?: Maybe<Scalars['Date']['output']>;
  /** The end time of the period. */
  endTime?: Maybe<Scalars['Time']['output']>;
  /** Indicates if the period spans a full day. */
  fullday: Scalars['Boolean']['output'];
  /** An iCal url, with the `webcal://` prefix. */
  iCalUrl: Scalars['URL']['output'];
  /** The start date of the period. */
  startDate: Scalars['Date']['output'];
  /** The start time of the period. */
  startTime?: Maybe<Scalars['Time']['output']>;
};

/** Defines the field to use to filter a list of event periods. */
export type EventPeriodFilterInput = {
  /** Get periods that starts after this date. */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** Get periods that ends before this date. */
  to?: InputMaybe<Scalars['DateTime']['input']>;
  /** Returns results that are upcoming or currently active. */
  upcoming?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Response of an event period query. */
export type EventPeriodResponse = {
  __typename?: 'EventPeriodResponse';
  /** The list of periods. */
  items: Array<EventPeriod>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of periods. */
  totalCount: Scalars['Int']['output'];
};

/** Response of an event search query. Contains paginated items. */
export type EventSearchResponse = {
  __typename?: 'EventSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Event>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of events. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of events. */
export type EventSortInput = {
  /** Sort events by their publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort events by their title. */
  title?: InputMaybe<SortDirection>;
  /** Sort events by their upcoming date. */
  upcomingDate?: InputMaybe<SortDirection>;
};

/** Content type that displays events. */
export type EventsBlock = BlockInterface & {
  __typename?: 'EventsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** List of events to display. */
  events: Array<Event>;
  /** The focused event. Fills 100% of the width. */
  focusedEvent?: Maybe<Event>;
  /** A unique identifier for this lock. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The URL to the list view. */
  listUrl?: Maybe<Scalars['String']['output']>;
  /** The URL to the suggestion form. */
  proposeUrl?: Maybe<Scalars['String']['output']>;
  /** Additional links, rendered as tags. */
  tags: Array<Link>;
  /**
   * The title of the block.
   * @deprecated This block title should be defined in FE
   */
  title?: Maybe<Scalars['String']['output']>;
  /**
   * The level of the heading. From 1 to 6.
   * @deprecated This block title level should be always 2
   */
  titleLevel?: Maybe<Scalars['Int']['output']>;
};

/** Content type that displays a list of events. */
export type EventsListBlock = BlockInterface & {
  __typename?: 'EventsListBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** List of events to display. */
  events: Array<Event>;
  /** A unique identifier for this lock. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The level of the heading. From 1 to 6. */
  itemTitleLevel: Scalars['Int']['output'];
};

/** The extranet bar displayed on top of the website when logged in. */
export type ExtranetBar = {
  __typename?: 'ExtranetBar';
  /** URL to the extranet homepage. */
  homeUrl?: Maybe<Scalars['String']['output']>;
  /** The URL to logout. */
  logoutUrl?: Maybe<Scalars['String']['output']>;
  /** The connected user. */
  user?: Maybe<User>;
};

/** Extranet configuration. */
export type ExtranetConfig = {
  __typename?: 'ExtranetConfig';
  /** URL to the extranet login page. */
  loginUrl?: Maybe<Scalars['URL']['output']>;
};

/** The extranet home page. */
export type ExtranetHome = RouteInterface & {
  __typename?: 'ExtranetHome';
  /** The introduction of the extranet home page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** The metadata of the extranet home page. */
  metadata?: Maybe<Metadata>;
  /** The title of the extranet home page. */
  title: Scalars['String']['output'];
  /** The URL to the extranet home page. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** The extranet login page. */
export type ExtranetLogin = RouteInterface & {
  __typename?: 'ExtranetLogin';
  /** The login form. */
  loginForm?: Maybe<UserLoginForm>;
  /** The metadata of the login page. */
  metadata?: Maybe<Metadata>;
  /** The title of the login page. */
  title: Scalars['String']['output'];
  /** The URL to the login page. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Union of all field types. */
export type Field = AddressField | AltchaField | CheckboxField | ConsentField | DateField | EmailField | Fieldset | FileUploadField | HCaptchaField | NameField | NumberField | PhoneField | RadioField | ReCaptchaField | SelectField | SeparatorField | TextAreaField | TextField | TimeField;

/** An interface for form fields. */
export type FieldInterface = {
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name of the field. */
  name: Scalars['String']['output'];
  /** The required indicator of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** The size of the field. */
export enum FieldSize {
  /** Large size. */
  LARGE = 'LARGE',
  /** Medium size. */
  MEDIUM = 'MEDIUM',
  /** Small size. */
  SMALL = 'SMALL'
}

/**
 * A fieldset is a container of fields.
 * This is also known as the `Section` field in GravityForms.
 */
export type Fieldset = {
  __typename?: 'Fieldset';
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The description of the fieldset legend. */
  description?: Maybe<Scalars['String']['output']>;
  /** Field collection. */
  formFields: Array<Field>;
  /** The title of the fieldset legend. */
  title: Scalars['String']['output'];
};

/** File attachement. */
export type File = {
  __typename?: 'File';
  /** A short description of the file. */
  description?: Maybe<Scalars['String']['output']>;
  /** The URL to download the file. */
  downloadUrl?: Maybe<Scalars['String']['output']>;
  /** The extension name of the file, without the dot. */
  extname?: Maybe<Scalars['String']['output']>;
  /** The label of the file entry. */
  label?: Maybe<Scalars['String']['output']>;
  /** The content type of the file. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The size of the file in Bytes. */
  size?: Maybe<Scalars['Int']['output']>;
  /** The URL to view the file. */
  viewUrl?: Maybe<Scalars['String']['output']>;
};

/** Send one or many files. */
export type FileUploadField = FieldInterface & {
  __typename?: 'FileUploadField';
  /** List of the allowed extensions. Can be used as `accept` attribute. */
  allowedExtensions: Array<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The maximum number of files. */
  maxFiles?: Maybe<Scalars['Int']['output']>;
  /** The maximum size of the upload, in Bytes. */
  maxSize?: Maybe<Scalars['Int']['output']>;
  /** If enabled, allow multiple files upload. */
  multiple: Scalars['Boolean']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
  /** Use this attribute to filter on an array of values. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A filter renderable in FE. */
export type FilterInterface = {
  /** Name of the targeted attribute. */
  attribute: Scalars['String']['output'];
  /** Label of the form field. */
  label?: Maybe<Scalars['String']['output']>;
};

/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
  /** Use this attribute to fuzzy match the specified string. */
  match?: InputMaybe<Scalars['String']['input']>;
};

/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
  /** The lowest possible value in the range. */
  from?: InputMaybe<Scalars['String']['input']>;
  /** The highest possible value in the range. */
  to?: InputMaybe<Scalars['String']['input']>;
};

/** A flash message that is displayed at the top of the website. */
export type FlashInfo = PostInterface & {
  __typename?: 'FlashInfo';
  /** Navigation path to the info. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Short description of the flash info. */
  description?: Maybe<Scalars['String']['output']>;
  /** ID of the flash info. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Short description of the info. Multiline. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web info metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between posts of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the post. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part of the info. */
  slug: Scalars['String']['output'];
  /** The publication status of the info. */
  status: PostStatus;
  /** The content of the info, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the flash info. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The URL of the info. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** A flash message that is displayed at the top of the website. */
export type FlashInfoCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Response of a flash info search query. Contains paginated items. */
export type FlashInfoSearchResponse = {
  __typename?: 'FlashInfoSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<FlashInfo>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of infos. */
  totalCount: Scalars['Int']['output'];
};

/**
 * Content type that displays an image with a content section.
 * *Used in newsletter.*
 */
export type FocusBlock = BlockInterface & {
  __typename?: 'FocusBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Short description of the block, in the content section. */
  description?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** Image of the block, in the content section. */
  image?: Maybe<Image>;
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Surtitle of block, in the content section. */
  surtitle?: Maybe<Scalars['String']['output']>;
  /** Title of the block, in the content section. */
  title?: Maybe<Scalars['String']['output']>;
  /** URL of the block. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Footer configuration. */
export type FooterConfig = {
  __typename?: 'FooterConfig';
  /** List of buttons, displayed in the footer. */
  buttons: Array<Button>;
  /** Client contact info. */
  clientInfo?: Maybe<ClientInfo>;
  /** The logo for dark backgrounds. */
  logoDark?: Maybe<Image>;
  /** The logo for light backgrounds. */
  logoLight?: Maybe<Image>;
  /** The first level of the quick access links. */
  quickAccess1: Array<Link>;
  /** The second level of the quick access links. */
  quickAccess2: Array<Link>;
  /** The name of the client. */
  title?: Maybe<Scalars['String']['output']>;
  /** Top section of the footer. */
  top?: Maybe<FooterTop>;
};

/** A content section over the footer. */
export type FooterTop = {
  __typename?: 'FooterTop';
  /** The button on the right side of the block. */
  action?: Maybe<Link>;
  /** A long description under the title. */
  description?: Maybe<Scalars['String']['output']>;
  /** The title of the section. */
  title: Scalars['String']['output'];
};

/** The form type handles multi-step by default. */
export type Form = FormInterface & {
  __typename?: 'Form';
  /** The id of the form, used in the submit process. */
  id: Scalars['ID']['output'];
  /** The steps of the form. */
  steps: Array<FormStep>;
  /** The submit action button of the form. */
  submitButton: FormAction;
  /** Title of the form. */
  title?: Maybe<Scalars['String']['output']>;
  /** The total number of steps. */
  totalSteps: Scalars['Int']['output'];
};

/** An action button. */
export type FormAction = {
  __typename?: 'FormAction';
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The icon of the button. */
  icon?: Maybe<Icon>;
  /** The label of the button. */
  label?: Maybe<Scalars['String']['output']>;
};

/** A content type that renders a form. */
export type FormBlock = BlockInterface & {
  __typename?: 'FormBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The attached form. */
  form?: Maybe<Form>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** A K/V pair of an input with its value. */
export type FormDataEntryInput = {
  /** The field name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The value of the field or input. */
  value?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A form error, that targets a field name and list its issues.
 * If no field name is given, it is a global error message.
 */
export type FormError = {
  __typename?: 'FormError';
  /** The name of the field. */
  fieldName?: Maybe<Scalars['String']['output']>;
  /** List of error messages. */
  messages: Array<Scalars['String']['output']>;
};

/** A K/V pair of an input with its file. */
export type FormFileEntryInput = {
  /** The field name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The value of the field or input. */
  value: Scalars['Upload']['input'];
};

/** Interface for all form types. */
export type FormInterface = {
  /** The id of the form, used in the submit process. */
  id: Scalars['ID']['output'];
  /** The submit action button of the form. */
  submitButton: FormAction;
  /** Title of the form. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A field container in a multi-step form. */
export type FormStep = {
  __typename?: 'FormStep';
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The short description of the step. */
  description?: Maybe<Scalars['String']['output']>;
  /** The fields contained in the step. */
  formFields: Array<Field>;
  /** The next button. */
  next?: Maybe<FormAction>;
  /** The previous button. Should not have any display condition. */
  prev?: Maybe<FormAction>;
  /** The number of the step in the list. */
  stepNumber: Scalars['Int']['output'];
  /** The title of the step. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Content type for an information block. */
export type FrameBlock = BlockInterface & {
  __typename?: 'FrameBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /**
   * Content of the block.
   * @deprecated Use `innerBlocks`.
   */
  html: Scalars['HTML']['output'];
  /** Icon to be displayed in the block. */
  icon?: Maybe<Icon>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The text alignment of the text. */
  textAlign?: Maybe<Scalars['CSSValue']['output']>;
  /** Block rendering variant, used in FE. */
  variant: FrameBlockVariant;
};

/** Colors used for this block. */
export enum FrameBlockVariant {
  /** Primary color. */
  PRIMARY = 'PRIMARY',
  /** Secondary color. */
  SECONDARY = 'SECONDARY',
  /** Tertiary color. */
  TERTIARY = 'TERTIARY'
}

/** Content type to display a gallery of `ImageBlock`. */
export type GalleryBlock = BlockInterface & {
  __typename?: 'GalleryBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The caption of the gallery. */
  caption?: Maybe<Scalars['String']['output']>;
  /**
   * The number of columns of the gallery.
   * @deprecated Use `The number of columns is handled in FE`.
   */
  columns: Scalars['Int']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** Whether to crop images so they fit. */
  imageCrop: Scalars['Boolean']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Whether images should be displayed in a random order. */
  randomOrder: Scalars['Boolean']['output'];
};

/** The global map page configuration. */
export type GlobalMap = RouteInterface & {
  __typename?: 'GlobalMap';
  /** Short description of the page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /**
   * Links of the other maps.
   * @deprecated Use `mapLinks` from `SiteConfig`.
   */
  mapLinks?: Maybe<Array<Link>>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The title of the page. */
  title: Scalars['String']['output'];
  /** Relative URL. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Global search page configuration. */
export type GlobalSearch = RouteInterface & {
  __typename?: 'GlobalSearch';
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The full text filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the search page. */
  title: Scalars['String']['output'];
  /** The url of the page. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Defines the field to use to filter the global search. */
export type GlobalSearchFilterInput = {
  /** Get results by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The date range for the publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
  /** The post type. */
  type?: InputMaybe<FilterEqualTypeInput>;
};

/** Response of a global search query. Contains paginated items. */
export type GlobalSearchResponse = {
  __typename?: 'GlobalSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<PostInterface>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of results. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort the global search. */
export type GlobalSearchSortInput = {
  /** Sort posts by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort posts by title. */
  title?: InputMaybe<SortDirection>;
};

/** Google Translate widget configuration. */
export type GoogleTranslateConfig = {
  __typename?: 'GoogleTranslateConfig';
  /** Whether the Google Translate widget is enabled. */
  enabled: Scalars['Boolean']['output'];
};

/** Content type that groups other blocks. */
export type GroupBlock = BlockInterface & {
  __typename?: 'GroupBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** The HCaptcha field. See the [documentation](https://docs.hcaptcha.com/configuration). */
export type HCaptchaField = FieldInterface & {
  __typename?: 'HCaptchaField';
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The description of the fieldset legend. */
  description?: Maybe<Scalars['String']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The public API site key. */
  siteKey: Scalars['String']['output'];
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Header configuration. */
export type HeaderConfig = {
  __typename?: 'HeaderConfig';
  /** List of buttons, displayed in the header. */
  buttons: Array<Button>;
  /** The logo for dark backgrounds. */
  logoDark?: Maybe<Image>;
  /** The logo for light backgrounds. */
  logoLight?: Maybe<Image>;
  /** The user profiles is a list of quick links that redirects to predefined pages. */
  profiles: Array<Link>;
  /** The top section of the header. */
  top?: Maybe<HeaderTop>;
};

/**
 * A navigation item that can appear in header sections.
 * Can be either a single `Button` or a grouped set of links (`LinkGroup`).
 */
export type HeaderNavItem = Button | LinkGroup;

/** A content section displayed above the main header. */
export type HeaderTop = {
  __typename?: 'HeaderTop';
  /** Enable the top section. */
  enabled: Scalars['Boolean']['output'];
  /** Left side content of the header top section. */
  left?: Maybe<HeaderTopLeft>;
  /** Right side content of the header top section. */
  right?: Maybe<HeaderTopRight>;
};

/** Configuration for the left side of the header top section. */
export type HeaderTopLeft = {
  __typename?: 'HeaderTopLeft';
  /** Primary call-to-action link displayed in the header top left area. */
  action?: Maybe<Button>;
  /** User-defined list of navigation items displayed as buttons. */
  buttons: Array<HeaderNavItem>;
  /** Whether the accessibility configuration shortcut should be displayed. */
  showAccessibilityConfig?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the Google Translate widget should be displayed. */
  showGoogleTranslate?: Maybe<Scalars['Boolean']['output']>;
};

/** Configuration for the right side of the header top section. */
export type HeaderTopRight = {
  __typename?: 'HeaderTopRight';
  /** User-defined list of navigation items displayed as buttons or grouped menus. */
  buttons: Array<HeaderNavItem>;
  /** Whether social network links from `SiteConfig.socialLinks` should be rendered here. */
  showSocialLinks?: Maybe<Scalars['Boolean']['output']>;
};

/** Content type that displays a title. */
export type HeadingBlock = BlockInterface & {
  __typename?: 'HeadingBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The HTML content of the block. */
  html: Scalars['HTML']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The heading level. */
  level: Scalars['Int']['output'];
  /** Text alignment. */
  textAlign?: Maybe<Scalars['CSSValue']['output']>;
};

/** Content type that renders slides of images or a video. */
export type HeroBlock = BlockInterface & {
  __typename?: 'HeroBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The slides of the block */
  slides: Array<HeroBlockSlide>;
  /** Hero block variant. */
  variant: HeroBlockVariant;
};

/** Slide of a hero block. */
export type HeroBlockSlide = {
  __typename?: 'HeroBlockSlide';
  /** Surtitle of the content part. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Link of the slide. */
  link?: Maybe<Scalars['String']['output']>;
  /** Media content of the slide. */
  media?: Maybe<HeroBlockSlideMedia>;
  /** Title of the content part. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Media content of a hero block slide. */
export type HeroBlockSlideMedia = Image | Video;

/** The hero block variants. */
export enum HeroBlockVariant {
  /** Single image. */
  IMAGE = 'IMAGE',
  /** Carousel of images. */
  IMAGE_CAROUSEL = 'IMAGE_CAROUSEL',
  /** Single video. */
  VIDEO = 'VIDEO'
}

/** Content type that renders slides of images or a video. With an additional search input. */
export type HeroSearchBlock = BlockInterface & {
  __typename?: 'HeroSearchBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The fulltext search filter, if the variant allows it. */
  searchFilter?: Maybe<FilterInterface>;
  /** The slides of the block */
  slides: Array<HeroSearchBlockSlide>;
  /** Hero block variant. */
  variant: HeroSearchBlockVariant;
};

/** Slide of a hero search block. */
export type HeroSearchBlockSlide = {
  __typename?: 'HeroSearchBlockSlide';
  /** Surtitle of the content part. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Link of the slide. */
  link?: Maybe<Scalars['String']['output']>;
  /** Media content of the slide. */
  media?: Maybe<HeroSearchBlockSlideMedia>;
  /** Title of the content part. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Media content of a hero search block slide. */
export type HeroSearchBlockSlideMedia = Image | Video;

/** The hero search block variants. */
export enum HeroSearchBlockVariant {
  /** Single image. */
  IMAGE = 'IMAGE',
  /** Single video. */
  VIDEO = 'VIDEO'
}

/** A non secure HTML block, usually used for script injection. */
export type HtmlBlock = BlockInterface & {
  __typename?: 'HtmlBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The rich text content of the block. */
  html?: Maybe<Scalars['HTML']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/**
 * An icon with a configurable content format.
 * As a SVG:
 * ```json
 * {
 *   "type": "SVG",
 *   "src": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"m6 9 6 6 6-6\"></svg>"
 * }
 * ```
 * As a font icon classname:
 * ```json
 * {
 *   "type": "FONT",
 *   "src": "fa-user"
 * }
 * ```
 */
export type Icon = {
  __typename?: 'Icon';
  /** The content of the icon. */
  src: Scalars['String']['output'];
  /** Defines the `src` content format. */
  type: IconType;
};

/** The type of the icon. Defines the format of the `src` attribute of an `Icon`. */
export enum IconType {
  /** Use the src as a font icon classname. (e.g. FontAwesome) */
  FONT = 'FONT',
  /** Use the src as a SVG content. */
  SVG = 'SVG',
  /** Use the src as an image url. */
  URL = 'URL'
}

/** Content type for an iframe. */
export type IframeBlock = BlockInterface & {
  __typename?: 'IframeBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The fixed height of the iframe. */
  height: Scalars['Int']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** If enabled, add a border to the iframe. */
  outlined: Scalars['Boolean']['output'];
  /** The title of the content embed by the iframe. */
  title?: Maybe<Scalars['String']['output']>;
  /** URL of the embed site. */
  url?: Maybe<Scalars['URL']['output']>;
};

/**
 * The image type carries all the necessary data for a descriptive picture.
 * This type is meant to be used with the "next/image" component which requires dimensions.
 */
export type Image = {
  __typename?: 'Image';
  /** Alternative text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The height of the image. */
  height: Scalars['Int']['output'];
  /** The URL to the resource. */
  url: Scalars['URL']['output'];
  /** The width of the image. */
  width: Scalars['Int']['output'];
};

/** Content type that displays an image. */
export type ImageBlock = BlockInterface & {
  __typename?: 'ImageBlock';
  /** The alternative text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The desired aspect ratio of the image. */
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  /** The caption of the image. */
  caption?: Maybe<Scalars['String']['output']>;
  /** The copyright or attribution text for the image. */
  copyright?: Maybe<Scalars['String']['output']>;
  /** The display height of the image. */
  height?: Maybe<Scalars['Int']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The display mode of the block. */
  layout?: Maybe<BlockLayout>;
  /** Whether clicking on the image should display it in full. */
  lightbox: Scalars['Boolean']['output'];
  /** The link on the image. */
  link?: Maybe<Link>;
  /** The display mode of the image within its container. */
  scale?: Maybe<Scalars['String']['output']>;
  /** The URL of the image. */
  src: Scalars['String']['output'];
  /** The title of the image. */
  title?: Maybe<Scalars['String']['output']>;
  /** The displayed width of the image. */
  width?: Maybe<Scalars['Int']['output']>;
};

/**
 * A collection of images, classified by aspect ratio.
 * The list of ratios is fixed and defined upfront in the CMS.
 */
export type ImageCollection = {
  __typename?: 'ImageCollection';
  /** The original image. */
  original?: Maybe<Image>;
  /** Square image. */
  ratio_1x1?: Maybe<Image>;
  /** Image with ratio 2:3. */
  ratio_2x3?: Maybe<Image>;
  /** Image with ratio 3:2. */
  ratio_3x2?: Maybe<Image>;
  /** Image with ratio 4:3. */
  ratio_4x3?: Maybe<Image>;
  /** Image with ratio 21:9. */
  ratio_21x9?: Maybe<Image>;
  /** Image with a A4 ratio (vertical). */
  ratio_A4_portrait?: Maybe<Image>;
};

/** Detail of a job offer. */
export type JobOffer = PostInterface & RouteInterface & {
  __typename?: 'JobOffer';
  /** Deadline for submitting applications for the offer. */
  applicationDeadline?: Maybe<Scalars['Date']['output']>;
  /** URL to the application form. */
  applyUrl?: Maybe<Scalars['String']['output']>;
  /** Navigation path to the job offer. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Type of contract (Permanent, Temporary, Internship, etc.). */
  contractType: JobOfferContractType;
  /** Name of the employer or hiring organization. */
  employerName?: Maybe<Scalars['String']['output']>;
  /** The total number of files. */
  fileCount: Scalars['Int']['output'];
  /** The list of attached files. */
  files: Array<File>;
  /** ID of the job offer. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the job offer. */
  leadText?: Maybe<Scalars['String']['output']>;
  /**
   * Name of the location or city where the position is based.
   * @deprecated Use `locationNames` instead.
   */
  locationName: Scalars['String']['output'];
  /** Names of the locations or cities where the position is based. */
  locationNames: Array<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between job offer of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the job offer. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** Internal reference of the job offer. */
  reference: Scalars['String']['output'];
  /** Minimum required education level. */
  requiredEducationLevel?: Maybe<Scalars['String']['output']>;
  /** Required experience level in years. */
  requiredExperience?: Maybe<Scalars['String']['output']>;
  /** Gross annual salary range. */
  salary?: Maybe<JobOfferSalaryRange>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the job offer. */
  status: PostStatus;
  /** The content of the job offer, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the job offer. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the job offer. */
  url?: Maybe<Scalars['URL']['output']>;
  /** Work mode for this position (Remote work, On-site, Hybrid, etc.). */
  workMode?: Maybe<JobOfferWorkMode>;
};


/** Detail of a job offer. */
export type JobOfferCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Types of employment contracts. */
export enum JobOfferContractType {
  /** Apprenticeship contract. */
  APPRENTICESHIP = 'APPRENTICESHIP',
  /** Fixed-term contract. */
  FIXED_TERM = 'FIXED_TERM',
  /** Internship contract. */
  INTERNSHIP = 'INTERNSHIP',
  /** Other contract type. */
  OTHER = 'OTHER',
  /** Permanent contract. */
  PERMANENT = 'PERMANENT'
}

/** Defines the field to use to filter a list of job offer. */
export type JobOfferFilterInput = {
  /** Get job offer by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The ids of the job offer. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get job offer by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Job offer list view configuration. */
export type JobOfferList = RouteInterface & {
  __typename?: 'JobOfferList';
  /** The URL to the spontaneous application form. */
  applyUrl?: Maybe<Scalars['String']['output']>;
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the job offer list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Job offer salary range. */
export type JobOfferSalaryRange = {
  __typename?: 'JobOfferSalaryRange';
  /** Maximum salary. */
  maximum?: Maybe<Scalars['Float']['output']>;
  /** Minimum salary. */
  minimum?: Maybe<Scalars['Float']['output']>;
  /** Salary unit. */
  unit?: Maybe<Scalars['String']['output']>;
};

/** Response of a job offer search query. Contains paginated items. */
export type JobOfferSearchResponse = {
  __typename?: 'JobOfferSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<JobOffer>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of job offers. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of job offer. */
export type JobOfferSortInput = {
  /** Sort job offers by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort job offers by title. */
  title?: InputMaybe<SortDirection>;
};

/** Job offers work modes. */
export enum JobOfferWorkMode {
  /** Hybrid work. */
  HYBRID = 'HYBRID',
  /** On-site work. */
  ONSITE = 'ONSITE',
  /** Remote work. */
  REMOTE = 'REMOTE'
}

/** A link is an object that holds a `text` and an `url`. */
export type Link = LinkInterface & {
  __typename?: 'Link';
  /** The link's optional icon. */
  icon?: Maybe<Icon>;
  /** The links target. */
  target?: Maybe<Scalars['String']['output']>;
  /** The text of the link. */
  text: Scalars['String']['output'];
  /** The url of the link. */
  url: Scalars['URL']['output'];
};

/** A labelled group of navigation links. */
export type LinkGroup = {
  __typename?: 'LinkGroup';
  /** Icon of the group. */
  icon?: Maybe<Icon>;
  /** Label of the group. */
  label?: Maybe<Scalars['String']['output']>;
  /** List of links in the group. */
  links: Array<Link>;
};

/** A link is an object that holds a `text` and an `url`. */
export type LinkInterface = {
  /** The text of the link. */
  text: Scalars['String']['output'];
  /** The url of the link. */
  url: Scalars['URL']['output'];
};

/** JSON-LD/schema.org metadata for structured data. */
export type LinkedData = {
  __typename?: 'LinkedData';
  /** The JSON-LD context (usually 'https://schema.org'). */
  context?: Maybe<Scalars['String']['output']>;
  /** The structured graph data in JSON-LD format. */
  graph?: Maybe<Scalars['JSON']['output']>;
};

/** Content type that displays a list of `ListItemBlock`. */
export type ListBlock = BlockInterface & {
  __typename?: 'ListBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Whether the list is ordered. */
  ordered: Scalars['Boolean']['output'];
  /** Whether the ordered list has reversed numbering. */
  reversed: Scalars['Boolean']['output'];
  /** The item number the list starts at. */
  startAt?: Maybe<Scalars['Int']['output']>;
  /** The CSS value for `list-style-type`. */
  type?: Maybe<Scalars['String']['output']>;
};

/** Content type for a list item. */
export type ListItemBlock = BlockInterface & {
  __typename?: 'ListItemBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The HTML of the list item. */
  html: Scalars['HTML']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** Defines the field to use to filter the live search. */
export type LiveSearchFilterInput = {
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Live search item configuration. */
export type LiveSearchItemConfig = {
  __typename?: 'LiveSearchItemConfig';
  /** The label of the tab */
  label?: Maybe<Scalars['String']['output']>;
  /** The post type */
  type?: Maybe<Scalars['String']['output']>;
};

/** Response of a live search query. */
export type LiveSearchResponse = {
  __typename?: 'LiveSearchResponse';
  /** Each section is a group of results aggregated by post type. */
  sections: Array<LiveSearchResponseSection>;
  /** The number of sections. */
  totalSections: Scalars['Int']['output'];
};

/** Group of search results aggregated by post type. */
export type LiveSearchResponseSection = {
  __typename?: 'LiveSearchResponseSection';
  /** Unique identifier of the section. */
  id: Scalars['ID']['output'];
  /** Search results. */
  items: Array<PostInterface>;
  /** Label of the section. */
  label?: Maybe<Scalars['String']['output']>;
  /** The total number of results in this section. */
  totalCount: Scalars['Int']['output'];
  /** The associated post type. */
  type?: Maybe<Scalars['String']['output']>;
};

/**
 * A geo-localized point.
 * > NOTE: This should not hold more information than that. If you need a phone number or category, see **Directory**.
 */
export type Location = LocationInterface & {
  __typename?: 'Location';
  /** Address of the location. */
  address?: Maybe<Address>;
  /** Latitude of the point. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the point. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** Title of the location. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Location field type. */
export type LocationField = FieldInterface & {
  __typename?: 'LocationField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The location latitude, rendered as the map. */
  latitude?: Maybe<TextField>;
  /** The location longitude, rendered as the map. */
  longitude?: Maybe<TextField>;
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Types that can be used as a location and must have basic lon/lat capabilities. */
export type LocationInterface = {
  /** Address of the location. */
  address?: Maybe<Address>;
  /** Latitude of the point. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** Longitude of the point. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** Title of the location. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Content type that renders a map with multiple markers. */
export type LocationsBlock = BlockInterface & {
  __typename?: 'LocationsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The display mode of the block. */
  layout?: Maybe<BlockLayout>;
  /** List of locations to render. */
  locations: Array<LocationInterface>;
};

/** A menu with multiple items. */
export type Menu = {
  __typename?: 'Menu';
  /** Direct children of the menu. */
  items: Array<MenuItem>;
};

/** Menu tree entry. */
export type MenuItem = {
  __typename?: 'MenuItem';
  /** A menu item can contain other items. */
  children: Array<MenuItem>;
  /** Inner content of the menu item. */
  content?: Maybe<MenuItemContent>;
  /** The level of the menu item in the tree. The greater the deeper. */
  level: Scalars['Int']['output'];
  /** The links target. */
  target?: Maybe<Scalars['String']['output']>;
  /** Title of the item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. Can be absolute or relative. */
  url: Scalars['URL']['output'];
};

/** Additional content attached to a menu item. */
export type MenuItemContent = {
  __typename?: 'MenuItemContent';
  /** Description of the menu item content section. */
  description?: Maybe<Scalars['String']['output']>;
  /** Title of the menu item content section. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The web page metadata information. */
export type Metadata = {
  __typename?: 'Metadata';
  /** The canonical URL of the web page, used to avoid duplicate content issues. */
  canonical?: Maybe<Scalars['String']['output']>;
  /** A short description of the web page, often used in search engine results and previews. */
  description?: Maybe<Scalars['String']['output']>;
  /** A list of keywords relevant to the web page content. */
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  /** Structured linked data in JSON-LD format for rich search engine results. */
  linkedData?: Maybe<LinkedData>;
  /** The URL of the next page in a paginated series. */
  next?: Maybe<Scalars['URL']['output']>;
  /** Open Graph metadata for social media sharing. */
  openGraph?: Maybe<OpenGraphMetadata>;
  /** The URL of the previous page in a paginated series. */
  prev?: Maybe<Scalars['URL']['output']>;
  /** Robots directives for search engines (e.g., `index, follow`). */
  robots?: Maybe<Scalars['String']['output']>;
  /** The title of the web page, usually displayed in the browser tab and search engines. */
  title: Scalars['String']['output'];
  /** Twitter/X metadata for optimized sharing on the platform. */
  twitter?: Maybe<TwitterMetadata>;
};

/** Root mutation type. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Submit a form. */
  submitForm: SubmitFormResponse;
};


/** Root mutation type. */
export type MutationSubmitFormArgs = {
  formData?: InputMaybe<Array<FormDataEntryInput>>;
  formFiles?: InputMaybe<Array<FormFileEntryInput>>;
  formId: Scalars['ID']['input'];
};

/** A group of multiple fields about the user identity. */
export type NameField = FieldInterface & {
  __typename?: 'NameField';
  /** Second first name. */
  additionalName?: Maybe<TextField>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** First name. */
  firstName?: Maybe<TextField>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** Last name. */
  lastName?: Maybe<TextField>;
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** Honorific prefix options. */
  prefix?: Maybe<SelectField>;
  /** The required indicator of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Honorific suffic text field. */
  suffix?: Maybe<TextField>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Detail of a news. */
export type News = PostInterface & RouteInterface & {
  __typename?: 'News';
  /** Navigation path to the news. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the news. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the news. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** The locations associated to the news. */
  locations: Array<LocationInterface>;
  /** URL to the cartography view. */
  mapUrl?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between news of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the news. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the news. */
  status: PostStatus;
  /** The content of the news, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the news. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the news. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** Detail of a news. */
export type NewsCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Content type that displays news. */
export type NewsBlock = BlockInterface & {
  __typename?: 'NewsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The additional news, at the bottom of the block. */
  briefNews: Array<News>;
  /** The focused news. Fills 100% of the width. */
  focusedNews?: Maybe<News>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The URL to the list view. */
  listUrl?: Maybe<Scalars['String']['output']>;
  /** List of news to display. */
  news: Array<News>;
  /** The URL to the suggestion form. */
  proposeUrl?: Maybe<Scalars['String']['output']>;
  /** Additional links, rendered as tags. */
  tags: Array<Link>;
  /**
   * The title of the block.
   * @deprecated This block title should be defined in FE
   */
  title?: Maybe<Scalars['String']['output']>;
  /**
   * The level of the heading. From 1 to 6.
   * @deprecated This block title level should be always 2
   */
  titleLevel?: Maybe<Scalars['Int']['output']>;
};

/** Defines the field to use to filter a list of news. */
export type NewsFilterInput = {
  /** Get news by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The ids of the news. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get news by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** News list view configuration. */
export type NewsList = RouteInterface & {
  __typename?: 'NewsList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the news list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the news proposition page. */
  proposeUrl?: Maybe<Scalars['String']['output']>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Content type that displays a list of news. */
export type NewsListBlock = BlockInterface & {
  __typename?: 'NewsListBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The level of the item headings. From 1 to 6. */
  itemTitleLevel: Scalars['Int']['output'];
  /** List of news to display. */
  news: Array<News>;
  /** Variant of the block. */
  variant?: Maybe<NewsListBlockVariant>;
};

/** Variants of the news list block. */
export enum NewsListBlockVariant {
  /** Default variant. */
  DEFAULT = 'DEFAULT',
  /** Text variant. */
  TEXT = 'TEXT'
}

/** News map view configuration. */
export type NewsMap = RouteInterface & {
  __typename?: 'NewsMap';
  /** Default center point of the map, when there are no markers. */
  defaultCenter?: Maybe<Coordinates>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** Default zoom level of the map. */
  defaultZoom?: Maybe<Scalars['Float']['output']>;
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Response of a news search query. Contains paginated items. */
export type NewsSearchResponse = {
  __typename?: 'NewsSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<News>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of news. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of news. */
export type NewsSortInput = {
  /** Sort news by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort news by title. */
  title?: InputMaybe<SortDirection>;
};

/** Detail of a newsletter. */
export type Newsletter = PostInterface & RouteInterface & {
  __typename?: 'Newsletter';
  /** Navigation path to the newsletter. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the newsletter. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Sequential number of the newsletter. Starts at 1. */
  incrementId?: Maybe<Scalars['Int']['output']>;
  /** Subtitle of the newsletter. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between newsletters of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the newsletter. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the newsletter. */
  status: PostStatus;
  /** The content of the newsletter, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the newsletter. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the news. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** Detail of a newsletter. */
export type NewsletterCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Configuration used in the newsletter template. */
export type NewsletterConfig = {
  __typename?: 'NewsletterConfig';
  /** Contact message. */
  contactText?: Maybe<Scalars['String']['output']>;
  /** Url to the contact page. */
  contactUrl?: Maybe<Scalars['String']['output']>;
  /** Url to the list newsletter list view. */
  listUrl?: Maybe<Scalars['String']['output']>;
  /** Legal mentions about privacy policy in the newsletter footer. */
  privacyPolicyText?: Maybe<Scalars['HTML']['output']>;
  /** Url to the privacy policy page. */
  privacyPolicyUrl?: Maybe<Scalars['String']['output']>;
  /** Url to the unsubscribe page. */
  unsubscribeUrl?: Maybe<Scalars['String']['output']>;
};

/** Defines the field to use to filter a list of newsletter. */
export type NewsletterFilterInput = {
  /** Get newsletter by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Newsletter list view configuration. */
export type NewsletterList = RouteInterface & {
  __typename?: 'NewsletterList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the news list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Response of a newsletter search query. Contains paginated items. */
export type NewsletterSearchResponse = {
  __typename?: 'NewsletterSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Newsletter>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of newsletters. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of newsletter. */
export type NewsletterSortInput = {
  /** Sort by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort by title. */
  title?: InputMaybe<SortDirection>;
};

/** Number field. */
export type NumberField = FieldInterface & {
  __typename?: 'NumberField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The max attribute of the input. */
  max?: Maybe<Scalars['Int']['output']>;
  /** The min attribute of the input. */
  min?: Maybe<Scalars['Int']['output']>;
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The pattern attribute of the input. */
  pattern?: Maybe<Scalars['String']['output']>;
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/**
 * Number range filter.
 * > Uses a `FilterRangeTypeInput` to send results.
 */
export type NumberRangeFilter = FilterInterface & {
  __typename?: 'NumberRangeFilter';
  /** Name of the targeted attribute. */
  attribute: Scalars['String']['output'];
  /** The decoration to use on both inputs. */
  decoration?: Maybe<Icon>;
  /** Label of the form field. */
  label?: Maybe<Scalars['String']['output']>;
  /** Placeholder of the `max` input. */
  maxPlaceholder?: Maybe<Scalars['String']['output']>;
  /** Placeholder of the `min` input. */
  minPlaceholder?: Maybe<Scalars['String']['output']>;
  /** The decoration in full text format. */
  suffix?: Maybe<Scalars['String']['output']>;
};

/**
 * List of supported types of embeddable content.
 * See https://oembed.com
 */
export enum OEmbedResourceType {
  /** Link type. */
  LINK = 'LINK',
  /** Photo type. */
  PHOTO = 'PHOTO',
  /** Rich type. */
  RICH = 'RICH',
  /** Video type. */
  VIDEO = 'VIDEO'
}

/** Image metadata for Open Graph sharing. */
export type OpenGraphImage = {
  __typename?: 'OpenGraphImage';
  /** A text description of the image for accessibility. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The height in pixels of the Open Graph image. */
  height?: Maybe<Scalars['Int']['output']>;
  /** The MIME type of the image (e.g., image/jpeg, image/png). */
  type?: Maybe<Scalars['String']['output']>;
  /** The URL of the primary image of the page. */
  url?: Maybe<Scalars['URL']['output']>;
  /** The width in pixels of the Open Graph image. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Open Graph metadata for social media previews. */
export type OpenGraphMetadata = {
  __typename?: 'OpenGraphMetadata';
  /** The URL of the author's profile page. */
  author?: Maybe<Scalars['String']['output']>;
  /** A description of the page for Open Graph sharing. */
  description?: Maybe<Scalars['String']['output']>;
  /** The Facebook application ID associated with the website. */
  fbAppId?: Maybe<Scalars['String']['output']>;
  /** An image used when sharing the page on social media. */
  image?: Maybe<OpenGraphImage>;
  /** The page's language/locale (e.g., en_US). */
  locale?: Maybe<Scalars['String']['output']>;
  /** A timestamp of when the page was last modified (ISO 8601 format). */
  modifiedTime?: Maybe<Scalars['String']['output']>;
  /** A timestamp of when the page was published (ISO 8601 format). */
  publishedTime?: Maybe<Scalars['String']['output']>;
  /** The Facebook page URL of the publishing organization. */
  publisher?: Maybe<Scalars['String']['output']>;
  /** The name of the site hosting the content. */
  siteName?: Maybe<Scalars['String']['output']>;
  /** The title of the page for Open Graph sharing. */
  title?: Maybe<Scalars['String']['output']>;
  /** The type of resource (e.g., website, article, video). */
  type?: Maybe<Scalars['String']['output']>;
  /** The canonical URL of the page (or the series root, in the case of paginated content). */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Orientation enum. */
export enum Orientation {
  /** Horizontal orientation. */
  HORIZONTAL = 'HORIZONTAL',
  /** Vertical orientation. */
  VERTICAL = 'VERTICAL'
}

/** Detail of a page. */
export type Page = PostInterface & RouteInterface & {
  __typename?: 'Page';
  /** Navigation path to the page. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the page. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Short description of the page. Multiline. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between posts of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the post. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part of the page. */
  slug: Scalars['String']['output'];
  /** The publication status of the page. */
  status: PostStatus;
  /** The content of the page, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Surtitle of the page. */
  surtitle?: Maybe<Scalars['String']['output']>;
  /** Title of the page. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The URL of the page. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** Detail of a page. */
export type PageCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The pagination information. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The current page of the paginated content. */
  currentPage: Scalars['Int']['output'];
  /** The number of items in each page. */
  pageSize: Scalars['Int']['output'];
  /** The maximum number of pages for the paginated content. */
  totalPages: Scalars['Int']['output'];
};

/** Content type that renders HTML. */
export type ParagraphBlock = BlockInterface & {
  __typename?: 'ParagraphBlock';
  /**
   * Block horizontal alignment.
   * @deprecated Use `textAlign` instead.
   */
  align?: Maybe<Scalars['CSSValue']['output']>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The HTML content of the paragraph. */
  html: Scalars['HTML']['output'];
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Text alignment. */
  textAlign?: Maybe<Scalars['CSSValue']['output']>;
};

/** A phone entry with a connection type. */
export type Phone = {
  __typename?: 'Phone';
  /** Country code in the ISO 3166-1 alpha-2 format. Used in BE to generate the international number. */
  country?: Maybe<Scalars['String']['output']>;
  /** The type of phone device, used in FE to determine an icon indicator and the link protocol. */
  deviceType?: Maybe<PhoneDeviceType>;
  /** The computed international number. */
  internationalNumber: Scalars['String']['output'];
  /** An optional label. */
  label?: Maybe<Scalars['String']['output']>;
  /** The local phone number. */
  number: Scalars['String']['output'];
};

/** The type of phone device attached to the number. */
export enum PhoneDeviceType {
  /** Fax phone device. */
  FAX = 'FAX',
  /** Landline phone device. */
  LANDLINE = 'LANDLINE',
  /** Mobile phone device. */
  MOBILE = 'MOBILE',
  /** Other phone device. */
  OTHER = 'OTHER'
}

/** Phone field. */
export type PhoneField = FieldInterface & {
  __typename?: 'PhoneField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The pattern attribute of the input. */
  pattern?: Maybe<Scalars['String']['output']>;
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** A content type that renders a form. */
export type PollBlock = BlockInterface & {
  __typename?: 'PollBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Deadline of the poll. */
  deadline?: Maybe<Scalars['DateTime']['output']>;
  /** Display vote counts. */
  displayCounts: Scalars['Boolean']['output'];
  /** Display vote percentages. */
  displayPercentages: Scalars['Boolean']['output'];
  /** Whether to display results after submitting the form. */
  displayResultsOnSubmission: Scalars['Boolean']['output'];
  /** The attached form. */
  form?: Maybe<Form>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The display mode of the block. */
  mode: PollBlockMode;
  /** Poll submission results. */
  pollResults: Array<PollOptionResult>;
  /** Total number of votes. */
  voteCount?: Maybe<Scalars['Int']['output']>;
};

/** The display modes of a poll block. */
export enum PollBlockMode {
  /** Render the poll. */
  POLL = 'POLL',
  /** Render results. */
  RESULTS = 'RESULTS'
}

/** A poll option result, returned on the submission of a poll (form). */
export type PollOptionResult = {
  __typename?: 'PollOptionResult';
  /** Label of the voted option */
  optionLabel?: Maybe<Scalars['String']['output']>;
  /** The number of votes for this option. */
  voteCount?: Maybe<Scalars['Int']['output']>;
  /** The percentage of votes for this option (between 0 and 1). */
  votePercentage?: Maybe<Scalars['Float']['output']>;
};

/** A post is a publishable content that is displayed on a website. */
export type PostInterface = {
  /** Navigation path to the post. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the post. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the post. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between posts of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the post. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the post. */
  status: PostStatus;
  /** The content of the post, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the post. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the post. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** A post is a publishable content that is displayed on a website. */
export type PostInterfaceCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The statuses of a post. */
export enum PostStatus {
  /** Draft status. */
  DRAFT = 'DRAFT',
  /** Pending status. */
  PENDING = 'PENDING',
  /** Private status. */
  PRIVATE = 'PRIVATE',
  /** Published status. */
  PUBLISHED = 'PUBLISHED'
}

/**
 * Content type that displays abstract posts.
 * *Used in newsletter.*
 */
export type PostsBlock = BlockInterface & {
  __typename?: 'PostsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of posts to display. */
  items: Array<PostsBlockItem>;
  /** The title of the block. */
  title?: Maybe<Scalars['String']['output']>;
};

/**
 * An abstract post model.
 * *Used in newsletter.*
 */
export type PostsBlockItem = {
  __typename?: 'PostsBlockItem';
  /** Images of the post. */
  images?: Maybe<ImageCollection>;
  /** Short description of the post. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Surtitle of the post. */
  surtitle?: Maybe<Scalars['String']['output']>;
  /** Title of the post. */
  title?: Maybe<Scalars['String']['output']>;
  /** URL of the post. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Displays a banner with some square links at the bottom. */
export type ProjectsBlock = BlockInterface & {
  __typename?: 'ProjectsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Content section. */
  content?: Maybe<ProjectsBlockContent>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** URL of the image in the image part. */
  image?: Maybe<Image>;
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of projects items. */
  items: Array<ProjectsBlockItem>;
  /** Visual variations of the block. */
  variant?: Maybe<ProjectsBlockVariant>;
};

/** Content section of the projects block. */
export type ProjectsBlockContent = {
  __typename?: 'ProjectsBlockContent';
  /** Description of the content section. */
  description?: Maybe<Scalars['String']['output']>;
  /** Surtitle of the content section. */
  surtitle?: Maybe<Scalars['String']['output']>;
  /** Title of the content section. */
  title?: Maybe<Scalars['String']['output']>;
  /** URL of the `Read more` link. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Item displayed under the project content. */
export type ProjectsBlockItem = {
  __typename?: 'ProjectsBlockItem';
  /** The color of the block. */
  color?: Maybe<ProjectsBlockItemColor>;
  /** Short description of the item. */
  description?: Maybe<Scalars['String']['output']>;
  /** Icon of the item. */
  icon?: Maybe<Icon>;
  /** Title of the item. */
  title?: Maybe<Scalars['String']['output']>;
  /** Url for the item. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Color of a projects block item. */
export enum ProjectsBlockItemColor {
  /** Primary color. */
  PRIMARY = 'PRIMARY',
  /** Secondary color. */
  SECONDARY = 'SECONDARY',
  /** Tertiary color. */
  TERTIARY = 'TERTIARY'
}

/** Visual variations of the projects block. */
export enum ProjectsBlockVariant {
  /** Content is placed next to the image in the hero section of the block. */
  ASIDE = 'ASIDE',
  /** The default visual mode of the block. */
  DEFAULT = 'DEFAULT',
  /** Content is placed above the image, in a card. */
  HERO = 'HERO'
}

/** Detail of a publication. */
export type Publication = PostInterface & RouteInterface & {
  __typename?: 'Publication';
  /** Navigation path to the publication. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The total number of files. */
  fileCount?: Maybe<Scalars['Int']['output']>;
  /** The list of attached files. */
  files: Array<File>;
  /** ID of the publication. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the publication. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between publications of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the publication. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the publication. */
  status: PostStatus;
  /** The content of the publication, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Subtitle of the publication. */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title of the publication. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The URL of the publication. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** Detail of a publication. */
export type PublicationCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Defines the field to use to filter a list of publications. */
export type PublicationFilterInput = {
  /** Get publications by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The ids of the publications. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get publications by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Publication list view configuration. */
export type PublicationList = RouteInterface & {
  __typename?: 'PublicationList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the publication list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The URL of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Response of a publication search query. Contains paginated items. */
export type PublicationSearchResponse = {
  __typename?: 'PublicationSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Publication>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of publications. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of publications. */
export type PublicationSortInput = {
  /** Sort publications by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort publications by title. */
  title?: InputMaybe<SortDirection>;
};

/** Content type that displays publications. */
export type PublicationsBlock = BlockInterface & {
  __typename?: 'PublicationsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The URL to the list view. */
  listUrl?: Maybe<Scalars['String']['output']>;
  /** List of publications to display. */
  publications: Array<Publication>;
  /**
   * The title of the block.
   * @deprecated This block title should be defined in FE
   */
  title?: Maybe<Scalars['String']['output']>;
  /**
   * The level of the heading. From 1 to 6.
   * @deprecated This block title level should be always 2
   */
  titleLevel?: Maybe<Scalars['Int']['output']>;
  /** Variants of the block */
  variant?: Maybe<PublicationsBlockVariant>;
};

/** Publications block variants. */
export enum PublicationsBlockVariant {
  /** Render as a carousel. */
  CAROUSEL = 'CAROUSEL',
  /** Render as a list. */
  DEFAULT = 'DEFAULT'
}

/** Content type that displays a list of publications. */
export type PublicationsListBlock = BlockInterface & {
  __typename?: 'PublicationsListBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The level of the heading. From 1 to 6. */
  itemTitleLevel: Scalars['Int']['output'];
  /** List of publications to display. */
  publications: Array<Publication>;
};

/** Root query. */
export type Query = {
  __typename?: 'Query';
  /** Search for addresses. */
  addressSearch: AddressSearchResponse;
  /** Get a single album. */
  album?: Maybe<Album>;
  /** Search for a list of album. Used in the list view. */
  albumSearch: AlbumSearchResponse;
  /** Get a single alert. */
  alert?: Maybe<Alert>;
  /** Search for a list of alerts. */
  alertSearch: AlertSearchResponse;
  /**
   * Retrieve the administration bar configuration.
   * Returns `NULL` if not available (user not authenticated, disabled by user, etc...)
   */
  barConfig?: Maybe<BarConfig>;
  /** Get a single comarquage. */
  comarquage?: Maybe<Comarquage>;
  /** Get a single comment. */
  comment?: Maybe<Comment>;
  /** Search for a list of comments. */
  commentSearch: CommentSearchResponse;
  /** Get a single directory. */
  directory?: Maybe<Directory>;
  /** Organigram for a list of directories. Used in the list view with `listMode` set to `ORGANIGRAM`. */
  directoryOrganigram: DirectoryOrganigramResponse;
  /** Search for a list of directory. Used in the list view. */
  directorySearch: DirectorySearchResponse;
  /** Get a single event. */
  event?: Maybe<Event>;
  /** Search for a list of events. Used in the list view. */
  eventSearch: EventSearchResponse;
  /** The extranet bar. Returns NULL if the user is not logged in. */
  extranetBar?: Maybe<ExtranetBar>;
  /** Get a single flash info. */
  flashInfo?: Maybe<FlashInfo>;
  /** Search for a list of flash infos. */
  flashInfoSearch: FlashInfoSearchResponse;
  /** Convert a human-readable address into geographic coordinates */
  geocode?: Maybe<Coordinates>;
  /** Get a single job offer. */
  jobOffer?: Maybe<JobOffer>;
  /** Search for a list of job offers. Used in the list view. */
  jobOfferSearch: JobOfferSearchResponse;
  /** The live search query returns pre-defined groups of contents. */
  liveSearch?: Maybe<LiveSearchResponse>;
  /** Get a menu tree. */
  menu?: Maybe<Menu>;
  /** Get a single news. */
  news?: Maybe<News>;
  /** Search for a list of news. Used in the list view. */
  newsSearch: NewsSearchResponse;
  /** Get a single newsletter. */
  newsletter?: Maybe<Newsletter>;
  /** Search for a list of newsletter. Used in the list view. */
  newsletterSearch: NewsletterSearchResponse;
  /** Get a single page. */
  page?: Maybe<Page>;
  /** Get a single publication. */
  publication?: Maybe<Publication>;
  /** Search for a list of publication. Used in the list view. */
  publicationSearch: PublicationSearchResponse;
  /** Search for a list of question. Used in the FAQ view. */
  questionSearch: QuestionSearchResponse;
  /** Get a single municipal council resolution. */
  resolution?: Maybe<Resolution>;
  /** Search for a list of resolution. Used in the list view. */
  resolutionSearch: ResolutionSearchResponse;
  /** Convert geographic coordinates into a human-readable address */
  reverseGeocode?: Maybe<Address>;
  /**
   * Request a routable object from its url pathname.
   * Returns `null` if no resource is found.
   */
  route?: Maybe<RouteInterface>;
  /** The global search query aggregates all types of content. */
  search?: Maybe<GlobalSearchResponse>;
  /** Retrieve the configuration of the website. */
  siteConfig?: Maybe<SiteConfig>;
};


/** Root query. */
export type QueryAddressSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<AddressSearchFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryAlbumArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryAlbumSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<AlbumFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<AlbumSortInput>;
};


/** Root query. */
export type QueryAlertArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryAlertSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryBarConfigArgs = {
  url?: InputMaybe<Scalars['URL']['input']>;
};


/** Root query. */
export type QueryComarquageArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryCommentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryCommentSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<CommentSortInput>;
};


/** Root query. */
export type QueryDirectoryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryDirectoryOrganigramArgs = {
  filter?: InputMaybe<DirectoryFilterInput>;
  flatten?: InputMaybe<Scalars['Boolean']['input']>;
  sectionSize?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryDirectorySearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<DirectoryFilterInput>;
  hasCoordinates?: InputMaybe<Scalars['Boolean']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<DirectorySortInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryEventArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryEventSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<EventFilterInput>;
  hasCoordinates?: InputMaybe<Scalars['Boolean']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<EventSortInput>;
};


/** Root query. */
export type QueryFlashInfoArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryFlashInfoSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryGeocodeArgs = {
  address: Scalars['String']['input'];
};


/** Root query. */
export type QueryJobOfferArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryJobOfferSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<JobOfferFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<JobOfferSortInput>;
};


/** Root query. */
export type QueryLiveSearchArgs = {
  filter?: InputMaybe<LiveSearchFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


/** Root query. */
export type QueryMenuArgs = {
  position: Scalars['String']['input'];
};


/** Root query. */
export type QueryNewsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryNewsSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<NewsFilterInput>;
  hasCoordinates?: InputMaybe<Scalars['Boolean']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<NewsSortInput>;
};


/** Root query. */
export type QueryNewsletterArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryNewsletterSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<NewsletterFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<NewsletterSortInput>;
};


/** Root query. */
export type QueryPageArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryPublicationArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryPublicationSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<PublicationFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<PublicationSortInput>;
};


/** Root query. */
export type QueryQuestionSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<QuestionFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<QuestionSortInput>;
};


/** Root query. */
export type QueryResolutionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Root query. */
export type QueryResolutionSearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ResolutionFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ResolutionSortInput>;
};


/** Root query. */
export type QueryReverseGeocodeArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


/** Root query. */
export type QueryRouteArgs = {
  url?: InputMaybe<Scalars['URL']['input']>;
};


/** Root query. */
export type QuerySearchArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<GlobalSearchFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<GlobalSearchSortInput>;
};

/** Detail of a question. */
export type Question = PostInterface & RouteInterface & {
  __typename?: 'Question';
  /** Navigation path to the question. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** ID of the question. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** Subtitle of the question. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between question of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the question. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the question. */
  status: PostStatus;
  /** The content of the question, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Title of the question. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the question. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** Detail of a question. */
export type QuestionCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Defines the field to use to filter a list of question. */
export type QuestionFilterInput = {
  /** Get questions by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The id of the question. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get questions by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** question list view configuration. */
export type QuestionList = RouteInterface & {
  __typename?: 'QuestionList';
  /** The URL to the ask question page. */
  askUrl?: Maybe<Scalars['String']['output']>;
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the question list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Response of a question search query. Contains paginated items. */
export type QuestionSearchResponse = {
  __typename?: 'QuestionSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Question>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of questions. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of question. */
export type QuestionSortInput = {
  /** Sort questions by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort questions by title. */
  title?: InputMaybe<SortDirection>;
};

/** A list of clickable buttons, with a side section. */
export type QuickAccessButtonsBlock = BlockInterface & {
  __typename?: 'QuickAccessButtonsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The focus section of the block, that contains text and a button. */
  focus?: Maybe<QuickAccessButtonsBlockFocus>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of links. */
  items: Array<Link>;
};

/** An highlighted section or button, next to the quick access items. */
export type QuickAccessButtonsBlockFocus = {
  __typename?: 'QuickAccessButtonsBlockFocus';
  /** Description of the section. */
  description?: Maybe<Scalars['String']['output']>;
  /** Icon of the section. */
  icon?: Maybe<Icon>;
  /** Title of the section. */
  title: Scalars['String']['output'];
  /** URL of the clickable section. */
  url: Scalars['String']['output'];
};

/** A list of clickable buttons, with a side section. */
export type QuickAccessCarouselBlock = BlockInterface & {
  __typename?: 'QuickAccessCarouselBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The focus section of the block, that contains text and a button. */
  focus?: Maybe<QuickAccessCarouselBlockFocus>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of links. */
  items: Array<Link>;
};

/** An highlighted button, next to the quick access items. */
export type QuickAccessCarouselBlockFocus = {
  __typename?: 'QuickAccessCarouselBlockFocus';
  /** Icon of the section. */
  icon?: Maybe<Icon>;
  /** Title of the section. */
  title: Scalars['String']['output'];
  /** URL of the clickable section. */
  url: Scalars['String']['output'];
};

/** Content type for a `<quote>` element. */
export type QuoteBlock = BlockInterface & {
  __typename?: 'QuoteBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The HTML of the source. */
  sourceHTML: Scalars['HTML']['output'];
  /** Text alignment. */
  textAlign?: Maybe<Scalars['CSSValue']['output']>;
};

/** The global RGAA configuration. */
export type RgaaConfig = {
  __typename?: 'RGAAConfig';
  /** The link to the accessibility statement. */
  statementUrl?: Maybe<Scalars['String']['output']>;
  /** Accessibility compliance level. */
  status: RgaaStatus;
};

/** The accessibility level of the website. */
export enum RgaaStatus {
  /** Fully compliant. */
  COMPLIANT = 'COMPLIANT',
  /** Not compliant. */
  NON_COMPLIANT = 'NON_COMPLIANT',
  /** Do not show in FE. */
  NO_DISPLAY = 'NO_DISPLAY',
  /** Partially compliant. */
  PARTIAL = 'PARTIAL'
}

/** Radio field. */
export type RadioField = FieldInterface & {
  __typename?: 'RadioField';
  /** The available choices. */
  choices: Array<Choice>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** If enabled, add an additional option with a text input. */
  other?: Maybe<TextField>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** The ReCaptcha field. See the [documentation](https://developers.google.com/recaptcha/docs/v3?hl=fr). */
export type ReCaptchaField = FieldInterface & {
  __typename?: 'ReCaptchaField';
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The description of the fieldset legend. */
  description?: Maybe<Scalars['String']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The display mode of the field. */
  mode: ReCaptchaMode;
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The public API site key. */
  siteKey: Scalars['String']['output'];
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
  /** The version of reCaptcha used. */
  version: Scalars['Int']['output'];
};

/** The rendering mode of reCaptcha v2. */
export enum ReCaptchaMode {
  /** The checkbox mode. */
  CHECKBOX = 'CHECKBOX',
  /** The invisible mode. */
  INVISIBLE = 'INVISIBLE'
}

/** The redirect object that is caught by the middleware. */
export type Redirect = RouteInterface & {
  __typename?: 'Redirect';
  /** The metadata of the resource (title, description, etc.). Usually `null` in this case. */
  metadata?: Maybe<Metadata>;
  /** The redirection HTTP code. (e.g 301) */
  redirectCode?: Maybe<Scalars['Int']['output']>;
  /** The url to redirect to if necessary. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** A resolution (e.g. municipal council resolution) is a publication with an issue date. */
export type Resolution = PostInterface & RouteInterface & {
  __typename?: 'Resolution';
  /** Navigation path to the resolution. */
  breadcrumbs: Breadcrumbs;
  /** The list of attached categories. */
  categories: Array<Category>;
  /**
   * Whenever a comment can be posted on this post.
   * Returns `null` if the comment feature is not enabled.
   */
  commentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The total number of files. */
  fileCount: Scalars['Int']['output'];
  /** The list of attached files. */
  files: Array<File>;
  /** ID of the resolution. */
  id: Scalars['Int']['output'];
  /** The collection of images of different sizes. */
  images?: Maybe<ImageCollection>;
  /** The issue date of the resolution. */
  issueDate?: Maybe<Scalars['DateTime']['output']>;
  /** Subtitle of the resolution. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The last modification date. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Bottom navigation between resolution of the list view. */
  pager?: Maybe<ContentPager>;
  /** The publication date of the resolution. */
  publicationDate?: Maybe<Scalars['DateTime']['output']>;
  /** The url part for this post. */
  slug: Scalars['String']['output'];
  /** The publication status of the resolution. */
  status: PostStatus;
  /** The content of the resolution, as a block tree. */
  structuredContent?: Maybe<Scalars['StructuredContent']['output']>;
  /** Surtitle of the resolution. */
  surtitle?: Maybe<Scalars['String']['output']>;
  /** Title of the resolution. */
  title?: Maybe<Scalars['String']['output']>;
  /** Human readable single entity name. */
  typeLabel?: Maybe<Scalars['String']['output']>;
  /** The url of the resolution. */
  url?: Maybe<Scalars['URL']['output']>;
};


/** A resolution (e.g. municipal council resolution) is a publication with an issue date. */
export type ResolutionCategoriesArgs = {
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Defines the field to use to filter a list of resolution. */
export type ResolutionFilterInput = {
  /** Get resolutions by category. */
  category?: InputMaybe<FilterEqualTypeInput>;
  /** The ids of the resolution. */
  id?: InputMaybe<FilterEqualTypeInput>;
  /** Get resolutions by issue year. */
  issueYear?: InputMaybe<FilterEqualTypeInput>;
  /** Get resolutions by publication date. */
  publicationDate?: InputMaybe<FilterRangeTypeInput>;
  /** Full text search. */
  text?: InputMaybe<FilterMatchTypeInput>;
};

/** Resolution list view configuration. */
export type ResolutionList = RouteInterface & {
  __typename?: 'ResolutionList';
  /** URL of the image to be displayed in the background. */
  backgroundImage?: Maybe<Image>;
  /** Navigation items. */
  breadcrumbs?: Maybe<Breadcrumbs>;
  /** The default page size in the list view. */
  defaultPageSize: Scalars['Int']['output'];
  /** The available filters. */
  filters: Array<FilterInterface>;
  /** Subtitle of the resolution list page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Web page metadata. */
  metadata?: Maybe<Metadata>;
  /** The URL to the RSS feed. */
  rssUrl?: Maybe<Scalars['String']['output']>;
  /** The full text search filter. */
  searchFilter?: Maybe<FilterInterface>;
  /** The title of the list page. */
  title: Scalars['String']['output'];
  /** The url of the list view. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Response of a resolution search query. Contains paginated items. */
export type ResolutionSearchResponse = {
  __typename?: 'ResolutionSearchResponse';
  /** Filters related to current search results. */
  filters: Array<FilterInterface>;
  /** Search results. */
  items: Array<Resolution>;
  /** Pagination information. */
  pageInfo: PageInfo;
  /** The total number of resolution. */
  totalCount: Scalars['Int']['output'];
};

/** Defines the field to use to sort a list of resolution. */
export type ResolutionSortInput = {
  /** Sort resolutions by issue date. */
  issueDate?: InputMaybe<SortDirection>;
  /** Sort resolutions by publication date. */
  publicationDate?: InputMaybe<SortDirection>;
  /** Sort resolutions by title. */
  title?: InputMaybe<SortDirection>;
};

/** Interface for resources that can be reached by a URL. */
export type RouteInterface = {
  /** The metadata of the resource (title, description, etc.). */
  metadata?: Maybe<Metadata>;
  /** The URL to the resource. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** Global search popup configuration. */
export type SearchPopupConfig = {
  __typename?: 'SearchPopupConfig';
  /** The full-text filter attribute name. */
  attribute: Scalars['String']['output'];
  /** If enabled, shows live search results. */
  liveSearch?: Maybe<Scalars['Boolean']['output']>;
  /**
   * List of configured post types.
   * @deprecated Use `liveSearch` query instead of building it manually.
   */
  liveSearchItems: Array<LiveSearchItemConfig>;
  /** Number of items to show for each post types. */
  liveSearchPageSize?: Maybe<Scalars['Int']['output']>;
};

/** Currently only a **single** select is supported. */
export type SelectField = FieldInterface & {
  __typename?: 'SelectField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** The options of the select input. */
  choices: Array<Choice>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The placeholder of the select, if supported by the FE component. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/**
 * Select filter.
 * > Uses a `FilterEqualTypeInput ` to send results.
 */
export type SelectFilter = FilterInterface & {
  __typename?: 'SelectFilter';
  /** Name of the targeted attribute. */
  attribute: Scalars['String']['output'];
  /** Label of the form field. */
  label?: Maybe<Scalars['String']['output']>;
  /** Does this filter accepts multiple values? */
  multiple?: Maybe<Scalars['Boolean']['output']>;
  /** List of available options to choose from. */
  options: Array<SelectFilterOption>;
  /** Acts as the `All options selected` empty option. */
  placeholder?: Maybe<Scalars['String']['output']>;
};

/** An option of the select filter. */
export type SelectFilterOption = {
  __typename?: 'SelectFilterOption';
  /**
   * The select filter option can contains others, like a tree.
   * Usually, when the option is selected, all its children are selected as well.
   */
  children: Array<SelectFilterOption>;
  /** The number of matches for this term. */
  count?: Maybe<Scalars['Int']['output']>;
  /** The label of the option. */
  label?: Maybe<Scalars['String']['output']>;
  /** The value of the option. */
  value: Scalars['String']['output'];
};

/** A separator field, as an horizontal line. */
export type SeparatorField = FieldInterface & {
  __typename?: 'SeparatorField';
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name of the field. */
  name: Scalars['String']['output'];
  /** The required indicator of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Global configuration of the website. */
export type SiteConfig = {
  __typename?: 'SiteConfig';
  /** The accessibility parameters configuration. */
  accessibilityConfig?: Maybe<AccessibilityConfig>;
  /** Comment configuration. */
  comment?: Maybe<CommentConfig>;
  /** Url to the contact page. */
  contactUrl?: Maybe<Scalars['String']['output']>;
  /** Extranet configuration. */
  extranet?: Maybe<ExtranetConfig>;
  /** Website favicon. */
  favicon?: Maybe<Scalars['URL']['output']>;
  /** The footer configuration data. */
  footer?: Maybe<FooterConfig>;
  /** The Google Translate configuration data. */
  googleTranslate: GoogleTranslateConfig;
  /** The header configuration data. */
  header: HeaderConfig;
  /** The logo of the website. */
  logo?: Maybe<Image>;
  /** Links to the full-page cartographies. */
  mapLinks: Array<Link>;
  /** Newsletter configuration and links. */
  newsletter?: Maybe<NewsletterConfig>;
  /** List of partners links. */
  partners: Array<Link>;
  /** Url to the privacy policy page. */
  privacyPolicyUrl?: Maybe<Scalars['String']['output']>;
  /** RGAA configuration data. */
  rgaa?: Maybe<RgaaConfig>;
  /** Url to the search page. */
  searchPage: Scalars['URL']['output'];
  /** The global search popup config. */
  searchPopup?: Maybe<SearchPopupConfig>;
  /** The name of the website. */
  siteName: Scalars['String']['output'];
  /** Url to the sitemap page. */
  sitemapUrl?: Maybe<Scalars['String']['output']>;
  /** List of social networks links. */
  socialLinks: Array<SocialLink>;
  /** Displays buttons to share the current page on social networks. */
  socialShare: Scalars['Boolean']['output'];
  /** Verification codes for webmaster tools and search engine ownership validation. */
  verificationCodes: Array<VerificationCode>;
};

/** A content type that renders a sitemap. */
export type SitemapBlock = BlockInterface & {
  __typename?: 'SitemapBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Sitemap entries. */
  sitemap: Array<SitemapEntry>;
};

/** An entry of the sitemap tree. */
export type SitemapEntry = {
  __typename?: 'SitemapEntry';
  /** A sitemap enty can contain others. */
  children: Array<SitemapEntry>;
  /** Level in the sitemap. */
  level: Scalars['Int']['output'];
  /** Title of the entry. */
  title: Scalars['String']['output'];
  /** The URL of the sitemap entry. Can be absolute or relative. */
  url: Scalars['URL']['output'];
};

/** A link to a social network. */
export type SocialLink = LinkInterface & {
  __typename?: 'SocialLink';
  /** The social network of the link. */
  network: SocialNetwork;
  /** The text of the link. */
  text: Scalars['String']['output'];
  /** The url of the link. */
  url: Scalars['URL']['output'];
};

/** List of the available social networks. */
export enum SocialNetwork {
  /** Facebook social network. */
  FACEBOOK = 'FACEBOOK',
  /** Instagram social network. */
  INSTAGRAM = 'INSTAGRAM',
  /** LinkedIn social network. */
  LINKEDIN = 'LINKEDIN',
  /** Twitter social network. */
  TWITTER = 'TWITTER',
  /** YouTube social network. */
  YOUTUBE = 'YOUTUBE'
}

/** The direction of the sorting. */
export enum SortDirection {
  /** Ascending. */
  ASC = 'ASC',
  /** Descending. */
  DESC = 'DESC'
}

/** The response of the form submit. */
export type SubmitFormResponse = {
  __typename?: 'SubmitFormResponse';
  /** Submitted comment. */
  comment?: Maybe<Comment>;
  /** List of errors, if any. */
  errors: Array<FormError>;
  /** The success message of the response. */
  message?: Maybe<Scalars['String']['output']>;
  /** Poll submission results. */
  pollResults: Array<PollOptionResult>;
  /** If the redirect code is `0`, do not redirect. */
  redirectCode?: Maybe<Scalars['Int']['output']>;
  /** The URL to redirect to. */
  relativeUrl?: Maybe<Scalars['String']['output']>;
  /** The status of the response. */
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** The summary block displays the sub-pages of a page element. */
export type SummaryBlock = BlockInterface & {
  __typename?: 'SummaryBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Item title level. From 1 to 6. */
  itemTitleLevel?: Maybe<Scalars['Int']['output']>;
  /** List of pages to display. */
  items: Array<SummaryBlockItem>;
  /** Variant of the summary block. */
  variant: SummaryBlockVariant;
};

/** An abstract post model. */
export type SummaryBlockItem = {
  __typename?: 'SummaryBlockItem';
  /** Images of the page. */
  images?: Maybe<ImageCollection>;
  /** Short description of the page. */
  leadText?: Maybe<Scalars['String']['output']>;
  /** Title of the page. */
  title?: Maybe<Scalars['String']['output']>;
  /** URL of the page. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Variant of the summary block. */
export enum SummaryBlockVariant {
  /** Default variant. */
  DEFAULT = 'DEFAULT',
  /** Text variant. */
  TEXT = 'TEXT'
}

/** Tab content type. */
export type TabBlock = BlockInterface & {
  __typename?: 'TabBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The title of the tabpanel. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Content type that renders a table. */
export type TableBlock = BlockInterface & {
  __typename?: 'TableBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** The caption of the table. */
  caption?: Maybe<Scalars['String']['output']>;
  /** The data in the table. */
  cells: Array<Array<TableCell>>;
  /** The alignment of each column. */
  columnAlign: Array<Scalars['String']['output']>;
  /** Whether the first column should be treated as row headings. */
  firstColumnHeader: Scalars['Boolean']['output'];
  /** Whether the table has fixed-width columns. */
  fixedLayout: Scalars['Boolean']['output'];
  /** The HTML of the footer cells of the table. */
  footer: Array<TableCell>;
  /** The HTML of the header cells of the table. */
  header: Array<TableCell>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** Table cell content. */
export type TableCell = {
  __typename?: 'TableCell';
  /** Span on columns. */
  colspan?: Maybe<Scalars['Int']['output']>;
  /** HTML content of the table cell. */
  html: Scalars['HTML']['output'];
  /** Span on rows. */
  rowspan?: Maybe<Scalars['Int']['output']>;
};

/** Content type that orchestrates `TabBlock` items. */
export type TabsBlock = BlockInterface & {
  __typename?: 'TabsBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** Tabs stacking direction. */
  orientation: Orientation;
};

/** Content type that displays information about a territory or a region. */
export type TerritoryImageBlock = BlockInterface & {
  __typename?: 'TerritoryImageBlock';
  /** The main action, usually a primary button that redirect to a fullscreen map. */
  action?: Maybe<Link>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Additional buttons. */
  buttons: Array<Link>;
  /** Lead text in the block. */
  description?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** The image to display when non interactive. */
  image?: Maybe<Image>;
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
};

/** A map that displays a SVG with interactible regions. */
export type TerritorySvgBlock = BlockInterface & {
  __typename?: 'TerritorySvgBlock';
  /** The main action, usually a primary button that redirect to a fullscreen map. */
  action?: Maybe<Link>;
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** Additional buttons. */
  buttons: Array<Link>;
  /** Lead text in the block. */
  description?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** The list of slots to attach to the SVG paths. */
  slots: TerritorySvgBlockNamedSlots;
};

/**
 * The list of slots of the map.
 * Each slot corresponds to a certain region on the SVG.
 */
export type TerritorySvgBlockNamedSlots = {
  __typename?: 'TerritorySvgBlockNamedSlots';
  /** *This is an example because a type cannot be empty.* */
  foo?: Maybe<TerritorySvgBlockSlot>;
};

/** A slot is an entry to render on the SVG map. */
export type TerritorySvgBlockSlot = {
  __typename?: 'TerritorySvgBlockSlot';
  /** The identifier of the slot. */
  id: Scalars['ID']['output'];
  /** The title, used for screen readers and tooltip. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL to the resource. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Textarea field. */
export type TextAreaField = FieldInterface & {
  __typename?: 'TextAreaField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The pattern attribute of the input. */
  pattern?: Maybe<Scalars['String']['output']>;
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** The size of the textarea, defines the number of rows. */
  size?: Maybe<FieldSize>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
  /** Enable RTE. */
  wysiwyg?: Maybe<Scalars['Boolean']['output']>;
};

/** A basic text input. */
export type TextField = FieldInterface & {
  __typename?: 'TextField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The pattern attribute of the input. */
  pattern?: Maybe<Scalars['String']['output']>;
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required attribute of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Input type. */
  type?: Maybe<Scalars['String']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/**
 * Full text search filter.
 * > Uses a `FilterMatchTypeInput ` to send results.
 */
export type TextFilter = FilterInterface & {
  __typename?: 'TextFilter';
  /** Name of the targeted attribute. */
  attribute: Scalars['String']['output'];
  /** Label of the form field. */
  label?: Maybe<Scalars['String']['output']>;
};

/** Time field. */
export type TimeField = FieldInterface & {
  __typename?: 'TimeField';
  /** The autocomplete attribute of the input. */
  autocomplete?: Maybe<Scalars['String']['output']>;
  /** Custom CSS classes. */
  className?: Maybe<Scalars['String']['output']>;
  /** Number of columns. Up to 12. */
  columnSpan?: Maybe<Scalars['Int']['output']>;
  /** The optional display condition. */
  condition?: Maybe<Condition>;
  /** The value attribute of the input. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  /** Short description of the field. */
  description?: Maybe<Scalars['String']['output']>;
  /** The format of the time field, using 12h or 24h. */
  format: TimeFormat;
  /** Hide the input if TRUE. */
  hidden?: Maybe<Scalars['Boolean']['output']>;
  /** The hours input. */
  hours?: Maybe<NumberField>;
  /** Label of the field. */
  label: Scalars['String']['output'];
  /** The AM/PM select, if enabled in BE. */
  meridiem?: Maybe<SelectField>;
  /** The minutes input. */
  minutes?: Maybe<NumberField>;
  /** The name attribute of the input. */
  name: Scalars['String']['output'];
  /** The pattern attribute of the input. */
  pattern?: Maybe<Scalars['String']['output']>;
  /** The placeholder attribute of the input. */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** The required indicator of the field. */
  required?: Maybe<Scalars['Boolean']['output']>;
  /** Custom validation message. */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

/** Enum to define the time format. */
export enum TimeFormat {
  /** Uses the 12h time format, with AM/PM. */
  H12 = 'H12',
  /** Uses the 24h time format. */
  H24 = 'H24'
}

/** Twitter/X metadata for social sharing. */
export type TwitterMetadata = {
  __typename?: 'TwitterMetadata';
  /** The card type used for the page preview (e.g., `summary_large_image`). */
  card?: Maybe<Scalars['String']['output']>;
  /** The X (Twitter) handle of the content author. */
  creator?: Maybe<Scalars['String']['output']>;
  /** The description of the page for sharing on X. */
  description?: Maybe<Scalars['String']['output']>;
  /** The URL of the primary image for sharing on X. */
  image?: Maybe<Scalars['String']['output']>;
  /** The X (Twitter) handle of the site owner/operator. */
  site?: Maybe<Scalars['String']['output']>;
  /** The title of the page for sharing on X. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A user that has access to the BE. */
export type User = {
  __typename?: 'User';
  /** Avatar image URL. */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Display name fo the user. */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The URL to edit the user's profile. */
  editProfileUrl?: Maybe<Scalars['String']['output']>;
  /** The groups the user belongs to. */
  groups: Array<UserGroup>;
  /** A unique identifier. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The roles the user has. */
  roles: Array<UserRole>;
};

/** A group of users. */
export type UserGroup = {
  __typename?: 'UserGroup';
  /** The description of the group. */
  description?: Maybe<Scalars['String']['output']>;
  /** A unique identifier. */
  id: Scalars['ID']['output'];
  /** The URL to the group's landing page. */
  landingPageUrl?: Maybe<Scalars['String']['output']>;
  /** The name of the group. */
  name?: Maybe<Scalars['String']['output']>;
  /** The users in the group. */
  users: Array<User>;
};

/**
 * A form to submit a user's credentials.
 * This **should** work gracefully since we pass `credentials: "include"` to the fetch API.
 */
export type UserLoginForm = FormInterface & {
  __typename?: 'UserLoginForm';
  /** The URL to the forgot password page. */
  forgotPasswordUrl?: Maybe<Scalars['String']['output']>;
  /** The form fields. */
  formFields?: Maybe<UserLoginFormFields>;
  /** The id of the form, used in the submit process. */
  id: Scalars['ID']['output'];
  /** The submit action button. */
  submitButton: FormAction;
  /** Title of the form. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The fields of the login form. */
export type UserLoginFormFields = {
  __typename?: 'UserLoginFormFields';
  /** The captcha field. */
  captcha?: Maybe<CaptchaField>;
  /** The password field. */
  password?: Maybe<TextField>;
  /** The URL to redirect to upon successful authentication. */
  redirectTo?: Maybe<TextField>;
  /** Remember me checkbox. */
  rememberMe?: Maybe<CheckboxField>;
  /** The username field. */
  username?: Maybe<TextField>;
};

/** A role of a user. */
export type UserRole = {
  __typename?: 'UserRole';
  /** A unique identifier. */
  id: Scalars['ID']['output'];
  /** The name of the role. */
  name?: Maybe<Scalars['String']['output']>;
  /** The users with this role. */
  users: Array<User>;
};

/** A verification code for a webmaster tool or search engine. */
export type VerificationCode = {
  __typename?: 'VerificationCode';
  /** The code value provided by the platform. */
  code: Scalars['String']['output'];
  /** The platform/site requiring the verification code. */
  site: VerificationCodeSite;
};

/** Supported platforms for verification codes. */
export enum VerificationCodeSite {
  /** Baidu verification code. */
  BAIDU = 'BAIDU',
  /** Bing verification code. */
  BING = 'BING',
  /** Google verification code. */
  GOOGLE = 'GOOGLE',
  /** Pinterest verification code. */
  PINTEREST = 'PINTEREST',
  /** Yandex verification code. */
  YANDEX = 'YANDEX'
}

/** The video type carries all the necessary data for a video. */
export type Video = {
  __typename?: 'Video';
  /** A short caption describing the video. */
  caption?: Maybe<Scalars['String']['output']>;
  /** Estimated duration of the video, in seconds. */
  duration?: Maybe<Scalars['Int']['output']>;
  /** The content type of the video. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The name of the video service provider. Is NULL if the video is not issued by an external provider. */
  provider?: Maybe<Scalars['String']['output']>;
  /** The size of the file in Bytes. */
  size?: Maybe<Scalars['Int']['output']>;
  /** The thumbnail issued by the service provider. */
  thumbnail?: Maybe<Image>;
  /** The URL to the resource. */
  url: Scalars['String']['output'];
};

/** Displays a carousel of websites with image, title and descriptions. */
export type WebsitesBlock = BlockInterface & {
  __typename?: 'WebsitesBlock';
  /** The ID attribute of the element. */
  anchor?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this block. */
  id: Scalars['ID']['output'];
  /** A content block can wrap others. */
  innerBlocks: Array<BlockInterface>;
  /** List of websites. */
  items: Array<WebsitesBlockItem>;
};

/** An abstract post model. */
export type WebsitesBlockItem = {
  __typename?: 'WebsitesBlockItem';
  /** Images of the website. */
  images: ImageCollection;
  /** Short description of the website. */
  leadText: Scalars['String']['output'];
  /** Title of the website. */
  title: Scalars['String']['output'];
  /** URL of the website. */
  url?: Maybe<Scalars['URL']['output']>;
};

export type GetSiteConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteConfigQuery = { __typename?: 'Query', siteConfig?: { __typename?: 'SiteConfig', siteName: string } | null };

export type NewsItemFragmentFragment = { __typename?: 'News', id: number, title?: string | null, url?: string | null, publicationDate?: any | null, leadText?: string | null, images?: { __typename?: 'ImageCollection', ratio_3x2?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null } | null } | null, categories: Array<{ __typename?: 'Category', title: string }> } & { ' $fragmentName'?: 'NewsItemFragmentFragment' };

export type NewsBlockFragmentFragment = { __typename?: 'NewsBlock', anchor?: string | null, listUrl?: string | null, proposeUrl?: string | null, focusedNews?: (
    { __typename?: 'News' }
    & { ' $fragmentRefs'?: { 'NewsItemFragmentFragment': NewsItemFragmentFragment } }
  ) | null, news: Array<(
    { __typename?: 'News' }
    & { ' $fragmentRefs'?: { 'NewsItemFragmentFragment': NewsItemFragmentFragment } }
  )>, briefNews: Array<{ __typename?: 'News', id: number, title?: string | null, url?: string | null, publicationDate?: any | null }> } & { ' $fragmentName'?: 'NewsBlockFragmentFragment' };

export type GetPageQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type GetPageQuery = { __typename?: 'Query', page?: { __typename?: 'Page', title?: string | null, structuredContent?: (BlockInterface & { __typename: string })[] | null } | null };

export type GetNewsQueryVariables = Exact<{
  url: Scalars['URL']['input'];
}>;


export type GetNewsQuery = { __typename?: 'Query', route?:
    | { __typename?: 'Album' }
    | { __typename?: 'AlbumList' }
    | { __typename?: 'Comarquage' }
    | { __typename?: 'Directory' }
    | { __typename?: 'DirectoryList' }
    | { __typename?: 'DirectoryMap' }
    | { __typename?: 'Event' }
    | { __typename?: 'EventList' }
    | { __typename?: 'EventMap' }
    | { __typename?: 'ExtranetHome' }
    | { __typename?: 'ExtranetLogin' }
    | { __typename?: 'GlobalMap' }
    | { __typename?: 'GlobalSearch' }
    | { __typename?: 'JobOffer' }
    | { __typename?: 'JobOfferList' }
    | { __typename?: 'News', id: number, title?: string | null, leadText?: string | null, publicationDate?: any | null, modifiedDate?: any | null, structuredContent?: (BlockInterface & { __typename: string })[] | null, images?: { __typename?: 'ImageCollection', ratio_3x2?: { __typename?: 'Image', url: string, width: number, height: number, alt?: string | null } | null } | null, categories: Array<{ __typename?: 'Category', title: string, level: number }>, breadcrumbs: { __typename?: 'Breadcrumbs', items: Array<{ __typename?: 'Crumb', title: string, url: string }> }, metadata?: { __typename?: 'Metadata', title: string, description?: string | null } | null }
    | { __typename?: 'NewsList' }
    | { __typename?: 'NewsMap' }
    | { __typename?: 'Newsletter' }
    | { __typename?: 'NewsletterList' }
    | { __typename?: 'Page' }
    | { __typename?: 'Publication' }
    | { __typename?: 'PublicationList' }
    | { __typename?: 'Question' }
    | { __typename?: 'QuestionList' }
    | { __typename?: 'Redirect' }
    | { __typename?: 'Resolution' }
    | { __typename?: 'ResolutionList' }
   | null };

export type GetRouteQueryVariables = Exact<{
  url: Scalars['URL']['input'];
}>;


export type GetRouteQuery = { __typename?: 'Query', route?:
    | { __typename: 'Album' }
    | { __typename: 'AlbumList' }
    | { __typename: 'Comarquage' }
    | { __typename: 'Directory' }
    | { __typename: 'DirectoryList' }
    | { __typename: 'DirectoryMap' }
    | { __typename: 'Event' }
    | { __typename: 'EventList' }
    | { __typename: 'EventMap' }
    | { __typename: 'ExtranetHome' }
    | { __typename: 'ExtranetLogin' }
    | { __typename: 'GlobalMap' }
    | { __typename: 'GlobalSearch' }
    | { __typename: 'JobOffer' }
    | { __typename: 'JobOfferList' }
    | { __typename: 'News', url?: string | null }
    | { __typename: 'NewsList' }
    | { __typename: 'NewsMap' }
    | { __typename: 'Newsletter' }
    | { __typename: 'NewsletterList' }
    | { __typename: 'Page', url?: string | null }
    | { __typename: 'Publication' }
    | { __typename: 'PublicationList' }
    | { __typename: 'Question' }
    | { __typename: 'QuestionList' }
    | { __typename: 'Redirect', redirectCode?: number | null, url?: string | null }
    | { __typename: 'Resolution' }
    | { __typename: 'ResolutionList' }
   | null };

export type GetHomepageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomepageQuery = { __typename?: 'Query', route?:
    | { __typename: 'Album' }
    | { __typename: 'AlbumList' }
    | { __typename: 'Comarquage' }
    | { __typename: 'Directory' }
    | { __typename: 'DirectoryList' }
    | { __typename: 'DirectoryMap' }
    | { __typename: 'Event' }
    | { __typename: 'EventList' }
    | { __typename: 'EventMap' }
    | { __typename: 'ExtranetHome' }
    | { __typename: 'ExtranetLogin' }
    | { __typename: 'GlobalMap' }
    | { __typename: 'GlobalSearch' }
    | { __typename: 'JobOffer' }
    | { __typename: 'JobOfferList' }
    | { __typename: 'News', url?: string | null }
    | { __typename: 'NewsList' }
    | { __typename: 'NewsMap' }
    | { __typename: 'Newsletter' }
    | { __typename: 'NewsletterList' }
    | { __typename: 'Page', url?: string | null }
    | { __typename: 'Publication' }
    | { __typename: 'PublicationList' }
    | { __typename: 'Question' }
    | { __typename: 'QuestionList' }
    | { __typename: 'Redirect', redirectCode?: number | null, url?: string | null }
    | { __typename: 'Resolution' }
    | { __typename: 'ResolutionList' }
   | null };

export const NewsItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewsItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"News"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}},{"kind":"Field","name":{"kind":"Name","value":"leadText"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ratio_3x2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<NewsItemFragmentFragment, unknown>;
export const NewsBlockFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewsBlockFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NewsBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anchor"}},{"kind":"Field","name":{"kind":"Name","value":"listUrl"}},{"kind":"Field","name":{"kind":"Name","value":"proposeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"focusedNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewsItemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"news"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewsItemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"briefNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewsItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"News"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}},{"kind":"Field","name":{"kind":"Name","value":"leadText"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ratio_3x2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<NewsBlockFragmentFragment, unknown>;
export const GetSiteConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteName"}}]}}]}}]} as unknown as DocumentNode<GetSiteConfigQuery, GetSiteConfigQueryVariables>;
export const GetPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"structuredContent"}}]}}]}}]} as unknown as DocumentNode<GetPageQuery, GetPageQueryVariables>;
export const GetNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"URL"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"News"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"leadText"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"structuredContent"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ratio_3x2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNewsQuery, GetNewsQueryVariables>;
export const GetRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"URL"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Redirect"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redirectCode"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"News"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetRouteQuery, GetRouteQueryVariables>;
export const GetHomepageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"StringValue","value":"/","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Redirect"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redirectCode"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"News"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomepageQuery, GetHomepageQueryVariables>;