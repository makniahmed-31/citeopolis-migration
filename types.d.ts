declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

// CSS side-effect imports (e.g. import "styles.css")
declare module "*.css";

// Swiper CSS subpath exports
declare module "swiper/css";
declare module "swiper/css/a11y";
declare module "swiper/css/autoplay";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
