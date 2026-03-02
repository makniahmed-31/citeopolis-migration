import clsx from "clsx";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { FlashInfoItem } from "./types";
import styles from "./FlashInfoCarousel.module.scss";
import FlashInfoContent from "./FlashInfoContent";

interface FlashInfoCarouselProps {
  flashInfos: FlashInfoItem[];
}

export default function FlashInfoCarousel({ flashInfos }: FlashInfoCarouselProps) {
  const previousId = useId();
  const nextId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ariaLive, setAriaLive] = useState<"off" | "polite">("off");
  const [isFocused, setIsFocused] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const togglePlayPause = useCallback(() => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const playPauseLabel = isPlaying
    ? "Arrêter le défilement automatique"
    : "Lancer le défilement automatique";

  useEffect(() => {
    setAriaLive(isFocused || !isPlaying ? "polite" : "off");
  }, [isFocused, isPlaying]);

  useEffect(() => {
    const swiperElement = document.querySelector<HTMLElement>(`.${styles.swiper}`);
    const controlsElement = document.querySelector<HTMLElement>(`.${styles.swiperControls}`);
    const closeButton = swiperElement?.closest("article")?.querySelector(":scope > button");

    if (!swiperElement || !controlsElement || !closeButton) return;

    const handleFocusIn = () => {
      setIsFocused(true);
      swiperRef.current?.autoplay.stop();
    };

    const handleFocusOut: EventListener = (e) => {
      const event = e as FocusEvent;
      const nextTarget = event.relatedTarget as Node | null;
      if (nextTarget && (swiperElement.contains(nextTarget) || controlsElement.contains(nextTarget))) return;
      setIsFocused(false);
      if (isPlaying) swiperRef.current?.autoplay.start();
    };

    swiperElement.addEventListener("focusin", handleFocusIn);
    swiperElement.addEventListener("focusout", handleFocusOut);
    controlsElement.addEventListener("focusin", handleFocusIn);
    controlsElement.addEventListener("focusout", handleFocusOut);
    closeButton.addEventListener("focusin", handleFocusIn);
    closeButton.addEventListener("focusout", handleFocusOut);

    return () => {
      swiperElement.removeEventListener("focusin", handleFocusIn);
      swiperElement.removeEventListener("focusout", handleFocusOut);
      controlsElement.removeEventListener("focusin", handleFocusIn);
      controlsElement.removeEventListener("focusout", handleFocusOut);
      closeButton.removeEventListener("focusin", handleFocusIn);
      closeButton.removeEventListener("focusout", handleFocusOut);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (swiperRef.current?.wrapperEl) {
      swiperRef.current.wrapperEl.setAttribute("aria-live", ariaLive);
    }
  }, [ariaLive]);

  return (
    <>
      <div role="group" className={styles.swiperControls} aria-label="Contrôle du carrousel">
        <p className={styles.paginationInfo} aria-hidden="true">
          {activeIndex + 1}/{flashInfos.length}
        </p>
        <div id={previousId} role="button" tabIndex={0} className={styles.prevButton}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
          <span className="sr-only">Info précédente</span>
        </div>
        <div id={nextId} role="button" tabIndex={0} className={styles.nextButton}>
          <i className="fa fa-chevron-right" aria-hidden="true" />
          <span className="sr-only">Info suivante</span>
        </div>
        <button type="button" onClick={togglePlayPause} className={styles.playButton} aria-label={playPauseLabel}>
          <i className={clsx("fa", isPlaying ? "fa-pause" : "fa-play")} aria-hidden="true" />
        </button>
      </div>

      <Swiper
        className={styles.swiper}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation={{ prevEl: "#" + CSS.escape(previousId), nextEl: "#" + CSS.escape(nextId) }}
        loop
        autoplay={{ delay: 6000, pauseOnMouseEnter: true }}
        effect="slide"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.wrapperEl.setAttribute("aria-live", ariaLive);
        }}
        onSlideChange={(swiper) => {
          const notifyElement = document.querySelector(".swiper-notification");
          const activeSlide = swiper.slides[swiper.activeIndex];
          const text = activeSlide.textContent?.trim();
          setActiveIndex(swiper.realIndex);
          swiper.wrapperEl.setAttribute("aria-live", ariaLive);
          if (notifyElement) notifyElement.textContent = text ?? "";
        }}
        a11y={{
          nextSlideMessage: "Info suivante",
          prevSlideMessage: "Info précédente",
          firstSlideMessage: "Première info",
          lastSlideMessage: "Dernière info",
          slideLabelMessage: "{{index}} sur {{slidesLength}}",
          inertInvisibleSlides: true,
        }}
      >
        {flashInfos.map((item, index) => (
          <SwiperSlide key={index} className={styles.wrapper}>
            <FlashInfoContent item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
