"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

// Inline Icons (Zero external dependencies)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

const BASE = ((import.meta as any).env?.BASE_URL || "").replace(/\/$/, "");

export const defaultDishes: CarouselItem[] = [
  {
    tag: "#Signature",
    titleLine1: "SMACK FRESH",
    titleLine2: "- BURGER GOURMET",
    desc: "Tiras crocantes empanadas, queijo derretido, alface roxa e tomate no brioche",
    img: `${BASE}/images/smack/1-smack-fresh-burger.jpg`,
    ctaText: "VIEW MENU",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
  },
  {
    tag: "#ChefSpecial",
    titleLine1: "BAGUETE POWER",
    titleLine2: "- BACON E QUEIJO",
    desc: "Frango crocante em tiras douradas, cascata de queijo, bacon e batatas fritas",
    img: `${BASE}/images/smack/2-smack-baguete-power.jpg`,
    ctaText: "VIEW MENU",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
  },
  {
    tag: "#ComboBalde",
    titleLine1: "BALDE SMACK G",
    titleLine2: "- 4 MOLHOS E COCA",
    desc: "800g de puro frango ultracrocante, 4 potinhos de molhos da casa e Coca gelada",
    img: `${BASE}/images/smack/3-smack-balde-combo.jpg`,
    ctaText: "VIEW MENU",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
  },
  {
    tag: "#PuroCrunch",
    titleLine1: "TIRAS SUPREME",
    titleLine2: "- CROCANTE REAL",
    desc: "100% peito de frango selecionado, frito na hora com tempero artesanal",
    img: `${BASE}/images/smack/4-smack-tiras-supreme.jpg`,
    ctaText: "VIEW MENU",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
  },
  {
    tag: "#Executivo",
    titleLine1: "MARMITA SMACK",
    titleLine2: "- ALMOCO COMPLETO",
    desc: "Frango frito crocante, arroz branco soltinho, feijao caseiro e batatas fritas",
    img: `${BASE}/images/smack/5-smack-marmita-executiva.png`,
    ctaText: "VIEW MENU",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
  },
  {
    tag: "#KidsSpecial",
    titleLine1: "SMACK KIDS",
    titleLine2: "- BATATAS SMILE",
    desc: "Pao brioche fofinho, frango crocante, cheddar e batatinhas smile douradas",
    img: `${BASE}/images/smack/6-smack-kids-smile.jpg`,
    ctaText: "VIEW MENU",
    ctaUrl: "https://www.ifood.com.br/delivery/florianopolis-sc/smack-chicken-frango-frito-no-balde-estreito/93484d61-4553-4caf-b136-d1a0f5e73ecf?utm_medium=share",
  },
];

export function CoverFlowCarousel({
  items = defaultDishes,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 2200,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const total = items.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  // Continuous reliable autoplay loop
  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > 30 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  // Responsive stage & card measurements
  const cardWidth = isMobile ? Math.min(windowWidth * 0.78, 290) : isTablet ? 300 : 330;
  const cardHeight = isMobile ? Math.min(windowWidth * 1.25, 450) : isTablet ? 470 : 500;
  const stageHeight = isMobile ? 480 : 530;

  // Spacing offsets for coverflow
  const step1 = isMobile ? cardWidth * 0.65 : isTablet ? 240 : 285;
  const step2 = isMobile ? cardWidth * 1.15 : isTablet ? 420 : 510;

  return (
    <section
      className={`relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden py-8 select-none touch-pan-y ${className}`}
      style={{
        backgroundColor: "#0c0a09",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient Background with smooth transition */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          key={items[currentIndex]?.img}
          src={items[currentIndex]?.img}
          alt="ambience background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.22) blur(36px)",
            transform: "scale(1.2)",
            transition: "opacity 800ms ease, filter 800ms ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(12,10,9,0.25) 0%, rgba(12,10,9,0.94) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-4 z-10 flex flex-col items-center justify-center">
        {/* Eyebrow Label */}
        {sectionLabel && (
          <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <span style={{ width: isMobile ? "24px" : "36px", height: "1px", background: "linear-gradient(90deg, transparent, #c5a880)" }} />
            <h3
              style={{
                fontSize: isMobile ? "0.68rem" : "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#c5a880",
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: isMobile ? "24px" : "36px", height: "1px", background: "linear-gradient(90deg, #c5a880, transparent)" }} />
          </div>
        )}

        {/* 3D Coverflow Stage */}
        <div
          className="relative w-full flex justify-center items-center mb-6 sm:mb-8"
          style={{ perspective: "1400px", height: `${stageHeight}px` }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;
            let transform = "translateX(0px) scale(0.35) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.35) blur(3px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = `translateX(${step1}px) scale(0.82) rotateY(-22deg)`;
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.72)";
            } else if (offset === 2) {
              transform = `translateX(${step2}px) scale(0.65) rotateY(-34deg)`;
              opacity = 0.35;
              zIndex = 10;
              filter = "brightness(0.5) blur(1px)";
            } else if (offset === total - 1) {
              transform = `translateX(-${step1}px) scale(0.82) rotateY(22deg)`;
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.72)";
            } else if (offset === total - 2) {
              transform = `translateX(-${step2}px) scale(0.65) rotateY(34deg)`;
              opacity = 0.35;
              zIndex = 10;
              filter = "brightness(0.5) blur(1px)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius: isMobile ? "16px" : "18px",
                  overflow: "hidden",
                  backgroundColor: "#171311",
                  border: isCenter ? "1px solid rgba(197,168,128,0.4)" : "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 700ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? "0 25px 55px rgba(0,0,0,0.92), 0 0 35px rgba(197,168,128,0.22)"
                    : "0 12px 30px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: isMobile ? "16px 14px 18px" : "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(14px)",
                    transition: "opacity 450ms ease, transform 450ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/* Tag */}
                  <div style={{ textAlign: "right", width: "100%", paddingRight: "2px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: isMobile ? "0.7rem" : "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "rgba(255,255,255,0.9)",
                        textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2px",
                      marginTop: "auto",
                      paddingBottom: "2px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: isMobile ? "1.35rem" : "1.65rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.1,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h2>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: isMobile ? "0.92rem" : "1.1rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#f3f0ea",
                          lineHeight: 1.2,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: isMobile ? "28px" : "34px",
                        height: "2px",
                        backgroundColor: "#c5a880",
                        borderRadius: "2px",
                        margin: isMobile ? "4px auto 3px" : "5px auto 4px",
                        boxShadow: "0 0 8px rgba(197,168,128,0.7)",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: isMobile ? "0.74rem" : "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: isMobile ? "240px" : "280px",
                          margin: isMobile ? "0 0 8px" : "0 0 10px",
                          lineHeight: 1.25,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    <a
                      href={item.ctaUrl || "#"}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: isMobile ? "6px 15px" : "7px 18px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #c5a880 0%, #a48256 100%)",
                        color: "#110d0c",
                        fontSize: isMobile ? "0.68rem" : "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(197,168,128,0.3)",
                        cursor: "pointer",
                        transition: "transform 200ms ease, box-shadow 200ms ease",
                      }}
                    >
                      <span>{item.ctaText || "VIEW MENU"}</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous dish"
          style={{
            position: "absolute",
            left: isMobile ? "8px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? "38px" : "46px",
            height: isMobile ? "38px" : "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next dish"
          style={{
            position: "absolute",
            right: isMobile ? "8px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? "38px" : "46px",
            height: isMobile ? "38px" : "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "7px",
                width: idx === currentIndex ? (isMobile ? "22px" : "28px") : "7px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#c5a880" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(197,168,128,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
