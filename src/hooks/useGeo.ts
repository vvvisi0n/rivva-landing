"use client";

import { useCallback, useMemo, useState } from "react";

export function useGeo() {
  const supported = typeof window !== "undefined" && "geolocation" in navigator;
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(() => {
    if (!supported) {
      setError("Geolocation not supported.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setError(err?.code === 1 ? "Permission denied." : "Location error.");
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    );
  }, [supported]);

  return useMemo(
    () => ({ supported, loading, lat, lng, error, hasCoords: lat != null && lng != null, request }),
    [supported, loading, lat, lng, error, request]
  );
}
