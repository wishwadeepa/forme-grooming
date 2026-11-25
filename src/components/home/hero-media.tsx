"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";

const fallbackImage = "/images/hero/hero_image.png";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (preference.matches) {
        video.pause();
        setIsPlaying(false);
        setShowFallback(true);
        return;
      }

      setShowFallback(false);
      void video.play().catch(() => setShowFallback(true));
    };

    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => preference.removeEventListener("change", updatePlayback);
  }, []);

  const showPosterFallback = (event: SyntheticEvent<HTMLVideoElement>) => {
    event.currentTarget.pause();
    setIsPlaying(false);
    setShowFallback(true);
  };

  return (
    <>
      {showFallback && (
        <Image
          src={fallbackImage}
          alt="A considered haircut in the FORME studio"
          fill
          priority
          sizes="100vw"
          className="hero-poster"
        />
      )}
      <video
        ref={videoRef}
        className={`hero-photo hero-video${isPlaying ? " is-playing" : ""}`}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setIsPlaying(true)}
        onError={showPosterFallback}
      >
        <source src="/videos/forme-hero-cut.mp4" type="video/mp4" />
      </video>
    </>
  );
}
